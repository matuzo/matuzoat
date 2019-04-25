---
title: '12 Tips for More Accessible React Apps (Slides, React Finland 2019)'
metadescription: >-
  12 Tips for More Accessible React Apps (Slides, React Finland 2019) - Manuel
  Matuzovic
date: 2019-04-25T20:18:30.807Z
teaser: >-
  If you want to improve the accessibility of your React apps but you don't know
  how or where to start, this talk is just what you need. Manuel shares 12 tips
  that will help you build web sites and applications that can be used by
  anyone. Each tip fits on one slide and you'll be able to put them into
  practice right away without having to learn anything fundamentally new. The
  tips include testing, HTML, JS techniques, and general best practices.
tags:
  - React
  - accessibility
publication: Matuzo
draft: true
archive: false
---
## Recording of the talk

A recording of the talk will follow in the next days.

## Slides

The slides are online on this page slide by slide with descriptions and on [noti.st](https://).

### Introduction

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.001.jpg)

<p>Hello React Finland!</p>

### About me

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.002.jpg)

My name is Manuel Matuzovic, I'm a frontend developer from Vienna.
I work for the City of Vienna and I'm specialised in HTML, CSS, and accessibility.
My twitter handle is [mmatuzo](https://twitter.com/mmatuzo).

### Link to the Slides

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.003.jpeg)

The [slides for this talk](https://bit.ly/react-tips) are already online if you want to follow along on your laptop.

I'm not a React developer but I know how awesome React is. Today I'm here to give you tips that will help you create better apps and reach more people.

### About this talk

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.004.jpeg)

This talk is called <cite>12 Tips For More Accessible React Apps</cite>. At the time when I picked the title I didn't know how much time I will have so I just picked an arbitrary number and I thought that 12 will be fine.

As it turns out, I only have 20 minutes so let's get started with my 8 tips for more accessible react apps. 😄

### <abbr title="acessibility">a11y</abbr> tip #1: Create a sound document outline

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.005.jpeg)

My first tip is: Create a sound document outline.

![&lt;h1&gt;Yo! I'm the title of your page.&lt;/h1&gt;&lt;h2&gt;I'm very important.&lt;/h2&gt;&lt;h3&gt;My parent is very important.&lt;/h3&gt;&lt;h3&gt;My parent is very important.&lt;/h3&gt;&lt;h4&gt;I exist.&lt;/h4&gt;&lt;h2&gt;I'm very important.&lt;/h2&gt;&lt;h3&gt;My parent is very important.&lt;/h3&gt;](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.006.jpeg)

What I mean by that is that you should start your document with an `h1` and the title of your page.

Large sections, thematic groupings of content, in your page start with an `h2`. If there are subsections use `h3`, `h4`, etc. If there's another large thematic section you go back to the `h2`.

<div class="content__video-wrapper"><div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/gbHCgiktPNc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: VoiceOver navigation by headings"></iframe></div></div>

This is important because screen reader users don't just use the software by reading the contents on a page from top to bottom. There are additional ways of navigation, for example by listing all headings and jumping directly to a specific heading.

In VoiceOver you get a list of all headings. The level is announced with the text of the heading to give users context and understand the page hierarchy.

![&lt;Heading.H&gt;I will be an h1&lt;/Heading.H&gt;&lt;Heading.LevelBoundary&gt;&lt;Heading.H&gt;I will be an h2&lt;/Heading.H&gt;&lt;Heading.LevelBoundary&gt;&lt;Heading.H&gt;I will be an h3&lt;/Heading.H&gt;&lt;/Heading.LevelBoundary&gt;&lt;Heading.H&gt;I will be an h2&lt;/Heading.H&gt;&lt;/Heading.LevelBoundary&gt;](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.007.jpeg)

Sometimes that's hard to get right, especially when you're working with nested components. An `h2` in a component is correct in one place but might be wrong when it's nested in another.

[Tenon UI](https://www.tenon-ui.info/), an accessible React components library, has a component that takes care of that. You start with a `Heading.H` component which will automatically become an `h1` and then you use the `Heading.LevelBoundary` component to create a new section and allow automatic level calculation.

![&lt;h1&gt;I will be an h1&lt;/h1&gt;&lt;h2&gt;I will be an h2&lt;/h2&gt;&lt;h3&gt;I will be an h3&lt;/h3&gt;&lt;h2&gt;I will be an h2&lt;/h2&gt;](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.008.jpeg)

The result is an automatically calculated correct document outline.

<div class="content__video-wrapper">
  <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/tLSEWdpmYrc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: Testing the document outline with tota11y"></iframe>
  </div>
</div>

There are many ways of testing the document outline. A quick and easy way is a browser extension called [tota11y](https://khan.github.io/tota11y/).
tota11y annotates headings and shows the document outline. It displays errors if the outline is not correct.

#### Summary of the first tip

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.009.jpeg)

Create a sound document outline because it gives your document structure, helps screen reader users with navigation, and it's important for SEO.

Check out [Tenon UI's headings component](https://www.tenon-ui.info/headings). Test your document outline with [tota11y](https://khan.github.io/tota11y/) or [wave](https://wave.webaim.org/). 

### <abbr title="acessibility">a11y</abbr> tip #2: Hide content correctly

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.010.jpeg)

My second tip is: Hide content correctly.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.011.jpeg)

The React Finland website starts with an `h1` and has a well structured document outline. It's almost perfect, there's just one thing I'd want to improve. There should be a "Sponsors" `h2` that groups the different types of sponsorships.

I guess it's missing because it hasn't been considered in the design either. There might be a reason to leave it away in the design but it should be in the document. The design shouldn't dictate the outline but the content should. What we need here is a heading that's hidden from sighted users but accessible to screen reader users.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.012.jpeg)

