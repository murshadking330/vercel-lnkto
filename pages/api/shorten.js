import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { url, slug } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!slug || slug.trim() === "") {
      slug = Math.random().toString(36).substring(2, 8);
    }

    const exists = await kv.hgetall(slug);
    if (exists && exists.url) {
      return res.status(400).json({ error: "Slug already exists. Try another." });
    }

    await kv.hset(slug, { url, clicks: 0 });
    res.status(200).json({ slug });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}