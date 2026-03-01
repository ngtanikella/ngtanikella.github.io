---
# ========================
# FRONT MATTER
# ========================
# title:     → text shown in the browser tab (set in head.html)
# layout:    → which layout template wraps this page (default = 50% width)
# permalink: → "/" means this is the homepage (yourdomain.com/)
title: Nagendra Tanikella
layout: default
permalink: /
---

<!-- Include the social icons strip (from _includes/social-icons.html).
     {% raw %}{% include %}{% endraw %} pulls in a file from the _includes/ folder. -->
{% include social-icons.html %}

<!-- <br/> is a line break. This one is commented out (inside <!-- -->).
     Uncomment to add extra vertical space before the profile picture. -->
<!-- <br/> -->

<!-- Profile picture: floated right by CSS (.profile-picture in typography.scss).
     "About me" text wraps around it on the left.
     loading="lazy" would defer loading until the image is near the viewport
     (not used here because this image is above the fold).
     Change the src path to use a different photo. -->
<img class="profile-picture" src="{{site.url}}{{site.baseurl}}/images/profile-picture/nagendra.jpg" />

<!-- Markdown headings: ## = <h2>. Number of # signs sets the heading level:
     # = h1 (largest), ## = h2, ### = h3, etc.
     Headings are colored green ($accent) by CSS in _style.scss. -->
## One sentence summary
I combine expertise in material characterization, design & fabrication, and statistical analysis to advance sustainable additive manufacturing.

## About me

<!-- Markdown links: [text](URL){:target="_blank"}
     {:target="_blank"} opens the link in a new tab (Kramdown attribute).
     <img ... class="inline-logo"> inserts a small institution icon inline with text.
     The .inline-logo class (in _style.scss) sizes it to 1em. -->
