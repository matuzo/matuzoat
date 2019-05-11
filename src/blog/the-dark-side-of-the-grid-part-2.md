---
title: The Dark Side of the Grid (Part 2)
metadescription: >-
  CSS Grid Layout is one of the most exciting new CSS specifications but it also
  creates new dangers regarding accessibility and UX.
date: 2019-05-11T15:44:43.040Z
intro: >-
  This is part 2 of 3 in a series of articles about CSS Grid layout and
  accessibility.
teaser: >-
  In [part 1](/blog/the-dark-side-of-the-grid/) I addressed the issue with
  flattening document structures. Before we talk about the next topic, changing
  visual order, let me enlighten you with more Pink Floyd wisdom.
tags:
  - css
  - grid
  - a11y
publication: Matuzo
css: dark-grid
draft: true
archive: false
---
<div class="fact lazy u-full-width">
<div class="fact__inner">
<h2 id="floyd-fact-1" class="fact__heading">Pink Floyd Fun Fact #2</h2>
<p>In 1975 Pink Floyd helped to finance the movie <cite>Monty Python and the Holy Grail</cite> by the comedy group Monty Python. Some other investors were Led Zeppelin and Genesis.</p>
</div>
</div>

## Preface

It has already been two years since the first browsers, Chromium 57 and Firefox 52, shipped CSS Grid Layout un-prefixed. Many developers have experimented with it or are using it in production already. More will come as soon as support for Internet Explorer 10 and 11 becomes less important.\
Grid offers many ways of building layouts and it challenges us to rethink the way we approach them. This flexibility is great for our development experience, but it may come at the cost of user experience and accessibility if we don’t use it responsibly.

This series of articles will give you an overview of potential implementation pitfalls, or in other words, the dark side of the grid.
