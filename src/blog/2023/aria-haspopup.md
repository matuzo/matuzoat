---
title: "aria-haspopup and screen readers"
metadescription: 'Screen reader and browser support tests for the aria-haspopup attribute.'
teaser: 'I read Steve Faulkners [“hasPopup hasPoop”](https://html5accessibility.com/stuff/2021/02/02/haspopup-haspoop/) where he mentions differences in what screen readers announce when dealing with the `aria-haspopup` attribute. I wanted to know how that manifests used on a button.'
date: 2023-08-17T10:40:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_haspopupsr.jpg
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

  td.kinda {
    background: #bf8504;
  }

  th a:is(:link, :visited) {
    color: #fff;
  }

  th a:focus-visible {
    outline-color: currentColor;
  }
</style>

<h2>Summary</h2>

The situation isn't too bad because all screen readers and browsers, except Narrator in Firefox and Chrome, at least support the attribute. Talback and NVDA don't support the _grid_, _listbox_, and _tree_ values. NVDA also doesn't support _dialog_. Other than that, it works great. 

I noticed some interesting details:

* VoiceOver with Safari doesn't announce the `aria-expanded` attribute in combination with `aria-haspopup` on macOS and iOs.
* VoiceOver on MacOS with Firefox announces `aria-haspopup="true"` differently than `aria-haspopup="menu"`: _Settings, menu button, group_ for `true` and _Settings, menu pop-up, button_ for `menu`.
* Talkback with Chrome doesn't support _grid_, _listbox_, and _tree_.
* Jaws adds specific instructions for `true` and `menu`: “Press Space to activate the menu. Then navigate with arrow keys”, and for `listbox`, `tree`, and `grid`: _“To activate press Enter”_.
* Jaws doesn't announce the `aria-expanded` attribute initially in all three browsers, but it does announce it on activation.
* NVDA doesn't support _dialogue_, _grid_, _listbox_, and _tree_.
* NVDA with Firefox announces `aria-haspopup="true"` differently than `aria-haspopup="menu"`: _Settings, menu button, subMenu_ for `true` and _Settings, button, subMenu_ for `menu`.
* NVDA with Chrome/Edge announces `aria-haspopup="dialog"` differently than `aria-haspopup="grid|tree|listbox"`: _Settings, button, subMenu_ (dialog) and _Settings, menu button, subMenu_ (grid|tree|listbox).
* Narrator announces “collapsed” on `aria-haspopup="true|menu"` even when `aria-expanded` isn't present.
* Narrator with Firefox doesn't supprt the attribute.
* Narrator with Chrome announces “menu item” instead of “menu button“, except for `aria-haspopup="dialog"` where it's just “button”.


<h2>Software/OS/browser</h2>

I tested using the <kbd>Tab</kbd> key only and I've used this [CodePen](https://codepen.io/matuzo/debug/mdabQpa).

<ul>
  <li>VoiceOver iOS 15.7.7 with Safari</li>
  <li>Talkback Android 13 with Chrome 116</li>
  <li>VoiceOver macOS 13.4.1 with Safari 16.5.2</li>
  <li>VoiceOver macOS 13.4.1 with Firefox 116</li>
  <li>VoiceOver macOS 13.4.1 with Chrome 116</li>
  <li>JAWS 2023.2307.37 with Edge 116, Chrome 116, and Firefox 116</li>
  <li>NVDA 2023.1 with Firefox 116</li>
  <li>NVDA 2023.1 with Chrome 116 and Edge 116</li>
  <li>Narrator Windows 10 with Firefox, Chrome, and Edge 116</li>
</ul>


<h2>form role</h2>

