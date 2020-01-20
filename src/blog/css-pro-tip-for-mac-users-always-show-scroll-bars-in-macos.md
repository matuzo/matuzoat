---
title: 'CSS pro tip for mac users:  always show scroll bars in macOS.'
metadescription: >-
  Change your macOS settings to always show scroll bars. This will help you spot
  overflow bugs, e.g. caused by `width: 100vw`, before anybody else does. :)
date: 2020-01-20T06:48:54.969Z
image: /static/img/uploads/scrolltip_sm.png
teaser: "I built a quite\_complicated component in HTML and CSS last week and I was happy with the result. After testing in different browsers and operating systems, I realised that I had to rewrite the whole thing because I didn’t consider that by default scroll bars don’t take up space on macOS, but on Windows they do. \nI [tweeted about a similar issue](https://twitter.com/mmatuzo/status/1116724406930366466) about a year ago, but it\_seems\_that\_I didn’t take my own\_advice, so here’s a reminder for you and me."
tags:
  - css
publication: Matuzo
draft: false
archive: false
---
Change your macOS settings to always show scroll bars. This will help you spot overflow bugs, e.g. caused by `width: 100vw`, before anybody else does. :)

![General settings screen in macOS with "scow scroll bars" set to "always"](https://res.cloudinary.com/dp3mem7or/image/upload/v1571155703/articles/scrolltip.png)

Side note: Adding max-width: 100% often helps.

```css
.header {
  width: 100vw;
  max-width: 100%; 
}
```
