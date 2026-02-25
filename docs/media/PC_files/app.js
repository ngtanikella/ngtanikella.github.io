// Setup mtu varialbe to add functions to later so we can call them on the page when needed.
const mtu = {};

(function () {
  /**
   * Creating global variables and functions that are used throughout the JavaScript.
   * `mobile` is used for if the site is small enough for mobile or not.
   * `reducedMotion` checks for if the user wants to disable animations.
   * `cookie` is for browser cookies.
   * `cookie.set` creates a cookie
   * `cookie.get` will get the value of a specific cookie.
   * `cookie.toggle` will clear the time for a cookie that exists.
   */
  const formal = {
    /** Get the width of the window and return string. [ small | medium | large ] */
    getScreenSize() {
      let size;
      if (window.innerWidth < 650) {
        size = "small";
      } else if (window.innerWidth < 880) {
        size = "medium";
      } else {
        size = "large";
      }
      return size;
    },
    hashTarget: window.location.hash,
    reducedMotion:
      window.matchMedia("( prefers-reduced-motion: reduce )").matches ||
      localStorage.getItem("mtuAnimations") === "reduced",
    cookie: {
      /**
       * Set cookie in browser.
       * @param {string} cookieName Name of the cookie.
       * @param {string} cookieValue What data you want associated with it.
       * @param {int} expireInXDays number of days cookie will live.
       */
      set(cookieName, cookieValue, expireInXDays) {
        const d = new Date();
        d.setTime(d.getTime() + expireInXDays * 24 * 60 * 60 * 1000);
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${cookieName}=${cookieValue};Secure;${expires};path=/;domain=mtu.edu;SameSite=Lax;`;
      },
      /**
       * Get value from cookie in browser.
       * @param {string} cookieName Name of cookie to get.
       */
      get(cookieName) {
        const name = `${cookieName}=`;
        const allCookies = document.cookie.split(";");
        let cookie;
        let currentCookie;

        for (
          currentCookie = 0;
          currentCookie < allCookies.length;
          currentCookie++
        ) {
          cookie = allCookies[currentCookie];
          while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
          }
          if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
          }
        }
        return "";
      },
      /**
       * Sets the cookie expireation date to yesterday.
       * @param {string} cookieName Name of cookie to expire.
       */
      expire(cookieName) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      },
      /**
       * This will expire a cookie if it exists or set it if it does not.
       * @param {string} cookieName Name of the cookie.
       * @param {string} cookieValue What data you want associated with it.
       * @param {int} expireInXDays number of days cookie will live.
       */
      toggle(cookieName, cookieValue, expireInXDays) {
        const cookieVal = cookieValue || 1;
        const cookieExpire = expireInXDays || 7;
        if (formal.cookie.get(cookieName).length === 0) {
          formal.cookie.set(cookieName, cookieVal, cookieExpire);
        } else {
          formal.cookie.set(cookieName, 0, -1);
        }
      },
    },
  };

  /**
   * Insert a script or a style tag into the dom. Only can be used for CSS or JS.
   * @param {string} type ( script / link ) tag to be inserted.
   * @param {string} file path to file we want to insert.
   */
  mtu.insertTag = function (type, file) {
    // If paramaters aren't defined or this script already exists, exit.
    if (
      (type !== "link" && type !== "script") ||
      file === "" ||
      document.querySelectorAll(`script[src="${file}"]`).length > 0
    ) {
      return;
    }

    const tag = document.createElement(type);

    if (type === "script") {
      tag.src = file;
      tag.setAttribute("type", "text/javascript");
    } else {
      tag.setAttribute("href", file);
      tag.setAttribute("type", "text/css");
      tag.setAttribute("rel", "stylesheet");
    }

    const tagInsertLocation =
      document.getElementsByTagName(type).length - 3 < 0
        ? 0
        : document.getElementsByTagName(type).length - 3;
    const tagInsert = document.getElementsByTagName(type)[tagInsertLocation];
    tagInsert.parentNode.insertBefore(tag, tagInsert);
  };

  /**
   * Send a custom event to Google Analytics 4 through GTM's dataLayer.
   * @see https://stackoverflow.com/questions/64750940/how-to-programatically-send-an-event-to-ga4-without-google-tag-manager
   *
   * @param {string} event - Custom event name.
   * @param {object} eventParams - Custom event parameters.
   *
   * @example
   * window.__mtu__.sendGA4Event("zero_results", { file_name: "search", search_term: searchTerm });
   */
  mtu.sendGA4Event = function (event, eventParams) {
    let url = new URL(window.location.href);
    if (url.searchParams.has("debugGA4")) {
      console.log(event, eventParams);
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...eventParams,
    });
  };

  /**
   * Formats given number to be correct USD currency with commas.
   * @param {float} number Number that needs to be formatted.
   * @link https://stackoverflow.com/questions/5043650/how-can-i-correctly-format-currency-using-jquery
   */
  function formatCurrency(number) {
    return parseFloat(number, 10)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  }

  function directedit() {
    if (
      document.getElementById("de") != null &&
      document.getElementById("directedit")
    ) {
      var link = document.getElementById("de").parentNode.innerHTML;
      document.getElementById("de").parentNode.innerHTML = "";
      document.getElementById("directedit").innerHTML = link;
    }
  }

  /** Small scripts for page modifications */
  function pageTweaks() {
    // Site title logos
    $(".sitetitle-logo").siblings("div").addClass("logo-shift");

    // Remove index.html from links
    $('a[href*="index.html"]').each(function () {
      const updatedLink = $(this).attr("href").replace("index.html", "");
      $(this).attr("href", updatedLink);
    });

    //Remove Blank Li's / Empty li
    $("li").each(function () {
      if ($(this).text().trim().length < 1 && $(this).children().length < 1) {
        $(this).hide();
      }
    });

    // Specific to blog pop-ups
    $("article.post").each(function (index) {
      const $article = $(this);
      $article.find("img").each(function () {
        const $image = $(this);
        if ($article.width() > 25) {
          if (
            $image.hasClass("size-full") ||
            $image.hasClass("size-medium") ||
            $image.hasClass("size-thumbnail") ||
            typeof $image.attr("width") !== "undefined"
          ) {
            $image.attr("data-fancybox-group", `group${index}`);
            $image.parent("a").addClass("fancybox");
            $image.parent("a").attr("rel", `group${index}`);
          }
        }
      });
    });

    // Sidebar vs nosidebar with RSS Feeds
    if ($(".feed-import").length > 0) {
      if ($(".right-sidebar").length === 0) {
        $(".feed-import")
          .closest('div[class^="boxed-section"]')
          .addClass("nosidebar");
      }
    }

    // Sets the max width on `.caption` items so they float correctly.
    const caption = $(".caption");
    caption.each(function () {
      const $this = $(this);
      const image = $this.find("img");

      const img = new Image();
      img.src = image.attr("src");

      // If there is a caption on it we need to se the max-width of it.
      // Listening for the load event because lazy loading has the width at 0 otherwise.
      // Need to use `addEventListener` because the jQuery on('load') wont work on `img`.
      img.addEventListener("load", function () {
        if (image.width() > 0) {
          $this.css("max-width", image.width());
        }
      });
    });

    // Don't wrap images with yellow
    if (
      $("p img, li img").parent().is("a") &&
      $("img").parent().parent().not($("#header-logo"))
    ) {
      $("img").parent("a").addClass("nothing");
    }

    $("img").each(function () {
      if ($(this).parent().is("a")) {
        $(this).parent().attr("data-linked-image", true);
      }
    });

    /* clear the data-ae_domuel left by LevelAccess */
    setTimeout(function () {
      const dataAe = $("[data-ae_domuel]");
      if (dataAe.length < 1) {
        return;
      }
      dataAe.each(function () {
        $(this).removeAttr("data-ae-domuel");
      });
    }, 10000);

    // Register clicks on the "Learn More" slide out tab for cards as link clikcs.
    $(".card-button").click(function () {
      const link = $(this)
        .parent()
        .prev()
        .children(".card-section")
        .children("a");
      if (link.length > 0) {
        link.get(0).click();
      }
    });

    /* Fixes row with left images spacing when a OL or UL text is wrapped.
     * if its the 0-3 element AND it is a `ol` or `ul` AND it isn't under a `.small-left`
     * THEN it executes the margin right on the image and returns the `.some()` as true, stops iterating.
     * Used DeepSeek to help reduce this to one line.
    */
    document.querySelectorAll('.row-left-image').forEach(
      row => [...row.children[1].children].some(
         (el, i) => i <= 3
         && el.matches('ol, ul')
         && !row.children[1].classList.contains('small-left')
         && (row.children[0].querySelector('img').style.marginRight = '2rem', true)
      )
    );

    /* offsets list items when they are close to an image that is floated left. */
    const captionImage = document.querySelectorAll('.caption-wrapper:has(.left)');
    captionImage.forEach(item => {
        let el = item;
        let i = 0;
        while (el.nextElementSibling) {
            el = el.nextElementSibling;
            if (el.nodeName === 'UL' || el.nodeName === 'OL') {
                el.style.transform = 'translateX(1rem)';
                el.style.maxWidth = 'calc(100% - 1rem)';
                el.style.boxSizing = 'border-box';
            }
            if (i === 3 || el.nodeName.indexOf('H') === 0) {
                break;
            }
            i++;
        }
    });
  }

  /** The info button that is on the header image click event */
  function initLegacyInfoClick() {
    // Show the caption on the slideshow
    $("#info-click").on("click keyup", function () {
      if (formal.reducedMotion) {
        $("#caption").slideDown(0);
      } else {
        $("#caption").slideDown("fast");
      }
      $("#info-click").toggle();
    });
    $("#caption").on("click", function () {
      if (formal.reducedMotion) {
        $("#caption").slideUp(0);
      } else {
        $("#caption").slideUp("fast");
      }

      $("#info-click").toggle();
    });
  }

  /* ----------------------------------- */
  /* ## Nav Shuffle and Tab Switch       */
  /* ----------------------------------- */
  function toggleMenuTabIndex(tabbable) {
    const clickableElements = $("#main-menu").find("a, button");

    if (formal.getScreenSize() === "large") {
      clickableElements.attr("tabindex", 0);
      return;
    }

    if (tabbable === "true") {
      clickableElements.attr("tabindex", 0);
    } else {
      clickableElements.attr("tabindex", -1);
    }
  }

  function navShuffle() {
    const $nav = $("#main-nav");
    const $menu = $("#main-menu");
    const giveApply = $menu.find(".give-apply");
    const pageMenu = $menu.find(".category-nav-bar");
    const searchIcon = $("#main-nav").find(".search-trigger");
    const searchMenu = $menu.find(".search-quick");
    const searchContents = searchIcon.contents();
    const viewport = formal.getScreenSize();

    if (viewport === "medium" || viewport === "small") {
      $menu.prepend(pageMenu);
      $menu.prepend(giveApply);
      // Put search icon under #main-nav
      $nav.prepend(searchIcon);
      // Change its type from li -> button
      searchIcon.wrap('<div class="search-trigger"></div>');
      searchContents.unwrap();
    } else {
      $menu.append(giveApply);
      $menu.append(pageMenu);
      // Put search icon before .serach-trigger
      searchMenu.prepend(searchIcon);
      // Change its type from button -> li
      searchIcon.wrap('<li class="search-trigger"></li>');
      searchContents.unwrap();
    }
  }

  /** Get the nav to be keyboard accessable and have click events for icons and mobile nav */
  function initLegacyNav() {
    /* ------------------------------------ */
    /* ## Nav Variables                     */
    /* ------------------------------------ */
    const $mainNav = $("#main-nav");
    const $mobileMenuButton = $(".header-dropdown-trigger");
    const mainNavDropdowns = $($mainNav).find(".main-nav-item > ul");
    const topLevelButtonItems = $($mainNav).find(
      " .main-nav-item.sub > a button, .main-nav-item.sub > button, .audience-menu button"
    );
    const lastSubMenuItems = $($mainNav).find(
      " .main-nav-item ul li:last-child a, .quick-links-nav li:last-child a "
    );
    const quickLinks = $($mainNav).find(
      ".quick-links-toggle, .quick-links-toggle + .mobile-nav-open-sub"
    );

    // Search box
    const $searchTrigger = $(".search-trigger");
    const searchTriggerAnchor = $($searchTrigger).find("a");
    const $searchBox = $(".search-box");
    const searchForms = $($searchBox).find(".search-input");

    /* ------------------------------------ */
    /* ## Nav Event Handlers                */
    /* ------------------------------------ */

    /**
     * Toggles the mobile nav
     *
     * @param {boolean}  close [True/False] Flag to force close the mobile nav.
     */
    function toggleMobileMenu(close) {
      let expanded;
      const closeToggle = close ? "removeClass" : "toggleClass";
      $mainNav[closeToggle]("toggled");

      if ($mainNav.hasClass("toggled")) {
        expanded = "true";
      } else {
        expanded = "false";
      }
      // toggleMenuTabIndex(expanded);
      $mobileMenuButton.attr("aria-expanded", expanded);
    }

    /**
     * Toggles the subnav.
     * Used for opening and closing nav items for both desktop and mobile.
     *
     * @param {object} event The event from the listener.
     * @param {object} button HTML element that was clicked on.
     * @param {boolean} close [True/False] Flag to force close all subnavs.
     */
    function toggleSubNav(event, button, close) {
      if (close === true) {
        $(".sub-nav-open").removeClass("sub-nav-open");
        $(".toggle-open").attr("aria-expanded", false);
        $(".toggle-open").removeClass("toggle-open");
        return; // Early return to make sure the rest doesn't fire.
      }

      // Stop the event from happening.
      if (event !== null && event !== undefined) {
        event.stopPropagation();
        event.preventDefault();
      }

      // Grab the parent
      const buttonParent = button.parent();
      const ariaToggle =
        buttonParent.attr("aria-expanded") === "true" ? "false" : "true";

      if (buttonParent.is("a")) {
        buttonParent.next().toggleClass("sub-nav-open");
      } else if (buttonParent.is("li")) {
        button.next().toggleClass("sub-nav-open");
      }

      buttonParent.toggleClass("toggle-open");
      buttonParent.attr("aria-expanded", ariaToggle);
    }

    /**
     * Toggles the subnav.
     * Used for opening and closing nav items for both desktop and mobile.
     *
     * @param {object} event The event from the listener.
     * @param {object} button HTML element that was clicked on.
     * @param {boolean} close [True/False] Flag to force close all subnavs.
     */
    function toggleQuickLinks(event, close) {
      const clickableElements = $(".quick-links-nav").find("a, button");

      if (close === true) {
        $(".quick-links-toggle-open").removeClass("quick-links-toggle-open");
        $(".quick-links-nav-open").removeClass("quick-links-nav-open");
        $(".quick-lins").attr("aria-expanded", false);
        return; // Early return to make sure the rest doesn't fire.
      }

      // Stop the event from happening.
      if (event !== null && event !== undefined) {
        event.stopPropagation();
        event.preventDefault();
      }

      // Grab the parent
      const ariaToggle =
        quickLinks.attr("aria-expanded") === "true" ? "false" : "true";

      if (
        quickLinks.attr("aria-expanded") === "undefined" ||
        quickLinks.attr("aria-expanded") === "true"
      ) {
        clickableElements.attr("tabindex", 0);
      } else {
        clickableElements.attr("tabindex", -1);
      }

      quickLinks.toggleClass("quick-links-toggle-open");
      quickLinks.next(".quick-links-nav").toggleClass("quick-links-nav-open");
      quickLinks.attr("aria-expanded", ariaToggle);
    }

    /**
     * Toggles the searchbox opening and sets focus on the input or the search
     * icon depending on if it is opening or closing.
     * If no `event` is passed the assumed function it to close the searchbox.
     *
     * @param {object} event The event from the listener.
     * @param {bool} close [True/False] Flag to force close the search box.
     */
    function toggleSearchBox(event, close) {

      if (event.type === "keydown" && !$searchBox.hasClass("search-open")) {
        return;
      }

      const closeToggle = close ? "removeClass" : "toggleClass";
      const ariaToggle =
        searchTriggerAnchor.attr("aria-expanded") === "true" ? "false" : "true";
      const ariaHiddenToggle =
        $searchBox.attr("aria-hidden") === "false" ? "true" : "false";

      $searchBox[closeToggle]("search-open");
      $searchBox.attr("aria-hidden", ariaHiddenToggle);
      $searchTrigger[closeToggle]("search-open");
      searchTriggerAnchor.attr("aria-expanded", ariaToggle);

      // Toggle the tab index
      searchForms.each(function (index) {
        const $this = $(this);
        const tabindex =
          !close && parseInt($this.attr("tabindex"), 10) === -1 ? 0 : -1;
        $this.attr("tabindex", tabindex);

        // On the first loop check to see if the input is focusable.
        // Otherwise focus back on the search icon.
        $searchBox.on("transitionend", function () {
          if (index === 0) {
            if (tabindex === 0) {
              $this.focus();
            } else {
              searchTriggerAnchor.focus();
            }
          }
        });
      });
    }

    function mainNavEscapeHandler(event) {
      toggleMobileMenu(true);
      toggleQuickLinks(null, true);

      toggleSearchBox(event, true);
      toggleSubNav(null, null, true);
    }
    /* ------------------------------------ */
    /* ## Nav Event Listeners               */
    /* ------------------------------------ */
    $(document).keydown(function (event) {
      if (event.keyCode === 27) {
        mainNavEscapeHandler(event);
      }
    });

    $(document).mouseup(function (event) {
      // Let /admissions/connect/staff/ track the user's mouse
      // movements without being interrupted.
      var foundMouseUpListener = false;
      ["#map *"].forEach(function (selector) {
        if ($(event.target).is(selector)) {
          foundMouseUpListener = true;
        }
      });

      ["#viewer *"].forEach(function (selector) {
        if ($(event.target).is(selector)) {
          foundMouseUpListener = true;
        }
      });

      if (foundMouseUpListener) {
        return;
      }

      if (
        $(event.target).is("#search-box-container *") ||
        $(event.target).is("#js-site-header *")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }

      mainNavEscapeHandler(event);
    });

    $mainNav.keydown(function (event) {
      const $target = $(event.target);
      const key = event.keyCode;

      if (key === 13 && !$target.is("a")) {
        toggleSubNav(event, $target);
      }

      if (key === 32) {
        toggleSubNav(event, $target);
      }
    });

    $mobileMenuButton.click(function (event) {
      toggleMobileMenu();
      toggleSearchBox(event, true);
    });

    $mobileMenuButton.keydown(function (event) {
      if (event.keyCode === 32 || event.keyCode === 13) {
        toggleMobileMenu();
        toggleSearchBox(event, true);
      }
    });

    quickLinks.click(function (event) {
      toggleQuickLinks(event);
      toggleSearchBox(event, true);
    });

    quickLinks.keydown(function (event) {
      if (event.keyCode === 32 || event.keyCode === 13) {
        toggleQuickLinks(event);
        toggleSearchBox(event, true);
      }
    });

    // Set up event listeners
    /* eslint-disable */
    // TODO: fix this event hell.
    mainNavDropdowns.each(function (event) {
      var $this = $(this);
      if (
        window.matchMedia &&
        window.matchMedia("( max-width: 881px )").matches
      ) {
        return;
      }

      $this.parent().mouseenter(function (event) {
        toggleSubNav(event, $this);
      });

      // Need to close the aria label and toggle when the menu is no longer being hovered.
      $this.mouseleave(function (event) {
        if (true === $(event.currentTarget).is("ul")) {
          toggleSubNav(event, $this, true);
        }
      });
    });
    /* eslint-enable */

    topLevelButtonItems.each(function () {
      const $this = $(this);
      $this.click(function (event) {
        toggleSubNav(event, $this);
      });
    });

    lastSubMenuItems.each(function () {
      const $lastItems = $(this);

      $lastItems.keydown(function (event) {
        if (event.keyCode === 9 && event.shiftKey === false) {
          toggleSubNav(event, $(this), true);
        }
      });
    });

    searchTriggerAnchor.click(function (event) {
      event.preventDefault();
      toggleSearchBox(event);
      toggleMobileMenu(true);
      toggleQuickLinks(event, true);
    });

    searchTriggerAnchor.keydown(function (event) {
      if (event.keyCode === 32) {
        toggleSearchBox(event);
        toggleMobileMenu(true);
      }
    });
  }

  function initFeeds() {
    const $feeds = $(".feed-import");
    if ($feeds.length === 0) {
      return;
    }

    function setupFeeds(feed, element) {
      if (
        feed.width() > 500 &&
        (formal.getScreenSize() === "small" ||
          formal.getScreenSize() === "medium")
      ) {
        if (!element.hasClass("announcements")) {
          element.addClass("flex");
        }
      }
      if (feed.parents().hasClass("one") && feed.width() > 800) {
        element.closest(".boxed-section").addClass("nosidebar");
      }
    }

    function importFeed(element) {
      if (typeof element.data("href") === "undefined") {
        return;
      }

      $.get(element.data("href"), function (data) {
        let anchorFeed;
        let anchorClose;
        let anchorLink;
        let anchorTitle;

        if (data.length < 100) {
          anchorFeed = "";
          anchorClose = "";

          anchorLink = element
            .closest("div")
            .siblings(".top-title")
            .find("a")
            .attr("href");
          anchorTitle = element
            .closest("div")
            .siblings(".top-title")
            .find("h2")
            .text();

          if (typeof anchorLink !== "undefined" && anchorLink.length < 0) {
            anchorFeed = `<a href="${anchorLink}">`;
            anchorClose = "</a>";
          }
          if (element.hasClass("events")) {
            /* element.html(
              `<div class="no-feed"><div>${anchorFeed}<span>No Upcoming ${anchorTitle} Scheduled</span>${anchorClose}</div></div>`
            ); */
            element.html(
              `<div class="no-feed"><div>${anchorFeed}<span>No Upcoming Events Scheduled</span>${anchorClose}</div></div>`
            );
          } else {
            element.html(
              `<div class="no-feed"><div>${anchorFeed}<span>No ${anchorTitle} Found</span>${anchorClose}</div></div>`
            );
          }
        } else {
          element.html(data);
        }
      });
    }

    $feeds.each(function (index, element) {
      const $element = $(element);
      const $feed = $(this);
      setupFeeds($feed, $element);
      importFeed($element);
    });
  }

  function initMultipleCalendars() {
    $(".calendar-selector a, .calendar-selector button").click(function () {
      const $calendar = $(this);
      const feed = $calendar.closest("div").next("div").find(".feed-import");
      let newFeed = $calendar.attr("rel");
      $.get(newFeed, function (data) {
        const feedLink = feed.closest(".item").find("a").attr("href");
        const feedTitle = feed.closest(".item").find("h2").text();
        if (data.length < 100) {
          feed.html(
            `<div class="no-feed"><div><a href="${feedLink}"><span>No ${feedTitle} Found</span></a></div></div>`
          );
        } else {
          feed.html(data);
        }
      });

      feed.attr("data-href", newFeed);

      $(".calendar-selector a, .calendar-selector button").removeClass(
        "active"
      );
      $calendar.addClass("active");
    });
  }

  function topTitleAriaFix() {
    $(".item .top-title, .column-inner .top-title").each(function () {
      const title = $(this).find("h2").text();
      $(this)
        .find("div a")
        .each(function () {
          if (
            $(this).text() === "See All" ||
            $(this).text() === "More" ||
            $(this).text() === "View All" ||
            $(this).text() === "Subscribe"
          ) {
            if (typeof $(this).attr("aria-label") === "undefined") {
              $(this).attr("aria-label", `${$(this).text()} ${title}`);
            }
          }
        });
    });
  }

  function youtubeNav() {
    const $youtubeThumbs = $(".youtube-item");
    const $movieLink = $(".movie-wrapper a");
    const $movieTitle = $(".movie-title > h2");
    const $movieDescription = $(".movie-description > p");

    if ($(".youtube-nav").length > 0) {
      $.getScript(
        "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
      ).done(function (script, textStatus) {
        slickSliderInit();
      });
      mtu.insertTag(
        "link",
        "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
      );
    }

    function youtubeThumbClickHandler(that) {
      const $this = that;
      const $thisMovie = that.closest(".youtube-nav").prev(".movie-wrapper");
      const $movieImage = $thisMovie.find(".movie img");
      const $movieImageWrapper = $thisMovie.find(".movie");
      const description = $this.attr("data-description");
      const title = $this.attr("data-title");
      let image = $this.attr("data-image");
      const ytID = $this.attr("data-youtube");

      $thisMovie.find(".show-for-sr").remove();

      // If the images are already getting cropped, pull only the path out.
      if (0 < image.indexOf("crop")) {
        image = image.substr(image.indexOf("path=") + 5);
      }

      const srcsethtml =
        "https://www.mtu.edu/mtu_resources/php/ou/images/crop.php?width=450&height=253&path=" +
        image +
        " 450w, https://www.mtu.edu/mtu_resources/php/ou/images/crop.php?width=800&height=450&path=" +
        image +
        " 800w, https://www.mtu.edu/mtu_resources/php/ou/images/crop.php?width=1200&height=720&path=" +
        image +
        " 1200w";

      // When the image is replaced change these classes.
      $movieImageWrapper.removeClass("loaded");
      $movieImageWrapper.addClass("loading");

      $movieLink.attr(
        "href",
        "//www.youtube.com/embed/" + ytID + "?autoplay=true"
      );
      $movieImage.attr("src", image);
      $movieImage.attr("srcset", srcsethtml);
      $movieTitle.text(title);
      $movieDescription.text(description);
      $movieImage.attr("alt", "Preview image for " + title);

      $movieImageWrapper.prepend(
        $("<div>").prop({
          innerHTML: "Watch " + title,
          className: "show-for-sr",
        })
      );

      // After the image has been changed then swap these classes again.
      $movieImage.on("load", function () {
        $movieImageWrapper.removeClass("loading");
        $movieImageWrapper.addClass("loaded");

        var headerHeight = 0;
        if (new RegExp("^/tomorrowneeds", "i").test(window.location.pathname)) {
          headerHeight = $(".main-menu-wrapper").outerHeight();
        } else {
          headerHeight = parseInt(
            window
              .getComputedStyle(document.documentElement)
              .getPropertyValue("--mtu-header-height"),
            10
          );
        }

        window.scrollTo({
          top: $movieImageWrapper.offset().top - (headerHeight + 14),
          left: 0,
          behavior: "smooth",
        });
      });
    }

    $youtubeThumbs.on("click", function () {
      youtubeThumbClickHandler($(this));
    });
  }

  var slickSliderInit = function () {
    /*  ===================================================================
            # YOUTUBE
        ===================================================================  */
    const slickSpeed = formal.reducedMotion ? 0 : 300;
    $(".youtube-nav").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      arrows: true,
      speed: slickSpeed,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    /* remove the lazy loading after slick slider initiates so the thumbnails are all there */
    const slickSlides = document.querySelectorAll(".slick-slide");
    slickSlides.forEach((slide) => {
      const img = slide.querySelector("img");
      img.setAttribute("loading", "");
    });
  };

  function shrinkHeader(remove) {
    const $header = $("#header, #subnav");
    const $searchBox = $(".search-box");
    const $newHeader = $("#js-site-header");
    let $titleOffset;
    const resolution = 5;
    let $paddingTarget;

    if ($(".sitetitle").length !== 0) {
      $paddingTarget = $(".sitetitle");
    } else if ($(".site-title").length !== 0) {
      $paddingTarget = $(".site-title");
    } else {
      $paddingTarget = $("#main");
    }

    if (
      $(window).scrollTop() > resolution &&
      formal.getScreenSize() === "large"
    ) {
      $header.addClass("shrink");
      $newHeader.addClass("shrink");
      $searchBox.addClass("shrink");
      // Set the offset height after the nav is shrank to avoid it flickering.w
      $titleOffset = $newHeader.height();
      $paddingTarget.css("border-top", `${$titleOffset}px solid black`);
    } else if (
      ($(window).scrollTop() < resolution &&
        formal.getScreenSize() === "large") ||
      remove === true
    ) {
      $header.removeClass("shrink");
      $newHeader.removeClass("shrink");
      $searchBox.removeClass("shrink");
      $paddingTarget.removeAttr("style");
    }
  }

  /** This controls all sliders. Regular accordions and FAQ accordions. */
  mtu.initSliders = function () {
    let slideSpeed = 200; // Speed the sliders expand/collapse.

    if (formal.reducedMotion) {
      slideSpeed = 0;
    }

    /* If there is sliders that have a blank parent div give it the `faqs` class */
    if (
      $(".slider").parent(".sliders").length < 1 &&
      $(".slider").parent(".faqs").length < 1
    ) {
      $(".slider").parent().addClass("sliders");
    }

    const $sliders = $(".sliders, .faqs");

    // If not sliders are found, don't run the rest of this function.
    if ($sliders === "undefined" || $sliders.length <= 0) {
      return;
    }

    /* If we have a slider directly after another slider, combine them to make a single slider */
    // var $sliders = $('.sliders');
    $sliders.each(function () {
      const $this = $(this);
      const $siblingSliders = $this.nextUntil(":not(.sliders)", ".sliders");
      $siblingSliders.each(function (index, siblingSlider) {
        $this.append($(siblingSlider).html());
        $(siblingSlider).remove();
      });
    });

    /**
     * Quick fix for FAQ schema, removes redundant schema from each FAQ section and consolidates
     * schema to page-content.
     */
    $faq_slider = $(".faq:first").closest(".content");
    if ($faq_slider.length == 1) {
      const $content = $(".content").first();
      $content.attr("itemtype", "https://schema.org/FAQPage");
      $content.attr("itemscope", "");
    }

    if ($sliders.length >= 1) {
      $sliders.each(function () {
        const $slider = $(this);
        $slider.removeAttr("itemtype");
        $slider.removeAttr("itemscope");
      });
    }

    /**
     * Handles the click event for slider headings.
     * Swaps the aria-expanded value and then expands/collapses the slider accordingly.
     * @param {object} slider the slider container.
     */
    function sliderItemClickHandler(slider) {
      let sliderAria;
      let slide;

      if (slider.attr("aria-expanded") === "true") {
        sliderAria = false;
        slide = "slideUp";
      } else {
        sliderAria = true;
        slide = "slideDown";
      }

      // Scroll to top of slider when it is colsed on mobile.
      // The CSS holds the heading over the content while a user
      if (formal.getScreenSize() === "small" && sliderAria === false) {
        const siteHeaderHeight = $(".top-banner-wrap").height() * 2.5;
        const sliderOffset = slider.offset().top;

        if ($(document).scrollTop() > sliderOffset) {
          $("html,body").animate(
            {
              scrollTop: sliderOffset - siteHeaderHeight,
            },
            25
          );
        }
      }
      slider.attr("aria-expanded", sliderAria);
      slider.find(".slider-content, .accordion")[slide](slideSpeed);
    }

    /**
     * Checks links on the page and if they are pointed to a slider on the current
     * page it will open that slider.
     */
    $('[href*="#"]').each(function () {
      const $link = $(this);
      const linkHREF = $link.attr("href");
      const linkTarget = `#${linkHREF.split("#")[1]}`;
      // Pretty much, if it has just a hash or a special character it will throw an error so skip it.
      if (linkTarget === "#" || linkTarget.substr(1).match(/[*^'!#/]/)) {
        return;
      }

      setTimeout(function () {
        const $targetElement = $(linkTarget);
        if ($targetElement.length > 0) {
          if ($targetElement.hasClass("slider")) {
            $link.click(function () {
              $targetElement.attr("aria-expanded", "true");
              $targetElement.children(".slider-content").slideDown();
            });
          }
        }
      }, 100);
    });

    /**
     * Handles the Expand All button's click event.
     * @param {object} toggle used to check the `data-state` and collapse or expand slider.
     * @param {object} accordions all of the the accordions under the heading.
     */
    function expandToggleClickHandler(toggle, accordions) {
      const toggleState = toggle.attr("data-state");
      let aria;
      let slide;
      let html;

      // Set some variables based off the toggleState.
      if (toggleState === "expandable") {
        toggle.attr("data-state", "collapsable");
        aria = "true";
        slide = "slideDown";
        html = "Collapse All";
      } else {
        toggle.attr("data-state", "expandable");
        aria = "false";
        slide = "slideUp";
        html = "Expand All";
      }

      accordions.each(function () {
        const $slider = $(this);
        toggle.html(html); // Change the text of the Expand All button.
        $slider.attr("aria-expanded", aria);
        $slider.find(".slider-content, .accordion")[slide](slideSpeed);
      });
    }

    /**
     * If there is a #target in the url it will open that slider automatically.
     */
    function sliderTargetOpen() {
      let $hashLocation = $(formal.hashTarget);

      // Check for inline JS variable to force open a slider
      if (typeof mtu_slider_select !== "undefined" && $hashLocation !== "") {
        if (mtu_slider_select == "first") {
          // find first slider on page and open it
          $hashLocation = $(".slider").first();
        } else {
          // open the id of the slider
          $hashLocation = $(`#${mtu_slider_select}`);
        }
      }

      // If check for a regular Slider or an FAQ.
      if ($hashLocation.hasClass("slider")) {
        $hashLocation.attr("aria-expanded", "true");
        $hashLocation.find(".slider-content, .accordion").slideDown(slideSpeed);
      } else if ($hashLocation.hasClass("accordion-title")) {
        $hashLocation.parent(".item").attr("aria-expanded", "true");
        $hashLocation
          .parent(".item")
          .find(".slider-content, .accordion")
          .slideDown(slideSpeed);
      }
    }

    $sliders.each(function () {
      const $slider = $(this);
      let sliderItems;
      let $sliderTitle;
      let $sliderTitleBar;
      let $sliderExpandToggle;

      // See if it is a regular slider or an FAQ and target the appropriate children items.
      sliderItems = $slider.find(".slider");

      if (sliderItems.length < 1) {
        sliderItems = $slider.find(".inner > .item");
      }

      sliderItems.each(function () {
        /**
         * Need to taget the `accordion-title` for the click event.
         * Otherwise it will fire when clicked inside the content.
         * This would prevent users from selecting text.
         * Passing the slider to the function to trigger animations and aria labels.
         */
        const $individualSlider = $(this);

        $individualSlider.attr("aria-expanded", "false");

        $sliderTitleBar = $individualSlider.find(
          ".accordion-title, .accordian-title"
        );

        $sliderTitleBar.click(function () {
          sliderItemClickHandler($individualSlider);
        });

        $sliderTitleBar.closest(".slider").keydown(function (event) {
          $target = $(event.target);
          if (event.keyCode === 32 || event.keyCode === 13) {
            if ($target.is("a") || $target.is("input")) {
              return;
            }

            event.preventDefault();
            sliderItemClickHandler($individualSlider);
          }
        });
      });

      // If there are more than two slider items, add an "Expand All" button.

      $sliderTitle = $slider.prev(".top-title, h2, h3");
      const sliderExpandHTML =
        '<p style="display: table-cell;" class="toggle slider-group" data-state="expandable" tabindex="0" role="button">Expand All</p>';

      // Sliders only have `h2` for titles. FAQs ceme with a `.top-title` class.
      // This will wrap the titles with `.toggle-wrap` and align the `h2` in it.
      if ($sliderTitle.length > 0) {
        // $sliderTitle.addClass( 'toggle-align' );
        if (sliderItems.length > 1) {
          if ($sliderTitle.hasClass("graybar")) {
            $sliderTitle.wrap('<div class="toggle-wrap graybar"></div>');
          } else {
            $sliderTitle.wrap('<div class="toggle-wrap"></div>');
          }
        }

        // Retarget $sliderTitle to the the toggle-wrap that was created.
        $sliderTitle = $sliderTitle.parent(".toggle-wrap");
      } else if ($slider.prev(".slider").length < 1) {
        if ($slider.hasClass("faqs") || $slider.hasClass("faq")) {
          $slider.addClass("toggle-wrap");
        }

        /* ===========[=====*====*===*===]========= */
        /* ===========[=*== BANDAID ==*==]========= */
        /* ===========[===*=====*===*====]========= */
        // Fix for when the slider is inisde a person.
        if ($slider.parent(".person").length < 1) {
          $slider.before('<div class="toggle-wrap"></div>');
        }
        $sliderTitle = $slider.prev(".toggle-wrap");
      }

      // Add `.toggle-wrap` if it isn't there, it that carries CSS styles
      if (!$sliderTitle.hasClass("toggle-wrap")) {
        $sliderTitle.addClass("toggle-wrap");
      }

      if (sliderItems.length > 2) {
        // Append the button to the `.toggle-wrap`.
        $sliderTitle.append(sliderExpandHTML);
        $sliderExpandToggle = $sliderTitle.find(".toggle");

        // Add click event to open all sliders.
        $sliderExpandToggle.click(function () {
          sliderItems_dynamic = jQuery('.toggle').parent().next('.sliders').children();
          expandToggleClickHandler($(this), sliderItems_dynamic);
        });

        $sliderExpandToggle.keydown(function (event) {
          if (event.keyCode === 32 || event.keyCode === 13) {
            event.preventDefault();
            sliderItems_dynamic = jQuery('.toggle').parent().next('.sliders').children();
            expandToggleClickHandler($(this), sliderItems_dynamic);
          }
        });
      }
    });

    sliderTargetOpen();
  };

  /** Hides a targeted element on click. */
  function showHideContent() {
    /** Remove Blank href's: "" and "#". */
    function removeBlankHrefs(that) {
      if (typeof that.attr("href") !== "undefined") {
        if (that.attr("href").length <= 1) {
          that.removeAttr("href");
        }
      }
    }

    /** Shows/Hides target data-rel attribute */
    function toggleDataRel(that) {
      const dataRel = that.attr("data-rel");

      if (typeof dataRel !== "undefined" && dataRel.length > 0) {
        $(dataRel).toggle();
      } else {
        that.parent().next(".hide-content").toggle();
      }

      that.toggleClass("clicked");
    }

    $(".show-hide").click(function () {
      removeBlankHrefs($(this));
      toggleDataRel($(this));
    });
  }

  /** Profile switching (Focuses) */
  function initFocus() {
    $.each($(".focus"), function () {
      const $profile = $(this);
      $profile.find(".item").addClass("hide-content"); // Hide everything
      $profile
        .find(
          `.item:eq(${
            Math.floor(
              Math.random() * ($profile.find(".item").length - 1 + 1) + 1
            ) - 1
          })`
        )
        .removeClass("hide-content"); // Choose a random focus
    });
  }

  /**
   * MTU Slideshows
   * TODO: Make accessable, low priority; it is not used often.
   * */
  function initMTUSlideshows() {
    const $slideshows = $(".mtuslideshow");

    // Return if there are no slideshows.
    if ($slideshows.length === 0) {
      return;
    }

    $slideshows.each(function () {
      const $slideshow = $(this);
      const $slides = $(this).find(".item");
      const totalSlides = $slides.length;
      let slideCount = 0;
      const activeSlide = 0;
      let $slideshowNav;

      $slideshow.addClass("slideshow-loaded");

      /** Adds the naviagtion bubbles and arrows */
      function initSlideshowNav() {
        const $slideshowContent = $slideshow.find(".content");
        let navBubbleHTML = "";

        for (slideCount; slideCount < totalSlides; slideCount++) {
          navBubbleHTML += `<a class="goto${
            slideCount === 0 ? " active" : ""
          }" rel="${slideCount}" tabindex="0" role="link" aria-label="Image ${
            slideCount + 1
          }"></a>`;
        }

        let prevSlide = activeSlide === 0 ? totalSlides - 1 : activeSlide - 1;
        let nextSlide = activeSlide === totalSlides - 1 ? 0 : activeSlide + 1;

        const navhtml = `<div class="navigator"><a class="goto prev" rel="${prevSlide}" tabindex="0" role="link" aria-label="Image ${prevSlide}"></a>${navBubbleHTML}<a class="goto next" rel="${nextSlide}" tabindex="0" role="link" aria-label="Image ${nextSlide}"></a></div>`;

        $slideshowContent.append(navhtml);
        $slideshowNav = $slideshowContent.find(".navigator");
      }

      function changeSlideWrapper(e) {
        if (e.type === "keydown" && e.key === "Enter") {
          e.preventDefault();
          changeSlide.call(e.target);
        }
      }

      function changeSlide() {
        const $navButton = $(this);
        const slideNumber = parseInt($navButton.attr("rel"), 10); // `.attr` is returned as string, making it an integer.
        const currentSlide = $slideshow.find(
          `.item[data-rel="${slideNumber}"]`
        );
        const height = currentSlide.height();
        const $prevButton = $slideshowNav.find(".prev");
        const $nextButton = $slideshowNav.find(".next");
        let prevSlide = slideNumber - 1;
        let nextSlide = slideNumber + 1;

        if (prevSlide < 0) {
          prevSlide = totalSlides - 1;
        }

        if (totalSlides <= nextSlide) {
          nextSlide = 0;
        }

        $slideshowNav.find(".active").removeClass("active");
        $slideshowNav.find(`.goto[rel="${slideNumber}"]`).addClass("active");
        $slides.hide();
        currentSlide.show();
        $slideshow.find(".inner").css("min-height", height);

        $prevButton.attr("rel", prevSlide);
        $nextButton.attr("rel", nextSlide);
      }

      initSlideshowNav();

      // Setup initial slide attributes.
      $slides.each(function (index) {
        const $slide = $(this);

        $slide.attr("data-rel", index);

        if (index > 0) {
          $slide.hide();
        } else {
          const height = Math.floor($slide.height());
          $slide.parent(".inner").css("min-height", height);
        }
      });

      $slideshow.find(".goto").on("click", changeSlide);
      $slideshow.find(".goto").on("keydown", changeSlideWrapper);
    });
  }

  function initJumpMenus() {
    const $jumpMenu = $(".jump-menu");

    if ($jumpMenu.length === 0) {
      return;
    }

    function checkJumpMenu(target) {
      if ($(target).closest(".jump-menu").length === 0) {
        return false;
      }
      return true;
    }

    $(document).click(function (event) {
      if (checkJumpMenu(event.target) === true) {
        $(event.target).closest(".jump-menu").toggleClass("active");
      } else {
        $(".jump-menu.active").removeClass("active");
      }
    });
  }

  /** Focuses the fancybox on open, then the image that was clicked on when closed. */
  function fancyboxImages() {
    let lastImage = "";
    const fancyLink = $("a.fancybox");

    fancyLink.each(function () {
      const link = $(this);
      const image = link.find("img");
      const blacklist = ["#media"];
      let blacklisted = false;

      // If the image is in the blacklisted areas, don't wrap.
      $.each(
        blacklist,
        function (index, item) {
          if (link.closest(item).length > 0) {
            blacklisted = true;
            return false;
          }
        },
        this
      );

      if (blacklisted === true) {
        return;
      }

      // Add a `.hover-img` around images so they can get the little zoom icon.
      // hover-fancybox is a temp fix so I don't break JS before the new JS goes live
      // TODO: After this is live, update the CSS, merging hover-fancybox into hover-img.
      image.wrap('<div class="hover-img hover-fancybox"></div>');
    });

    //Bandaid fix to allow image with captions to dsiplay in sliders
    $(".slider-content .fancybox img").removeAttr("loading");

    // A bandaid fix for fancybox groups.
    // When we upgraded from fancybox 2.0 -> 3.0 we needed `data-fancybox` to define groups not `data-fancybox-group`
    // If we ever update all pages to have the new data attribute we can delete this each function.
    $("[data-fancybox-group]").each(function () {
      const $this = $(this);
      const group = $this.attr("data-fancybox-group");
      $this.attr("data-fancybox", group);
    });

    // Another bandaid fix for fancybox Iframes.
    // fancybox v2.0 used `fancybox.iframe` to load links into an iframe.
    // fancybox v3.0 uses a data attribute, `data-type`.
    $('[class*="fancybox.iframe"]').each(function () {
      $(this).attr("data-type", "iframe");
    });

    // Disable hash in CMS preview to avoid cross-origin error
    var inCmsPreview = window.location.hostname === 'a.cms.omniupdate.com';

    $(".fancybox").fancybox({
      autoFocus: false, // We handle this ourselves in afterOpen
      backFocus: false, // We handle this ourselves in afterClose
      parentEl: "#main", // Otherwise, it's document.documentElement and missing our CSS.
      type: "image",
      idleTime: false,
      hash: !inCmsPreview,
      helpder: {
        overlay: {
          locked: true,
        },
      },
      beforeShow() {
        const caption = $(this.element).data("caption");
        const captionTitle = $(this.$thumb).closest("[title]").attr("title");
        const imageAlt = $(this.$thumb).closest("[alt]").attr("alt");

        // console.log(this.caption, caption, captionTitle, imageAlt);
        // console.log(this);
        // Store wich image is being accessed.
        if (lastImage === "") {
          lastImage = $(this).attr("href");
        }

        if (caption && caption.length > 0) {
          this.caption = caption;
        }
      },
      afterShow() {
        $(".fancybox-is-open").focus();
        $(this).attr("role", "dialog");
      },
      afterClose() {
        // Focus to last image to keep keyboard navigation continiuty.
        const lastImg = this.$thumb;
        const lastPosition = $(lastImg).closest("a");
        lastPosition.focus();
        // If it scrolls when you close we need to bring it back into view.
        // $(lastImg).get(0).scrollIntoView();
      },
    });
  }

  /** Sets paramaters for fancybox videos and sets focus when opened and closed. */
  function fancyboxVideos() {
    let lastVideo = "";

    let videoWidth = "70%";
    let videoHeight = "70%";
    let videoMaxWidth = 1000;
    let videoMaxHeight = 563;

    if (formal.getScreenSize() == "small") {
      videoWidth = "100%";
      videoHeight = "100%";
      videoMaxWidth = window.innerWidth;
      videoMaxHeight = window.innerWidth * 0.562;
    }

    $(".various").fancybox({
      autoFocus: false, // We handle this ourselves in afterOpen
      backFocus: false, // We handle this ourselves in afterClose
      parentEl: "#main", // Otherwise, it's document.documentElement and missing our CSS.
      iframe: {
        tpl:
          '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture" src=""></iframe>',
        css: {
          width: videoWidth,
          maxWidth: videoMaxWidth,
          height: videoHeight,
          maxHeight: videoMaxHeight,
          margin: 0,
          padding: 0,
        },
      },
      idleTime: false,
      arrows: false,
      fitToView: false,
      autoSize: false,
      closeClick: false,
      openEffect: "elastic",
      closeEffect: "elastic",
      mouseWheel: false,
      helpers: {
        overlay: {
          locked: false,
        },
      },
      beforeShow() {
        const $video = $(this).get(0).opts.$orig;
        lastVideo = $video.attr("href");

        if ($video.attr("title") === "Video popup") {
          $video.attr("title", "");
        }

        // If its a youtube or vimeo video on mobile, open in new window on mobile.
        if (formal.getScreenSize() === "small") {
          // $.fancybox.close();
          if (
            lastVideo.indexOf("youtube.com") > -1 ||
            lastVideo.indexOf("vimeo.com") > -1
          ) {
            if (lastVideo.indexOf("http") > -1) {
              // window.location.href = `https:${lastVideo}`;
              // window.location.href = lastVideo;
              // Close current fancybox instance
            } else {
              // window.location.href = lastVideo;
            }
          }
        }
      },
      afterShow() {
        $openFancybox = $(".fancybox-is-open");
        $openFancybox.focus();
        $(this).attr("role", "dialog");

        if ($openFancybox.find(".fancybox-content.hidden")) {
          $openFancybox.find(".fancybox-content.hidden").removeClass("hidden");
        }
      },
      afterLoad() {
        const $video = $(this).get(0).opts.$orig;
        let widthHeight;

        if (typeof $video.attr("rel") !== "undefined") {
          widthHeight = $video.attr("rel").replace(/popup{|}/g, "");
          if (widthHeight.charAt(0).toLowerCase() === "x") {
            widthHeight = widthHeight.split(",");
            this.width = widthHeight[0].replace(/\D/g, "");
            this.height = widthHeight[1].replace(/\D/g, "");
          } else {
            widthHeight = widthHeight.split(",", widthHeight);
            if (widthHeight.length > 0) {
              this.height = widthHeight[0].replace(/\D/g, "");
              this.width = widthHeight[1].replace(/\D/g, "");
            }
          }
        }

        if (
          typeof $video.data("width") !== "undefined" &&
          typeof $video.data("height") !== "undefined"
        ) {
          this.width = $video.data("width");
          this.height = $video.data("height");
        }
      },
      afterClose() {
        if (lastVideo !== "") {
          $(`a[href="${lastVideo}"]`).focus();
        }
      },
    });
  }

  /** Checks to see if there are fancyboxes and loads the CSS/JS. */
  mtu.initFancyBox = function () {
    // if there are no yt classes aren't on the page, return.
    if (
      $('[class*="fancybox"]').length <= 0 ||
      typeof $.fancybox !== "undefined"
    ) {
      return;
    }

    mtu.insertTag(
      "link",
      "https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css"
    );
    mtu.insertTag(
      "script",
      "https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"
    );

    // Gotta make sure fancybox is loaded before we start initializing images and videos.
    const waitForFancyBox = setInterval(function () {
      if (typeof $.fancybox !== "undefined") {
        clearInterval(waitForFancyBox);

        /* Fixes links that have a lightbox. Adds classes for fancybox.
         * They will have a `rel="popup{x###,y:###}`
         */
        $("a").each(function (index, val) {
          if (typeof $(this).attr("rel") !== "undefined") {
            if ($(this).attr("rel").toLowerCase().indexOf("popup{") >= 0) {
              $(this).addClass("various popup-link");
              $(this).attr("data-options", '{"touch" : false}');
            }
          }
        });

        fancyboxVideos();
        fancyboxImages();
      }
    }, 200);
  };

  /** Fixes width for sortable talbes and makes sure there is a `span` in the `th`. */
  function sortableTableWidthFix() {
    $("table.table-sortable").each(function () {
      const $table = $(this);
      $table.find("th").each(function () {
        const $header = $(this);
        $header.css("width", $header.width() + 21); // add 15 pixels to the width and set it.
        if ($header.children("span").length === 0) {
          $header.html(`<span>${$header.text()}</span>`); // wrap the th text in a span.
        }
      });
    });
  }

  /** Sets up the progress bar and goal for our gift widgets. */
  function giftwrapperinit() {
    $(".progress-bar").each(function () {
      const $bar = $(this);
      const goal = $bar.data("goal");
      const progress = $bar.data("progress");
      let percent = (progress / goal) * 100;
      const formattedGoal = formatCurrency(goal);
      const formattedProgress = formatCurrency(progress);

      if (percent < 1) {
        percent = 1;
      }
      if (percent > 100) {
        percent = 100;
      }

      const goalAndHoverHtml = `<div class="progress-goal">Goal: $${formattedGoal}</div><div class="progress-hover"><strong>Progress:</strong> $${formattedProgress}<br /><strong>Goal:</strong> $${formattedGoal}</div>`;

      const progressBarHtml = `<span class="progress-bar-progress">Progress: $${formattedProgress}</span><div class="progress" style="width: ${percent}%; background-color: #ffce00;"></div>`;

      $bar.after(goalAndHoverHtml);
      $bar.append(progressBarHtml);
    });
  }

  /** Sets click event listener to show movie descriptions */
  function videoInfoClick() {
    const $desc = $(".movie-description");
    const $expandButton = $(".movie-title");
    if ($desc.length > 0) {
      if ($expandButton.length > 0) {
        $expandButton.on("click", function () {
          if ($desc.length > 0) {
            $desc.toggleClass("active");
          }
          $expandButton.toggleClass("active");
        });
      }
    } else {
      $expandButton.children("button").hide();
    }
  }

  /** Resizes play buttons on smaller videos . */
  function jumboVideoPlayButtons() {
    $(".new-movie").each(function () {
      const $player = $(this);
      if ($player.children().children("svg").length >= 1) {
        $player.addClass("hasSVG");
      }
      if ($player.width() < 500) {
        $player.find(".playhead").each(function () {
          $(this).addClass("playhead-small");
        });
      }
    });
  }

  /** External links to open in new window and set dealy on files opening */
  function linkModifiers() {
    const $links = $("a");
    $links.each(function () {
      const $link = $(this);
      const $linkLocation = new URL(
        $link.attr("href"),
        window.location.origin + window.location.pathname
      );

      // If there is no href link skip this loop.
      if (typeof $link.attr("href") === "undefined") {
        // @link https://stackoverflow.com/questions/481601/how-to-skip-to-next-iteration-in-jquery-each-util
        return true; // In jQuery this skips this loop.
      }

      if (
        $link.attr("href").indexOf("mtu.edu") === -1 &&
        $link.attr("href").substr(0, 4) === "http"
      ) {
        $link.attr("target", "_blank");
        $link.attr("rel", "noopener");
      } else {
        switch ($link.attr("href").substr($link.attr("href").length - 4)) {
          case ".pdf":
            $link.click(function (event) {
              const $this = $(this);
              event.preventDefault();
              setTimeout(function () {
                // console.log($this);
                window.location = $this.attr("href");
              }, 2000);
            });
            break;
          case ".doc":
          case "docx":
          case ".xls":
          case "xlsx":
          case ".ppt":
          case "pptx":
            $(this).on("click", function (event) {
              const $this = $(this);
              event.preventDefault();
              setTimeout(function () {
                window.location = $this.attr("href");
              }, 2000);
            });
            break;
          default:
            break;
        }
      }
      return true; // Satisfying the linter: eslint(consistent-return).
    });

    document
      .querySelectorAll(".content p a img, .content-continued p a img")
      .forEach(function (image) {
        const link = image.parentElement;
        // console.log(link);
        if (/\S+/.test(link.innerText)) {
          return;
        }

        link.style.outline = "none";
        link.style.boxShadow = "none";
      });
  }

  /** Setup popover buttons */
  function initPopover() {
    function showPopover() {
      function checkCookie(cookie) {
        const cookieCheck = cookie || "action";
        const actionSet = getCookie(cookieCheck);
        if (actionSet != "") {
          // console.log("Cookie found");
          return actionSet;
        }
        // console.log("No cookie found");
      }

      /* -- Scroll Events -- */
      // console.log("Listening for scrolling");
      /* Popup Modal scroll listener */
      let scrollTimeout;
      const windowHeight = $(window).height();
      const triggerHeight = 700; // Default value for trigger height.

      (function () {
        const specialCookie = $("[data-cookie-name]");
        let modalStatus;

        if (undefined !== specialCookie) {
          modalStatus = checkCookie(specialCookie.data("cookie-name"));
        } else {
          modalStatus = checkCookie("action");
        }

        if (modalStatus === "" || modalStatus === undefined) {
          popover.attr("aria-expanded", true);
        } else {
          popover.attr("aria-expanded", false);
        }
      })();

      $(window).on("scroll", function () {
        if (!scrollTimeout) {
          scrollTimeout = setTimeout(function () {
            scrollTimeout = null;

            // Call functions that require scrolling
            popoverPopup(triggerHeight);
          }, 66);
        }
      });

      function popoverPopup(triggerHeight) {
        const currentScrollPosition = $(window).scrollTop() + windowHeight;

        if (currentScrollPosition > triggerHeight) {
          const specialCookie = $("[data-cookie-name]");
          let modalStatus;

          if (undefined !== specialCookie) {
            modalStatus = checkCookie(specialCookie.data("cookie-name"));
          } else {
            modalStatus = checkCookie("action");
          }

          if (modalStatus === "" || modalStatus === undefined) {
            popover.attr("aria-expanded", true);
          }
        }
      }

      function movePopoverTabs() {
        const $betabug = $("#betabug");
        const $popovers = $(".popover__open-button");
        const gap = 30;
        let offset = 96; /* account for to-top button spacing */

        if ($betabug.length < 1 && $popovers.length < 1) {
          return;
        }

        if ($betabug.length >= 1 && $betabug.offset().left > 0) {
          offset = $(window).width() - $betabug.offset().left + 6;
        }

        $popovers.each(function () {
          $(this).css("transform", "translate(-" + offset + "px, -100%)");
          offset = offset + $(this).width() + gap;
        });
      }

      movePopoverTabs();

      /* had to put this outside the function so the gloabl resize function sees it */
      reorgPopoverTabs = debounce(function () {
        movePopoverTabs();
      }, 10);

      $(window).resize(function () {
        reorgPopoverTabs();
      });

      /* Close Popup Modal click listener */
      $(".popopen__close-button").on("click", function () {
        const cookieName = $(this).parents(".popover").data("cookie-name");
        if (undefined !== cookieName && cookieName.length > 1) {
          formal.cookie.set(cookieName, "closed", 10);
        } else {
          formal.cookie.set("action", "closed", 10);
        }

        $(this).parents(".popover").attr("aria-expanded", "false");
      });

      /* Open Popup Modal click listener */
      $(".popover__open-button").on("click", function () {
        $(this).parents(".popover").attr("aria-expanded", "true");
      });
    }

    var popover = $(".popover");
    if (popover.length > 0) {
      // if the current date is between these two dates, show it.
      const today = new Date();
      const expire1 = new Date(popover.data("start"));
      const expire2 = new Date(popover.data("end"));
      today.setHours(0, 0, 0, 0);
      expire1.setHours(0, 0, -1, 0); // set start time to begin a second before midnight.
      expire2.setHours(24, 0, 0, 0); // set end time to end at midnight of the specified day.
      if (expire1 < today && today < expire2) {
        popover.removeClass("hidden");
        showPopover(popover);
      } else if (expire1 < today && !expire2) {
        popover.removeClass("hidden");
        showPopover(popover);
      } else if (today < expire2) {
        popover.removeClass("hidden");
        showPopover(popover);
      } else if (!expire1 && !expire2) {
        popover.removeClass("hidden");
        showPopover(popover);
      }
    }
  }

  mtu.initStickyADM = function () {
    const $stickyElement = $("#adm-sticky-buttons");
    if ($stickyElement.length < 1) {
      return;
    }

    const $window = $(window);
    const $fadeOutTarget = $("footer");
    const visibleButtons = checkFooterButtons($(".footer-button"));

    function checkFooterButtons(elements) {
      let visible = false;
      elements.each(function () {
        if ($(this).is(":visible")) {
          visible = true;
        }
      });
      return visible;
    }

    if (visibleButtons === false) {
      $stickyElement.addClass("no-footer-buttons");
      $(".stick").append($stickyElement);
    }

    document.addEventListener("scroll", function () {
      const topScrollDistance = $window.scrollTop();
      const bottomScrollDistance = topScrollDistance + $window.height();
      const dissapearDistance =
        $fadeOutTarget.offset().top - $stickyElement.height();

      if (visibleButtons === false) {
        if (topScrollDistance > 400) {
          $stickyElement.addClass("show");
        } else {
          $stickyElement.removeClass("show");
        }
      } else if (bottomScrollDistance > dissapearDistance) {
        $stickyElement.removeClass("show");
      } else if (topScrollDistance > 400) {
        $stickyElement.addClass("show");
      } else {
        $stickyElement.removeClass("show");
      }
    });
  };

  function initAlertSliver() {
    const alertBlacklist = [
      "ou-test",
      "weather/eds.html",
      "admissions/programs/request",
      "admissions/virtual",
      "syp/go",
      "tomorrowneeds",
      "mtu_resources/php/mail/results",
      "admissions",
      "request",
      "applynow",
      "visit",
      "gradschool",
      "globalcampus",
      "news",
      "magazine",
      "unscripted",
      "stories",
    ];
    let blockAlert;

    // Make sure we are an MTU site and the page hasn't been blocked.
    if (window.location.hostname.indexOf("mtu.edu") < 0) {
      // blockAlert = true;
    } else {
      $.each(alertBlacklist, function () {
        if (window.location.pathname.startsWith(this, 1) === true) {
          blockAlert = true;
        }
      });
    }

    if (blockAlert === true) {
      return;
    }

    /**
     * Function to create elements with a class attached to them
     * @param {string} element HTML element to create
     * @param {string} thatClass Class to attach to the HTML element that is created.
     */
    function createElementAddClass(element, thatClass) {
      const elem = document.createElement(element);
      $(elem).addClass(thatClass);
      return elem;
    }

    /**
     * Update the webpage with content that is grabbed from a URL and put it into the alert sliver.
     * @param {object} data Returned content from a url ajax request.
     */
    function updateHTML(data) {
      const elemAlertSliver = createElementAddClass(
        "div",
        "alert-sliver background-yellow"
      );
      const elemAlertSliverInner = createElementAddClass(
        "div",
        "alert-sliver-inner"
      );
      const elemAlertSliverDismiss = createElementAddClass(
        "button",
        "alert-sliver-dismiss"
      );
      const elemShowforsr = createElementAddClass("span", "show-for-sr");
      const resolution = 5;
      let $dismissButton;
      let aria;

      /**
       * Recalculates the padding and such
       * using the `--alertbarheight` CSS vairable on the html elemnt
       */
      function setBannerHeight() {
        let sliverHeight = 0;
        $("html").css("--alertbarheight", "");
        sliverHeight = `${$(".alert-sliver").outerHeight()}px`;
        $("html").css("--alertbarheight", sliverHeight);
      }

      function scrollHandler(res) {
        const threshold = res == null ? 5 : res;
        if (
          $(window).scrollTop() > threshold &&
          formal.getScreenSize() !== "small"
        ) {
          $(".alert-sliver").css("max-height", "0");
          $("html").css("--alertbarheight", "0");
        } else if (
          $(window).scrollTop() < threshold &&
          formal.getScreenSize() === "medium"
        ) {
          $(".alert-sliver").css("max-height", "");
          setBannerHeight();
        } else if (formal.getScreenSize() === "large") {
          $(".alert-sliver").css("max-height", "");
          setBannerHeight();
        }
      }

      function setWindowEventListeners() {
        /* Need to readjust the sititle and nav on resize */
        $(window).resize(function () {
          scrollHandler(5);
          setBannerHeight();
        });

        /* When we scroll down we need to remove the alert on desktop */
        $(window).scroll(function () {
          scrollHandler(5);
        });
      }

      /* Toggles the aria expanded atribute */
      function toggleAria($this) {
        // Toggle aria expaned
        if ($this.attr("aria-expanded") === "false") {
          return "true";
        }
        return "false";
      }

      /**
       * Dissmiss the alert click handler. Will toggle items open and closed.
       * @param {object} $that The object we are clicking on
       */
      function dismissClickHandler($that) {
        aria = toggleAria($that);
        $that.toggleClass("alert-closed");
        $that.attr("aria-expanded", aria);
        $(".alert-sliver").find("p").toggle();
        setBannerHeight();
      }

      $(elemShowforsr).text("Toggle alert");
      $(elemAlertSliverDismiss).append(elemShowforsr);

      // Add items to dom
      $(elemAlertSliverInner).prepend(data, elemAlertSliverDismiss);
      $(elemAlertSliver).prepend(elemAlertSliverInner);
      $("body").prepend(elemAlertSliver);

      $dismissButton = $(".alert-sliver-dismiss");
      $dismissButton.attr("aria-expanded", "true");
      dismissClickHandler($dismissButton);

      // setup dismiss click handler
      $dismissButton.click(function () {
        dismissClickHandler($(this));
        formal.cookie.toggle("closeAlert");
      });

      // check if cookie set and close alert if it is.
      if (formal.cookie.get("closeAlert").length < 0) {
        dismissClickHandler($dismissButton);
        aria = toggleAria($dismissButton);
        $dismissButton.attr("aria-expanded", aria);
      }

      // recalc banner heights.
      setWindowEventListeners(resolution);
      scrollHandler(5);
    }

    if ($(".alert-sliver").length <= 0) {
      /**
       * Grab content from url, if empy return
       * @param {string} href URL to grab data from
       */
      function getContent(href) {
        $.get(href, function () {
          // console.log('success');
        })
          .done(function (data) {
            if (data.trim() === "") {
              return;
            }
            updateHTML(data);
          })
          .fail(function () {
            console.log("failure");
          });
      }

      getContent("https://www.mtu.edu/alert/homepage/display-alert.php");
    }
  }

  function initMediaHeader() {
    /*  ===================================================================
            # MEDIA HEADER
        ===================================================================  */
    /**
     * Media scripts
     */
    // Info and popover variables
    const $infoButton = $("#js-multi-media_info-button");
    const $popover = $("#js-multi-media_popover");
    const $mediaContent = $("#js-multi-media_inner");
    const $infoButtonClose = $(".media_popover-close");
    const $popOverOpen = $("[data-open]");
    const $modalButtons = $("[data-modal]");
    const $wrapper = $(".multi-media_wrapper");
    var wrapperHeight = $(".multi-media_wrapper").height();

    // Set the media clickable elemnts to -1 so they can't tab to them and break the section.
    if (
      !$mediaContent.parent().hasClass("multi-media_wrapper-text-over-image")
    ) {
      $mediaContent.find("a, button").each(function () {
        // Accounts for header video on Tomorrow Needs header video regular video header.
        // Tomorrow Needs uses .toggle and the rest need .play-video.
        const self = this; // Don't want to have to .bind our anonymous function.
        const tabbable = ["play-video", "toggle"].some(function (className) {
          return $(self).hasClass(className);
        });

        if (!tabbable) {
          $(this).attr("tabindex", "-1");
        }
      });
    }

    // Video Variables
    const $mediaVideo = $(".multi-media_video");
    const $videoBanner = $(".multi-media_video-banner");
    const $toggle = $(".toggle");
    const looped = false;

    // Close Video Modal
    const $modal = $(".modal"); // Any modal.
    const video = $modal.find("iframe"); // Storing to try and autoplay video and/or stop when closed
    const $closeModal = $(".modal-close"); // Buttons to close the modal.

    // Info button
    $infoButton.on("click", infoButtonClickHandler);
    $infoButtonClose.each(function () {
      $(this).on("click", infoButtonCloseHandler);
    });

    function infoButtonClickHandler(e) {
      // Get the current status of the wrapper when its clicked.
      const $wrapperCurrently = $(".multi-media_wrapper");

      if ($popover.attr("aria-hidden") === "true") {
        $(this).attr("aria-expanded", "true");
        $popover.attr("aria-hidden", "false");
        $mediaContent.find("a, button").each(function () {
          $(this).removeAttr("tabindex");
        });

        $(
          ".multi-media_wrapper > #js-multi-media_inner .multi-media_content"
        ).toggle();

        // If the content is taller than the content window make it taller.
        if (
          $wrapperCurrently.height() < $(".multi-media_content").outerHeight()
        ) {
          // Adding 60 pixels to account for the buttons on the bottom to have some breathing room.
          const contentHeight = $(".multi-media_content").outerHeight();
          $wrapperCurrently.animate(
            {
              height: contentHeight,
            },
            500
          );
        }
      } else {
        infoButtonCloseHandler();
      }
    }

    const headerExpandOnResize = debounce(function () {
      if ($(window).width() > 640) {
        $wrapper.css("height", "");
      } else {
        // Adding 60 pixels to account for the buttons on the bottom to have some breathing room.
        const contentHeight = $(".multi-media_content").outerHeight();
        $wrapper.css("height", contentHeight);
      }
    }, 10);

    function infoButtonCloseHandler() {
      wrapperHeight = $(".multi-media_wrapper").height();

      if ($(window).width() < 880) {
        $(".multi-media_wrapper").animate(
          {
            height: 0,
          },
          500
        );
      } else {
        $(".multi-media_wrapper").animate(
          {
            height: wrapperHeight,
          },
          500,
          function () {
            $(".multi-media_wrapper").css("height", "");
          }
        );
      }
      $infoButton.attr("aria-expanded", "false");
      $popover.attr("aria-hidden", "true");
      $mediaContent.find("a, button").each(function () {
        $(this).attr("tabindex", "-1");
      });
      $(
        ".multi-media_wrapper > #js-multi-media_inner .multi-media_content"
      ).show();
    }

    // Video
    $videoBanner.click(function () {
      $(this).hide();
      if ($mediaVideo.attr("data-yt")) {
        videoId = $mediaVideo.attr("id");
        setTimeout(function () {
          window[`player-${videoId}`].playVideo();
        }, 1000);
      }
    });

    // Open Video Modal
    // Get this to autoplay the video as well.
    $modalButtons.each(function () {
      $(this).click(function () {
        const $thisModal = $(`#${$(this).attr("data-modal")}`);
        $thisModal.addClass("active");
      });
    });

    $closeModal.click(function () {
      $modal.removeClass("active");
    });

    $modal.click(function (event) {
      // If anywhere other than the modal inner is clicked, close the Modal
      if ($(".modal-inner").find(event.target).length <= 0) {
        $modal.removeClass("active");
      }
    });
  }

  mtu.initFormValidator = function () {
    const $form = $("form.validate");
    let waitForFormValidator;
    if ($form.length === 0) {
      return;
    }

    mtu.insertTag(
      "script",
      "https://www.mtu.edu/mtu_resources/assets/js/includes/formValidator.js"
    );

    function validateInvalidHandler() {
      /* straight ripped this from our older code. Was having trouble refactoring it */
      if (!$("form.validate").hasClass("cool")) {
        jQuery.validator.addMethod(
          "validate-email",
          function (value, element) {
            // allow any non-whitespace characters as the host part
            return (
              this.optional(element) ||
              /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
                value
              )
            );
          },
          "Please enter a valid email address."
        );

        /* Form validation */
        const validate = $("form.validate").validate({
          focusInvalid: false,
          invalidHandler() {
            $(this).find(":input.error:first").focus();
          },
          errorElement: "span",
          errorPlacement(error, element) {
            if (
              element.attr("type") == "radio" ||
              element.attr("type") == "checkbox"
            ) {
              /**
                  this was added 5/1/2018
                  Accouting for the structual differnce between ou forms and regular CGI forms
                  * */
              let i = 0;
              let type = 0;
              let htmlObj = element.parent();
              while (true) {
                if (i == 6) break;
                if (htmlObj.prop("className") == "item") {
                  if (htmlObj.parent().prop("nodeName") == "FIELDSET") {
                    type = 1;
                    break;
                  }
                  break;
                }
                i++;
                htmlObj = htmlObj.parent();
              }
              if (type == 0) {
                htmlObj.append(error);
                // error.append(htmlObj);
              } else {
                error.insertAfter(htmlObj.parent());
              }
            } else {
              error.insertAfter(element);
            }
          },
          success() {},
          errorClass: "error invalid",
        });
        $(".required").rules("add", {
          required: true,
          minlength: 1,
        });
        $(
          "form.validate input.required, form.validate textarea.required, form.validate select.required"
        ).on("blur", function () {
          validate.element(this);
        });
      }
      /* $("form.validate input.required").on("blur" , function(){
          validate.element(this);
        }); */
    }

    // Gotta make sure jQuery Validator is loaded before we start initializing images and videos.
    waitForFormValidator = setInterval(function () {
      if (typeof $.validator !== "undefined") {
        validateInvalidHandler();
        clearInterval(waitForFormValidator);
      }
    }, 500);
  };

  function initFormHighlighting() {
    /* Form focus update highlight label */
    const $inputs = $("input, select, textarea");

    function findLabel(input) {
      const $inputParent = input.parent();
      let label = $("[for=" + input.attr("id") + "]");

      if (label.length < 1) {
        if (input.prev("label").length > 0) {
          label = input.prev("label");
        } else if ($inputParent.is("label")) {
          label = $inputParent;
        } else if ($inputParent.find("label").length > 0) {
          label = $inputParent.find("label");
        } else {
          return;
        }
      }

      return label;
    }

    function inputUpdateError(input) {
      const label = findLabel(input);

      if (!label) {
        return;
      }

      /* Might be able to remove this timeout.
       * For some reason, the changing of classes on the input
       * changes faster than this checks it. */
      setTimeout(function () {
        if (!input.hasClass("invalid")) {
          label.removeClass("error");
          label.removeClass("invalid");
        } else {
          label.addClass("invalid");
          label.addClass("error");
        }
      }, 0.01);
    }

    function inputFocusHandler() {
      const input = $(this);
      const label = findLabel(input);

      if (label) {
        label.addClass("active");
      }

      inputUpdateError(input);
    }

    function inputBlurHandler() {
      const input = $(this);
      const label = findLabel(input);

      if (label) {
        label.removeClass("active");
      }

      inputUpdateError(input);
    }

    $inputs.each(function () {
      const item = $(this);
      item.focus(inputFocusHandler);
      item.blur(inputBlurHandler);
      item.keyup(function () {
        inputUpdateError(item);
      });
    });
    /* End focus update */
  }

  mtu.initMerlinLabels = function () {
    const inputs = document.querySelectorAll('.merlin input[type="text"]');

    function copyStyles(target, input, styles) {
      styles.forEach((copiedStyle) => {
        // Make sure the CSS is targeting the right VAR when you use this.
        if (copiedStyle.includes("var")) {
          const cssStyle = copiedStyle.substr(3);
          const varName = "--" + cssStyle;
          target.style.setProperty(varName, getComputedStyle(input)[cssStyle]);
        } else {
          let styleValue = getComputedStyle(input)[copiedStyle];
          target.style[copiedStyle] = getComputedStyle(input)[copiedStyle];
        }
      });
    }

    function levitateLabel(label, input) {
      label.classList.add("levitate");
      let levitateTarget = label.querySelector("span");

      if (!levitateTarget) {
        console.error("Unable to levitate label:", label);
        return;
      }

      levitateTarget.style.maxWidth = "";
      copyStyles(levitateTarget, input, [
        "backgroundColor",
        "border",
        "varborderWidth",
      ]);
    }

    function groundLabel(label, input) {
      let levitateTarget = label.querySelector("span");

      if (!levitateTarget) {
        console.error("Unable to ground label:", label);
        return;
      }

      if (input.value == "") {
        label.classList.remove("levitate");
        levitateTarget.style.backgroundColor = "transparent";
        levitateTarget.style.maxWidth = input.clientWidth + "px";
      } else {
        copyStyles(levitateTarget, input, [
          "backgroundColor",
          "border",
          "varborderWidth",
        ]);
      }
    }

    inputs.forEach((input) => {
      let label = document.querySelector(
        "label[for=" + input.getAttribute("id") + "]"
      );

      if (!label && /\S+/.test(input.getAttribute("placeholder"))) {
        const inputParent = input.parentElement;
        const inputPlaceholder = input.getAttribute("placeholder");
        const newLabel = document.createElement("label");
        if (input.id) {
          newLabel.setAttribute("for", input.id);
        } else {
          const randNum = "input" + Math.floor(Math.random(100) * 100) + "xid";
          input.id = randNum;
          newLabel.setAttribute("for", randNum);
        }
        newLabel.innerText = inputPlaceholder;

        input.setAttribute("placeholder", "");

        inputParent.insertBefore(newLabel, input);
        label = newLabel;
      } else if (input.getAttribute("placeholder")) {
        input.setAttribute("placeholder", "");
      } else if (!label) {
        console.error("Unable to initialize merlin label on input:", input);
        return;
      }

      const labelSpan = document.createElement("span");
      const borderWidth = getComputedStyle(input).borderRightWidth;
      labelSpan.classList.add("magic");
      labelSpan.innerText = label.innerText;
      labelSpan.style.display = "inline-block";
      labelSpan.style.overflow = "hidden";
      labelSpan.style.textOverflow = "ellipsis";
      labelSpan.style.maxWidth = input.clientWidth + "px";
      labelSpan.style.whiteSpace = "nowrap";

      label.innerHTML = "";
      label.appendChild(labelSpan);
      label.appendChild(input);

      input.addEventListener("focus", () => levitateLabel(label, input));

      input.addEventListener("blur", () => groundLabel(label, input));
    });
  };

  mtu.initDayJs = function () {
    const dateColumns = document.querySelectorAll("[data-type=mmddyyyy]");
    if (dateColumns.length > 0) {
      $.getScript(
        "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js",
        function () {
          $.getScript(
            "https://cdn.jsdelivr.net/npm/dayjs@1/plugin/customParseFormat.js",
            function () {
              if (typeof dayjs === "undefined") return;
              dayjs.extend(window.dayjs_plugin_customParseFormat);
            }
          );
        }
      );
    }
  };

  mtu.initSortableTables = function () {
    const $tables = $(".table-sortable");
    const scriptLocation =
      "https://www.mtu.edu/mtu_resources/assets/js/includes/tableSorter.js";
    let waitForTableSorter;

    // If there are no sortable tables, return.
    if ($tables.length === 0) {
      return;
    }

    mtu.insertTag("script", scriptLocation);

    // Gotta wait for the JS file to laod before running anything.
    waitForTableSorter = setInterval(function () {
      if (typeof $.tablesorter !== "undefined") {
        if (
          $('table.table-sortable:not(".table-manual-init")').hasClass("data")
        ) {
          $("table.table-sortable.data").tablesorter({
            textExtraction(s) {
              return $(s).attr("title");
            },
          });
        } else {
          $('table.table-sortable:not(".table-manual-init")').tablesorter();
        }
        clearInterval(waitForTableSorter);
      }
    }, 200);
  };

  /** Loads legacy css sylesheet if classes are found on the page. */
  function legacyCSSLoad() {
    const css = $('[href*="mtu_resources/styles/n/base.css"]');
    const filepath = "//www.mtu.edu/mtu_resources/styles/n/base-legacy.css";
    let classes = 0;
    let elem;
    const legacyClasses = [".stat-slide", ".touts", '[class|="notice"]'];

    if (css.length === 0) {
      return;
    }

    for (classes; classes < legacyClasses.length; classes++) {
      $elem = $(legacyClasses[classes]);
      if ($elem.length > 0) {
        mtu.insertTag("link", filepath);
        break;
      }
    }
  }

  /** If there is a slate form on the page, load the css for them. */
  function slateCSSLoad() {
    console.log("slateCSSLoad is deprecated, use the Class insertSlateCSS");
  }

  /** Used with CheckUTMZZCookie */
  function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) {
      return match[2];
    }
    return "";
  }

  /** Check the cookie `__utmzz` */
  function checkUTMZZCookie() {
    // Save UTM Parameters to Cookie and add them to Slate form hrefs
    if (typeof window.location.search.substring(1) !== "undefined") {
      const utmqs = window.location.search.substring(1);
      const split = utmqs.split("&");
      let finalutm;
      for (let i = 0; i < split.length; i++) {
        if (split[i].startsWith("utm_")) {
          if (typeof finalutm === "undefined") {
            finalutm = split[i];
          } else {
            finalutm = `${finalutm}&${split[i]}`;
          }
        }
      }
      const now = new Date();
      const time = now.getTime();
      const expireTime = time + 180 * 24 * 60 * 60 * 1000; // set this to 90 days
      now.setTime(expireTime);

      if (typeof finalutm !== "undefined") {
	if (finalutm.includes("utm_source") && !finalutm.includes("utm_campaign")){
    		var content = document.querySelector('h1') ? document.querySelector('h1').textContent.replace(/[?&]/g, ' ') : 'No Title';
    		var term = window.location.pathname.split('/')[1] || "HP";
		var campaign = 'MTU+Recruitment';

		if(!finalutm.includes("utm_medium")){
			var medium = 'SEO+referral';
			finalutm += '&utm_campaign=' + campaign + '&utm_medium=' + medium + '&utm_content=' + content + '&utm_term=' + term;

		} else{
			finalutm += '&utm_campaign=' + campaign + '&utm_content=' + content + '&utm_term=' + term;
		}
	}
        if (!finalutm.includes("utm_campaign")) {
          finalutm += "&utm_campaign=Not%20Set";
        }

        if (!finalutm.includes("utm_medium")) {
          finalutm += "&utm_medium=Not%20Set";
        }

        if (!finalutm.includes("utm_source")) {
          finalutm += "&utm_source=Not%20Set";
        }

        // create cookie if there is UTM stuff to put in there.
        document.cookie = `mtuutmqs=${finalutm};Secure;expires=${now.toUTCString()};path=/;domain=mtu.edu;SameSite=Lax;`;
      }
    }

   /* $(".mtuUTMLink").each(function () {
      const $this = $(this);
      const _href = $this.attr("href");

      if (getCookie("mtuutmqs") != "") {
        // previous mtuutmqs present
        mtuutmqs = getCookie("mtuutmqs");

        if (!mtuutmqs.includes("utm_campaign")) {
          mtuutmqs += "&utm_campaign=Not%20Set";
        }

        if (!mtuutmqs.includes("utm_medium")) {
          mtuutmqs += "&utm_medium=Not%20Set";
        }

        if (!mtuutmqs.includes("utm_source")) {
          mtuutmqs += "&utm_source=Not%20Set";
        }

        if (_href.includes("?")) {
          if (_href.includes("utm_campaign")) {
            // do something with extra UTM? if a campaign variable is already present
          } else {
            $this.attr("href", `${_href}&${mtuutmqs}`);
          }
        } else {
          $this.attr("href", `${_href}?${mtuutmqs}`);
        }
      }
    });*/
  }

  /** Sets up the google script and runs initializing of charts on the page */
  mtu.initGoogleCharts = function () {
    const $charts = $(".google-chart");

    if ($charts.length === 0) {
      if ($("#google-api").length === 0) {
        return;
      }
    }

    /** Inits the charts and sets some options for them */
    function googleAPILoadHanlder() {
      $charts.each(function (chart, index) {
        const config = mtuCharts[chart];
        const type = config.type;
        const dataSourceUrl = index.getAttribute("data-src");
        const id = "google-chart-" + chart;
        index.id = id;

        const chartConstructors = {
          BubbleChart: BubbleChart,
          PieChart: PieChart,
        };

        const ChartConstructor = chartConstructors[type] || Chart;
        const chartInstance = new ChartConstructor(config, id, dataSourceUrl);

        chartInstance.draw();
      });
    }

    // Puts the google chart api on the page.
    mtu.insertTag("script", "https://www.google.com/jsapi");
    asset = $('script[src="https://www.google.com/jsapi"]');

    asset.on("load", function () {
      google.load("visualization", "1", {
        callback: function () {
          googleAPILoadHanlder();
        },
      });
    });
  };
  /* eslint-enable */

  function topnavActive() {
    if ($("#main_links .nav-title-heading").length > 0) {
      const activeURL = $("#main_links .nav-title-heading").attr("href");
      if (typeof activeURL !== "undefined") {
        $(".nav-bar .menu_link").each(function () {
          if ($(this).attr("href") === activeURL) {
            $(this).parent().addClass("in");
          }
        });
      }
    }

    if ($(".nav-bar .active-in").length > 0) {
      $(".nav-bar .active-in").each(function () {
        $(this).parent().parent().addClass("in");
      });
    }
  }

  function hashChangeListener() {
    //console.log(location.hash);
    if (window.location.pathname.indexOf("tomorrowneeds") > -1) {
      return;
    }
    function hashChange() {
      const $target = $(location.hash);
      const navBar = document.querySelector(".nav-bar");
      const nav = document.querySelector(".nav, .mtu-nav");
      if ($target.length > 0) {
        $("html, body").animate(
          { scrollTop: $target.offset().top - nav.clientHeight - 16 },
          400,
          "swing",
          function () {
            navBar.classList.add("nav-bar-collapse");
          }
        );
      }
    }

    /**
     * Don't throw an exception if the hash is invalid, AddThis on blogs.mtu.edu is an example of this occuring (when
     * Address Bar Sharing is enabled).
     * @see https://blogs.mtu.edu/mechanical/#.Yp9giOzMJGw
     */
    try {
      if ($(location.hash).length > 0) {
        hashChange();
      }
    } catch (e) {
      // console.error(e);
    }

    $(window).on("hashchange", function () {
      hashChange();
    });
  }

  /** On mobile remove the link to fancybox so it will play in place. */
  function youtubeMobilePlayInPlace() {
    $(".yt-iframe").each(function () {
      const $this = $(this);
      let videoWrapper;
      if ($this.parent(".multi-media_player-wrapper").length > 0) {
        videoWrapper = $this.parent(".multi-media_player-wrapper");
      } else {
        videoWrapper = $this.parent(); // typically:`.movie-wrapper.preview`
      }

      const img = videoWrapper.find("img");
        if (videoWrapper.is("a")) {
          videoWrapper.contents().unwrap();
        } else {
          // Remove all `a` tags from around images.
          img.closest("a").each(function () {
            $this.contents().unwrap();
          });

          //makes the video button tabbable
          img.siblings("button.playhead").each(function () {
            $(this).removeAttr("tabindex");
            $(this).removeAttr("aria-hidden");
          });
        }
      // }
    });
  }

  /**
   * Add Youtube JS script to page if check
   * @param {string} classes List of classes to check as string so jQuery can loop through it.
   */
  mtu.initYoutube = function (classes) {
    const $classes = $(classes);
    let waitForYoutube;

    // if there are no yt classes on the page or if youtube is already loaded, return.
    if ($classes.length < 1 || typeof YT !== "undefined") {
      return;
    }

    // Only load the youtube api if it is near the viewport.
    if (
      $classes.first().offset().top >
      $(window).scrollTop() +
        $(window).height() +
        $classes.first().find("img").height() * 4
    ) {
      return;
    }

    mtu.insertTag("script", "https://www.youtube.com/iframe_api");

    // Gotta make sure youtube is loaded before we start initializing images and videos.
    youtubeMobilePlayInPlace();
    /*
    waitForYoutube = setInterval(function () {
      if (typeof YT !== 'undefined') {
        clearInterval(waitForYoutube);
        youtubeMobilePlayInPlace();
      }
    });
    */
  };

  mtu.initAlpine = function (selector = "[data-x-data]") {
    if ($(selector).length > 0) {
      window.addEventListener("alpine:init", function () {
        Alpine.prefix("data-x-");
      });

      mtu.insertTag(
        "script",
        "https://cdn.jsdelivr.net/npm/alpinejs@3.10.3/dist/cdn.min.js"
      );
    }
  };

  /** ALl resize events are within this function */
  const windowResizeHandler = debounce(function () {
    shrinkHeader(true);
    navShuffle();
    toggleMenuTabIndex();
  }, 10);

  /** ALl scroll events are within this function */
  const windowScrollHandler = debounce(function () {
    shrinkHeader();
    mtu.initYoutube('.yt-iframe, [class*="fancybox.iframe"]');
  }, 10);

  /* ==========================================================================
    # docReady Function
    ========================================================================== */
  function docReady() {
    directedit();
    pageTweaks();
    initLegacyNav();
    navShuffle();
    toggleMenuTabIndex();
    toggleMenuTabIndex();
    initJumpMenus();
    initFeeds();
    initMultipleCalendars();
    initLegacyInfoClick();
    topnavActive();
    mtu.initSliders();
    topnavActive();
    showHideContent();
    initFocus();
    initMTUSlideshows();
    mtu.initFancyBox();
    sortableTableWidthFix();
    videoInfoClick();
    jumboVideoPlayButtons();
    giftwrapperinit();
    linkModifiers();
    hashChangeListener();
    mtu.initYoutube('.yt-iframe, [class*="fancybox.iframe"]');
    initPopover();
    mtu.initStickyADM();
    //initAlertSliver();
    initMediaHeader();
    mtu.initFormValidator();
    initFormHighlighting();
    mtu.initMerlinLabels();
    mtu.initSortableTables();
    mtu.initDayJs();
    checkUTMZZCookie();
    mtu.initGoogleCharts();
    slateCSSLoad();
    legacyCSSLoad();
    topTitleAriaFix();
    youtubeNav();
    mtu.initAlpine();

    $(window).resize(function () {
      windowResizeHandler();
    });

    $(window).scroll(function () {
      windowScrollHandler();
    });

    window.jsSet = true;
  }

  defer(function () {
    $(document).ready(docReady);
  });
})();

