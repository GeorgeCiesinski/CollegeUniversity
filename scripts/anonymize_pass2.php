<?php

/**
 * @file
 * Anonymize remaining college-identifying content (pass 2).
 *
 * Run: ddev drush php:script scripts/anonymize_pass2.php
 */

use Drupal\block_content\Entity\BlockContent;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

$replacements = [
  // Phones.
  'tel:416-822-8888' => 'tel:123-456-7890',
  '416-822-8888' => '123-456-7890',
  'tel:416-675-6622' => 'tel:123-456-7890',
  '416-675-6622' => '123-456-7890',

  // Affiliate naming.
  'University of Guelph-College' => 'Partner University',
  'Guelph-College University' => 'Partner University',
  'Guelph-College' => 'Partner Campus',
  'guelph-college' => 'partner-campus',

  // Campus naming (order matters: longer phrases first).
  'Lakeshore Campus' => 'Campus B',
  'North Campus' => 'Campus A',
  'Lakeshore Commons' => 'Campus B Commons',
  'Lakeshore' => 'Campus B',

  // Room / printer codes.
  'H106-N-P1' => 'A101',
  'R100-L-P1' => 'B201',

  // URLs / social / forms.
  'https://www.guelphcollege.ca/current-students/academic-campus-technology-services-acts/wireless-internet' => 'https://example.com/partner-wifi',
  'https://collegecollege.formstack.com/forms/teams_voice' => 'https://forms.example.com/teams-voice',
  'https://college.onthehub.com/WebStore/Welcome.aspx' => 'https://onthehub.example.com',
  'https://www.youtube.com/@CollegeITCS' => 'https://example.com/social/youtube',
  'https://www.youtube.com/@CollegeIT' => 'https://example.com/social/youtube',
  'https://x.com/college_its' => 'https://example.com/social/x',
  'https://www.instagram.com/collegeits/  ' => 'https://example.com/social/instagram',
  'https://www.instagram.com/collegeits/' => 'https://example.com/social/instagram',
  'https://www.youtube.com/playlist?list=PLr4kdjwu3P1OVa8e_TgIZmuOUT7CgTASW' => 'https://example.com/teams-voice-playlist',
  'https://www.youtube.com/watch?v=Ad4EhwKqSoQ&amp;list=PLr4kdjwu3P1OVa8e_TgIZmuOUT7CgTASW' => 'https://example.com/teams-voice-playlist',
  'https://www.youtube.com/watch?v=Ad4EhwKqSoQ&list=PLr4kdjwu3P1OVa8e_TgIZmuOUT7CgTASW' => 'https://example.com/teams-voice-playlist',
];

// Polytechnic AI statement URL path fragment → full example URL when matched in href.
$polytechnic_href_pattern = '#https?://[^"\']*integrating-ai-build-brilliance-polytechnic-education[^"\']*#i';

$node_ids = [
  51, 58, 71, 82, 87, 91, 100, 101, 105, 131, 138, 140, 141, 142,
  148, 149, 158, 216, 221, 226, 239, 246, 251, 252, 260, 263,
];

$changed = [];

function apply_replacements(string $text, array $replacements, string $poly_pattern): string {
  $text = strtr($text, $replacements);
  $text = preg_replace($poly_pattern, 'https://example.com/ai-statement', $text) ?? $text;
  // Strip Mitel Humber chat bootstrapper if present.
  $text = preg_replace(
    '#<script[^>]*>[\s\S]*?webchat\.mitel\.io[\s\S]*?</script>#i',
    '',
    $text
  ) ?? $text;
  return $text;
}

foreach ($node_ids as $nid) {
  $node = Node::load($nid);
  if (!$node) {
    echo "Skip missing node $nid\n";
    continue;
  }

  $dirty = FALSE;

  // Title renames for orientation events.
  if ($nid === 251 && $node->getTitle() === 'Lakeshore Campus Orientation') {
    $node->setTitle('Campus B Orientation');
    $dirty = TRUE;
  }
  if ($nid === 252 && $node->getTitle() === 'North Campus Orientation') {
    $node->setTitle('Campus A Orientation');
    $dirty = TRUE;
  }

  if ($node->hasField('body') && !$node->get('body')->isEmpty()) {
    $value = $node->get('body')->value;
    $format = $node->get('body')->format;
    $summary = $node->get('body')->summary;
    $new = apply_replacements($value ?? '', $replacements, $polytechnic_href_pattern);
    if ($new !== $value) {
      $node->set('body', [
        'value' => $new,
        'format' => $format,
        'summary' => $summary,
      ]);
      $dirty = TRUE;
    }
  }

  // Portal / support / quick-action / hero link URI fields.
  foreach (['field_portal_link', 'field_support_link', 'field_quick_action_link', 'field_hero_link'] as $field) {
    if (!$node->hasField($field) || $node->get($field)->isEmpty()) {
      continue;
    }
    $item = $node->get($field)->first();
    if (!$item) {
      continue;
    }
    $uri = $item->uri ?? '';
    $new_uri = apply_replacements($uri, $replacements, $polytechnic_href_pattern);
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

// Blocks: Corporate Footer (3), Social Media (8).
foreach ([3, 8] as $bid) {
  $block = BlockContent::load($bid);
  if (!$block || !$block->hasField('body') || $block->get('body')->isEmpty()) {
    continue;
  }
  $value = $block->get('body')->value;
  $format = $block->get('body')->format;
  $new = apply_replacements($value ?? '', $replacements, $polytechnic_href_pattern);
  if ($new !== $value) {
    $block->set('body', ['value' => $new, 'format' => $format]);
    $block->save();
    $changed[] = "block_content/$bid ({$block->label()})";
  }
}

// Taxonomy.
$term_updates = [
  32 => 'Graduate Campus (Campus C)',
  136 => 'Grad Campus',
];
foreach ($term_updates as $tid => $name) {
  $term = Term::load($tid);
  if (!$term) {
    continue;
  }
  if ($term->getName() !== $name) {
    $term->setName($name);
    $term->save();
    $changed[] = "taxonomy_term/$tid → $name";
  }
}

echo "Updated:\n";
foreach ($changed as $line) {
  echo "  - $line\n";
}
echo 'Total: ' . count($changed) . "\n";
