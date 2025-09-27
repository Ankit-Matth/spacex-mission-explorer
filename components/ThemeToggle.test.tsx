import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  it('renders the moon icon for light theme initially', () => {
    localStorage.setItem('theme', 'light');

    render(<ThemeToggle />);

    const moonIcon = screen.getByAltText('Switch to dark mode');
    expect(moonIcon).toBeInTheDocument();

    const sunIcon = screen.queryByAltText('Switch to light mode');
    expect(sunIcon).not.toBeInTheDocument();
  });

  it('toggles to dark theme when clicked', async () => {
    localStorage.setItem('theme', 'light');
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(toggleButton);

    const sunIcon = await screen.findByAltText('Switch to light mode');
    expect(sunIcon).toBeInTheDocument();

    const moonIcon = screen.queryByAltText('Switch to dark mode');
    expect(moonIcon).not.toBeInTheDocument();

    expect(localStorage.getItem('theme')).toBe('dark');
  });
});