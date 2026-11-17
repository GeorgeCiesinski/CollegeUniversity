/**
 * @file
 * Status icons on service_status nodes.
 *
 * Attached for the /service-status-dashboard/… path prefix. That prefix
 * is Pathauto for individual services, not a public nav landing page.
 */

(function ($, Drupal) {
  /**
   * Inserts Material icon spans next to service status field values.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Maps Operational, Partial Outage, Maintenance, and Critical text
   *   in .views-field-field-status to icon classes.
   */
  Drupal.behaviors.serviceStatusBehavior = {
    attach: function (context, settings) {
      // Run this function once per item returned
      $(once('serviceStatusBehavior', '.views-field-field-status', context)).each(function () {
        // Find child field-content element
        var fieldContent = $(this).find('.field-content');
        // Extract contained text
        var fieldText = fieldContent.text();
        // Add correct classes and icon for each possible status
        if (fieldText.includes('Operational')) {
          $(
            '<span class="status-icons icon-operational material-symbols-rounded">check</span>',
          ).insertBefore(fieldContent);
        } else if (fieldText.includes('Partial Outage')) {
          $(
            '<span class="status-icons icon-partial material-symbols-rounded">priority_high</span>',
          ).insertBefore(fieldContent);
        } else if (fieldText.includes('Maintenance')) {
          $(
            '<span class="status-icons icon-maintenance material-symbols-rounded">build_circle</span>',
          ).insertBefore(fieldContent);
        } else if (fieldText.includes('Critical')) {
          $(
            '<span class="status-icons icon-critical material-symbols-rounded">cancel</span>',
          ).insertBefore(fieldContent);
        }
      });
    },
  };
})(jQuery, Drupal);
