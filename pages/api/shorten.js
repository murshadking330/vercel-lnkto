import { kv } from "@vercel/kv";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { url, slug, title, description, image } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // اگر slug خالی ہو تو random generate کر لو
    if (!slug || slug.trim() === "") {
      slug = Math.random().toString(36).substring(2, 8);
    }

    // پہلے سے موجود slug چیک کرو
    const exists = await kv.hgetall(slug);
    if (exists && exists.url) {
      return res
        .status(400)
        .json({ error: "Slug already exists. Try another." });
    }

    // 🧠 اگر user نے کچھ meta نہیں دیا، تو خود fetch کرو
    if ((!title || title.trim() === "") && (!description || !image)) {
      try {
        const response = await fetch(url, { timeout: 8000 });
        const html = await response.text();
        const $ = cheerio.load(html);

        title =
          title ||
          $('meta[property="og:title"]').attr("content") ||
          $("title").text() ||
          "";
        description =
          description ||
          $('meta[property="og:description"]').attr("content") ||
          $('meta[name="description"]').attr("content") ||
          "";
        image =
          image ||
          $('meta[property="og:image"]').attr("content") ||
          $('link[rel="image_src"]').attr("href") ||
          "";
      } catch (err) {
        console.log("Meta fetch error:", err);
      }
    }

    // Save full metadata
    await kv.hset(slug, {
      url,
      title: title || "",
      description: description || "",
      image: image || "",
      clicks: 0,
    });

    // response
    res.status(200).json({ slug });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
