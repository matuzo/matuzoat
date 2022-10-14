---
title: 'Day 15: the :modal pseudo class'
date: 2022-10-14T09:38:54.969Z
image: articles/sm_100days-day15.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "There are two methods you can use to open a `<dialog>` element, `show()` and `showModal()`. `show()` opens a dialog on top of the rest of the content, but you can still interact with content beneath. `showModal()` opens a modal dialog with a backdrop on top of the rest of the content, and you can’t interact with the rest of the page."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/OJZOwVr
layout: "layouts/100days.njk"
caniuse: "modal"
reading:
  - title: ":modal on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/:modal
  - title: "HTMLDialogElement methods on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement#methods
---

You can use the `:modal` pseudo-class to style modal dialogs (dialogs opened via `showModal()`) differently.

<style>
  dialog {
    border: 10px solid aqua;
  }

  :modal {
    border-style: dotted;
    border-color: fuchsia;
    padding: 4rem;
  }
</style>
<dialog>
  yo!
  
  <button class="close">Close</button>
</dialog>

<button class="show">Show</button>
<button class="showModal">Show modal</button>

```css
dialog {
  border: 10px solid aqua;
}

:modal {
  border-style: dotted;
  border-color: fuchsia;
  padding: 4rem;
}
```

```html
<dialog>
  yo!
  
  <button class="close">Close</button>
</dialog>

<button class="show">Show</button>
<button class="showModal">Show modal</button>
```

```js
const show = document.querySelector('.show')
const showModal = document.querySelector('.showModal')
const close = document.querySelector('.close')
const dialog = document.querySelector('dialog')

show.addEventListener('click', e => {
  dialog.show()
})

showModal.addEventListener('click', e => {
  dialog.showModal()
})

close.addEventListener('click', e => {
  dialog.close()
})
```



<script>
const show = document.querySelector('.show')
const showModal = document.querySelector('.showModal')
const close = document.querySelector('.close')
const dialog = document.querySelector('dialog')

show.addEventListener('click', e => {
  dialog.show()
})

showModal.addEventListener('click', e => {
  dialog.showModal()
})

close.addEventListener('click', e => {
  dialog.close()
})
</script>