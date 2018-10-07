---
layout: layouts/blog.njk
title: Speaking
tags:
  - nav
navtitle: Speaking
permalink: /speaking/index.html
---

## Upcoming talks

{% for talk in collections.speaking %}
  <h3>{{ talk.data.title }}</h3>
  <time datetime="{{ talk.data.date|machineDate }}">{{ talk.data.date|readableDate }}</time>
  {{ talk.data.summary }}
{% endfor %}