/**
 * Defer functions until jQuery is loaded. Used inside of OU's CMS for using jQuery.
 * @param {object} method function to be run after jQuery loads
 */
function defer(method) {
  let tryCount = 0;
  const waitForJQuery = setInterval(function () {
    if (typeof $ !== "undefined") {
      try {
        method();
      } catch (e) {
        console.error(e.message);
      } finally {
        clearInterval(waitForJQuery);
      }
    } else if (tryCount > 100) {
      clearInterval(waitForJQuery);
    }
    tryCount++;
  }, 100);
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
/* @Link: https://davidwalsh.name/javascript-debounce-function */
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/* ==========================================================================
     #Youtube API
  ========================================================================== */
/**
 * This has to definded outside of our main function in order to work.
 */
/* eslint-disable */
// Disable eslint, vender code.
function onYouTubeIframeAPIReady() {
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  $(".yt-iframe").each(function () {
    // gather data from embded videos
    var videoID = $(this).attr("data-yt");
    var id = $(this).attr("id");
    var img = $(this).parent().find("img");
    var width = Math.floor(img.width());
    var height = Math.floor(img.height());
    var button = $(this).parent().find(".new-movie");
    var link = $(this).parent().closest("a.various");
    var playlist = $(this).attr("data-yt-pl");

    $(this).click(function () {
      if ($(this).parent().is("a")) {
        return;
      }
      if (playlist !== undefined && "" !== playlist) {
        try {
          window["yt-" + id] = new YT.Player(id, {
            height: height,
            width: width,
            videoId: videoID,
            playerVars: {
              listType: "playlist",
              list: playlist,
              rel: 0,
              playsinline: 1,
            },
            events: {
              onReady: onPlayerReady,
            },
          });
        } catch (e) {}
      } else {
        try {
          // create player and add it to global vars
          window["player-" + id] = new YT.Player(id, {
            height: height,
            width: width,
            videoId: videoID,
            playerVars: {
              rel: 0,
              playsinline: 1,
            },
            events: {
              onReady: onPlayerReady,
            },
          });
        } catch (e) {}
      }

      if (0 == $(link).length) {
        // adding event listener for custom button
        $(button).click(function () {
          $("#yt-" + videoID).attr("style", "");
          $(img).attr("style", "display:none");
          $(button).attr("style", "display:none");
          window["player-yt-" + videoID].playVideo();
        });
      }
    });
  });
}

/* Unregister all service workers
if (typeof navigator.serviceWorker !== "undefined") {
  navigator.serviceWorker.getRegistrations().then((workers) => {
    workers.forEach((worker) => {
      console.log("Service worker has been unregistered.");
      worker.unregister();
    });
  });
}
*/

/* eslint-enable */

/* ==========================================================================
     #Service Worker
  ========================================================================== */
  const SW_KEY = "mtu_service_worker";
  const SW_VALUE = "no service worker";

  const sw_disabled = window.localStorage.getItem(SW_KEY);

  if(!sw_disabled && navigator.serviceWorker && window.location.host == "www.mtu.edu" ) {
    navigator.serviceWorker.register('https://www.mtu.edu/jssw.js');
  }

  async function cacheCurrentPage(){
    const cacheNames = await caches.keys();
    return await Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName.includes('pages')) {
          caches.open(cacheName)
            .then(pagesCache => {
              pagesCache.keys()
                .then(keys => {
                  keys.map(responseFromCache => {
                    if (responseFromCache.url === window.location.href) {
                      const title = document.querySelector('title') ? document.querySelector('title').innerText : window.location.href;
                      const description = document.querySelector('meta[name="Description"]') ? document.querySelector('meta[name="Description"]').getAttribute('content') : '';
                      const data = {
                        'title': title,
                        'description': description,
                      };

                      localStorage.setItem(
                        window.location.href,
                        JSON.stringify(data)
                      );
                    } else if (!keys.includes(window.location.href)) {
                      localStorage.removeItem(window.location.href);
                    }
                  });
                });
            });
        }
      })
    );
  }


  if ( navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.scriptURL === "https://www.mtu.edu/jssw.js" ) {
        if (navigator.onLine) {
          cacheCurrentPage();
        }
  }


