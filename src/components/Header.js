import React from 'react';
import { Link } from 'react-router-dom';
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
        <div>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        </div>
        <div>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        </div>
        <div>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
        { loading ? <p>Carregando...</p>
          : (
            <p data-testid="header-user-name">{ loginName }</p>
          )}
      </header>
    );
  }
}

export default Header;
