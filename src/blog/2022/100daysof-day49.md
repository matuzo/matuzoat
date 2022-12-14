---
title: 'Day 49: layering entire style sheets'
date: 2022-12-01T09:38:54.969Z
image: articles/sm_100days-day49.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use `@import` to load entire style sheets into a cascade layer."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/XWYxgmo
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 37: cascade layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day37/
  - title: "Day 40: unlayered styles"
    url: https://www.matuzo.at/blog/2022/100daysof-day40/
  - title: "Day 43: grouping layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day43/
  - title: "Day 46: ordering layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day46
  - title: "Day 52: multiple layer lists"
    url: https://www.matuzo.at/blog/2022/100daysof-day52/
  - title: "Day 55: anonymous layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day55/
  - title: "Day 58: ordering nested layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day58/
  - title: "A Complete Guide to CSS Cascade Layers"
    url: https://css-tricks.com/css-cascade-layers/
---

```css
@import url("path/to/the/styles.css") layer(layername);
```

For example, you could load something like Bootstrap into a dedicated third-party layer.

<style>
  @layer third-party, base, components, utility;

  @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css") layer(third-party);

  @layer base {
    body {
      /* my custom styles */
    }
  }
</style>

```css
@layer third-party, base, components, utility;

@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css") layer(third-party);

@layer base {
  body {
    /* my custom styles */
  }
}
```


```html
<button type="button" class="btn btn-primary">Primary</button>
```

<div class="sample" data-sample="demo: styles coming from the bootstrap CDN">
  <button type="button" class="btn btn-primary">Primary</button>
</div>

An important thing to know when importing styles is that it matters where you put the `@import` rule. [In the spec](https://www.w3.org/TR/css-cascade-5/#at-import) it says:

<blockquote>Any @import rules must precede all other valid at-rules and style rules in a style sheet (ignoring @charset and empty @layer definitions) and must not have any other valid at-rules or style rules between it and previous @import rules, or else the @import rule is invalid.</blockquote>

This is invalid:

```css
@layer third-party, base, components, utility;


@layer base {
  body {
    /* my custom styles */
  }
}

@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css") layer(third-party);
```