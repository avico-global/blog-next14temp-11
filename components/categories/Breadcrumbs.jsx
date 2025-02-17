import Link from "next/link";
import React from "react";
import { cn } from "../lib/utils";
import Container from "../common/Container";


export default function Breadcrumbs({ breadcrumbs, className }) {
  return (
    <Container>

    <div
      className={cn(
        "w-full flex items-center py-2 font-semibold text-gray-500",
        className
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-400">|</span>}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-black">
              {breadcrumb.label
                ?.replaceAll("%20", " ")
                ?.replaceAll("%E2%80%99", "'")}
            </span>
          ) : (
            <Link
              title={breadcrumb.label
                ?.replaceAll(" ", "-")
                ?.replaceAll("%20", "-")
                ?.replaceAll("%E2%80%99", "'")}
              href={breadcrumb.url}
              className="hover:underline transition-all"
            >
              {breadcrumb.label
                ?.replaceAll("%20", " ")
                ?.replaceAll("%E2%80%99", "'")}
            </Link>
          )}
        </span>
      ))}
    </div>
    </Container>

  );
}
