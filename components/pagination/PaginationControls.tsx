/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useIsMobile } from '@/hooks/useIsMobile';
import { getPaginationPages } from './getPaginationPage';

import PageButton from '@/components/pagination/PageButton';
import PageDots from '@/components/pagination/PageDots';
import PrevButton from '@/components/pagination/PrevButton';
import NextButton from '@/components/pagination/NextButton';

type PaginationControlsProps = {
  totalPages: number;
};

function PaginationControls({ totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const pages = getPaginationPages(currentPage, totalPages, isMobile);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between gap-2 md:gap-3">
      <PrevButton
        isFirstPage={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      />

      <div className="flex items-center gap-1 md:gap-2">
        {pages.map((page) => {
          if (typeof page === 'string') {
            return <PageDots key={uuidv4()} />;
          }
          return (
            <PageButton
              key={uuidv4()}
              page={page}
              isActive={page === currentPage}
              onClick={() => goToPage(page)}
            />
          );
        })}
      </div>

      <NextButton
        isLastPage={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      />
    </div>
  );
}

export default PaginationControls;
