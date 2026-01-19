import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renders Next.js logo image', () => {
    render(<Home />);

    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/next.svg');
    expect(logo).toHaveAttribute('width', '100');
    expect(logo).toHaveAttribute('height', '20');
  });

  it('contains deploy and documentation links with correct attributes', () => {
    render(<Home />);

    // Check Deploy Now link
    const deployLink = screen.getByRole('link', { name: /deploy now/i });
    expect(deployLink).toBeInTheDocument();
    expect(deployLink).toHaveAttribute(
      'href',
      'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
    );
    expect(deployLink).toHaveAttribute('target', '_blank');
    expect(deployLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Check Documentation link
    const docsLink = screen.getByRole('link', { name: /^documentation$/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute(
      'href',
      'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
    );
    expect(docsLink).toHaveAttribute('target', '_blank');
    expect(docsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
