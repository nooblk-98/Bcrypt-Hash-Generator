/**
 * robots.js — Next.js App Router robots.txt route.
 * Accessible at /robots.txt
 */

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://bcrypt-generator.example.com/sitemap.xml',
  };
}
