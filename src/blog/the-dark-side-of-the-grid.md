---
title: The Dark Side of the Grid (Part 1)
date: 2019-01-31T04:58:47.818Z
intro: >-
  This is part 1 of 3 in a series of articles about CSS Grid layout and
  accessibility.
teaser: >-
  **CSS Grid Layout is one of the most exciting CSS specifications because of
  its flexibility, extent, and power. It makes our lives so much easier but it
  also entails new dangers regarding user experience and accessibility.**
tags:
  - css
  - grid
  - a11y
publication: Matuzo
draft: true
archive: false
---
## Preface

It has already been 2 years since the first browsers, Chromium 57 and Firefox 52, shipped CSS Grid Layout unprefixed. Many developers have experimented with it or are using it in production already. More will come as soon as support for Internet Explorer 10 and 11 becomes less important.

Grid offers many ways of building layouts and it challenges us to rethink the way we approach them. This flexibility is great for our development experience but it may come at the cost of user experience and accessibility if we don’t use its feature responsibly.

This series of articles will give you an overview of the dangerous features of the specification, or in other words, the dark side of the grid.

<div class="demo u-full-width js-demo"> 
  <div class="a-title">
    <div class="a-title-white-light"></div>
    <div class="a-title-grid"><div class="a-title-grid-inner"></div></div>
    <div class="a-title-rainbow"></div>
  </div>
</div>

## Overview

