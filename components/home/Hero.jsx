import React from "react";
import Container from "../common/Container";
import Image from "next/image";

export default function Hero({ image, data }) {
  return (
    <Container className="relative py-4 px-0 pt-24">
      <div className="relative h-[80vh] sm:h-[550px] sm:rounded-[4px] overflow-hidden">
        <Image
          src={image}
          alt={data.altImage || data.tagline || "No Banner Found"}
          title={data.imageTitle || data.title || "Banner"}
          className="object-cover"
          fill
          priority
          sizes="(max-width: 320px) 320px,
                 (max-width: 480px) 480px,
                 (max-width: 768px) 768px,
                 (max-width: 1024px) 1024px,
                 (max-width: 1280px) 1280px,
                 (max-width: 1600px) 1600px,
                 (max-width: 1920px) 1920px,
                 (max-width: 2560px) 2560px,
                 (max-width: 3840px) 3840px,
                 100vw"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100 || 0.25})`,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1
            className="font-bold mb-4 max-w-3xl"
            style={{
              fontSize: `${data.titleFontSize || 76}px`,
              color: data.textColor || "white",
            }}
          >
            {data.title}
          </h1>
          {data.tagline && (
            <p
              className="mb-6 max-w-xl"
              style={{
                fontSize: `${data.taglineFontSize || 24}px`,
                color: data.textColor
                  ? `${data.textColor}90`
                  : "rgba(255,255,255,0.9)",
              }}
            >
              {data.tagline}
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
