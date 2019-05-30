---
title: Building the most inaccessible site possible with a perfect lighthouse score
metadescription: >-
  If an automatic testing tool tells us that our site is 100% accessible, it
  doesn't necessarily mean that it actually is. 
date: 2019-05-30T07:08:19.931Z
image: articles/lighthouse/lighthouse_sm.png
intro: ''
teaser: >-
  It’s always nice to see when people post their lighthouse scores on social
  media to highlight how well they’ve optimised their own or their clients
  website. It shows that they care about the quality of what they build. 
tags:
  - css
  - a11y
publication: Matuzo
css: lighthouse
draft: true
archive: false
---
![](https://res.cloudinary.com/dp3mem7or/image/upload/v1559201876/articles/lighthouse/lighthousescore.png)

Lighthouse awards us with the number 100 in a green circle if we did an exceptional job. It’s something you can proudly share with your client or on twitter.

It’s important to measure the quality of our code but it’s even more important that we interpret the scores automatic testing tools give us correctly. If lighthouse tells us that our site is 100% accessible, it doesn’t mean it is. It just means we’ve laid the groundwork for manual testing. With automatic testing alone you can’t ensure good quality.
To prove that, I built the most inaccessible site possible with a perfect lighthouse score.

## Background

Zach Leatherman recently posted this on [twitter](https://twitter.com/zachleat/status/1122184546609446919): 

> Free blog post idea:
>
> How to Build the Slowest Website with a Perfect Lighthouse Score

And here’s [Vadim Makeev’s response](https://twitter.com/pepelsbey_/status/1122203926584074240) to his tweet, which inspired me to write this post.

<blockquote>That would be a wonderful read! Here’s one for a11y audit:<br> \`&lt;img src=picture.png alt=picture.png&gt;\`</blockquote>

I thought it would be a fantastic idea to not just try to mess with as many people as possible, but get rewarded with a perfect lighthouse score on top.

## Let’s exclude as many people as possible

We’ll take this simple, accessible page as a basis.

[![A page with a heading, a link, two paragraphs, a list and a simple form](https://res.cloudinary.com/dp3mem7or/image/upload/v1559205173/articles/lighthouse/lighthouse_step1.png)](https://codepen.io/matuzo/debug/vwVRJx)

[CodePen: “100%” accessible - step 0](https://codepen.io/matuzo/pen/vwVRJx)

### 🖕 CSS only 🖕

Let's start nice and easy. I want to make sure that CSS is a dependency on my perfect website. To achieve that I'm adding the `hidden` attribute to the `body` element. `hidden` is the HTML equivalent to `display: none;` in CSS. 

<p class="code-label"><strong>HTML</strong></p>

```html
<body hidden>
  ...
</body>
```

![A blank page](https://res.cloudinary.com/dp3mem7or/image/upload/v1559206005/articles/lighthouse/lighthouse_step2.png)

That alone would be enough to exclude everyone and pass the lighthouse tests, but I don't want to make it too easy on myself. I want to create a site that’s perfectly inaccessible and technically still displays content.
So let's add come CSS and bring our content back.

<p class="code-label"><strong>HTML</strong></p>

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body class="loaded" hidden>
  ...
</body>
```

<p class="code-label"><strong>CSS</strong></p>

```css
.loaded {
  display: block;
}
```

We’re back to where we were before but now CSS must load if users want to get access to content on our site.

[CodePen: “100%” accessible - step 1](https://s.codepen.io/matuzo/pen/QRZmrJ)

### 🖕 JS only 🖕

Let’s add one more dependency. I’m not applying the class that displays our content in HTML anymore, but I add it via JS.

<p class="code-label"><strong>HTML</strong></p>

```html
<head>
  <link rel="stylesheet" href="style.css">
  <script src="script.js"></script>
</head>

<body hidden>
  ...
</body>
```

<p class="code-label"><strong>JS</strong></p>

```js
  document.querySelector('body').classList.add('loaded');
```

Great! The site still looks the same but in order for it to display anything at all the CSS and JS file must load and work properly.

[CodePen: “100%” accessible - step 2](https://s.codepen.io/matuzo/pen/GaYxLx)

I'd say it's time for our first lighthouse test. Fingers crossed! 🤞🏼

\[ Lighthouse score ]

Perfect score on a CSS and JS only site. That's great, but we can do better.

### 🖕 Screen reader users 🖕

There are many ways to exclude screen reader users. The easiest and most efficient way is to remove the whole body from the accessibility tree by adding the `aria-hidden="true"` attribute and value.

<p class="code-label"><strong>HTML</strong></p>

```html
<body hidden aria-hidden="true">
  ...
</body>
```

Screen reader users will now experience one of those _“rare”_ moments when they have to deal with an inaccessible site.

[CodePen: “100%” accessible - step 3](https://s.codepen.io/matuzo/pen/OYBZbd)

### 🖕 Keyboard users 🖕

Keyboard users navigate through a page by pressing the `Tab` key to jump from one interactive element to another. Browsers show an outline around these items if they’re in focus.

![Focus outline on a text link](https://res.cloudinary.com/dp3mem7or/image/upload/v1559208552/articles/lighthouse/lighthouse_step4.png)

Let’s get rid of that.

<p class="code-label"><strong>CSS</strong></p>

```css
*:focus {
  outline: none !important;
}
```

All it takes are 3 lines of CSS to exclude a whole user group from being able to access the site. Although, technically, they can still interact with it. They won’t see the focus indicator anymore but interactive elements are still tababble. Since this experiment is all about exclusion, let’s make sure that the keyboard can’t be used at all.

<p class="code-label"><strong>JS</strong></p>

```js
document.addEventListener('keydown', function(e) {
  e.preventDefault();
})
```

Our exclusion-first app now removes the default functionality of all keys.

[CodePen: “100%” accessible - step 4](https://s.codepen.io/matuzo/pen/vwVrxo)

Time for another test.

<div class="lighthouse-test js-lighthouse-test">
<button class="btn js-run-lighthouse-test"><span class="btn__inner">Run lighthouse test</span></button>
<span class="visually-hidden js-lighthouse-status" role="alert"></span>
<img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1559207447/articles/lighthouse/lighthouse_test.png" alt="Score: 100" />
</div>

<script>
document.querySelector('.js-run-lighthouse-test').addEventListener('click', function(e) {

document.querySelector('.js-run-lighthouse-test').querySelector('span').textContent = "Running tests…";
document.querySelector('.js-lighthouse-status').querySelector('span').textContent = "Running tests…";

setTimeout(function() {
document.querySelector('.js-lighthouse-test').classList.add('lighthouse-test--finished');
document.querySelector('.js-lighthouse-status').querySelector('span').textContent = "Accessibility score: 1000";
}, 1000);
});
</script>

Still perfect.<br />
Okay, now it's time to get dirty.
