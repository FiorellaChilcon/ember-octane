import Service from '@ember/service';
import { inject as service } from '@ember/service';
// import Router from '@ember/routing/router';


const AUTH_KEY = 'shalk-userid';

export default class AuthService extends Service {
  @service router;
  get currentUserId() {
    return window.localStorage.getItem(AUTH_KEY);
  }

  loginWithUserId(userid) {
    window.localStorage.setItem(AUTH_KEY, userid);
    this.router.transitionTo('teams');
  }


}
