import { useEffect } from 'react';

function setMeta(selector: string, attribute: 'content' | 'href', value: string) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

export function useDocumentMeta({ title, description, url }: { title: string; description: string; url?: string }) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    if (url) {
      setMeta('meta[property="og:url"]', 'content', url);
      setMeta('link[rel="canonical"]', 'href', url);
    }
  }, [title, description, url]);
}
