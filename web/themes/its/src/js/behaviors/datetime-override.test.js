import { beforeEach, describe, expect, it } from 'vitest';
import './datetime-override.js';

describe('datetimeLocalOverride', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input name="field_date_and_time_value[min]" type="date" />
      <input name="field_date_and_time_value[max]" type="date" />
      <input name="other" type="date" />
    `;
    Drupal.behaviors.datetimeLocalOverride.attach(document, {});
  });

  it('sets matching min/max inputs to datetime-local', () => {
    expect(document.querySelector('[name="field_date_and_time_value[min]"]').type).toBe(
      'datetime-local',
    );
    expect(document.querySelector('[name="field_date_and_time_value[max]"]').type).toBe(
      'datetime-local',
    );
    expect(document.querySelector('[name="other"]').type).toBe('date');
  });
});
