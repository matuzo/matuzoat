---
title: "details/summary inconsistencies"
date: 2023-04-21T08:46:54.969Z
image: articles/sm-details-summary.jpg
teaser: "Scott O'Hara wrote a [fantastic blog post about the details and summary elements](https://www.scottohara.me/blog/2022/09/12/details-summary.html) last year. He explains that there are a lot of oddities and inconsistencies, and he backs his statements with [detailed testing](https://codepen.io/scottohara/pen/aaJXYG)."
tags:
  - blog
  - posts
  - html
  - a11y
---

To better understand the extent of these oddities and inconsistencies, I did [my own testing](https://codepen.io/matuzo/pen/XWxNxyg?editors=1100) (not as detailed as Scott's), and here's what I found:


<ul>
  <li>Announcements are very different across different screen readers/browsers. It goes from little information (“show more” in VoiceOver on iOS) to too much information (“Right pointing triangle, Show more, collapsed, summary, group” in Firefox on macOs)</li>
<li>Removing or changing the triangle doesn’t seem to affect any screen reader/browser pairing except Firefox with all tested screen readers.</li>
<li>Voice Over macOS Chrome/Edge/Arc, Voice Over macOS Safari, and Talkback Android Chrome provide the most consistent experience.</li>
<li>Voice Over iOS Safari is also very consistent but in a bad way. It doesn’t announce any role or state.</li>
<li>Details only expands in Chrome, Arc, Edge when you search with <kbd>CMD</kbd>/<kbd>Ctrl</kbd> + <kbd>F</kbd> (find-in-page).</li>
<li>To remove the triangle in Safari, you must set <code>::-webkit-details-marker</code> to <code>display: none</code>. <br><code>::marker</code> or <code>list-style: none;</code> don't work.
</li>
</ul>

What should you do with this information?

I don't know, probably test with users?! I'll just quote Scott here:

> If your goal is to create an absolutely consistent disclosure widget behavior across browsers, i.e., ensuring that all `<summary>`s are exposed as expand/collapse buttons, then you’d be better off creating your own using JavaScript and the necessary ARIA attributes. You’d lose out on the find-in-page functionality that the native disclosure widget provides… but depending on the type of disclosure widget you’re creating, you may actually want that.

<style>
  .nomarker summary {
  list-style-type: none;
}

.nomarker2 summary::marker,
.nomarker2 summary::-webkit-details-marker {
  content: "";
}

.custommarker summary {
  list-style-type: square;
}

.custommarker2 summary::marker,
.custommarker2 summary::-webkit-details-marker {
  content: "🦫"
}

.custommarker3 summary::-webkit-details-marker {
  display: none;
}

.custommarker3 summary {
  list-style: none;
}

  thead th {
    white-space: nowrap;
  }

  td {
    vertical-align: top;
  }
</style>

<h2>OS/browsers/software</h2>

<ul>
  <li>macOS 13.0.1 / Windows 11 / Android 13 / iOS 15.7.5</li>
  <li>Chrome 112</li>
  <li>Firefox 112</li>
  <li>Safari 16.1 (macOS)</li>
  <li>JAWS 2023.2212.13</li>
  <li>NVDA 2023.1</li>
</ul>

<h2>Results</h2>

<h3>default</h3>

```html
<details>
  <summary>Show More</summary>
  
  <p>Here’s Johnny!</p>
</details>
```

<details>
  <summary>Show More</summary>
  
  Here’s Johnny!
</details>


<div class="table-wrapper">
<table>
  <caption>Screen reader testing with default element</caption>
  <thead>
    <tr>
      <td></td>
      <th>Voice Over macOS Chrome/Edge/arc</th>
      <th>Voice Over macOS Firefox</th>
      <th>Voice Over macOS Safari</th>
      <th>Voice Over iOS Safari</th>
      <th>Talkback Android Chrome</th>
      <th>NVDA Firefox</th>
      <th>JAWS Chrome</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th>
        Announcement on focus
      </th>
      <td>
        Show More, collapsed, disclosure triangle, group
      </td>
      <td>
        Right pointing triangle, Show more, collapsed, summary, group<br>
        or<br>
        Show more, collapsed, summary, group
      </td>
      <td>Show More, collapsed, summary, group</td>
      <td>Show More</td>
      <td>
        Collapsed, show more, disclosure triangle
      </td>
      <td>
        Filled right pointing small triangle, show more, button, collapsed
      </td>
      <td>Show more, button, collapsed</td>
    </tr>
    <tr>
      <th>
        Announcement on toggle
      </th>
      <td>
        Show More, expanded, disclosure triangle, group
      </td>
      <td>
        Show More
      </td>
      <td>Show More, expanded, summary, group</td>
      <td>Show More</td>
      <td>
        expanded
      </td>
      <td>
        expanded, filled down pointing small triangle, show more
      </td>
      <td>expanded</td>
    </tr>
  </tbody>
</table>
</div>

<h3>custom marker: <code>list-style-type: square</code></h3>

```css
summary {
  list-style-type: square;
}
```

<details class="custommarker">
  <summary>Show More</summary>
  
  Here’s Johnny!
</details>

<div class="table-wrapper">
<table>
  <caption>Screen reader testing with custom marker</caption>
  <thead>
    <tr>
      <td></td>
      <th>Voice Over macOS Chrome/Edge/arc</th>
      <th>Voice Over macOS Firefox</th>
      <th>Voice Over macOS Safari</th>
      <th>Voice Over iOS Safari</th>
      <th>Talkback Android Chrome</th>
      <th>NVDA Firefox</th>
      <th>JAWS Chrome</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th>
        Announcement on focus
      </th>
      <td>
        Show More, collapsed, disclosure triangle, group
      </td>
      <td>
        Black small square, Show more, collapsed, summary, group<br>
        or<br>
        Show more, collapsed, summary, group
      </td>
      <td>Show More, collapsed, summary, group</td>
      <td>Show More</td>
      <td>
        Collapsed, show more, disclosure triangle
      </td>
      <td>
        Show more, button, collapsed
      </td>
      <td>Show more, button, collapsed</td>
    </tr>
    <tr>
      <th>
        Announcement on toggle
      </th>
      <td>
        Show More, expanded, disclosure triangle, group
      </td>
      <td>
        /
      </td>
      <td>Show More, expanded, summary, group</td>
      <td>Show More</td>
      <td>
        expanded
      </td>
      <td>
        expanded
      </td>
      <td>expanded</td>
    </tr>
  </tbody>
</table>
</div>

<h3>custom marker: <code>::marker</code></h3>

```css
summary::marker {
  content: "🦫"
}
```

<details class="custommarker2">
  <summary>Show More</summary>
  
  Here’s Johnny!
</details>

<div class="table-wrapper">
  
<table>
  <caption>Screen reader testing with custom marker</caption>
  <thead>
    <tr>
      <td></td>
      <th>Voice Over macOS Chrome/Edge/arc</th>
      <th>Voice Over macOS Firefox</th>
      <th>Voice Over macOS Safari</th>
      <th>Voice Over iOS Safari</th>
      <th>Talkback Android Chrome</th>
      <th>NVDA Firefox</th>
      <th>JAWS Chrome</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th>
        Announcement on focus
      </th>
      <td>
        Show More, collapsed, disclosure triangle, group
      </td>
      <td>
        Beaver, Show more, collapsed, summary, group<br>
        or<br>
        Show more, collapsed, summary, group
      </td>
      <td>Show More, collapsed, summary, group</td>
      <td>Show More</td>
      <td>
        Collapsed, show more, disclosure triangle
      </td>
      <td>
        Beaver, Show more, button, collapsed
      </td>
      <td>Show more, button, collapsed</td>
    </tr>
    <tr>
      <th>
        Announcement on toggle
      </th>
      <td>
        Show More, expanded, disclosure triangle, group
      </td>
      <td>
        Beaver, Show More
      </td>
      <td>Show More, expanded, summary, group</td>
      <td>Show More</td>
      <td>
        expanded
      </td>
      <td>
        expanded
      </td>
      <td>expanded</td>
    </tr>
  </tbody>
</table>
</div>

<h3>no marker: <code>list-style-type: none;</code></h3>

```css
summary {
  list-style-type: none;
}
```

<details class="nomarker">
  <summary>Show More</summary>
  
  Here’s Johnny!
</details>

<div class="table-wrapper">
  <table>
  <caption>Screen reader testing with no marker</caption>
  <thead>
    <tr>
      <td></td>
      <th>Voice Over macOS Chrome/Edge/arc</th>
      <th>Voice Over macOS Firefox</th>
      <th>Voice Over macOS Safari</th>
      <th>Voice Over iOS Safari</th>
      <th>Talkback Android Chrome</th>
      <th>NVDA Firefox</th>
      <th>JAWS Chrome</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th>
        Announcement on focus
      </th>
      <td>
        Show More, collapsed, disclosure triangle, group
      </td>
      <td>
        Show more, collapsed, summary, group
      </td>
      <td>Show More, collapsed, summary, group</td>
      <td>Show More</td>
      <td>
        Collapsed, show more, disclosure triangle
      </td>
      <td>
        Show more, button, collapsed
      </td>
      <td>Show more, button, collapsed</td>
    </tr>
    <tr>
      <th>
        Announcement on toggle
      </th>
      <td>
        Show More, expanded, disclosure triangle, group
      </td>
      <td>
        /
      </td>
      <td>Show More, expanded, summary, group</td>
      <td>Show More</td>
      <td>
        expanded
      </td>
      <td>
        expanded
      </td>
      <td>expanded</td>
    </tr>
  </tbody>
</table>
</div>

<h3>no marker: <code>::marker content:""</code></h3>

```css
summary::marker {
  content: "";
}
```

<details class="nomarker2">
  <summary>Show More</summary>
  
  Here’s Johnny!
</details>


<div class="table-wrapper">
  <table>
  <caption>Screen reader testing with no marker</caption>
  <thead>
    <tr>
      <td></td>
      <th>Voice Over macOS Chrome/Edge/arc</th>
      <th>Voice Over macOS Firefox</th>
      <th>Voice Over macOS Safari</th>
      <th>Voice Over iOS Safari</th>
      <th>Talkback Android Chrome</th>
      <th>NVDA Firefox</th>
      <th>JAWS Chrome</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th>
        Announcement on focus
      </th>
      <td>
        Show More, collapsed, disclosure triangle, group
      </td>
      <td>
        Show more, collapsed, summary, group
      </td>
      <td>Show More, collapsed, summary, group</td>
      <td>Show More</td>
      <td>
        Collapsed, show more, disclosure triangle
      </td>
      <td>
        Show more, button, collapsed
      </td>
      <td>Show more, button, collapsed</td>
    </tr>
    <tr>
      <th>
        Announcement on toggle
      </th>
      <td>
        Show More, expanded, disclosure triangle, group
      </td>
      <td>
        /
      </td>
      <td>Show More, expanded, summary, group</td>
      <td>Show More</td>
      <td>
        expanded
      </td>
      <td>
        expanded
      </td>
      <td>expanded</td>
    </tr>
  </tbody>
</table>
</div>

<h3>Remove triangle in all browsers</h3>

```css
summary::-webkit-details-marker {
  display: none;
}

summary {
  list-style: none;
}
```

<details class="custommarker3">
  <summary>Show More</summary>
  
  Here’s Johnny!
</details>