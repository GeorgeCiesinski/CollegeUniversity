/**
 * @file
 * Vitest setup: Drupal globals (jQuery, Drupal, once) for behavior IIFEs.
 */

import { afterEach } from 'vitest';
import jQuery from 'jquery';
import once from '@drupal/once';

globalThis.jQuery = jQuery;
globalThis.$ = jQuery;
globalThis.once = once;
globalThis.Drupal = { behaviors: {} };
globalThis.drupalSettings = {};

afterEach(() => {
  document.body.innerHTML = '';
  document.body.removeAttribute('data-once');
  document.documentElement.removeAttribute('data-once');
  jQuery(document).off('.dropdownBehavior');
});
