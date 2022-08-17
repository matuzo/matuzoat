---
title: 'outline is your friend'
metadescription: 'Don‘t rely on properties like background-color or box-shadow alone for focusing styling.'
date: 2022-08-17T09:38:54.969Z
image: articles/sm_outline.jpg
teaser: "If you open a plain HTML document with no CSS and you focus an interactive element like a button, link, or textarea, you’ll see that by default browsers use the `outline` property to highlight these elements."
tags:
  - blog
  - posts
  - css
---

<figure>

![A simple demo of a link a button and a textarea](/images/focus_default.webp)

<figcaption>A blue outline around a focused button in Firefox</figcaption>
</figure>

## outline is great

The `outline` property is the perfect candidate for this job for several reasons.


<ul>
  <li>
    <p><strong>outline doesn’t break layout.</strong></p>
    <p>Unlike the <code>border</code> property (if <code>box-sizing</code> is not set to <code>border-box</code>), <code>outline</code> doesn’t add to the width and height of an element. It just creates an outline without taking up any space.</p>
  </li>

  <li>
    <strong>You can add spacing between the content and the outline using <code>outline-offset</code>.</strong>
    
  <figure>
    <img src="/images/focus_se.webp" alt="A focused link in a paragraph" loading="lazy" width="710" height="155">
      
  <figcaption>Outlines on Stephanie Eckles website have some extra spacing.</figcaption>
  </figure>
  </li>

  <li>
    <p><strong>You can customize the width, style, and color.</strong></p>

<figure>
<img src="/images/focus_sm.webp" alt="A random teaser of a blog post." loading="lazy" width="751" height="293">
<figcaption>Big, red, dotted outline around a link in a teaser on smashingmagazine.com</figcaption>
</figure>

```css
:focus {
  outline-width: 3px;
  outline-style: dotted;
  outline-color: #d33a2c;
  outline-offset: 2px;
}
```

</li>

<li>
<p><strong><code>outline</code> works great in <a href="https://www.smashingmagazine.com/2022/06/guide-windows-high-contrast-mode/">forced color modes</a> like <a href="https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors">Windows High Contrast Mode (WHCM)</a></strong></p>

<figure>
<img src="/images/focus_sm2.webp" alt="Dark background color, white text and blueish highlights instead of white background, black text color and red highlights." loading="lazy" width="751" height="403">
<figcaption>The same outline with different colors in a dark Windows theme.</figcaption>
</figure>

</li>
</ul>

## outline sucks

There are also disadvantages to using `outline`.

- **Outlines don’t look nice.**
    
    Yes, outlines don’t necessarily look great, but 1. Oh my god, who cares? It doesn’t have to look nice, it just has to work well for your users and 2. you can tweak them to a certain degree and make them work with your design (see [smashingmagazine.com](https://smashingmagazine.com)).
    
- **The default outline might not be visible enough.**
    
    I advice against leaving the default focus styles untouched because they might not work with every design. Overwrite them with something that works better with your theme.
    
    ```css
    /* Removes the default outline only in browsers that support :focus-visible */
    :focus:not(:focus-visible) {
      outline: none;
    }
    
    :focus-visible {
      outline: 2px dashed #282828;
      outline-offset: 2px;
    }
    ```
    
    <img src="/images/focus_custom.webp" alt="A clearly visible, 2px dashed outline around a button." loading="lazy" width="710" height="280">

## What about other properties?

If you remember, one of the advantages of `outline` is that it works great in forced color mode. If this property works well, it means that there must be properties that don’t work well. 

Here’s an example. Instead of using `outline`, I change the `background` and add a `box-shadow` on focus-visible.

```css
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: none;
  background: #000;
  color: #fff;
  box-shadow: 0 2px 0 0 #fff, 0 5px 0 0 #000;
}
```

This is how focus styles on the button look like with regular contrast settings.

<img src="/images/focus_background.webp" loading="lazy" width="710" height="280" alt="Dark background color on the button and a thick dark line below">

And here’s the same focused button in <abbr title="Windows High Contrast Mode">WHCM</abbr>. We don’t see anything because these properties are reverted in forced color modes.

<img src="/images/focus_background_forced.webp" loading="lazy" width="710" height="280" alt="The styling of the button didn’t change at all">

## Transparent outlines

Now you might be thinking “But…but [a11yproject.com](http://a11yproject.com) and [gov.uk](http://gov.uk) are using background colors for some of their focus styles”. Yes, they are using `background-color`, but they’re doing it in combination with `outline`. This is a nice trick to avoid visible outlines in normal color mode and assure that they’re displayed in forced color mode.

```css
.c-homepage-card__cta:focus {
  background-color: #fb37ff;
  color: #000;
  outline: 3px solid #fb37ff;
}
```

<figure>
<img src="/images/focus_a11yproject.webp" alt="pink background on focused links." width="710" height="267">
<figcaption>

[a11yproject.com](http://a11yproject.com) uses the same color for the outline as for the background.

</figcaption>
</figure>


<figure>
<img src="/images/focus_a11yproject_forced.webp" alt="just an outline on focused links." width="710" height="261">
<figcaption>
No background color in WHCM.
</figcaption>
</figure>

```css
.govuk-link:focus {
  outline: 3px solid transparent;
  color: #0b0c0c;
  background-color: #fd0;
  box-shadow: 0 -2px #fd0,0 4px #0b0c0c;
  text-decoration: none;
}
```

<figure>
<img src="/images/focus_govuk.webp" alt="yellow background an think black underline on focused links" width="710" height="228">
<figcaption>

[gov.uk](http://gov.uk) uses a background color and box-shadow in combination with a transparent outline

</figcaption>
</figure>

<figure>
<img src="/images/focus_govuk_forced.webp" alt="just an outline on focused links." width="710" height="221">
<figcaption>

No background color and box shadow in WHCM.

</figcaption>
</figure>


## Conclusion

Be careful when customizing focus styles, don’t forget to test in forced color modes, and always remember that `outline` is your friend.
