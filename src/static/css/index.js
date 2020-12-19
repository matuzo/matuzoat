import enhanceDemos from './demo';

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

/**
 * Smoothly scroll to top
 */

if (document.querySelector('.js-scroll-top')) {
  document.querySelector('.js-scroll-top').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.js-logo').focus();
  });
}

/**
 * Enhance demos with JS
 * Adds "Replay" Button
 * Adds Intersection Observer to auto play animations
 */
enhanceDemos();

/**
 * Order demo
 */
var demos = document.querySelectorAll('.js-a-focus-demo');
var activeLink = [];
for (let i = 0; i < demos.length; i++) {
  activeLink.push(0);

  (function () {
    const demo = demos[i];
    var links = demo.querySelectorAll('a, button');
    var animating = false;
    var focusInterval;

    var playpause = document.createElement('button');
    var playpause_inner = document.createElement('span');
    playpause.classList.add('btn');
    playpause_inner.classList.add('btn__inner');
    playpause.appendChild(playpause_inner);

    var buttonTextActive = 'Stop animation';
    var buttonTextInactive = 'Play animation';

    if (demo.hasAttribute('data-button')) {
      buttonTextInactive = demo.getAttribute('data-button');
    }

    setButtonText(buttonTextInactive);

    demo.insertBefore(playpause, demo.firstChild);

    playpause.addEventListener('click', function () {
      if (animating) {
        clearInterval(focusInterval);
        playpause_inner.textContent = buttonTextInactive;
      } else {
        links[activeLink[i]].classList.add('focus');

        focusInterval = window.setInterval(focusNext, 700);
        setButtonText(buttonTextActive);
      }

      animating = !animating;
    });

    function setButtonText(text) {
      playpause_inner.textContent = text;
    }

    function focusNext() {
      if (activeLink[i] < links.length - 1) {
        activeLink[i]++;
      } else {
        activeLink[i] = 0;
      }

      demo.querySelector('.focus').classList.remove('focus');

      links[activeLink[i]].classList.add('focus');
    }
  })(i);
}

// Lighthouse demos

function addDemoLighthouseTest() {
  var lighthouseTests = document.querySelectorAll('.js-lighthouse-test');

  if (lighthouseTests.length === 0) {
    return;
  }

  for (let i = 0; i < lighthouseTests.length; i++) {
    const lighthouseTest = lighthouseTests[i];
    const button = lighthouseTest.querySelector('.js-run-lighthouse-test');
    button.addEventListener('click', function (e) {
      button.querySelector('span').textContent = 'Running tests…';
      lighthouseTest.querySelector('.js-lighthouse-status').textContent =
        'Running tests…';

      setTimeout(function () {
        lighthouseTest.classList.add('lighthouse-test--finished');
        lighthouseTest.querySelector('.js-lighthouse-status').textContent =
          'Tests finished. Accessibility score: 100.';
      }, 1000);
    });
  }
}

addDemoLighthouseTest();
