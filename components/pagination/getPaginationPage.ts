export function getPaginationPages(
  currentPage: number,
  totalPages: number,
  isMobile = false
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= 5 && !isMobile) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  if (startPage > 2) {
    pages.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  if (isMobile) {
    const mobilePages: (number | string)[] = [1];

    if (currentPage >= 2 && currentPage < totalPages) {
      if (currentPage === totalPages - 1) {
        mobilePages.push('...');
        mobilePages.push(currentPage);
      } else {
        mobilePages.push(currentPage);
        mobilePages.push('...');
      }
    } else {
      mobilePages.push('...');
    }

    mobilePages.push(totalPages);
    return mobilePages;
  }

  return pages;
}