/* ===================================*/
/* 2022 Nav                           */
/* ===================================*/
// Temporarily make this own anonomous function in order to prevent coliding and other errors.
mtu.initNav = function () {
  /* Mobile Menu Items */
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const offscreenMenu = document.querySelector(".offscreen-nav");
  const offscreenMenuButtons = document.querySelectorAll(
    ".offscreen-nav .menu_item"
  );

  /* Audience and Search Items */
  const audienceSearchWrapper = document.querySelector(".audience-search");
  const audienceNav = document.querySelector(".audience-wrapper");
  const searchToggleButton = document.querySelector(".search-toggle-button");
  const searchFields = document.querySelector(
    ".desktop-search-bar .search-fields"
  );

  const searchInput = document.querySelectorAll(".search-text");
  const searchClear = document.querySelectorAll(".search-clear");
  const searchOptions = document.querySelectorAll(".search-options");

  /* Nav and SubNav Items */
  const nav = document.querySelector(".nav, .mtu-nav");
  const prenav = document.querySelector(".pre-nav");
  const navBar = document.querySelector(".nav-bar");
  const navItems = document.querySelectorAll(".menu_item");
  const hasSubNavItems = document.querySelectorAll(".menu_has-submenu");
  const submenuButtons = document.querySelectorAll(".submenu-button ");
  const lastSubmenuItem = document.querySelectorAll(
    ".submenu_item:last-of-type"
  );

  let stopFunction = false;

  if (prenav === null || prenav === undefined) {
    return;
  }


  function updatePubsScrollPos(direction){

    if (direction == "up"){
      fromTop = prenav.clientHeight;
    } else {
      fromTop = nav.clientHeight;
    }

    document.querySelector("html").style.setProperty('--scrollPos', fromTop + 'px');
  }

  /* Testing arrow key navigation */
  document.querySelectorAll("[class*='menu_item']").forEach((item) => {
    item.addEventListener("keydown", function (event) {
      if (event.keyCode === 39 || event.keyCode === 37) {
        event.stopPropagation(); // This will prevent the `.menu_item` listener to fire if we are on a `.submenu_item`
      }

      if (event.keyCode === 39) {
        // 39 = right arrow key
        if (item.classList.contains("active")) {
          item
            .querySelector(".menu_submenu")
            .firstElementChild.querySelector(".submenu_link")
            .focus();
        } else {
          if (item.nextElementSibling) {
            item.nextElementSibling.firstElementChild.focus();
          } else if (item.closest(".menu_item").nextElementSibling) {
            item
              .closest(".menu_item")
              .nextElementSibling.firstElementChild.focus();
          }
        }
      } else if (event.keyCode === 37) {
        // 37 = left arrow key
        if (item.previousElementSibling) {
          item.previousElementSibling.firstElementChild.focus();
        } else if (item.closest(".menu_item").previousElementSibling) {
          item.closest(".menu_item").firstElementChild.focus();
        }
      }
    });
  });

  /* Nav Expand and Collapse */
  let lastScrollY = window.scrollY;
  let scrollTimeout;

  navBar.addEventListener('transitionend', event => {
    if (event.propertyName !== 'transform') return;

    if (navBar.classList.contains('nav-bar-collapse')) {
      navBar.classList.add('nav-bar-collapsed');
    } else if (navBar.classList.contains('nav-bar-expand')) {
      navBar.classList.add('nav-bar-expanded');
    }
    navBar.classList.remove('nav-bar-collapse', 'nav-bar-expand');
  });

  function setNavPosition(direction) {
    updatePubsScrollPos(direction);


    if (direction === 'up') {
      navBar.classList.remove('nav-bar-expanded');
      if (!navBar.classList.contains('nav-bar-collapsed')) navBar.classList.add('nav-bar-collapse');
    } else {
      navBar.classList.remove('nav-bar-collapsed');
      if (!navBar.classList.contains('nav-bar-expanded')) navBar.classList.add('nav-bar-expand')
    }
  }

  prenav.addEventListener('mouseenter', () => {
    setNavPosition('down');
  });

  window.addEventListener('scroll', () => {
    if (document.querySelector('.menu_item.active')) return;

    const scrollY = window.scrollY;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (scrollY > lastScrollY && scrollY > navBar.clientHeight) {
        setNavPosition('up');
      } else if (scrollY < lastScrollY) {
        setNavPosition('down');
      }
      lastScrollY = scrollY;
    }, 200);
  });

 /* End Nav Expand and Collapse */

  /* Adjusting the way the nav bar behaves based on its height */
  const adjustNav = function () {
    var navBar = document.querySelector(".nav-bar");
    var navCount = navBar.querySelectorAll(".menu_item").length;
    var height = navBar.clientHeight;

    if (height > 50) {
      navBar.style.setProperty("--navCount", navCount);
      navBar.classList.add("nav-tall");
    } else {
      navBar.style.removeProperty("--navCount");
      navBar.classList.remove("nav-tall");
    }
  };

  function myFunction(x) {
    const navBar = document.querySelector(".nav-bar");
    if (x.matches) {
      // If media query matches
      navBar.classList.remove("nav-tall");
    }
  }

  var x = window.matchMedia("(min-width: 1200px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes

  window.addEventListener("resize", adjustNav);

  /**
   * Checks to see if an element was not clicked on.
   * Searches up the parent tree to see if it contains it. If not runs a callback function.
   * If you ony define two
   *
   * @param {string|object} element The element to be checked if clicked on.
   * @param {int|function} parentLevels [2] How many levels to travel up the dom to see if it is containing the element. If a function is entered in instead of a number, it will be treated as the callback function.
   * @param {function} callback The function to callback if the element was unclicked.
   */
  const unclick = function (element, parentLevels, callback) {
    let elements;
    let parentChecks = 2;

    if (typeof element === "string") {
      elements = document.querySelectorAll(element);
    } else if (typeof element === "object") {
      elements = element;
    }

    if (typeof parentLevels === "function") {
      callback = parentLevels;
    } else if (typeof parentLevels === "number") {
      parentChecks = parentLevels;
    }

    // console.log(parentChecks);

    if (parentChecks < 0 || event.target === document.body) {
      elements.forEach((element) => {
        callback(element);
      });
    } else {
      elements.forEach((element) => {
        let count = 0;
        let isContained = false;
        let target = event.target;

        do {
          if (target === document.body) {
            isContained = false;
          } else if (target.contains(element)) {
            isContained = true;
          }

          if (target.parentElement) {
            target = target.parentElement;
          } else {
            count = parentLevels;
          }

          count++;
        } while (count <= parentChecks && isContained === false);

        if (isContained === false) {
          callback(element);
        }
      });
    }
  };

  document.addEventListener("click", function (event) {
    const activeMenus = document.querySelectorAll(".menu_item.active");
    unclick(activeMenus, function (element) {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
        element
          .querySelector("[aria-expanded]")
          .setAttribute("aria-expanded", "false");
      }
    });

    if (
      !offscreenMenu.contains(event.target) ||
      event.target !== mobileMenuButton
    ) {
      unclick(".offscreen-nav", 3, function (element) {
        if (mobileMenuButton.classList.contains("active")) {
          mobileMenuButtonClickHandler();
        }
      });
    }
  });

  navItems.forEach((item) => {
    item.addEventListener("keydown", function (event) {
      if (event.keyCode === 32) {
        event.preventDefault();
        subMenuClickHandler(item.querySelector(".submenu-button"), event);
      }
    });
  });

  hasSubNavItems.forEach((item) => {
    item.addEventListener("mouseenter", function (event) {
      subMenuHoverHandler(item, event);
    });

    item.addEventListener("mouseleave", function (event) {
      subMenuHoverHandler(item, event);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      const activeMenus = document.querySelectorAll(".menu_item.active");
      // console.log(activeMenus);
      unclick(activeMenus, -1, function (element) {
        element.classList.remove("active");
      });

      unclick(".offscreen-nav", -1, function (element) {
        element.classList.remove("active");
      });
    }
  });

  /**
   * Handles the opening and closing of the offscreen menu
   */
  const mobileMenuButtonClickHandler = function () {
    const buttonText = mobileMenuButton.querySelector(".mobile-button-text");
    let scrollY = window.scrollY;
    mobileMenuButton.removeAttribute("data-inactive");

    if (mobileMenuButton.classList.contains("active")) {
      mobileMenuButton.classList.remove("active");
      offscreenMenu.classList.remove("active");

      // When the modal is hidden...
      const unScroll = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";

      setTimeout(function () {
        window.scrollTo(0, parseInt(unScroll || "0") * -1);
      }, 1);

      document.getElementsByTagName("html")[0].classList.remove("scroll-lock");
      offscreenMenu.querySelectorAll("[aria-expanded]").forEach((menu) => {
        menu.setAttribute("aria-expanded", "false");
      });
    } else {
      mobileMenuButton.classList.add("active");
      offscreenMenu.classList.add("active");
      offscreenMenu.classList.remove("invisible");

      // When the modal is shown, we want a fixed body
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      setTimeout(function () {
        document.body.style.top = `-${scrollY}px`;
      }, 1);

      document.getElementsByTagName("html")[0].classList.add("scroll-lock");
    }
  };

  /**
   * Handles when a submenu button is clicked.
   *
   * @param {object} button The button was clicked
   * @param {event} event The event generated by the click
   */
  const subMenuClickHandler = function (button, event) {
    const thisMenuItem = button.parentElement;
    thisMenuItem.classList.toggle("active");

    if (thisMenuItem.classList.contains("active")) {
      button.setAttribute("aria-expanded", "true");
    } else {
      if (!thisMenuItem.matches(":hover")) {
        button.setAttribute("aria-expanded", "false");
      }
    }
  };

  /**
   * Handles when a submenu is hovered to change the aria-expanded value
   */
  const subMenuHoverHandler = function (item, event) {
    if (item.classList.contains("active")) {
      return;
    }

    const button = item.querySelector(".submenu-button");

    if (event.type === "mouseenter") {
      button.setAttribute("aria-expanded", "true");
    } else if (event.type === "mouseleave") {
      button.setAttribute("aria-expanded", "false");
    }
  };

  /* Closes a submenu */
  const closeSubMenuHandler = function (menuItem) {
    const activeParent = menuItem.closest(".active");
    const activebutton = activeParent.querySelector("button");
    if (!activeParent) {
      return;
    }

    activeParent.classList.remove("active");

    if (!activeParent.matches(":hover")) {
      activebutton.setAttribute("aria-expanded", "false");
    }
  };

  /**
   * Handles the swapping of elements when a user changes the search paramaters.
   *
   * @param {object} select The select element that was changed
   * @param {object} args {searchName, hiddenType, hiddenUrl, action} The args object of things that will needed to be changed.
   */
  const searchOptionChangeHandler = function (select, args) {
    const selectParent = select.parentElement;
    const arguments = args || [];

    selectParent
      .querySelector(".search-text")
      .setAttribute("name", arguments.searchName);

    if (selectParent.querySelector("[data-search-attribute]")) {
      selectParent.querySelector("[data-search-attribute]").remove();
    }

    if (arguments.hiddenType) {
      const hiddenInput = document.createElement("input");
      hiddenInput.setAttribute("type", "hidden");
      hiddenInput.setAttribute("name", arguments.hiddenType);
      hiddenInput.setAttribute("value", arguments.hiddenUrl);
      hiddenInput.setAttribute("data-search-attribute", "");

      selectParent.insertBefore(hiddenInput, select);
    }

    if (arguments.action) {
      selectParent.setAttribute("action", arguments.action);
    } else if (
      selectParent.getAttribute("action") !== "//www.mtu.edu/search/"
    ) {
      selectParent.setAttribute("action", "//www.mtu.edu/search/");
    }
  };

  searchOptions.forEach((searchSelect) => {
    searchSelect.addEventListener("change", function () {
      const searchSelectField = this;
      const searchTerm = searchSelectField.parentElement.querySelector(
        ".search-text"
      ).value;
      let args;

      switch (searchSelectField.value) {
        case "mtu":
          args = {
            searchName: "q",
            action: searchSelectField.options[searchSelectField.selectedIndex].dataset
            .name || ''
          }
          searchOptions.forEach((searchOption) => {
            searchOptionChangeHandler(searchOption, args);
          });
        break;
        case "site":
          args = {
            searchName: "q",
            hiddenType: "as_sitesearch",
            hiddenUrl:
              window.location.hostname +
              "/" +
              window.location.pathname.split("/")[1],
          };
          searchOptions.forEach((searchOption) => {
            searchOptionChangeHandler(searchOption, args);
          });

          break;
        case "programs":
          args = {
            searchName:
              searchSelectField.options[searchSelectField.selectedIndex].dataset
                .name || "search",
            action:
              searchSelectField.options[searchSelectField.selectedIndex].dataset
                .action ||
              "https://www.mtu.edu/majors/?search=" +
                this.parentElement.querySelector(".search-text").value +
                "#program-sorter",
          };
          searchOptions.forEach((searchOption) => {
            searchOptionChangeHandler(searchOption, args);
          });
          break;
        case "directory":
          args = {
            searchName: "q",
            hiddenType: "psonly",
            hiddenUrl: "1",
          };
          searchOptions.forEach((searchOption) => {
            searchOptionChangeHandler(searchOption, args);
          });
          break;
        default:
          searchOptions.forEach((searchOption) => {
            searchOptionChangeHandler(searchOption, args);
          });
      }
    });
  });

  searchClear.forEach((clear) => {
    clear.addEventListener("click", function (event) {
      const clearButton = this;
      const searchText = clearButton.parentElement.querySelector(
        ".search-text"
      );
      var earlyReturn = false;

      searchInput.forEach((input) => {
        if (document.activeElement === input) {
          earlyReturn = true;
        }
      });

      if (earlyReturn === true) {
        return;
      }

      event.preventDefault();
      searchText.value = "";
      searchText.focus();
    });
  });

  audienceNav.addEventListener("transitionend", function () {
    if (audienceSearchWrapper.classList.contains("display-search")) {
      this.classList.add("invisible");
    }
  });

  searchFields.addEventListener("transitionend", function () {
    if (audienceSearchWrapper.classList.contains("display-audience")) {
      this.classList.add("invisible");
    } else {
      this.parentElement.querySelector(".search-text").focus();
    }
  });

  searchToggleButton.addEventListener("click", function () {
    const button = this;
    if (button.classList.contains("active")) {
      button.classList.remove("active");
      button.setAttribute("aria-expanded", "false");
    } else {
      button.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }

    if (audienceSearchWrapper.classList.contains("display-audience")) {
      audienceSearchWrapper.classList.add("display-search");
      audienceSearchWrapper.classList.remove("display-audience");
    } else {
      audienceSearchWrapper.classList.add("display-audience");
      audienceSearchWrapper.classList.remove("display-search");
    }
    // TODO: Make this check to see if any were visible first before removing.
    audienceSearchWrapper
      .querySelector(".invisible")
      .classList.remove("invisible");
  });

  submenuButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      subMenuClickHandler(this, event);
    });
  });

  submenuButtons.forEach((button) => {
    button.addEventListener("keydown", function (event) {
      if (event.keyCode === 32 || event.keyCode === 13) {
        event.preventDefault();
        event.stopPropagation();
        subMenuClickHandler(this, event);
      }
    });
  });

  mobileMenuButton.addEventListener("click", mobileMenuButtonClickHandler);

  /* Makes it so when a user tabs past the last menu item on mobile it will loop back to the close button */
  const subMenuLastTabHandler = function (element) {
    const loopNavigation = function () {
      event.preventDefault();
      mobileMenuButton.focus();
    };

    let menuItem = element.closest(".menu_item");
    if (!menuItem) {
      return;
    }

    if (!element.nextElementSibling) {
      if (menuItem.classList.contains("active")) {
        // Check if focus is on the last link in the last sub-menu since it's active.
        if (
          element.parentElement.classList.contains("menu_submenu") &&
          !menuItem.nextElementSibling
        ) {
          loopNavigation();
        }
      } else {
        if (element.parentElement.classList.contains("menu")) {
          loopNavigation();
        }
      }
    }
  };

  offscreenMenuButtons.forEach((mobileMenuItem) => {
    mobileMenuItem.addEventListener(
      "keydown",
      function (event) {
        if (event.keyCode === 9) {
          subMenuLastTabHandler(event.target.parentElement);
        }
      },
      true
    ); // !!! Take precedence over the closeSubMenuHandler !!!
  });

  offscreenMenu.addEventListener("transitionend", function () {
    if (!offscreenMenu.classList.contains("active")) {
      offscreenMenu.classList.add("invisible");
    }
  });
  lastSubmenuItem.forEach((menuItem) => {
    menuItem.addEventListener("keydown", function (event) {
      if (event.keyCode === 9) {
        closeSubMenuHandler(this);
      }
    });
  });
};

