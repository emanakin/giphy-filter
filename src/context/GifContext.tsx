"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
    original: {
      url: string;
    };
  };
}

interface GifContextType {
  gifs: Gif[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchGifs: (query?: string) => Promise<void>;
  suggestions: string[];
}

const GifContext = createContext<GifContextType | undefined>(undefined);

export function GifProvider({ children }: { children: ReactNode }) {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const suggestions = [
    "Cars",
    "Laughs",
    "Angry",
    "Action",
    "Canada",
    "Politics",
  ];

  const fetchGifs = useCallback(
    async (query?: string) => {
      try {
        setLoading(true);
        setError(null);

        const searchParam = query || searchQuery;
        const url = `/api/gifs${
          searchParam ? `?q=${encodeURIComponent(searchParam)}` : ""
        }`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch GIFs");
        }

        const data = await response.json();
        setGifs(data.data || []);
      } catch (err) {
        setError("Error fetching GIFs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    fetchGifs();
  }, [fetchGifs]);

  return (
    <GifContext.Provider
      value={{
        gifs,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        fetchGifs,
        suggestions,
      }}
    >
      {children}
    </GifContext.Provider>
  );
}

export function useGifs() {
  const context = useContext(GifContext);
  if (context === undefined) {
    throw new Error("useGifs must be used within a GifProvider");
  }
  return context;
}
