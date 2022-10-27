---
title: 'Day 24: the backdrop-filter property'
date: 2022-10-27T09:38:54.969Z
image: articles/sm_100days-day24.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `backdrop-filter` property allows you to apply CSS filters to the area behind an element. This could be the background of an element or the backdrop of a dialog."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/PoevBej
layout: "layouts/100days.njk"
caniuse: "lab()"
reading:
  - title: "backdrop-filter on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
---
In the following example, the parent element has a background image, nothing special about it, but the inner elements all have a `backdrop-filter` applied which changes how the image beneath them is displayed.

```html
<div class="parent">
  <div class="blur">Blur</div>
  <div class="invert">Invert</div>
  <div class="hue">Hue</div>
  <div class="grayscale">Grayscale</div>
</div>
```

```css
.parent {
  background-image: url("/images/neue-donau.webp");
}

.blur {
  backdrop-filter: blur(5px);
}

.invert {
  backdrop-filter: invert(1);
}

.hue {
  backdrop-filter: hue-rotate(260deg);
}

.grayscale {
  backdrop-filter: grayscale(100%);
}
```

<style>
.parent {
  background-image: url("/images/neue-donau.webp");
}

.blur {
  backdrop-filter: blur(5px);
}

.invert {
  backdrop-filter: invert(1);
}

.hue {
  backdrop-filter: hue-rotate(260deg);
}

.grayscale {
  backdrop-filter: grayscale(100%);
}

.parent {
  max-width: 50rem;
  aspect-ratio: 500 / 330;
  height: 100%;
  background-size: cover;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  font-family: sans-serif;
}

.parent:is(:hover, :focus) > * {
  opacity: 0;
}

.inner {
  padding: 1rem;
  font-size: 2rem;
  text-shadow: 1px 1px 3px #fff;
  transition: opacity 0.3s;
}
</style>

<div class="parent" tabindex="0">
  <div class="inner blur">Blur</div>
  <div class="inner invert">Invert</div>
  <div class="inner hue">Hue</div>
  <div class="inner grayscale">Grayscale</div>
</div>

Notice how the filters don’t affect the text? Yeah, that’s the difference between `backdrop-filter` and `filter`. They both take the same values, but backdrop-filters only apply to the backdrop/background. In order for this to work the background of the element with the backdrop filter must either be fully or partially transparent.

You can also apply the filter to the backdrop of a dialog.

```css
dialog::backdrop {
  backdrop-filter: blur(5px);
}
```

<style>
  dialog::backdrop {
    backdrop-filter: blur(5px);
  }
</style>

<dialog class="dialog">
  yo!
  
  <button class="closeButton">close</button>
</dialog>

<button class="showModalButton">show modal</button>

<script>
const showModalButton = document.querySelector('.showModalButton')
const closeButton = document.querySelector('.closeButton')
const dialog = document.querySelector('.dialog')

showModalButton.addEventListener('click', e => {
  dialog.showModal()
})

closeButton.addEventListener('click', e => {
  dialog.close()
})

</script>


PS: Thanks Kilian for the pointer!