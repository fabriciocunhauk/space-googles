"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

/**
 * A wrapper around Next.js Image that handles regional blocking (like Imgur 403s)
 * by providing a reliable fallback mechanism.
 */
export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/assets/launch/falcon9.png",
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  // Update internal state if the src prop changes
  useEffect(() => {
    if (src) {
      setImgSrc(src);
    } else {
      setImgSrc(fallbackSrc);
    }
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        console.warn(`SafeImage: Failed to load ${src}. Falling back to ${fallbackSrc}`);
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