/* sets up the click event for the left nav slideout in the "Also in this Section" portion on mobile */
const leftNavToggle = function(){
  if(document.querySelector('#toggle-left') == null){
    return;
  }
  const toggle = document.querySelector('#toggle-left');
  const toggleicon = toggle.querySelector('img');
  const toggleButton = toggle.querySelector('button');
  const links = document.querySelector('#main_links');

  if (window.innerWidth < 880) {
    toggleButton.setAttribute('aria-controls', links.id);
    toggleButton.setAttribute('aria-expanded', 'false');
    links.classList.add('main-links-closed');
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 880) {
      if (!toggleButton.hasAttribute('aria-controls')) {
        toggleButton.setAttribute('aria-expanded', toggle.classList.contains('active'));
        toggleButton.setAttribute('aria-controls', links.id)
      }
    } else {
      if (toggleButton.hasAttribute('aria-controls')) {
        toggleButton.removeAttribute('aria-expanded');
        toggleButton.removeAttribute('aria-controls')
      }
    }
  });

  toggleButton.addEventListener('click', ()=>{
    const linksHeight = links.scrollHeight;

    toggle.classList.toggle('active');
    toggleButton.setAttribute('aria-expanded', toggle.classList.contains('active'));

    links.style.setProperty('--maxHeight', `${linksHeight}px`);
    links.classList.remove('main-links-closed');
  });


  links.addEventListener('transitionend', function(){
    if (!toggle.classList.contains('active')) {
      links.classList.add('main-links-closed');
      toggleicon.setAttribute('src','https://www.mtu.edu/_resources/images/icons/hamburger.svg')
      toggleicon.setAttribute('alt', 'open');
    } else {
      toggleicon.setAttribute('src','https://www.mtu.edu/mtu_resources/images/n/arrow-up-black.svg')
      toggleicon.setAttribute('alt', 'close');
    }
  })
}();

