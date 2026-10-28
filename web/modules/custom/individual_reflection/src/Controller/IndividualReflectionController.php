<?php

namespace Drupal\individual_reflection\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller for the Individual Reflection module pages.
 *
 * This controller is responsible for building and returning render arrays
 * for routes defined by the Individual Reflection module. It connects the
 * Drupal routing system to Twig templates and ensures that the questionnaire
 * and results interface are rendered correctly.
 *
 * Responsibilities include:
 * - Returning the main Individual Reflection page.
 * - Providing render arrays that attach the module's Twig templates.
 * - Ensuring the required assets and data are available to the frontend.
 *
 * The questionnaire itself is generated dynamically in Twig using indicator
 * data provided by preprocess functions. JavaScript then analyzes responses
 * and generates course recommendations based on user input.
 *
 * @package Drupal\individual_reflection
 */

class IndividualReflectionController extends ControllerBase {

  public function page() {
    return [
      '#theme' => 'individual_reflection_page',
      '#attached' => [
        'library' => [
          'individual_reflection/recommender',
        ],
      ],
    ];
  }
}