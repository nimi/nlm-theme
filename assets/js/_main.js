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
      /** Prevent overflow in body when modal is open 
      function overflowToggle() {
        $("body").css("overflow", "hidden");
        $('a.modalCloseImg').click(function() {
          $("body").css("overflow-y", "scroll");
        });
      }*/

      // Scroll to target
      $(function() {
        $('a').click(function() {
          if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);

            // if (target.offset().top != $(window).offset().top) {
            target = target.length ? target : $('[id=' + this.hash.slice(1) +']');
            if (this.hash.slice(1) === "") {
              return false;
            }

            if (target.length) {
              setTimeout(function() {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 1000);
              }, 400);
              return false;
            }
          }
        });
      });

      $(function() {

        // Create a modal that fades on overlay and with slide in content
        var createModal = function(el) {
          $(el).modal({
            onOpen: function (dialog) {
              dialog.overlay.fadeIn('slow', function () {
                dialog.data.hide();
              });
              dialog.container.fadeIn('slow', function () {
                dialog.data.slideDown('slow');
              });
            }
          });
        };

        $('.launch').click(function() {
          var elementId = this.className.split(' ');
          elementId = '#' + elementId[1];

          createModal(elementId);
          //overflowToggle();
          return;
        });

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
