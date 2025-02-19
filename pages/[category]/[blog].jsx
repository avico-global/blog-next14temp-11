import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/container/navbar/Navbar";
import Footer from "@/components/container/footer/Footer";
import Popular from "@/components/common/Popular";
import Rightbar from "@/components/common/Rightbar";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import GoogleTagManager from "@/components/lib/GoogleTagManager";
import JsonLd from "@/json/JsonLd";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/components/lib/myFun";
import Container from "@/components/common/Container";
import MarkdownIt from "markdown-it";
import Breadcrumbs from "@/components/categories/Breadcrumbs";
import useBreadcrumbs from "@/components/lib/useBreadcrumbs";

export default function blogs({
  categories,
  blog_list,
  about_me,
  logo,
  imagePath,
  myblog,
  domain,
  favicon,
  project_id,
}) {
  const router = useRouter();
  const { category, blog } = router.query;
  const [client, setClient] = useState(false);
  const breadcrumbs = useBreadcrumbs();

  const pathSegments = router.asPath.split("/");
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    myblog?.value?.articleContent?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link
          rel="canonical"
          href={`https://www.${domain}/${category}/${blog}`}
        />
        <meta name="theme-color" content="#008DE5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      <Navbar
        logo={logo}
        imagePath={imagePath}
        categories={categories}
        blog_list={blog_list}
      />

      <Container className=" pt-48  border-b border-gray-200 pb-6 ">
        <Breadcrumbs className="  " breadcrumbs={breadcrumbs} />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20  lg:gap-32 ">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold">{myblog?.value?.title}</h1>
              <p className="text-gray-500 w-full text-lg pt-3">
                {myblog?.value?.tagline}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Link
                href="#"
                className="text-black bg-gray-200 px-2 py-1 rounded-[4px]"
                title={myblog?.value?.article_category}
              >
                {myblog?.value?.article_category}
              </Link>
              <span className="text-gray-500">
                {myblog?.value?.published_at}
              </span>
              <div className="flex items-center">
                <span className="text-gray-500">{myblog?.value?.author}</span>
              </div>
            </div>
          </div>
          <div className="border rounded-[4px] overflow-hidden">
            <Image
              src={`${imagePath}/${myblog?.file_name}`}
              alt={
                myblog?.value?.imageAltText ||
                myblog?.value?.tagline ||
                "No Banner Found"
              }
              width={800}
              height={500}
              priority={true}
              quality={100}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRshGxsdIR4hHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              title={myblog?.value?.imageTitle || myblog?.value.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Container>
      <Container>

        <div className="flex flex-col gap-10 lg:gap-4 lg:flex-row py-20">
          <div className="  lg:w-[75%] ">
            <article className="prose lg:prose-xl ">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
          </div>
          <div className="lg:w-[25%] border-l border-gray-300 pl-3">
            <Rightbar
              about_me={about_me}
              blog_list={blog_list}
              imagePath={imagePath}
            />
          </div>
        </div>
      </Container>

      <Popular articles={blog_list} imagePath={imagePath} />
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
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": myblog
                  ? `https://${domain}${sanitizeUrl(
                      myblog.article_category
                    )}/${sanitizeUrl(myblog.value.title)}`
                  : "",
                url: myblog
                  ? `https://${domain}${sanitizeUrl(
                      myblog.article_category
                    )}/${sanitizeUrl(myblog.value.title)}`
                  : "",
              },
              headline: myblog?.value?.title || "Default Title",
              description:
                myblog?.value?.articleContent || "Default Description",
              datePublished:
                myblog?.value?.published_at || new Date().toISOString(),
              author: {
                "@type": "Person",
                name: myblog?.value?.author || "Unknown Author",
              },
              image: myblog?.file_name
                ? `${imagePath}/${myblog.file_name}`
                : `${imagePath}/default-image.jpg`,
              publisher: {
                "@type": "Organization",
                name: "Site Manager",
                logo: {
                  "@type": "ImageObject",
                  url: `${imagePath}/${logo?.file_name}`,
                },
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `https://${domain}${breadcrumb.url}`,
              })),
            },
          ],
        }}
      />
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category, blog } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });

  const isValidBlog = blog_list?.data[0]?.value?.find(
    (item) => sanitizeUrl(item.title) === sanitizeUrl(blog)
  );

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) => sanitizeUrl(cat?.title) === sanitizeUrl(category)
  );

  if (!categoryExists || !isValidBlog) {
    return {
      notFound: true,
    };
  }

  const myblog = await callBackendApi({ domain, type: isValidBlog?.key });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
 


  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "blog page");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      myblog: myblog?.data[0] || {},
      blog_list: blog_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      favicon: favicon?.data[0]?.file_name || null,
      project_id,
      page,
    },
  };
}
