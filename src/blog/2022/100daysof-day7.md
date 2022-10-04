---
title: 'Day 7: subgrids'
date: 2022-10-04T09:38:54.969Z
image: articles/sm_100days-day7.jpg
teaser: "It’s time to get me up on speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/qBoGVXy
layout: "layouts/100days.njk"
caniuse: "subgrid"
---
Subgrid allows a grid-item with its own grid to align with its parent grid  (currently only in [Firefox 71+ and Safari 16+](https://caniuse.com/css-subgrid)).

In the following example, the `div` elements use the grid defined in the `dl` element. The result is that all the `dt` and `dd` elements are aligned in the same “columns” respectively, even though they’re not on the same level in the DOM.

```html
<dl>
  <div>
    <dt>HTML</dt>
    <dd>The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.</dd>
  </div>
  <div>
    <dt>JavaScript</dt>
    <dd>JavaScript often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS</dd>
  </div>
</dl>
```

```css
dl {
  display: grid;
  gap: 0.5rem 2rem;
  grid-template-columns: auto 1fr;
}

div {
  display: inherit;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}
```

<style>
.subgrid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 2rem;
}

.subgrid div {
  grid-column: 1 / -1;
  display: inherit;
  grid-template-columns: subgrid;
}

.no-subgrid {
  display: grid;
  gap: 0.5rem 2rem;
  grid-template-columns: auto 1fr;
}

.no-subgrid div {
  display: inherit;
  gap: inherit;
  grid-column: 1 / -1;
  grid-template-columns: auto 1fr;
}
</style>

<figure>

<dl class="subgrid">
  <div>
    <dt>HTML</dt>
    <dd>The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.</dd>
  </div>
  <div>
    <dt>JavaScript</dt>
    <dd>JavaScript often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS</dd>
  </div>
</dl>

<figcaption>Both columns are neatly aligned in the same grid.</figcaption>

</figure>

To make it a bit more obvious, here’s how the same grid looks like if you don’t use `subgrid` but copy the `grid-template-columns` declaration from the `dl` and use it on the `div`.

```css
dl {
  display: grid;
  gap: 0.5rem 2rem;
  grid-template-columns: auto 1fr;
}

div {
  display: inherit;
  gap: inherit;
  grid-column: 1 / -1;
  grid-template-columns: auto 1fr;
}
```

<figure>

<dl class="no-subgrid">
  <div>
    <dt>HTML</dt>
    <dd>The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.</dd>
  </div>
  <div>
    <dt>JavaScript</dt>
    <dd>JavaScript often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS</dd>
  </div>
</dl>

<figcaption>The width of each element differs because each div forms its own grid.</figcaption>

</figure>