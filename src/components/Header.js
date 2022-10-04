import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      loginName: '',
    };
  }

  componentDidMount() {
    this.requestUserName();
  }

  requestUserName = async () => {
    const response = await getUser(); // ATENÇÂO! Retorna um objeto, cuja chave que queremos é name
    console.log(response);

    this.setState({
      loading: false,
      loginName: response.name,
    });
  };

  render() {
    const { loading, loginName } = this.state;

    return (
      <header data-testid="header-component">
        { loading ? <p>Carregando...</p>
          : (
            <p data-testid="header-user-name">{ loginName }</p>
          )}
      </header>
    );
  }
}

export default Header;
