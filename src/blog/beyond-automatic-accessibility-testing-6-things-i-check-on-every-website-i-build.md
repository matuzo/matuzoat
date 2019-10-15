---
title: >-
  Beyond automatic accessibility testing: 6 things I check on every website I
  build
metadescription: >-
  A small collection of accessibility checks I perform in every site I audit and
  build.
date: 2019-10-15T07:06:26.546Z
image: articles/a11y-test/a11y_tips_step1.jpg
teaser: >-
  I just finished an accessibility audit for a client and I decided to share
  some quick checks I perform in every site I audit and build. It’s something
  that you can apply to your project right away, you don’t have to learn a tool
  or a software.
tags:
  - css
  - a11y
  - testing
publication: Matuzo
draft: false
archive: false
---
## Step 0: Automatic tests

The first thing I do is run accessibility checks in [Lighthouse](https://developers.google.com/web/tools/lighthouse) to figure out if anything obvious is wrong. Automatic accessibility tests are great but they only check a subset of what needs to be tested. [If you have a score of 100 or 0 errors, you’re not done](https://www.matuzo.at/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/). It just means you’ve laid the groundwork for manual testing.

## Step 1: Check image descriptions

The first semi-manual test I perform is check if images have descriptions and if they’re described correctly. I’m using a browser extension called [Web Developer](https://addons.mozilla.org/de/firefox/addon/web-developer/) for that. You can highlight images that have no `alt` attribute or display the value of `alt` attributes next to images.

![The images settings section in Web Developer toolbar.](https://res.cloudinary.com/dp3mem7or/image/upload/v1571155703/articles/a11y-test/a11y_tips_step1.jpg)

## Step 2: Disable all styles

Another feature of the Web Developer extension is the ability to disable CSS on a page. If you disable CSS, you’re able to check various things.

* Does the website work without CSS (in case it doesn’t load)?
* Does the order of elements of your page make sense?
* Are images and icons sized correctly?
* Is your document well structured?

![The schedule page on webclerks.at displayed without CSS.](https://res.cloudinary.com/dp3mem7or/image/upload/v1571155700/articles/a11y-test/a11y_tips_step2.jpg)

## Step 3: Validate HTML

You can use the [W3C Markup Validation Service](http://validator.w3.org/) to check your markup. The Validation Service doesn’t catch everything, but it’s great for finding obvious bugs in your HTML, like duplicate `id`s or broken aria references.

![Random errors on the w3c validator results page.](https://res.cloudinary.com/dp3mem7or/image/upload/v1571155701/articles/a11y-test/a11y_tips_step3.jpg)

## Step 4: Check the document outline

[A sound document outline is important](https://webaim.org/projects/screenreadersurvey8/#finding). It should start with a `h1` followed by `h2`, `h3`, etc. in hierarchical order. This is great for search engines and screen reader users because they might navigate your site by jumping from one heading to another.

![List of the headings on webclerks.at. tota11y screenshot.](https://res.cloudinary.com/dp3mem7or/image/upload/v1571155700/articles/a11y-test/a11y_tips_step4.jpg)

You can use the [W3C Markup Validation Service](https://validator.w3.org/) to check your outline or a tool called [tota11y](https://khan.github.io/tota11y/) (as seen in the screenshot above).

## Step 5: Grayscale mode

I’m using a browser extension called [High Contrast](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph) to display sites in grayscale mode.\
This is an important check because it will tell you if parts of your design work with color only. You should make sure you don’t convey information with color alone. A perfect example are links, they should have underlines to easily differentiate them from normal text. [Underlines are beautiful](https://adrianroselli.com/2019/01/underlines-are-beautiful.html)!

> Underline your fucking links you sociopaths.

Heydon Pickering

You don’t have to install a browser extension, you can also use [CSS to achieve a similar effect](https://github.com/matuzo/a11y-tests.css).

```css
body {
  filter: grayscale(100%);
}
```

## Step 6:  Use the keyboard

Put your mouse away and tab through the page and see if you can use every single part of the site without a mouse/touch pad. The <kbd>tab</kbd> key is a powerful testing tool, it will tell you a lot about your site:

* Do you see which item is currently focused? No? Use `:focus{}`, `:focus-within{}`, or `:focus-visible{}` to style elements in their focus state.
* Is everything focusable that should be? No? Work on your HTML. You're probably using `<div>`, `<span>`, `<svg>` only, etc. where you should use `<button>` or `<a>`.
* Does nothing happen when you press <kbd>Enter</kbd> or <kbd>Space</kbd> on a `button? You're probably not using an HTML`<button>`or`<input type="button">`
* Do you have to tab through a lot of elements before you can reach a certain part of your UI? You probably want to implement [skip links](https://webaim.org/techniques/skipnav/).
* When you press a button and a modal/dialog pops up, can you access its contents immediately? No? You probably have to shift focus from the button to the modal.
* Does the focus indicator suddenly disappear while you keep tabbing? It's likely that you're focusing off-screen items. Hide them correctly. `height: 0`, `transform: translateX(-100%)`, etc. don't remove items from tab order, `display: none;` does.
* Does the focus indicator skip around a lot? Most of the time it's because visual order doesn't match DOM order. Try to avoid reordering logical content and don't use higher values than `0` as a value in the `tabindex` attribute.
* Are parts of your UI only accessible when you hover over them with your mouse? Besides `:hover {}`, use `:focus {}` in CSS and/or the focus event in Javascript.
* Are only parts of your JS components accessible with the keyboard? Read the WAI-ARIA Authoring Practices to learn how to build common patterns correctly and make them accessible to everyone.

That’s not the end of the story. There are more things that you should check, but that’s it for now. I’ll share more in another post. :)
