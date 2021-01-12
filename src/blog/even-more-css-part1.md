---
title: 'Writing even more CSS with Accessibility in Mind, Part 1: Progressive Enhancement'
permalink: blog/writing-even-more-css-with-accessibility-in-mind-progressive-enhancement/index.html
metadescription: >-
  Progressive enhancement is amazing. Building websites layer by layer allows for a cleaner separation of concerns, which makes the website more accessible.
date: 2020-09-09T06:58:54.969Z
image: articles/sm_css_a11y2_pe3.jpg
teaser: "About 4 years ago, [I began to focus on web accessibility](https://alistapart.com/article/my-accessibility-journey-what-ive-learned-so-far/) professionally. I read many articles and books, watched talks, followed experts, and I also shared my knowledge at meet-ups and online. The first 3 articles I wrote were [Writing HTML with Accessibility in Mind](https://medium.com/alistapart/writing-html-with-accessibility-in-mind-a62026493412), [Writing JavaScript with Accessibility in Mind](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9), and [Writing CSS with Accessibility in Mind](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939). I've shared the most exciting new things I've learned about creating inclusive experiences in each language."
tags:
  - blog
  - posts
  - a11y
---

I wrote _Writing CSS with Accessibility in Mind_ in 2017 and I’ve covered topics like font size, line height, print style sheets, hiding content, contrast, DOM order vs. visual order and focus styles. 3 years have passed, CSS has evolved, and I’ve learned new things. Therefore, I’ve decided to write about _even more CSS with accessibility in mind_.

## In this series

This series of articles covers 4 major topics:

1. **Progressive enhancement <em>(this article)</em>**
2. User preferences <em>(coming soon)</em>
3. CSS and semantics <em>(coming soon)</em>
4. Improving accessibility with CSS <em>(coming soon)</em>

## Progressive enhancement basics

<style>
  .css2-pe-l-h {
    color: #d25632; 
    font-weight:bold
  }
  .css2-pe-l-c {
    color: #1b73ba; 
    font-weight:bold
  }
  .css2-pe-l-j {
    color: #9b8800; 
    font-weight:bold
  }
</style>

