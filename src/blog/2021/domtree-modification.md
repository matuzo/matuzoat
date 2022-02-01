---
title: 'Dev Tools: Debugging DOM Tree modifications'
permalink: blog/dev-tools-debugging-dom-tree-modifications//index.html
meta:
   description: '“Break on Subtree Modification” allows you to debug dynamically added and removed DOM nodes.'
   image: sm_domtree.png
date: 2021-01-29T06:58:54.969Z
teaser: '“Break on Subtree Modification” allows you to debug dynamically added and removed DOM nodes.'
tags:
  - blog
  - devtools
---

The other day I was debugging a Drag’n’Drop component, and I noticed that it added a DOM node every time I dragged an element. I wanted to inspect the node and see what’s going on in the CSS panel, but as soon as I dropped the element I was dragging, the new node was removed from the DOM (Document Object Model). I tried to catch it quickly, but I didn’t have a chance.

## Break Stuff

A quick search pointed me to an option I’ve noticed several times in the context menu of nodes in the elements panel, but I never cared to see what it was doing: “Break on…”.

<a href="https://res.cloudinary.com/dp3mem7or/image/upload/v1611901905/articles/domtree1.jpg">
   <img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1611901905/articles/domtree1.jpg" alt="Context menu in Firefox Dev Tools: the option “Break on…” selected and three child menu items showing: Subtree Modification, Attribute Modification, and Node Removal" loading="lazy" width="750" height="476">
</a>

Selecting “Break on Subtree Modification” pauses any script that modifies the <abbr title="Document Object Model">DOM</abbr> of the selected element and jumps to the line in the script that modified it.

<a href="https://res.cloudinary.com/dp3mem7or/image/upload/v1611901905/articles/domtree2.jpg">
   <img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1611901905/articles/domtree2.jpg" alt="The line that caused the DOM modification is highlighted in the sources panel." loading="lazy" width="750" height="476">
</a>

Now that the script is paused, you can unhurriedly inspect the <abbr title="Document Object Model">DOM</abbr>.

<a href="https://res.cloudinary.com/dp3mem7or/image/upload/v1611901905/articles/domtree3.jpg">
   <img src="https://res.cloudinary.com/dp3mem7or/image/upload/v1611901905/articles/domtree3.jpg" alt="Dev tools shows a message “Paused on DOM mutation” and allows me to select the new node in the elements panel." loading="lazy" width="750" height="476">
</a>

This option helped me not only to debug the component, but I also felt less stupid because I didn’t have to desperately try to move the mouse as quickly as possible.

The other options are useful, too. I can imagine that “Break on attribute modification” can come in handy when we’re debugging complex animations or user interactions.

You can use [this CodePen](https://cdpn.io/matuzo/debug/BaQajJg), if you want to try it yourself.
