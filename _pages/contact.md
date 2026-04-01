---
# ========================
# FRONT MATTER
# ========================
# The block between --- markers is YAML "front matter".
# Jekyll reads this metadata BEFORE converting the Markdown to HTML.
#
# title:     → sets the <title> tag in head.html (browser tab text)
# layout:    → which layout template to wrap this page in (default.html)
# type:      → custom field, can be used for conditional styling
# permalink: → the URL path for this page (yourdomain.com/contact)
title: Nagendra Tanikella's contact details
layout: default
type: contact
permalink: /contact
---

<!-- markdown="1" tells Jekyll to process Markdown INSIDE this <div>.
     Without it, everything inside <div> tags is treated as raw HTML.
     class="contact" can be used as a CSS selector to style this page. -->
<div markdown="1" class="contact">

## Contact

<!-- Markdown link syntax: [link text](URL)
     <i class="fa fa-envelope"></i> inserts a Font Awesome envelope icon.
     "mailto:" makes the link open the user's email client. -->
[<i class="fa fa-envelope"></i> tani7947@vandals.uidaho.edu](mailto:tani7947@vandals.uidaho.edu)

---

## Send me a message

<!-- HTML <form> element: collects user input and sends it to a server.
     action="..."  → the URL where form data is sent when submitted.
                     Web3Forms is a free form submission service.
     method="POST" → sends data in the request body (not visible in the URL).
     class="contact-form" → styles defined in _style.scss. -->
<form action="https://api.web3forms.com/submit" method="POST" class="contact-form">

  <!-- Hidden input: sends your Web3Forms access key with the form data.
       type="hidden" means this field is invisible to the user.
       Replace the value with YOUR access key from web3forms.com. -->
  <input type="hidden" name="access_key" value="01621979-a3fe-4a30-8804-76e20a8f7dc9">

  <!-- Honeypot spam protection: bots auto-fill this invisible checkbox,
       but real users never see it. Web3Forms rejects submissions where
       this is checked. style="display: none;" hides it completely. -->
  <input type="checkbox" name="botcheck" style="display: none;">

  <!-- Name field.
       <label> wraps both the text label and the input — clicking the label
       focuses the input, which improves accessibility.
       type="text" → standard single-line text input.
       name="name" → the field name sent to Web3Forms.
       required    → browser won't submit the form if this field is empty.
                     Remove "required" to make the field optional. -->
  <label>
    Your Name*
    <input type="text" name="name" required>
  </label>

  <!-- Email field.
       type="email" → browser validates that the input looks like an email
       (must contain @ and a domain). Also shows an email-specific keyboard
       on mobile devices. -->
  <label>
    Your Email*
    <input type="email" name="email" required>
  </label>

  <!-- Message field.
       <textarea> is a multi-line text input (unlike <input> which is single-line).
       rows="4" → initial visible height in text rows. Increase → taller box. -->
  <label>
    Message*
    <textarea name="message" rows="4" required></textarea>
  </label>

  <!-- Hidden subject line: sets the email subject you'll see in your inbox.
       Change the value to customize the subject line. -->
  <input type="hidden" name="subject" value="New message from ngtanikella.github.io">

  <!-- Submit button.
       <button type="submit"> triggers the form submission.
       The text "Send Message" is what the user sees on the button.
       Styled in _style.scss under .contact-form button. -->
  <button type="submit">Send Message</button>

  <!-- Redirect after submission: sends the user to your thank-you page.
       Change the value URL to redirect somewhere else. -->
  <input type="hidden" name="redirect" value="{{site.url}}{{site.baseurl}}/thank-you/">

</form>

---

<!-- Social profile links.
     These use Markdown link syntax with inline images:
     [<img ...> Link Text](URL){:target="_blank"}

     {:target="_blank"} is Kramdown syntax (Jekyll's Markdown processor)
     that adds target="_blank" to the generated <a> tag, making the link
     open in a new tab.

     Each line creates: a small logo icon + the service name, linked to your profile.
     The .inline-logo class (defined in _style.scss) keeps icons at 1em height. -->

[<img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/Google_Scholar_logo.svg.png" alt="Google Scholar" class="inline-logo"> Google Scholar]({{ site.google_scholar_url }}){:target="_blank"}

[<img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/Linkedin.png" alt="LinkedIn" class="inline-logo"> LinkedIn](https://linkedin.com/in/{{ site.linkedin_username }}){:target="_blank"}

[<img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/GitHub.png" alt="GitHub" class="inline-logo"> GitHub](https://github.com/{{ site.github_username }}){:target="_blank"}

[<img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/wos.jpg" alt="Web of Science" class="inline-logo"> Web of Science](https://www.webofscience.com/wos/author/record/NZO-1270-2025){:target="_blank"}

[<img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/ORCID.png" alt="ORCID" class="inline-logo"> ORCID](https://orcid.org/0000-0003-1678-1932){:target="_blank"}

[<img src="{{site.url}}{{site.baseurl}}/docs/cv/Logos/Researchgate.jpeg" alt="ResearchGate" class="inline-logo"> ResearchGate](https://www.researchgate.net/profile/Nagendra-Tanikella){:target="_blank"}

</div>
