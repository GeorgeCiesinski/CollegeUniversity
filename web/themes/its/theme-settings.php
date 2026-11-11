<?php

/**
 * @file
 * Functions to support ITS theme settings.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter() for system_theme_settings.
 */
function its_form_system_theme_settings_alter(array &$form, FormStateInterface $form_state): void {
  $form['its_settings'] = [
    '#type' => 'details',
    '#title' => t('ITS color scheme'),
    '#open' => TRUE,
  ];

  $form['its_settings']['color_scheme'] = [
    '#type' => 'select',
    '#title' => t('Color scheme'),
    '#description' => t('Predefined schemes are authored in the theme stylesheets. Edit base colors in <code>src/scss/abstracts/_color-schemes.scss</code>, then rebuild assets.'),
    '#options' => [
      'teal_coral' => t('Teal & Coral'),
      'forest_amber' => t('Forest & Amber'),
      'slate_terracotta' => t('Slate & Terracotta'),
      'plum_sage' => t('Plum & Sage'),
    ],
    '#default_value' => theme_get_setting('color_scheme') ?? 'teal_coral',
  ];
}
