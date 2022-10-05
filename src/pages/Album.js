import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumSongs: [],
      albumData: {},
      faveSongsList: [],
    };
  }

  componentDidMount() {
    this.getAlbumSongs();
    this.fetchFavourite();
  }

  getAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const songs = response.filter((song) => song.kind === 'song'); // quando filtrei pela chave "wrapperType" não deu certo! Mas esta funcionou
    this.setState({
      albumSongs: songs,
      albumData: response[0],
    });
  };

  fetchFavourite = async () => {
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      faveSongsList: result,
    });
  };

  render() {
    const { albumSongs, albumData, loading, faveSongsList } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ albumData.artistName }</h2>
        <h3 data-testid="album-name">
          {`${albumData.artistName} - ${albumData.collectionName}`}
        </h3>
        <div>
          { albumSongs.map((song) => (
            <li key={ song.trackId }>
              <MusicCard
                song={ song }
                faveSongsList={ faveSongsList }
              />
            </li>
          ))}
        </div>
        {loading && <p>Carregando...</p>}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
