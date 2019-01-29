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

<div class="demo js-demo"> 
  <div class="a-title">
    <div class="a-title-white-light"></div>
    <div class="a-title-grid"><div class="a-title-grid-inner"></div></div>
    <div class="a-title-rainbow"></div>
  </div>
</div>

## Overview

* [What’s CSS Grid Layout? (part 1)](whats-grid)
* [Name and theme of this article (part 1)](#name-theme)
* [Pink Floyd Fun Fact 1 (part 1)](floyd-1)
* [Compromising on Semantics (part 1)](semantics)
* Pink Floyd Fun Fact 2 (part 2)
* Changing Visual Order (part 2)
* Cross Browser Support (part 3)
* Pink Floyd Fun Fact 3 (part 3)
* Whose responsibility is it? (part 3)
* Pink Floyd Fun Fact 4 (part 3)

## What’s CSS Grid Layout?

CSS Grid Layout is a grid-based layout system designed for two-dimensional layouts. It’s the first true layout method in CSS, properties like `float`, `display: inline-block`, `position`, and `display: table` were originally not intended for building layouts.
