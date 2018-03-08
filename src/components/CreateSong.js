import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateSong extends React.Component {
  state = {
    title: '',
    genre: '',
    artist:'',
    releaseYear:'',
  }
  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Create Song</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Title"
            type="text"
            value={this.state.title}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ genre: e.target.value })}
            placeholder="Genre"
            type="text"
            value={this.state.genre}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ artist: e.target.value })}
            placeholder="Artist"
            type="text"
            value={this.state.artist}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ releaseYear: e.target.value })}
            placeholder="Year"
            type="number"
            min="1800" max="2018"
            value={this.state.releaseYear}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.artist &&
            this.state.title &&
            'dim pointer'}`}
            disabled={!this.state.artist || !this.state.title}
            type="submit"
            value="Create"
          />{' '}
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    )
  }
  
  handlePost = async e => {
    e.preventDefault()
    const { title, genre, artist, releaseYear} = this.state
    await this.props.createSongMutation({
      variables: { title, genre, artist, releaseYear},
    })
    
    this.props.history.replace('/songs')
  }
}

const CREATE_SONG_MUTATION = gql`
  mutation createSongMutation($title: String!, $genre: String!, $artist:String!, $releaseYear: Int) {
    createSong(title: $title, genre: $genre, artist: $artist, releaseYear: $releaseYear) {
      id
      title
      genre
      artist
      releaseYear
    }
  }
`

const CreateSongWithMutation = graphql(CREATE_SONG_MUTATION, {
  name: 'createSongMutation', // name of the injected prop: this.props.createSongMutation...
})(CreateSong)

export default withRouter(CreateSongWithMutation)
