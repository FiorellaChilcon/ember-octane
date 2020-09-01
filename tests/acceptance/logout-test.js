import { module, test } from 'qunit';
import { visit, currentURL, click, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import MockAuthService from '../stubs/auth-service';

module('Acceptance | logging out', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    // owner = app itself
    this.owner.register('service:auth', MockAuthService);
  });

  test('visiting /teams and clicking logout ', async function (assert) {
    // accesing the instance of the service
    this.owner.lookup('service:auth').currentUserId = '1';
    await visit('/teams/linkedin');
    // await pauseTest(); // It's like debugger, if you dont want to import it youcan call it like: this.pauseTest();
    assert.ok(currentURL().startsWith('/teams'));
    // await pauseTest();
    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');
  });
});
