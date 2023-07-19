---
title: "Visually hidden links with 0 dimensions"
metadescription: 'A quick note about using 0 dimensions in visually-hidden links'
teaser: 'If you have used a visually-hidden class in the past, you might have noticed that the width and height is set to 1px and not 0. I’ve always wondered why. '
date: 2023-07-19T09:09:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_skiplink0.jpg
---

<p class="code-intro">
Even in James Edwards’ “<a href="https://www.tpgi.com/the-anatomy-of-visually-hidden/">The anatomy of visually-hidden</a>” I didn’t find the answer because he wasn’t sure either.
While testing a client’s site a few minutes ago, I found at least one good reason.
</p>

```css
/* A typical .visually-hidden class */
.visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
```

<p class="code-intro">
My client has skip links on their site, and they work perfectly fine in Chrome and Firefox but not in Safari. They use the following code for hiding links visually:
</p>

```css
.skip-links a:not(:focus) {
    overflow: hidden;
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
    margin: 0;
}
```

<p class="code-intro">
As it turns out, links are not focusable in Safari if they have 0 dimensions. Adding 1px padding, border, or width and height fixes the issue.
</p>

```css
.skip-links a:not(:focus) {
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border: 0;
    margin: 0;
}
```

So, there you go. That's why you want to keep the 1px height and width in your visually-hidden classes. You can test it in this [CodePen](https://codepen.io/matuzo/pen/yLQjQKq).