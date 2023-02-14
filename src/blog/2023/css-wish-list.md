---
title: "My CSS wish list"
date: 2023-02-14T08:46:54.969Z
image: articles/sm_css-wish-list.jpg
teaser: "I know I’m late to the party, but there are a few things on my CSS wish list I haven’t seen on others, so I thought I’d share."
tags:
  - blog
  - posts
  - css
---
## Visually hidden content

I'd love to see a native implementation of visually hidden text. I’m not the biggest fan of hiding stuff only for some, but it’s inevitable sometimes.

Instead of this:

```css
.visually-hidden {
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

I want this:

```css
.visually-hidden {
  visibility: visually-hidden;
}
```

Or another example:

```css
.skip-link {
  position: absolute;
  visibility: visually-hidden;
}

.skip-link:focus-visible {
  visibility: visible;
}
```

## Alternative text for pseudo elements

It would be great if I could exclude generated content from the accessibility tree or give it an accessible name.

```css
button::before {
  content: "c";
  font-family: MyIconFont;
  alt: "";
}
```

There is actually an implementation in some browsers that looks like this:

```css
label:has(+[required])::after {
  content: '★' / 'required';
}
```

Or even better:

```css
label:has(+[required])::after {
  content: '★' / attr(data-label-required);
}
```

### Related posts

- [Here’s what I didn’t know about “content”](/blog/heres-what-i-didnt-know-about-content/)
- [Alternative Text for CSS Generated Content](https://adrianroselli.com/2020/10/alternative-text-for-css-generated-content.html)
- [The CSS "content" property accepts alternative text](https://www.stefanjudis.com/today-i-learned/css-content-accepts-alternative-text/)

## Block links

So-called [block links](https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html) is something that’s still unsolved in CSS. Let’s say you have a card with a heading, text, image, and a link. In order to avoid accessibility issues, you only want to include a single link and you don’t want to wrap all elements in that link, but you still want the entire card to be clickable. There are different ways of doing that, but there are drawbacks to all of them. I’d basically want to have a native implementation of Heydons [pseudo-content trick](https://inclusive-components.design/cards/#thepseudocontenttrick). 

Maybe something like this:

```html
<div class="card">
  <h2>Heading</h2>
  <img src="" alt="">
  <p>asdasd</p>
  <a href="#">Link</a>
</div>
```

```css
.card {
  container-type: block-link;
}
```

## Bleeding backgrounds

When you define a fixed width and a background color for the `<body>`, the background fills the entire viewport and not just the body. I think that’s because the property is propagated to the viewport, `<body>` is an exception with this behavior. Anyway, I want a similar behavior for other elements, too, so that I can make the background of an element expand in all directions.

```css
div {
  max-width: 960px;
  background-color: hotpink;
  background-bleed: inline;
}
```

It should kinda work like this solution I stole from [Ilya Streltsyn](https://github.com/SelenIT). I have absolutely no idea what’s going on, but it works.

```css
div {
  border-image: conic-gradient( hotpink 0 0) fill 1//0 50vw
}
```

<style>
  [data-sample] div {
    border-image: conic-gradient( hotpink 0 0) fill 1//0 50vw
  }
</style>

<div data-sample="demo">
<div>
test
</div>
</div>

PS: *Bleeding backgrounds* is a fantastic name for a band.

## Other wish lists

There’s more on my list, but it has been already covered by others.

* From Chris’ wish list: [animate to auto](https://chriscoyier.net/2022/12/21/things-css-could-still-use-heading-into-2023/#animate-to-auto)
* From Tyler’s list: [View Transitions API](https://cloudfour.com/thinks/tylers-css-wish-list-for-2023/)
* From Dave’s list: [leading-trim](https://daverupert.com/2023/01/css-wishlist-2023/)
* From Eric’s list: [More attr()](https://meyerweb.com/eric/thoughts/2023/02/08/css-wish-list-2023/#more-attr)
* From Ahmad’s list: [sticky detection](https://ishadeed.com/article/css-wishlist-2023/#detect-when-sticky-is-active)

## In the works

And then there’s other stuff already partially implemented that I can’t wait to get better support.

- [@property](/blog/2023/100daysof-day84/)
- [container size and style queries](/blog/2022/100daysof-day56/)
- [dvh](/blog/2022/100daysof-day38/)
- [has()](/blog/2022/100daysof-day6/)
- [relative color syntax](/blog/2023/100daysof-day92/)

I believe we have no right to complain. We’re super spoiled, especially with the stuff happening around Interop 2022 and 2023, but these are just examples of things that would make my life easier. I’d love to hear what’s on your wish list, too.