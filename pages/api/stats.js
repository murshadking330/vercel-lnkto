import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  try {
    const keys = await kv.keys("*"); // get all short links
    const result = [];

    for (const slug of keys) {
      const data = await kv.hgetall(slug);
      if (data && data.url) {
        result.push({
          slug,
          url: data.url,
          clicks: data.clicks || 0,
          title: data.title || "",
          description: data.description || "",
        });
      }
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}
