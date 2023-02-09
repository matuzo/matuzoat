---
title: "Why I'm not the biggest fan of Single Page Applications"
date: 2023-02-09T09:38:54.969Z
image: articles/sm_spa.jpg
teaser: "Sometimes it seems like accessibility experts and other web professionals who focus on users and user experience hate JavaScript. This might be true for some, but most understand that JavaScript can be useful for improving UX and even accessibility. JavaScript solutions are often more accessible than their [pure HTML](https://daverupert.com/2020/02/html-the-inaccessible-parts/) or [CSS counterparts](https://www.smashingmagazine.com/2021/06/css-javascript-requirements-accessible-components/)."
tags:
  - blog
  - posts
  - a11y
draft: true
---

We know [JavaScript is not an enemy](https://www.marcozehe.de/javascript-not-enemy-accessibility/), but, admittedly, there is a certain reluctance towards building client-side rendered websites. If you don’t understand where this is coming from, it might seem incomprehensible why someone would not want to build single page applications (SPA), but go for websites with better out of the box UX, sometimes referred to as multi page applications (MPA), instead. 

There has been a lot of criticism about SPAs and especially React recently. In this post I try to summarize reasons why some developers, including me, are wary of building SPAs. A lot of the scepticism comes from the fact that some critical features of a website work fundamentally different* in single page applications. 

\* Evil tongues may claim that “work fundamentally different” is a euphemism for “don’t work at all and have to be reinvented”.

## Routing

When you create 3 HTML documents, let’s call them home.html, about.html, and dashboard.html, and you link them, clicking a link the following happens: The browser navigates to the new page, the page loads, the title of the page changes in the browser’s tab, focus is on the body, and, if you’re using a screen reader, the software announces the title of the page. Of course, a lot more happens. This is a simplified and incomplete depiction of the process, but the important bit is that no matter how you’re accessing and activating the link (mouse, screen reader, touch, switch device, etc.), you know what happened, that something happened, and where you are. The loading process and the transition from one page to another tell you that you’ve navigated to a new page. Focus is at the beginning of the DOM, where you would expect it, and your screen reader announces the title of the page automatically.

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

**Note**: In the previous demo I was using “Create React App”, one of the [recommended toolchains](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains) and the [basic example in React Router](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/basic?file=src/main.tsx). I can imagine that there are frameworks that support accessible routing by default.

## The document title

The `<title>` of the page is one of the most important elements in a HTML document. Users benefit from a well-formed and descriptive page title in many ways. 

To mitigate inaccessible routing and the missing feedback after clicking a link, screen reader users help themselves by pressing shortcuts that announce the title of the page. The page title tells them on which page they are. So even if there’s no feedback, they know they’re on a new page when the title has changed. If the title has changed. In a SPA, you usually have to implement title management manually. Again, this is something that just works in native routing. 

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
      <td>Ins + T</td>
      <td>Page title</td>
    </tr>
    <tr>
      <td>JAWS</td>
      <td>Ins + T</td>
      <td>Page title</td>
    </tr>
    <tr>
      <td>Voice Over on macOS</td>
      <td>VO + Shift + I</td>
      <td>Page summary, including page title</td>
    </tr>
    <tr>
      <td>Voice Over on macOS</td>
      <td>VO + F2</td>
      <td>Page title</td>
    </tr>
  </tbody>
</table>

There are more reasons you'd want to change the page title. It serves as the label for bookmarked pages/favorites, and search engines use the title in their search results pages. Social media sites, chat or mail applications, and similar software use the title in link previews when no other title is specified.

## DOM changes

DOM changes are not specific to SPAs, but to using JavaScript in general. The thing is that reactive DOM changes are at the very core of single page applications. For every significant change you make, you have to communicate that change not just visually, but also semantically. [Live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions), ARIA attributes, or focus management can help with that, but you won’t find any information about live regions or focus management in this context in the [official React accessibility docs](https://reactjs.org/docs/accessibility.html), the [Vue accessibility docs](https://vuejs.org/guide/best-practices/accessibility.html#semantic-forms), or the [Angular docs](https://vuejs.org/guide/best-practices/accessibility.html#semantic-forms).

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

Semantic HTML is the baseline for any well-written and accessible website. You should [learn HTML](https://web.dev/learn/html/) first before you touch JSX, just like you should learn JavaScript first before you touch React, Vue, or Angular.

## The page context

In SPAs, you create components. A component might be part of another component, and another component until it finally ends up in the wrapper `<div>` of your index.html. If you look at the final document of most SPAs, the page doesn’t look like a coherent entity, but more like a dump for components that happen to form a page visually. As already mentioned, HTML is a cornerstone of any accessible website and the page structure (a sound heading outline, landmarks, DOM order, semantic HTML in general) plays an important role. 

Don’t get me wrong, I also build components that are part of a system, but I also spend a good amount of time crafting pages that work well. The fact that the HTML document is something that you barely touch, because everything you need in there will be injected via JavaScript, puts the document and the page structure out of focus.

## Performance

Most SPAs probably perform well on my 3,500 Euro laptop and my 500 Euro smartphone, but a Macbook Pro and Huawai P30 are not necessarily the average device the average user uses to access the web. I’m not in the position to talk about the performance implications of client-site rendering and especially React, but there has been [a lot of criticism early on](https://www.zachleat.com/web/react-criticism/) because SPAs just don’t perform as well as your thought leaders at Meta or Vercel [used to make you think](https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741).

I suggest you read the following articles:

* [The Performance Inequality Gap, 2023](https://infrequently.org/2022/12/performance-baseline-2023/)
* [The Market for Lemons](https://infrequently.org/2023/02/the-market-for-lemons/)
* [A historical reference of react criticism](https://www.zachleat.com/web/react-criticism/)
* [Speed for who?](https://andy-bell.co.uk/speed-for-who/)

## Complexity

Setting up a SPA from scratch is not simple, it involves many tedious steps. Even if you use one of the boilerplate setups, you’re handling a compound dependency monster that just waits to ruin your day because one tiny detail doesn’t work out of the box the way you want it. There’s so much complexity in these things that it makes some people doubt whether it’s worth the effort and if it’s not maybe smarter to spend the time working on something else, something that actually benefits users.

I guess the biggest criticism here is that it feels like people who believe in the superiority of single page applications and the entire ecosystem focus more on developer experience than user experience. That sounds like a dangerous blanket statement, but after all these years, I never had the feeling that the argument “better DX leads to better UX” was ever true. It’s nothing more than a justification for the immense complexity and significantly worse UX, that never came true.

# Conclusion

I hope this didn’t come off as a rant, it’s not. I’m just trying to explain why SPAs are not the first choice or no choice at all for some people. I’ve worked with several JS libraries and frameworks, because [C.R.E.A.M.](https://www.youtube.com/watch?v=PBwAxmrE194), but I’ve never built one myself and I’ve never consulted a client to do so, and I probably never will.