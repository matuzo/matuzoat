---
title: 'Buttons and the Baader–Meinhof phenomenon'
metadescription: 'A collection of accessible button patterns.'
date: 2022-09-15T09:38:54.969Z
image: articles/sm_baader-button.jpg
teaser: "Shortly after we got our new car, a Volkswagen T5, I noticed many people seemed to have the same car. Actually, it was everywhere. "
tags:
  - blog
  - posts
  - css
---
It felt like everyone had the same car. While sales of camping vans and cars that can be used for camping in fact have increased during the pandemic, there’s another reason I saw so many of them, the [Frequency illusion or Baader–Meinhof phenomenon](https://en.wikipedia.org/wiki/Frequency_illusion).

<div class="quote">
<blockquote>The Frequency illusion, also known as the Baader–Meinhof phenomenon or frequency bias, is a cognitive bias in which, after noticing something for the first time, there is a tendency to notice it more often, leading someone to believe that it has an increased frequency of occurrence.</blockquote></div>

Shortly after I started [HTMHell](https://www.htmhell.dev/) a similar thing happened. Every other website seemed to have inaccessible buttons. While this can be explained by the Baader–Meinhof phenomenon, there’s actually data that confirms my feeling. According to the [WebAim 1 Million report](https://webaim.org/projects/million/#errors), 50.1% of 1 million tested websites contained empty links and 27.2% empty buttons. 

So, it was [more than a feeling](https://www.youtube.com/watch?v=zOILAZHf2pE). We are terrible at labelling buttons. I understand that this can be confusing, because there are many different ways of getting the job done.  
To help with that issue, I've collected different correct and wrong ways of labelling buttons:

## How to label buttons

<style>
  button {
    border: 2px solid #153a51;
    background-color: #fff;
    font-family: inherit;
    font-size: 1.3rem;
    padding: 0.3em 0.6em;
    border-radius: 4px;
    font-weight: bold;
    display: flex;
    gap: 0.5rem;
  }

  .post  button img {
    border: none;
  }

  button:where(:hover, :focus) {
    background-color: hsl(186, 56%, 48%);
    color: #fff;
  }
</style>

### Text only

The all-time classic “just using visible text” works for everyone.

<button type="button">Tweet!</button>

```html
<button type="button">Tweet!</button>
```

### Text and Icon

It’s absolutely fine if you want to add an image or icon to the button. Just make sure to hide it from assistive technology using `aria-hidden="true"`. The text label of the button should be sufficient, we don’t need extra information.

<button type="button">
  <svg aria-hidden="true" width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
  Tweet!
</button>

```html
<button type="button">
  <svg aria-hidden="true" width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>

  Tweet!
</button>
```

Sometimes you want to use an icon only. First, you should be really sure that people understand the purpose of the button without text, and second, label it properly. Just because there’s no text visible on screen doesn’t mean that there doesn’t have to be text in the document.  
There are different ways of creating icon-only buttons.  


### Icon-only using a sr-only class

You can put text inside the button and hide it visually using a custom class.

<button type="button">
  <svg aria-hidden="true" width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
  <span class="u-vh">Tweet!</span>
</button>

```html
<button type="button">
  <span class="sr-only">Tweet!</span>

  <svg aria-hidden="true" width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
</button>
```

```css
.sr-only {
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


### Icon-only using aria-label on the button

You can add a text alternative for the icon using `aria-label` on the button.

<button aria-label="Tweet!" type="button">
  <svg aria-hidden="true" width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
</button>

```html
<button aria-label="Tweet!" type="button">
  <svg aria-hidden="true" width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
</button>
```

### Icon-only using aria-labelledby on the button

If the label you want to use already exists somewhere on the page, you can reference it using `aria-labelledby`.

<h2 id="heading" role="presentation" style="font-size: 1.5rem">Tweet!</h2>

<button aria-labelledby="heading" type="button">
  <svg aria-hidden="true" width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
</button>

```html
<h2 id="heading">Tweet!</h2>

<button aria-labelledby="heading" type="button">
  <svg aria-hidden="true" width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
</button>
```

### Icon-only using title inside the svg

The `<title>` element inside the `<svg>` can serve as the accessible name for the button. Unfortunately, in order for this to work properly with all screen readers and browsers, you have to label the `<svg>` using `aria-labelledby` explicitly.

<button type="button">
  <svg aria-labelledby="title_twitter_h72d" width="28" height="28">
    <title id="title_twitter_h72d">Tweet!</title>
    <use xlink:href="#twitter"></use>
  </svg>
</button>

```html
<button type="button">
  <svg aria-labelledby="title_twitter_h72d" width="28" height="28">
    <title id="title_twitter_h72d">Tweet!</title>
    <use xlink:href="#twitter"></use>
  </svg>
</button>
```
### Icon-only using alt attribute

If you’re using an `<img>` element instead of `<svg>`, then the `alt` attribute serves as the accessible name of the button.

<button type="button">
  <img src="/images/twitter.png" alt="Tweet!" width="28">
</button>  

```html
<button type="button">
  <img src="/images/twitter.png" alt="Tweet!" width="28">
</button>  
```

### Icon-only using background-image

If you’re using a background image, the best option is to add visually hidden text to the button. `aria-label` or `aria-labelledby` would work, too.

<style>
  .bgimg {
    background: url(/images/twitter.png);
    width: 3.57rem;
    height: 2.8rem;
    background-size: 56%;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>

<button type="button" class="bgimg">
  <span class="u-vh">Tweet!</span>
</button>  

```html
<button type="button">
  <span class="sr-only">Tweet!</span>
</button>  
```

```css
button {
  background: url(/images/twitter.png) no-repeat center;
}
```

## How not to label buttons

Here are some of the wrong solutions I see often. Don’t do this!

### No Text

Don’t do this!

<button type="button" class="bgimg"></button>

```html
<button type="button"></button>
```

```css
button {
  background: url(/images/twitter.png) no-repeat center;
}
```

### No text alternative for svg

Don’t do this!

<button type="button">
  <svg width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
</button>

```html
<button type="button">
  <svg width="28" height="28">
    <use xlink:href="#twitter"></use>
  </svg>
</button>
```

### No text alternative for img

Don’t do this!

<button type="button">
  <img src="/images/twitter.png" alt="" width="28">
</button>  

```html
<button type="button">
  <img src="/images/twitter.png" alt="" width="28">
</button>
```

or
<!-- [html-validate-disable wcag/h37] -->
<button type="button">
  <img src="/images/twitter.png" width="28">
</button>  
<!-- [html-validate-enable wcag/h37] -->

```html
<button type="button">
  <img src="/images/twitter.png" width="28">
</button>
```

<div>
<svg>
    <symbol id="twitter" fill="currentcolor" viewBox="0 0 512 512">
      <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"></path>
    </symbol>
</svg> 
</div>
