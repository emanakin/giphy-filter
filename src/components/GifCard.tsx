"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/GifCard.module.css";

interface GifCardProps {
  gif?: {
    id: string;
    title: string;
    images: {
      fixed_height: {
        url: string;
      };
    };
  };
  isLoading?: boolean;
}

export default function GifCard({ gif, isLoading = false }: GifCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.gifItem}>
      {isLoading || !gif ? (
        <div className={styles.shimmer}></div>
      ) : (
        <>
          {!imageLoaded && <div className={styles.shimmer}></div>}
          <Image
            src={gif.images.fixed_height.url}
            alt={gif.title}
            width={180}
            height={180}
            unoptimized
            className={`${styles.gifImage} ${imageLoaded ? styles.loaded : ""}`}
            onLoad={() => setImageLoaded(true)}
          />
        </>
      )}
    </div>
  );
}
