---
title: 'Day 80: style container queries'
date: 2023-01-13T09:38:54.969Z
image: articles/sm_100days-day80.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Container style queries allow querying the computed values of a query container."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/GRBmdvW
layout: "layouts/100days.njk"
reading:
  - title: "CSS Style Queries"
    url: https://ishadeed.com/article/css-container-style-queries/#introducing-style-queries
---
No browser supports it yet, but we should be able to do something like this:

```css
.card {
  aspect-ratio: 1 / 1;
}

.card--wide {
  aspect-ratio: 16 / 9
}

@container style(aspect-ratio: 16 / 9) {
  img {
    object-fit: cover;
  }
}
```

We can check whether a container has a specific property and value assigned and apply additional styles based on this condition. Chrome support container style queries behind a flag, but only with custom properties, not _ordinary_ properties.


Here’s an example based on a component I've built a while ago where this can be useful. We have a card component that can be used in different ways. It can contain just text, text and an image, text and a video, and also text with a background color. Most background colors in our design system work well with black as the text color, but there’s one exception.

<style>
  :root {
  --nebelgrau: #d6d1ca;
  --flieder: #aaaafa;
  --abendstimmung: #49274b;
}

.card {
  --bg: var(--nebelgrau);
  background-color: var(--bg);
}

@container style(--bg: var(--abendstimmung)) {
  .sample2 * {
    color: #fff;
  }
}
</style>

```css
:root {
  --nebelgrau: #d6d1ca;
  --flieder: #aaaafa;
  --abendstimmung: #49274b;
}

.card {
  --bg: var(--nebelgrau);
  background-color: var(--bg);
}
```

```html
<div class="card">
  <h2>Chapter 1</h2>
</div>

<div class="card" style="--bg: var(--flieder)">
  <h2>Chapter 2</h2>
</div>

<div class="card" style="--bg: var(--abendstimmung)">
  <h2>Chapter 3</h2>
</div>
```

<div data-sample="simplified demo">
  <div class="card">
    <h2>Chapter 1</h2>
  </div>

  <div class="card" style="--bg: var(--flieder)">
    <h2>Chapter 2</h2>
  </div>

  <div class="card" style="--bg: var(--abendstimmung)">
    <h2>Chapter 3</h2>
  </div>
</div>

I could assign a class to this specific card variation and just change the text color. That’s actually what we’re doing at the moment, but with style queries I can create a general rule that changes the text color whenever the container has a specific background color.

```css
@container style(--bg: var(--abendstimmung)) {
  * {
    color: #fff;
  }
}
```

<div class="highlight"><strong>Note:</strong> The color is probably still black for you, but it's white in supported browsers (Only Chrome behind a flag at the moment.)</div>

<div data-sample="simplified demo" class="sample2">
  <div class="card" style="--bg: var(--abendstimmung)">
    <h2>Chapter 2</h2>
  </div>
</div>