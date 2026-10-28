/*
 * This script overrides the datetime input type to datetime-local
 */

(function ($, Drupal) {
  Drupal.behaviors.datetimeLocalOverride = {
    attach: function (context, settings) {
      // Target the specific form or input fields
      $(once('datetimeLocalOverride', 'input[name="field_date_and_time_value[min]"], input[name="field_date_and_time_value[max]"]', context)).each(function () {
        // Change the input type to datetime-local
        $(this).attr('type', 'datetime-local');
      });
    }
  };
})(jQuery, Drupal);