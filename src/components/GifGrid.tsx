"use client";

import { useGifs } from "@/context/GifContext";
import styles from "@/styles/components/GifGrid.module.css";
import Image from "next/image";

export default function GifGrid() {
  const { gifs, loading, error } = useGifs();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (gifs.length === 0) {
    return <div className={styles.noResults}>No GIFs found</div>;
  }

  const firstRowGifs = gifs.slice(0, Math.min(gifs.length, 5));
  const secondRowGifs = gifs.slice(5, Math.min(gifs.length, 10));

  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridRow}>
        {firstRowGifs.map((gif) => (
          <div key={gif.id} className={styles.gifItem}>
            <Image
              src={gif.images.fixed_height.url}
              alt={gif.title}
              width={180}
              height={180}
              unoptimized
              className={styles.gifImage}
            />
          </div>
        ))}
      </div>

      {secondRowGifs.length > 0 && (
        <div className={styles.gridRow}>
          {secondRowGifs.map((gif) => (
            <div key={gif.id} className={styles.gifItem}>
              <Image
                src={gif.images.fixed_height.url}
                alt={gif.title}
                width={180}
                height={180}
                unoptimized
                className={styles.gifImage}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
