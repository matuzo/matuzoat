---
title: 'Day 79: font-tech() and font-format()'
date: 2023-01-11T09:38:54.969Z
image: articles/sm_100days-day79.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use the `@supports` rule to check whether a browser supports a specified font technology or font format."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/JjBNYxV
layout: "layouts/100days.njk"
reading:
  - title: "@supports on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/@supports#the_not_operator
  - title: "Day 54: testing for the support of a selector"
    url: /blog/2022/100daysof-day54/
---

## font-tech()

<style>
  @supports font-tech(palettes) {
    .palette {
      display: block;
    }
  }

  @supports not font-tech(incremental) {
    .incremental {
      display: block;
    }
  }

  @supports font-format(woff2) {
    .woff {
      display: block;
    }
  }

  [data-sample] {
    font-size: 1.6rem;
    font-weight: bold;
  }
</style>

The `font-tech()` function checks whether a browser supports the specified font technology. For example, you can apply styles only if the browser supports [font-palettes](/blog/2023/100daysof-day75/) or if it doesn't support incremental font loading (I have no idea what that is).

```html
<div class="palette" hidden>
  Your browser supports font palettes 🎉
</div>

<div class="incremental" hidden>
  Your browser doesn't support incremental font loading 😭
</div>
```

```css
@supports font-tech(palettes) {
  .palette {
    display: block;
  }
}

@supports not font-tech(incremental) {
  .incremental {
    display: block;
  }
}
```

<div data-sample="demo">
  <div class="palette" hidden>Your browser supports font palettes 🎉</div>
  <div class="incremental" hidden>Your browser doesn't support incremental font loading 😭</div>
</div>

You can find a list of [font technologies on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports#font-tech).

## font-format()

The `font-format()` function checks whether a browser supports the specified font format. For example, you can apply styles only if the browser supports 
`.woff2`.

```html
<div hidden>
  Your browser supports woff2 🎉
</div>
```

```css
@supports font-format(woff2) {
  div {
    display: block;
  }
}
```

<div data-sample="demo">
<div hidden class="woff">
  Your browser supports woff2 🎉
</div>
</div>

You can find a list of [font formats on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports#font-format).

<div class="highlight">
<strong>Browser Support:</strong> I haven't tested in thoroughly but both functions work on latest Chrome and Firefox on macOS, and Chrome and Firefox on Android. They don't work on Samsung Internet and Safari.
</div>
