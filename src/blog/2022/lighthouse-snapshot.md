---
title: 'Analyzing pages in a particular state with Lighthouse'
metadescription: 'There’s a new experiment in Lighthouse called “Use Lighthouse panel with timespan and snapshot modes”.'
date: 2022-06-27T09:17:54.969Z
image: articles/sm_lighthousesnapshot.jpg
teaser: "Historically, Lighthouse has analyzed the cold pageload of a page only. Clicking the “Generate report” button reloads the page before Lighthouse runs its tests. This can be problematic when you want to run tests on parts of the UI that are only visible when the user interacts with it. For example, a fly-out navigation, a modal window, or the content in a disclosure widget."
tags:
  - blog
  - posts
  - html
---

That has changed with Lighthouse v10. A new <a href="https://developer.chrome.com/blog/new-in-devtools-103/#lighthouse">experimental feature in Chrome DevTools</a> allows us now to analyze the page in a particular state. Here’s an example:

<a href="/images/lh-snapshot1.webp">
<picture>
  <source srcset="/images/lh-snapshot1.avif" type="image/avif"></source>
  <img src="/images/lh-snapshot1.webp" loading="lazy" alt="Browser screenshot. A button with the label “show”">
</picture>
</a>

When you click the “Show” button in this [simple disclosure widget](https://cdpn.io/pen/debug/mdXNMzQ), an image appears. 

<a href="/images/lh-snapshot2.webp">
<picture>
  <source srcset="/images/lh-snapshot2.avif" type="image/avif"></source>
  <img src="/images/lh-snapshot2.webp" loading="lazy" alt="Button and a random image visible below it. Browser screenshot.">
</picture>
</a>


The image has no `alt` attribute and Lighthouse should report an error, but it reloads the page, and the image is gone when it runs the tests, because the state of the page doesn't persist.

<a href="/images/lh-snapshot3.webp">
<picture>
  <source srcset="/images/lh-snapshot3.avif" type="image/avif"></source>
  <img src="/images/lh-snapshot3.webp" loading="lazy" alt="Page after the reload with Lighthouse open. Just the button visible and a score of 100 in the accessibility category">
</picture>
</a>

Starting with Lighthouse v10, you can also run tests on snapshots of a page. First, you have to enable this feature because it’s still an experiment: Open Chrome DevTools, press <kbd>F1</kbd>, click “Experiments”, and tick the checkbox “Use Lighthouse panel with timespan and snapshot modes”.

<a href="/images/lh-snapshot4.webp">
<picture>
  <source srcset="/images/lh-snapshot4.avif" type="image/avif"></source>
  <img src="/images/lh-snapshot4.webp" loading="lazy" alt="The experiments page in Chrome Dev Tools with the timespan and snapshot modes option highlighted.">
</picture>
</a>

Now Reload Chrome DevTools and open Lighthouse again. There’s a new column “Mode”. Select “snapshot” and run another Lighthouse test.

<a href="/images/lh-snapshot5.webp">
<picture>
  <source srcset="/images/lh-snapshot5.avif" type="image/avif"></source>
  <img src="/images/lh-snapshot5.webp" loading="lazy" alt="Button and image on the left hand side. Lighthouse panel in Dev Tools with the new options on the right">
</picture>
</a>

Lighthouse doesn’t reload the page, but it checks it as it is in its current state. Instead of a score, it now shows how many tests of the total number of applicable tests the page has passed.

<a href="/images/lh-snapshot6.webp">
<picture>
  <source srcset="/images/lh-snapshot6.avif" type="image/avif"></source>
  <img src="/images/lh-snapshot6.webp" loading="lazy" alt="Lighthouse, after it ran in snapshot mode, showing that 9 of 10 tests have passed. Below it reports that the image is missing an alt attribute".>
</picture>
</a>

This is a really useful addition to Lighthouse I always wanted to have. It’s not just useful for accessibility, but for all categories. Thanks a lot to <a href="https://csswizardry.com">Harry</a> for drawing my attention to this feature in his course <a href="https://csswizardry.gumroad.com/l/perfect-devtools">“Setting up DevTools for Performance Testing”</a>.