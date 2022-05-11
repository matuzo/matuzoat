---
title: 'Divs are bad!'
metadescription: >-

date: 2022-05-11T10:50:54.969Z
image: articles/sm_divbad.jpg
teaser: "Yes, clickbait, I’m so sorry! Of course, divs are not bad. For example, they can be really useful,…

* …when you need additional elements for styling.

* …for structuring content, when there’s no other suitable element.

* …when you need custom [landmarks](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html).


Even though there’s nothing wrong with the `div` per se, some people, including me, still like to complain when they’re not used consciously."
tags:
  - blog
  - posts
  - html
---
The issue with `div`s is not the quantity, although a large [DOM can affect performance](https://www.youtube.com/watch?v=kLm0grHWHxI) negatively, and an unnecessarily large document is harder to read and debug. The real problem is the placement. If you put a `div` in the wrong place, it can have serious negative side effects. 

Here are some examples:

## details and summary

If you wrap the contents of a `details` element in a `div`, the browser or a screen reader might not recognize the `summary` element properly and display and announce a fallback text instead.

<p class="code-label">
  <strong>Wrong</strong>
</p>

```html
<details>
  <div>
    <summary>Show info</summary>
    Hi, I'm the info!
  </div>
</details>
```

<!-- [html-validate-disable element-required-content] -->
<details>
  <div>
    <summary>Show info</summary>
    Hi, I'm the info!
  </div>
</details>

<p class="code-label">
  <strong>Right</strong>
</p>

```html
<details>
  <summary>Show info</summary>
  Hi, I'm the info!
</details>
```

<details>
  <summary>Show info</summary>
  Hi, I'm the info!
</details>

## figure

If you wrap the contents of a `figure` element in a `div`, the `figcaption` might not be recognized as the caption for the `figure`. Visually this probably has no effect, but the `figure` might not be exposed to assistive technology when it doesn't have an accessible name.

<p class="code-label">
  <strong>Wrong</strong>
</p>

```html
<figure>
  <img src="/images/gus.jpg" width="400" alt="Gus Polinski.">
  
  <div>
    <figcaption>
      The Polka King of the Midwest talking to a desperate mother.
    </figcaption>
  </div>
</figure>
```

<figure>
  <img src="/images/gus.jpg" width="400" alt="Gus Polinski.">
  
  <div>
    <figcaption>
      The Polka King of the Midwest talking to a desperate mother.
    </figcaption>
  </div>
</figure>

<p class="code-label">
  <strong>Right</strong>
</p>

```html
<figure>
  <img src="/images/gus.jpg" width="400" alt="Gus Polinski.">

  <figcaption>
    The Polka King of the Midwest talking to a desperate mother.
  </figcaption>
</figure>
```

<figure>
  <img src="/images/gus.jpg" width="400" alt="Gus Polinski.">
  <figcaption>
    The Polka King of the Midwest talking to a desperate mother.
  </figcaption>
</figure>

## fieldsets

A `fieldset` gets its label from the `legend` element. If the `legend` is wrapped in a `div`, the `fieldset` has no accessible name. This may cause the group of radio buttons not being announced as a group and the `legend` might not have a sematic relation with the radio buttons. The visual appearance breaks as well. The legend isn’t positioned on the border of the fieldset, but below it.

<p class="code-label">
  <strong>Wrong</strong>
</p>

```html
<fieldset>
  <div>
    <legend>Shirt sizes</legend>
    
    <div>
      <input type="radio" id="l" name="shirt1">
      <label for="l">Large</label>
    </div>
    <div>
      <input type="radio" id="m" name="shirt1">
      <label for="m">Medium</label>
    </div>
  </div>
</fieldset>
```

<!-- [html-validate-disable wcag/h71] -->
<fieldset>
  <div>
  <legend>Shirt sizes</legend>
    
  <div>
    <input type="radio" id="l" name="shirt1">
    <label for="l">Large</label>
  </div>
  <div>
    <input type="radio" id="m" name="shirt1">
    <label for="m">Medium</label>
  </div>
  </div>
</fieldset>

<p class="code-label">
  <strong>Right</strong>
</p>

```html
<fieldset>
  <legend>Shirt sizes</legend>
  
  <div>
    <input type="radio" id="l2" name="shirt2">
    <label for="l2">Large</label>
  </div>
  <div>
    <input type="radio" id="m2" name="shirt2">
    <label for="m2">Medium</label>
  </div>
</fieldset>
```

<fieldset>
  <legend>Shirt sizes</legend>
    
  <div>
    <input type="radio" id="l2" name="shirt2">
    <label for="l2">Large</label>
  </div>
  <div>
    <input type="radio" id="m2" name="shirt2">
    <label for="m2">Medium</label>
  </div>
</fieldset>

## lists

`ul` and `ol` must only directly contain `li`, `script` or `template` elements. Wrapping all list items in a `div` may change the way list items get announced by a screen reader.

<p class="code-label">
  <strong>Wrong</strong>
</p>

```html
<ul>
  <div>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </div>
</ul>
```

<ul>
  <div>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </div>
</ul>

<p class="code-label">
  <strong>Right</strong>
</p>

```html
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>
```

<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>

I’ve seen all these wrong implementations (or variations of them) on several websites.

## How do we prevent that?

Before launching a site, when you deploy changes to an existing component or page or when you add a new component, validate the rendered markup. You can use the [validation bookmarklet](https://dequeuniversity.com/validator) by Deque for that. It works both with server- and client-side rendered pages. 

If you’re working with a JavaScript library or framework that demands that you wrap all items within the component in a parent element, before immediately going for the `div`, check first if you can use a [fragment](https://reactjs.org/docs/fragments.html) instead or if there’s a more suitable semantic element you could use. 