class Chart {
  constructor(config, id, dataSourceUrl) {
    this.config = config;
    this.id = id;
    this.dataSourceUrl = dataSourceUrl;
  }

  // These background/foreground color pairs were chosen to meet accessibility
  // contrast requirements.
  getColorPalette() {
    return {
      "#005a96": "#ffffff",
      "#970e76": "#ffffff",
      "#00ab57": "#ffffff",
      "#f68d39": "#000000",
      "#00aeef": "#000000",
      "#48206e": "#ffffff",
      "#82c341": "#000000",
      "#ef373e": "#ffffff",
      "#006f79": "#ffffff",
      "#9e5f2c": "#ffffff",
      "#20419a": "#ffffff",
      "#f1563f": "#000000",
      "#3a84b6": "#ffffff",
      "#798028": "#ffffff",
      "#786658": "#ffffff",
      "#941114": "#ffffff",
    };
  }

  // Use accessible colors for charts.
  getOptions() {
    const options = this.config.options || {};
    return Object.assign({}, options, {
      backgroundColor: "transparent",
      colors: Object.keys(this.getColorPalette()),
    });
  }

  getQuery() {
    return "SELECT *";
  }

  getTheme() {
    return this.config.options.theme || undefined;
  }

  getTitle() {
    return this.config.options.title || undefined;
  }

