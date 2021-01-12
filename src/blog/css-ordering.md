---
title: 'Ordering CSS properties'
permalink: blog/{{ title | slug }}/index.html
metadescription: 'My thoughts on grouping and sorting CSS properties.'
date: 2021-01-04T06:58:54.969Z
image: articles/cssorder.png
teaser: 'I haven’t thought about ordering CSS properties in a while, but I began to work on the redesign of [HTMHell](https://www.htmhell.dev) recently and I decided to challenge my current approach.'
tags:
  - blog
  - posts
  - css
---

## How I’m ordering CSS properties now

Honestly, I don’t know. It’s a mix of logical grouping, alphabetical order and just no order at all. It kinda has some structure, but I guess you could describe it as pretty arbitrary.

Here’s a random class from the current HTMHell website.

```css
.site-intro {
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  line-height: 1.5;
  max-width: 36ch;
  margin-left: auto;
  margin-right: auto;
}
```

According to [a poll I ran on Twitter](https://twitter.com/mmatuzo/status/1345815183680270340), most people order by type, closely followed by alphabetical ordering. I also did a quick search and, as expected, many people have thought and written about different approaches and the pros and cons compared to others.

- [Poll Results: How do you order your CSS properties?](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/)
- [“Outside In” — Ordering CSS Properties by Importance](https://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685)
- [How to organize CSS @ 9elements](https://9elements.com/css-rule-order/)
- [Alphabetize your CSS properties, for crying out loud](https://medium.com/@jerrylowm/alphabetize-your-css-properties-for-crying-out-loud-780eb1852153)
- [Harry Potter and the Order of CSS](https://dev.to/thekashey/happy-potter-and-the-order-of-css-5ec)
- [On Declaration Sorting in CSS](https://meiert.com/en/blog/on-declaration-sorting/)

## My new approach

Since I don’t have a strong opinion on the topic and I haven’t tried different techniques, I will not repeat what others have done already, I’ll just share how I’ll try to write CSS on the new HTMHell website. Switching to a completely new system feels a bit too radical, so I decided to refine and structure my current approach.

I’m against grouping all properties, because it’s hard to group all of them sensibly and it’s hard to remember later which properties go together. I’m also against ordering alphabetically because I want `bottom` and `right` close to `position` and `align-items` close to `display`. I want strict ordering for properties I use a lot and a loose but structured ordering for the rest. I work my way from the outside in, from the back to the front.

1. **Box model properties**  
   (`width`, `height`, `min-/max-width`, `min-/max-height`, `padding`, `margin`, `border`)
2. **Background**  
   (`background-image`, `background-size`, etc.)
3. **Layout**  
   (`display`, `position`, `justify-content`, `top`, `bottom`, `align-items`, `align-content`, `grid-gap`, `grid-template-columns`, `flex-wrap`, etc.)
4. **Typography**  
   (`font-size`, `font-style`, `font-family`, `color`, `line-height`, `letter-spacing`, etc.)
5. **Everything else**, in alphabetical order

Here’s an example:

```css
body {
  /* box model */
  margin: 0;
  padding: 2rem 1rem;
  min-height: 100vh;

  /* background */
  background-image: url(../img/bg.png);

  /* layout  */
  display: flex;
  flex-direction: column;

  /* type */
  font-family: sans-serif;
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--color-text);

  /* other, in alphabetical order */
  box-shadow: 2px 2px 2px 2px #000;
  transition: all 0.3s;
}
```

If I notice that I’m using a property from the 5th group a lot, I might promote it to one of the other groups. Grouping and sorting is probably unnecessary on such a small site like the one I’m working on right now, but it’s an interesting exercise. If It works here, I might try it at work on a larger project with more people involved. If not, I’ll just keep doing whatever feels right to me. 🙃
