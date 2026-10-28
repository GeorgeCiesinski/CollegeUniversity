/**
 * @file
 * Toggles career-item rows on /careers.
 */

(function ($, Drupal) {
  /**
   * Expands and collapses career list items.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Adds a visibility icon and click toggle on `.career-item li`.
   */
  Drupal.behaviors.careerItemDropdown = {
    attach: function (context, settings) {
      // Target the .career-item li
      $(once('careerItemDropdown', '.career-item li', context)).each(function () {
        // Add visibility span if doesn't exist
        var h4Element = $(this).find('h4');
        var spanElement = h4Element.next('.material-symbols-rounded');
        if (spanElement.length === 0) {
          h4Element.after('<span class="material-symbols-rounded">visibility</span>');
        }
        $(this).on('click', function(e) {
          e.stopPropagation(); // Prevent click from bubbling up
          $(this).toggleClass('li-active');
          // Toggle visibility span icon
          spanElement = $(this).find('span.material-symbols-rounded');
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
