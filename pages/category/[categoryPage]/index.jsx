import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/container/navbar/Navbar.jsx";
import Rightbar from "@/components/common/Rightbar";
import Container from "@/components/common/Container";
import Footer from "@/components/container/footer/Footer";
import Head from "next/head";
import GoogleTagManager from "@/components/lib/GoogleTagManager";
import JsonLd from "@/json/JsonLd";
import useBreadcrumbs from "@/components/lib/useBreadcrumbs";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/components/lib/myFun";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import Breadcrumbs from "@/components/categories/Breadcrumbs";

export default function index({
  blog_list,
  about_me,
  imagePath,
  categories,
  logo,
  meta,
  domain,
  favicon,
}) {
  const router = useRouter();
  const { categoryPage } = router.query;
  const breadcrumbs = useBreadcrumbs();

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = sanitizeUrl(categoryPage);
    return sanitizeUrl(item.article_category) === searchContent;
  });

  useEffect(() => {
    const currentPath = router.asPath;

    if (categoryPage && (categoryPage.includes("%20") || categoryPage.includes(" "))) {
      const newCategory = categoryPage.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [categoryPage, router]);


  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {meta?.title?.replaceAll(
            "##category##",
            categoryPage?.replaceAll("-", " ")
          )}
        </title>
        <meta
          name="description"
          content={meta?.description.replaceAll(
            "##category##",
            categoryPage?.replaceAll("-", " ")
          )}
        />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/${categoryPage}`} />
        {/* <meta name="robots" content="noindex" /> */}
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      <Navbar logo={logo} imagePath={imagePath} categories={categories} blog_list={blog_list} />
      <Breadcrumbs className=" pt-28 " breadcrumbs={breadcrumbs} />

      <Container className="flex flex-col gap-10 lg:gap-4 lg:flex-row">
        <div className="lg:w-[75%]">
          <Container>
           <h1 className=" text-black text-4xl font-bold uppercase " >{categoryPage}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogList.map((article, index) => (
                <div key={index} className="flex flex-col pt-10">
                  <Link
                    href={`/${sanitizeUrl(article.title)}`}
                    title={article.title}
                  >
                    <div className="relative w-full h-64 md:h-48 mb-4 overflow-hidden rounded-[4px]">
                      <Image
                        src={`${imagePath}/${article.image}`}
                        alt={article.title}
                        title={article.title}
                        fill
                        className="object-cover hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </Link>

                  <Link
                    href={`/${sanitizeUrl(article.title)}`}
                    title={article.title}
                  >
                    <h2 className="text-xl font-semibold mb-2 hover:text-gray-700">
                      {article.title}
                    </h2>
                  </Link>

                  <div className="flex items-center space-x-4 text-sm">
                    <Link
                      href={`/${sanitizeUrl(article.article_category)}`}
                      title={article.article_category}
                      className="text-black bg-gray-200 px-2 py-1 rounded-[4px]"
                    >
                      {article.article_category}
                    </Link>
                    <span className="text-gray-500">
                      {dayjs(article.published_at).format("MMM D, YYYY")}
                    </span>
                    <div className="flex items-center">
                      <span className="text-gray-500">by</span>
                      <Link
                        href="#"
                        title={article.author}
                        className="ml-1 hover:text-gray-700"
                      >
                        {article.author}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
        <div className="border-[0.5px] border-gray-300"></div>
        <div className="lg:w-[25%]">
          <Rightbar
            imagePath={imagePath}
            about_me={about_me}
            blog_list={blog_list}
          />
        </div>
      </Container>
      <Footer
        categories={categories}
        imagePath={imagePath}
        logo={logo}
        about_me={about_me}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `https://${domain}${breadcrumb.url}`,
              })),
            },
            {
              "@type": "WebPage",
              "@id": `https://${domain}/${categoryPage}`,
              url: `https://${domain}/${categoryPage}`,
              name: meta?.title?.replaceAll(
                "##category##",
                categoryPage?.replaceAll("-", " ")
              ),
              description: meta?.description?.replaceAll(
                "##category##",
                categoryPage?.replaceAll("-", " ")
              ),
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `https://${domain}`,
              },
            },
            {
              "@type": "ItemList",
              url: `https://${domain}/${categoryPage}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `https://${domain}/${sanitizeUrl(
                    blog?.article_category
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { categoryPage } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const categories = await callBackendApi({ domain, type: "categories" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const meta = await callBackendApi({ domain, type: "meta_category" });

  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "category");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() === categoryPage?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      logo: logo?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      contact_details: contact_details?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
