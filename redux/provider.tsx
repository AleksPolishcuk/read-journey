"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/redux/index";
import { useRef, useEffect, useState } from "react";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);
  const [store, setStore] = useState<ReturnType<typeof makeStore> | null>(null);

  useEffect(() => {
    if (!storeRef.current) {
      storeRef.current = makeStore();
      setStore(storeRef.current);
    }
  }, []);

  if (!store) return null;

  return <Provider store={store}>{children}</Provider>;
}
