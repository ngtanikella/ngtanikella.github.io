---
title: Nagendra Tanikella
layout: default
permalink: /
---

{% include social-icons.html %}

<!-- <br/> -->

<img class="profile-picture" src="{{site.url}}{{site.baseurl}}/images/profile-picture/nagendra.jpg" />

## One sentence summary
I combine expertise in material characterization, design & fabrication, and statistical analysis to advance sustainable additive manufacturing.

## About me
I completed my Ph.D. in Mechanical Engineering at <img src="{{site.url}}{{site.baseurl}}/images/experience/uidaho.png" alt="University of Idaho" class="inline-logo">[University of Idaho](https://www.uidaho.edu/){:target="_blank"}, specializing in additive manufacturing, polymer composites, and Design for Manufacturing (DfM). My research focused on bio-based composite materials for large-scale 3D printing, including wood-sodium silicate composites and hemp-fiber-reinforced materials for construction applications.

During my Ph.D., I worked as a Graduate Research Intern at <img src="{{site.url}}{{site.baseurl}}/images/experience/ornl.png" alt="Oak Ridge National Laboratory" class="inline-logo">[Oak Ridge National Laboratory](https://www.ornl.gov/){:target="_blank"}, where I resolved critical ink stability issues for Direct Ink Writing (DIW) and Digital Light Processing (DLP) printing.
I also mentored senior year students with their [Capstone projects.](https://ngtanikella.github.io/mentoring)

I hold an M.E. in Material Science and an M.S. in Mechanical Engineering, both from <img src="{{site.url}}{{site.baseurl}}/images/experience/mtu.png" alt="Michigan Technological University" class="inline-logo">[Michigan Technological University](https://www.mtu.edu/){:target="_blank"}, where I worked on open-source 3D printing, material characterization for Fused Filament Fabrication (FFF), and developed novel composites from recycled and waste materials. I also led rapid-response manufacturing efforts during the COVID-19 crisis and designed an [open-source ventilator.](https://doi.org/10.1016/j.ohx.2020.e00131)

---
## Updates

<div class="news-box" role="region" aria-label="News">
  <ul class="news-list">
    {% for item in site.data.news %}
      <li class="news-item">
        <span class="news-date">{{ item.date }}</span>
        <span class="news-text">{{ item.news }}</span>
      </li>
    {% endfor %}
  </ul>
</div>

---

<style>
  /* Click-to-open modal (no JS) */
  .collage-grid .collage-link { display:block; cursor: zoom-in; }
  .collage-grid .collage-link img { display:block; }

  .modal {
    position: fixed;
    inset: 0;
    display: none;
    z-index: 9999;
  }
  .modal:target { display: block; }

  .modal-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.82);
  }

  .modal-content {
    position: relative;
    width: min(980px, 92vw);
    margin: 5vh auto;
    background: #ffffff;
    border-radius: 14px;
    padding: 1.25rem 1.25rem 1.5rem;
    max-height: 90vh;
    overflow: auto;
    box-shadow: 0 10px 35px rgba(0,0,0,0.35);
  }

  .modal-close {
    position: absolute;
    top: 0.6rem;
    right: 0.85rem;
    text-decoration: none;
    font-size: 2rem;
    line-height: 1;
    color: #111;
    padding: 0.15rem 0.45rem;
    border-radius: 10px;
  }
  .modal-close:hover { background: rgba(0,0,0,0.06); }

  .modal-img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .modal-title {
    margin: 0.9rem 0 0.35rem;
  }

  .modal-text {
    margin: 0;
  }
/* News (scrollable) */
.news-box{
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  max-height: 9.5rem;          /* ~2–3 items visible */
  overflow-y: auto;
  background: #fff;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.news-list{
  list-style: none;
  margin: 0;
  padding: 0;
}

.news-item{
  display: grid;
  grid-template-columns: 10.5rem 1fr;
  gap: 0.75rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.news-item:last-child{
  border-bottom: none;
}

.news-date{
  font-weight: 600;
  white-space: nowrap;
}

.news-text a{
  text-decoration: underline;
}
</style>

## Projects & Builds

<div class="collage-grid">

  <figure class="collage-item">
    <a class="collage-link" href="#modal-bioresin" aria-label="Open Bioresin collaboration">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Bioresin.jpg" alt="Bioresin">
    </a>
    <figcaption>Bioresin collaboration</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-ceramic-diw" aria-label="Open Ceramic DIW">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Ceramic_DIW.gif" alt="Ceramic DIW">
    </a>
    <figcaption>Ceramic DIW</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-delta-printer" aria-label="Open Delta Printer">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/DeltaPrinter.jpg" alt="Delta Printer">
    </a>
    <figcaption>Delta Printer</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-dinodna" aria-label="Open Dinosaur DNA">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/DinoDNA.gif" alt="DinoDNA">
    </a>
    <figcaption>Dinosaur DNA</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-dissertation" aria-label="Open Dissertation cover">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Dissertation_cover.jpg" alt="Dissertation cover">
    </a>
    <figcaption>Dissertation cover</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-extruder-die" aria-label="Open Extruder die">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Extruder_die.jpg" alt="Extruder die">
    </a>
    <figcaption>Extruder die</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-fhsae" aria-label="Open FHSAE competition">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/FHSAE.jpg" alt="FHSAE">
    </a>
    <figcaption>FHSAE competition</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-first-print" aria-label="Open First 3D print (Kindle cover)">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/First_print.jpg" alt="First print">
    </a>
    <figcaption>First 3Dprint (Kindle cover)</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-gigabot-cooling" aria-label="Open Gigabot cooling system">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Gigabot_Cooling.png" alt="Gigabot cooling">
    </a>
    <figcaption>Gigabot cooling system</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-flexural-testing" aria-label="Open Flexural testing">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/McMesin_bending.jpg" alt="McMesin bending tester">
    </a>
    <figcaption>Flexural testing</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-monster-book" aria-label="Open Monster Book of Monsters">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Monster_Book_of_Monsters.jpg" alt="Monster Book of Monsters">
    </a>
    <figcaption>Monster Book of Monsters</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-lulzbot" aria-label="Open Lulzbot 3D printer">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Nagendra.jpg" alt="Nagendra">
    </a>
    <figcaption>Lulzbot 3Dprinter</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-tensile" aria-label="Open Tensile test setup">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Tensile2.jpg" alt="Tensile test">
    </a>
    <figcaption>Tensile test setup</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-twin-screw" aria-label="Open Twin screw extruder">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/Twin_Screw.jpg" alt="Twin screw">
    </a>
    <figcaption>Twin screw extruder</figcaption>
  </figure>

  <figure class="collage-item">
    <a class="collage-link" href="#modal-xray-ct" aria-label="Open X-ray CT scanning">
      <img src="{{site.url}}{{site.baseurl}}/images/collage/X_ray_CT.jpg" alt="X-ray CT">
    </a>
    <figcaption>X-ray CT scanning</figcaption>
  </figure>

</div>

<!-- Modals (full image + write-up) -->

<div id="modal-bioresin" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-bioresin-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Bioresin.jpg" alt="Bioresin collaboration (full image)">
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

<div id="modal-ceramic-diw" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-ceramic-diw-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Ceramic_DIW.gif" alt="Ceramic DIW (full image)">
    <h3 class="modal-title" id="modal-ceramic-diw-title">Ceramic DIW</h3>
    <p class="modal-text">
      Direct Ink Writing (DIW) of a zeolite ceramic formulation, at <img src="{{site.url}}{{site.baseurl}}/images/experience/ornl.png" alt="Oak Ridge National Laboratory" class="inline-logo"> <a href="https://www.ornl.gov/" target="_blank" rel="noopener">Oak Ridge National Laboratory</a>.
    </p>
  </div>
</div>

<div id="modal-delta-printer" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-delta-printer-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/DeltaPrinter.jpg" alt="Delta Printer (full image)">
    <h3 class="modal-title" id="modal-delta-printer-title">Delta Printer</h3>
    <p class="modal-text">
      A delta-style 3D printer built in class, as part of the course taught by <a href="https://www.eng.uwo.ca/electrical/faculty/pearce_j/index.html" target="_blank" rel="noopener">Dr. Joshua Pearce</a>.
    </p>
  </div>
</div>

<div id="modal-dinodna" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-dinodna-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/DinoDNA.gif" alt="Dinosaur DNA (full image)">
    <h3 class="modal-title" id="modal-dinodna-title">Dinosaur DNA</h3>
    <p class="modal-text">
      A fun CNC-machined container that can be inserted in to a hollowed-out Barbasol can to recreate "Dinosaur DNA holder", as seen in the movie "Jurassic Park".
    </p>
  </div>
</div>

<div id="modal-dissertation" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-dissertation-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Dissertation_cover.jpg" alt="Dissertation cover (full image)">
    <h3 class="modal-title" id="modal-dissertation-title">Dissertation cover</h3>
    <p class="modal-text">
      Cover artwork for my Ph.D. dissertation featuring a 3D-printed TPU base integrated with a wood–sodium silicate composite panel insert. The circular holders contain short hemp fibers, hemp hurd, and hemp rope.
    </p>
  </div>
</div>

<div id="modal-extruder-die" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-extruder-die-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Extruder_die.jpg" alt="Extruder die (full image)">
    <h3 class="modal-title" id="modal-extruder-die-title">Extruder die</h3>
    <p class="modal-text">
      Custom die design for processing continous hemp fibers, part of the <a href="https://printimber.org/" target="_blank" rel="noopener">Printimber</a> project.
    </p>
  </div>
</div>

<div id="modal-fhsae" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-fhsae-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/FHSAE.jpg" alt="FHSAE competition (full image)">
    <h3 class="modal-title" id="modal-fhsae-title">FHSAE competition</h3>
    <p class="modal-text">
      Formula hybrid SAE vehicle, built for my capstone project at <img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/NMIT.jpeg" alt="NMIT" class="inline-logo"><a href="https://nitte.edu.in/nmit/" target="_blank" rel="noopener">NMIT, India</a>.
    </p>
  </div>
</div>

<div id="modal-first-print" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-first-print-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/First_print.jpg" alt="First 3D print (Kindle cover) (full image)">
    <h3 class="modal-title" id="modal-first-print-title">First 3Dprint (Kindle cover)</h3>
    <p class="modal-text">
      My first 3D print: a custom Kindle cover at <a href="https://www.eng.uwo.ca/electrical/faculty/pearce_j/index.html" target="_blank" rel="noopener">Dr. Joshua Pearce</a>'s lab.
    </p>
  </div>
</div>

<div id="modal-gigabot-cooling" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-gigabot-cooling-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Gigabot_Cooling.png" alt="Gigabot cooling system (full image)">
    <h3 class="modal-title" id="modal-gigabot-cooling-title">Gigabot cooling system</h3>
    <p class="modal-text">
      Cooling system upgrade for <a href="https://re3d.org/" target="_blank" rel="noopener">Re3D's</a> Gigabot printer.
    </p>
  </div>
</div>

<div id="modal-flexural-testing" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-flexural-testing-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/McMesin_bending.jpg" alt="Flexural testing (full image)">
    <h3 class="modal-title" id="modal-flexural-testing-title">Flexural testing</h3>
    <p class="modal-text">
      Flexural testing setup for the study
      <a href="https://doi.org/10.3390/polym17182478" target="_blank" rel="noopener">
        “Extrudability and Mechanical Properties of Wood-Sodium Silicate Composites with Hemp Fiber Reinforcement for Additive Manufacturing”
      </a>.
    </p>
  </div>
</div>

<div id="modal-monster-book" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-monster-book-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <video class="modal-media" controls playsinline preload="metadata">
      <source src="{{site.url}}{{site.baseurl}}/images/collage/monsterbook.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <h3 class="modal-title" id="modal-monster-book-title">Monster Book of Monsters</h3>
    <p class="modal-text">
      A book cover with a simple mechanism that keeps it shut, unless you "stroke the spine, of course".
    </p>
  </div>
</div>

<div id="modal-lulzbot" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-lulzbot-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Nagendra.jpg" alt="Lulzbot 3D printer (full image)">
    <h3 class="modal-title" id="modal-lulzbot-title">Lulzbot 3Dprinter</h3>
    <p class="modal-text">
      Me, with the <a href="https://lulzbot.com/" target="_blank" rel="noopener">Lulzbot</a> TAZ printer.
    </p>
  </div>
</div>

<div id="modal-tensile" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-tensile-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Tensile2.jpg" alt="Tensile test setup (full image)">
    <h3 class="modal-title" id="modal-tensile-title">Tensile test setup</h3>
    <p class="modal-text">
      Tensile testing setup for the study
      <a href="https://doi.org/10.1016/j.addma.2017.03.005" target="_blank" rel="noopener">
        “Tensile strength of commercial polymer materials for fused filament fabrication 3D printing”</a>.
    </p>
  </div>
</div>

<div id="modal-twin-screw" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-twin-screw-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/Twin_Screw.jpg" alt="Twin screw extruder (full image)">
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

<div id="modal-xray-ct" class="modal">
  <a href="#" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-xray-ct-title">
    <a href="#" class="modal-close" aria-label="Close">&times;</a>
    <img class="modal-img" src="{{site.url}}{{site.baseurl}}/images/collage/X_ray_CT.jpg" alt="X-ray CT scanning (full image)">
    <h3 class="modal-title" id="modal-xray-ct-title">X-ray CT scanning</h3>
    <p class="modal-text">
      X-ray computed tomography (CT) for density and porosity evaluation of hemp reinforced wood-sodium silicate composites.
    </p>
  </div>
</div>

<!-- 
## PUBLICATIONS

For a more complete list, please check my <a href="{{ site.google_scholar_url }}" target="_blank">Google Scholar</a> page.

{% for publication in site.data.papers %}

{% include publications.html %}

{% endfor %}

<p>&nbsp;</p>
-->