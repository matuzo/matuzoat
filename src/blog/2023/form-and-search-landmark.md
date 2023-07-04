---
title: "form and search landmarks"
metadescription: 'Quick screen reader and browser support tests for the search and form ARIA roles.'
teaser: 'I wanted to know how well common screen readers and browsers support `search` and `form` [landmarks](https://www.htmhell.dev/tips/landmarks/). Here are my results:'
date: 2023-06-28T11:19:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_formsearchlandmarks.jpg
---

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
  /*  position: sticky;
    left: 0;*/
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

<h2>Software/OS/browser</h2>

<ul>
  <li>NVDA 2023.1 with Firefox 114</li>
  <li>VoiceOver macOS 13.4.1 with Safari 16.5.1</li>
  <li>Talkback Android 13 with Chrome 114</li>
  <li>JAWS 2023.2212.13 with Edge 114</li>
  <li>Narrator Windows 10 with Edge 114</li>
  <li>VoiceOver iOS 15.7.7 with Safari</li>
</ul>

I tested using the following shorcuts, commands and gestures.

* <kbd>D</kbd> key + Elements list in NVDA
* Rotor in VO iOS
* Rotor + single key quick nav in VO macOS
* Swiping + landmark navigation in Talkback
* <kbd>R</kbd> key + landmarks list (<kbd>Insert</kbd> + <kbd>Ctrl</kbd> + <kbd>R</kbd> in JAWS
* <kbd>D</kbd> key + Landmarks List in Narrator

<h2>form role</h2>

**Summary:** You can use it, but forms won't be exposed as landmarks on VoiceOver and Talkback. To get the best results label the form.

<div class="table-wrapper" aria-labelledby="form1" tabindex="0" role="region">
<table>
  <caption id="form1">form role test results</caption>
  <thead>
    <tr>
        <td></td>
        <th>NVDA</th>
        <th>Voice Over (macOS)</th>
        <th>Talkback</th>
        <th>Jaws</th>
        <th>Narrator</th>
        <th>VoiceOver (iOs)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <th><a href="#form1">no role and no label</a></th>
        <td class="no">no landmark</td>
        <td class="no">no landmark</td>
        <td class="no" aria-describedby="sidenote">no landmark *</td>
        <td class="no">no landmark</td>
        <td class="no">no landmark</td>
        <td class="no">no landmark</td>
    </tr>
    <tr>
        <th><a href="#form2">no role, labelled by heading</a></th>
        <td>form (labelled)</td>
        <td class="no">no landmark</td>
        <td class="no" aria-describedby="sidenote">no landmark *</td>
        <td>form (labelled)</td>
        <td>form landmark (labelled)</td>
        <td class="no">no landmark</td>
    </tr>
    <tr>
        <th><a href="#form3">role but no label</a></th>
        <td>form (unlabelled)</td>
        <td class="no">no landmark</td>
        <td class="no" aria-describedby="sidenote">no landmark *</td>
        <td class="no">no landmark</td>
        <td>form landmark (unlabelled)</td>
        <td class="no">no landmark</td>
    </tr>
    <tr>
        <th><a href="#form4">role, labelled by heading</a></th>
        <td>form (labelled)</td>
        <td class="no">no landmark</td>
        <td class="no" aria-describedby="sidenote">no landmark *</td>
        <td>form (labelled)</td>
        <td>form landmark (labelled)</td>
        <td class="no">no landmark</td>
    </tr>
    <tr>
        <th><a href="#form5">no role, labelled by legend</a></th>
        <td>form (labelled)</td>
        <td class="no">no landmark</td>
        <td class="no" aria-describedby="sidenote">no landmark *</td>
        <td aria-describedby="sidenote2">group (labelled)  **</td>
        <td>form landmark (labelled)</td>
        <td class="no">no landmark</td>
    </tr>
    <tr>
        <th><a href="#form6">role, labelled by legend</a></th>
        <td>form (labelled)</td>
        <td class="no">no landmark</td>
        <td class="no" aria-describedby="sidenote">no landmark *</td>
        <td aria-describedby="sidenote2">group (labelled) **</td>
        <td>form landmark (labelled)</td>
        <td class="no">no landmark</td>
    </tr>
  </tbody>

</table>
</div>

\* <span id="sidenote">not announced as a “form” landmark, but it's accessible via landmark navigation</span>  
\*\* <span id="sidenote">listed as “form” landmark in the landmarks list</span>

<h3 id="form1">form with no role and no label</h3>

```html
<form>
  <h3>example 1</h3>
  
  <label>
    XY
    <input type="text">
  </label>
</form>
```

<h3 id="form2">form with no role, labelled by heading</h3>

```html
<h3 id="form2">example2</h3>
<form aria-labelledby="form2">
  <label>
    XY
    <input type="text">
  </label>
</form>
```

<h3 id="form3">form with form role and no label</h3>

```html
<form role="form">
  <label>
    XY
    <input type="text">
  </label>
</form>
```

<h3 id="form4">form with form role labelled by heading</h3>

```html
<h3 id="form4">example 4</h3>
<form role="form" aria-labelledby="form4">
  <label>
    XY
    <input type="text">
  </label>
</form>
```

<h3  id="form5">form with no role labelled by legend</h3>

```html
<form aria-labelledby="form5">
  <fieldset>
    <legend id="form5">example 5</legend>
    
    <label>
      XY
      <input type="text">
    </label>
  </fieldset>
</form>
```

<h3  id="form6">form with form role labelled by legend</h3>

```html
<form role="form" aria-labelledby="form6">
  <fieldset>
    <legend id="form6">example 6</legend>
    
    <label>
      XY
      <input type="text">
    </label>
  </fieldset>
</form>
```

<h2>search role</h2>

**Summary:** Great overall support for the `search` role. The `<search>` element has no support yet. You can use the search element in combination with the `role` attribute.

<div class="table-wrapper" aria-labelledby="form2" tabindex="0" role="region">
<table>
  <caption id="form2">search role test results</caption>
  <thead>
    <tr>
        <td></td>
        <th>NVDA</th>
        <th>Voice Over (macOS)</th>
        <th>Talkback</th>
        <th>Jaws</th>
        <th>Narrator</th>
        <th>VoiceOver (iOs)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <th><a href="#search1">role but no label</a></th>
        <td>search landmark (unlabelled)</td>
        <td>search (unlabelled)</td>
        <td>search (unlabelled)</td>
        <td>search region (unlabelled)</td>
        <td>search landmark (unlabelled)</td>
        <td>search landmark (unlabelled)</td>
    </tr>
    <tr>
        <th><a href="#search2">role, labelled by heading</a></th>
        <td>search landmark (labelled)</td>
        <td>search (labelled)</td>
        <td>search (labelled)</td>
        <td>search region (labelled)</td>
        <td>search landmark (labelled)</td>
        <td>search landmark (labelled)</td>
    </tr>
    <tr>
        <th><a href="#search3">search element with no label</a></th>
        <td class="no">no landmark</td>
        <td class="no">no landmark</td>
        <td class="no" aria-describedby="sidenote">no landmark *</td>
        <td class="no">no landmark</td>
        <td class="no">no landmark</td>
        <td class="no">no landmark</td>
    </tr>
    <tr>
        <th><a href="#search4">search element with role but no label</a></th>
        <td>search landmark (unlabelled)</td>
        <td>search (unlabelled)</td>
        <td>search (unlabelled)</td>
        <td>search region (unlabelled)</td>
        <td>search landmark (unlabelled)</td>
        <td>search landmark (unlabelled)</td>
    </tr>
    <tr>
        <th><a href="#search5">search element with role, labelled by heading</a></th>
        <td>search landmark (labelled)</td>
        <td>search (labelled)</td>
        <td>search (labelled)</td>
        <td>search region (labelled)</td>
        <td>search landmark (labelled)</td>
        <td>search landmark (labelled)</td>
    </tr>
  </tbody>

</table>
</div>


<h3 id="search1">form with search role and no label</h3>

```html
<form role="search">
  <label>
    XY
    <input type="text">
  </label>
</form>
```

<h3 id="search2">form with search role labelled by heading</h3>

```html
<h3 id="form8">example 8</h3>
<form role="search" aria-labelledby="form8">
  <label>
    XY
    <input type="text">
  </label>
</form>
```

<h3 id="search3">search element with no label</h3>

```html
<search>
  <form>
    <label>
      XY
      <input type="text">
    </label>
  </form>
</search>
```
  
<h3 id="search4">search element with search role and no label</h3>

```html
<search role="search">
  <form>
    <label>
      XY
      <input type="text">
    </label>
  </form>
</search>
```

<h3 id="search5">search element with search role labelled by heading</h3>

```html
 <search role="search" aria-labelledby="form11">
  <h3 id="form11">example 11</h3>
  <form>
    <label>
      XY
      <input type="text">
    </label>
  </form>
</search>
```