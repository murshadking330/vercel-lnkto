import { kv } from "@vercel/kv";

export async function getServerSideProps({ params }) {
  const data = await kv.hgetall(params.slug);
  if (!data || !data.url) {
    return { notFound: true };
  }

  // increase click counter
  await kv.hincrby(params.slug, "clicks", 1);

  return {
    redirect: {
      destination: data.url,
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}