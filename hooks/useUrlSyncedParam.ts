'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

export function useUrlSyncedParam(
  key: string,
  defaultValue: string,
  debounceTime: number = 0
): [string, (value: string) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(key) || defaultValue);

  const debounced = useDebounce(value, debounceTime);

  useEffect(() => {
    const current = searchParams.get(key) || '';
    if (debounced !== current) {
      const params = new URLSearchParams(searchParams.toString());
      if (debounced) params.set(key, debounced);
      else params.delete(key);
      router.push(`?${params.toString()}`);
    }
  }, [debounced, key, router, searchParams]);

  return [value, setValue];
}
