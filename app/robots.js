export default function robots() {
  return {
    rules: [
      {
        userAgent: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Applebot'],
        allow: '/',
        disallow: ['/admin/', '/api/', '/cart', '/login', '/private/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/cart', '/login', '/private/'],
      },
    ],
    sitemap: [
      'https://onestoppropertysolution.in/sitemap.xml',
    ],
    host: 'https://onestoppropertysolution.in',
  };
}