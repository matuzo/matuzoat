---
title: 'Day 90: scoped styles in container queries'
date: 2023-01-27T09:38:54.969Z
image: articles/sm_100days-day90.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Rules within a container query only apply to descendents of that container."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/PoBaPBz
layout: "layouts/100days.njk"
reading:
  - title: "Day 59: naming containers"
    url: /blog/2022/100daysof-day59/
  - title: "Day 62: the container shorthand"
    url: /blog/2022/100daysof-day62/
  - title: "Day 65: using the em unit in container queries"
    url: /blog/2022/100daysof-day65/
  - title: "Day 69: width in container queries"
    url: /blog/2022/100daysof-day69/
  - title: "Day 73: size container features"
    url: /blog/2023/100daysof-day73/
  - title: "Day 78: container query units"
    url: /blog/2023/100daysof-day78/
  - title: "Day 80: container style queries"
    url: /blog/2023/100daysof-day80/
  - title: "Day 90: scoped styles in container queries"
    url: /blog/2023/100daysof-day90/
---

If you write a media query and you put rules in the media block, the rules apply to the entire document.

<button class="style1" aria-pressed="false">Apply rules</button>




```css
@media (min-width: 1024px) {
  * {
    outline: 4px solid 
  }
}
```

<style>

@media (min-width: 1024px) {
  .demo1, .demo1 * {
    outline: 4px solid 
  }
}

.demo4 main,
.demo3 main,
.demo4 [data-sample],
.demo3 [data-sample],
.demo2 [data-sample] {
  container-type: inline-size;
}

@container (min-inline-size: 240px) {
  .demo2 *,
  .demo3 * {
    outline: 4px dotted fuchsia;
  }
}


.demo4 [data-sample] {
  container-name: demo;
}

@container demo (min-inline-size: 240px) {
  * {
    outline: 4px dotted fuchsia;
  }
}


/* body {
  container-type: inline-size;
}

.card {
  --style: color;
  container-type: inline-size;
}

@container style(--style: color) {
  * {
    background-color: aqua;
  }
}

@media (min-width: 1024px) {
  * {
    outline: 4px solid 
  }
}

 */
</style>

If you write a container query and you put rules in the container block, the rules only apply to descendents of the container.


```html
<div data-sample="demo">
  <h2>A quote</h2>
  <blockquote>“What came first – the music or the misery? Did I listen to the music because I was miserable? Or was I miserable because I listened to the music? Do all those records turn you into a melancholy person?”</blockquote>
</div>
```

```css
[data-sample] {
  container-type: inline-size;
}

@container (min-inline-size: 240px) {
  * {
    border: 8px dotted fuchsia;
  }
}
```

<button class="style2" aria-pressed="false">Apply rules</button>


<div data-sample="demo">
  <h2>A quote</h2>
  <blockquote>“What came first – the music or the misery? Did I listen to the music because I was miserable? Or was I miserable because I listened to the music? Do all those records turn you into a melancholy person?”</blockquote>
</div>



If you have nested containers, the styles apply to all applicable containers.

<button class="style3" aria-pressed="false">Apply rules</button>


```css
main,
[data-sample] {
  container-type: inline-size;
}

@container (min-inline-size: 240px) {
  * {
    border: 8px dotted fuchsia;
  }
}
```


This can cause a lot of confusion. I guess, that's one reason why it's advised to name containers.


```css
main,
[data-sample] {
  container-type: inline-size;
}

[data-sample] {
  container-name: demo;
}

@container demo(min-inline-size: 240px) {
  * {
    border: 8px dotted fuchsia;
  }
}
```

<button class="style4" aria-pressed="false">Apply rules</button>

<div data-sample="demo">
  <h2>A quote</h2>
  <blockquote>“What came first – the music or the misery? Did I listen to the music because I was miserable? Or was I miserable because I listened to the music? Do all those records turn you into a melancholy person?”</blockquote>
</div>

<script>
  const add = function(btn, cls) {
    document.querySelector(btn).addEventListener('click', e => {
    const playing = e.target.getAttribute('aria-pressed') !== "false"
    e.target.setAttribute('aria-pressed', !playing)
    document.documentElement.classList.toggle(cls)
    })
  }

  add('.style1', 'demo1')
  add('.style2', 'demo2')
  add('.style3', 'demo3')
  add('.style4', 'demo4')
</script>