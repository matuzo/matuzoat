---
title: 'Web Security Basics: XSS'
metadescription: >-
  An introduction to Cross Site Scripting and XSS prevention.
date: 2022-02-16T10:50:54.969Z
image: articles/sm_xss.jpg
teaser: "I decided to learn more about areas of web development I don’t know a lot about. You know,…stuff like SEO and web security. I’ll share my findings here on my blog and I’ll try to do as much research as possible, but please keep in mind that I’m a noob concerning these topics."
tags:
  - blog
  - posts
  - security
---

I began watching [Feross Aboukhadijeh](https://feross.org/)’s fantastic [Web Security lecture](https://www.youtube.com/watch?v=5JJrJGZ_LjM&list=PL1y1iaEtjSYiiSGVlL1cHsXN_kvJOOhu-&index=1), which inspired me to learn more about web security. This first post is about Cross Site Scripting (XSS). 

## XSS 

XSS describes the practice of injecting malicious code into an otherwise trusted website, or, in other words, injecting JavaScript into an HTML document. The point of XSS is that the attacker can execute JavaScript on a page by supplying untrusted data and do stuff they otherwise wouldn’t be able to do. For example, reading users’ cookies and sending HTTP requests with these cookies.

There are two types of XSS attacks: server and client XSS.

### Server XSS

Server XSS occurs when the vulnerability is in the server-side code and the browser renders and executes the HTTP response generated by the server, which includes the user supplied untrusted data. For example, this can happen when a hacker exploits the comment field in a blog post by using it to save JavaScript in the database. This JavaScript code then runs every time anyone opens the page with the “comment”.

### Client XSS

Client XSS occurs when the vulnerability is in the client-side code and untrusted user supplied data is used to update the DOM (Document Object Model) with an unsafe JavaScript call. For example, hackers could send out links with malicious `GET` parameters that inject JavaScript into the DOM when the user opens the link.

You can learn more about the different types of XSS and more detailed definitions on the [owasp - Types of XSS](https://owasp.org/www-community/Types_of_Cross-Site_Scripting) page.

## Hack the Planet!

Okay, now let me show how this may look like in practice.

### A simple PHP search form

Let’s say we have a form that allows users to search for a custom term.

```html
<form role="search" method="GET">
  <label for="term">Search term</label>
  <input type="text" id="term" name="q">

  <button>search</button>
</form>
```

<img src="/images/sec1_demo1_1.jpg" alt="A input field labelled “Search term” and a search button." width="500">

When the user enters a term and submits the form, we show the results and a message that says “Showing results for [TERM]”.


```php
<?php 
  if (isset($_GET['q'])):
      echo "<p>Showing results for “<mark class=\"term\">".$_GET['q']."</mark>”</p>";
?>
  <ol>
    <li>Result 1</li>
    <li>Result 2</li>
    <li>Result 3</li>
  </ol>

<?php endif; ?>
```

<img src="/images/sec1_demo1_2.jpg" alt="A Search form that has been submitted showing some dummy results for the term “flowers”." width="500">

Since we’re using the `GET` method, the URL changes `/search?q=flowers`, too. This means that users can share the page with the search query pre-filled. This is where it gets dangerous because instead of searching for a simple string, someone could enter JavaScript.

<img src="/images/sec1_demo1_3.jpg" alt="A search form, not yet submitted, with “<script>Zer0 Cool was here</script>” as the search value" width="500">

If you press <kbd>Enter</kbd>, PHP renders the code on the server which means that it also interprets the user supplied JavaScript. If you share the url `/search?q=%3Cscript%3Ealert%28%22Zer0+cool+was+here%22%29%3C%2Fscript%3E` with someone, the JavaScript in the GET parameter will run in their browser.

<img src="/images/sec1_demo1_4.jpg" alt="An alert with the message “Zer0 Cool was here” on the search page." width="500">

### A simple JS search form
 
Now let’s try the same on a static page with JavaScript.

```html
<!-- Search form -->
<form role="search" method="GET">
  <label for="term">Search term</label>
  <input type="text" id="term" name="q">
  <button>search</button>
</form>

<!-- Results, hidden by default -->
<div data-results hidden>
  <p>
    Showing results for “<mark class="term"></mark>”
  </p>

  <ol>
    <li>Result 1</li>
    <li>Result 2</li>
    <li>Result 3</li>
  </ol>
</div>

<!-- Get search parameters and show the results -->
<script>
  let params = (new URL(document.location)).searchParams;
  let q = params.get('q');

  if (q) {
    document.querySelector('[data-results]').removeAttribute('hidden')
    document.querySelector('input').value = q
    document.querySelector('.term').innerHTML = q
  }
</script>
```
You can see this in action in the [simple JS search form demo](https://matuzo-test1.netlify.app/search).

If we try to search for a string that contains JavaScript `<script>alert("Cereal Killer was here")</script>` on this static page, the alert doesn't pop up. This is because the HTML string is injected and parsed, but the JavaScript doesn’t execute. 

<img src="/images/sec1_demo2_1.jpg" alt="The script tag is visible in dev tools but the search term is empty and there's no alert." width="500">

This is by design:

<div class="quote">
  <blockquote>When inserted using the document.write() method, script elements usually execute (typically blocking further script execution or HTML parsing). When inserted using the innerHTML and outerHTML attributes, they do not execute at all.</blockquote>

  <a href="https://html.spec.whatwg.org/#the-script-element">The script element</a>
</div>

I was trying really hard “to make this work” and the only two ways I found were outdated or obviously wrong.

`document.writeln()` writes to a document and executes the code.

```js
document.writeln(q)
```

The last time I've used `document.writeln()` or `document.write()` was more than a decade ago, but it's still good to know.

`eval()` would execute Javascript if you pass it directly like `alert("Cereal Killer was here")`, but you know what they say, `eval()` is evil, so don't use it.

```js
document.querySelector('.term').innerHTML = eval(q)
```

Injecting a `<script>` tag in a static page seems to be harmless, but there are ways to execute JavaScript without using the `<script>` element.

Consider the following “search term”:  
<strong>&lt;img src="idontexist.jpg" onerror="alert('Acid Burn was here')"&gt;</strong>.

Here's what happens when someone tries to submit this search query: `innerHTML` injects the string and parses it as HTML. The browser tries to load `idontexist.jpg`, but fails because the image doesn't exist on the server. This triggers the [onerror event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror) which fires when a resource fails to load. The event then runs our JavaScript. 


<img src="/images/sec1_demo2_2.jpg" alt="An alert with the message Acid Burn was here” on the search page." width="500">

Try it yourself [in this demo](https://matuzo-test1.netlify.app/search).

## XSS prevention

The are many things you should and could do to prevent XSS attacks. I suggest you read the [XSS Prevention Rules](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#xss-prevention-rules) on the owasp website. Most importantly, you should control where users can enter data and you should escape/HTML encode the data. This means turning critical characters like `&`, `<`, `>`,`"`, and `'` into entities. You can use a package like [escape-html](https://www.npmjs.com/package/escape-html) for that.

```html
<script type="module">
  import { escapeHtml } from './escape-html.mjs';

  let params = (new URL(document.location)).searchParams;
  let q = params.get('q');

  if (q) {
    document.querySelector('[data-results]').removeAttribute('hidden')
    document.querySelector('input').value = q
    document.querySelector('.term').innerHTML = escapeHtml(q)
  }
</script>
```

<img src="/images/sec1_demo2_3.jpg" alt="A input field labelled “Search term” and a search button." width="710">

Try it yourself in the [search form with escaped content demo](https://matuzo-test1.netlify.app/search2?q=%3Cimg+src%3D%22idontexist.jpg%22+onerror%3D%22alert%28%27Acid+Burn+was+here%27%29%22%3E).

## Alerta Alerta

Most examples of XSS you find online use `alert()` to demonstrate vulnerabilities. You can’t do much harm with `alert()`, it’s just a nice way of showing that JavaScript can be injected. There are other dangerous methods you can execute, though. I’ll show you in the next blog post how XSS can be used to steal cookies.

As already mentioned, I'm pretty new to this topic. If I got something wrong or if I missed something, please get in touch [via e-mail](mailto:manuel@matuzo.at).