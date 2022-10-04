import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      artistInput: '',
      receivedArtist: '',
      artistInfo: [],
      loading: false,
      receivedAPIresponse: false,
    };
  }

  enableSearchButton = () => {
    const { artistInput } = this.state;
    const two = 2;
    const typedLenght = artistInput.length < two;
    this.setState({ isButtonDisabled: typedLenght });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.enableSearchButton()); // só é executada após estado ser atualizado
  };

  handleClick = async () => {
    const { artistInput } = this.state;
    this.setState({ loading: true });

    const response = await searchAlbumsAPI(artistInput);
    this.setState({
      receivedArtist: artistInput, // necessário um estado para armazenar o que veio do input, pois o input será limpo
      artistInput: '',
      artistInfo: response,
      loading: false,
      receivedAPIresponse: true,
    });
  };

  render() {
    const { artistInput,
      isButtonDisabled,
      loading,
      artistInfo,
      receivedArtist,
      receivedAPIresponse } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <p>Carregando...</p>
          : (
            <form>
              <label htmlFor="name-input">
                <input
                  data-testid="search-artist-input"
                  type="text"
                  value={ artistInput }
                  name="artistInput"
                  onChange={ this.handleChange }
                />
                <button
                  data-testid="search-artist-button"
                  type="button"
                  name="search"
                  disabled={ isButtonDisabled }
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </label>
            </form>
          )}
        { receivedAPIresponse && ( // se receivedAPIresponse = true, executar a condição abiaxo
          <div>
            <p>{ `Resultado de álbuns de: ${receivedArtist}` }</p>
          </div>
        )}

        { artistInfo.length > 0 ? artistInfo.map((album) => (( // se verdadeiro, mapeia os cards. se não, imprime a mensagem de não encontrado
          <li key="album.collectionId" className="card">
            <img src={ album.artworkUrl100 } alt={ album.collectionId } />
            <p>{ album.collectionName }</p>
            <p>{ album.artistName }</p>
            <Link
              to={ `/album/${album.collectionId}` } // a ":id" deve ser o collectionId de cada Álbum da lista
              data-testid={ `link-to-album-${album.collectionId}` } // só passou depois que eu coloquei "album.collectionId"
            >
              Album
            </Link>
          </li>
        ))) : <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}
// Observação: na linha 83, o texto só foi lido quando na forma de template literals, na linha 93 também.
export default Search;
