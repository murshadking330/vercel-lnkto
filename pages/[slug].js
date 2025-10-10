import Head from "next/head";
import { kv } from "@vercel/kv";

export async function getServerSideProps({ params }) {
  const data = await kv.hgetall(params.slug);

  if (!data || !data.url) {
    return { notFound: true };
  }

  // Click counter update
  await kv.hincrby(params.slug, "clicks", 1);

  return {
    props: {
      url: data.url,
      title: data.title || "",
      description: data.description || "",
      image: data.image || "",
    },
  };
}

export default function RedirectPage({ url, title, description, image }) {
  return (
    <>
      <Head>
        <title>{title || ""}</title>
        <meta name="description" content={description || ""} />

        {/* --- Open Graph tags --- */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title || "Shortened Link"} />
        <meta property="og:description" content={description || ""} />
        <meta property="og:image" content={image || "/default.jpg"} />
        <meta property="og:url" content={url} />

        {/* --- Twitter Card tags --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || "Shortened Link"} />
        <meta name="twitter:description" content={description || ""} />
        <meta name="twitter:image" content={image || "/default.jpg"} />

        {/* Redirect after small delay */}
        <meta httpEquiv="refresh" content={`0;url=${url}`} />
      </Head>

      <div
        style={{
          fontFamily: "sans-serif",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <h2>Redirecting...</h2>
        <p>
          If you are not redirected automatically,{" "}
          <a href={url}>click here</a>.
        </p>
      </div>
    </>
  );
}
