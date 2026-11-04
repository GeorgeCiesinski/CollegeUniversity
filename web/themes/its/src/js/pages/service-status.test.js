import { beforeEach, describe, expect, it } from 'vitest';
import './service-status.js';

describe('serviceStatusBehavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="views-field-field-status"><div class="field-content">Operational</div></div>
      <div class="views-field-field-status"><div class="field-content">Partial Outage</div></div>
      <div class="views-field-field-status"><div class="field-content">Maintenance</div></div>
      <div class="views-field-field-status"><div class="field-content">Critical</div></div>
    `;
    Drupal.behaviors.serviceStatusBehavior.attach(document, {});
  });

  it('inserts an icon class for each known status', () => {
    expect(document.querySelector('.icon-operational')).not.toBeNull();
    expect(document.querySelector('.icon-partial')).not.toBeNull();
    expect(document.querySelector('.icon-maintenance')).not.toBeNull();
    expect(document.querySelector('.icon-critical')).not.toBeNull();
    expect(document.querySelector('.icon-operational').textContent).toBe('check');
    expect(document.querySelector('.icon-critical').textContent).toBe('cancel');
  });
});
