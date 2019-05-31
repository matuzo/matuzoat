---
title: Building the most inaccessible site possible with a perfect Lighthouse score
metadescription: >-
  An experiment that proves that automatic accessibility testing is only a first
  step and that manual testing is vital.
date: 2019-05-31T07:08:19.931Z
image: articles/lighthouse/lighthouse_sm.png
intro: "**Google's built-in testing tool Lighthouse judges the accessibility of our websites with a score between 0 and 100. It’s laudable to try to\_get a high grading, but a score of 100 doesn’t mean that the site is perfectly accessible.\nTo prove that I carried out a little experiment.**"
teaser: >-
  It’s always nice to see when people post their Lighthouse scores on social
  media to highlight how well they’ve optimised their own or their client's
  website. It shows that they care about the quality of what they build.
tags:
  - css
  - a11y
publication: Matuzo
css: ''
draft: false
archive: false
---
![A perfect lighthouse score for performance, accessibility, best practices and SEO](https://res.cloudinary.com/dp3mem7or/image/upload/v1559201876/articles/lighthouse/lighthousescore.png)

Lighthouse awards us with the number 100 in a green circle if we did an exceptional job. It’s something you can proudly share with your client or on Twitter.

It’s important to measure the quality of our code, but it’s even more important that we interpret the scores automatic testing tools give us correctly. If Lighthouse tells us that our site is 100% accessible, it doesn’t mean it is. It just means we’ve laid the groundwork for manual testing. Lighthouse uses the [axe-core](https://github.com/dequelabs/axe-core) accessibility testing library with a [custom set of rules](https://github.com/GoogleChrome/lighthouse/blob/ad0a747a712b815677b6ea3bcc59ee7a0883426d/lighthouse-core/gather/gatherers/accessibility.js#L26-L50) for its tests. It identifies some bad practices, but not all of them. Other practices aren’t bad per se, but can be harmful, if we misuse them.  
 
With automatic testing alone you can’t ensure good quality. To prove that, I built the most inaccessible site possible with a perfect Lighthouse score. 

## Background

Zach Leatherman recently posted this on [twitter](https://twitter.com/zachleat/status/1122184546609446919): 

> Free blog post idea:
>
> How to Build the Slowest Website with a Perfect Lighthouse Score

And here’s [Vadim Makeev’s response](https://twitter.com/pepelsbey_/status/1122203926584074240) to his tweet, which inspired me to write this post.

<blockquote>That would be a wonderful read! Here’s one for a11y audit:<br> `&lt;img src=picture.png alt=picture.png&gt;`</blockquote>

I thought it would be a fantastic idea to not just try to mess with as many people as possible, but get rewarded with a perfect Lighthouse score on top.

## Let’s exclude as many people as possible

We’ll take this simple, accessible page as a basis.

![A page with a heading, a link, two paragraphs, a list and a simple form](https://res.cloudinary.com/dp3mem7or/image/upload/v1559205173/articles/lighthouse/lighthouse_step1.png)

[CodePen: “100%” accessible - step 0](https://codepen.io/matuzo/pen/vwVRJx)

### 🖕 CSS only 🖕

Let's start nice and easy. I want to make sure that CSS is a dependency on my perfect website. To achieve that I'm adding the `hidden` attribute to the `body` element. `hidden` is the HTML equivalent to `display: none;` in CSS. (Checkout [Inclusively Hidden](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html) by [Scott O’Hara](https://twitter.com/scottohara), if you want to learn more about accessible hiding).


<p class="code-label"><strong>HTML</strong></p>

```html
<body hidden>
  ...
</body>
```

![A blank page](https://res.cloudinary.com/dp3mem7or/image/upload/v1559206005/articles/lighthouse/lighthouse_step2.png)

`hidden` hides content visually, and it removes it from the accessibility tree. That alone would be enough to exclude everyone and pass the Lighthouse tests, but I don’t want to make it too easy on myself. I want to create a site that’s perfectly inaccessible and technically still displays content.
So let’s add some CSS and bring our content back.

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

I'd say it's time for our first Lighthouse test. Fingers crossed! 🤞🏼

<div class="lighthouse-test js-lighthouse-test">
<button class="btn js-run-lighthouse-test"><span class="btn__inner">Run Lighthouse test</span></button>
<span class="visually-hidden js-lighthouse-status" role="status"></span>
<img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1559207447/articles/lighthouse/lighthouse_test.png" alt="Score: 100" />
</div>

Perfect score on a CSS and JS only site. That's great, but we can do better.

### 🖕 Screen reader users 🖕

There are many ways to exclude screen reader users. The easiest and most efficient way is to use the `aria-hidden="true"` attribute and value. This attribute is powerful and we must apply it with caution, because it removes elements from the accessibility tree. Normally, we may only use it to improve the experience for users of assistive technologies by [removing redundant or extraneous content](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-hidden).
In our website we’re putting it on the `body` element.

<p class="code-label"><strong>HTML</strong></p>

```html
<body hidden aria-hidden="true">
  ...
</body>
```

Screen reader users will now experience one of those [_“rare”_ moments](https://webaim.org/projects/million/) when they have to deal with an inaccessible site. <span aria-label="(sarcasm)" title="(sarcasm)">*</span>

[CodePen: “100%” accessible - step 3](https://s.codepen.io/matuzo/pen/OYBZbd)

### 🖕 Keyboard users 🖕

Keyboard users can navigate through a page by pressing the <kbd>Tab</kbd> key to jump from one interactive element to another. Browsers show an outline around these items if they’re in focus.

![Focus outline on a text link](https://res.cloudinary.com/dp3mem7or/image/upload/v1559208552/articles/lighthouse/lighthouse_step4.png)

Let’s get rid of that.

<p class="code-label"><strong>CSS</strong></p>

```css
*:focus {
  outline: none !important;
}
```

All it takes are 3 lines of CSS to exclude a whole group of people from being able to access the site. Although, technically, they can still interact with it. They won’t see the focus indicator anymore but interactive elements are still tababble. Since this experiment is all about exclusion, let’s make sure that the keyboard can’t be used at all.

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
<button class="btn js-run-lighthouse-test"><span class="btn__inner">Run Lighthouse test</span></button>
<span class="visually-hidden js-lighthouse-status" role="status"></span>
<img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1559207447/articles/lighthouse/lighthouse_test.png" alt="Score: 100" />
</div>

Still perfect.<br />
Okay, now it's time to get dirty.

### 🖕 High contrast mode 🖕

People with low vision can improve contrasts on Windows by enabling the so called [High Contrast Mode](https://developer.paciellogroup.com/blog/2016/12/windows-high-contrast-mode-the-limited-utility-of-ms-high-contrast/).

![Windows with high contrasting colors. Black background and yellow text.](https://res.cloudinary.com/dp3mem7or/image/upload/v1559211531/articles/lighthouse/lighthouse_step5.png)

The whole operating system uses high contrasting colors for all applications including browsers and websites.

We can target high contrast mode users specifically by using a dedicated media feature.

<p class="code-label"><strong>CSS</strong></p>

```css
@media screen and (-ms-high-contrast: active) {
  /* High contrast styling rules */
  * {
    color: #000000;
  }
}
```

Rules in this media query only apply if High Contrast is enabled. Unfortunately, we don’t know which colors the theme uses, nor if it’s a light or dark theme. Setting the color to `#000000` on all elements might or might not work, depending on user preference.
This fifty-fifty chance is not exclusive enough for me, but we’re lucky: Windows High Contrast colors are mapped to [CSS system color keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords#System_Colors). We can use these system color keywords to make sure our text always matches our High Contrast Mode background color, regardless of what it is set to. The background color is mapped to `window`. So, let’s use the value of the background color for the text color of all elements.

<p class="code-label"><strong>CSS</strong></p>

```css
@media screen and (-ms-high-contrast: active) {
  * {
    color: window !important;
  }
}
```

![Windows in high contrast but the text color has the same color as the background](https://res.cloudinary.com/dp3mem7or/image/upload/v1559212676/articles/lighthouse/lighthouse_step5_2.png)

Oh, man. This is so evil. My LinkedIn inbox will be filled with job offerings by companies like Facebook and Uber.

[CodePen: “100%” accessible - step 5](https://s.codepen.io/matuzo/pen/Ezdpoa)

### 🖕 Mouse users 🖕

Excluding mouse users is easy, we just remove the cursor.

<p class="code-label"><strong>CSS</strong></p>

```css
*,
*:hover {
  cursor: none;
}
```

`cursor: none;` is to mouse users what `outline: none;`  is to keyboard users. Getting your bearings is initially difficult, but interactive elements are still clickable. Let's improve the quality of our app by decreasing the user experience once more.

<p class="code-label"><strong>CSS</strong></p>

```css
body {
  pointer-events: none;
}
```

`pointer-events: none;` frees our users from the ability to click anything on our site. This property is well-supported, but if we want to make sure that this feature works on as many browsers as possible, we can apply a principle called progressive degradation™.

<p class="code-label"><strong>JS</strong></p>

```js
function removeA11y() {
  if ("pointerEvents" in document.body.style) {
    console.log('pointer-events supported')
    return;
  }

  document.addEventListener('click', function(e) {
    e.preventDefault();
  })
}

removeA11y();
```

This JavaScript fallback will kick in and remove click events from all elements, if the browser doesn't support the `pointer-events` property.

[CodePen: “100%” accessible - step 6](https://s.codepen.io/matuzo/pen/zQmJYB)

<div class="lighthouse-test js-lighthouse-test">
<button class="btn js-run-lighthouse-test"><span class="btn__inner">Run Lighthouse test</span></button>
<span class="visually-hidden js-lighthouse-status" role="status"></span>
<img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1559207447/articles/lighthouse/lighthouse_test.png" alt="Score: 100" />
</div>

Great! Still perfectly accessible!

### 🖕 Readability 🖕

We can’t use the mouse or keyboard anymore but we can still read the content above the fold. Let's do something about that.

<p class="code-label"><strong>CSS</strong></p>

```css
body {
  opacity: 0.03;
}
```

Our page content is still present but almost invisible. Fabulous!

[CodePen: “100%” accessible - step 7](https://s.codepen.io/matuzo/pen/eaPLeB)

### 🖕 Reader mode 🖕

Testing the site in different browsers, I noticed that it’s still accessible in Safari in Reader Mode.

![Safari Reader Mode](https://res.cloudinary.com/dp3mem7or/image/upload/v1559213808/articles/lighthouse/lighthouse_step6.png)

As it turns out, it’s possible to disable Reader Mode by defining a small font size in the `body`.

<p class="code-label"><strong>CSS</strong></p>

```css
body {
  opacity: 0.03;
  font-size: 1px;
}
```

[CodePen: “100%” accessible - step 8](https://s.codepen.io/matuzo/pen/QRZVJj)

### 🖕 View Page Source 🖕

The site is inaccessible to people with low and good vision, mouse, keyboard and screen reader users.\
If browser power users encounter a site like this, it might awaken their inner [Zero Cool](https://en.wikipedia.org/wiki/Hackers_(film)#Plot) and they try to hack the site. What I mean by _hack_ is _view the page source_.

To put the cherry on top of my exclusion-first site, I’m [converting the text to html entities](https://v2.cryptii.com/text/htmlentities). [Entities](https://developer.mozilla.org/en-US/docs/Glossary/Entity) are usually used to display reserved characters, invisible characters, and characters that are difficult to type with a standard keyboard. I’m using them to obfuscate text on our site.

![Text is not readable when viewing the source because it's written in HTML entities](https://res.cloudinary.com/dp3mem7or/image/upload/v1559215401/articles/lighthouse/lighthouse_step7.png)

[CodePen: “100%” accessible - step 9](https://s.codepen.io/matuzo/pen/joeeqy)

To wrap it up, a final test.

<div class="lighthouse-test js-lighthouse-test">
<button class="btn js-run-lighthouse-test"><span class="btn__inner">Run Lighthouse test</span></button>
<span class="visually-hidden js-lighthouse-status" role="status"></span>
<img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1559207447/articles/lighthouse/lighthouse_test.png" alt="Score: 100" />
</div>

## Conclusion

My intention with this post was not to diss Lighthouse or axe-core, the engine behind Lighthouse. I use both tools regularly and I’m glad I have them.\
This post is about you and me. Scores indicate the quality of our apps and sites, but we must not trust these numbers blindly. We have to understand that automatic testing is just a first step.  
Next time you see a high Lighthouse score and you want to call it a day, read the text next to the score.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1559207447/articles/lighthouse/lighthouse_test.png)

> These checks highlight opportunities to [improve the accessibility of your web app](https://developers.google.com/web/fundamentals/accessibility/?utm_source=lighthouse&utm_medium=devtools). Only a subset of accessibility issues can be automatically detected so manual testing is also encouraged.

We don’t test and optimize our sites for the good feeling a high score gives us. We’re doing it because we want to, and we have to, make sure that what we build is accessible to as many people as possible. 
We don’t fully rely on automation when we’re designing and developing, and we shouldn't do it either when we’re testing.

Thanks to [Eric](https://ericwbailey.design/) for proofreading and feedback.

## Links and resources

* [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/)
* [axe-core](https://github.com/dequelabs/axe-core)
* [Inclusively Hidden](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html)
* [The WebAIM Million](https://webaim.org/projects/million/)
* [Web Fundamentals – Accessibility ](https://developers.google.com/web/fundamentals/accessibility/?utm_source=lighthouse&utm_medium=devtools)
* [Eric W. Bailey](https://ericwbailey.design/)
* [The A11y Project](https://a11yproject.com)

&lowast; (sarcasm)
