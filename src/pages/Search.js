import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      artistInput: '',
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

  render() {
    const { artistInput, isButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
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
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
