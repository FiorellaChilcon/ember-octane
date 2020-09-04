import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router';
import { action } from '@ember/object';
import CookiesService from 'ember-cookies/services/cookies';

const AUTH_KEY = 'shalk-userid';

export default class AuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;
  /**
   * @type {CookiesService}
   */
  @service cookies;

  get currentUserId() {
    // return window.localStorage.getItem(AUTH_KEY);
    return this.cookies.read(AUTH_KEY);
  }

  loginWithUserId(userid) {
    // window.localStorage.setItem(AUTH_KEY, userid);
    this.cookies.write(AUTH_KEY, userid);
    this.router.transitionTo('teams');
  }
  @action
  logout() {
    // window.localStorage.removeItem(AUTH_KEY);
    this.cookies.write(AUTH_KEY, null);
    this.router.transitionTo('login');
  }
}
