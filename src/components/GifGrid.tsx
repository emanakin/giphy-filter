"use client";

import { useGifs } from "@/context/GifContext";
import styles from "@/styles/components/GifGrid.module.css";
import GifCard from "@/components/GifCard";

export default function GifGrid() {
  const { gifs, loading, error } = useGifs();

  const placeholders = Array(20).fill(null);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!loading && gifs.length === 0) {
    return <div className={styles.noResults}>No GIFs found</div>;
  }

  const firstRowGifs = loading
    ? placeholders.slice(0, 10)
    : gifs.slice(0, Math.min(gifs.length, 10));
  const secondRowGifs = loading
    ? placeholders.slice(10, 20)
    : gifs.slice(10, Math.min(gifs.length, 20));

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <div className={styles.gridRow}>
          {firstRowGifs.map((gif, index) => (
            <GifCard
              key={gif?.id || `loading-1-${index}`}
              gif={gif}
              isLoading={loading}
            />
          ))}
        </div>

        {(loading || secondRowGifs.length > 0) && (
          <div className={styles.gridRow}>
            {secondRowGifs.map((gif, index) => (
              <GifCard
                key={gif?.id || `loading-2-${index}`}
                gif={gif}
                isLoading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
