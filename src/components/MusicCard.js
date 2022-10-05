import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favourite: false,
    };
  }

  // o que handleChange deve fazer: ao clicar na caixa, a música em questão (target) deve ser
  // passada como parâmetro para addSong
  handleChange = async ({ target: { name, checked } }) => { // a função do onChange deve receber um target
    const { song } = this.props;
    this.setState({ loading: true });

    await addSong(song);

    this.setState({
      loading: false,
      [name]: checked,
    });
  };

  render() {
    const { song } = this.props;
    const { loading, favourite } = this.state;
    return (
      <div className="music-card">
        <p>{ song.trackName }</p>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        {loading && <p>Carregando...</p>}

        <label htmlFor="favourites">
          <input
            data-testid={ `checkbox-music-${song.trackId}` }
            id={ song.trackId }
            type="checkbox"
            name="favourite"
            checked={ favourite } // sem o checked a aplicação quebra.foi necessário adicioná-lo ao estado
            onChange={ this.handleChange }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape.isRequired,
};

export default MusicCard;
