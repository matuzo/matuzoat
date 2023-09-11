---
title: "Are there any constraints regarding screen reader accessibility?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes.'
date: 2023-09-11T13:40:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_sra11y.jpg
layout: "layouts/wcfaq.njk"
order: 16
---

The answer to this question is “Yes” because the referencing issues I described in [Can I connect a label in light DOM to an input in shadow DOM?](/blog/2023/web-components-accessibility-faq/labelling-forms-in-shadow-dom/) and [Can I create an ARIA reference to an element in shadow DOM?](/blog/2023/web-components-accessibility-faq/aria-references/) can be problematic, especially if you’re unaware of it and don’t plan your architecture accordingly.

Having said that, it’s entirely possible to build an accessible website using web components. You just have to know what you can and can’t do.