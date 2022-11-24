---
title: 'Day 44: logical floating and clearing'
date: 2022-11-24T09:38:54.969Z
image: articles/sm_100days-day44.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Thanks to Flexbox and CSS Grid no one seems to talk about `float` and `clear` anymore,…except for me now because there's news."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/PoaRVwJ
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 2: logical properties"
    url: /blog/2022/100daysof-day2/
  - title: "Day 3: logical property shorthands"
    url: /blog/2022/100daysof-day3/
  - title: "Day 31: logical border properties"
    url: /blog/2022/100daysof-day31
---
Floating and clearing has lost its importance for layout, but they are still useful properties. Just like for `margin` or `border`, you can now use logical properties for floating and clearing.

```css
img {
  float: inline-start; /* or inline-end */
}

p {
  clear: inline-start; /* or inline-end */
}
```

<style>
  [dir] {
    margin-block-end: 2rem;
  }
  [dir] img {
    float: inline-start;
    margin-inline-end: 1rem;
  }

  [dir] p:nth-of-type(3) {
    clear: inline-start;

  }
</style>

<div dir="ltr" class="sample" data-sample="ltr demo">

<img src="/images/gus.jpg" alt="Gus Polinski, the Polka King of the Midwest talking to a desperate mother." width="350">
<p>Gus Polinski, the "Polka King of the Midwest," was the clarinet player and lead musician of a polka band, the Kenosha Kickers.</p>

<p>Gus first appears in the Scranton Airport when Kate is unable to fly to Chicago on Christmas Eve because all flights are fully booked. Upon hearing about her dilemma, Gus offers her a ride, which Kate gladly accepts.</p>

<p>Source: <a href="https://homealone.fandom.com/wiki/Gus_Polinski">Gus_Polinski</a></p>
</div>

<div dir="rtl" class="sample" data-sample="rtl demo">

<img src="/images/gus.jpg" alt="Gus Polinski, the Polka King of the Midwest talking to a desperate mother." width="350">
<p>Gus Polinski, the "Polka King of the Midwest," was the clarinet player and lead musician of a polka band, the Kenosha Kickers.</p>

<p>Gus first appears in the Scranton Airport when Kate is unable to fly to Chicago on Christmas Eve because all flights are fully booked. Upon hearing about her dilemma, Gus offers her a ride, which Kate gladly accepts.</p>

<p>Source: <a href="https://homealone.fandom.com/wiki/Gus_Polinski">Gus_Polinski</a></p>
</div>