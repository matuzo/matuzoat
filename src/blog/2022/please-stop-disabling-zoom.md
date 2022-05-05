---
title: 'Please, stop disabling zoom'
metadescription: >-

date: 2022-05-05T10:50:54.969Z
image: articles/sm_zoom.jpg
teaser: "I know that you’re not supposed to tell people what to do, but in this particular case I’m really tempted because recently I’ve noticed that a lot of websites are preventing users on mobile to zoom."
tags:
  - blog
  - posts
  - html
---

I don’t know whether this is a trend, or just a coincidence, but I see a lot of these meta tags on sites:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"> 
```

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> 
```

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> 
```

This prevents users from being able to zoom a page on some browsers and operating systems. This can have serious negative consequences for people with low vision, elderly people and pretty much anyone who has to or wants to zoom in. If you want to see how problematic this is, visit [espn.com](https://www.espn.com), [duesseldorf.de](https://www.duesseldorf.de), [thesun.co.uk](https://www.thesun.co.uk), [discord.com](https://www.discord.com), or [dhl.de](https://www.dhl.de), just to name a few.

According to the [HTTP Archive Web Alamac](https://almanac.httparchive.org/en/2021/accessibility#zooming-and-scaling), 24% of desktop homepages and 29% of mobile homepages attempt to disable scaling by setting either `maximum-scale` to a value less than or equal to 1, or `user-scalable` set to 0 or none. These numbers are way too high.

**So, please stop disabling zoom!**

Based on some quick tests by me and [friendly people on Twitter](https://twitter.com/mmatuzo/status/1522107174230573056), Safari seems to ignore `maximum-scale=1` and `user-scalable=no`, which is great, but it still works on Chrome and Firefox on Android. Samsung Internet on Android seems to ignore it, too.

As a user, you can force allow zooming: 

In Firefox find the settings, select “Accessibility” and activate “Zoom on all website”  
In Chrome find the settings, select “Accessibility” and check “Force enable zoom”