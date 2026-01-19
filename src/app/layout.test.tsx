import React from 'react';
import type { Metadata } from 'next';

// Mock next/font/google
const mockGeistSans = {
  variable: '--font-geist-sans',
};

const mockGeistMono = {
  variable: '--font-geist-mono',
};

jest.mock('next/font/google', () => ({
  Geist: () => mockGeistSans,
  Geist_Mono: () => mockGeistMono,
}));

describe('RootLayout', () => {
  // Import after mocking
  let RootLayout: any;
  
  beforeAll(() => {
    RootLayout = require('./layout').default;
  });

  it('renders children correctly', () => {
    const testChild = <div data-testid="test-child">Test Child Content</div>;
    const result = RootLayout({ children: testChild });

    // Verify the structure contains the children
    expect(result.type).toBe('html');
    expect(result.props.lang).toBe('en');
    expect(result.props.children.type).toBe('body');
    expect(result.props.children.props.children).toBe(testChild);
  });

  it('applies Geist font classes to html body', () => {
    const testChild = <div>Test Content</div>;
    const result = RootLayout({ children: testChild });

    // Check the body element has the correct className
    const bodyElement = result.props.children;
    const expectedClasses = `${mockGeistSans.variable} ${mockGeistMono.variable} antialiased`;
    
    expect(bodyElement.props.className).toBe(expectedClasses);
    expect(bodyElement.props.className).toContain('--font-geist-sans');
    expect(bodyElement.props.className).toContain('--font-geist-mono');
    expect(bodyElement.props.className).toContain('antialiased');
  });
});
