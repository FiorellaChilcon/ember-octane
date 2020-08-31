import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export const ALL_TEAMS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    order: 2,
    iconUrl: '/assets/img/linkedin.png',
  },
  {
    id: 'ms',
    name: 'Microsoft',
    order: 3,
    iconUrl: '/assets/img/microsoft.png',
  },
  {
    id: 'avengers',
    name: 'Avengers',
    order: 4,
    iconUrl: '/assets/img/avengers.jpg',
  },
  {
    id: 'angrycat',
    name: 'Angry Cat',
    order: 5,
    iconUrl: '/assets/img/angry-cat.jpg',
  },
];

// user will be kicked out of teams view if It's not logged in
export default class TeamsRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth;
  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (!this.auth.currentUserId) {
      this.transitionTo('login');
    }
  }
  // model hook retrieve data
  async model() {
    return ALL_TEAMS;
  }
}
