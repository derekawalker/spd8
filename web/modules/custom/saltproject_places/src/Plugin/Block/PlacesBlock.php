<?php

namespace Drupal\saltproject_places\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'PlacesBlock' block.
 *
 * @Block(
 *  id = "saltproject_places_block",
 *  admin_label = @Translation("Places Block"),
 * )
 */
class PlacesBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#title' => 'Places Block',
      '#description' => 'Place selection block.',
      '#theme' => 'saltproject_places_block',
    ];
  }

}
