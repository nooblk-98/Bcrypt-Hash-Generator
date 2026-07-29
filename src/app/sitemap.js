/**
 * sitemap.js — Next.js App Router sitemap route.
 * Accessible at /sitemap.xml
 */

export default function sitemap() {
  const baseUrl = 'https://bcrypt-generator.example.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
