"use client";

import styles from "@/styles/Home.module.css";
import SearchBar from "@/components/SearchBar";
import GifGrid from "@/components/GifGrid";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Discover the GIF you&apos;ve been waiting for.
      </h1>
      <GifGrid />
      <SearchBar />
    </div>
  );
}
