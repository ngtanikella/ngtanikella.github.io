---
title: Nagendra Tanikella's publications
layout: default
permalink: /publications
---



{% for publication in site.data.papers %}

{% include publications.html %}

{% endfor %}

<p>&nbsp;</p>

# THESIS / REPORTS

{% for publication in site.data.reports %}

{% include publications.html %}

{% endfor %}