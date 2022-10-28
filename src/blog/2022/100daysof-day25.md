---
title: 'Day 25: scrollbar gutters in body and html'
date: 2022-10-28T09:38:54.969Z
image: articles/sm_100days-day25.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "When I wrote about the [scrollbar-gutter property](/blog/2022/100daysof-day20/), my first thought was “omg! I'll put this in my reset stylesheet and use it on the `<body>` by default”. I wanted to do that in order to prevent the page from “jumping” when switching from a long to a short page, a page with overflow to one without."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/PoermJr
layout: "layouts/100days.njk"
caniuse: "scrollbar-gutter"
reading:
  - title: "4. Reserving space for the scrollbar: the scrollbar-gutter property"
    url: https://w3c.github.io/csswg-drafts/css-overflow/#scrollbar-gutter-property
---
Here's a quick demo to illustrate the issue. 

<figure>
<video src="/images/scrollbar-gutter.mov" controls>
    Sorry, your browser doesn't support embedded videos.
</video>
<figcaption>When switching from a page with a scrollbar to a page without, you can see how the whole page shifts to the left because the scrollbar takes up space on longer pages.</figcaption>
</figure>

So I tried this…

```css
body {
  scrollbar-gutter: stable;
}
```

…and it didn't work.

I looked at the spec and there it says:

<blockquote>
However, unlike the overflow property, the user agent must not propagate scrollbar-gutter from the HTML body element.
</blockquote>

So, `overflow` on the `body` is propagated to the viewport, which absolutely makes sense. Just try to set a width on the body with a lot of content, you'll see how the width changes, but the scrollbar is still on the inline end of the viewport.

<img src="/images/scrollbar-gutter1.png" alt="">

If I understand correctly, `scrollbar-gutter` has no effect on the body because `overflow` is propagated to the viewport, but `scrollbar-gutter` isn't. If there's no overflow, then there's no scrollbar gutter. It kinda makes sense to me. (Please correct me if I'm wrong. :))

When I moved the declaration to the `<html>` element, it worked! That's because both `overflow` and `scrollbar-gutter` used on `<html>` are propagated to the viewport.

```css
html {
  scrollbar-gutter: stable;
}
```