---
layout: page
title: Archive
permalink: /archive/
---

<div class="container-blog-header">
    <h1><i class="fas fa-archive"></i>
    <span>Archive ({{ site.posts | size }})</span>
    </h1>
    <!-- <h1>
        <a href="#" class="menu-toggle" title="Toggle Menu">
            <i class="fas fa-ellipsis-v"></i>
        </a>
    </h1> -->
</div>

<div class="container-post">
<div class="post-content">
{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
	<h6><i class="far fa-calendar-alt"></i>&nbsp; {{ year.name }}</h6>
	<ol>
    {% for post in year.items %}
		<li><a href="{{ post.url }}" title="{{ post.title | escape }}">{{ post.title }}</a> <span>{{ post.date | date_to_string: "ordinal", "US" }}</span></li>
    {% endfor %}
	</ol>
{% endfor %}
</div>
</div>

{% include menu.html %}