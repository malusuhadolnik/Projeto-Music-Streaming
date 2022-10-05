import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumSongs: [],
      albumData: {},
    };
  }

  componentDidMount() {
    this.getAlbumSongs();
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

  render() {
    const { albumSongs, albumData } = this.state;

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
              <MusicCard song={ song } />
            </li>
          ))}
        </div>
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
