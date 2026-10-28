/*
 * This script adds a dynamic blur effect to background images on beautiful pages as the user scrolls.
 * This overrides default scroll behavior provided in background images module.
 */

(function ($, Drupal) {
  Drupal.behaviors.scrollBlur = {
    attach: function (context, settings) {
      // Target the window
      $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop(); // Get the current scroll position
        var maxBlur = 50; // Maximum blur value (pixels)
        var viewportHeight = $(window).height(); // Height of the viewport

        // Calculate the blur amount based on the scroll position relative to the viewport height.
        var blurAmount = (scrollTop <= viewportHeight) ? (scrollTop / viewportHeight) * maxBlur : maxBlur;

        // Apply the blur effect to the background-image class using jQuery's css() method.
        $('.background-image').css('filter', 'blur(' + blurAmount + 'px)');
      });
    }
  };
})(jQuery, Drupal, once);

