---
title: "50.1% empty links"
date: 2023-03-04T08:46:54.969Z
image: articles/sm_empty-links.jpg
teaser: "The new [WebAim 1 Million report](https://webaim.org/projects/million/) was recently published, and the results are sobering. Compared to the previous year, 0.5% fewer websites contained automatically detectable accessibility issues, but the total number of erroneous websites is still 96.3%."
tags:
  - blog
  - posts
  - a11y
---
The number of empty links increased by 0.4% from 49.7% to 50.1%. More than half of the websites tested contained empty links (links with no text). 
That usually happens when you link an image, but it has no alt attribute or the alt attribute has no value. 

To give you an idea of how this affects the user experience and accessibility, I tested the following empty links with screen readers.


```html
<a href="https://webaim.org/projects/million/">
  <img src="/images/screenshot-04-03-23_copy.jpg">
</a>
```

Here's what different screen readers announce using the Tab key on desktop and touch on mobile.


<table>
<caption>Linked image with no alt</caption>
<thead>
<tr>
  <th>Screen reader</th>
  <th>Browser</th>
  <th>Result</th>
</tr>
</thead>

<tbody>
<tr>
  <td>NVDA</td>
  <td>Firefox</td>
  <td><strong>million, graphic, link</strong></td>
</tr>
<tr>
  <td>JAWS</td>
  <td>Firefox</td>
  <td><strong>H T T P S colon slash slash webaim dot org slash projects slash million slash</strong></td>
</tr>
<tr>
  <td>JAWS</td>
  <td>Edge</td>
  <td><strong>images slash screenshot dash 04 dash 03 dash 23 underline copy, link, graphic</strong></td>
</tr>
<tr>
  <td>Talkback</td>
  <td>Chrome</td>
  <td><strong>screenshot the 3rd of April 23 underscore copy, link</strong></td>
</tr>
<tr>
  <td>VoiceOver macOS</td>
  <td>Safari</td>
  <td><strong>link, million </strong></td>
</tr>
<tr>
  <td>VoiceOver macOS</td>
  <td>Chrome</td>
  <td><strong>unlabelled image</strong></td>
</tr>
<tr>
  <td>VoiceOver macOS</td>
  <td>Firefox</td>
  <td><strong>link, image, million </strong></td>
</tr>
<tr>
  <td>VoiceOver iOS</td>
  <td>Safari</td>
  <td><strong>million, link</strong></td>
</tr>
</tbody>

</table>


```html
<a href="https://webaim.org/projects/million/">
  <img src="/images/screenshot-04-03-23_copy.jpg" alt="">
</a>
```

<table>
<caption>Linked image with empty alt</caption>
<thead>
<tr>
  <th>Screen reader</th>
  <th>Browser</th>
  <th>Result</th>
</tr>
</thead>

<tbody>
<tr>
  <td>NVDA</td>
  <td>Firefox</td>
  <td><strong>million, link</strong></td>
</tr>
<tr>
  <td>JAWS</td>
  <td>Firefox</td>
  <td><strong>link, H T T P S colon slash slash webaim dot org slash projects slash million slash</strong></td>
</tr>
<tr>
  <td>JAWS</td>
  <td>Edge</td>
  <td><strong>million, link</strong></td>
</tr>
<tr>
  <td>Talkback</td>
  <td>Chrome</td>
  <td><strong>million, link</strong></td>
</tr>
<tr>
  <td>VoiceOver macOS</td>
  <td>Safari</td>
  <td><strong>link, million</strong></td>
</tr>
<tr>
  <td>VoiceOver macOS</td>
  <td>Chrome</td>
  <td><strong>link, million</strong></td>
</tr>
<tr>
  <td>VoiceOver macOS</td>
  <td>Firefox</td>
  <td><strong>link, million</strong></td>
</tr>
<tr>
  <td>VoiceOver iOS</td>
  <td>Safari</td>
  <td><strong>million, link</strong></td>
</tr>
</tbody>

</table>

That sucks. At best, screen reader users can only guess what they can expect when they click an empty link. 

## How can you avoid repeating these mistakes?

Test your sites at least with an automatic testing tool like [axe](https://www.deque.com/axe/devtools/), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), or [Wave](https://wave.webaim.org/), and label linked graphics.  I’ve described several ways in [“Buttons and the Baader–Meinhof phenomenon.”](/blog/2022/button-baader/).
