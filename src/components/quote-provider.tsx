"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type QuoteItem = {
  slug: string;
  name: string;
  sku: string;
  image: string;
  qty: number;
};

type QuoteContextValue = {
  items: QuoteItem[];
  count: number;
  add: (item: Omit<QuoteItem, "qty"> & { qty?: number }) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);
const STORAGE_KEY = "kimhung-quote";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as QuoteItem[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((item: Omit<QuoteItem, "qty"> & { qty?: number }) => {
    const qty = item.qty ?? 1;
    setItems((prev) => {
      const existing = prev.find((entry) => entry.slug === item.slug);
      if (existing) {
        return prev.map((entry) =>
          entry.slug === item.slug
            ? { ...entry, qty: entry.qty + qty }
            : entry,
        );
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((entry) => entry.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      add,
      remove,
      clear,
    }),
    [add, clear, items, remove],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return context;
}
