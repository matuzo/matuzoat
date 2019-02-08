import Squares from './squares';
import prefetchNav from './prefetch-nav';
import lazyLoad from './lazyload';
import enhanceDemos from './demo';
require('focus-visible');

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

const home_tl = new Squares({
  canvas: '.js-sq-tl',
  num_x: 1,
  num_y: 1,
  pattern: '1',
  color: '#36B1BF'
});

const home_tr = new Squares({
  canvas: '.js-sq-tr',
  num_x: 2,
  num_y: 1,
  pattern: '1,1',
  color: '#36B1BF'
});

const home_br = new Squares({
  canvas: '.js-sq-br',
  num_x: 1,
  num_y: 2,
  pattern: '1,1',
  color: '#F23C50'
});

const home_bl = new Squares({
  canvas: '.js-sq-bl',
  num_x: 2,
  num_y: 2,
  pattern: '1,0,1,1',
  color: '#F23C50'
});

const home_intro = new Squares({
  canvas: '.js-sq-home-intro',
  num_x: 6,
  num_y: 5,
  color: '#568b8e',
  size: 10,
  pattern: `0,0,1,1,0,1,
    0,1,1,0,0,1,
    1,1,0,0,0,1,
    0,1,1,0,0,0,
    0,0,1,1,0,1`
});

/**
 * Random emoji
 */

function getRandomEmoji() {
  const emojis = ['🤤', '🐳', '🍻', '👊🏻', '🍳'];

  const emoji = emojis[Math.round(Math.random() * (emojis.length - 1))];
  return emoji;
}

if (document.querySelector('.js-random-emoji')) {
  document.querySelector('.js-random-emoji').textContent = getRandomEmoji();
}

/**
 * Smoothly scroll to top
 */

if (document.querySelector('.js-scroll-top')) {
  document.querySelector('.js-scroll-top').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.js-logo').focus();
  });
}

/**
 * Prefetch links in nav for better perceived performance
 */

prefetchNav();

// history.pushState(
//   { theme: location.pathname.replace(/\//g, '') },
//   location.pathname,
//   location.pathname
// );

// function linkPostlist() {
//   event.preventDefault();
//   const link = event.target.closest('a');
//   const themeClass = `${link.dataset.publication}-${link.dataset.post}`;
//   document.documentElement.setAttribute('data-theme', themeClass);
//   history.pushState({ theme: themeClass }, link.href, link.href);
//   loadPage(link.href);
// }

// if (document.querySelector('.js-post-list')) {
//   document
//     .querySelector('.js-post-list')
//     .addEventListener('click', linkPostlist);
// }

// window.onpopstate = function(e) {
//   if (e.state) {
//     document.documentElement.setAttribute('data-theme', e.state.theme);
//     loadPage(location.pathname);
//   }
// };

// function loadPage(url) {
//   const main = document.querySelector('.js-site-content');
//   main.innerHTML = '';
//   main.classList.add('site__content--hidden');

//   var request = new XMLHttpRequest();

//   request.open('GET', url, true);

//   request.onload = function() {
//     const container = document.createElement('div');

//     if (this.status === 200) {
//       container.innerHTML = this.response;
//       main.innerHTML = container.querySelector('.js-site-content').innerHTML;
//       main.classList.remove('site__content--hidden');
//       if (main.querySelector('.js-post-list')) {
//         main
//           .querySelector('.js-post-list')
//           .addEventListener('click', linkPostlist);
//       }

//       lazyLoad(main.querySelectorAll('img[data-src]'));
//     }
//   };

//   request.onerror = function() {
//     page_content.innerHTML =
//       "For some reason I couldn't connect to the server, please try later again.";
//   };

//   request.send();
// }

// Lazy load images
lazyLoad(document.querySelectorAll('.lazy'));

/** 
 * Enhance demos with JS
 * Adds "Replay" Button
 * Adds Intersection Observer to auto play animations 
 */
enhanceDemos();


