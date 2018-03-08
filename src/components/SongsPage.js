import React from 'react'
import Song from '../components/Song'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SongsPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.songsQuery.refetch()
    }
  }
  
  render() {
    if (this.props.songsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }
    
    return (
      <React.Fragment>
        <h1>Songs</h1>
        {this.props.songsQuery.songs &&
        this.props.songsQuery.songs.map(song => (
          <Song
            key={song.id}
            song={song}
            refresh={() => this.props.songsQuery.refetch()}
            
          />
        ))}
        {this.props.children}
      </React.Fragment>
    )
  }
}

const SONGS_QUERY = gql`
  query SongsQuery {
    songs{
      id
      title
      genre
     artist
     releaseYear
    }
  }
`

export default graphql(SONGS_QUERY, {
  name: 'songsQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(SongsPage)
