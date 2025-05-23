import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/container/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/container/footer/Footer";
import Latest from "@/components/home/Latest";
import LatestPost from "@/components/home/LatestPost";
import Feature from "@/components/home/Feature";
import Popular from "@/components/common/Popular";
import Head from "next/head";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/components/lib/myFun";
import JsonLd from "@/json/JsonLd";
import GoogleTagManager from "@/components/lib/GoogleTagManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function Home({
  blog_list,
  about_me,
  domain,
  logo,
  meta,
  imagePath,
  categories,
  banner,
  favicon,
  copyright,
}) {
 
const faviconUrl =favicon
?`$/images/${imagePath}/${favicon}` 
  :'/favicon.ico';

  console.log("Favicon THEEK HA ",faviconUrl)

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={faviconUrl}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={faviconUrl}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={faviconUrl}
        />
      </Head>

      <Navbar
        logo={logo}
        imagePath={imagePath}
        categories={categories}
        blog_list={blog_list}
      />

      <Hero
        image={`${imagePath}/${banner?.file_name}`}
        data={banner?.value}
        imagePath={imagePath}
      />
      <Latest blogs={blog_list} imagePath={imagePath} />
      <Popular articles={blog_list} imagePath={imagePath} />
      <Feature blog_list={blog_list} imagePath={imagePath} />
      <LatestPost
        blog_list={blog_list}
        imagePath={imagePath}
        about_me={about_me}
      />
      <Footer
        categories={categories}
        imagePath={imagePath}
        logo={logo}
        about_me={about_me}
      />

      <JsonLd
        data={{
          "@context": "https://www.schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `https://${domain}/`,
              url: `https://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `https://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${imagePath}/${banner?.file_name}`,
                width: 1920,
                height: 1080,
              },
            },
            {
              "@type": "Organization",
              "@id": `https://${domain}`,
              name: domain,
              url: `https://${domain}`,
              logo: {
                "@type": "ImageObject",
                url: `${imagePath}/${logo.file_name}`,
                width: logo.width,
                height: logo.height,
              },
              sameAs: [
                "https://www.facebook.com",
                "https://www.twitter.com",
                "https://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `https://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `https://${domain}/${sanitizeUrl(
                    blog?.article_category
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog?.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });

  const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const imagePath = await getImagePath(project_id, domain);

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "home");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      banner: banner?.data[0] || null,
      page,
    },
  };
}
