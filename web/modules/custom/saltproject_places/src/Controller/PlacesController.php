<?php

namespace Drupal\saltproject_places\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class PlacesController.
 */
class PlacesController extends ControllerBase {

  /**
   * Places.
   *
   * @return string
   *   Return Hello string.
   */
  public function content() {
    return [
      '#theme' => 'saltproject_places',
    ];
  }

}
