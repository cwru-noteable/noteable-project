class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    alert('Username: ' + this.state.username + '\nPassword: ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </label>
        <input
          type="submit"
          value="Log in"
        />
      </form>

    );
  }
}

class RegisterButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>Register</button>
    );
  }

  handleClick() {
    alert('Going to Registration Now!');
    /* TODO: go to registration! */
  }
}

class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-page">
        <div className="login-form">
          <LoginForm />
        </div>
        <div className="register-button">
          <RegisterButton />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <LoginPage />,
  document.getElementById('root')
);