`display: none;`, `visibility: hidden`; and the `hidden` attribute are not suitable for hiding content visually because they remove content from the accessibility tree making it inaccessible to screen reader users.

![.visually-hidden { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; white-space: nowrap;}](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.013.jpeg)

We need a little bit more than that. A [combination of properties](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939#81ec) that makes sure that content is still accessible to screen readers but not visible or focusable.

![&lt;h2 className=&quot;visually-hidden&quot;&gt;Sponsors&lt;/h2&gt;](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.014.jpeg)

To improve the React Finland website we add a visually hidden `h2` and transform the existing `h2`s to `h3`s.

![&lt;button&gt;&lt;span class=&quot;visually-hidden&quot;&gt;Save&lt;/span&gt;&lt;svg aria-hidden width=&quot;32&quot; height=&quot;32&quot;&gt;&lt;path &hellip;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;/button&gt;](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.015.jpeg)

You can use this technique as well when you have an icon button without text. You just put the text in a visually-hidden `span` inside the `button` and you've got yourself an accessible button.

![&lt;button&gt;&lt;VisuallyHidden&gt;Save&lt;/VisuallyHidden&gt;&lt;svg aria-hidden width=&quot;32&quot; height=&quot;32&quot;&gt;&lt;path &hellip;&gt;&lt;/path&gt;&lt;/svg&gt;&lt;/button&gt;](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.016.jpeg)

You could write a component for that or use the existing [VisuallyHidden component](https://github.com/reach/reach-ui/tree/master/packages/visually-hidden) from the [Reach UI React library](https://github.com/reach/reach-ui/).	

#### Summary of the second tip

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.017.jpeg)

`display: none;`, `visibility: hidden;` and the `hidden` attribute remove content from the accessibility tree.
Every item needs a textual representation, even if it isn't visible. Check out Reach UI's VisuallyHidden component.

### <abbr title="acessibility">a11y</abbr> tip #3: Use `<button>` if you need a button.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.018.jpeg)

Tip number 3: Use `<button>` if you need a button.

It's tempting to use `div`s as buttons because they come with less default styling than HTML `button`s but there's a huge difference when it comes to user experience.

I'll show you the difference in the following demo.

<div class="content__video-wrapper">
  <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/K1sdW9GNSwE?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: Using a HTML button as button"></iframe>
  </div>
</div>

In this example I put a click event on a HTML `button`. You can see that I can click it with a mouse and focus it using the keyboard. I can trigger the event using the mouse or by pressing the <kbd>Enter</kbd> or <kbd>Space</kbd> key.

<div class="content__video-wrapper">
  <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/mbGqcHdCIRA?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: Using a div as button"></iframe>
  </div>
</div>

This button looks the same but this time I'm using a `div` instead of a `button`. I can click the button but I can't focus it, because divs aren't focusable by default. Even if I could focus it, I wouldn't get the key events I get with the HTML `button` element.

A fake button is inaccessible to keyboard and screen reader users. 

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.019.jpeg)
Summary of the third tip: `<button>`s are focusable by default, they come with keyevents for free and they're semantic. A `<div>` is just generic text.

Check out [Just use button](https://www.youtube.com/watch?v=CZGqnp06DnI) by [Rob Dodson](https://twitter.com/rob_dodson) and [The Links vs. Buttons Showdown](https://www.youtube.com/watch?v=8XjwDq9zG4I&t=1son) by [Marcy Sutton](https://twitter.com/marcysutton) on YouTube.

### <abbr title="acessibility">a11y</abbr> tip #4: Use fragments to avoid invalid HTML.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.020.jpeg)

If a component returns multiple elements, they must be wrapped in a wrapper element, for example a `div`. This might cause invalid HTML or break your layouts.

React 16.2 introduced a nice little feature called [Fragments](https://reactjs.org/docs/fragments.html). Fragments let you group a list of children without adding extra nodes to the DOM.

![const Table = props =&gt; { return ( &lt;table&gt; &lt;tr&gt; &lt;Columns /&gt; &lt;/tr&gt; &lt;/table&gt; ); }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.021.jpeg)

Let's say we have table component and in each table row there's a column component.

![const Columns = props =&gt; { return ( &lt;div&gt; &lt;td&gt;Hello&lt;/td&gt; &lt;td&gt;World&lt;/td&gt; &lt;/div&gt; ); }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.022.jpeg)

This is how the `Columns` component looks like. All cells are wrapped in a `div` because we need a wrapper element.

![&lt;table&gt; &lt;tr&gt; &lt;div&gt; &lt;td&gt;Hello&lt;/td&gt; &lt;td&gt;World&lt;/td&gt; &lt;/div&gt; &lt;/tr&gt; &lt;/table&gt;](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.023.jpeg)

The result is invalid markup because a `div` is not a valid descendent of `tr`.

![const Columns = props =&gt; { return ( &lt;React.Fragment&gt; &lt;td&gt;Hello&lt;/td&gt; &lt;td&gt;World&lt;/td&gt; &lt;/React.Fragment&gt; ); }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.024.jpeg)

This can be fixed by using a `Fragment` instead of a `div`. All you have to do is to replace `<div></div>` with `<React.Fragment></React.Fragment>`.

![&lt;table&gt; &lt;tr&gt; &lt;td&gt;Hello&lt;/td&gt; &lt;td&gt;World&lt;/td&gt; &lt;/tr&gt; &lt;/table&gt;](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.025.jpeg)

As a result the component returns the contents without extra markup.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.026.jpeg)

Summary of tip 4: Fragments help you write valid HTML and they reduce bloat. There's also a shorter syntax, you can write `<></>` instead of `<React.Fragment></React.Fragment>`.

Check out the Fragments docs for more details and examples.
