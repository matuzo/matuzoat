---
title: '12 Tips for More Accessible React Apps (Slides, React Finland 2019)'
metadescription: >-
  12 Tips for More Accessible React Apps (Slides, React Finland 2019) - Manuel
  Matuzovic
date: 2019-04-25T20:18:30.807Z
image: articles/react-finland/reactsm.png
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
---

## Recording of the talk

<div class="content__video-wrapper"><div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/NL6XKcX4sxc"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="The full talk at React Finland 2019"></iframe></div></div>

## Slides

The slides are online on this page slide by slide with descriptions.

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

This talk is called <cite>12 Tips For More Accessible React Apps</cite>. At the time when I picked the title I didn’t know how much time I will have so I just picked an arbitrary number and I thought that 12 will be fine.

As it turns out, I only have 20 minutes so let’s get started with my 8 tips for more accessible react apps. 😄

### <abbr title="acessibility">a11y</abbr> tip #1: Create a sound document outline

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.005.jpeg)

My first tip is: Create a sound document outline.

![<h1>Yo! I'm the title of your page.</h1><h2>I'm very important.</h2><h3>My parent is very important.</h3><h3>My parent is very important.</h3><h4>I exist.</h4><h2>I'm very important.</h2><h3>My parent is very important.</h3>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.006.jpeg)

What I mean by that is that you should start your document with an `h1` and the title of your page.

Large sections, thematic groupings of content, in your page start with an `h2`. If there are subsections use `h3`, `h4`, etc. If there’s another large thematic section you go back to the `h2`.

<div class="content__video-wrapper"><div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/gbHCgiktPNc"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: VoiceOver navigation by headings"></iframe></div></div>

This is important because screen reader users don't just use the software by reading the contents on a page from top to bottom. There are additional ways of navigation, for example by listing all headings and jumping directly to a specific heading.

In VoiceOver you get a list of all headings. The level is announced with the text of the heading to give users context and understand the page hierarchy.

![<Heading.H>I will be an h1</Heading.H><Heading.LevelBoundary><Heading.H>I will be an h2</Heading.H><Heading.LevelBoundary><Heading.H>I will be an h3</Heading.H></Heading.LevelBoundary><Heading.H>I will be an h2</Heading.H></Heading.LevelBoundary>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.007.jpeg)

Sometimes that's hard to get right, especially when you're working with nested components. An `h2` in a component is correct in one place but might be wrong when it's nested in another.

[Tenon UI](https://www.tenon-ui.info/), an accessible React components library, has a component that takes care of that. You start with a `Heading.H` component which will automatically become an `h1` and then you use the `Heading.LevelBoundary` component to create a new section and allow automatic level calculation.

![<h1>I will be an h1</h1><h2>I will be an h2</h2><h3>I will be an h3</h3><h2>I will be an h2</h2>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.008.jpeg)

The result is an automatically calculated correct document outline.

<div class="content__video-wrapper">
  <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/tLSEWdpmYrc?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: Testing the document outline with tota11y"></iframe>
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

The React Finland website starts with an `h1` and has a well structured document outline. It's almost perfect, there’s just one thing I'd want to improve. There should be a "Sponsors" `h2` that groups the different types of sponsorships.

I guess it's missing because it hasn't been considered in the design either. There might be a reason to leave it away in the design but it should be in the document. The design shouldn't dictate the outline but the content should. What we need here is a heading that's hidden from sighted users but accessible to screen reader users.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.012.jpeg)

`display: none;`, `visibility: hidden`; and the `hidden` attribute are not suitable for hiding content visually because they remove content from the accessibility tree making it inaccessible to screen reader users.

![.u-vh { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; white-space: nowrap;}](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.013.jpeg)

We need a little bit more than that. A [combination of properties](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939#81ec) that makes sure that content is still accessible to screen readers but not visible or focusable.

![<h2 className="u-vh">Sponsors</h2>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.014.jpeg)

To improve the React Finland website we add a visually hidden `h2` and transform the existing `h2`s to `h3`s.

![<button><span class="u-vh">Save</span><svg aria-hidden width="32" height="32"><path …></path></svg></button>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.015.jpeg)

You can use this technique as well when you have an icon button without text. You just put the text in a u-vh `span` inside the `button` and you've got yourself an accessible button.

![<button><VisuallyHidden>Save</VisuallyHidden><svg aria-hidden width="32" height="32"><path …></path></svg></button>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.016.jpeg)

You could write a component for that or use the existing [VisuallyHidden component](https://github.com/reach/reach-ui/tree/master/packages/u-vh) from the [Reach UI React library](https://github.com/reach/reach-ui/).

#### Summary of the second tip

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.017.jpeg)

`display: none;`, `visibility: hidden;` and the `hidden` attribute remove content from the accessibility tree.
Every item needs a textual representation, even if it isn’t visible. Check out Reach UI's VisuallyHidden component.

### <abbr title="acessibility">a11y</abbr> tip #3: Use `<button>` if you need a button.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.018.jpeg)

Tip number 3: Use `<button>` if you need a button.

It's tempting to use `div`s as buttons because they come with less default styling than HTML `button`s but there’s a huge difference when it comes to user experience.

I'll show you the difference in the following demo.

<div class="content__video-wrapper">
  <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/K1sdW9GNSwE?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: Using a HTML button as button"></iframe>
  </div>
</div>

In this example I put a click event on a HTML `button`. You can see that I can click it with a mouse and focus it using the keyboard. I can trigger the event using the mouse or by pressing the <kbd>Enter</kbd> or <kbd>Space</kbd> key.

<div class="content__video-wrapper">
  <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/mbGqcHdCIRA?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: Using a div as button"></iframe>
  </div>
</div>

This button looks the same but this time I'm using a `div` instead of a `button`. I can click the button but I can’t focus it, because divs aren't focusable by default. Even if I could focus it, I wouldn't get the key events I get with the HTML `button` element.

A fake button is inaccessible to keyboard and screen reader users.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.019.jpeg)
Summary of the third tip: `<button>`s are focusable by default, they come with keyevents for free and they're semantic. A `<div>` is just generic text.

Check out [Just use button](https://www.youtube.com/watch?v=CZGqnp06DnI) by [Rob Dodson](https://twitter.com/rob_dodson) and [The Links vs. Buttons Showdown](https://www.youtube.com/watch?v=8XjwDq9zG4I&t=1son) by [Marcy Sutton](https://twitter.com/marcysutton) on YouTube.

### <abbr title="acessibility">a11y</abbr> tip #4: Use fragments to avoid invalid HTML.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.020.jpeg)

If a component returns multiple elements, they must be wrapped in a wrapper element, for example a `div`. This might cause invalid HTML or break your layouts.

React 16.2 introduced a nice little feature called [Fragments](https://reactjs.org/docs/fragments.html). Fragments let you group a list of children without adding extra nodes to the DOM.

![const Table = props => { return ( <table> <tr> <Columns /> </tr> </table> ); }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.021.jpeg)

Let’s say we have table component and in each table row there’s a column component.

![const Columns = props => { return ( <div> <td>Hello</td> <td>World</td> </div> ); }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.022.jpeg)

This is how the `Columns` component looks like. All cells are wrapped in a `div` because we need a wrapper element.

![<table> <tr> <div> <td>Hello</td> <td>World</td> </div> </tr> </table>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.023.jpeg)

The result is invalid markup because a `div` is not a valid descendent of `tr`.

![const Columns = props => { return ( <React.Fragment> <td>Hello</td> <td>World</td> </React.Fragment> ); }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.024.jpeg)

This can be fixed by using a `Fragment` instead of a `div`. All you have to do is to replace `<div></div>` with `<React.Fragment></React.Fragment>`.

![<table> <tr> <td>Hello</td> <td>World</td> </tr> </table>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.025.jpeg)

As a result the component returns the contents without extra markup.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.026.jpeg)

Summary of tip 4: Fragments help you write valid HTML and they reduce bloat. There’s also a shorter syntax, you can write `<></>` instead of `<React.Fragment></React.Fragment>`.

Check out the Fragments docs for more details and examples.

### <abbr title="acessibility">a11y</abbr> tip #5: Take care of focus management.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.027.jpeg)

My fifth tip is that you should take care of focus management.

React applications continuously modify the HTML DOM during runtime, sometimes leading to keyboard focus being lost or set to an unexpected element. In order to fix this, we need to manually move focus in the right direction.

<div class="content__video-wrapper">
  <div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/eGyEQT8EDLs?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: bad focusmanagement"></iframe>
  </div>
</div>

If I focus this button and press Enter, a modal window pop ups. I would expect that I can access the content in the modal with my keyboard. Instead the focus is still behind the modal window because tab order always follows DOM order and the modal window is at the very end of the page. I'd have to tab through all items on the page until I reach the modal.

This is a situation were we have to move focus manually from the button to the modal window.

<div class="content__video-wrapper">
  <div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/9Z3imL-fqdU?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: good focusmanagement"></iframe>
  </div>
</div>

If we do that, we can access the elements in the modal by pressing the <kbd>Tab</kbd> key as we would expect it. Of course, if the user closes the modal, we have to make sure to move focus back to the button.

To set focus in React, we can use `refs`.

![class Button2 extends React.Component { constructor(props) { super(props); this.btn = React.createRef(); } setFocus(){ this.btn.current.focus(); } render() { return ( <button className="btn" ref={ this.btn }> { this.props.children } </button> ) }}](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.028.jpeg)

1. First we create a ref using React.createRef().
2. We attach the ref to a DOM element, in our example a button, via the ref attribute.
3. This gives us access to a reference to the node.
4. Now we can focus the button using the raw DOM API.

<div class="content__video-wrapper">
  <div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/BpP2-hwRbM0?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: inaccessible modal on vice.com"></iframe>
  </div>
</div>

Not taking care of focus can be a real problem.

On vice.com the focus should be on this dialog when the site is accessed for the first time to allow users to close it but instead it's behind the modal and keyboard users have no chance to interact with it. Neither pressing Tab nor pressing Escape will help.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.029.jpeg)

Summary of tip 5: Focus management is important because it's essential for keyboard and screen reader users.
Take advantage of refs in React to manage focus.

Check out the [A11y dialog on Github](https://github.com/edenspiekermann/a11y-dialog) and the [accessibility docs on reactjs.org](https://reactjs.org/docs/accessibility.html).

### <abbr title="acessibility">a11y</abbr> tip #6: Make notifications accessible to everyone.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.030.jpeg)

Tip number 6: Make notifications accessible to everyone.

<div class="content__video-wrapper">
  <div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/IkVjAnFp6GI?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: inaccessible notification"></iframe>
  </div>
</div>

I'm using VoiceOver on this page. If I click the button, a notification pops up that tells me that everything has been saved successfully.
The problem is that there’s only visual feedback. The app doesn't provide screen readers with the information.

![<div className="alert" role="alert">Saved successfully</div>](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.031.jpeg)

The notification looks something like this. In order to make it accessible we have to add one more attribute.
If an element has the role attribute with alert as a value, it becomes a live region. Screen readers will than watch and announce content that has changed inside this element.

<div class="content__video-wrapper">
  <div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/VtPqRyBUz5w?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: accessible notification"></iframe>
  </div>
</div>

And now, with the `role` attribute in place, the notification will be announced.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.032.jpeg)

Summary of tip 6: If you add `role="alert"` or `role="status"` to an element you're transforming it to a so called live region.

The difference between `alert` and `status` is that `alert` will interrupt the screen reader if it's in the course of announcing something else. `status` will wait until the screen reader has finished announcing.
Use live regions only for significant changes that you need to communicate.

Check out [Reach UI's alert component](https://ui.reach.tech/alert/), [react-aria-live](https://github.com/AlmeroSteyn/react-aria-live) on Github, and read [ARIA live regions in React](https://almerosteyn.com/2017/09/aria-live-regions-in-react) on Almero Steyns blog.

### <abbr title="acessibility">a11y</abbr> tip #7: Announce page changes.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.033.jpeg)

Tip number 7 is important: routing. If you use a screen reader on a server side rendered page and you click a link, the whole page loads, the title of the page is announced and the focus is on the document. With single page applications that's a little bit different.

<div class="content__video-wrapper">
  <div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/cZqdtkG-Z4M?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: inaccessible routing (no announcement)"></iframe>
  </div>
</div>

If I tab to the "about" link the screen reader announces the text in the link. When I click it, the page changes but the screen reader doesn't announce the change and focus stays where it is.

The issue with the fact the focus doesn't move is especially visible if I click a link in the footer. I'm on the "about" page, I tab down to the footer links and click the "blog" link. The content of the page changes but I don't hear and see it.

![class About extends React.Component { constructor(props) { super(props); this.section = React.createRef(); } componentDidMount(){ this.section.current.focus(); document.title = "About"; } render() { return ( <section tabIndex="-1" ref={ this.section }> <h2>About</h2><p>We are…</p><p>Lorem ipsum…</p> </section> ) } }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.034.jpeg)

In order to fix it I again create a `ref`. This time to get access to a reference to the `section` DOM element.
I add the `tabindex` attribute with the value `-1` to make the `section` focusable. I focus it on `componentDidMount`.

And while I'm at it I also update the document title.

VoiceOver will now announce the whole region, so the heading and the text. I'm not sure if this is the best way to do it, I prefer to be as close to the native behaviour as possible. That's why I want to announce just the title of the page.

![render() {return (<section aria-labelledby="pageTitle" tabIndex="-1" ref= { this.section }><h2 id="pageTitle">About</h2><p>We are…</p><p>Lorem ipsum…</p></section>) }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.035.jpeg)

One way to do that is to label the focused region with the text in the heading.

I give the heading an `id` and reference it in the section by adding the `aria-labelledby` attribute with the `id` as a value. Now the `section` is labelled by the content of the heading. The difference is that screen readers will on focus just read the content of the heading instead of everything.

<div class="content__video-wrapper">
  <div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/8YTtqT4JvuU?rel=0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="React demo: accessible routing"></iframe>
  </div>
</div>

If I do all that, the focus moves to the `section`, announces the content of the heading as well the information that focus is on a region.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.036.jpeg)

There’s a router called Reach Router that does these things and more out-of-the-box.

<https://reach.tech/router>

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.037.jpeg)

Summary of tip 7: Announce page changes. Use `ref`s to manage focus. If necessary, make items focusable by applying `tabindex="-1"`

Check out [Reach Router](https://reach.tech/router).

### <abbr title="acessibility">a11y</abbr> tip #8: Test your React code automatically.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.038.jpeg)

My last tip, tip number 8: Test your React code automatically.

Don't get me wrong, you have to do manual testing as well, but automatic testing is a good first step.

![var React = require('react'); var ReactDOM = require('react-dom'); if (process.env.NODE_ENV !== 'production') { var axe = require('react-axe'); axe(React, ReactDOM, 1000); }](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.039.jpeg)

There’s a great tool called [React-Axe](https://github.com/dequelabs/react-axe). It uses the axe-core accessibility testing library. Results will show in the Chrome DevTools console.

Call the exported function passing in the React and ReactDOM objects as well as a timing delay in milliseconds.
Be sure to only run the module in your development environment.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.040.jpeg)

The advantage compared to other tools is that react-axe tests the accessibility of the rendered DOM.

If you open the console of your dev tools you'll see the errors that axe has detected. For example, the `<html>` element must a have a `lang` attribute, because it defines the natural language of the document.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.041.jpeg)

Summary of tip 7: Automatic tests help you notice low hanging fruits. Automatic testing is only the first step. Manual testing is necessary.
Check out React-axe and [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) on Github.

![](https://res.cloudinary.com/dp3mem7or/image/upload/v1549208913/articles/react-finland/accessible_react_apps.042.jpeg)

Thank you ❤️
