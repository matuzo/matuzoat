---
title: "Why I'm not the biggest fan of Single Page Applications"
date: 2023-02-10T08:46:54.969Z
image: articles/sm_spa.jpg
teaser: "Sometimes it seems like accessibility experts and other web professionals hate JavaScript. This might be true for some, but most understand that JavaScript can be useful for improving UX and even accessibility. JavaScript solutions are often more accessible than their [pure HTML](https://daverupert.com/2020/02/html-the-inaccessible-parts/) or [CSS counterparts](https://www.smashingmagazine.com/2021/06/css-javascript-requirements-accessible-components/)."
tags:
  - blog
  - posts
  - a11y
---

We know [JavaScript is not an enemy](https://www.marcozehe.de/javascript-not-enemy-accessibility/), but, admittedly, there is a certain reluctance towards building client-side rendered websites by some developers. These people are often dismissed as the “old guard” because of their seemingly irrational aversion towards modern web development. If you don’t understand where this is coming from, it might seem incomprehensible why someone would not want to build single page applications (SPA), but go for the standard way of building websites, sometimes referred to as multi page applications (MPA), instead. 

There has been a lot of criticism about SPAs and especially React recently. On a personal level, I can absolutely understand that. I don’t like Meta and their business model; I don’t like how React thought leaders [sold their library as something that it’s not](https://infrequently.org/2023/02/the-market-for-lemons/#what-did-they-know-and-when-did-they-know-it%3F), and I don’t like the bro culture that sparked from this whole thing. On a professional level, I understand that there are people for whom React is nothing more than a tool or a .js file. People who, you know,…just build websites for a living. Although I’m not happy about it, I also understand that JS libraries and frameworks are often the entry point to web development for new web developers. Nevertheless, there is also valid and serious professional criticism. With this post I’m not trying to convince anyone to build their websites differently, I just want to share my view and my experiences as someone who has been building websites for over 20 years, and I try to summarize reasons why some developers, including me, are wary of building SPAs. Before I give you some examples, let me say one important thing: I know that it’s possible to create accessible single page applications and I know that there are people who work with JS frameworks (because they want to or have to), and optimise the shit out of their websites because they care about their users.

<hr>

A lot of the scepticism comes from the fact that some critical features of a website work fundamentally different in single page applications. 
## Routing

When you create 3 HTML documents, let’s call them home.html, about.html, and dashboard.html, and you link them, clicking a link the following happens: The browser navigates to the new page, the page loads, the title of the page changes in the browser’s tab, focus is on the body, and, if you’re using a screen reader, the software announces the title of the page. Of course, a lot more happens. This is a simplified and incomplete depiction of the process, but the important bit is that no matter how you’re accessing and activating the link (mouse, screen reader, touch, [switch device](https://youtu.be/V1yoOLhx_qA), etc.), you know what happened, that something happened, and where you are. The loading process and the transition from one page to another tell you that you’ve navigated to a new page. Focus is at the beginning of the DOM, where you would expect it, and your screen reader announces the title of the page automatically.

<figure>
<video src="/images/routing_default.mov" controls></video>
<figcaption>When I click a link, NVDA, the screen reader I'm using, announces the title of the page, for example “Dashboard - My Website”.</figcaption>
</figure>

In a Single Page Application, you create only one HTML document and you replace the main content of the page when the user clicks a link. To achieve that, you may have to use a routing library like React Router. Compared to the process of native routing I’ve described earlier, the following happens: DOM content changes, focus is still on the link, the title in the browser tab doesn’t change, and a screen reader announces nothing. If you’re lucky, you know what happened, that something happened, and where you are. If you’re a blind screen reader user, you’ll most likely get no feedback at all.

<figure>
<video src="/images/routing_spa.mov" controls></video>
<figcaption>When I click a link, NVDA announces nothing.</figcaption>
</figure>

While not intentionally, single page applications, at least in terms of page navigation, are inaccessible by design. The creators of reach router did their best to make routing accessible by managing focus, but since data loading and focus management on route transitions are coupled, it was [too complicated to do it correctly](https://github.com/remix-run/react-router/discussions/9555?sort=new). Despite all their efforts, routing became completely inaccessible again, when [reach router and react router](https://reactrouter.com/en/main/upgrading/reach) merged and they stopped <q>doing not-good-enough focus management by default</q>.

Custom routing and focus management done right can actually work even better than the native behaviour without JavaScript, but it must be built manually. You don’t see that in many SPAs unfortunately. I’d rather serve users with the not so great, but consistent default experience than no experience at all.  
Anyway, there's a lot we can learn from SPAs and from people with accessbility in mind working with them. There’s fantastic research about that topic by Marcy Sutton (“[What we learned from user testing of accessible client-side routing techniques with Fable Tech Labs](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/)”).

**Note**: In the previous demo I was using “Create React App”, one of the [recommended toolchains](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains) and the [basic example in React Router](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/basic?file=src/main.tsx). I can imagine that there are frameworks that support accessible routing by default.

## The document title

The `<title>` of the page is one of the most important elements in a HTML document. Users benefit from a well-formed and descriptive page title in many ways. 

To mitigate inaccessible routing and the missing feedback after clicking a link, screen reader users help themselves by pressing shortcuts that announce the title of the page. The page title tells them on which page they are. So even if there’s no feedback, they know they’re on a new page when the title has changed. If the title has changed! In a SPA, you usually have to implement title management manually. Again, this is something that just works in native routing. 

<div class="table-wrapper">
<table>
  <caption>Screen reader shortcuts for announcing the page title</caption>
  <thead>
    <tr>
      <th>Screen Reader</th>
      <th>Command</th>
      <th>Announcement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>NVDA</td>
      <td><kbd>Ins</kbd> + <kbd>T</kbd></td>
      <td>Page title</td>
    </tr>
    <tr>
      <td>JAWS</td>
      <td><kbd>Ins</kbd> + <kbd>T</kbd></td>
      <td>Page title</td>
    </tr>
    <tr>
      <td>Voice Over on macOS</td>
      <td><kbd>VO</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd></td>
      <td>Page summary, including page title</td>
    </tr>
    <tr>
      <td>Voice Over on macOS</td>
      <td><kbd>VO</kbd> + <kbd>F2</kbd></td>
      <td>Page title</td>
    </tr>
  </tbody>
</table>
</div>

There are more reasons you'd want to change the page title. It serves as the label for bookmarked pages/favorites, and search engines use the title in their search results pages. Social media sites, chat or mail applications, and similar software use the title in link previews when no other title is specified.

Before you start sending me links: I know that it's possible, I've done my research. My point is, that it's yet another thing you have to reimplement manually. 

* [Accessible page titles in a Single Page App](https://hidde.blog/accessible-page-titles-in-a-single-page-app/) by Hidde de Vries
* [React Document Title](https://github.com/gaearon/react-document-title)
* [React Helmet](https://github.com/nfl/react-helmet)
* [Vue-meta](https://github.com/nuxt/vue-meta)

## DOM changes

DOM changes are not specific to SPAs, but to using JavaScript in general. The thing is that reactive DOM changes are at the very core of single page applications. For every significant change you make, you have to communicate that change not just visually, but also semantically. [Live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions), ARIA attributes, or focus management can help with that. You won’t find any information about live regions or focus management in this context in the [official React accessibility docs](https://reactjs.org/docs/accessibility.html), the [Vue accessibility docs](https://vuejs.org/guide/best-practices/accessibility.html), or the [Angular docs](https://github.com/nuxt/vue-meta).  
The more JavaScript we add to our page, the more fragile our interface gets and the more we have to manage and communicate manually, if we want to create [equal experiences for all](https://inclusivedesignprinciples.org/#provide-comparable-experience).

## JSX

JSX kinda looks like HTML, but it’s not really HTML because it’s a mix of HTML with component tags and made-up attributes (I’m talking about you `className`). I know that React doesn’t require using JSX, but many new devs learn React and JSX first (and only), because boot camps and indoctrinated communities tell them it's the only real way to build websites and they need to know React in order to get a job. This abstraction can be terrible if you don’t understand the difference between the actual standard (HTML) and the abstraction layer. We’re already [really bad at writing native HTML](https://www.youtube.com/watch?v=Wno1IhEBTxc) and a language that obfuscates the standard language doesn’t make things better.

```js
<li className="item">
  {isPacked ? (
    <del>
      {name + ' ✔'}
    </del>
  ) : (
    name
  )}
</li>
```

Before we choose to work with any language that is not native HTML, but compiles to HTML, we should [learn HTML](https://web.dev/learn/html/) first. This doesn’t just apply to JSX, but Markdown, Pug, NunJucks, etc. Our input will be much better if we know how the output should look like.

## The page context

In SPAs, you create components. A component might be part of another component, and another component until it finally ends up in the wrapper `<div>` of your index.html. If you look at the final document of most SPAs, the page doesn’t look like a coherent entity, but more like a dump for components that happen to form a page visually. As already mentioned, HTML is a cornerstone of any accessible website and the page structure (a sound heading outline, landmarks, DOM order, semantic HTML in general) plays an important role. 

Don’t get me wrong, I also build components that are part of a system, but I also spend a good amount of time crafting pages that work well. The fact that the HTML document is something that you barely touch, because everything you need in there will be injected via JavaScript, puts the document and the page structure out of focus.  
I don’t suggest that a component-based approach is wrong, not even one that is written in a JavaScript environment, quite the opposite, but just because it’s more convenient and efficient to work with a JS framework, doesn’t mean that we have to serve all that JavaScript to the client. The traditional way of serving websites entirely on the client is outdated, but I also don’t believe that concepts like hydration are much better.  
It’s worth exploring approaches that separate concerns and try to minimize the amount of JS shipped. Some notable projects are [Lit](https://lit.dev/), [Astro](https://astro.build/), [Svelte](https://svelte.dev/), or [WebC](https://github.com/11ty/webc).

## Performance

Most SPAs probably perform well on my 3,500 Euro laptop and my 500 Euro smartphone, but a Macbook Pro and Huawai P30 are not necessarily the average device the average user uses to access the web. I’m not in the position to talk about the performance implications of client-site rendering and especially React, but there has been [a lot of criticism early on](https://www.zachleat.com/web/react-criticism/) because SPAs just don’t perform as well as thought leaders at Meta or Vercel [used to make you think](https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741).

I suggest you read the following articles:

* [The Performance Inequality Gap, 2023](https://infrequently.org/2022/12/performance-baseline-2023/)
* [The Market for Lemons](https://infrequently.org/2023/02/the-market-for-lemons/)
* [A historical reference of react criticism](https://www.zachleat.com/web/react-criticism/)
* [Speed for who?](https://andy-bell.co.uk/speed-for-who/)

## Complexity

Setting up a SPA from scratch is not simple, it involves many tedious steps. Even if you use one of the boilerplate setups, you’re handling a compound dependency monster that just waits to ruin your day because one tiny detail doesn’t work out of the box the way you want it. There’s so much complexity in these things that it makes some people doubt whether it’s worth the effort and if it’s not maybe smarter to spend the time working on something else, something that actually benefits users.

I guess the biggest criticism here is that it feels like people who believe in the superiority of single page applications and the entire ecosystem focus more on developer experience (DX) than user experience. That sounds like a dangerous blanket statement, but after all these years, I never had the feeling that the argument “better DX leads to better UX” was ever true. It’s nothing more than a justification for the immense complexity and potentially significantly worse UX. And even if the core argument isn't DX, other arguments like scalability, maintainability, competitive ability, easier recruiting (“everyone uses React”), and cost effectiveness, in my experience, only sound good, but rarely hold up to their promises.

# Conclusion

I hope this didn’t come off as a rant, it’s not. I’m just trying to explain why SPAs are not the first choice or no choice at all for some people. I’m glad that this diverse landscape of tools exists because we can learn from innovation and use this knowledge to create better experiences. I’ve worked with several JS libraries and frameworks, because it pays the bills, but I’ve never used one for my own projects and I’ve never consulted a client to do so, and I probably never will. The simple reason is that I build websites most of the time, and not complex applications. There is a place and time for JS frameworks and client side rendering, but it’s usually not the right choice for the typical website.