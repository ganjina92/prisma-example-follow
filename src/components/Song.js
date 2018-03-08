import React , { Component } from 'react'

export default class extends Component {
  render () {
    const song = this.props.song
    return (
      <div>
        <h5>{song.title}</h5>
        <ul>
          <li>{song.genre}</li>
          <li>{song.artist}</li>
          <li>{song.releaseYear}</li>
        </ul>
      </div>
    );
  }
}