  hasTitle() {
    return Boolean(this.getTitle());
  }

  getType() {
    return this.config.type;
  }

  draw() {
    const query = new google.visualization.Query(this.dataSourceUrl);
    query.setQuery(this.getQuery());
    query.send(this.drawCallback.bind(this));
  }

  drawCallback(response) {
    if (response.isError()) {
      return;
    }

    const wrap = new google.visualization.ChartWrapper();
    const view = this.createDataView(response.getDataTable());
    wrap.setChartType(this.getType());
    wrap.setDataTable(view);
    wrap.setContainerId(this.id);
    wrap.setOptions(this.getOptions());
    wrap.draw();
  }

  createDataView(dataTable) {
    return new google.visualization.DataView(dataTable);
  }
}

class BubbleChart extends Chart {
  getOptions() {
    return Object.assign({}, super.getOptions(), {
      bubble: {
        textStyle: {
          color: "white",
        },
      },
    });
  }
}

class PieChart extends Chart {
  getOptions() {
    const options = Object.assign({}, super.getOptions(), {
      legend: { alignment: "center" },

      // Use accessible foreground/background colors for pie slices.
      slices: this.getSlices(),

      // Limit tooltip to raw value, percentage is rendered in createDataView.
      tooltip: { text: "value" },
    });

    if (this.getTheme() === "maximized") {
      return options;
    }

    const chartArea = this.hasTitle()
      ? { left: "5%", top: "15%", width: "90%", height: "80%" }
      : { left: "5%", top: "5%", width: "90%", height: "90%" };

    options.chartArea = chartArea;
    return options;
  }

