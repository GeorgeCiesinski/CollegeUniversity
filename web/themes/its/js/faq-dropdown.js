/*
 * This script adds toggle functionality to FAQ dropdowns
 */

(function ($, Drupal) {
  Drupal.behaviors.faqDropdown = {
    attach: function (context, settings) {
      // Target the .career-item li
      $(once('faqDropdown', '.faq-heading', context)).each(function () {
        $(this).on('click', function(e) {
          e.stopPropagation(); // Prevent click from bubbling up
          spanElement = $(this).find('.material-symbols-rounded');
          faqDropdown = $(this).next('.faq-dropdown')
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