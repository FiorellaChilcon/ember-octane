import Component from '@glimmer/component';

export default class LoginFormComponent extends Component {
  onLoginFormSubmit(e) {
    e.preventDefault();
    const { target } = e;
    const val = target.querySelector('select').value;
    console.log(val);
    
  }
}