  // Limit to the first two columns for SR-only tables with extra data.
  getQuery() {
    return "SELECT A, B";
  }

  getSlices() {
    return Object.entries(this.getColorPalette()).map(([bgColor, fgColor]) => ({
      color: bgColor,
      textStyle: {
        color: fgColor,
      },
    }));
  }

  // Ensure SR users get percentage text exposed in SR-only tables.
  createDataView(dataTable) {
    const view = new google.visualization.DataView(dataTable);

    view.setColumns([
      0,
      {
        calc: function (dataTable, row) {
          // Remove the quote characters around literals like $ or % in the pattern.
          const pattern = dataTable.getColumnPattern(1).replace(/"/g, "");
          const formatter = new google.visualization.NumberFormat({ pattern });
          const value = dataTable.getValue(row, 1);
          const formattedValue = formatter.formatValue(value);

          let total = 0;
          for (let i = 0; i < dataTable.getNumberOfRows(); i++) {
            total += dataTable.getValue(i, 1);
          }

          // Use toFixed(1) to match Google Charts formatting and strip
          // trailing 0 (e.g. 0.00%).
          const percent = total
            ? ((value / total) * 100).toFixed(1).replace(/\.0$/, "")
            : "0";

          return {
            v: value,
            f: `${formattedValue} (${percent}%)`,
          };
        },
        type: "number",
        label: dataTable.getColumnLabel(1),
      },
    ]);

    return view;
  }
}

/** If there is a slate form on the page, load the css for them. */
class insertSlateCSS {
  constructor(tempSlate) {
    this.slate = tempSlate;
    this.slate.wrap = this.slate.previousElementSibling;
    this.slate.styleSheet =
      "https://go-mtu-edu.cdn.technolutions.net/shared/custom.css";

    if (
      this.slate.wrap &&
      !this.slate.wrap.classList.contains("slate") &&
      !this.slate.classList.contains("slate")
    ) {
      this.slate.wrap.classList.add("slate");
    }

    this.loadCSS();
  }

  loadCSS() {
    mtu.insertTag("link", this.slate.styleSheet);
  }
}

class OverflowMenu {
  constructor(tempMenu, args) {
    this.menu = tempMenu;
    this.menu.overflowClass = "." + args.overflowClass;
    this.menu.stylesheet = args.overflowCSS;
    this.menu.subMenuTarget = args.subMenu || "ul li"; // If a class is targeted it is the submenu item
    this.menu.maxWidth = args.maxWidth || 1200;
    this.menu.whileLoops = 0;
    this.menu.maxLoops = this.menu.childElementCount || 10;
    this.menu.overflow;
    this.menu.windowWidth = window.innerWidth;

    /* Moving Nav items out of the menu on load */
    setTimeout(
      function () {
        while (this.menu.clientWidth < this.menu.scrollWidth) {
          this.removeItems();

          if (this.menu.whileLoops > this.menu.maxLoops) {
            this.menu.whileLoops = 0;
            break;
          }
          this.menu.whileLoops++;
        }
      }.bind(this),
      1
    );

    window.addEventListener("resize", () => {
      if (typeof debounce === "function") {
        debounce(this.moveOverflow(), 500, true);
      } else {
        this.moveOverflow();
      }
    });

    this.loadCSS();
  }

  /* Loads the CSS that is required to make the overflow menu and submenu work */
  loadCSS() {
    fetch(this.menu.stylesheet)
      .then(() => {
        if (
          document.querySelector('link[href="' + this.menu.stylesheet + '"]')
        ) {
          return;
        }

        const tag = document.createElement("link");
        tag.setAttribute("href", this.menu.stylesheet);
        tag.setAttribute("type", "text/css");
        tag.setAttribute("rel", "stylesheet");
        this.menu.parentElement.insertBefore(tag, this.menu);
      })
      .catch((error) => {
        console.error(
          "Fetching " + this.menu.styleSheet + " has caused an error.",
          error
        );
      });
  }

  /**
   * Gets a child element of the menu, hopefully that has a submenu already.
   *
   * @return {Object} A menu item to be used.
   */
  getMenuItem() {
    let menuItem = this.menu.querySelector(this.menu.subMenuTarget);

    if (menuItem && /\./.test(this.menu.subMenuTarget)) {
      menuItem = menuItem.parentElement;
    } else if (!menuItem) {
      menuItem = this.menu.firstElementChild;
    }

    return menuItem;
  }

  /**
   * Creates the overflow menu if it isn't already made
   */
  createOverflowMenuItem() {
    let menuItem = this.getMenuItem();
    const newMenuItem = menuItem.cloneNode(true);
    const overflowClass = this.menu.overflowClass.substring(1);

    if (newMenuItem.firstElementChild.nodeName !== "DIV") {
      const newMenuLabel = document.createElement("div");
      newMenuLabel.classList.add(...newMenuItem.firstElementChild.classList);
      newMenuLabel.innerText = "More...";
      newMenuItem.replaceChild(newMenuLabel, newMenuItem.firstElementChild);
    } else {
      newMenuItem.firstElementChild.innerText = "More...";
    }

    newMenuItem.classList.add(overflowClass);
    newMenuItem.classList.add(...menuItem.classList);
    newMenuItem.querySelector("ul").innerHTML = "";
    newMenuItem
      .querySelector("button")
      .setAttribute("aria-label", "More sub-menu");
    this.menu.overflow = newMenuItem;
    this.menu.appendChild(newMenuItem);
    this.arrowEvents(); // Add the arrow events to the overflow.
  }

  /* Removes Items from the main navigation and places them into the new menu item */
  removeItems() {
    if (!this.menu.overflow) {
      this.createOverflowMenuItem();
    }

    // Don't want to grab the overflow menu.
    let lastItem = this.menu.childElementCount - 2;
    const lastMenuItem = this.menu.children[lastItem];
    if (lastMenuItem) {
      this.menu.overflow.lastElementChild.appendChild(lastMenuItem);
    }
  }

  /* Add items back into the main nav removing them from the new menu item */
  addItems() {
    if (!this.menu.overflow) {
      return;
    }

    const overflowItems = this.menu.overflow.querySelector("ul"); // TODO: make this `ul` a variable

    if (typeof overflowItems == "object") {
      const lastItem = overflowItems.lastElementChild;
      if (lastItem && this.menu.contains(this.menu.overflow)) {
        this.menu.insertBefore(lastItem, this.menu.overflow);
      } else if (!lastItem) {
        // If there are no items left in the overflow menu remove it.
        this.menu.overflow.remove();
        this.menu.overflow = false;
      }
    }
  }

  /* Gets triggered to start moving items around when the window is scaling */
  moveOverflow() {
    if (this.menu.clientWidth == this.menu.scrollWidth) {
      this.addItems();
    }

    if (this.menu.clientWidth < this.menu.scrollWidth) {
      this.removeItems();
    }

    if (window.innerWidth > this.menu.maxWidth) {
      while (this.menu.whileLoops < this.menu.maxLoops) {
        this.addItems();
        this.menu.whileLoops++;
      }
    }
    this.menu.whileLoops = 0;
  }

  arrowClickEventHandler(event) {
    // console.log(event);
    const listItem = event.target.parentElement;
    if (listItem === this.menu.overflow) {
      if (!listItem.classList.contains("active")) {
        listItem.classList.add("active");
        event.target.setAttribute("aria-expanded", "true");
      } else {
        listItem.classList.remove("active");
        event.target.setAttribute("aria-expanded", "false");
      }
    } else {
      this.menu.overflow.classList.add("active");
      this.menu.overflow
        .querySelector(".arrow")
        .setAttribute("aria-expanded", "true");
    }
    event.stopPropagation();
  }

  arrowTabEventHandler(event) {
    if (event.code === "Tab") {
      if (typeof overflowSub === "undefined") {
        return;
      }
      let closeSubMenu = false;
      const lastSubMenuItem = overflowSub.lastElementChild;
      const lastSubMenuItemItem =
        lastSubMenuItem.children[lastSubMenuItem.childElementCount - 2];
      const lastSubMenuItemItemChildren =
        lastSubMenuItem.lastElementChild.children;

      if (lastSubMenuItemItem === event.target) {
        closeSubMenu = true;
      }

      if (!lastSubMenuItemItem) {
        closeSubMenu = true;
      }

      if (lastSubMenuItem.classList.contains("active")) {
        closeSubMenu = false;
      }

      [...lastSubMenuItemItemChildren].map((i) => {
        if (i.lastElementChild === event.target) {
          closeSubMenu = false;
        }
      });

      if (closeSubMenu === true) {
        overflowSub.parentElement.classList.remove("active");
      }
    }
  }

