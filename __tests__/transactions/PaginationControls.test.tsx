import { useRouter } from 'next/navigation';
import { render, screen, fireEvent } from '@testing-library/react';

import { setMockSearchParams } from '@/__tests__/__mocks__/next/navigation';
import PaginationControls from '@/components/pagination/PaginationControls';

describe('PaginationControls', () => {
  test('renders Prev and Next buttons', () => {
    render(<PaginationControls totalPages={5} />);
    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('Prev button is disabled on the first page', () => {
    render(<PaginationControls totalPages={5} />);
    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  test('Next button is disabled on the last page', () => {
    setMockSearchParams({ page: '5' });
    render(<PaginationControls totalPages={5} />);
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test('Clicking Next moves to next page', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    setMockSearchParams({ page: '1' });
    render(<PaginationControls totalPages={5} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith('?page=2');
  });

  test('Clicking Prev moves to previous page', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    setMockSearchParams({ page: '2' });
    render(<PaginationControls totalPages={5} />);

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);
    expect(mockPush).toHaveBeenCalledWith('?page=1');
  });

  test('Clicking on a page number navigates to that page', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    setMockSearchParams({ page: '1' });
    render(<PaginationControls totalPages={5} />);

    const page2Button = screen.getByRole('button', { name: /2/i });
    fireEvent.click(page2Button);
    expect(mockPush).toHaveBeenCalledWith('?page=2');
  });
});
