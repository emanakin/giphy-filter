"use client";

import { useState, useRef, useEffect } from "react";
import { useGifs } from "@/context/GifContext";
import styles from "@/styles/components/SearchBar.module.css";

export default function SearchBar() {
  const { setSearchQuery, suggestions } = useGifs();
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (showSuggestions) {
      function handleClickOutside(event: MouseEvent) {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setShowSuggestions(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showSuggestions]);

  return (
    <div className={styles.searchContainer} ref={inputRef}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Type your ideas here ..."
          className={styles.searchInput}
        />
      </form>

      {showSuggestions && (
        <div className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className={styles.suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
