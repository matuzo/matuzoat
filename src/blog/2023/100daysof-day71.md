---
title: 'Day 71: the masonry keyword'
date: 2023-01-02T09:38:54.969Z
image: articles/sm_100days-day71.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `masonry` keyword allows you to create masonry grid layouts."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/KKBzrRK
layout: "layouts/100days.njk"
---

If you want to create a masonry layout, all you have to do is turn one of the grid axes into a masonry axis using the `masonry` keyword.

```html
<ol>
  <li>
    <a href="/blog/2023/100daysof-day70/">
      Day 70: the defined pseudo-class
    </a>
  </li>
  <li>
    <a href="/blog/2022/100daysof-day69/">
      Day 69: width in container queries
    </a>
  </li>
  <li>
    <a href="/blog/2022/100daysof-day68/">
      Day 68: cascade layers and browser support
    </a>
  </li>
  …
</ol>
```

```css
ol {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
  grid-template-rows: masonry;
}
```

This simple layout turns into…

<a style="display: block" href="/images/100days-71-1.jpg">
  <img src="/images/100days-71-1.jpg" alt="A 7-column grid. All items in a row have the same height. They're as large as the largest item in the row." lazy="loading">
</a>

…this _“so much better”_ layout.

<a style="display: block" href="/images/100days-71-2.jpg">
  <img src="/images/100days-71-2.jpg" alt="A 7-column grid. All items have a different height. They're only as large as they have to be." lazy="loading">
</a>

You can also turn the other axis into the masonry axis.

```css
ol {
  display: grid;
  gap: 1rem;
  grid-template-columns: masonry;
  grid-template-rows: repeat(auto-fill, 6rem);
}
```

<a style="display: block" href="/images/100days-71-3.jpg">
  <img src="/images/100days-71-3.jpg" alt="A 4-rows grid. Each item in each row is as wide as its content." lazy="loading">
</a>

### Accessibility

By default, the packing algorithm puts items into the column with the most space. This may cause a disconnect between <abbr title="document object model">DOM</abbr> and tabbing order, which can be an issue for keyboard and screen reader users. Test your masonry grids sufficiently.

### Browser support

Why am I showing screenshots instead of rendering the result directly? Well, because Firefox is the only browser that supports the keyword at the moment and the feature is still behind a flag. You can enable it by visiting `about:config` and setting `layout.css.grid-template-masonry-value.enabled` to `true`.

Can you use it today? Yeah, why not?! Most users will still get a grid, it's just not a masonry layout.