/**
 * @file
 * Blurs beautiful-page background images as the user scrolls.
 *
 * Overrides default scroll behavior from the Background Images module (The built-in scroll is bugged).
 */

(function ($, Drupal, once) {
  /**
   * Applies a scroll-linked blur filter to .background-image.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Increases blur up to 50px over the first viewport of scroll.
   * @prop {Drupal~behaviorDetach} detach
   *   Removes the namespaced scroll handler when the context is unloaded.
   */
  Drupal.behaviors.scrollBlur = {
    attach: function (context, settings) {
      // Bind the window scroll listener once per page load.
      if (!once('scrollBlur', 'html', context).length) {
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      $(window).on('scroll.scrollBlur', function () {
        var scrollTop = $(window).scrollTop();
        var maxBlur = 50;
        var viewportHeight = $(window).height();
        var blurAmount = (scrollTop <= viewportHeight) ? (scrollTop / viewportHeight) * maxBlur : maxBlur;
        $('.background-image').css('filter', 'blur(' + blurAmount + 'px)');
      });
    },
    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        $(window).off('scroll.scrollBlur');
        once.remove('scrollBlur', 'html');
      }
    }
  };
})(jQuery, Drupal, once);
