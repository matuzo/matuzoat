---
title: 'Day 17: the :picture-in-picture pseudo-class'
date: 2022-10-18T09:38:54.969Z
image: articles/sm_100days-day17.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use the `:picture-in-picture` pseudo-class to style an element, usually a `<video>`, which is currently in picture-in-picture mode (PIP)."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/xxjyrMQ
layout: "layouts/100days.njk"
caniuse: "has()"
reading:
  - title: ":picture-in-picture on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/:picture-in-picture
  - title: "Filed issue in the browser-compat-data GitHub repository"
    url: https://github.com/mdn/browser-compat-data/issues/17972
---
Clicking the following button puts the video in picture-in-picture mode in supporting browsers (Chrome, Edge, Safari, Opera). Firefox doesn't support the API, but you can right-click the video and select “Watch in Picture-in-Picture“.

<button>Toggle PIP</button>

<video src="/images/workshop_promo.mp4" controls>
  <track default kind="captions" srclang="en" src="/images/workshop_promo.vtt" label="English">
  <track default kind="subtitles" srclang="de" src="/images/workshop_promo_de.vtt" label="Deutsch">
    Sorry, your browser doesn't support embedded videos.
</video>

<style>
  :picture-in-picture {
    opacity: 0.3;
    filter: blur(5px);
  }
</style>

When the video is playing in PIP mode, the placeholder for the video switches to the `:picture-in-picture` state. Contrary to the information in the [support table on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:picture-in-picture#browser_compatibility), none of the browsers, except for Safari, supports the pseudo-class. At least, according to my tests.

```css
:picture-in-picture {
  opacity: 0.3;
  filter: blur(5px);
}
```



<script>
  const button = document.querySelector('button')
  const video = document.querySelector('video')

  button.addEventListener('click', () => {
    togglePictureInPicture()
  })

  function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      video.requestPictureInPicture();
    }
  }
</script>

Here's how the video placeholder, which by default is not blurred and has a black background color, looks like in Safari.

<a href="/images/100days-17.jpg">
  <img src="/images/100days-17.jpg" alt="Video playing in the bottom right corner. The placeholder for the video has 50% opacity and is a bit blurred" loading="lazy">
</a>