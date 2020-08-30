import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginFormComponent extends Component {
  /**
   * @type {AuthService}
   */
  @service auth;

  @tracked userId = null;

  get isDisabled() {
  return !this.userId;
  }

  @action
  onSelectChanged(e) {
    this.userId = e.target.value;
  }
  @action
  onLoginFormSubmit(e) {
    e.preventDefault();
    const { target } = e;
    const val = target.querySelector('select').value;
    // context issue @action is neccesary
    this.auth.loginWithUserId(val);
  }
}
