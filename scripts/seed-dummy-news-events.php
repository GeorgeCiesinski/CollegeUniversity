<?php

/**
 * @file
 * Replace news with placeholder content and create monthly recurring events.
 *
 * Run: ddev drush php:script scripts/seed-dummy-news-events.php
 */

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\node\Entity\Node;
use Drupal\smart_date_recur\Entity\SmartDateRule;

$nids = \Drupal::entityQuery('node')
  ->accessCheck(FALSE)
  ->condition('type', 'news')
  ->condition('status', 1)
  ->sort('created', 'DESC')
  ->execute();

$news_items = [
  [
    'title' => 'System Update Notice',
    'body' => '<p>A scheduled system update is underway. Most services remain available, and any brief interruptions will be noted on the status page.</p>',
  ],
  [
    'title' => 'New Support Resource Available',
    'body' => '<p>We published a new help article covering common account and access questions. Visit the support section to find step-by-step guidance.</p>',
  ],
  [
    'title' => 'Security Reminder for Shared Devices',
    'body' => '<p>Please sign out of shared computers when finished and avoid saving passwords in the browser. Contact support if you notice unusual account activity.</p>',
  ],
  [
    'title' => 'Lab Software Refresh Complete',
    'body' => '<p>Classroom and open lab images have been refreshed with the latest approved applications. Restart your workstation to pick up the updates.</p>',
  ],
  [
    'title' => 'Password Reset Tips',
    'body' => '<p>If you need to reset your password, use the self-service portal and allow a few minutes for changes to apply across campus systems.</p>',
  ],
  [
    'title' => 'Improved Search on the Help Site',
    'body' => '<p>Search results now surface frequently asked questions more clearly. Try a short keyword such as “email”, “wifi”, or “printing”.</p>',
  ],
  [
    'title' => 'Printer Queue Maintenance',
    'body' => '<p>Print queues were cleared after overnight maintenance. Resubmit any jobs that did not complete before the outage window.</p>',
  ],
  [
    'title' => 'Wireless Coverage Improvements',
    'body' => '<p>Additional access points were added in high-traffic study areas. Forget and reconnect to the campus network if your device still shows a weak signal.</p>',
  ],
  [
    'title' => 'New Training Drop-in Hours',
    'body' => '<p>Drop-in technology training sessions are available this term. Bring your device and a short list of questions for one-on-one help.</p>',
  ],
  [
    'title' => 'File Storage Best Practices',
    'body' => '<p>Store working files in approved cloud locations rather than local desktop folders. This keeps backups current and simplifies device replacement.</p>',
  ],
  [
    'title' => 'Service Desk Holiday Hours',
    'body' => '<p>The service desk will operate on a reduced schedule during the upcoming break. Check the hours page for walk-in and phone availability.</p>',
  ],
  [
    'title' => 'Browser Compatibility Update',
    'body' => '<p>Supported browsers now include the current and previous major releases of Chrome, Edge, Firefox, and Safari. Update if you encounter display issues.</p>',
  ],
  [
    'title' => 'Classroom Technology Checklist',
    'body' => '<p>Before presenting, confirm display input, audio volume, and wireless presentation options. Room guides are posted beside each teaching station.</p>',
  ],
  [
    'title' => 'Account Access for New Staff',
    'body' => '<p>New staff accounts are provisioned after HR onboarding is complete. Managers can request shared mailbox or drive access through the service catalog.</p>',
  ],
  [
    'title' => 'Phishing Awareness Reminder',
    'body' => '<p>Be cautious of unexpected messages that ask for credentials or urgent payments. Hover over links and report suspicious messages to the security team.</p>',
  ],
  [
    'title' => 'Software Request Process',
    'body' => '<p>Requests for new instructional software should be submitted at least four weeks before the term starts so licensing and packaging can be completed.</p>',
  ],
  [
    'title' => 'Remote Access Tips',
    'body' => '<p>Use the approved VPN client when connecting from off campus. Disconnect when finished to free licenses for other users.</p>',
  ],
  [
    'title' => 'Accessibility Improvements Online',
    'body' => '<p>Recent content updates improve heading structure and alternative text for images. Feedback on accessibility barriers can be submitted through the contact form.</p>',
  ],
  [
    'title' => 'Device Loan Program Reminder',
    'body' => '<p>Short-term laptop and accessory loans remain available for eligible students. Return devices on time so others can borrow them.</p>',
  ],
  [
    'title' => 'Email Signature Guidelines',
    'body' => '<p>Keep signatures concise and avoid large images or tracked links. A simple name, title, and contact block loads reliably across clients.</p>',
  ],
  [
    'title' => 'Status Page Bookmark',
    'body' => '<p>Bookmark the service status page for planned maintenance notices and current outages. Updates are posted as soon as information is confirmed.</p>',
  ],
];

$i = 0;
foreach ($nids as $nid) {
  $node = Node::load($nid);
  if (!$node) {
    continue;
  }
  $item = $news_items[$i % count($news_items)];
  $node->setTitle($item['title']);
  $node->set('body', [
    'value' => $item['body'],
    'format' => 'full_html',
  ]);
  $node->save();
  echo "Updated news nid {$nid}: {$item['title']}\n";
  $i++;
}
echo "Updated {$i} news nodes.\n";

$tz_name = \Drupal::config('system.date')->get('timezone.default') ?: 'America/Toronto';
$tz = new \DateTimeZone($tz_name);
$month_limit = 6;

// Helper: next occurrence of day-of-month from "now" in site TZ.
$start_of_current_month = new \DateTime('first day of this month 00:00:00', $tz);