I strongly believe in progressive enhancement because it focuses on content and enhances experiences layer by layer. We start with a basic but resilient foundation that works in most browsers: a well structured and semantic <span class="css2-pe-l-h">HTML document</span>. We enhance it with design and visual improvements by adding <span class="css2-pe-l-c">CSS</span>. If the browser doesn’t support CSS at all or just some properties, the site is still accessible, thanks to our strong foundation. Finally, we may add <span class="css2-pe-l-j">JavaScript</span> to enhance the experience even more. We should [be careful with JavaScript](https://v8.dev/blog/cost-of-javascript-2019) because it can affect performance negatively, especially on mobile devices.

<style>
    .css2-pe {
      font-family: sans-serif;
      line-height: 1.5;
    }

    .css2-pe ol {
      margin: 0;
      padding: 19.2rem 0 0 3.2rem;
      position: relative;
      transform: rotate(0);
      font-weight: bold;
    }

    @media (min-width: 768px) {
      .css2-pe ol {
        padding: 2.4rem 0 0 14.4rem;
      }
    }

    .css2-pe li {
      opacity: 0.8;
      margin-bottom: 0;
      position: relative;
    }

    .css2-pe li > * {
      padding-bottom: 1rem !important;
      display: inline-block;
      font-weight: normal;
    }

    li::before {
      display: block;
      content: "";
      width: 11rem;
      height: 11rem;
      position: fixed;
      left: 0;
      top: 0;
      border-radius: 50%;
      opacity: 0.1;
      transition: opacity 0.3s;
    }

    li.css2-pe-html,
    li.css2-pe-html span {
      color: #d25632;
      opacity: 1
    }

    .css2-pe-html::before {
      background: #d25632;
      width: 4.2rem;
      height: 4.2rem;
      z-index: 3;
      top: 3.4rem;
      left: 3.4rem;
      opacity: 1;
    }

    .css2-pe-css::before {
      background: #1b73ba;
      width: 7.8rem;
      height: 7.8rem;
      z-index: 2;
      top: 1.6rem;
      left: 1.6rem;
    }

    .css2-pe-html {
      z-index: 3;
    }

    .css2-pe-css,
    .css2-pe-css span {
      color:#1b73ba;
      z-index: 2;
    }

    .css2-pe-js,
    .css2-pe-js span {
      color: #9b8800;
      z-index: 1;

    }

    .css2-pe-js::before {
      background: #f3df4f;

    }

    .css2-pe-html span,
    .css2-pe--active span {
      font-weight: bold;
    }

    .css2-pe--active,
    .css2-pe--active::before {
      opacity: 1;
      cursor: default;
    }

    s {
      text-decoration-color: black;
    }
</style>

<div class="css2-pe js-css2-pe">
  <ol>
    <li class="css2-pe-html"><span>HTML - Semantic markup</span></li>
    <li class="css2-pe-css"><span>CSS - Design and visual improvements</span></li>
    <li class="css2-pe-js"><span>JS - Enhanceed experience</span></li>
  </ol>
</div>

<script>
  var css2pe = document.querySelector('.js-css2-pe').querySelectorAll('li');

  var peHighlight = function (elem, e) {
    for (var j = 0; j < css2pe.length; j++) {
      if (j <= Array.prototype.slice.call(css2pe).indexOf(elem)) {
        css2pe[j].classList.add('css2-pe--active')
      }
    }
  }

  var peUnHighlight = function (e) {
    for (var j = 0; j < css2pe.length; j++) {
      css2pe[j].classList.remove('css2-pe--active')
    }
  }

  for (var i = 0; i < css2pe.length; i++) {
    (function() {
      var elem = css2pe[i];

      if (i > 0) {

        var span = elem.querySelector('span')
        span.setAttribute('tabindex',0)

        var peH = peHighlight.bind(null, elem)
        var peUH = peUnHighlight.bind(null, elem)

        span.addEventListener('mouseenter', peH);
        span.addEventListener('focus', peH);
        span.addEventListener('mouseleave', peUH);
        span.addEventListener('blur', peUH);
      }
    })(i)
  }
</script>

### Example

Let’s take a simple form that allows users to enable tracking.

<style>
  .css2-pe-toggle button {
    background: #36b1bf;
    font-weight: bold;
    outline: none;
    padding: 1.8rem 3.125rem 1.5rem;
    font-family: inherit;
    line-height: 1;
    border: none;
    font-size: 1.8rem;
    margin-top: 1rem;
  }

  .css2-pe-toggle form {
    margin-bottom: 3rem;
  }

  .css2-pe-toggle-css {
    padding-left: 7.5rem;
    position: relative;
    display: block;
    margin-bottom: 1rem;
  }

  .css2-pe-toggle-css::before,
  .css2-pe-toggle-css::after {
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    display: inline-block;
    transition: transform 0.3s;
    height: 2.7rem;
  }

  .css2-pe-toggle-css::before {
    width: 6rem;
    border: 2px solid #aaa;
    border-radius: 4px;
  }

  .css2-pe-toggle-css::after {
    width: 3rem;
    background: #aaa;
    left: 0.1rem;
    top: 0.1rem;
  }

    @media (min-width: 768px) {
    .css2-pe-toggle-css::before {
      top: 0.4rem;
    }
    .css2-pe-toggle-css::after {
      top: 0.5rem;
      height: 2.8rem;
    }
  }

  [type="checkbox"]:focus  + .css2-pe-toggle-css::before {
    border-color: #1c4e6c;
    outline-offset: 2px;
    outline: 2px solid #f23c50;
  }

  [type="checkbox"]:checked + .css2-pe-toggle-css::before {
    border-color: #1c4e6c;
  }

  [type="checkbox"]:checked + .css2-pe-toggle-css::after {
    border-color: #1c4e6c;
    background-color: #1c4e6c;
    transform: translateX(3rem);
  }
</style>

<div class="css2-pe-toggle">

  <h4 class="css2-pe-l-h">HTML</h4>
  We want to make sure that the only real dependency is core HTML.

```html
<form>
  <input type="checkbox" id="tracking" class="u-vh" />
  <label for="tracking">Turn on tracking.</label>

  <button type="submit">Save settings</button>
</form>
```

  <form>
    <input type="checkbox" id="tracking2">
    <label for="tracking2">Turn on tracking.</label>

<button type="submit">Save settings</button>

  </form>

The button does nothing here. Let’s just assume that there’s a server-side script that saves the settings.

  <h4 class="css2-pe-l-c">CSS</h4>

Our checkbox looks a bit boring, let’s add another layer. We can improve the design with CSS. We add a class (`.u-vh`) to hide the checkbox visually and use pseudo elements to create something that looks like a switch toggle.

  <form>
    <input type="checkbox" id="tracking" class="u-vh" style="top: auto">
    <label for="tracking" class="css2-pe-toggle-css">Turn on tracking.</label>

<button type="submit">Save settings</button>

  </form>

```css
.label {
  padding-left: 7.5rem;
  position: relative;
}

.label::before,
.label::after {
  position: absolute;
  left: 0;
  top: 0;
  content: '';
  display: inline-block;
  transition: transform 0.3s;
  height: 2.6rem;
}

.label::before {
  width: 6rem;
  border: 2px solid #aaa;
  border-radius: 4px;
}

.label::after {
  width: 3rem;
  background: #aaa;
  left: 0.2rem;
  top: 0.2rem;
}

[type='checkbox']:focus + .label::before {
  border-color: #1c4e6c;
  outline-offset: 2px;
  outline: 2px solid #f23c50;
}

[type='checkbox']:checked + .label::before {
  border-color: #1c4e6c;
}

[type='checkbox']:checked + label::after {
  border-color: #1c4e6c;
  background-color: #1c4e6c;
  transform: translateX(3rem);
}

.u-vh {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}
```

<h4 class="css2-pe-l-j">JS</h4>

Now we can enhance the form some more and save settings as the user clicks the checkbox so that their settings persist even when the page crashes or they close the window accidentally.

```js
document.querySelector('#tracking').addEventListener('change', function (e) {
  // Save in database or in a local storage, etc..
  alert('Saved: ' + e.target.checked);
});
```

<form>
  <input type="checkbox" id="tracking3" class="u-vh" style="top: auto">
  <label for="tracking3" class="css2-pe-toggle-css">Turn on tracking.</label>

<button type="submit" class="css2-pe-toggle-btn">Save settings</button>

</form>

<script>
  document.getElementById('tracking3').addEventListener('change', function(e) {
    alert('Save: ' + e.target.checked)
  })
</script>

**Please note that this switch toggle is not accessible** because it doesn’t communicate state well enough. I just built it that way to illustrate progressive enhancement. If you want to learn how to create accessible toggle buttons, read [Toggle Buttons](https://inclusive-components.design/toggle-button/) by Heydon Pickering.

</div>

We've started with a basic but resilient foundation that works in most browsers and we've enhanced it feature by feature. Instead of loading multiple megabytes of polyfills, compiled JavaScript and CSS workarounds onto users, we only give browsers code they can handle without additional help. This usually results in less JavaScript and CSS, better performance and happier users. Progressive enhancement is the key to giving more people access to our content by serving code according to the capabilities of the end user’s browser and device.

I’ve been following the basics of this principle for many years, but only recently I discovered how I can bring my practices up to date and use progressive enhancement together with modern CSS and JavaScript.

### Rediscovering Progressive Enhancement

Nokia released an updated version of its iconic Nokia 3310 a few years ago. I bought it because it was affordable and I wanted to see how the surfing experience was in Opera Mini. You can download Opera Mini to your Android or iOS phone, too, but by default there isn’t much of a difference between Opera Mini and the default browser on these devices. Opera Mini on the Nokia 3310 runs on an operating system called Nokia Series 30+ and its function range is quite limited. If you search for almost any feature on [caniuse.com](http://caniuse.com/) and you see a red rectangle, that’s the Opera Mini we’re talking about. I’ve tested a website I’ve recently built using modern CSS and JS on the Nokia 3310 and after some minor tweaks it worked. Just like that. Guess why! Exactly, progressive enhancement.  
The fact that JavaScript is just another layer and not a dependency allows users with low-end devices to access the website.

<div class="css2-pe">
  <ol>
    <li class="css2-pe-html"><span>HTML - Semantic markup</span></li>
    <li class="css2-pe-css css2-pe--active"><span>CSS - Design and visual improvements</span></li>
    <li class="css2-pe-js"><span><s>JS - Enhanceed experience</s></span></li>
  </ol>
</div>

You can read more about the process in [The beauty of progressive enhancement](https://www.matuzo.at/blog/beauty-of-progressive-enhancement/).

HTML, CSS and JS are large layers in our progressively enhanced website, but each layer may comprise even more layers.

## Progressively enhancing CSS

There are different ways in CSS to define layers and help browsers serve them accordingly.

### Let CSS do its thing

CSS has progressive enhancement at its core. This is best illustrated by its error handling: [When errors occur in CSS](https://www.w3.org/TR/css-syntax-3/#error-handling), the parser doesn’t stop, but it attempts to only skip content it can’t interpret before returning to parsing as normal.

The following code won’t throw any errors, the CSS parser will just skip the line it doesn’t understand and apply a `#153a51` color and `#36b1bf` background color to all `div` elements.

```css
div {
  color: #153a51;
  css-is: amazing;
  background: #36b1bf;
}
```

<style>
  .css2-error {
    color: #153a51; 
    background: #36b1bf;
    width: 10rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
</style>

<div class="css2-error">
  CSS &lt;3
</div>

The parser skips the second line in the declaration block because the property `css-is` doesn’t exist, but errors aren’t always mistakes. A browser like Firefox might interpret a new property without issues, while the same property looks like an error in Internet Explorer. For example: If you add the following rule to a style sheet, modern browsers apply a grid with 2 `150px` columns to each unordered list, while browsers that don’t support CSS Grid Layout just skip the Grid declarations.

```css
ul {
  display: flex; /* Fallback for older browsers */
  flex-wrap: wrap; /* Allow items to wrap */
  display: grid; /* Most modern browsers */
  grid-template-columns: repeat(
    auto-fill,
    150px
  ); /* Add as many 150px columns per line as possible */
}

ul > * {
  border: 1px solid #36b1bf;
  margin: 0 0.5rem;
}
```

A modern browser first sets the `display` property to `flex` and allows wrapping of flex items, then it overwrites the first declaration and sets the `display` to `grid` and forgets about wrapping again because `flex-wrap` doesn’t work with grid items. Last, it adds grid columns with its own wrapping mechanism.

<style>
.css2-listgrid {
  display: flex; 
  flex-wrap: wrap; 
  list-style: none;
  padding: 0;
  margin: 0;
}

.css2-listgrid--grid {
  display: grid; 
  grid-template-columns: repeat(auto-fill, 150px);
}

.css2-listgrid > * {
  border: 1px solid #36b1bf;
  margin-bottom: 0 !important;
  margin: 0 0.5rem;
}
</style>

<ul class="css2-listgrid css2-listgrid--grid">
  <li>Element 1</li>
  <li>Element 2</li>
</ul>

An older browser sets `display` to `flex` and allows wrapping of flex items and skips the rest.
The list looks a little different, but most users probably won’t even notice.

<ul class="css2-listgrid">
  <li>Element 1</li>
  <li>Element 2</li>
</ul>

**Here’s another example:**  
We can use `shape-outside` to make a paragraph that wraps an image look more interesting.

![A photo of a dog from the side looking up wearing a red party hat with white dots and text that wraps around the shape of the dogs head and body.](https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_1200/v1599629649/articles/Screen_Shot_2020-08-15_at_13.22.43.png)
<noscript><img class="no-script" src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_1200/v1599629649/articles/Screen_Shot_2020-08-15_at_13.22.43.png" alt="A photo of a dog from the side looking up wearing a red party hat with white dots and text that wraps around the shape of the dogs head and body."></noscript>

```html
<img
  src="dog.jpg"
  width="400"
  alt="A dog from the side looking up wearing a red party hat with white dots"
/>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt…</p>
```

```css
img {
  shape-outside: polygon(
    0.23% 2px,
    17.11% 0.84%,
    61.14% 21.01%,
    69.91% 20.17%,
    86.88% 27.73%,
    90.64% 36.09%,
    86.53% 50.56%,
    80.07% 79.29%,
    86.55% 99.48%,
    0px 100%
  );
  shape-margin: 20px;
  float: left;
  display: inline-block;
}
```

Most browsers support the `shape-outside` and `shape-margin` properties. Edge < 18, Internet Explorer, and Opera Mini are an exception. This is what users of these browsers will get.

![A photo of a dog from the side looking up wearing a red party hat with white dots and text that wraps around the photo.](https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_1200/v1599629648/articles/Screen_Shot_2020-08-15_at_13.22.31.png)
<noscript><img class="no-script" src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_1200/v1599629648/articles/Screen_Shot_2020-08-15_at_13.22.31.png" alt="A photo of a dog from the side looking up wearing a red party hat with white dots and text that wraps around the photo."></noscript>

It still looks nice and it’s accessible, just not as fancy. Check out [CSS Shapes Demo / shape-outside](https://codepen.io/matuzo/pen/yEYyOB?editors=1100) on CodePen.

### Cutting the mustard

If people visit our websites in browsers like <abbr title="Internet Explorer">IE</abbr> 11 or Opera Mini, it’s fair to assume that they’re not using a high-end device. I like to make sure that they only get as much code as they need to access the content and still get a decent experience. Anything extra will only be served to more capable browsers and potentially faster devices. This means I have to decide at which point I want to draw the line between full and limited functionality for certain features. There are different ways of doing that.

**Let CSS do its thing 2**

Again, we can let CSS do its thing. For example, if we don’t want to bother users of legacy browsers with having to download hundreds of kilobytes in font files, we can serve our fonts only in the `woff2` format ([see .woff2 support on caniuse.com](https://caniuse.com/#search=woff2)).

```css
@font-face {
  font-family: 'Lobster';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Lobster'), url('fonts/Lobster-Regular.woff2') format('woff2');
}

body {
  font-family: Lobster, sans-serif;
}
```

Since a browser like Internet Explorer doesn’t support `woff2` it won’t try to download the file and it will use the `sans-serif` fallback font. (Instead of just relying on the generic font family as a fallback, you could also use a system font similar in style and shape).

**Feature detection in CSS**

Another approach, often referred to as “[cutting the mustard](https://responsivenews.co.uk/post/18948466399/cutting-the-mustard)”, is to check whether a browser supports a certain feature and only then, if it cuts the mustard, serve additional code.

We could make a basic vertical layout and enhance it only if the browser supports custom properties. Feature detection is built into CSS in the form of the `@supports` at-rule <abbr title="also knows as">aka</abbr> [feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports).

```css
:root {
  --display: flex;
  --gap: 1rem;
}

/* Applied in all browsers */
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Only browsers that support custom properties */
@supports (display: var(--supports)) {
  ul {
    display: var(--display);
    gap: var(--gap);
    flex-wrap: wrap;
  }
}
```

[Most browsers support feature queries](https://caniuse.com/#feat=css-featurequeries).

**Note:** It’s not possible to check support for a property only, you have to provide a value for the property. Something like `@supports (display) {}` won’t work.

**Feature detection in JS**

I've built a large website recently with many components, some of them enhanced with JavaScript. Each component works with and without JavaScript. This is important because we only serve a critical amount of JavaScript to users of legacy browsers, which means that they will see most components in their no-JS state.

We’re cutting the mustard by adding this block of Javascript to the `<head>` of our site.

```html
<head>
  <script type="module">
    // Add the `.js` class to the <html> element
    document.documentElement.classList.add('js');
  </script>
</head>
```

The `type="module"` attribute and value ensures that the scripts block will be only executed, if the [browsers supports JavaScript modules](https://caniuse.com/#feat=es6-module). What’s great about this is that even with the attribute in place we don’t actually have to use JavaScript modules, we can write our JavaScript as usual.

If the `<html>` element contains the class `js`, we know that it’s a modern browser because it supports JavaScript modules. This allows us to style components accordingly.

In an accordion component, for example, the content is visible by default.

```html
<body>
  <div class="accordion">
    <h3 class="accordion__heading">Accordion Heading</h3>
    <div class="accordion__panel">
      <p>
        Accordion panel content visibile by default and only hidden, if the
        `.js` class is present.
      </p>
    </div>
  </div>
</body>
```

<style>
.css2-pe-example {
  width: 85%;
  padding: 2rem;
  border: 5px solid #36b1bf;
  margin: 0 auto;
}

.css2-pe-example .accordion__heading {
  margin-top: 0;
}

.css2-pe-example .accordion__panel--js {
  display: none;
}

.css2-pe-example .accordion__panel--visible {
  display: block;
}

.accordion__heading button {
  appearance: none;
  border: none;
  padding: none;
  font-size: inherit;
  font-family: inherit;
  padding: 0;
  color: inherit;
  font-weight: inherit;
}
</style>

<div>
  <div class="css2-pe-example">
    <div class="accordion">
      <h3 class="accordion__heading">Accordion Heading</h3>
      <div class="accordion__panel">
        <p>Accordion panel content visibile by default and only hidden, if the `.js` class is present.</p>
      </div>
    </div>
  </div>
</div>

We hide the content (`.accordion__panel`) and add attributes, events, etc. only if the browsers cuts the mustard.

```css
.js .accordion__panel {
  display: none;
}

.js .accordion__panel--visible {
  display: block;
}

.accordion__heading button {
  appearance: none;
  border: none;
  padding: none;
  font-size: inherit;
  font-family: inherit;
  padding: 0;
  color: inherit;
  font-weight: inherit;
}
```

We replace the text content within the heading with a button and add a click event to the button that toggles the visibility of the panel.

```js
// Select elements
const accordion = document.querySelector('.js-accordion');
const heading = accordion.querySelector('h3');
const panel = accordion.querySelector('div');
const btn = document.createElement('button');

// The panel is hidden by default, so set aria-expanded to false
btn.setAttribute('aria-expanded', false);
// Associate the button with the panel (works only with some screen readers)
btn.setAttribute('aria-controls', 'panel_1');
panel.id = 'panel_1';

// Event that toggles aria-expanded and the panel visibility
btn.addEventListener('click', (e) => {
  const state = btn.getAttribute('aria-expanded') === 'true' ? false : true;
  btn.setAttribute('aria-expanded', state);
  panel.classList.toggle('accordion__panel--visible');
});

// Replace text in heading with the button
btn.textContent = heading.textContent;
heading.textContent = '';
heading.appendChild(btn);
```

<div>
  <div class="css2-pe-example">
    <div class="accordion js-accordion">
      <h3 class="accordion__heading">Accordion Heading</h3>
      <div class="accordion__panel accordion__panel--js">
        <p>Accordion panel content visibile by default and only hidden, if the `.js` class is present.</p>
      </div>
    </div>
  </div>
</div>

<script>
  var accordion = document.querySelector('.js-accordion')
  var heading = accordion.querySelector('h3')
  var panel = accordion.querySelector('div')
  var btn = document.createElement('button');
  btn.setAttribute('aria-expanded', false)
  btn.setAttribute('aria-controls', 'panel_1')
  btn.id = 'acc_1' 
  btn.textContent = heading.textContent
  btn.addEventListener('click', (e) => {
    var state = btn.getAttribute('aria-expanded') === 'true' ? false : true;
    btn.setAttribute('aria-expanded', state)
    console.log(btn.getAttribute('aria-expanded'))
    panel.classList.toggle('accordion__panel--visible')
  })

  heading.textContent = ''
  heading.appendChild(btn)

  panel.id = 'panel_1'
</script>

What’s great about this approach is that we can use <abbr title="ECMAScript">ES6</abbr> without having to compile it with Babel because a browser that supports JS Modules also support ES6 syntax. No JavaScript for users of legacy browsers and less JS for everyone else 🎉.

```html
<script src="accordion.js" type="module"></script>
```

**Note:** This accordion is not complete. Check-out [Accordion Example | WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html) for a fully accessible and functional example.

### Conclusion

Progressive enhancement is amazing. Building websites layer by layer allows for a cleaner separation of concerns, which makes the website more accessible. If one layer doesn't work in a specific browser, it doesn't matter because the layers below will make sure that users can still access our content.

Improve the experience of your users by making Progressive Enhancement to one of your core principles. You can learn more about it in the following articles:

### Resources

- [Understanding Progressive Enhancement](https://alistapart.com/article/understandingprogressiveenhancement/) by Aaron Gustafson
- [Resilient web design](https://resilientwebdesign.com/) by Jeremy Keith
- [The beauty of progressive enhancement](https://www.matuzo.at/blog/beauty-of-progressive-enhancement/)
- [Cutting the mustard - 2018 edition](https://fettblog.eu/cutting-the-mustard-2018/) by Stefan Baumgartner

### Recording

If you want to learn more about CSS and accessibility and you don’t want to wait for me to publish the other articles in this series, you can watch my talk about writing CSS with accessibility in mind at #ID24:

<div class="content__video-wrapper"><div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/o6ssu5oKyaU" title="Writing even more CSS with Accessibility in Mind"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>
