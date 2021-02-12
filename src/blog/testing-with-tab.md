---
title: 'One of my favourite accessibility testing tools: The Tab Key.'
metadescription: Using the keyboard only will tell you a lot about the accessiblity of your website.
date: 2020-02-20T06:41:15.944Z
intro: ''
teaser: >-
  I’ve been employed for about a year now and many things are different compared to being a freelancer. One interesting thing in my specific situation is that I have to evaluate the accessibility of third-party tools regularly. Usually there’s no time for a full audit, I have to gain a good overview of the quality of a product as quickly as possible.
tags:
  - blog
  - posts
  - a11y
image: articles/sm_tab.png
---

I’ve already shared [6 things I check on every website I build](/blog/beyond-automatic-accessibility-testing-6-things-i-check-on-every-website-i-build/), but this time I want to focus on one of the most powerful testing tools: The <kbd>Tab</kbd> key.

Let’s say, you’ve managed to score 100 on the Lighthouse accessibility audit. [This doesn’t necessarily mean that your site is accessible](/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/), you’ve just laid the groundwork for the actual testing. A next step could be putting your mouse away and using the keyboard only to navigate your site.

Here’s what pressing the <kbd>Tab</kbd> key will tell you about your website:

## 1. Focus styles

If you press the <kbd>Tab</kbd> key, do you see which item on the page is highlighted?
No? Use `:focus{ }`, `:focus-within{ }`, or `:focus-visible{ }` to style elements in their focus state.

<figure class="figure">
  <span class="content__image-wrapper">
     <img class="content__image" src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_800/v1582178732/articles/tabkey/tab_a11y_carie.png" alt="A focus linked with a background-color and a dotted outline.">
  </span>

  <figcaption>Beautiful focus styles on <a href="https://cariefisher.com/">Carie Fishers website</a>.</figcaption>
</figure>

```css
a:focus {
  background-color: #b426ff;
  outline: 5px solid #ea3bcb;
}
```

### Learn more about focus styles

- [Focusing on Focus Styles](https://css-tricks.com/focusing-on-focus-styles/)
- [:focus on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus)
- [:focus-within on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)
- [focus visible polyfill](https://github.com/WICG/focus-visible)

## 2. Interactive elements

Can you reach interactive elements like links, buttons, form elements, or video controls?
No? Work on your HTML. You’re probably using `<div>`, `<span>`, `<svg>` only, etc. where you should be using `<input>`, `<button>` or `<a>`.

Don’t use `div`s for buttons. This fake button is not accessible to keyboard and screen reader users.

```html
<div class="btn" onclick="send()">  Send</div>
```

Do this instead:

```html
<button class="btn" onclick="send()">  Send</button>
```

### Learn more about links and buttons

- [#3 image-buttons on HTMHell](https://www.htmhell.dev/3-image-buttons/)
- [The Links vs. Buttons Showdown ](https://www.youtube.com/watch?v=8XjwDq9zG4I)

## 3. Real buttons

You can reach a button, but nothing happens when you press <kbd>Enter</kbd> or <kbd>Space</kbd>? It’s probably still not a real `<button>` or `<input type="button">`.

You can make fake buttons tabbable and you can change their semantics, but you only get key events by default with real buttons.

```html
<div class="btn" tabindex="0" role="button" onclick="send()">  Send</div>
```

Do this instead:

```html
<button class="btn" onclick="send()">  Send</button>
```

### Learn more about buttons

- [Just use button -- A11ycasts #05](https://www.youtube.com/watch?v=CZGqnp06DnI)

## 4. Skip links

Do you have to tab through a lot of elements before you can reach a certain part of your UI? You probably want to implement skip links.

<figure class="figure">
  <span class="content__image-wrapper">
     <img class="content__image" src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_800/v1582178732/articles/tabkey/tab_a11y_tatiana.png" alt="A skip link shows up in the top left corner when focused.">
  </span>

  <figcaption>Skip link on <a href="https://tatianamac.com/">Tatiana Mac’s website</a>.</figcaption>
</figure>

### Learn more about skip links

- [“Skip Navigation” Links](https://webaim.org/techniques/skipnav/)

## 5. Focus management

When you press a button and a modal/dialog pops up, can you access its contents immediately? No? You probably have to shift focus from the button to the modal.

```js
function showModal() {
  ...
  // Store the last focused element
  lastFocusedElement = document.activeElement;

  var modal = document.getElementById(modalID);
  modal.focus();
  ...
}


function closeModal() {
  ...
  // Return the focus to the last focused element
  lastFocusedElement.focus();
  ...
}
```

- [Writing JavaScript with accessibility in mind](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9#7a0c)

## 6. Infinite scrolling

Do you have a footer but you can’t access it by pressing <kbd>TAB</kbd> because you’ve implemented infinite scrolling? Burn it, burn it with fire!

No, seriously. Infinite scrolling is usually a bad practice.

### Learn more about infinite scrolling

- [Infinite Scrolling and Accessibility (It’s Usually Bad)](http://www.webaxe.org/infinite-scrolling-and-accessibility/)

## 7. Off-screen items

Does the focus indicator suddenly disappear while you keep tabbing? It’s likely that you’re focusing off-screen items. You have to hide them correctly. `height: 0`, `transform: translateX(-100%)`, etc. don’t remove items from tab order, `display: none;` does.

<div class="skip-link-container">
<a href="#codepen1-skip" class="skip-link skip-link--inline">Skip CodePen</a>
</div>

<p class="codepen" data-height="300" data-theme-id="6054" data-default-tab="result" data-user="matuzo" data-slug-hash="yxrRGz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Inaccessible hiding">
  <span>See the Pen <a href="https://codepen.io/matuzo/pen/yxrRGz">
  Inaccessible hiding</a> by Manuel Matuzovic (<a href="https://codepen.io/matuzo">@matuzo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<h2 id="codepen1-skip">8. DOM order</h2>

Does the focus indicator skip around a lot? Most of the time it’s because visual order doesn’t match DOM order. Try to avoid reordering logical content and don’t use higher values than `0` as a value in the` tabindex` attribute.

### Learn more about source order

- [Source Order Matters](https://adrianroselli.com/2015/09/source-order-matters.html)

## 9. Custom JS components

Are only parts of your JS components accessible with the keyboard? Read the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/) to learn how to build common patterns correctly and make them accessible to everyone.

## The Tab key is awesome

You don't need to learn a software to get started with accessibility testing, the <kbd>Tab</kbd> key will tell you a lot about the quality of your website. There’s more you have to check, but testing with the keyboard brings you one step closer to creating an inclusive website.

This post is based on a [twitter thread from last year](https://twitter.com/mmatuzo/status/1090932098456801281).

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
