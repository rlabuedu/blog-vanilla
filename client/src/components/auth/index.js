import { Component } from 'ms-vanilla';
import Button from '../common/button';
import Input from '../common/input';
import './style.css';

class Auth extends Component {
  setup() {
    const state = { email: '', password: '' };
    if (this.props.login) state.passwordConfirm = '';
    this.state = state;
  }

  markup() {
    const authTitle = this.props.login ? '로그인' : '회원가입';
    return /* html */ `
    <form class="auth-template">
      <h2>${authTitle}</h2>
      <inside class="email"></inside>
      <inside class="password"></inside>
      <div class="margin"></div>
      ${this.props.login ? '' : '<inside class="password-confirm"></inside>'}
      ${
        this.props.login
          ? '<inside class="btn-login">로그인</inside><inside class="go-signup">회원가입</inside>'
          : '<inside class="btn-signup">회원가입</inside><inside class="go-login">로그인</inside>'
      }
    </form>
    `;
  }

  appendComponent(target) {
    const { email, password, passwordConfirm } = this.state;
    const $email = target.querySelector('.email');
    const $password = target.querySelector('.password');
    const $btnLogin = target.querySelector('.btn-login');
    const $goSignup = target.querySelector('.go-signup');
    const $passwordConfirm = target.querySelector('.passwordConfirm');
    const $btnSignup = target.querySelector('.btn-signup');
    const $goLogin = target.querySelector('.go-login');

    new Input($email, { class: 'email', type: 'text', value: email, placeholder: '이메일' });
    new Input($password, { class: 'password', type: 'password', value: password, placeholder: '비밀번호' });

    if (this.props.login) {
      new Button($btnLogin, { class: 'full-width', type: 'submit', text: '로그인' });
      new Button($goSignup, { class: 'full-width', href: '/signup', text: '회원가입 하러 가기' });
    } else {
      new Button($btnSignup, { class: 'full-width', type: 'submit', text: '회원가입' });
      new Button($goLogin, { class: 'full-width', href: '/login', text: '로그인 하러 가기' });
      new Input($passwordConfirm, {
        class: 'password-confirm',
        type: 'password',
        value: passwordConfirm,
        placeholder: '비밀번호 확인',
      });
    }
  }

  setEvent() {
    this.addEvent('input', '.email', ({ target }) => {
      this.setState({ email: target.value });
    });
    this.addEvent('input', '.password', ({ target }) => {
      this.setState({ password: target.value });
    });
    if (!this.props.login) {
      this.addEvent('input', '.passwordConfirm', ({ target }) => {
        this.setState({ passwordConfirm: target.value });
      });
    }

    this.addEvent('submmit', '.auth-template', e => {
      // TODO
    });
  }
}

export default Auth;
