---
title: 'Writing even more CSS with Accessibility in Mind, Part 2: Respecting user preferences'
permalink: blog/writing-even-more-css-with-accessibility-in-mind-user-preferences/index.html
metadescription: >-
  Users change browser or OS settings to improve their experiences for a reason. We should respect these decisions by writing CSS.
date: 2020-10-12T06:58:54.969Z
image: articles/sm_css_a11y2_up.jpg
teaser: 'In the first article of this series, I explained how important progressive enhancement is for web accessibility. Building websites layer by layer allows for a cleaner separation of concerns and more resilient experiences. This second article is about user preferences and how to respect them when writing CSS.'
tags:
  - blog
  - posts
  - a11y
---

## In this series

This series of articles covers 4 major topics:

1. [Progressive enhancement](/blog/writing-even-more-css-with-accessibility-in-mind-progressive-enhancement/)
2. **User preferences <em>(this article)</em>**
3. CSS and semantics <em>(coming soon)</em>
4. Improving accessibility with CSS <em>(coming soon)</em>

## Respecting user preferences

Operating systems and browsers provide users with options to customize their browsing experience, and it’s our job to respect these preferences in our style sheets. In the following chapter, I’ll give you examples of how we can build designs according to our ideas while still respecting user preferences.

### Font size

A fundamental thing we should do is respect our users’ preferred font size for running text.

#### Base font size

The default font size in most browsers is `16px` but it can be changed to a lower or higher value in the browser preferences.

<figure class="figure">
<img src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_1000/v1602476047/articles/ff_settings.jpg" alt="Language and Appearance settings in Firefox. Font site dropdown active. Screenshot.">

<figcaption>
In Firefox: Firefox → Preferences → Language and Appearance
</figcaption>
</figure>

If an user sets the default font size to `20px`, we should make sure that the size of running text doesn’t get lower than that on our website. We can do that by using relative units instead of absolute units. The problem with absolute units is that if we set the font size to `18px` on the `<body>`, it overwrites the `20px` our user has chosen as their default, and that wouldn’t be nice of us.

```css
body {
  /* Don’t use px for font sizes (...in most cases) */
  font-size: 18px;
}
```

<h5>Video demo:</h5>

<div class="content__video-wrapper"><div class="video-wrapper">
<iframe width="560" height="315" title="Accessible CSS demo: font-size property with an absolute value" src="https://www.youtube.com/embed/_leBu4I1yqc"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>
<br>

If we use a relative unit like `rem`, instead, we can still define our preferred size while respecting user preferences. `1rem` is relative to the root font size, as already mentioned, `16px` in most browsers. This means that the the size of `1rem` changes with the default font size in the browser.

If we want to use this unit, we have to convert `px` to `rem`. We can do that by taking the target value (`18px`) and dividing it by the default root value (`16px`):

<div style="text-align: center">
  <img class="234" src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_350/v1602477333/articles/article_css2_calc.png" alt="18px/16px = 1.125rem">
</div>

The result is the `rem` value. If we use it instead of the absolute pixel value, the font size for users with standard settings will still equal `18px`, but the font size for users who prefer a larger base font size like `20px` will be `22.5px` (1rem = 20px, 1.125rem = 22.5px).

```css
body {
  font-size: 1.125rem; /* 16 * 1.125 = 18px */
}
```

<h5>Video demo:</h5>

<div class="content__video-wrapper"><div class="video-wrapper">
<iframe width="560" height="315" title="Accessible CSS demo: font-size property with a relative value" src="https://www.youtube.com/embed/vE_0JWb9iOA"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>
<br>

