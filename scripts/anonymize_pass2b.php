<?php

/**
 * @file
 * Follow-up anonymization for leftover strings.
 *
 * Run: ddev drush php:script scripts/anonymize_pass2b.php
 */

use Drupal\block_content\Entity\BlockContent;
use Drupal\node\Entity\Node;

$replacements = [
  'North campus' => 'Campus A',
  'north campus' => 'Campus A',
  'University of Guelph' => 'Partner University',
  'Arboretum' => 'campus green space',
  'Blackboard Website' => 'LMS Website',
  'Blackboard Link' => 'LMS Link',
  'Blackboard' => 'LMS',
  'https://www.youtube.com/@CollegeIT' => 'https://example.com/social/youtube',
];

$node_ids = [27, 51, 71, 86, 88, 91, 94, 102, 105, 140, 221];
$changed = [];

foreach ($node_ids as $nid) {
  $node = Node::load($nid);
  if (!$node) {
    continue;
  }
  $dirty = FALSE;

  if ($node->hasField('body') && !$node->get('body')->isEmpty()) {
    $value = $node->get('body')->value;
    $new = strtr($value ?? '', $replacements);
    if ($new !== $value) {
      $node->set('body', [
        'value' => $new,
        'format' => $node->get('body')->format,
        'summary' => $node->get('body')->summary,
      ]);
      $dirty = TRUE;
    }
  }

  foreach (['field_portal_link', 'field_support_link', 'field_quick_action_link', 'field_hero_link'] as $field) {
    if (!$node->hasField($field) || $node->get($field)->isEmpty()) {
      continue;
    }
    $item = $node->get($field)->first();
    if (!$item) {
      continue;
    }
    $uri = $item->uri ?? '';
    $new_uri = strtr($uri, $replacements);
    if ($new_uri !== $uri) {
      $values = $item->getValue();
      $values['uri'] = $new_uri;
      $node->set($field, $values);
      $dirty = TRUE;
    }
  }

  if ($dirty) {
    $node->save();
    $changed[] = "node/$nid ({$node->getTitle()})";
  }
}

$block = BlockContent::load(10);
if ($block && $block->hasField('body') && !$block->get('body')->isEmpty()) {
  $value = $block->get('body')->value;
  $new = strtr($value ?? '', $replacements);
  if ($new !== $value) {
    $block->set('body', ['value' => $new, 'format' => $block->get('body')->format]);
    $block->save();
    $changed[] = "block_content/10 ({$block->label()})";
  }
}

echo "Updated:\n";
foreach ($changed as $line) {
  echo "  - $line\n";
}
echo 'Total: ' . count($changed) . "\n";
