import Squares from './squares';
import prefetchNav from './prefetch-nav';

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

const site_header = new Squares({
  canvas: '.js-sq-site-header',
  num_x: 'infinite',
  num_y: 1,
  size: 5,
  color: '#1d4e6d',
  fill: 'even'
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
