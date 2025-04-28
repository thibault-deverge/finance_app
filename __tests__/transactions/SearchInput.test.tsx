import { render, screen, fireEvent } from '@testing-library/react';

import SearchInput from '@/components/filters/SearchInput';

describe('SearchInput', () => {
  test('calls onChange when typing', async () => {
    const handleChange = jest.fn();
    render(
      <SearchInput
        value=""
        onChange={handleChange}
        placeholder="Search transactions"
      />
    );

    const input = screen.getByRole('searchbox', {
      name: /search transactions/i,
    });

    fireEvent.change(input, { target: { value: 'rent' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith('rent');
  });
});
