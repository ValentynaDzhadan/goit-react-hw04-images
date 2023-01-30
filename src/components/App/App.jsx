import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';

import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
  };

  changeQuery = newQuery => {
    this.setState({ query: newQuery });
  };
  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.changeQuery}></Searchbar>
        <ImageGallery query={this.state.query}></ImageGallery>
      </div>
    );
  }
}
