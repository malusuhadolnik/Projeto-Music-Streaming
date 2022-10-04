import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      loginName: '',
      loading: false,
    };
  }

  enableSubmitButton = () => {
    const { loginName } = this.state;
    const three = 3;
    const typedLenght = loginName.length < three;
    this.setState({ isButtonDisabled: typedLenght });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.enableSubmitButton());
  };

  handleClick = async () => {
    const { loginName } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });

    await createUser({ name: loginName });
    history.push('/search'); // dica da Lígia Bicalho. O history é uma prop nativa que armazena caminhos

    this.setState({
      loading: false,
    });
  };

  render() {
    const { loginName, isButtonDisabled, loading } = this.state;

    return (
      <div data-testid="page-login">
        {
          loading ? <p>Carregando...</p>
            : (
              <label htmlFor="name-input">
                <input
                  data-testid="login-name-input"
                  type="text"
                  value={ loginName }
                  name="loginName"
                  onChange={ this.handleChange }
                />
                <button
                  data-testid="login-submit-button"
                  type="button"
                  name="submit"
                  disabled={ isButtonDisabled }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </label>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
