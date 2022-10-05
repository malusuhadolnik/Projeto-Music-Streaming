import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favourite: false,
      // faveSongsList: [],
    };
  }

  // componentDidMount() {
  //   this.getFavesList();
  // }

  // o que handleChange deve fazer: ao clicar na caixa, a música em questão (target) deve ser
  // passada como parâmetro para addSong (requisito 8)
  handleChange = async ({ target: { name, checked } }) => { // a função do onChange deve receber um target
    const { song } = this.props;
    this.setState({ loading: true });

    await addSong(song);

    this.setState(
      {
        loading: false,
        [name]: checked,
      },
      this.getFavesList,
    );
  };

  // requisito 9
  getFavesList = () => {
    // const result = await getFavoriteSongs();
    // const { song } = this.props;
    // const isItFave = result.some((element) => element.trackId === song.trackId);

    const { song, faveSongsList } = this.props;
    const isItFave = faveSongsList
      .some((element) => element.trackId === song.trackId);

    if (isItFave === true) {
      this.setState({
        // faveSongsList: result,
        favourite: true,
      });
    }
  };

  render() {
    const { song } = this.props;
    const { favourite, loading } = this.state;
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
  faveSongsList: PropTypes.shape({
    some: PropTypes.func,
  }).isRequired,
};

export default MusicCard;
