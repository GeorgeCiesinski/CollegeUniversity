/**
 * @file
 * Tab buttons on /artificial-intelligence.
 */

(function ($, Drupal, once) {
  /**
   * Switches tabbed content panels on beautiful pages.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Activates the first tab and toggles .tab-button / .tab-content with
   *   basic tablist ARIA and arrow-key support.
   */
  Drupal.behaviors.tabbedContent = {
    attach: function (context, settings) {
      $(once('customTabs', 'body', context)).each(function () {
        const $buttons = $('.tab-button', context);
        const $contents = $('.tab-content', context);
        if (!$buttons.length) {
          return;
        }

        const $tablist = $buttons.first().parent();
        $tablist.attr('role', 'tablist');

        $buttons.each(function (index) {
          const $btn = $(this);
          const tab = String($btn.data('tab'));
          const panelId = 'tab-panel-' + tab;
          const tabId = 'tab-button-' + tab;
          $btn.attr({
            role: 'tab',
            id: tabId,
            'aria-controls': panelId,
            'aria-selected': 'false',
            tabindex: '-1'
          });
          const $panel = $contents.filter('[data-tab="' + tab + '"]');
          $panel.attr({
            role: 'tabpanel',
            id: panelId,
            'aria-labelledby': tabId,
            hidden: true
          });
        });

        function activateTab($btn) {
          const tab = String($btn.data('tab'));
          $buttons.removeClass('active').attr({ 'aria-selected': 'false', tabindex: '-1' });
          $contents.removeClass('active').attr('hidden', true);
          $btn.addClass('active').attr({ 'aria-selected': 'true', tabindex: '0' });
          $contents.filter('[data-tab="' + tab + '"]').addClass('active').removeAttr('hidden');
        }

        activateTab($buttons.first());

        $buttons.on('click', function () {
          activateTab($(this));
        });

        $buttons.on('keydown', function (e) {
          const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
          if (keys.indexOf(e.key) === -1) {
            return;
          }
          e.preventDefault();
          const list = $buttons.toArray();
          let i = list.indexOf(this);
          if (e.key === 'ArrowRight') {
            i = (i + 1) % list.length;
          } else if (e.key === 'ArrowLeft') {
            i = (i - 1 + list.length) % list.length;
          } else if (e.key === 'Home') {
            i = 0;
          } else if (e.key === 'End') {
            i = list.length - 1;
          }
          activateTab($(list[i]));
          list[i].focus();
        });
      });
    }
  };
})(jQuery, Drupal, once);
