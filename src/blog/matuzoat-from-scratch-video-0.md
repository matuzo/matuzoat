---
title: 'matuzo.at from scratch #0 - introduction'
metadescription: >-
  I'm redesigning and building my website from scratch. In this first video I
  introduce myself and I describe what my plans are for the following weeks and
  months.
date: 2020-01-09T07:06:26.546Z
image: videos/video1.jpg
teaser: >-
  I'm redesigning and building my website from scratch. In this first video I
  introduce myself and I describe what my plans are for the following weeks and
  months.  Watch it to see if this series of videos is for you or not.
tags:
  - video
publication: Matuzo
draft: false
archive: false
---

<nav>
  <h2>In this page</h2>
  <ol>
    <li><a href="#video">Video</a></li>
    <li><a href="#transcript">Transcript</a></li>
  </ol>
</nav>

<h2 id="video">Video</h2>

<div class="content__video-wrapper"><div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/cijF86B5UYI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="matuzo.at from scratch - #0 introduction"></iframe>
</div></div>

<h2 id="transcript">Transcript</h2>

### [Introduction]

Hello and welcome to this first video in a series of videos where I'm going to redesign and build my website from scratch. 

My name is Manuel Matuzović, I'm a front-end developer from Vienna and I like sharing stuff. I usually do it on my website <a href="https://matuzo.at">matuzo.at</a>. *Matuzo* is my nickname and *at* is the top-level domain for Austria. I write articles about CSS and accessibility and sometimes I also publish on other websites where write about the same topics.

