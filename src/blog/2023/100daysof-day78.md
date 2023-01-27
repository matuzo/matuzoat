---
title: 'Day 78: container query units'
date: 2023-01-11T09:38:54.969Z
image: articles/sm_100days-day78.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Container queries come with their own units."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/WNKpvXv
layout: "layouts/100days.njk"
reading:
  - title: "6. Container Relative Lengths: the cqw, cqh, cqi, cqb, cqmin, cqmax units"
    url: https://www.w3.org/TR/css-contain-3/#container-lengths
  - title: "Use the Right Container Query Syntax"
    url: https://www.oddbird.net/2022/08/18/cq-syntax/
  - title: "CSS Containment Module Level 3"
    url: https://www.w3.org/TR/css-contain-3/
  - title: "Day 56: container queries"
    url: /blog/2022/100daysof-day56/
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
  - title: "Day 90: scoped styles in container queries"
    url: /blog/2023/100daysof-day90/
---


<style>
  [data-sample] div {
    outline: 10px solid;
    overflow: auto;
    margin: 1rem;
  }

  .sample2 div {
    container-type: inline-size;
  }

  [data-sample] h2 {
    background-color: yellow;
    border: 5px solid;
    padding: 1rem;
    margin: 1rem;
    inline-size: 80cqi;
  }
</style>

Container query units work the same as viewport units. `80cqi` equals `80svi`.

```css
  div {
    outline: 10px solid;
  }

  h2 {
    background-color: yellow;
    border: 5px solid;
    inline-size: 80cqi;
  }
```

<div data-sample="demo">
  <div>
    <h2>It's me, Mike D!</h2>
  </div>
</div>

The big difference is that if they're inside a size container, container query units aren't relative to the viewport anymore, but to the container.

```css
  div {
    outline: 10px solid;
    container-type: inline-size;
  }

  h2 {
    background-color: yellow;
    border: 5px solid;
    inline-size: 80cqi;
  }
```

 <div data-sample="demo" class="sample2">
  <div>
    <h2>It's me, Mike D!</h2>
  </div>
</div>

<table class="data">
    <caption>Container Units</caption>
    <thead>
     <tr>
      <th>unit
      </th><th>relative to 
    </th></tr></thead><tbody>
     <tr>
      <td>cqw 
      </td><td>1% of a query container’s width
     </td></tr><tr>
      <td>cqh 
      </td><td>1% of a query container’s height
     </td></tr><tr>
      <td>cqi 
      </td><td>	1% of a query container’s inline size
     </td></tr><tr>
      <td>cqb 
      </td><td>	1% of a query container’s block size
     </td></tr><tr>
      <td>cqmin 
      </td><td>The smaller value of cqi or cqb 
     </td></tr><tr>
      <td>cqmax 
      </td><td>The larger value of cqi or cqb 
   </td></tr></tbody></table>