I completed my Ph.D. in Mechanical Engineering at <img src="{{site.url}}{{site.baseurl}}/images/experience/uidaho.png" alt="University of Idaho" class="inline-logo">[University of Idaho](https://www.uidaho.edu/){:target="_blank"}, specializing in additive manufacturing, polymer composites, and Design for Manufacturing (DfM). My research focused on bio-based composite materials for large-scale 3D printing, including wood-sodium silicate composites and hemp-fiber-reinforced materials for construction applications.

During my Ph.D., I worked as a Graduate Research Intern at <img src="{{site.url}}{{site.baseurl}}/images/experience/ornl.png" alt="Oak Ridge National Laboratory" class="inline-logo">[Oak Ridge National Laboratory](https://www.ornl.gov/){:target="_blank"}, where I resolved critical ink stability issues for Direct Ink Writing (DIW) and Digital Light Processing (DLP) printing.
I also mentored senior year students with their [Capstone projects.](https://ngtanikella.github.io/mentoring)

I hold an M.E. in Material Science and an M.S. in Mechanical Engineering, both from <img src="{{site.url}}{{site.baseurl}}/images/experience/mtu.png" alt="Michigan Technological University" class="inline-logo">[Michigan Technological University](https://www.mtu.edu/){:target="_blank"}, where I worked on open-source 3D printing, material characterization for Fused Filament Fabrication (FFF), and developed novel composites from recycled and waste materials. I also led rapid-response manufacturing efforts during the COVID-19 crisis and designed an [open-source ventilator.](https://doi.org/10.1016/j.ohx.2020.e00131)

<!-- --- in Markdown creates a horizontal rule (<hr>) — a thin divider line -->
---

## Updates

<!-- ──────────────────────────────────────────────
     NEWS FEED
     ──────────────────────────────────────────────
     A scrollable box showing recent news items.

     role="region" and aria-label="News" improve accessibility:
     screen readers announce this as a distinct "News" region.

     .news-box: styled in _style.scss — max-height: 9.5rem with overflow-y: auto
     creates the scrollable container. Change max-height to show more/fewer items.

     {% raw %}{% for item in site.data.news %}{% endraw %} loops over entries in _data/news.yml.
     Each item has fields: date, news (and optionally pdf, url, etc.).
-->
<div class="news-box" role="region" aria-label="News">
    <!-- .news-list: removes default <ul> bullets (list-style: none in CSS) -->
    <ul class="news-list">
        {% for item in site.data.news %}
            <!-- .news-item: CSS grid with two columns (date | text).
                 grid-template-columns: 10.5rem 1fr in _style.scss. -->
            <li class="news-item">
                <!-- .news-date: left column, bold, no-wrap -->
                <span class="news-date">{{ item.date }}</span>
                <!-- .news-text: right column, news content -->
                <span class="news-text">{{ item.news }}</span>
            </li>
        {% endfor %}
    </ul>
</div>

---

## Projects & Builds

<!-- ──────────────────────────────────────────────
     COLLAGE GRID
     ──────────────────────────────────────────────
     A 3-column grid of clickable project thumbnails.
     Each thumbnail opens a modal (lightbox popup) with a full-size
     image and description.

     .collage-grid: CSS grid with repeat(3, 1fr) in _style.scss.
     Change 3 in the CSS to change the number of columns.
     gap: 14px controls spacing between cards.

     HOW THE MODAL SYSTEM WORKS:
     1. Each card links to href="#modal-name" (e.g., #modal-bioresin)
     2. Further down the page, a <div id="modal-name"> contains the popup content
     3. When clicked, the URL changes to #modal-bioresin
     4. CSS :target selector on .modal activates → popup appears
     5. Clicking the overlay or × links back to "#" → popup hides
     No JavaScript needed!

     Each card is a <figure> element:
     <figure> is semantic HTML for self-contained media content.
       <a class="collage-link">  → clickable wrapper (cursor: zoom-in)
         <img loading="lazy">    → thumbnail (lazy-loaded for performance;
                                    browser only loads it when near the viewport)
       <figcaption>              → caption text below the image
-->

<div class="collage-grid">

    <!-- CARD: Bioresin collaboration.
         href="#modal-bioresin" → clicking opens the modal with id="modal-bioresin".
         aria-label provides accessible text for screen readers.
         loading="lazy" defers image loading until the card scrolls into view. -->
    <figure class="collage-item">
        <a class="collage-link" href="#modal-bioresin" aria-label="Open Bioresin collaboration">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Bioresin.webp" alt="Bioresin">
        </a>
        <figcaption>Bioresin collaboration</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-ceramic-diw" aria-label="Open Ceramic DIW">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Ceramic_DIW.gif" alt="Ceramic DIW">
        </a>
        <figcaption>Ceramic DIW</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-delta-printer" aria-label="Open Delta Printer">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/DeltaPrinter.jpg" alt="Delta Printer">
        </a>
        <figcaption>Delta Printer</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-dinodna" aria-label="Open Dinosaur DNA">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/DinoDNA.gif" alt="DinoDNA">
        </a>
        <figcaption>Dinosaur DNA</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-dissertation" aria-label="Open Dissertation cover">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Dissertation_cover.jpg" alt="Dissertation cover">
        </a>
        <figcaption>Dissertation cover</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-extruder-die" aria-label="Open Extruder die">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Extruder_die.webp" alt="Extruder die">
        </a>
        <figcaption>Extruder die</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-fhsae" aria-label="Open FHSAE competition">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/FHSAE.jpg" alt="FHSAE">
        </a>
        <figcaption>FHSAE competition</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-first-print" aria-label="Open First 3D print (Kindle cover)">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/First_print.webp" alt="First print">
        </a>
        <figcaption>First 3Dprint (Kindle cover)</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-gigabot-cooling" aria-label="Open Gigabot cooling system">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Gigabot_Cooling.png" alt="Gigabot cooling">
        </a>
        <figcaption>Gigabot cooling system</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-flexural-testing" aria-label="Open Flexural testing">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/McMesin_bending.webp" alt="McMesin bending tester">
        </a>
        <figcaption>Flexural testing</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-monster-book" aria-label="Open Monster Book of Monsters">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Monster_Book_of_Monsters.jpg" alt="Monster Book of Monsters">
        </a>
        <figcaption>Monster Book of Monsters</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-lulzbot" aria-label="Open Lulzbot 3D printer">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Nagendra.jpg" alt="Nagendra">
        </a>
        <figcaption>Lulzbot 3Dprinter</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-tensile" aria-label="Open Tensile test setup">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Tensile2.jpg" alt="Tensile test">
        </a>
        <figcaption>Tensile test setup</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-twin-screw" aria-label="Open Twin screw extruder">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/Twin_Screw.webp" alt="Twin screw">
        </a>
        <figcaption>Twin screw extruder</figcaption>
    </figure>

    <figure class="collage-item">
        <a class="collage-link" href="#modal-xray-ct" aria-label="Open X-ray CT scanning">
            <img loading="lazy" src="{{site.url}}{{site.baseurl}}/images/collage/X_ray_CT.webp" alt="X-ray CT">
        </a>
        <figcaption>X-ray CT scanning</figcaption>
    </figure>

</div>

<!-- ──────────────────────────────────────────────
     MODALS (full image + description popups)
     ──────────────────────────────────────────────

     Each modal follows the same structure:
     <div id="modal-name" class="modal">       ← hidden by default (display: none)
                                                   becomes visible when URL = #modal-name
       <a href="#" class="modal-overlay">       ← dark backdrop; clicking it closes the
                                                   modal by navigating to "#" (removes :target)
       <div class="modal-content">              ← white popup box
         <a href="#" class="modal-close">×</a>  ← close button (top-right corner)
         <img class="modal-img">                ← full-size image
         <h3 class="modal-title">              ← project name
         <p class="modal-text">                ← description text

     ACCESSIBILITY ATTRIBUTES:
     role="dialog"          → tells screen readers this is a dialog/popup
     aria-modal="true"      → content behind the modal is inert
     aria-labelledby="id"   → points to the heading that names this dialog
     aria-label="Close"     → describes the close button/overlay for screen readers

     TO ADD A NEW PROJECT:
     1. Add a <figure> card in the collage-grid above (copy an existing one)
     2. Add a modal div below (copy an existing one)
     3. Make sure the card's href="#modal-xxx" matches the modal's id="modal-xxx"

     Styles: defined in _style.scss under "CSS-only modal".
-->

<!-- MODAL: Bioresin collaboration -->
<div id="modal-bioresin" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-bioresin-title">
        <!-- &times; is the HTML entity for the × character -->
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Bioresin.webp" alt="Bioresin collaboration (full image)">
        <h3 class="modal-title" id="modal-bioresin-title">Bioresin collaboration</h3>
        <p class="modal-text">
            Collaboration between an <img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/Auburn.png" alt="Auburn University" class="inline-logo"> <a href="https://www.auburn.edu/" target="_blank" rel="noopener">Auburn University</a> chemistry graduate student,
            <a href="https://www.linkedin.com/in/lucilacarias011694/" target="_blank" rel="noopener">Lucila Carias</a>,
            and <img src="{{site.url}}{{site.baseurl}}/images/experience/uidaho.png" alt="University of Idaho" class="inline-logo"> <a href="https://www.uidaho.edu/" target="_blank" rel="noopener">University of Idaho</a> graduate students, me,
            <a href="https://www.linkedin.com/in/japneet-kukal-08aa82261/" target="_blank" rel="noopener">Japneet Kukal</a>,
            and
            <a href="https://www.linkedin.com/in/robert-carne-651968139/" target="_blank" rel="noopener">Robert Carne</a>
            to validate a bio-based resin for the
            <a href="https://printimber.org/" target="_blank" rel="noopener">Printimber</a> project.
        </p>
    </div>
</div>

<!-- MODAL: Ceramic DIW -->
<div id="modal-ceramic-diw" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-ceramic-diw-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Ceramic_DIW.gif" alt="Ceramic DIW (full image)">
        <h3 class="modal-title" id="modal-ceramic-diw-title">Ceramic DIW</h3>
        <p class="modal-text">
            Direct Ink Writing (DIW) of a zeolite ceramic formulation, at <img src="{{site.url}}{{site.baseurl}}/images/experience/ornl.png" alt="Oak Ridge National Laboratory" class="inline-logo"> <a href="https://www.ornl.gov/" target="_blank" rel="noopener">Oak Ridge National Laboratory</a>.
        </p>
    </div>
</div>

<!-- MODAL: Delta Printer -->
<div id="modal-delta-printer" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-delta-printer-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/DeltaPrinter.jpg" alt="Delta Printer (full image)">
        <h3 class="modal-title" id="modal-delta-printer-title">Delta Printer</h3>
        <p class="modal-text">
            A delta-style 3D printer built in class, as part of the course taught by <a href="https://www.eng.uwo.ca/electrical/faculty/pearce_j/index.html" target="_blank" rel="noopener">Dr. Joshua Pearce</a>.
        </p>
    </div>
</div>

<!-- MODAL: Dinosaur DNA -->
<div id="modal-dinodna" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-dinodna-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/DinoDNA.gif" alt="Dinosaur DNA (full image)">
        <h3 class="modal-title" id="modal-dinodna-title">Dinosaur DNA</h3>
        <p class="modal-text">
            A fun CNC-machined container that can be inserted in to a hollowed-out Barbasol can to recreate "Dinosaur DNA holder", as seen in the movie "Jurassic Park".
        </p>
    </div>
</div>

<!-- MODAL: Dissertation cover -->
<div id="modal-dissertation" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-dissertation-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Dissertation_cover.jpg" alt="Dissertation cover (full image)">
        <h3 class="modal-title" id="modal-dissertation-title">Dissertation cover</h3>
        <p class="modal-text">
            Cover artwork for my Ph.D. dissertation featuring a 3D-printed TPU base integrated with a wood–sodium silicate composite panel insert. The circular holders contain short hemp fibers, hemp hurd, and hemp rope.
        </p>
    </div>
</div>

<!-- MODAL: Extruder die -->
<div id="modal-extruder-die" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-extruder-die-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Extruder_die.webp" alt="Extruder die (full image)">
        <h3 class="modal-title" id="modal-extruder-die-title">Extruder die</h3>
        <p class="modal-text">
            Custom die design for processing continous hemp fibers, part of the <a href="https://printimber.org/" target="_blank" rel="noopener">Printimber</a> project.
        </p>
    </div>
</div>

<!-- MODAL: FHSAE competition -->
<div id="modal-fhsae" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-fhsae-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/FHSAE.jpg" alt="FHSAE competition (full image)">
        <h3 class="modal-title" id="modal-fhsae-title">FHSAE competition</h3>
        <p class="modal-text">
            Formula hybrid SAE vehicle, built for my capstone project at <img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/NMIT.jpeg" alt="NMIT" class="inline-logo"><a href="https://nitte.edu.in/nmit/" target="_blank" rel="noopener">NMIT, India</a>.
        </p>
    </div>
</div>

<!-- MODAL: First 3D print -->
<div id="modal-first-print" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-first-print-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/First_print.webp" alt="First 3D print (Kindle cover) (full image)">
        <h3 class="modal-title" id="modal-first-print-title">First 3Dprint (Kindle cover)</h3>
        <p class="modal-text">
            My first 3D print: a custom Kindle cover at <a href="https://www.eng.uwo.ca/electrical/faculty/pearce_j/index.html" target="_blank" rel="noopener">Dr. Joshua Pearce</a>'s lab.
        </p>
    </div>
</div>

<!-- MODAL: Gigabot cooling system -->
<div id="modal-gigabot-cooling" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-gigabot-cooling-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Gigabot_Cooling.png" alt="Gigabot cooling system (full image)">
        <h3 class="modal-title" id="modal-gigabot-cooling-title">Gigabot cooling system</h3>
        <p class="modal-text">
            Cooling system upgrade for <a href="https://re3d.org/" target="_blank" rel="noopener">Re3D's</a> Gigabot printer.
        </p>
    </div>
</div>

<!-- MODAL: Flexural testing -->
<div id="modal-flexural-testing" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-flexural-testing-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/McMesin_bending.webp" alt="Flexural testing (full image)">
        <h3 class="modal-title" id="modal-flexural-testing-title">Flexural testing</h3>
        <p class="modal-text">
            Flexural testing setup for the study
            <a href="https://doi.org/10.3390/polym17182478" target="_blank" rel="noopener">
                "Extrudability and Mechanical Properties of Wood-Sodium Silicate Composites with Hemp Fiber Reinforcement for Additive Manufacturing"
            </a>.
        </p>
    </div>
</div>

<!-- MODAL: Monster Book of Monsters
     This modal uses a <video> element instead of <img>.
     <video> embeds a video player directly in the page.
     controls    → show play/pause/volume buttons
     playsinline → play inline on iOS (instead of fullscreen)
     preload="none" → don't load the video until the user clicks play (saves bandwidth)
     <source> specifies the video file and its format (type="video/mp4"). -->
<div id="modal-monster-book" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-monster-book-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <video class="modal-media" controls playsinline preload="none" loading="lazy">
            <source src="{{site.url}}{{site.baseurl}}/images/collage/monsterbook.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <h3 class="modal-title" id="modal-monster-book-title">Monster Book of Monsters</h3>
        <p class="modal-text">
            A book cover with a simple mechanism that keeps it shut, unless you "stroke the spine, of course".
        </p>
    </div>
</div>

<!-- MODAL: Lulzbot 3D printer -->
<div id="modal-lulzbot" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-lulzbot-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Nagendra.jpg" alt="Lulzbot 3D printer (full image)">
        <h3 class="modal-title" id="modal-lulzbot-title">Lulzbot 3Dprinter</h3>
        <p class="modal-text">
            Me, with the <a href="https://lulzbot.com/" target="_blank" rel="noopener">Lulzbot</a> TAZ printer.
        </p>
    </div>
</div>

<!-- MODAL: Tensile test setup -->
<div id="modal-tensile" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-tensile-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Tensile2.jpg" alt="Tensile test setup (full image)">
        <h3 class="modal-title" id="modal-tensile-title">Tensile test setup</h3>
        <p class="modal-text">
            Tensile testing setup for the study
            <a href="https://doi.org/10.1016/j.addma.2017.03.005" target="_blank" rel="noopener">
                "Tensile strength of commercial polymer materials for fused filament fabrication 3D printing"</a>.
        </p>
    </div>
</div>

<!-- MODAL: Twin screw extruder -->
<div id="modal-twin-screw" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-twin-screw-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Twin_Screw.webp" alt="Twin screw extruder (full image)">
        <h3 class="modal-title" id="modal-twin-screw-title">Twin screw extruder</h3>
        <p class="modal-text">
            Twin-screw extruder, with <img src="{{site.url}}{{site.baseurl}}/images/experience/uidaho.png" alt="University of Idaho" class="inline-logo">
            <a href="https://www.uidaho.edu/" target="_blank" rel="noopener">University of Idaho</a> graduate students
            <a href="https://www.linkedin.com/in/danielrevard/" target="_blank" rel="noopener">Daniel Revard</a>, me,
            and
            <a href="https://www.linkedin.com/in/robert-carne-651968139/" target="_blank" rel="noopener">Robert Carne</a>.
        </p>
    </div>
</div>

<!-- MODAL: X-ray CT scanning -->
<div id="modal-xray-ct" class="modal">
    <a href="#" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-xray-ct-title">
        <a href="#" class="modal-close" aria-label="Close">&times;</a>
        <img loading="lazy" class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/X_ray_CT.webp" alt="X-ray CT scanning (full image)">
        <h3 class="modal-title" id="modal-xray-ct-title">X-ray CT scanning</h3>
        <p class="modal-text">
            X-ray computed tomography (CT) for density and porosity evaluation of hemp reinforced wood-sodium silicate composites.
        </p>
    </div>
</div>