*[Showing articles I've published on [Smashing Magazine](https://www.smashingmagazine.com/2017/07/enhancing-css-layout-floats-flexbox-grid/), [CSS-Tricks](https://css-tricks.com/flex-grow-is-weird/) and [A List Apart](https://alistapart.com/article/my-accessibility-journey-what-ive-learned-so-far/)*

I also like to give talks at meetups and conferences, and now I decided to share on another medium, which is video.

I already have a website and I want to redesign it for different reasons. 

The first reason is that I made some bad decisions when it comes to using custom properties and there are also some other CSS things that I want to improve and I also want to extend what's on my website.  
Right now you can see on my home page the latest blog posts and you can click a blog post. It's a pretty basic layout. It looks nice, at least if you ask me.  
Most articles look the same but some are different, some of them are branded, for example here you can see a a post for a [talk that I gave in Finland](https://www.matuzo.at/blog/12-tips-for-more-accessible-react-apps-slides-react-finland-2019/), at [React Finland](https://react-finland.fi). I branded it in the colours of Finland and the event, blue and white.  
Here you can see a post called ["The Dark Side of the Grid"](https://www.matuzo.at/blog/the-dark-side-of-the-grid-part-2/). I stole the design of the "Dark Side of the Moon" which is an LP by Pink Floyd and I branded the whole article in this design. I like that, it's a bit more work but it looks nice and I also like that not all articles look the same.

Besides my blog there is a page [about me](https://www.matuzo.at/about-me/), it's pretty boring, there isn’t too much on it, I want to extend that a bit I want to go into detail about my workshops and my speaking and so on.

There’s a [today I learned page](https://www.matuzo.at/til/), it's called today I learned because I share a thing that I've learned that day in a
sentence or two. I stole that idea from reddit, there is a subreddit called ["today I learned"](https://www.reddit.com/r/todayilearned/) where people do exactly the same thing but I put it on my
website and I share web stuff, for example the last thing is "you can list all pseudo elements of an element in the CSS pane in Firefox developer tools". I didn’t know that before that. 

Okay, so that's what's online right now and I want some more stuff. So, this is one of the reasons why I need a redesign and I also want to make a new design.  
I like the current design. What I like most about it is that it's not a typical design, it doesn't look like every other website and I also like that a lot of people don't like it. I even had people tell me in my face that my website is ugly - Hi Jens! - but that's a good thing because I'd rather have a lot of people not like my website and others like it then a lot of people not care about my website because not caring means it's boring. 

Anyways, I want to make a new design and, yeah, this is what's going to happen in the course of the next few weeks and months and I'm going to record it. 

### [List of topics I'll cover]

I made a list of the topics that I'm going to cover and some of the technology that I want to use or some of the properties, techniques, whatever and I summarized it for you so that you can decide for yourself if this video, series of videos is for you or not.

1. I'm going to host the website on **[netlify](https://netlify.com)**, just because it's for free and it's easy and it makes deployment really
easy. I'm a big fan of netlify, they didn’t pay me to say that I'm just very convinced of the product. 

2. I'm going to use **[netlifyCMS](https://netlifycms.org)**, which is a plugin for netlify hosted websites that will magically create a content management system for your sites. You don't have to install anything, you don't need a server-side programming language or whatever. All you need is just one HTML file and I think a config JSON or YAML file and netlifyCMS will create a user interface and the content management system based on that, which is really cool. 

3. We're also going to need **netlify forms** because I want to
bring guest books back to the web. I made my first website about 19 years ago and every website I made until – I don't know – 2004 or 5 had a guestbook, so I want to bring that back, I don't know if bots and spammers and trolls are going to ruin that for me, but we'll try and netlify has forms, as well. 

4. I won’t use any programming language like PHP or Python or Ruby to create my website, I'm going to use good old HTML but I'm not going to write HTML files.
I'll write markdown files and use **[eleventy](https://www.11ty.dev/)**, a static site generator to create HTML files out of markdown and nunchuks files. I'm a big fan of eleventy, pretty much everything I build at the moment is based on eleventy. It's a fantastic tool, you're going to love it.  
Shout out to [Zach Leatherman](https://twitter.com/zachleat/) who built it, it's just perfect. 

1. I'll talk about **designing in the browser** because I made a design for my web site, for my current web site and for the new one and I didn’t use Photoshop or Sketch or anything I designed it completely in the browser and I'll talk a little bit about that in the next video and how to find inspiration or at least how I find inspiration for designs as someone who's not a designer per definition. 

1. I'm going to use **Sass** for stuff like includes and mixins and variables. 

1. We'll also cover **gulp** because I need gulp for minifying and uglyfiying CSS and JavaScript files, maybe some image optimization, we'll see. I don't know yet what we were going to use it for but I know that I'm going to need it.

1. I'm also going to write some **JavaScript**. I'm a HTML and CSS person. I understand JavaScript but I'm not the best JavaScript developer, so don't expect the best JavaScript code but there is going to be some JavaScript because I like to write JavaScript myself, so I don't like to rely too much on frameworks or plugins, for example I'm going to need lazy loading on my website and I'm going to write it on my own, just to practice JavaScript a little bit and to save some file size. 

1. Speaking of file size, **performance** is going to be an important topic. I like my websites to be fast so that users have a great experience. It's a usability and user experience concern and an accessibility concern, as well. So performance is important, we're going to talk a lot about performance and I will try to make it as fast as possible.

1. Another important topic is **accessibility**. I'm an accessibility person, I care a lot about accessibility and my users and I want to make sure that as many users as possible can use my website.

1. If I talk about accessibility of course you have to talk about **progressive enhancement**, as well, so I want to make sure that the website is accessible not just to as many users as possible but also to as many devices and operating systems and browsers as possible. For example, I bought this Nokia 3310 about two years ago which is a redesign of the old Nokia phone. It's a great phone, it's pretty cheap and it has a browser, Opera Mini. If you visit [caniuse.com](https://caniuse.com) and you search for a property and you see all green in every browser except for one, that's usually the browser that's installed on that phone. So, this is an interesting challenge, we're going to make this website work on my feature phone here.

1. I already mentioned that some of the articles are themed, we have this "Dark Side of the Grid" article and the "React Finland" article. I'm going to talk about **theming** a lot and I'm going to try to find a new strategy on how I'm going to theme my sites. 

1. There’s some CSS stuff that I want to implement like **dark mode**. I'm going to use **CSS Grid**, if it makes sense and I want to use **custom properties**, ideally in a smart way, we'll see how we're going to use them, if we're going to use them.

1. **Dev tools** is another important topic, I like to use dev tools a lot and use as many features as possible of dev tools and I'm going to talk a lot about that and see if I can find something that you don't know already about dev tools.

1. We might talk about **puppeteer** as well because for the *today I learned* section I want to have the ability to add code and when I publish it I want to run a script that will take a screenshot of this code sample that I wrote and use it as the preview image on social media and I guess that puppeteer can do that for me. 

1. Another thing is that I want to make the website available offline, so it's going to be a **progressive web app**.

1. There’s some other JavaScript stuff and indie web stuff like **web mention** that I want to implement. 

1. I want to show you how I test for accessibility and performance and how I do **browser testing** to make sure that my website works the way I expect it to work. 

That's a lot, I don't know how many videos I'm going to record, I don't know how often I'm going to publish a video, if it's going to be every two weeks or three weeks. I just don't know how much work it is to create a video, we'll see.

That's it for the first video.  What I need now is your feedback, please tell me if this is interesting, if I caught your attention, if you are waiting for the next video to publish and also please tell me if the audio quality is
good enough, if the video quality is good enough. I'm actually just using my smartphone to record this and also please tell me if
you can understand me, I know that my English isn’t perfect but I just hope that my accent is understandable at least understandable enough. Yeah, that's it, thank you so much for watching.  
See you next time ❤️
