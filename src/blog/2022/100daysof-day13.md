---
title: 'Day 13: the :where() and :is() pseudo-classes'
date: 2022-10-12T09:38:54.969Z
image: articles/sm_100days-day13.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `:where()` and `:is()` pseudo-classes allow you to write large lists of selectors in a more compact form. You can combine selectors instead of writing repetitive lists."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/abGVjop
layout: "layouts/100days.njk"
caniuse: 'where(), is()'
reading:
  - title: "MDN :where()"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/:where
  - title: "MDN :is()"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/:is
  - title: "Day 14: the difference between :is() and :where()"
    url: /blog/2022/100daysof-day14/
---

<p class="code-label"><strong>Combining input types</strong></p>

```css
/* Before */
input[type="text"],
input[type="email"],
input[type="url"],
input[type="tel"],
input[type="password"],
input[type="search"] {
  border: 2px solid;
}

/* After */
input:where(
  [type="text"],
  [type="email"],
  [type="url"],
  [type="tel"],
  [type="password"],
  [type="search"]
) {
  border: 2px solid;
}
```
<p class="code-label"><strong>Combining pseudo-classes</strong></p>

```css
a:is(:link, :visited) {
  color: green;
}

a:is(:hover, :focus) {
  text-decoration: none;
}
```

Now you might be thinking, *“Uhm,…can’t I just use :where() instead of :is() and vice versa? What’s the difference?”*.

A fantastic question that I’ll answer in tomorrows post! :)