---
title: 'Day 20: the scrollbar-gutter property'
date: 2022-10-21T09:38:54.969Z
image: articles/sm_100days-day20.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `scrollbar-gutter` property allows you decide whether content within an element fills the total available space or if it stops at the scrollbar gutter. The scrollbar gutter is the space between the inner border edge and the outer padding edge of an element used by the scrollbar."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/NWMeXqx
layout: "layouts/100days.njk"
caniuse: "scrollbar-gutter"
reading:
  - title: "Prevent unwanted Layout Shifts caused by Scrollbars with the scrollbar-gutter CSS property"
    url: https://www.bram.us/2021/07/23/prevent-unwanted-layout-shifts-caused-by-scrollbars-with-the-scrollbar-gutter-css-property/
  - title: "scrollbar-gutter on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
  - title: "Day 25: scrollbar gutters in body and html"
    url: /blog/2022/100daysof-day25/
---
By default, if the content in an element is not overflowing, there's no gutter.
<style>
.div {
  width: min(100%, 31rem);
  height: 28rem;
  overflow: auto;
  border: 2px solid;
}

.gutter {
  scrollbar-gutter: stable;
}
</style>

<h2>Overflowing content</h2>
<div class="div">
Choose Life. Choose a job. Choose a career. Choose a family. Choose a fucking big television, choose washing machines, cars, compact disc players and electrical tin openers. Choose good health, low cholesterol, and dental insurance. Choose fixed interest mortgage repayments. Choose a starter home. Choose your friends. Choose leisurewear and matching luggage. Choose a three-piece suit on hire purchase in a range of fucking fabrics. Choose DIY and wondering who the fuck you are on Sunday morning. Choose sitting on that couch watching mind-numbing, spirit-crushing game shows, stuffing fucking junk food into your mouth. Choose rotting away at the end of it all, pissing your last in a miserable home, nothing more than an embarrassment to the selfish, fucked up brats you spawned to replace yourselves. Choose your future. Choose life... But why would I want to do a thing like that? I chose not to choose life. I chose somethin' else. And the reasons? There are no reasons. Who needs reasons when you've got heroin? 
</div>

<h2>scrollbar-gutter: auto</h2>
<div class="div">
Choose Life. Choose a job. Choose a career. Choose a family. Choose a fucking big television, choose washing machines, cars, compact disc players and electrical tin openers. Choose good health, low cholesterol, and dental insurance. Choose fixed interest mortgage repayments. Choose a starter home. Choose your friends. Choose leisurewear and matching luggage. Choose a three-piece suit on hire purchase in a range of fucking fabrics. 
</div>

You can set `scrollbar-gutter` to `stable` to always show the gutter. This allows you to create more consistent and stable layouts.

```css
.gutter {
  scrollbar-gutter: stable;
}
```

<h2>Overflowing content</h2>
<div class="div">
Choose Life. Choose a job. Choose a career. Choose a family. Choose a fucking big television, choose washing machines, cars, compact disc players and electrical tin openers. Choose good health, low cholesterol, and dental insurance. Choose fixed interest mortgage repayments. Choose a starter home. Choose your friends. Choose leisurewear and matching luggage. Choose a three-piece suit on hire purchase in a range of fucking fabrics. Choose DIY and wondering who the fuck you are on Sunday morning. Choose sitting on that couch watching mind-numbing, spirit-crushing game shows, stuffing fucking junk food into your mouth. Choose rotting away at the end of it all, pissing your last in a miserable home, nothing more than an embarrassment to the selfish, fucked up brats you spawned to replace yourselves. Choose your future. Choose life... But why would I want to do a thing like that? I chose not to choose life. I chose somethin' else. And the reasons? There are no reasons. Who needs reasons when you've got heroin? 
</div>

<h2>scrollbar-gutter: stable</h2>
<div class="gutter div">
Choose Life. Choose a job. Choose a career. Choose a family. Choose a fucking big television, choose washing machines, cars, compact disc players and electrical tin openers. Choose good health, low cholesterol, and dental insurance. Choose fixed interest mortgage repayments. Choose a starter home. Choose your friends. Choose leisurewear and matching luggage. Choose a three-piece suit on hire purchase in a range of fucking fabrics. 
</div>