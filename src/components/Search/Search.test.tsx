import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Search } from './Search';

describe('Search', () => {
  it('renders current query and calls change handler', () => {
    const handleSearchChange = vi.fn();

    render(
      <Search searchQuery="alp" onSearchChange={handleSearchChange} />,
    );

    const input = screen.getByRole('searchbox') as HTMLInputElement;

    expect(input.value).toBe('alp');

    fireEvent.change(input, {
      target: {
        value: 'alpha',
      },
    });

    expect(handleSearchChange).toHaveBeenCalledWith('alpha');
  });
});
