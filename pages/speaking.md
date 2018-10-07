---
layout: layouts/blog.njk
title: Speaking
tags:
  - nav
navtitle: Speaking
permalink: /speaking/index.html
---

## Upcoming talks

{% for gig in collections.speaking %}
  <h3>{{ gig.data.title }}</h3>
  <time datetime="{{ gig.data.date|machineDate }}">{{ gig.data.date|readableDate }}</time>
  {{ gig.data.event }}
{% endfor %}
