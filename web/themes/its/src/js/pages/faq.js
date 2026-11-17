/**
 * @file
 * FAQ accordion toggles.
 *
 * Loaded from global.js because FAQ sections appear on many pages.
 */

(function ($, Drupal, once) {
  /**
   * Expands and collapses FAQ headings.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Toggles .faq-dropdown and the visibility icon on .faq-heading
   *   click/Enter/Space; sets aria-expanded.
   */
  Drupal.behaviors.faqDropdown = {
    attach: function (context, settings) {
      $(once('faqDropdown', '.faq-heading', context)).each(function (index) {
        var $heading = $(this);
        var $panel = $heading.next('.faq-dropdown');
        var panelId = $panel.attr('id') || 'faq-panel-' + index;

        $panel.attr('id', panelId);
        $heading.attr({
          role: 'button',
          tabindex: '0',
          'aria-expanded': $panel.hasClass('active') ? 'true' : 'false',
          'aria-controls': panelId,
        });

        function toggleFaq() {
          $panel.toggleClass('active');
          var open = $panel.hasClass('active');
          $heading.attr('aria-expanded', open ? 'true' : 'false');
          var $icon = $heading.find('.material-symbols-rounded');
          $icon.text(open ? 'visibility_off' : 'visibility');
        }

        $heading.on('click', function (e) {
          e.stopPropagation();
          toggleFaq();
        });

        $heading.on('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFaq();
          }
        });
      });
    },
  };
})(jQuery, Drupal, once);
