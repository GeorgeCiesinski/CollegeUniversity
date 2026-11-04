/**
 * @file
 * FAQ accordion toggles.
 *
 * Loaded from global.js because FAQ sections appear on many pages.
 */

(function ($, Drupal) {
  /**
   * Expands and collapses FAQ headings.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Toggles .faq-dropdown and the visibility icon on .faq-heading click.
   */
  Drupal.behaviors.faqDropdown = {
    attach: function (context, settings) {
      // Target the .career-item li
      $(once('faqDropdown', '.faq-heading', context)).each(function () {
        $(this).on('click', function(e) {
          e.stopPropagation(); // Prevent click from bubbling up
          var spanElement = $(this).find('.material-symbols-rounded');
          var faqDropdown = $(this).next('.faq-dropdown');
          faqDropdown.toggleClass('active');
          if (spanElement.text() === 'visibility') {
            spanElement.text('visibility_off');
          } else {
            spanElement.text('visibility');
          }
        });
      });
    }
  };
})(jQuery, Drupal);
