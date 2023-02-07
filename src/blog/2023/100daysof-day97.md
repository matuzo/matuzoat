---
title: 'Day 97: animating grids'
date: 2023-02-07T09:38:54.969Z
image: articles/sm_100days-day97.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "It’s possible to animate `gap`, `grid-template-columns`, and `grid-template-rows`."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/rmQvMG
layout: "layouts/100days.njk"
reading:
  - title: "CSS Animated Grid Layouts"
    url: https://web.dev/css-animated-grid-layouts/
  - title: "Animating CSS Grid (How To + Examples)"
    url: https://css-tricks.com/animating-css-grid-how-to-examples/
---
Almost 6 years ago I wrote a blog post on CodePen titled “[Animating CSS Grid Layout properties](https://codepen.io/matuzo/post/animating-css-grid-layout-properties)”. A lot has changed since then, especially recently, and I wanted to update the post, but the blogging feature on CodePen has been sunset and I can’t edit the post anymore. Since animating grids is topical again, I added it to the series. 

<p>According to the <a href="https://www.w3.org/TR/css-grid-1/#propdef-grid-column-gap">CSS Grid Layout Module Level 1 specification</a> there are 5 animatable grid properties:</p>

<ul>
<li><code>grid-gap</code>, <code>grid-row-gap</code>, <code>grid-column-gap</code><br>
as length, percentage, or calc.</li>
<li><code>grid-template-columns</code>, <code>grid-template-rows</code><br>
as a simple list of length, percentage, or calc, provided the only differences are the values of the length, percentage, or calc components in the list.</li>
</ul>

Animating these properties will most likely affect larger areas of the screen. That's why it's important to only show animation to those who have no preference for reduced motion.

```css
.grid {
  --col: 9.5rem;
  --row: 8rem;
  --gap: 2rem;

  display: grid;
  grid-template-columns: repeat(3, var(--col));
  grid-template-rows: repeat(4, var(--row));
  grid-gap: var(--gap);
}

.grid--full {
  --col: 30%;
  --row: 4rem;
  --gap: 1rem;
}

@media (prefers-reduced-motion: no-preference) {
  .grid {
    transition: all 1s;
  }
}
```

<p class="codepen" data-height="600" data-default-tab="result" data-slug-hash="rmQvMG" data-user="matuzo" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/matuzo/pen/rmQvMG">
  CSS Grid Layout: Animation</a> by Manuel Matuzovic (<a href="https://codepen.io/matuzo">@matuzo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<table>
<caption>Browser support for animatable grid properties</caption>
<thead>
<tr><th>Browser</th>
<th>(grid-)gap, (grid-)row-gap, (grid-)column-gap</th>
<th>grid-template-columns</th>
<th>grid-template-rows</th>
</tr></thead>
<tbody>
<tr>
<td>
Firefox 66
</td>
<td>
<span aria-label="supported">✅</span> (since FF 55, FFM 53)
</td>
<td>
<span aria-label="supported">✅</span>
</td>
<td>
<span aria-label="supported">✅</span>
</td>
</tr>
<tr>
<td>
Safari 16
</td>
<td>
<span aria-label="supported">✅</span>
</td>
<td>
<span aria-label="supported">✅</span>
</td>
<td>
<span aria-label="supported">✅</span>
</td>
</tr>
<tr>
<td>
Chrome 107
</td>
<td>
<span aria-label="supported">✅</span> (since Chrome 68)
</td>
<td>
<span aria-label="supported">✅</span>
</td>
<td>
<span aria-label="supported">✅</span>
</td>
</tr>
<tr>
<td>
Edge 107
</td>
<td>
<span aria-label="supported">✅</span> (since Edge 79)
</td>
<td>
<span aria-label="supported">✅</span>
</td>
<td>
<span aria-label="supported">✅</span>
</td>
</tr>
</tbody>
</table>

## Other demos

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="jOxRdzw" data-user="web-dot-dev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/web-dot-dev/pen/jOxRdzw">
  Animated Mondrian (CSS grid-template-columns|rows interpolation)</a> by web.dev (<a href="https://codepen.io/web-dot-dev">@web-dot-dev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="XWqVowx" data-user="web-dot-dev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/web-dot-dev/pen/XWqVowx">
  Animated CSS Grid</a> by web.dev (<a href="https://codepen.io/web-dot-dev">@web-dot-dev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>