It makes sense to use relative units like `rem`, `em`, or `%` because they’re relative to a parents font size when used with the `font-size` property. Other relative units like `vh` or `vw` are not suitable because they’re relative to the viewport. Even combinations of units like `calc(2vw + 0.5rem)`should be treated with caution because they might lead to unexpected results. Read [Responsive Type and Zoom](https://adrianroselli.com/2019/12/responsive-type-and-zoom.html) by Adrian Roselli for details.

**Line lengths**

I like to constrain the width of content container elements to improve readability by ensuring that lines don’t exceed a certain length. I use the `ch` (character) unit for that. `1ch` is as wide as the glyph 0 (zero) in the respective font and size. If we set the `max-width` to `80ch`, only approximately 80 characters will fit each line. A pleasant side effect is that when users change the default font size, the width of the content container grows with the size of the font. The relative unit `ch` makes sure that there’s always a pleasant font size to line length ratio, no matter how large the text is.

```css
.content {
  max-width: 80ch;
}
```

[ch unit Demo on CodePen.](https://codepen.io/matuzo/pen/RwaZNVa?editors=1100)

<h5>Video demo:</h5>

<div class="content__video-wrapper"><div class="video-wrapper">
<iframe width="560" height="315" title="Accessible CSS demo: difference between px and ch in max-width declarations." src="https://www.youtube.com/embed/7LR9HnV-j7Q"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>

### Motion and animation

Animations on the web are sometimes annoying, but they may also cause nausea, dizziness, and headaches in some users. For people with vestibular disorders it may even cause pain and make them feel so bad that they have to stop using the computer, needing time to recover. Earlier this year I read “[Accessibility for Vestibular Disorders: How My Temporary Disability Changed My Perspective](https://alistapart.com/article/accessibility-for-vestibular/)” by Facundo Corradini and it blew my mind because it was the first time that I read about the negative side effects of animations on the web by someone who experienced it first-hand. Facundo is a developer, and he describes which patterns and effects were especially bad and made him feel dizzy and sick.

> Really, there are no words to describe just how bad a simple parallax effect, scrolljacking, or even `background-attachment: fixed` would make me feel. I would rather jump on one of those 20-G centrifuges astronauts use than look at a website with parallax scrolling.

He also describes how distracting animations can be when you’re having a hard time focussing itself.

> The extreme, conscious, focused effort it took to read would make it such that anything moving on the screen would instantly break my focus, and force me to start the paragraph all over. And I mean anything.

I can highly recommend this article, it outlines well how important it is to use animation on the web cautiously. Now let’s see how we can do that.

**Reduce or remove motion if users prefer reduced motion**

[Some operating systems allow users to reduce motion](https://developer.paciellogroup.com/blog/2019/05/short-note-on-prefers-reduced-motion-and-puzzled-windows-users/), and we can react to that in CSS by using the `prefers-reduced-motion` media feature. If our users prefer less motion on the screen, we should respect that and serve CSS without or with fewer animations and transitions.

Here’s an example: If you don’t have any preference for reduced motion, you should see someone moonwalking from one end of the article to the other. If you do, you should see someone moonwalking in place.

<style>
@keyframes walk {
  0% {
    transform: translateX(800px);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .moonwalk img {
    animation: walk 10s linear infinite;
  }
}

.moonwalk {
  overflow: hidden;
}

</style>

<div class="moonwalk">
	<picture>
		<source srcset="https://assets.codepen.io/144736/moonwalk.gif" media="(prefers-reduced-motion: no-preference)">
		<img class="p" src="https://assets.codepen.io/144736/moonwalk.png" alt="Someone doing the moon walk.">
	</picture>
</div>

Inspired by [Marquee Jackson](https://codepen.io/lassediercks/pen/MEmEyj) by Lasse Diercks.

```html
<img
  src="https://media.giphy.com/media/EDZP0UCtxiRQQ/giphy.gif"
  alt="Person doing the moon walk."
/>
```

```css
/* Define keyframe animation */
@keyframes walk {
  0% {
    transform: translateX(100vw);
  }
}

/* Apply animation */
img {
  animation: walk 10s linear infinite;
}

/* Remove animation if the user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  img {
    animation: none;
  }
}
```

We could go one step further and replace the gif with a png by using a combination of the `prefers-reduced-motion` media feature and the picture element.

```html
<picture>
  <source srcset="moonwalk.png" media="(prefers-reduced-motion: reduce)" />
  <img src="moonwalk.gif" alt="Someone doing the moonwalk" />
</picture>
```

[picture element and prefers-reduced-motion demo on CodePen](https://codepen.io/matuzo/pen/NWrWeNq?editors=1100)

In this example I set the `animation` property to `none` , but you don’t always have to remove motion entirely. Eric W. Bailey points out that [animation isn’t bad per se](https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/#article-header-id-5), because it may help users, especially people with cognitive disabilities, understand the relationship between seemingly disparate objects. Val Head outlines even more benefits of animations in “[Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/#section7)” and “[Designing With Reduced Motion For Motion Sensitivities](https://www.smashingmagazine.com/2020/09/design-reduced-motion-sensitivities/)”.

**Progressive enhancement applied to animation**

It’s important to respect user preferences, but this approach, applying animation and conditionally removing it, isn’t perfect. The reduced motion media feature was introduced only a few years ago, which means that [users of legacy browsers will see animations no matter what](https://caniuse.com/#feat=prefers-reduced-motion).

Most articles recommend something like this:

```css
/* Apply animations and transitions */
img {
  animation: walk 10s linear infinite;
}

div {
  transition: transform 1s ease-in;
}

/* Select all elements in the page and reduce or remove motion. */
/* Important note: This has no effect in browsers that don’t support prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

That’s why [Patrick H. Lauke](https://twitter.com/patrick_h_lauke) recommends a [defensive prefers-reduced-motion use](https://codepen.io/patrickhlauke/pen/YzPPdeo) where animations only run in browsers that support the media feature and only if they have _not_ expressed a preference for reduced motion.

```css
/* has no effect in browsers that don’t support prefers-reduced-motion */
@media (prefers-reduced-motion: no-preference) {
  img {
    animation: walk 10s linear infinite;
  }

  div {
    transition: transform 1s ease-in;
  }
}
```

I like this approach because it’s more sensitive towards users and it takes progressive enhancement one step further. We start with no animation and only add this layer of enhancement if the browser supports the media feature and the user has no preference for reduced motion.

Here’s an example of how I’ve used the media feature in a website I’ve recently built. We only animate [scrolling to anchor links](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior), if users have no preference for reduced motion.

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

[Smooth scrolling demo on CodePen](https://codepen.io/matuzo/pen/bGprNYo)

Please respect your user’s motion preferences in your style sheets.

> Using this media query could spare someone from having to unnecessarily endure a tremendous amount of pain for simply having the curiosity to click on a link or scroll down a page.

\- [Eric Bailey](https://twitter.com/ericwbailey)

### Dark Mode

Another setting some operating systems provide is the ability to switch the default theme from one that uses light colors to one that uses dark colors ([Dark Mode](https://www.a11yproject.com/posts/2020-01-23-operating-system-and-browser-accessibility-display-modes/#toc_Dark-Mode)). That’s especially useful for people who want to reduce eye strain or for people who have certain photosensitive conditions.

The media feature `prefers-color-scheme` allows us to react to these settings and provide users with a dark or light design accordingly.

```css
body {
  /* Dark text on light background */
  color: #222222;
  background-color: #ffffff;
}

@media (prefers-color-scheme: dark) {
  body {
    /* Light text on dark background */
    color: #ffffff;
    background-color: #222222;
  }
}
```

I did some research and collected useful tips and tricks for working with Dark Mode.

#### 1. Change the design according to user preference but allow users to change it back.

Some users may prefer a dark theme for the OS but light themes on the web. They should be able to pick their preferred theme. You can see how Cassie Evans does it on her website [cassie.codes](https://www.cassie.codes/).

<figure class="figure">
<a href="https://cassie.codes" rel="noopener"><img src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,q_100,w_1000/v1602564954/articles/article_css2_cassie.jpg" alt="A styled switch that looks like a sun or moon depending on the mode at the top right corner on Cassie Evans website"></a>

<figcaption>
Comparison of light and dark mode.
</figcaption>
</figure>

#### 2. Try to avoid hard contrasts like `#FFFFFF` text color on a `#000000` background.

Use softer combinations like `#EFEFEF` on `#111111`, which are easier on the eyes.

<style>
.a-up-color {
  display: flex;
}

.a-up-color div {
  max-width: 150px;
  height: 150px;
  width: 48%;
  background: #000;
  color: #fff;
  margin-right: 2%;
  display: flex;
  align-items: center;
  text-align: center;
}

.a-up-color div + div {
  margin-right: 0;
  background: #111111;
  color: #EFEFEF;
}
</style>

<div class="a-up-color">
  <div>
  #FFFFFF on #000000
  </div>
  <div>
  #EFEFEF on #111111

  </div>
</div>

#### 3. [Dim images](https://markdotto.com/2018/11/05/css-dark-mode/) by decreasing the `opacity`.

Dark backgrounds may amplify the brightness of light images, dimming images can help with that. You can still show the original opacity on hover and focus.

```css
img {
  opacity: 0.8;
  transition: opacity 0.5s ease-in-out;
}

a:hover img,
a:focus img {
  opacity: 1;
}
```

<style>
.a-up-image {
  display: flex;
  background: #111111;
  padding: 20px;
}

.a-up-image a {
  box-shadow: none !important;
}

.a-up-image a:link,
.a-up-image a:visited {
  box-shadow: none !important;
  color: #fefefe;
}

.a-up-image img {
  display: block;
}

.a-up-image a + a{
  margin-left: 1rem;
}

.a-up-image a:last-child img {
  opacity: 0.8;
  transition: opacity .5s ease-in-out;
}

.a-up-image a:last-child:hover img,
.a-up-image a:last-child:focus img{
  opacity: 1;
}
</style>

<div class="a-up-image">
  <a href="https://res.cloudinary.com/dp3mem7or/image/upload/v1602565671/articles/article_css2_schoenbrunn.jpg">
    100% opacity
    <img class="a" src="https://res.cloudinary.com/dp3mem7or/image/upload/v1602565671/articles/article_css2_schoenbrunn.jpg" alt="">
  </a>
  <a href="https://res.cloudinary.com/dp3mem7or/image/upload/v1602565671/articles/article_css2_schoenbrunn.jpg">
    80% opacity
    <img class="a" src="https://res.cloudinary.com/dp3mem7or/image/upload/v1602565671/articles/article_css2_schoenbrunn.jpg" alt="">
  </a>
</div>

#### 4. Simply inverting colors might not be want you want.

Some articles recommend to simply invert colors and call it a day. While this might work on some sites, it doesn’t mean that it works well.

```css
html,
body {
  background-color: #fff;
}

body {
  color: #222;
}

@media (prefers-color-scheme: dark) {
  html {
    /* Invert the colors */
    filter: invert(100%);
  }

  img {
    filter: invert(100%); /* Invert the colors in images back to normal */
  }
}
```

[Dark Mode with filter: invert(100%) on CodePen](https://codepen.io/matuzo/pen/ExKKMGw)

The `filter` property and `invert` function reverts colors in a page.

That’s not a best practice because just like you’ve picked the right combination of colors for your default theme carefully, you want to [hand-pick the colors for your dark theme](https://twitter.com/steveschoger/status/1151160261170126850), too. However, on a component level `filter: invert(100%)` might work well, so I’d keep it in my tool set.

#### 5. Use the `currentColor` keyword in SVGs for `fill` or `stroke` properties instead of absolute values.

In this simplified example you can see that the fill color of the SVG in the button is always the same as the text color of the button.

```html
<button>
  Sign up
  <svg height="50" width="50" focusable="false">
    <circle cx="25" cy="25" r="20">
  </svg>
</button>
```

```css
button {
  color: #f00;
}

circle {
  fill: #f00;
}

button:hover {
  color: #0f0;
}

button:hover circle {
  fill: #0f0;
}

@media (prefers-color-scheme: dark) {
  button {
    color: #00f;
  }

  circle {
    fill: #00f;
  }

  button:hover {
    color: #f0f;
  }

  button:hover circle {
    fill: #f0f;
  }
}
```

<style>
.a-up-button {
  background: #153a51;
  border-radius: 5px;
  border: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
}

.a-up-button1 {
  color: #F00;
}

.a-up-button1 circle {
  fill: #F00;
}

.a-up-button1:hover {
  color: #0F0;
}

.a-up-button1:hover circle {
  fill: #0F0;
}

@media (prefers-color-scheme: dark) {
  .a-up-button1 {
    color: #00F
  }

  .a-up-button1 circle {
    fill: #00F;
  }

  .a-up-button1:hover {
    color: #F0F;
  }

  .a-up-button1:hover circle{
    fill: #F0F;
  }
}
</style>

<div>
<button class="a-up-button a-up-button1" type="button">
  Sign up
  <svg height="50" width="50" focusable="false">
    <circle cx="25" cy="25" r="20">
  </svg>
</button>
</div>

It works but the code is too verbose. We can reduce the number of lines and make it more dynamic by using the `currentColor` keyword. `currentColor`is relative to the `color` property of the element or its parent element, it changes with the color on hover, focus, Dark Mode, etc.

```css
button {
  color: #f00;
}

button:hover {
  color: #0f0;
}

circle {
  fill: currentColor;
}

@media (prefers-color-scheme: dark) {
  button {
    color: #00f;
  }

  button:hover {
    color: #f0f;
  }
}
```

<style>
.a-up-button2 {
  color: #F00;
}

.a-up-button2:hover {
  color: #0F0;
}

.a-up-button2 circle {
  fill: currentColor;
}

@media (prefers-color-scheme: dark) {
  .a-up-button2 {
    color: #00F
  }

  .a-up-button2:hover {
    color: #F0F;
  }
}
</style>

<div>
<button class="a-up-button a-up-button2" type="button">
  Sign up
  <svg height="50" width="50" focusable="false">
    <circle cx="25" cy="25" r="20">
  </svg>
</button>
</div>

For the sake of completeness, here’s an example that uses custom properties and `currentColor`.

```css
:root {
  --color: #f00;
  --color_hover: #0f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color: #00f;
    --color_hover: #f0f;
  }
}

button {
  color: var(--color);
}

button:hover {
  color: var(--color_hover);
}

circle {
  fill: currentColor;
}
```

<style>
:root {
  --up_color: #F00;
  --up_color_hover: #0F0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --up_color: #00F;
    --up_color_hover: #F0F;
  }
}

.a-up-button3 {
  color: var(--up_color);
}

.a-up-button3:hover {
  color: var(--up_color_hover);
}

.a-up-button3 circle {
  fill: currentColor;
}
</style>

<div>
<button class="a-up-button a-up-button3" type="button">
  Sign up
  <svg height="50" width="50" focusable="false">
    <circle cx="25" cy="25" r="20">
  </svg>
</button>
</div>

[currentColor demo on CodePen](https://codepen.io/matuzo/pen/ExKvjWP)

#### 6. Swapping images

CSS has its limitations when it comes to swaping colors or manipulating colors in images. Sometimes its necessary to swap entire images. I found this great solution on [Nando Vieras blog](https://nandovieira.com/supporting-dark-mode-in-web-content) where he uses the `picture`element and media queries to serve the right image.

```html
<picture>
  <source srcset="dark_logo.jpg" media="(prefers-color-scheme: dark)" />
  <img src="light_logo.jpg" alt="Homepage" />
</picture>
```

[Switch images in Dark Mode demo on CodePen](https://codepen.io/matuzo/pen/BazoQrz?editors=1100)

Users change browser or OS settings to improve their experiences for a reason. Please respect these decisions by writing CSS that’s flexible enough to respond to their preferences. Font size, motion, and dark colors settings are only examples, there’s even more to consider like [High Contrast mode](https://developer.paciellogroup.com/blog/2016/12/windows-high-contrast-mode-the-limited-utility-of-ms-high-contrast/) on Windows or [inverted colors](https://adrianroselli.com/2017/11/os-high-contrast-versus-inverted-colors.html).

### Resources

Dark Mode is a fantastic example for a feature that's [essential for some and useful for all](https://www.w3.org/WAI/perspective-videos//). If you want to add it to your website (yeah, I know, there’s no Dark Mode on my site. It’s a long story...), check these links. (Thanks, [Max](https://twitter.com/mxbck/)).

- [Create a user controlled dark or light mode](https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/) by Andy Bell
- [Building Inclusive Toggle Buttons](https://www.smashingmagazine.com/2017/09/building-inclusive-toggle-buttons/) by Heydon Pickering
- [Dark Mode UI: the definitive guide](https://uxdesign.cc/dark-mode-ui-design-the-definitive-guide-part-1-color-53dcfaea5129) by Atharva Kulkarni
- [Respecting User Preferences on the Web](https://www.youtube.com/watch?v=8PPdUS9zMhA) by Eric Eggert (video)

### Recording

If you want to learn more about CSS and accessibility and you don’t want to wait for me to publish the other articles in this series, you can watch my talk about writing CSS with accessibility in mind at #ID24:

<div class="content__video-wrapper"><div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/o6ssu5oKyaU" title="Writing even more CSS with Accessibility in Mind"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>

Thanks to [Eric](https://twitter.com/yatil) for helping me with this article.