  subMenuHoverHandler(item, event) {
    if (item.classList.contains("active")) {
      return;
    }

    const button = item.querySelector(".submenu-button");

    if (event.type === "mouseenter") {
      button.setAttribute("aria-expanded", "true");
    } else if (event.type === "mouseleave") {
      button.setAttribute("aria-expanded", "false");
    }
  }

  arrowEvents() {
    if (!this.menu.overflow) {
      return;
    }
    setTimeout(
      function () {
        const overflowSub = this.menu.overflow.lastElementChild;
        const arrows = this.menu.overflow.querySelectorAll(".arrow");

        if (!overflowSub.lastChild) {
          return;
        }

        /* Remove all Event Listeners First */
        overflowSub.lastChild.removeEventListener("keydown", (event) => {
          this.arrowTabEventHandler(event);
        });

        arrows.forEach((arrow) => {
          arrow.removeEventListener("click", (event) => {
            this.arrowClickEventHandler(event);
          });
        });

        arrows[0].parentElement.removeEventListener("mouseenter", (event) => {
          this.subMenuHoverHandler(arrows[0].parentElement, event);
        });

        arrows[0].parentElement.removeEventListener("mouseleave", (event) => {
          this.subMenuHoverHandler(arrows[0].parentElement, event);
        });
        /* End Remove all Event Listeners */

        overflowSub.lastChild.addEventListener("keydown", (event) => {
          this.arrowTabEventHandler(event);
        });

        arrows.forEach((arrow) => {
          arrow.addEventListener("click", (event) => {
            this.arrowClickEventHandler(event);
          });
        });

        arrows[0].parentElement.addEventListener("mouseenter", (event) => {
          this.subMenuHoverHandler(arrows[0].parentElement, event);
        });

        arrows[0].parentElement.addEventListener("mouseleave", (event) => {
          this.subMenuHoverHandler(arrows[0].parentElement, event);
        });
      }.bind(this),
      1
    );
  }
}

class OverflowShadow {
	constructor(selector = "[data-overflow-shadow], table") {
		this.targets = Array.from(document.querySelectorAll(selector));

    // Do not init overflow tables in the CMS, it causes the editor to display a dark grey overlay across the page
    if(window.location.hostname != "a.cms.omniupdate.com"){
      this.init();
    }
	}

	init() {
		this.targets.forEach((el) => this.setup(el));

		// Use requestAnimationFrame to debounce resize
		let resizeRaf;
		window.addEventListener("resize", () => {
			cancelAnimationFrame(resizeRaf);
			resizeRaf = requestAnimationFrame(() => this.refresh());
		});
	}

	setup(element) {
		let wrapper = element.parentElement;

		if (element.scrollHeight > wrapper.clientHeight) {
			wrapper.classList.add("overflow-shadow", "overflow-shadow-vertical");
		} else if (!wrapper.classList.contains("overflow-shadow")) {
			wrapper = document.createElement("div");
			wrapper.classList.add("overflow-shadow");
			element.parentNode.insertBefore(wrapper, element);
			wrapper.appendChild(element);
		}

		wrapper.style.setProperty("--offset", "0");

		wrapper.addEventListener("scroll", () => this.update(wrapper, element));
		this.update(wrapper, element);
	}

	refresh() {
		this.targets.forEach((el) => {
			const wrapper = el.parentElement;
			this.update(wrapper, el);
		});
	}

	hasOverflow(wrapper) {
		return (
			wrapper.scrollWidth > wrapper.clientWidth ||
			wrapper.scrollHeight > wrapper.clientHeight
		);
	}

	update(wrapper, element) {
		const isVertical = wrapper.classList.contains("overflow-shadow-vertical");
		const overflowExists = this.hasOverflow(wrapper);

		let maxScroll = Math.round(
			isVertical
				? Math.max(0, wrapper.scrollHeight - wrapper.clientHeight)
				: Math.max(0, wrapper.scrollWidth - wrapper.clientWidth)
		);

		// Clamp scroll position after resizes/content changes
		if (isVertical) {
			if (wrapper.scrollTop > maxScroll) wrapper.scrollTop = maxScroll;
		} else {
			if (wrapper.scrollLeft > maxScroll) wrapper.scrollLeft = maxScroll;
		}

		const scrollAmount = Math.round(
			isVertical ? wrapper.scrollTop : wrapper.scrollLeft
		);

		// Keep the CSS var in sync for pseudo-element positioning
		wrapper.style.setProperty("--offset", `${scrollAmount}px`);

		// Deterministic class setting to prevent "stuck" states
		if (!overflowExists || maxScroll === 0) {
			wrapper.classList.toggle("shadow-start", false);
			wrapper.classList.toggle("shadow-end", false);
			return;
		}

		// Small epsilon to avoid float/pixel jitter at edges
		const EPS = 1; // px

		const showStart = scrollAmount > EPS;
		const showEnd = scrollAmount < maxScroll - EPS;

		wrapper.classList.toggle("shadow-start", showStart);
		wrapper.classList.toggle("shadow-end", showEnd);
	}
}

class ToTop {
  constructor({ blackList = "", container = "#main" }) {
    this.totop = this.createToTopAnchor();
    this.totop.blacklist = blackList;
    this.totop.blackListed = false;
    this.totop.container = document.querySelector(container);

    this.totop.container.appendChild(this.totop);

    this.totop.blacklist.forEach((checkString) => {
      if (window.location.href.indexOf(checkString) > -1) {
        this.totop.blackListed = true;
        return null;
      }
    });

    if (this.totop.blackListed === true) {
      return;
    }

    window.addEventListener(
      "scroll",
      function () {
        this.displayToTopButton();
      }.bind(this)
    );

    this.totop.addEventListener("click", this.toTopClickHandler);
  }

  createToTopAnchor() {
    const toTopAnchor = document.createElement("a");
    toTopAnchor.setAttribute("href", "#main");
    toTopAnchor.classList.add("to-top");
    toTopAnchor.innerText = "Top";
    return toTopAnchor;
  }

  displayToTopButton() {
    if (window.scrollY > 400) {
      this.totop.classList.add("to-top-show");
    } else {
      this.totop.classList.remove("to-top-show");
    }
  }

  toTopClickHandler(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

class SortableTable {
  constructor(tableNode, args) {
    this.tableNode = tableNode;
    this.tableNode.classList.contains("table-sortable")
      ? this.tableNode.classList.add("sortable")
      : "";
    this.tableNode.columnHeadings = this.tableNode.querySelectorAll("thead th");
    this.tableNode.tableContent = this.tableNode.querySelector("tbody");
    this.tableNode.tableRows = this.tableNode.tableContent.querySelectorAll(
      "tr"
    );
    this.tableNode.observeArgs = {
      attributes: true,
      childList: true,
      subtree: true,
    };

    this.tableNode.tableObserver = new MutationObserver(() => {
      this.tableObserverHandler.bind(this);
      this.tableObserverHandler;
    });

    this.tableNode.tableObserver.observe(
      this.tableNode,
      this.tableNode.observeArgs
    );

    this.tableNode.data = [];

    this.checkHeadings();
    this.updateData();

    [...this.tableNode.columnHeadings].map((heading) => {
      const sortButton = heading.querySelector("button");
      sortButton.addEventListener("click", (event) => {
        this.sortButtonClickHandlers(event);
      });
    });
  }

  /* If there isn't a button in the `th` we need to create one */
  createButton(element, method) {
    const button = document.createElement("button");
    if (element.classList.length > 0) {
      button.classList.add(...element.classList);
    }
    button.innerHTML = element.innerHTML;
    button.id = element.innerText.replace(/[^A-Z0-9]+/gi, "").toLowerCase();
    /* this will remove the first element and place a button inside */
    if (method === "replace") {
      element.parentElement.insertBefore(button, element);
      element.remove();
      /* this will remove everything from the `th` and put in the button*/
    } else if (method === "insert") {
      element.innerHTML = "";
      element.appendChild(button);
    }
  }

  checkHeadings() {
    [...this.tableNode.columnHeadings].map((header) => {
      // If there isn't a button in the th, make it one.
      if (
        header.firstElementChild &&
        header.firstElementChild.tagName !== "BUTTON"
      ) {
        this.createButton(header.firstElementChild, "replace");
      } else {
        this.createButton(header, "insert");
      }

      if (header.getAttribute("tabindex")) {
        header.removeAttribute("tabindex");
      }
    });
  }

  updateData() {
    [...this.tableNode.tableRows].map((row, index) => {
      let colData = {};
      for (let i = 0; i < this.tableNode.columnHeadings.length; i++) {
        const columnName = this.tableNode.columnHeadings[i].querySelector(
          "button"
        ).id;
        const cell = row.children[i];
        const cellType = row.children[i].nodeName;
        const cellValue = cell.innerHTML;
        const cellAttrs = [...cell.attributes];
        const cellText = cell.innerText; // Only used for sorting purposes.
        colData[columnName] = [cellType, cellValue, cellAttrs, cellText];
      }
      this.tableNode.data.push(colData);
    });
  }

  sortByAlpha(val1, val2) {
    return String(val1).localeCompare(String(val2));
  }

  sortByDate(val1, val2) {
    const date1 = dayjs(val1, "MM-DD-YYYY", "en", false).toDate();
    const date2 = dayjs(val2, "MM-DD-YYYY", "en", false).toDate();

    if (date1.getTime() < date2.getTime()) {
      return -1;
    }

    if (date1.getTime() > date2.getTime()) {
      return 1;
    }

    return 0;
  }

  createRow(obj) {
    const row = document.createElement("tr");
    const objKeys = Object.keys(obj);
    objKeys.map((key) => {
      const cellNode = obj[key][0].toLowerCase();
      const cellHTML = obj[key][1];
      const cellAttrs = obj[key][2];
      const cell = document.createElement(cellNode);
      cell.setAttribute("data-attr", key);
      cell.innerHTML = cellHTML;

      if (cellAttrs.length > 0) {
        cellAttrs.map((attr) => {
          cell.setAttribute(attr.name, attr.value);
        });
      }

      row.appendChild(cell);
    });
    return row;
  }

  getTableContent(data) {
    data.map((obj) => {
      const row = this.createRow(obj);
      this.tableNode.tableContent.appendChild(row);
    });
  }

  sortData(data, param, direction, sortCallback) {
    this.tableNode.tableContent.innerHTML = "";
    let sortedData;
    if (direction == "ascending") {
      sortedData = [...data].sort(function (a, b) {
        const val1 = a[param][3];
        const val2 = b[param][3];
        return sortCallback(val1, val2);
      });
    } else if (direction == "descending") {
      sortedData = [...data].sort(function (a, b) {
        const val1 = a[param][3];
        const val2 = b[param][3];
        return sortCallback(val2, val1);
      });
    } else {
      sortedData = data;
    }
    this.getTableContent(sortedData);
  }

  resetButtons(event) {
    const tableButtons = this.tableNode.querySelectorAll("thead button");
    [...tableButtons].map((button) => {
      if (button !== event.target) {
        button.parentElement.removeAttribute("aria-sort");
      }
    });
  }

  sortButtonClickHandlers(event) {
    const eventTarget = event.target;
    const eventTargetParent = eventTarget.parentElement;
    this.resetButtons(event);
    this.tableNode.tableObserver.disconnect();

    let sortType = eventTargetParent.getAttribute("data-type");
    let sortCallback;

    switch (sortType) {
      case "mmddyyyy":
        sortCallback = this.sortByDate;
        break;
      default:
        sortCallback = this.sortByAlpha;
        break;
    }

    if (eventTargetParent.getAttribute("aria-sort") == "descending") {
      this.sortData(
        this.tableNode.data,
        eventTarget.id,
        "descending",
        sortCallback
      );
      eventTargetParent.setAttribute("aria-sort", "ascending");
    } else if (eventTargetParent.getAttribute("aria-sort") == "ascending") {
      this.sortData(this.tableNode.data, eventTarget.id, "none", sortCallback);
      eventTargetParent.setAttribute("aria-sort", "none");
    } else {
      this.sortData(
        this.tableNode.data,
        eventTarget.id,
        "ascending",
        sortCallback
      );
      eventTargetParent.setAttribute("aria-sort", "descending");
    }
  }

  tableObserverHandler(observeArgs, table) {
    for (const mutation of observeArgs) {
      this.updateData();
    }
  }
}

window.addEventListener("load", function () {
  const menus = document.querySelectorAll(".menu");
  menus.forEach((menu) => {
    new OverflowMenu(menu, {
      overflowClass: "overflow-menu",
      overflowCSS:
        "https://www.mtu.edu/mtu_resources/styles/n/overflow-menu.css",
    });

    mtu.initOffscreenTables = (...args) => { new OverflowShadow(...args); };
    new OverflowShadow();
  });

  // Initialize sortable table buttons
  var sortableTables = document.querySelectorAll("table.sortable");
  for (var i = 0; i < sortableTables.length; i++) {
    const sortedTable = new SortableTable(sortableTables[i]);
  }

  new ToTop({ blackList: ["syp", "mtu.edu/library"] });
});

/* SLATE CSS */
/* If I take this out of the window.load event it will fire faster on the slate forms that are on the page and reduce the FOUC */
let slateScripts = document.querySelectorAll(
  "body script[src*='technolutions.net'], body script[src*='go.mtu.edu'], .slate"
);

document.querySelectorAll("body script").forEach((slateScript) => {
  if (
    typeof slateScript === "object" &&
    slateScript.innerText.indexOf("https://go.mtu.edu") > 0
  ) {
    slateScripts = [...slateScripts, slateScript];
  }
});

slateScripts.forEach((slate) => {
  new insertSlateCSS(slate);
});
/* END SLATE CSS */

/* BANWEB UPDATES */
/* If on the Banweb course listings page, update class split-3 to split-three and add a space on either side of the hyphen in the course list */
/* Also adds margin above course titles, spaces between course number and seperator hyphen, and IDs for course titles for linking */
// Fire code if URL contains the undergrad course listing URL, note that the URL may have anchors and params attached
if (window.location.href.indexOf("https://www.banweb.mtu.edu/pls/owa/stu_ctg_utils.p_online_all_courses_ug") > -1) {
  jQuery(".split-3").addClass("split-three").removeClass("split-3");
  // Add spaces before/after hyphen for jump links

  jQuery(".split-three").children().each(function(e){
    jQuery(this).children("a").text(
      jQuery(this).children("a").text().replace("-", " - ")
    )

  });
  // Add spaces before/after hyphen for department hedings
  document.querySelectorAll("h3").forEach(function(e){
      e.textContent = e.textContent.replace("-", " - ");
  });
  // Add margin for course titles and IDs for linking
  document.querySelectorAll("h4").forEach(function(e){
      e.classList.add("margin-top-2x");
      e.id = e.textContent.split(" - ", 1)[0].replace(" ", "").toLowerCase();
  });
}
/* END BANWEB UPDATES */

/* Title IX Quick leave button */
if (window.location.pathname.startsWith("/title-ix/") || window.location.pathname.startsWith("/eo-compliance/")) {
    document.addEventListener("DOMContentLoaded", function() {
        const leave_button = document.createElement("button");
        leave_button.id = "leave_button";
        leave_button.innerText = "Quick Leave";
        leave_button.classList.add('button');
        leave_button.style.background = "red";
        leave_button.style.color = "white";
        leave_button.style.borderRadius = "5px";
        leave_button.style.border = "1px solid black";
        leave_button.style.padding = "6px 12px";
        leave_button.style.fontSize = "1rem";
        leave_button.onclick = function() {
            window.open("http://weather.com", "_newtab");
            window.location.replace('http://google.com');
        };
        document.getElementsByClassName('site-title-wrapper')[0].appendChild(leave_button);
        var styles = `
          #leave_button {
            transition: 0.1s ease all;
            position: fixed;
            right: 10%;
            margin-top: 14px;
            z-index: 99;
          }
          #leave_button:hover {
            background-color: black !important;
            border: 1px solid black !important;
            outline: 1px dashed white;
            outline-offset: -4px;
            text-decoration: underline;
            transition: 0.1s ease all;
          }
          @media (max-width: 880px) {
            #leave_button {
              margin-top:14px !important;
            }
          }`;

        var styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    });
    var keyflag = 0;
    document.addEventListener('keyup', function(e) {

        if (e.key == "Escape") {

            if (keyflag === 2) {
                keyflag = 0;
                window.open("http://weather.com", "_newtab");
                window.location.replace('http://google.com');

            }

            keyflag += 1;
            setTimeout(function() {
                keyflag = 0;
            }, 1000);


        }
    });
    const navBar = document.querySelector(".nav-bar");
    window.addEventListener("scroll", function() {
        if (!document.querySelectorAll(".nav-bar")[0].classList.contains("nav-bar-collapse")) {
            document.getElementById("leave_button").style.marginTop = "14px";
        } else {
            document.getElementById("leave_button").style.marginTop = "-40px";
        }
    });

}
/* End Title IX */

mtu.initNav();

window.__mtu__ = mtu;