<div class="table-wrapper" aria-labelledby="form1" tabindex="0" role="region">
<table>
  <caption id="form1">form role test results</caption>
  <thead>
    <tr>
        <td></td>
        <th>VoiceOver (iOs)</th>
        <th>Talkback</th>
        <th>Voice Over Safari (macOS)</th>
        <th>Voice Over Firefox (macOS)</th>
        <th>Voice Over Chrome (macOS)</th>
        <th>Jaws</th>
        <th>NVDA (Firefox)</th>
        <th>NVDA (Chrome, Edge)</th>
        <th>Narrator (Edge)</th>
        <th>Narrator (Firefox)</th>
        <th>Narrator (Chrome)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <th><a href="#demo1">aria-haspopup="true"</a></th>
        <td>Settings, pop-up button, menu pop-up</td>
        <td>Settings, menu pop-up button</td>
        <td>Settings, menu pop-up, button</td>
        <td class="kinda">Settings, menu button, group</td>
        <td>Settings, menu pop-up, button</td>
        <td>Settings, button, menu</td>
        <td class="kinda">Settings, menu button, subMenu</td>
        <td>Settings, menu button, subMenu</td>
        <td class="kinda">Settings, button, collapsed, has pop-up</td>
        <td class="kinda">Settings, menu item</td>
        <td class="kinda">Settings, menu item</td>
    </tr>
    <tr>
        <th><a href="#demo2">aria-haspopup="menu"</a></th>
        <td>Settings, pop-up button, menu pop-up</td>
        <td>Settings, menu pop-up button</td>
        <td>Settings, menu pop-up, button</td>
        <td>Settings, menu pop-up, button</td>
        <td>Settings, menu pop-up, button</td>
        <td>Settings, button, menu</td>
        <td>Settings, button, subMenu</td>
        <td>Settings, menu button, subMenu</td>
        <td class="kinda">Settings, button, collapsed, has pop-up</td>
        <td class="no">Settings, button</td>
        <td class="kinda">Settings, menu item</td>
    </tr>
    <tr>
        <th><a href="#demo3">aria-haspopup="menu"<br>+ aria-expanded="false"</a></th>
        <td class="kinda">Settings, pop-up button, menu pop-up</td>
        <td>Collapsed, Settings, menu pop-up button</td>
        <td class="kinda">Settings, menu pop-up, button</td>
        <td>Settings, menu pop-up collapsed, button</td>
        <td>Settings, menu pop-up collapsed, button</td>
        <td class="kinda">Settings, button, menu</td>
        <td>Settings, button collapsed, subMenu
        <td>Settings, menu button collapsed, subMenu</td>
        <td>Settings, button, collapsed, has pop-up</td>
        <td class="no">Settings, button, collapsed</td>
        <td class="kinda">Settings, menu item, collapsed</td>
    </tr>
    <tr>
        <th><a href="#demo4">aria-haspopup="dialog"</a></th>
        <td>Settings, pop-up button, dialogue pop-up</td>
        <td>Settings, dialogue pop-up button</td>
        <td>Settings, dialogue pop-up, button</td>
        <td>Settings, dialogue pop-up, button</td>
        <td>Settings, dialogue pop-up, button</td>
        <td>Settings, button has pop-up dialogue</td>
        <td class="kinda">Settings, button, subMenu</td>
        <td class="kinda">Settings, button, subMenu</td>
        <td class="kinda">Settings, button, has pop-up</td>
        <td class="no">Settings, button</td>
        <td class="no">Settings, button</td>
    </tr>
    <tr>
        <th><a href="#demo5">aria-haspopup="grid"</a></th>
        <td>Settings, pop-up button, grid pop-up</td>
        <td class="kinda">Settings, pop-up button</td>
        <td>Settings, grid pop-up, button</td>
        <td>Settings, grid pop-up, button</td>
        <td>Settings, grid pop-up, button</td>
        <td>Settings, button has pop-up grid</td>
        <td class="kinda">Settings, button, subMenu</td>
        <td class="kinda">Settings, menu button, subMenu</td>
        <td class="kinda">Settings, button, has pop-up</td>
        <td class="no">Settings, button</td>
        <td class="kinda">Settings, menu item</td>
    </tr>
    <tr>
        <th><a href="#demo6">aria-haspopup="listbox"</a></th>
        <td>Settings, pop-up button, list box pop-up</td>
        <td class="kinda">Settings, pop-up button</td>
        <td>Settings, list box pop-up, button</td>
        <td>Settings, list box pop-up, button</td>
        <td>Settings, list box pop-up, button</td>
        <td>Settings, button has pop-up list box</td>
        <td class="kinda">Settings, button, subMenu</td>
        <td class="kinda">Settings, menu button, subMenu</td>
        <td class="kinda">Settings, button, has pop-up</td>
        <td class="no">Settings, button</td>
        <td class="kinda">Settings, menu item</td>
    </tr>
    <tr>
        <th><a href="#demo7">aria-haspopup="tree"</a></th>
        <td>Settings, pop-up button, tree pop-up</td>
        <td class="kinda">Settings, pop-up button</td>
        <td>Settings, tree pop-up, button</td>
        <td>Settings, tree pop-up, button</td>
        <td>Settings, tree pop-up, button</td>
        <td>Settings, button has pop-up tree</td>
        <td class="kinda">Settings, button, subMenu</td>
        <td class="kinda">Settings, menu button, subMenu</td>
        <td class="kinda">Settings, button, has pop-up</td>
        <td class="no">Settings, button</td>
        <td class="kinda">Settings, menu item</td>
    </tr>
  </tbody>

</table>
</div>

<h3 id="demo1">aria-haspopup="true"</h3>

```html
<button class="toggle" aria-haspopup="true">
    Settings
</button>
```

<h3 id="demo2">aria-haspopup="menu"</h3>

```html
<button class="toggle" aria-haspopup="menu">
    Settings
</button>
```

<h3 id="demo3">aria-haspopup="menu" + aria-expanded="false"</h3>

```html
<button class="toggle" aria-haspopup="menu" aria-expanded="false">
    Settings
</button>
```

<h3 id="demo4">aria-haspopup="dialog"</h3>

```html
<button class="toggle" aria-haspopup="dialog">
    Settings
</button>
```

<h3 id="demo5">aria-haspopup="grid"</h3>

```html
<button class="toggle" aria-haspopup="grid">
    Settings
</button>
```

<h3 id="demo6">aria-haspopup="listbox"</h3>

```html
<button class="toggle" aria-haspopup="listbox">
    Settings
</button>
```

<h3 id="demo7">aria-haspopup="tree"</h3>

```html
<button class="toggle" aria-haspopup="tree">
    Settings
</button>
```