1. [What’s CSS Grid Layout? (part 1)](whats-grid)
2. [Name and theme of this article (part 1)](#name-theme)
3. [Pink Floyd Fun Fact 1 (part 1)](floyd-1)
4. [Compromising on Semantics (part 1)](semantics)
5. Pink Floyd Fun Fact 2 (part 2)
6. Changing Visual Order (part 2)
7. Cross Browser Support (part 3)
8. Pink Floyd Fun Fact 3 (part 3)
9. Whose responsibility is it? (part 3)
10. Pink Floyd Fun Fact 4 (part 3)

<hr>

## What’s CSS Grid Layout?

CSS Grid Layout is a grid-based layout system designed for two-dimensional layouts. It’s the first true layout method in CSS, properties like `float`, `display: inline-block`, `position`, and `display: table` were originally not intended for building layouts.

<div class="demo u-full-width js-demo"> 
<ul class="a-layout">
  <li class="a-layout__item"></li>
  <li class="a-layout__item"></li>
  <li class="a-layout__item"></li>
  <li class="a-layout__item"></li>
  <li class="a-layout__item"></li>
  <li class="a-layout__item"></li>
</ul>
</div>

Of course, there’s Flexbox but its strength lies in distributing available space and placing items _either_ vertically or horizontally. Flexbox loses a lot of its flexibility as soon as you’re applying `flex-wrap` and add widths to your flex items.

<figure class="figure">
<blockquote>If you are adding widths to all your flex items, you probably need grid.
</blockquote>
<footer>
<cite>
Rachel Andrew | <a href="https://www.youtube.com/watch?v=tjHOLtouElA" rel="noopener">Render 2017</a>
</cite>
</footer>
</figure>

If you’re new to CSS Grid Layout, I suggest you checkout [gridbyexample](https://gridbyexample.com/) by Rachel Andrew or [Grid Garden](http://cssgridgarden.com) before you continue reading.

## Name and theme of this article

Before we dive into the dark side of the grid, I shortly have to address the name and theme of this article. They’re based on the LP [The Dark Side of the Moon](https://en.wikipedia.org/wiki/The_Dark_Side_of_the_Moon) by [Pink Floyd](https://de.wikipedia.org/wiki/Pink_Floyd), released in 1973. 
Now you might think I’m a huge Pink Floyd fan. Well, I’m sorry to disappoint you, I’m not, I just like the design. However, I can’t borrow their design without telling you about them. Therefore, I present to you **Pink Floyd Fact #1**.

<div class="fact u-full-width">
<div class="fact__inner">
<h2>Pink Floyd Fun Fact #1</h2>
<p>The Dark Side of the Moon is, with over 45 million copies sold, the <a href="https://en.wikipedia.org/wiki/List_of_best-selling_albums" rel="noopener">fourth best-selling album worldwide</a>.Only <em>Back in Black</em> by AC/DC (50 Million), <em>Their Greatest Hits</em> (1971–1975) by Eagles (51 Million) and, <em>of course</em>, <em>Thriller</em> by Michael Jackson (66 Million) have sold more often.</p>
</div>
</div>

## Compromising on Semantics

Even before grid shipped in any browser, experts like Rachel Andrew have already feared that developers will compromise on semantics and flatten out document structures to use CSS Grid. 

<figure class="figure">
<blockquote>I believe there will be a strong temptation, especially with Grid, to flatten out document structure in order that all elements become a child of the element with the Grid declared.<br />
Making layout simple, but at what cost?
</blockquote>
<footer>
<cite>
Rachel Andrew | <a href="(https://www.rachelandrew.co.uk/archives/2015/07/28/modern-css-layout-power-and-responsibility/" rel="noopener">Modern CSS Layout, power and responsibility</a>
</cite>
</footer>
</figure>

I’ll show you why in a simple example. Let’s say we have a `section` with a heading and a list of items.

```html
<section>
  <h2>Pink Floyd discography</h2>
  
  <ul>
    <li>The Piper at the Gates of Dawn</li>
    <li>A Saucerful of Secrets</li>
    <li>More</li>
    <li>Ummagumma</li>
    <li>Atom Heart Mother</li>
    <li>Meddle</li>
    <li>Obscured by Clouds</li>
    <li>The Dark Side of the Moon</li>
  </ul>
</section>
```

The section forms a 3-column grid. The heading should span all columns and each li should fill one cell.

<div class="codepen" data-height="400" data-theme-id="6054" data-default-tab="css,result" data-user="matuzo" data-slug-hash="QYgjZe" data-prefill='{"tags":[],"stylesheets":[],"scripts":[]}'>
  <pre data-lang="html">&lt;section>
  &lt;h2>Pink Floyd discography&lt;/h2>  
  &lt;ul>
    &lt;li>The Piper at the Gates of Dawn&lt;/li>
    &lt;li>A Saucerful of Secrets&lt;/li>
    &lt;li>More&lt;/li>
    &lt;li>Ummagumma&lt;/li>
    &lt;li>Atom Heart Mother&lt;/li>
    &lt;li>Meddle&lt;/li>
    &lt;li>Obscured by Clouds&lt;/li>
    &lt;li>The Dark Side of the Moon&lt;/li>
  &lt;/ul>
&lt;/section></pre>
  <pre data-lang="css" >/* Set display to grid, add 3 even columns and add 20px spacing */
section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

/* Make the heading span all 3 columns */
h2 {
  grid-column: 1 / -1;
}

body {
  background: #000000;
  color: #ffffff;
  font-family: 'Inria Sans', sans-serif;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  outline: 1px solid #ffffff;
}
</pre>
  
</div>


Doesn’t exactly look as expected. Only direct child items of the grid container will align with the grid. In our example, the `h2` and the `ul` but we want all the `li` to fill cells in the grid.
Okay, let’s try to fix that.

### Solution #1: Flattening the document structure.

If the placement algorithm only effects direct child items, we’ll just make our `li` direct child items by removing the `ul` and transforming the `li` to `div`s to avoid invalid HTML. This is a solution, but it’s a bad solution because we’re compromising on semantics for design reasons.

```html
<section>
  <h2>Pink Floyd discography</h2>
  
  <div>The Piper at the Gates of Dawn</div>
  <div>A Saucerful of Secrets</div>
  <div>More</div>
  <div>Ummagumma</div>
  <div>Atom Heart Mother</div>
  <div>Meddle</div>
  <div>Obscured by Clouds</div>
  <div>The Dark Side of the Moon</div>
</section>
```

Flattening the document structure may have bad effects on the semantics of your document which is especially bad for screen reader users. For example, when you’re using a list, [screen readers usually announce the number of list items](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html) which helps with navigation and overview.
Also, the document might be harder to read when displayed without CSS.

<div class="info">
<h3><span class="info__heading">Wait! What?</span>
Why would someone disable CSS?</h3>

<p>It’s unlikely that users disable CSS on purpose but sometimes an error occurs or the connection is just so slow that only the HTML displays successfully. If you’ve ever been on vacation in Italy and had to use a public WIFI, you know what I’m talking about.</p>
</div>

Please don’t flatten document structures.

### Solution #2: Creating a subgrid

The arguably best solution would be to use [subgrids](https://www.w3.org/TR/css-grid-2/#subgrids). A grid item can itself be a grid container with its own column and row definitions. It can also be a grid container but defer the definitions of rows and columns to its parent grid container.

```css
ul {
  display: grid;
  grid-template-columns: subgrid;
}
```

By setting the value of `grid-template-columns` to `subgrid` on the unordered list, the list items now align with the parent grid. This is super cool!

Unfortunately, support for subgrid is so bad, it doesn’t even have a [caniuse page](https://caniuse.com/#search=subgrid). Subgrids are part of [level 2 of the CSS Grid Layout specification](https://www.w3.org/TR/css-grid-2/#subgrids) which is still a working draft.

<figure class="figure figure--full">
<img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/s_B782E7B1F35388692E5B4FD985531DE5ABBF6EAD14964927E69E4CE6006AEDE1_1547011977841_Screen_Shot_2019-01-09_at_06.32.36.png" alt="" />
<figcaption>
At the moment, subgrids aren’t a standard yet and not supported in any browser.
</figcaption>
</figure>

Use subgrids as soon as they’re available.

### Solution #3: Using display: contents

An alternative to using subgrids is a different property that has a similar effect. If you set the `display` value of an element to `contents`, it will act as if it got replaced by its child items.

```css
  ul {
    display: contents;
  }
```

In our example this causes the list items to take part in the alignment of the `sections` grid because for them the parent `ul` doesn’t exist anymore. This is exactly what we want, and it works perfectly fine but, yeah I’m sorry, there’s a _but_, Edge doesn’t support it. The lack of support per se isn’t the issue but rather why it’s not supported. There’s a bug in Chrome, Opera, and Safari that removes an element with a `display` value of `contents` from the accessibility tree [making it inaccessible to screen reader users](http://adrianroselli.com/2018/05/display-contents-is-not-a-css-reset.html). It’s like applying `display: none`, the element just doesn’t exist anymore for assistive technology.

<figure class="figure figure--full">
<img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1549211279/articles/Screen_Shot_2019-02-03_at_17.26.50.png" alt="" />
<figcaption>
Edge doesn’t support display: contents because to an accessibility bug in Chrome, Safari and Opera.
</figcaption>
</figure>

[Microsoft Edge will consider adding the feature](https://github.com/MicrosoftEdge/Status/issues/608#issuecomment-394521198) as soon as blink and webkit-based browsers fix the bug. Consider not using `contents` until then.

### Solutions #4: Nesting grids

As already mentioned, a grid item can also be a grid container. We can select the unordered list, make it span the whole width, and inherit values from the parent grid.

```css
  ul {
    grid-column: 1 / -1;
    display: inherit;
    grid-template-columns: inherit;
    grid-gap: inherit;
  }
```

Nesting grids isn’t a perfect solution and sometimes it might not work but in this simple example it’s good enough.

### Recap
The situation regarding sub-grids is anything but perfect. The `subgrid` value isn’t a standard yet, `display: contents` is buggy, and nesting grids will only work in specific use cases. If you see yourself compromising on semantics just to use CSS Grid Layout, don’t use it or try to workaround the problem until browsers fix the `display: contents` bug or ship subgrids.

This was part 1 of the dark side of the grid. In part two I’ll show you how easy it is to confuse users unintentionally, why it’s bad and how to avoid it.

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
