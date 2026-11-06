'use client';

import { useEffect } from 'react';

export function PwaRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.location.protocol === 'https:') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            if (process.env.NODE_ENV !== 'production') {
              console.log('[PWA] ServiceWorker registered with scope:', reg.scope);
            }
          })
          .catch((err) => {
            // Silently swallow registration errors
          });
      });
    }
  }, []);

  return null;
}
