import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { slug, url, title, description, image } = req.body;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required for update." });
    }

    // پہلے slug چیک کرو
    const existing = await kv.hgetall(slug);
    if (!existing || !existing.url) {
      return res.status(404).json({ error: "Slug not found." });
    }

    // نیا ڈیٹا merge کر کے save کرو
    await kv.hset(slug, {
      url: url || existing.url,
      title: title ?? existing.title,
      description: description ?? existing.description,
      image: image ?? existing.image,
      clicks: existing.clicks ?? 0,
    });

    return res.status(200).json({
      success: true,
      slug,
      message: "Short link updated successfully!",
    });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}
