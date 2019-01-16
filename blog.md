---
layout: page
title: Blog
permalink: /blog/
pagination:
    enabled: true
---

<div class="container-blog-header">
    <h1><i class="fas fa-book"></i> Blog</h1>
</div>
<div class="container-blog">
    {% for post in paginator.posts %}
        <div class="container-blog-entry">
            <div class="container-blog-entry-inner">
                <div class="container-blog-entry-inner-icon">
                    <i class="far fa-sticky-note"></i>
                </div>
                <div class="container-blog-entry-inner-entry">
                    <a class="title" href="{{ post.url | relative_url }}">{{
                        post.title | escape
                    }}</a>
                    <p>{{ post.excerpt }}</p>
                    {% assign date_format = site.minima.date_format | default: "%b %d %Y" %}
                    <div class="container-blog-entry-inner-entry-post-date">
                        <div>
                            {% for category in post.categories %} 
                                <span><i class="fas fa-archive"></i> {{ category | strip }}</span>
                            {% endfor %}
                        </div>
                        <div>
                            <i class="fas fa-calendar-plus"></i>
                            <time datetime="{{ page.date | date_to_rfc822 }}" itemprop="datePublished">
                                {% assign date_format = site.minima.date_format | default: "%b %-d, %Y" %} 
                                {{ post.date | date: date_format }}
                            </time>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {% endfor %}
</div>

<!-- Pagination -->

{% include pagination.html %}
