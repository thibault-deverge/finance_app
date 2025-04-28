import { render, screen } from '@testing-library/react';
import SelectInput from '@/components/filters/SelectInput';
import '@testing-library/jest-dom';

describe('SelectInput (desktop)', () => {
  const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
  ];

  test('renders its label and placeholder when nothing is selected', () => {
    render(
      <SelectInput
        label="Choose"
        placeholder="Select..."
        value=""
        onChange={() => {}}
        options={options}
      />
    );

    expect(screen.getByText('Choose')).toBeInTheDocument();
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  test('displays the correct option label when value changes', () => {
    const { rerender } = render(
      <SelectInput
        label="Choose"
        placeholder="Select..."
        value="foo"
        onChange={() => {}}
        options={options}
      />
    );
    expect(screen.getByText('Foo')).toBeInTheDocument();

    rerender(
      <SelectInput
        label="Choose"
        placeholder="Select..."
        value="bar"
        onChange={() => {}}
        options={options}
      />
    );
    expect(screen.getByText('Bar')).toBeInTheDocument();
  });
});
