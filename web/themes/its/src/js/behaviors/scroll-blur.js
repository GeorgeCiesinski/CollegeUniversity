/**
 * @file
 * Blurs beautiful-page background images as the user scrolls.
 *
 * Overrides default scroll behavior from the Background Images module.
 */

(function ($, Drupal) {
  /**
   * Applies a scroll-linked blur filter to .background-image.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Increases blur up to 50px over the first viewport of scroll.
   */
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
