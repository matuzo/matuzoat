---
title: Improving the keyboard accessibility of Embedded CodePens
metadescription: >-
  Improving the keyboard accessibility of CodePen Embeds by adding custom focus
  styles and in-page skip links.
date: 2019-03-07T18:58:49.130Z
image: articles/codepensm.jpg
intro: ''
teaser: >-
  I'm a [huge fan](https://xkcd.com/1378/) of [CodePen](https://codepen.io/)
  (No, they didn't pay me to write this). I'm using it for prototyping,
  experimenting, sharing code, and in my latest blog post, [The Dark Side of the
  Grid](https://www.matuzo.at/blog/the-dark-side-of-the-grid/), I'm also making
  use of their [Embedded Pens](https://codepen.io/embeds/).


  CodePen allows you to customize syntax highlighting, and background and text
  colors of UI elements in Embedded Pens.

  As a PRO user, I can also add custom CSS, which gives me the ability to
  improve Pens not just visually but in terms of accessibility.
tags:
  - css
  - a11y
  - codepen
publication: Matuzo
css: codepen
draft: false
archive: false
---
<figure class="figure ">
  <span class="content__image-wrapper">
     <img class="content__image" src="https://res.cloudinary.com/dp3mem7or/image/upload/v1551942694/articles/s_4A526A782EC430ED0BB5AD619387A9B6FCCD655511B65196DD333E88F585466C_1550745903247_Screen_Shot_2019-02-12_at_06.40.12.png" alt="The Embed Theme Builder with several options to change the look and feel of embedded Pens.">
  </span>

  <figcaption>CodePen Embed Theme Builder</figcaption>
</figure>

## Accessibility wins

Before I tell you where I see room for improvement, I want to highlight what they did well.

* You can customize colors and make sure that [contrast ratios are high enough](https://webaim.org/resources/contrastchecker/). 
* There's a click-to-load option. Pens can be in a preview state where they need to be clicked to loaded, which is good for performance.
* All buttons and links in Pens are HTML `<button>` and `<a>` elements with actual text (What a time we live in that this makes me happy).
* Embedded Pens are `iframe`s. There's a `title` attribute on each `iframe` with the title of the Pen as a value. This is important because screen readers announce this value when the `iframe` is focussed. If the attribute is omitted, VoiceOver for example, falls back to the `name` attribute. This can be annoying, especially if the value of the `name` is a long hash.

<figure class="figure">
  <div class="content__video-wrapper">
    <div class="video-wrapper">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/x0OF9-4ABDQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="iframe title attribute demo"></iframe>
    </div>
  </div>

  <figcaption>The CodePen is named “Buttons demo”. VoiceOver annouces the name because it’s the value of the <code>title</code> attribute. It falls back to the <code>name</code> attribute if the <code>title</code> is omitted.</figcaption>
</figure>

## Accessibility improvements

[I use the keyboard a lot](https://www.24a11y.com/2018/i-threw-away-my-mouse/), even on the web, and I want to make sure that other keyboard users get the best possible experience on my website.

### Focus styling

Depending on the colors in a CodePen theme and the browser used, focus styles are more or less visible. To make sure that focusable elements are sufficiently highlighted all the time, I added these lines to my custom CSS file:

```css
button:focus,
a:focus {
  /* Highlighting on focus */
  outline: 5px solid #f23c50;
  outline-offset: 2px;
  /* Prevent items from overlapping the outline */
  transform: rotate(0);
}
```

<figure class="figure">
  <span class="content__image-wrapper">
     <img class="content__image" src="https://res.cloudinary.com/dp3mem7or/image/upload/v1551942659/articles/Screen_Shot_2019-02-22_at_07.09.44.png" alt="Embedded Pen with HTML on the left side and a preview on the right side. Multiple buttons with a single letter each form the sentence 'I love buttons'.">
  </span>

  <figcaption>The <code>outline</code> property highlights the “CSS” button on focus.</figcaption>
</figure>

<div class="info">
<h4><span class="info__label">Wait! What?</span><span class="info__heading">Why did you add <code>transform: rotate(0);</code>?</a></h4>
<p>To make sure that other items don't overlap the outline of the focused item, I create a new <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context" rel="noopener">stacking context</a> on focus by applying the <code>transform</code> property with a value that doesn't change anything else visually. <code>transform</code> is just one of <a href="https://codepen.io/matuzo/pen/aERqyg" rel="noopener">many other properties that create a new stacking context</a>.</p></div>

As part of my testing, I discovered that in Firefox on macOS 10.13.6 a `pre` element within the `iframe` receives focus as well. That's why added the following lines.

```css
pre:focus {
  /* Highlighting on focus */
  outline: 5px solid #f23c50;
  /* The negative value insets the outline */
  outline-offset: -5px;
  /* Fallback for browsers that don't support outline-offset */
  border: 5px solid #f23c50; 
}

@supports(outline-offset: -5px) {
  pre:focus {
    /* Removes the border in browsers that support outline-offset */
    border: none;
  }
}
```

**Note:** I’m setting the `outline` property to a negative value because otherwise the outline wouldn’t be visible due to a `overflow: hidden` rule on one of the `pre` elements parents.

This is how the Pen looks like in Firefox:

<figure class="figure">
  <div class="content__video-wrapper">
    <div class="video-wrapper">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/EDdACjbi64M?rel=0" title="Embedded CodePen with custom focus styling" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>

  <figcaption>All focusable elements are now clearly highlighted.</figcaption>
</figure>

### Skip links

Let's say, you're not interested in the embedded Pen. As a mouse user, you just keep scrolling. As a keyboard user, you have to press <kbd>Tab</kbd> at least 9 times until you get to the next focusable element. Or worse, you get trapped in the Pen. This happens if the Pen is editable. You can pass the buttons in the top bar but the journey ends as soon as you get to the `pre` element where the code is displayed. Once you're in there, there's no way of getting out. 

<figure class="figure">
  <div class="content__video-wrapper">
    <div class="video-wrapper">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/3UK70AcUb84?rel=0" title="Trapped in an embedded iframe" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>

  <figcaption>There's no way of escaping the code area in an editable Pen.</figcaption>
</figure>

We can't fix that issue but we can give users more options. You might have heard of skip links. If not, please read [Skip links are important](https://knowbility.org/blog/2019/skip-links/) by [Nicolas Steenhout](https://twitter.com/vavroom).
A skip link is a link that’s usually only visible on focus and lets users skip large parts or repetitive blocks in a page. They're often the very first item in a page.

<figure class="figure  figure--full">
  <span class="content__image-wrapper">
     <img class="content__image" src="https://res.cloudinary.com/dp3mem7or/image/upload/v1551942659/articles/Screen_Shot_2019-02-22_at_07.51.17.png" alt="A skip link at the top center of the page that says 'skip to main content'">
  </span>

  <figcaption>Skip link on Max Böcks website.</figcaption>
</figure>

Sometimes it also makes sense to add in-page skip links. For example when you want to give users the ability to skip components or widgets in your page with a lot of links, like social media embeds, videos, or CodePens. That’s exactly what I did in my blog post.

#### In-page skip links

Directly before the embed code for the Pen, I added a `div` with an anchor link to an element that comes after the Pen in the DOM. By clicking this link, users can skip everything between the link and the target.

```html
  <div class="skip-link-container">
    <a href="#codepen1-skip" class="skip-link">
      Skip CodePen
    </a>
  </div>
  
  <!-- CODEPEN EMBED CODE -->
  
  <!-- The target: -->
  <h2 id="codepen1-skip">Subsequent element</h2>
```

By default, this link should be visually hidden and only visible on focus. It’s not enough to just apply `display: none` and remove it on focus. To ensure that the link is still accessible to screen reader users, it's necessary to get more creative.

```css
  .skip-link-container {
    position: relative;
  }
  
  /* All the properties in this declaration block only apply if the link isn’t focused. */
  .skip-link:not(:focus) {
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    left: 0;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    top: 0;
    white-space: nowrap;
    width: 1px;
  }
```

This is a great improvement because we’ve reduced the number of key presses needed to skip the Pen from 9 to 1. There’s just one more thing I want to add. Since the page _jumps_ from the anchor link to the target and the skipped area might not be in the viewport anymore, users might become lost. To help with that, we can give them a visual feedback after the jump has happened.

```css
  /* “The :target CSS pseudo-class represents a unique element (the target element) with an id matching the URL's fragment.”
  https://developer.mozilla.org/en-US/docs/Web/CSS/:target */
  
  *:target {
    transition: background 0.2s;
    animation: target-highlight 1.2s ease-in-out;
  }
  
  @keyframes target-highlight {
    50% { background: #f23c50; }
    100% { background: none; }
  }
```

And this is how the final result looks like. Watch the video or [try it yourself](http://dev.matuzo.at/codepen/).

<figure class="figure">
  <div class="content__video-wrapper">
    <div class="video-wrapper">
      <iframe width="560" height="315" title="Embedded CodePen with custom focus styles and in-page skip link" src="https://www.youtube.com/embed/g2B_bZYR4Kc?rel=0" title="Trapped in an embedded iframe" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>

  <figcaption>Focus styles are clearly visible and users can skip the entire Pen.</figcaption>
</figure>

### What's next?

Keyboard users benefit the most from my proposed improvements. I haven't tested how accessible embedded CodePens are for screen reader users but [Scott O'Hara](https://twitter.com/scottohara), who reviewed this article, told me that he had difficulties using Pens with VoiceOver in the past. So, the next thing I (or you? 🙂) could do is to test CodePens with several screen readers and share the results.

Until then, keep on making awesome websites for everyone. If you have any questions or feedback, please find me on [Twitter](https://twitter.com/mmatuzo) or write me an [e-mail](mailto:manuel@matuzo.at).

PS: Thank you for reviewing this post, Scott. ❤️

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
