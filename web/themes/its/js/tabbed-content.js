/*
 * This script adds tabbed content to specific beautiful pages
 * Example page: artificial-intelligence
 */

(function ($, Drupal) {
  Drupal.behaviors.tabbedContent = {
    attach: function (context, settings) {
      // Run the behavior once globally (on the body)
      $(once('customTabs', 'body', context)).each(function () {

        const buttons = $('.tab-button', context);
        const contents = $('.tab-content', context);

        // Set first tab and content active by default
        buttons.first().addClass('active');
        contents.first().addClass('active');

        // Handle tab button clicks
        buttons.on('click', function () {
          const tab = $(this).data('tab');

          // Remove active class from all buttons and contents
          buttons.removeClass('active');
          contents.removeClass('active');

          // Add active class to clicked button and matching content
          $(this).addClass('active');
          $(`.tab-content[data-tab="${tab}"]`, context).addClass('active');
        });
      });
    }
  };
})(jQuery, Drupal);
