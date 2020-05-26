---
title: 'Here’s what I didn’t know about “content”'
metadescription: >-
  In part 3 of my series I'm trying to find out what I didn’t know about the `content` property.
date: 2020-05-26T06:58:54.969Z
image: articles/sm_content.jpg
teaser: "This is part 3 of my series [Here’s what I didn’t know about…](/blog/heres-what-i-didnt-know/) in which I try to learn new things about CSS. This time I'm trying to find out what I didn’t know about the `content` property."
tags:
  - css
publication: Matuzo
draft: false
archive: false
---

A few weeks ago Stefan published a post on his website called “[The CSS "content" property accepts alternative text](https://www.stefanjudis.com/today-i-learned/css-content-accepts-alternative-text/)”, which blew my mind. He showed that the `content` property excepts 2 values and not just 1, the actual content and an alternative text. 

```css
.new-item::before {
  /* "Highlighted item" and element content is read out */
  content: "★" / "Highlighted item";
}
```

I didn’t know that and I was wondering if there were more things I didn’t know about the `content` property. Since you’re reading this, I found something, so let’s see what I was able to add to my  [“Here’s what I didn’t know about…”](https://www.matuzo.at/blog/heres-what-i-didnt-know/) series.

## How I’m using the content attribute.

Before I started my research, I was using this property primarily for 3 things.

### Adding an element to another element using pseudo elements

If I want to create a simple shape in CSS that is not a rectangle or circle, I use `:after` and `::before` to give myself more options for styling.
<style>
  .contentdemo1 {
    width: 70px;
    height: 50px;
    margin-top: 15px;
    
    border: 5px solid #123456;
    border-radius: 5px;

    position: relative;
  }

  .contentdemo1::before {
    content: "";
    
    position: absolute;
    left: 0;
    right: 0;
    top: -16px;
    
    width: 20px;
    height: 20px;
    margin: auto;

    border: solid #123456;
    border-width: 5px 5px 0 0;
    border-radius: 5px;

    transform: rotate(-45deg);
    background: #efefef;
  }
</style>
<div class="contentdemo1"></div>

```html
  <div></div>
```

```css
div {
  width: 70px;
  height: 50px;
  margin-top: 15px;
  
  border: 5px solid #123456;
  border-radius: 5px;

  position: relative;
}

div::before {
  content: "";
  
  position: absolute;
  left: 0; right: 0; top: -16px;
  
  width: 20px; height: 20px;
  margin: auto;

  border: solid #123456;
  border-width: 5px 5px 0 0;
  border-radius: 5px;

  transform: rotate(-45deg);
  background: #fff;
}
```

Checkout [example 1 on CodePen](https://codepen.io/matuzo/pen/eYpLKdz).

To render on screen, the pseudo elements needs the `content` attribute.

### Revealing URLs in print styles sheets

Printed links are useless if you don’t know where there are leading. I’m using a combination of `content` and the `attr()` function in print style sheets to display URLs next to their linked text.

<style>
	.contentdemo2[href^="http://"]:after,
	.contentdemo2[href^="https://"]:after {
	  content: " (" attr(href) ")";
	}
</style>

<a href="https://mxb.dev/" class="contentdemo2">Max Böck</a>

```css
@media print {
  a[href^="http://"]:after,
  a[href^="https://"]:after {
    content: " (" attr(href) ")";
  }
}
```

### Custom counters

Every now and then I need custom counters in lists. A combination of `content` and counter properties usually does the job.


<style>
	.contentdemo3 {
    list-style-type: none;
    counter-reset: mylist;
  }

  .contentdemo3 > li {
    counter-increment: mylist;
  }

  .contentdemo3 > li::before {
    content: "🤤 " counter(mylist) ": "
  }
</style>

<ol class="contentdemo3">
  <li>Element 001</li>
  <li>Element 002</li>
  <li>Element 003</li>
</ol>



```html
<ol>
  <li>Element 001</li>
  <li>Element 002</li>
  <li>Element 003</li>
</ol>
```

```css
ol {
  list-style-type: none;
  counter-reset: mylist;
}

li {
  counter-increment: mylist;
}

li::before {
  content: "🤤 " counter(mylist) ": "
}
```

Checkout [example 2 on CodePen](https://codepen.io/matuzo/pen/eYpLKGg).

Have a look at [Here’s what I didn’t know about list-style-type](https://www.matuzo.at/blog/heres-what-i-didnt-know-about-list-style-type/) for more options to style list items.

Now, let’s see what else `content` can do for us. Here’s what I’ve learned recently:

## Content accepts images and gradients

I knew that `content` accepts the `counter` and `attr` functions, but it never came to my mind that it might allow other functions, as well. Whenever I needed an image in a pseudo element, I would use `background-image`, although `content` would've worked, too.

<style>
.contentdemo7::before {
  content: url('/static/img/articles/pin.png');
}
</style>
<div class="contentdemo7"></div>

```css
div::before {
  content: url('pin.png');
}
```

Checkout [example 3 on CodePen](https://codepen.io/matuzo/pen/yLYZgqO?editors=1100).

If this works with images, it should work with gradients too, right? Yeah, well, no. Chrome seems to be the only browser that renders pseudo elements with gradient content values.

```css
div::before {
  content: linear-gradient(blue, red);
  height: 50px;
  width: 50px;
  display: block;
  border: 1px solid red;
}
```

Checkout [example 4 on CodePen](https://codepen.io/matuzo/pen/WNQPRPv?editors=1100).

## You can define alt text for content values (…in Chrome)

What’s the point of using `content` when `background-image` has better support? The reason Stefan wrote his post, `content` supports alt text.

```css
div::before {
  content: url('pin.png') / "You are here."
}
```

Checkout [example 5 on CodePen](https://codepen.io/matuzo/pen/ZEbweNj?editors=1100).

Unfortunately, this only works in Chrome (tested on macOS 10.15.4, Chrome 81 with VoiceOver). Firefox and Safari don't even render the pseudo element because the value is invalid. Too bad.

## You can combine text and images

Nor did I know that you can use the `url()` function as a value, I also didn’t know that you can combine it with text.

<style>
	.contentdemo4::before {
  content: url('/static/img/articles/pin.png') "You are here."
}
</style>

<div class="contentdemo4"></div>


```css
div::before {
  content: url('pin.png') "You are here."
}
```

Checkout [example 6 on CodePen](https://codepen.io/matuzo/pen/xxwMLgJ?editors=1100).


## You can only replace the content of a regular element with an &lt;image&gt;

The `content` property is meant to be used with pseudo elements. You can’t use it to replace a string in an element with another string. This won’t work:

```css
div {
  content: "You are here";
}
```

But you can use it to replace a string with an image. The string is still in the <abbr title="Document Object Model">DOM</abbr> but screen readers announce the filename. (You can do it, but you shouldn’t.)

<style>
	.contentdemo5 {
  content: url('/static/img/articles/pin.png');
  }
</style>

<div class="contentdemo5">You are here!</div>

```html
<div>You are here!</div>
```

```css
div {
  content: url('pin.png');
}
```

Checkout [example 7 on CodePen](https://codepen.io/matuzo/pen/pojGrPw?editors=1100).


## There are quotes and no-quotes

Okay, now this one is really cool. Let’s say we have a quote nested in another quote.

```html
<blockquote>
  My mama always said,  
  <q>
    Life was like a box of chocolates. You never know what you’re gonna get
  </q>.
</blockquote>
```
<style>
  .contentdemoquote {
    margin-bottom: 3rem !important;
    font-weight: bold;
  }

  .contentdemoquote::before {
    display: none;
    transform: none !important;
    border: none !important;
    width: auto !important;
    height: auto !important;
    position: static !important;
  }
</style>

<blockquote class="contentdemoquote">
  My mama always said,  
  <q>
    Life was like a box of chocolates. You never know what you’re gonna get.
  </q>
</blockquote>

What you should see in the above example is that the `blockquote` has no quotes and `q` has double quotes.

If we add opening and closing quotes to the `blockquote` using pseudo elements and the `content` property, the `blockquote` now displays double quotes and the `q` automatically single quotes.

```css
blockquote::before {
  content: open-quote
}

blockquote::after {
  content: close-quote
}
```

<style>
  .contentdemoquote2::before {
    content: open-quote  !important;
    display: inline;
  }

  .contentdemoquote2::after {
    content: close-quote;
  }
</style>

<blockquote class="contentdemoquote contentdemoquote2">
  My mama always said,  
  <q>
    Life was like a box of chocolates. You never know what you’re gonna get.
  </q>
</blockquote>

Nice! To top it all off, we can even have a combination of the two variations, `blockquote` with no quotes and `q` with single quotes.

```css
blockquote::before {
  content: no-open-quote;
}

blockquote::after {
  content: no-close-quote;
}
```

<style>
  .contentdemoquote3::before {
    content: no-open-quote !important;
    display: inline;
  }

  .contentdemoquote3::after {
    content: no-close-quote;
  }
</style>

<blockquote class="contentdemoquote contentdemoquote3">
  My mama always said,  
  <q>
    Life was like a box of chocolates. You never know what you’re gonna get.
  </q>
</blockquote>

The `no-open-quote` and `no-close-quote` keywords don’t insert anything, but increment the quotation depth by one.

### Nested quotes in different languages

Just because I was curious, here are some variations of the second example in other languages.

#### French

```html
<blockquote lang="fr">
  My mama always said,  
  <q>  
    Life was like a box of chocolates. You never know what you’re gonna get.  
  </q>
</blockquote>
```

<blockquote lang="fr" class="contentdemoquote contentdemoquote2">
  My mama always said,  
  <q>  
    Life was like a box of chocolates. You never know what you’re gonna get.  
  </q>
</blockquote>

#### Russian
```html
<blockquote lang="ru">
  My mama always said,  
  <q>  
    Life was like a box of chocolates. You never know what you’re gonna get.  
  </q>
</blockquote>
```

<blockquote lang="ru" class="contentdemoquote contentdemoquote2">
  My mama always said,  
  <q>  
    Life was like a box of chocolates. You never know what you’re gonna get.  
  </q>
</blockquote>

#### German

```html
<blockquote lang="de">
  My mama always said,  
  <q>  
    Life was like a box of chocolates. You never know what you’re gonna get.  
  </q>
</blockquote>
```

<blockquote lang="de" class="contentdemoquote contentdemoquote2">
  My mama always said,  
  <q>  
    Life was like a box of chocolates. You never know what you’re gonna get.  
  </q>
</blockquote>

#### Spanish

```html
<blockquote lang="es">
  My mama always said,  
  <q>  
    Life was like a box of chocolates. You never know what you’re gonna get.  
  </q>
</blockquote>
```

<blockquote lang="es" class="contentdemoquote contentdemoquote2">
  My mama always said,  
  <q>  
    Life was like a box of chocolates. You never know what you’re gonna get.  
  </q>
</blockquote>


## There’s counter() and counters()

I'm really not sure if I was aware of the fact there isn’t just a `counter()` but also a `counters()` function. However, the difference is that `counters()` enables nested custom counters.

<style>
.contentdemo6 {
  list-style-type: none;
  counter-reset: mylist;
}

.contentdemo6 ol {
  list-style-type: none;
  counter-reset: mylist;
}

.contentdemo6 li {
  counter-increment: mylist;
}

.contentdemo6  li::before {
  content: "🤤 " counters(mylist, ".") ": "
}
</style>

<ol class="contentdemo6">
  <li>
    Element 001
  
  <ol>
    <li>Element 001</li>
    <li>Element 002</li>
    <li>Element 003</li>
  </ol>
  </li>
  <li>Element 002</li>
  <li>Element 003</li>
</ol>


```html
<ol>
  <li>
    Element 001
    <ol>
      <li>Element 001</li>
      <li>Element 002</li>
      <li>Element 003</li>
    </ol>
  </li>
  <li>Element 002</li>
  <li>Element 003</li>
</ol>
```

```css
ol {
  list-style-type: none;
  counter-reset: mylist;
}

li {
  counter-increment: mylist;
}

li::before {
  content: "🤤 " counters(mylist, ".") ": "
}
```

Checkout [example 8 on CodePen](https://codepen.io/matuzo/pen/ZEbwMNR).

Wow, that was a lot. I didn’t expect to write and learn so much. I hope that you’ve learned as much as I did. 

Thanks for reading ❤️ and thanks to Stefan for the inspiration for this post.
