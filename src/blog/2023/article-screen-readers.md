---
title: "the article element and screen readers"
metadescription: 'Quick screen reader and browser support tests for the article element.'
teaser: 'I wanted to know how and if common screen readers expose the `<article>` element.  

Here are my results:'
date: 2023-07-04T10:06:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_articlesr.jpg
---
<h2>Summary</h2>

<abbr title="too long, didn't read">tl;dr</abbr>: shit's complicated.</abbr>

Some screen readers don't announce articles and have no default quick nav shortcuts. Some don't announce them but treat them as landmarks. Others announce them as articles and treat them as landmarks. There's no difference whether you label them or not.

<style>
  table {
    table-layout: fixed;
    white-space: nowrap;
  }

  tbody td {
    background: green;
    color: #fff;

  }

  tbody th {
    font-weight: normal;
  }

  td.no {
    background: #bf0404;
  }

  th a:is(:link, :visited) {
    color: #fff;
  }

  th a:focus-visible {
    outline-color: currentColor;
  }
</style>

<div class="table-wrapper" aria-labelledby="form1" tabindex="0" role="region">
<table>
  <caption id="form1">article element screen reader support results</caption>
  <thead>
    <tr>
        <td></td>
        <th>NVDA</th>
        <th>Jaws</th>
        <th>Voice Over (macOS)</th>
        <th>Narrator</th>
        <th>VoiceOver (iOs)</th>
        <th>Talkback</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <th>Virtual Cursor/Swipe</th>
        <td class="no">no</td>
        <td>yes</td>
        <td>yes</td>
        <td class="no">no</td>
        <td>yes</td>
        <td class="no">no</td>
    </tr>
    <tr>
        <th>Landmark list</th>
        <td class="no">no</td>
        <td class="no">no</td>
        <td class="no">no</td>
        <td class="no">no</td>
        <td>yes</td>
        <td>yes</td>
    </tr>
    <tr>
        <th>Custom article list</th>
        <td class="no">no</td>
        <td>yes</td>
        <td>yes</td>
        <td class="no">no</td>
        <td>yes</td>
        <td class="no">no</td>
    </tr>
    <tr>
        <th>Default quick nav key</th>
        <td class="no">no</td>
        <td>yes</td>
        <td class="no">no</td>
        <td class="no">no</td>
        <td class="no">no</td>
        <td class="no">no</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Demo code</h2>

```html
<article>
  <h2>Unlabelled</h2>
</article>

<article aria-labelledby="heading">
  <h2 id="heading">Labelled by heading</h2>
</article>

<article aria-label="Labelled by attribute">
  <h2>Labelled by attribute</h2>
</article>
```

<h2>NVDA 2023.1 with Firefox 114</h2>

NVDA doesn't announce the article's role when you use the arrow keys or list it in the elements list. You can add a custom quick nav shortcut for article navigation, but I couldn't get it working.

<h2>JAWS 2023.2212.13 with Edge 114</h2>

Jaws announces labelled and unlabelled articles when you use the arrow keys or the <kbd>O</kbd> key to navigate. They're not included in the list of landmarks, but you can list all articles by pressing <kbd>Ctrl</kbd> + <kbd>Insert</kbd> + <kbd>O</kbd>.

<img src="/images/article-sr2.webp" alt="" width="1440" height="810" loading="lazy" alt="Jaws listing an unlabelled article and two labelled articles in the articles list.">

<h2>VoiceOver macOS 13.4.1 with Safari 16.5.1</h2>

VoiceOver announces labelled and unlabelled articles when you use the virtual cursor. It also adds a new list of articles to the rotor. The landmarks list in the rotor doesn't include articles.

<img src="/images/article-sr1.webp" alt="" width="1440" height="900" loading="lazy" alt="Voice Over listing an unlabelled article and two labelled articles in the rotor.">

<h2>Narrator Windows 10 with Edge 114</h2>

Narrator doesn't announce the article's role or list it in the elements list.

<h2>VoiceOver iOS 15.7.7 with Safari</h2>

VoiceOver announces articles when you select contained items or swipe. It includes articles in the landmarks list and adds a new list of articles to the rotor.

<h2>Talkback Android 13 with Chrome 114</h2>

Talkback doesn't announce articles when you select contained items or swipe, but labelled and unlabelled articles are accessible via the landmark navigation.