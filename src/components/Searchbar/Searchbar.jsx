import { Component } from 'react';
import css from './Searchbar.module.css';
import { IconSearch } from '../../icons/index';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <IconSearch />
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={e => this.setState({ input: e.target.value })}
          />
        </form>
      </header>
    );
  }
}

//input -> onChange -> func onSearchChange( )
