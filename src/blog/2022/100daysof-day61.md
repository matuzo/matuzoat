---
title: 'Day 61: color-scheme'
date: 2022-12-19T09:38:54.969Z
image: articles/sm_100days-day61.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `color-scheme` property allows you to indicate which color schemes an element can be rendered in."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/NWBWjmb
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Do you know color-scheme?"
    url: https://www.htmhell.dev/adventcalendar/2022/19/
  - title: "color-scheme (MDN)"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
---
*This post is inspired by Sara Wallén’s article [“Do you know color-scheme?”](https://www.htmhell.dev/adventcalendar/2022/19/) in the [HTMHell advent calendar 2022](https://www.htmhell.dev/adventcalendar/). Read it to learn more about the feature and other ways of using it.*

If you create an HTML document, it comes with default styles that are more or less the same in most browsers. A serif font, transparent (white) background, black text color, etc. You could say that the default theme for any HTML document is a light theme because it uses a light background color. Now here comes the big revelation (at least to me) Sara writes about: There's also a dark theme.


The thing is, if you change the color mode in your operating system from dark to light, the colors in the browser’s viewport stay the same (If you know of an operating system (OS)/browser where that's different, please tell me). You have to instruct the browser first about what to do. You can do that by using the `color-scheme` property.

```css
html {
  /* Indicates that the element can be rendered using the 
  operating system dark color scheme. */
  color-scheme: dark;
}
```

<figure style="margin-bottom: 2.4rem"><img src="https://www.htmhell.dev/images/advent2022/19/bare-html.png" alt="Screenshot of two bare-HTML mini-sites, one light, one dark" width="873" height="838" loading="lazy"><figcaption>Comparison of two mock plain HTML sites, one with color-scheme set to light, one set to dark. (source: HTMHell)</figcaption></figure>

*Note: the following results are only based on tests on macOS 13.0.1 and Android 12.*

If you set `color-scheme: dark`, the whole document will be rendered in a dark scheme, even if the color mode of the OS is light. The same goes for using `color-scheme: light` in dark mode, the document will be rendered in a light scheme.

If you want to take advantage of this feature, but you still want to respect user preference, you have to provide two values.

```css
html {
  color-scheme: dark light;
}
```

If the color mode in the OS is light, the color scheme of the document will be light. If the color mode is dark, the scheme will be dark. If you don't have a preference, `dark` might be used first because it comes first in the list, but I can't confirm that. On macOS at least, the document is always rendered in light mode when the color mode is “auto” in the OS, no matter the order of the values. It only changes when the operating system changes the mode automatically, as well.

You can try it yourself on this page by changing the value from “normal” to `light`, `dark`, `light dark`, or `dark light` in this editable style element and adjusting the preference in your OS or in your Dev Tools settings.
<style class="editable-style" contenteditable>html {
  color-scheme: normal;
}</style>

The property is not limited to the root element, you can also apply it to parts of your page. 

## light default

```html
<fieldset>
  <legend>Pick a language</legend>
  <input type="checkbox" name="lang" id="css"> 
  <label for="css">CSS</label><br>

  <input type="checkbox" name="lang" id="html">
  <label for="html">HTML</label><br>

  <input type="checkbox" name="lang" id="js">
  <label for="js">JS</label><br>
</fieldset>
```

<div data-sample="light default">
<fieldset>
  <legend>Pick a language</legend>
  <input type="checkbox" name="lang" id="css"> 
  <label for="css">CSS</label><br>

  <input type="checkbox" name="lang" id="html">
  <label for="html">HTML</label><br>

  <input type="checkbox" name="lang" id="js">
  <label for="js">JS</label><br>
</fieldset>
</div>

## light default with dark background

```css
fieldset {
  background-color: #000;
  color: #fff;
}
```

<div data-sample="light default" style="background-color: #000;">
<fieldset style="background-color: #000; color: #fff;">
  <legend>Pick a language</legend>
  <input type="checkbox" name="lang2" id="css2"> 
  <label for="css2">CSS</label><br>

  <input type="checkbox" name="lang2" id="html2">
  <label for="html2">HTML</label><br>

  <input type="checkbox" name="lang2" id="js2">
  <label for="js2">JS</label><br>
</fieldset>
</div>

## dark with dark background

```css
fieldset {
  color-scheme: dark;
  background-color: #000;
  color: #fff;
}
```

<div data-sample="dark with color-scheme: dark" style="background-color: #000;">
<fieldset style="color-scheme: dark; background-color: #000; color: #fff;">
  <legend>Pick a language</legend>
  <input type="checkbox" name="lang3" id="css3"> 
  <label for="css3">CSS</label><br>

  <input type="checkbox" name="lang3" id="html3">
  <label for="html3">HTML</label><br>

  <input type="checkbox" name="lang3" id="js3">
  <label for="js3">JS</label><br>
</fieldset>
</div>

I had to apply the background color manually, but you can see how the form elements look differently, optimized for dark mode.

## dark on a form element

You can also apply the property to a form element directly.


```css
select {
  color-scheme: dark;
}
```

```html
<label for="color2">Favorite color</label>
<select id="color2">
  <option>Aqua</option>
  <option>Fuchsia</option>
</select>
```

<label for="color2">Favorite color</label><br>
<select id="color2" style="color-scheme: dark">
  <option>Aqua</option>
  <option>Fuchsia</option>
</select>