---
title: 'Day 86: the initial-letter property'
date: 2023-01-23T09:38:54.969Z
image: articles/sm_100days-day86.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `initial-letter` property specifies size and sink for initial letters."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/qByxgKL
layout: "layouts/100days.njk"
reading:
  - title: "Greater styling control over type with `initial-letter`"
    url: https://blog.stephaniestimac.com/posts/2023/1/css-initial-letter/
  - title: "6.3. Creating Initial Letters: the initial-letter property"
    url: https://w3c.github.io/csswg-drafts/css-inline/#sizing-drop-initials
---
```css
@supports (-webkit-initial-letter: 1) or (initial-letter: 1) {
  p::first-letter {
    -webkit-initial-letter: 3;
    initial-letter: 3;
  }
}
```

The property takes two arguments. The first one defines the size of the initial letter in terms of how many lines it occupies. The optional second argument defines the number of lines the initial letter should sink. If it's omitted, it equals the initial letter size.

```css
  p::first-letter {
    initial-letter: 2;
  }
```
<img src="/images/100days-86-1.png" alt="The first letter in a paragraph spans 2 lines starting at the first line and ending at the second line." loading="lazy" width="928" height="328">


1 as the second argument indicates a raised initial.

```css
  p::first-letter {
    initial-letter: 2 1;
  }
```

<img src="/images/100days-86-2.png" alt="The first letter in a paragraph spans 2 lines starting at the first line and going up ending one line above the first line." loading="lazy"  width="828" height="384">

Values greater than 1 indicate a sunken initial letter. 

```css
  p::first-letter {
    initial-letter: 2 5;
  }
```

<img src="/images/100days-86-3.png" alt="The first letter in a paragraph spans 2 lines starting at the fourth line and ending at the fifth line." loading="lazy" width="916" height="334">

<div class="highlight">

**Note:** This property is currently only supported in Safari with a prefix, but it's [coming to Chromium browsers soon](https://caniuse.com/css-initial-letter).

</div>

