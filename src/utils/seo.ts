import { BlogPost } from '../types';

export function updateArticleSEO(post: BlogPost) {
  // Update Page Title
  document.title = `${post.title} | REALPREMISE Tech Blog`;

  // Helper function to set or create meta tag
  const setMeta = (attrName: string, attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const articleUrl = `${window.location.origin}/#/blog/${post.slug || post.id}`;

  // Basic Meta
  setMeta('name', 'description', post.summary);
  setMeta('name', 'keywords', post.tags.join(', '));

  // OpenGraph Tags
  setMeta('property', 'og:title', post.title);
  setMeta('property', 'og:description', post.summary);
  setMeta('property', 'og:type', 'article');
  setMeta('property', 'og:url', articleUrl);
  setMeta('property', 'og:image', post.coverUrl.startsWith('http') ? post.coverUrl : `${window.location.origin}${post.coverUrl}`);
  setMeta('property', 'og:site_name', 'REALPREMISE Blog');

  // Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', post.title);
  setMeta('name', 'twitter:description', post.summary);
  setMeta('name', 'twitter:image', post.coverUrl.startsWith('http') ? post.coverUrl : `${window.location.origin}${post.coverUrl}`);

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', articleUrl);

  // Inject Schema.org BlogPosting JSON-LD for Google Search Engine Indexing
  let jsonLdScript = document.querySelector('script[id="json-ld-article"]') as HTMLScriptElement;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = 'json-ld-article';
    document.head.appendChild(jsonLdScript);
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.summary,
    'image': [post.coverUrl.startsWith('http') ? post.coverUrl : `${window.location.origin}${post.coverUrl}`],
    'datePublished': post.publishedAt,
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'jobTitle': post.author.role
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'REALPREMISE',
      'logo': {
        '@type': 'ImageObject',
        'url': `${window.location.origin}/images/real_premise_minimal_logo_1790719519164.jpg`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    'keywords': post.tags.join(', ')
  };

  jsonLdScript.textContent = JSON.stringify(jsonLdData);
}

export function resetDefaultSEO() {
  document.title = 'REALPREMISE - Engenharia & Soluções Web';

  const jsonLdScript = document.querySelector('script[id="json-ld-article"]');
  if (jsonLdScript) {
    jsonLdScript.remove();
  }
}
