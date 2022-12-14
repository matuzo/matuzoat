---
title: 'Day 55: anonymous layers'
date: 2022-12-09T09:38:54.969Z
image: articles/sm_100days-day55.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "In all previous posts about cascade layers I’ve used named layers in the demos, but it’s actually not required to name them."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/KKeEYeo
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 37: cascade layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day37/
  - title: "Day 40: unlayered styles"
    url: https://www.matuzo.at/blog/2022/100daysof-day40/
  - title: "Day 43: grouping layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day43/
  - title: "Day 46: ordering layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day46/
  - title: "Day 49: layering entire style sheets"
    url: https://www.matuzo.at/blog/2022/100daysof-day49/
  - title: "Day 52: multiple layer lists"
    url: https://www.matuzo.at/blog/2022/100daysof-day52/
  - title: "Day 58: ordering nested layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day58/
  - title: "A Complete Guide to CSS Cascade Layers"
    url: https://css-tricks.com/css-cascade-layers/
---
Using `@layer` without a name works just as well. The downsides are that you can’t append styles elsewhere in the document to the same layer and you can’t define a custom order since you don’t have a name to reference them.


```css
@layer {
  p {
    border: 10px solid red;
  }
}

@layer {
  p {
    border-color: rebeccapurple;
  }
}
```

<style>
@layer {
  [data-sample] p {
    border: 10px solid red;
  }
}

@layer {
  [data-sample] p {
    border-color: rebeccapurple;
  }
}
</style>
<div data-sample="demo" class="sample demo1">
<p>
Bartender, I got me a bet for you. I'm gonna bet you $300 that I can piss into that glass over there and not spill a single, solitary drop.
</p>
</div>


You can also import style sheets into an anonymous layer by using the `layer` keyword.

```css
@import url('style.css') layer;

```