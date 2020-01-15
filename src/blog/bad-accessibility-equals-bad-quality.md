---
title: Bad accessibility equals bad quality
metadescription: >-
  Bad accessibility affects all of us at some point, please (re)learn HTML and
  take advantage of its fantastic features.
date: 2020-01-15T07:35:43.219Z
intro: ''
teaser: >-
  When I talk about web accessibility at meet-ups and conferences, it’s safe to
  assume that at least one person will ask me something like “Yeah,
  accessibility sounds nice, but how many people are actually disabled? How many
  of my users are blind? And why would a blind person visit my website?”
tags:
  - a11y
publication: Matuzo
draft: false
archive: false
---

## 1. Who gives a fuck?!
We’re not building websites for ourselves or our stakeholders, we’re building them for our users, for actual human beings. It’s our job to enable as many people as possible to use what we build. Everything else makes little sense. There’s no point in building something that can’t be used. Stop making assumptions about your audience and start building inclusive products.
﻿
## 2. It's not just about disabilities
Web accessibility is not just about keyboard users, color contrast or screen readers. Accessibility is a perfect indicator for the quality of a website. Accessibility is strongly interlocked with other areas of web design and web development. If your website is accessible, it usually means that it’s inclusive, resilient, usable, it offers great <abbr title="user experience">UX</abbr> for everyone, and it’s fast.  
﻿
Here’s a simplified example and the reason for this rant:
﻿
```html
<li>
  <div tabindex="0" class="link">
    <img src="preview.jpg">
  </div>
</li>
```
﻿
Yesterday I was looking at a list with 70 preview images that link to detail pages. I wanted to open a few of them in new tabs. Easy, right?   
No, because the developers decided to wrap these images in `div`s and link them with Javascript instead of using an anchor. I could left-click and open a single prototype in the same window, but I couldn’t right-click and open in a new window, because there are different options in the context menu when you right-click a `div` or an anchor.
﻿
### Semantic HTML is beneficial for everyone.
﻿
Using `a` instead of `div` gives links a semantic meaning, users more options when using a mouse and it makes links keyboard focusable. Although – and this is the paradox – the list was keyboard accessible, because they made their `div`-links focusable with JavaScript instead of taking advantage of the browsers native behaviour.  
﻿
This is just a minor problem and others have to deal with much bigger barriers every day, but this example is characteristic for how carelessly we sometimes treat our users.  
﻿
Bad accessibility affects all of us at some point, please (re)learn HTML and take advantage of its fantastic features.
