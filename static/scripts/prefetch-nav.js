/**
 * Inspired by quicklink.
 * https://github.com/GoogleChromeLabs/quicklink
 */
 
import requestIdleCallback from './request-idle-callback.js';

function createPrefetchLink(url) {
  const link = document.createElement('link');

  // If prefetch supported    
  if ((link.relList || {}).supports && !link.relList.supports('prefetch')) {
    return;
  }

  link.rel = 'prefetch';
  link.href = url;

  document.head.appendChild(link);
}

function getLinks() {
  // Get all links in main nav
  const links = document.querySelectorAll('.js-nav-main a');

  for(let i = 0; i < links.length; i++) {
    createPrefetchLink(links[i].href);
  }
}

function prefetchNav() {
  // don't prefetch if 2g connection or data-saver enabled
  if (navigator.connection.effectiveType.includes('2g') || navigator.connection.saveData) {
    return;
  }

  // start as soon as the browser isn't busy anymore
  requestIdleCallback(() => {
    getLinks();
  })
}

export default prefetchNav;
