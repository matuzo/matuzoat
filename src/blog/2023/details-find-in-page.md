---
title: "the details element and in-page search"
metadescription: 'A quick note about the details element and in-page search.'
teaser: 'An important factor in terms of UX and accessibility for deciding whether the `<details>` element is the right solution for a problem is the find-in-page behaviour.'
date: 2023-06-30T09:00:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_detailssearch.jpg
---

In Chromium-based browsers, the details element automatically opens when it contains a string the user searches for.
If Safari and Firefox, it has to be opened for the find-in-page feature to find the string.

<img src="/images/details-find-in-page.webp" width="1000" height="563" alt="Comparison of Chrome (left) and Firefox. Search for the term 'cook' shows two results in Chrome, details element opened by the browser. Firefox only shows one result, details element closed.">

You can try it yourself in this [demo](https://codepen.io/matuzo/debug/yLQbVYN).

I often hear the question, “Can I use the details element for page navigation?”. My answer is always “No” for two main reasons:

1. You probably don’t want your navigation to open randomly only because a user searched for a term on the page.
2. There are still a lot of [browser inconsistencies](/blog/2023/details-summary/), and you want such an important part as the navigation for your site to work consistently and reliably.

You can find more examples and details in Adrian Roselli's [“Details / Summary Are Not [insert control here]”](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html).