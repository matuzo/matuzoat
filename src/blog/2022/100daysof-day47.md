---
title: 'Day 47: the overscroll-behavior property'
date: 2022-11-29T09:38:54.969Z
image: articles/sm_100days-day47.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use the `overscroll-behavior` property to disable scroll-chaining."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/yLEqjxM
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "overscroll-behavior on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
  - title: "Day 53: disabling pull-to-refresh"
    url: /blog/2022/100daysof-day53/
---
If you scroll the inner box in the following example to the end and you keep scrolling, the outer box starts scrolling, too, and finally the whole page.

<style>
  .demo.outer,
.demo .inner {
  padding: 1rem;
  border: 10px solid;
  overflow: auto;
  font-size: 1rem;
}

  .demo.outer {
  border-color: brown;
  max-width: 40rem;
  max-height: 400px;
}


.demo .inner {
  border-color: hotpink;
  max-width: 50%;
  max-height: 200px;
  float: left;
  margin: 0 1rem 1rem 0;
}

.demo2 .inner {
  overscroll-behavior: none;
}


</style>

<div class="sample" data-sample="demo">
<div class="demo outer">
  <div class="inner">
    And suckers be thinkin' that they can fake this<br>
    But I'ma drop it at a higher level<br>
    'Cause I'm inclined to stoop down, hand out some beatdowns<br>
    Could run a train on punk fools that think they run the game<br>
    But I learned to burn that bridge and delete<br>
    Those who compete at a level that's obsolete<br>
    Instead, I warm my hands upon the flames of the flag<br>
    To recall the downfall and the businesses that burnt us all<br>
    See through the news and the views that twist reality<br>
    Enough, I call the bluff, fuck Manifest Destiny<br>
    Landlords and power whores, on my people, they took turns<br>
    Dispute the suits, I ignite and then watch 'em burn
  </div>
  
  <p>
    With the thoughts from a militant mind<br>
    Hardline, hardline after hardline<br>
    Landlords and power whores, on my people, they took turns<br>
    Dispute the suits, I ignite and then watch 'em burn<br>
  </p>
  
  <p>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn (Yes, you're gonna)<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
  </p>
  
  <p>
    It goes a one, two, three, another funky, radical bombtrack<br>
    Started as a sketch in my notebook<br>
    And now dope hooks make punks take another look<br>
    My thoughts ya hear and ya begin to fear<br>
    That ya card will get pulled if ya interfere
  </p>
  
  <p>
    With the thoughts from a militant mind<br>
    Hardline, hardline after hardline<br>
    Landlords and power whores, on my people, they took turns<br>
    Dispute the suits, I ignite and then watch 'em burn<br>
  </p>
  
  <p>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn (Yes, you're gonna)<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
  </p>
</div>
</div>

In some cases this behavior is not desirable. You can use `overscroll-behavior` to prevent scrolls from chaining.

```css
.inner {
  overscroll-behavior: none;
}
```


<div class="sample" data-sample="demo">
<div class="demo demo2 outer">
  <div class="inner">
    And suckers be thinkin' that they can fake this<br>
    But I'ma drop it at a higher level<br>
    'Cause I'm inclined to stoop down, hand out some beatdowns<br>
    Could run a train on punk fools that think they run the game<br>
    But I learned to burn that bridge and delete<br>
    Those who compete at a level that's obsolete<br>
    Instead, I warm my hands upon the flames of the flag<br>
    To recall the downfall and the businesses that burnt us all<br>
    See through the news and the views that twist reality<br>
    Enough, I call the bluff, fuck Manifest Destiny<br>
    Landlords and power whores, on my people, they took turns<br>
    Dispute the suits, I ignite and then watch 'em burn
  </div>
  
  <p>
    With the thoughts from a militant mind<br>
    Hardline, hardline after hardline<br>
    Landlords and power whores, on my people, they took turns<br>
    Dispute the suits, I ignite and then watch 'em burn<br>
  </p>
  
  <p>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn (Yes, you're gonna)<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
  </p>
  
  <p>
    It goes a one, two, three, another funky, radical bombtrack<br>
    Started as a sketch in my notebook<br>
    And now dope hooks make punks take another look<br>
    My thoughts ya hear and ya begin to fear<br>
    That ya card will get pulled if ya interfere
  </p>
  
  <p>
    With the thoughts from a militant mind<br>
    Hardline, hardline after hardline<br>
    Landlords and power whores, on my people, they took turns<br>
    Dispute the suits, I ignite and then watch 'em burn<br>
  </p>
  
  <p>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn (Yes, you're gonna)<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
    Burn, burn, yes, you're gonna burn<br>
  </p>
</div>
</div>