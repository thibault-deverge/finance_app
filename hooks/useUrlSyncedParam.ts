'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

export function useUrlSyncedParam(
  key: string,
  defaultValue: string,
  debounceMs: number = 0
): [string, (v: string) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(key) ?? defaultValue);

  const debounced = useDebounce(value, debounceMs);
  const hasParam = searchParams.has(key);

  useEffect(() => {
    const current = searchParams.get(key) ?? '';

    if (!hasParam && debounced === defaultValue) {
      return;
    }

    if (debounced !== current) {
      const params = new URLSearchParams(searchParams.toString());
      if (debounced) params.set(key, debounced);
      else params.delete(key);
      router.push(`?${params.toString()}`);
    }
  }, [debounced, defaultValue, hasParam, key, router, searchParams]);

  // wrapper pour que setValue n'accepte que string
  const setParam = (newValue: string) => setValue(newValue);

  return [value, setParam];
}
