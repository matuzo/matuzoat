---
title: "Element diversity"
permalink: blog/{{ title | slug }}/index.html
metadescription: 'Some thoughts on why we use the div element so much.'
teaser: 'Did you know that there are 112 elements in HTML?!'
date: 2021-09-02T12:38:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_elementdiversity.png
---
```html
<div id="appRoot">
  <div>
    <div>
      <div>
        <div class="heading">Heading</div>
        <div class="content">
          <div>
            <div>
              <div class="list">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

<!-- teaser -->

<p>
  The markup above is something I see a lot on websites I audit professionally or when I just look under the hood of a website because I’m curious to see how it’s structured. The <a href="https://almanac.httparchive.org/en/2020/markup#top-elements">div is by far the most popular element</a>, which is absolutely fine, but it's often being used in favor of other elements that would fit better. This overuse is nothing new, but the rise of JavaScript (JS) frameworks has amplified it.
</p>

<p>It would be a bit too easy to only blame JS frameworks, there are several reasons we use <code>div</code>s so much:</p>

<ol>
  <li>
    <a href="#elements">Poor knowledge of HTML elements</a>
  </li>
  <li>
    <a href="#why">Lack of understanding why</a>
  </li>
  <li>
    <a href="#css">Insufficient CSS skills</a>
  </li>
  <li>
    <a href="#defaultstyles">Default styles</a>
  </li>
  <li>
    <a href="#frameworks">JS frameworks</a>
  </li>
  <li>
    <a href="#thepage"> We don't care enough about <em>the page</em></a>
  </li>
  <li>
    <a href="#style">Some elements are hard to style</a>
  </li>
</ol>


<h2 id="elements">Poor knowledge of HTML elements</h2>

<p>
  It's hard to use something you don't know exists. As someone who teaches HTML, I know that universities don't put enough emphasis on teaching semantic HTML. They teach syntax, basic structure and the ~20 most important elements and attributes, and that's pretty much it.
</p>
<p>
  Did you know that there are 112 elements in HTML? <a href="twitter.com/plfstr">Paul Foster</a> built this fantastic <a href="https://codepen.io/plfstr/full/zYqQeRw">HTML memory test</a>. Try it, you'll be surprised how much you don't remember and know. (Heads up: His test lists 115 elements because it includes <code>svg</code>, <code>math</code>, and the deprecated <code>rb</code> element.)
</p>

<p class="codepen" data-height="400" data-slug-hash="zYqQeRw" data-user="plfstr" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/plfstr/pen/zYqQeRw">
  HTML Tags Memory Test</a> by Paul (<a href="https://codepen.io/plfstr">@plfstr</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<h2 id="why">Lack of understanding why</h2>

<p>
  Having spoken with many developers at workshops, meetups, and conferences, I believe that most know that semantic HTML is important, but only a few know why.
</p>
<p>
  <q>For accessibility! Duh!</q>
</p>
<p>
  Of course, for accessibility, but most people don't know why you need a <a href="https://www.htmhell.dev/tips/the-document-outline/">sound document outline</a> or landmarks, or what the advantages of a <code>button</code> button over a <code>div</code> button are. If I don't know which consequences my choices have on users, why would I bother using <a href="https://htmhell.dev/18-main-divigation/">anything else but the div</a>?
</p>

<h2 id="frameworks">JS frameworks</h2>

<p>
  Some JavaScript frameworks require that you wrap components in a single element. If no semantic element fits, devs use the <code>div</code>. I believe they got used to the <code>div</code> so much that they began using it all the time. It's common to see invalid code like this:
</p>

```html
<ul>
  <div>
    <li>Item 1</li>
    <li>Item 2</li>
  </div>
</ul>
```

<p>
  The number of wrapper divs can be reduced, though, because most frameworks don't require you anymore to wrap your components in HTML elements. <a href="https://reactjs.org/docs/fragments.html">React supports fragments</a>, wrapper elements that don't add extra nodes to the DOM, and <a href="https://v3.vuejs.org/guide/migration/fragments.html#overview">Vue supports multi-root components</a> in version 3.
</p>

<h2 id="css">
  Insufficient CSS skills
</h2>

<p>
  A pattern I've noticed among students who start my beginner HTML and CSS course with previous knowledge of HTML is that they wrap almost everything in a <code>div</code>. When I ask them why, they usually say that they're adding them in case they might need them later. I know CSS pretty well and usually when I look at a design, I can tell if I will need extra elements for styling. Even if I miss something, it's much better to add some <code>div</code>s later than wrapping everything preemptively. Pro tip: Start with pen and paper and sketch out the structure of your site before you write a line of code. I usually use a combination of drawing boxes and writing Emmet pseudo code. If you make mistakes, you're making them on paper, which is easier to fix than changing actual code later.
</p>

<p>
  By the way, you can get pretty far without using a single <code>div</code>. Just take a look at the source code of <a href="https://www.erikkroes.nl/">Erik’s</a> website.
</p>

<h2 id="defaultstyles">
  Default styles
</h2>

<blockquote>
  divs are so much easier to style than buttons.
</blockquote>

<p>
  That might have been true in the past, but it's not anymore. Here's what you need to remove the default styles of a button.
</p>

```css
button {
  all: initial;
}
```

<button type="button" style="all:initial" onclick="alert('Yes, that’s a button.')">Look mum, no styles.</button>

If you want to reset everything, but inherit font styling, you need 2 more lines.

```css
button {
  all: initial;
  font: inherit;
  color: inherit;
}
```

<button type="button" style="all:initial; font: inherit; color: inherit" onclick="alert('Yes, that’s a button.')">Look mum, no styles.</button>


<h2 id="thepage">
  We don't care enough about <em>the page</em>
</h2>

<p>
  Many devs don't build pages anymore, they build components. I do that, too, because it makes sense as soon as your site reaches a certain level of complexity. Also, frameworks and pattern libraries think in terms of components which kind of forces you to do that, too.
</p>

<p>
  The problem with working on small pieces is that it's easy to ignore the big picture. We can conceive, design, and develop components, but the end results for users is usually a whole page. A component with 2 or 3 <code>div</code>s might not look bad, but if I nest it in 5 other components, I might end up with 15 <code>div</code>s that don't do anything but increase complexity and file size.
</p>

<h2 id="style">Some elements are hard to style</h2>

Yes, some elements are hard to style. To make our designers or customers happy, we don't use the default `select` element, but we write a complex component that consists of a bunch of divs with aria roles and a lot of JS. Sometimes have to do that, but sometimes it's better to just live with the fact that you can't style `option` elements and use the native component that comes with all the functionality and accessibility by default.

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<h2>So?! What's the point of this post?</h2>

Honestly, I don’t know. I started writing and here we are. I guess I just needed to get these thoughts out of my head. If there’s one thing you can take away from this post, it’s that while HTML might not be the most complex frontend language, it’s the most important language with the biggest impact on users. Learning how to write HTML is not as hard as learning to write JavaScript, but learning how to write it in a way that it best possibly benefits users also takes time. The least we can do is to familiarize ourselves properly with the <a href="https://html.spec.whatwg.org/#semantics">elements and attributes</a> it provides us with. 
