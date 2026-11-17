/**
 * @file
 * Adds aria-labelledby on the search bar and quick-action links.
 */

(function ($, Drupal) {
  /**
   * Labels search inputs and quick-action items for assistive tech.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Sets aria-labelledby on Search API fulltext fields and
   *   .quick-action-item links.
   */
  Drupal.behaviors.addAriaBehavior = {
    attach: function (context, settings) {
      // Helper function to generate unique IDs
      function generateUniqueId() {
        return 'quick-action-title-' + Math.random().toString(36).slice(2, 11);
      }

      // Target search bar instances
      $(
        once('searchLabel', '#edit-search-api-fulltext, #edit-search-api-fulltext--2', context),
      ).each(function () {
        const $searchInput = $(this);
        const searchButtonId = $searchInput.is('#edit-search-api-fulltext')
          ? 'edit-submit-search'
          : 'edit-submit-search--2';

        // Ensure the button exists
        const $searchButton = $('#' + searchButtonId, context);

        if ($searchButton.length) {
          // Set aria-labelledby on the input
          $searchInput.attr('aria-labelledby', searchButtonId);
        }
      });

      // Handle quick action list links
      $(once('quickActionLabel', '.quick-action-list .quick-action-item', context)).each(
        function () {
          const $item = $(this);
          const $titleDiv = $item.find('.views-field-title').first();
          const $link = $item.find('.field-content a').first();

          if ($titleDiv.length && $link.length) {
            // Generate a unique ID for the title if not already set
            let titleId = $titleDiv.attr('id');
            if (!titleId) {
              titleId = generateUniqueId();
              $titleDiv.attr('id', titleId);
            }

            // Set aria-labelledby on the link
            $link.attr('aria-labelledby', titleId);
          }
        },
      );
    },
  };
})(jQuery, Drupal);
