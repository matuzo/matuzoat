---
title: You can style the file selector button of file upload elements.
link: https://codepen.io/matuzo/pen/MWqgmYq?editors=1100
date: 2023-02-13T17:45:34.386Z
---

```html
<label for="upload">Select file</label><br>
<input type="file" id="upload">
``` 

```css
[type="file"]::file-selector-button {
  background-color: hotpink;
  padding: 0.5rem 1rem;
  border: 2px solid fuchsia;
  margin-block-end: 1rem;
  display: block;
  border-radius: 3px;
}

[type="file"]::file-selector-button:hover {
  background-color: aqua;
}
``` 