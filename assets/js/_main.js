/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
    }
  },
  // Home page
  home: {
    init: function() {

      /** Prevent overflow in body when modal is open */
        function overflowToggle() {
        $("body").css("overflow", "hidden");
        $('a.modalCloseImg').click(function() {
          $("body").css("overflow-y", "scroll");
        });
        }

        /** Create a modal that fades on overlay and with slide in content */
        function createModal (el) {
        $(el).modal({onOpen: function (dialog) {
          dialog.overlay.fadeIn('slow', function () {
            dialog.data.hide();
            dialog.container.fadeIn('slow', function () {
              dialog.data.slideDown('slow');
            });
          });
        }});
      }

      /** This handles smooth scrolling to section ids */
      function scrollToElement(selector, time, verticalOffset) {

        var desktopHeight = 768,
          mobileHeight = 480,
          height = jQuery(window).height() || window.innerHeight || 768,
          width = jQuery(window).width() || window.width || 480,
          desktopDiff = desktopHeight - height;
          mobileDiff = mobileHeight - height;

        time = typeof(time) !== 'undefined' ? time : 1000;
        verticalOffset = typeof(verticalOffset) !== 'undefined' ? verticalOffset : 0;

        if (width < 480) {
          verticalOffset = verticalOffset + (mobileDiff/2);
        } else {
          verticalOffset = verticalOffset + (desktopDiff/2);
        }

        var element = $(selector),
          offset = element.offset(),
          offsetTop = offset.top + verticalOffset;

        $('html, body').animate({
          scrollTop: offsetTop
        }, time);

      }

      /** Scroll to page ids */
      $('.menu-about > a').click( function(e) {
        e.preventDefault();
        scrollToElement('#about', 1500);
      });

      $('.menu-portfolio > a').click( function(e) {
        e.preventDefault();
        scrollToElement('#portfolio', 1500, -20);
      });

      $('.menu-contact > a').click( function(e) {
        e.preventDefault();
        scrollToElement('#contact', 1500, -20);
      });

      $('#bio-nav').click( function(e) {
        e.preventDefault();
        scrollToElement('#bio', 1000, -50);
      });

      $('#skills-nav').click( function(e) {
        e.preventDefault();
        scrollToElement('#skills', 1000, -75);
      });

      $('#resume-nav').click( function(e) {
        e.preventDefault();
        scrollToElement('#resume', 1000, -120);
      });

      $('#local-ia-nav').click( function(e) {
        e.preventDefault();
        scrollToElement('#ia-design-section', 1000, -25);
      });

      $('#local-responsive-nav').click( function(e) {
        e.preventDefault();
        scrollToElement('#responsive-section', 1000, -25);
      });

      $('#local-mobile-nav').click( function(e) {
        e.preventDefault();
        scrollToElement('#mobile-section', 1000, -25);
      });

      $('#local-dd-nav').click( function(e) {
        e.preventDefault();
        scrollToElement('#ui-dd-section', 1000, -25);
      });

      $('#connect-nav').on( "click", function(e) {
        e.preventDefault();
        scrollToElement('#block-contact-me');
      });

      $('a.navbar-brand').on( "click", function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 1500);
      });

      /** Launch modals on click*/
      $('.launch.ia-design').click(function () {
        createModal("#ia-design");
        overflowToggle();
        return false;
      });

      $('.launch.mobile').click(function () {
        createModal("#mobile");
        overflowToggle();
        return false;
      });

      $('.launch.responsive-ui').click(function () {
        createModal("#responsive-ui");
        overflowToggle();
        return false;
      });

      $('.launch.ui-dd').click(function () {
        createModal("#ui-dd");
        overflowToggle();
        return false;
      });

      $('a.resume').click(function () {
        createModal("#about-detail");
        overflowToggle();
        return false;
      });
      
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
