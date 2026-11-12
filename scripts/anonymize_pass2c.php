<?php

/**
 * @file
 * Fix remaining North-campus shorthand and Blackboard title.
 *
 * Run: ddev drush php:script scripts/anonymize_pass2c.php
 */

use Drupal\node\Entity\Node;

$replacements = [
  'the North and Campus B' => 'Campus A and Campus B',
  'Ex. North (Xerox Print Centre)' => 'Ex. Campus A (Xerox Print Centre)',
  '<strong>North: </strong>' => '<strong>Campus A: </strong>',
  '<h2>North</h2>' => '<h2>Campus A</h2>',
  '<h3>North</h3>' => '<h3>Campus A</h3>',
];

$changed = [];

foreach ([51, 91, 100] as $nid) {
  $node = Node::load($nid);
  if (!$node || !$node->hasField('body') || $node->get('body')->isEmpty()) {
    continue;
  }
  $value = $node->get('body')->value;
  $new = strtr($value ?? '', $replacements);
  if ($new !== $value) {
    $node->set('body', [
      'value' => $new,
      'format' => $node->get('body')->format,
      'summary' => $node->get('body')->summary,
    ]);
    $node->save();
    $changed[] = "node/$nid body";
  }
}

$node = Node::load(38);
if ($node && $node->getTitle() === 'Blackboard') {
  $node->setTitle('LMS');
  $node->save();
  $changed[] = 'node/38 title → LMS';
}

echo "Updated:\n";
foreach ($changed as $line) {
  echo "  - $line\n";
}
echo 'Total: ' . count($changed) . "\n";