$events = [
  [
    'title' => 'Campus Town Hall',
    'tid' => 36,
    'description' => '<p>Join us for a campus-wide update and open Q&amp;A. All community members are welcome.</p>',
    'day' => 1,
    'hour' => 10,
    'minute' => 0,
    'duration' => 60,
  ],
  [
    'title' => 'Open House Preview',
    'tid' => 36,
    'description' => '<p>Preview upcoming open house activities and learn how to get involved as a volunteer.</p>',
    'day' => 15,
    'hour' => 10,
    'minute' => 0,
    'duration' => 60,
  ],
  [
    'title' => 'Innovation Zone Demo Day',
    'tid' => 38,
    'description' => '<p>See student and staff projects on display and try hands-on demos in the Innovation Zone.</p>',
    // First Tuesday of the month approximated as day 1–7 Tuesday; use day 2 then adjust.
    'weekday' => 'first tuesday',
    'hour' => 14,
    'minute' => 0,
    'duration' => 60,
  ],
  [
    'title' => 'Maker Hours',
    'tid' => 38,
    'description' => '<p>Drop in for guided maker space time. Bring a project idea or explore available tools.</p>',
    'weekday' => 'third tuesday',
    'hour' => 14,
    'minute' => 0,
    'duration' => 60,
  ],
  [
    'title' => 'ITS Office Hours',
    'tid' => 37,
    'description' => '<p>Meet technology specialists for short consultations on accounts, devices, and classroom tech.</p>',
    'weekday' => 'second wednesday',
    'hour' => 13,
    'minute' => 0,
    'duration' => 60,
  ],
  [
    'title' => 'ITS Training Drop-in',
    'tid' => 37,
    'description' => '<p>Informal training on everyday tools. Bring your laptop and a list of questions.</p>',
    'weekday' => 'fourth wednesday',
    'hour' => 13,
    'minute' => 0,
    'duration' => 60,
  ],
  [
    'title' => 'Community Meetup',
    'tid' => 39,
    'description' => '<p>An informal meetup to share tips, ask questions, and connect with peers across campus.</p>',
    'weekday' => 'fourth thursday',
    'hour' => 16,
    'minute' => 0,
    'duration' => 60,
  ],
  [
    'title' => 'Guest Speaker Series',
    'tid' => 39,
    'description' => '<p>A short talk from a guest speaker followed by discussion. No registration required.</p>',
    'day' => 20,
    'hour' => 16,
    'minute' => 0,
    'duration' => 60,
  ],
  [
    'title' => 'Operational Excellence Night',
    'tid' => 4,
    'description' => '<p>Planned maintenance window. Some services may be unavailable overnight.</p>',
    'weekday' => 'first saturday',
    'hour' => 18,
    'minute' => 0,
    'duration' => 840,
  ],
  [
    'title' => 'Website Maintenance',
    'tid' => 4,
    'description' => '<p>Scheduled website maintenance. Brief interruptions are possible during this window.</p>',
    'day' => 12,
    'hour' => 22,
    'minute' => 0,
    'duration' => 120,
  ],
];

$created = 0;
foreach ($events as $event) {
  if (!empty($event['weekday'])) {
    $start = new \DateTime($event['weekday'] . ' of this month', $tz);
  }
  else {
    $start = clone $start_of_current_month;
    $start->setDate((int) $start->format('Y'), (int) $start->format('m'), (int) $event['day']);
  }
  $start->setTime($event['hour'], $event['minute'], 0);

  // If this month's occurrence already passed more than a day ago, start next month
  // so the calendar still looks populated going forward.
  $now = new \DateTime('now', $tz);
  if ($start < $now && (int) $now->diff($start)->days > 0) {
    if (!empty($event['weekday'])) {
      $start = new \DateTime($event['weekday'] . ' of next month', $tz);
      $start->setTime($event['hour'], $event['minute'], 0);
    }
    else {
      $start->modify('first day of next month');
      $start->setDate((int) $start->format('Y'), (int) $start->format('m'), (int) $event['day']);
      $start->setTime($event['hour'], $event['minute'], 0);
    }
  }

  $end = clone $start;
  $end->modify('+' . (int) $event['duration'] . ' minutes');

  $start_ts = $start->getTimestamp();
  $end_ts = $end->getTimestamp();

  $values = [
    [
      'value' => $start_ts,
      'end_value' => $end_ts,
      'duration' => (int) $event['duration'],
      'timezone' => $tz_name,
      'repeat' => 'MONTHLY',
      'repeat-end' => '',
      'repeat-end-count' => '',
      'repeat-end-date' => '',
      'interval' => 1,
      'repeat-advanced' => [],
    ],
  ];

  smart_date_recur_generate_rows($values, 'node', 'event', 'field_date', $month_limit);

  $field_values = [];
  foreach ($values as $value) {
    $field_values[] = array_intersect_key($value, array_flip([
      'value',
      'end_value',
      'duration',
      'rrule',
      'rrule_index',
      'timezone',
    ]));
  }

  $node = Node::create([
    'type' => 'event',
    'title' => $event['title'],
    'status' => 1,
    'field_event_type' => ['target_id' => $event['tid']],
    'field_description' => [
      'value' => $event['description'],
      'format' => 'basic_html',
    ],
    'field_date' => $field_values,
  ]);
  $node->save();

  $rrule_id = $field_values[0]['rrule'] ?? NULL;
  $instance_count = count($field_values);
  echo "Created event nid {$node->id()}: {$event['title']} (tid {$event['tid']}, rrule {$rrule_id}, {$instance_count} instances)\n";
  $created++;
}

echo "Created {$created} recurring events.\n";
