import React, { Component, Fragment } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { listPhotos, updatePhoto, searchZodiac, deletePhoto } from "./api/Photos";
import PhotoDetails from "./components/PhotoDetails";
import TopPageThumbs from "./components/TopPageThumbs";
import SearchField from "./components/SearchField";
import DeleteSwitch from "./components/DeleteSwitch";
import ReactDOM from "react-dom";

class App extends Component {
  state = {
    error: null,
    data: null,
    selectedPhotos: [],
    isSelectMode: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.load();
    }, 50);
  }

  load() {
    listPhotos()
      .then(data => {
        this.setState({ data });
        this.setState({ selectedPhotos: [] });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onClickSave = editedPhotoData => {
    updatePhoto(editedPhotoData.id, editedPhotoData)
      .then(updatedPhoto => {
        this.setState(prevState => {
          const newData = prevState.data.map(m => {
            if (m.id === updatedPhoto.id) {
              alert("data saved.");
              return updatedPhoto;
            } else {
              return m;
            }
          });
          return {
            data: newData
          };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  showEditForm = () => {
    let toggle = document.getElementById("edit-wrapper");
    toggle.className = toggle.className === "hidden" ? "" : "hidden";
  };

  searchImage = e => {
    const amari = Number(e) % 12;

    searchZodiac(amari).then(res => {
      this.setState({ data: res });
    });
  };

  clearSearch = () => {
    this.load();
    if (document.getElementById("search-field")) {
      const searchTerm = document.getElementById("search-field");
      searchTerm.value = "";
    }
  };

  toggleTick = event => {
    const elements = event.target;
    const isChecked = elements.checked;
    const id = elements.value;
    const { selectedPhotos } = this.state;

    if (isChecked) {
      selectedPhotos.push(id);
      this.setState({ selectedPhotos });
    } else {
      const index = selectedPhotos.indexOf(id);
      selectedPhotos.splice(index, 1);
      this.setState({ selectedPhotos });
    }
  };

  selectPhotosToggle = () => {
    const currentState = this.state.isSelectMode;
    const checkboxes = ReactDOM.findDOMNode(this).getElementsByClassName("checkbox");
    this.setState({ isSelectMode: !currentState });

    if (this.state.isSelectMode && this.state.selectedPhotos.length > 0) {
      this.setState({ selectedPhotos: [] });
      Array.from(checkboxes).map(box => {
        box.checked = false;
        return null;
      });
    } else {
      Array.from(checkboxes).map(box => {
        box.checked = false;
        return null;
      });
    }
  };

  deletePhotos = () => {
    let { selectedPhotos } = this.state;
    alert("You can't delete us so easily! Contact admin.");
  };

  render() {
    const { data, error, selectedPhotos, isSelectMode } = this.state;

    return (
      <Router>
        <div className="App">
          <header className=" header">
            <div className="title">
              <h1 onClick={this.clearSearch} className="">
                <Link to="/">12 Zodiac Animals Re-defined!</Link>
              </h1>
              <h5 className="">because No one wants to be a pig.</h5>
            </div>
            <DeleteSwitch
              data={data}
              selectPhotosToggle={this.selectPhotosToggle}
              deletePhotos={this.deletePhotos}
              isSelectMode={isSelectMode}
            />
          </header>
          {/* load error message */}
          {error && <h2 id="error">{error.message}</h2>}
          {/* Main */}
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Fragment>
                  <SearchField searchImage={this.searchImage} clearSearch={this.clearSearch} />
                  <div className="tools" />
                  {data && data.length === 1 ? <p className="center">You are...</p> : ""}
                  <TopPageThumbs
                    data={data}
                    selectedPhotos={selectedPhotos}
                    toggleTick={this.toggleTick}
                    deletePhotos={this.deletePhotos}
                    isSelectMode={isSelectMode}
                  />
                </Fragment>
              )}
            />

            {/* Show individual photo */}
            {data &&
              data.map(data => {
                return (
                  <Route
                    key={data.id}
                    path={`/${data.id}`}
                    exact
                    render={() => (
                      <Fragment>
                        <PhotoDetails
                          data={data}
                          onClickSave={this.onClickSave}
                          showEditForm={this.showEditForm}
                        />
                      </Fragment>
                    )}
                  />
                );
              })}
          </Switch>
          <div className="github">
            <a href='https://github.com/okichan/react-zodiac-redifined'>
              <svg
                viewBox="0 0 256 250"
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M128 0a128 128 0 0 0-40 249c6 2 8-2 8-6v-24c-36 8-43-15-43-15-6-14-14-18-14-18-12-8 1-8 1-8 12 1 19 13 19 13 12 20 30 14 38 11 1-9 4-14 8-17-29-4-59-15-59-64 0-14 5-25 14-34-2-3-6-16 1-34 0 0 11-3 35 13a123 123 0 0 1 64 0c24-16 35-13 35-13 7 18 3 31 1 34 9 9 14 20 14 34 0 49-30 60-59 63 5 4 9 12 9 24v35c0 4 2 8 9 6A128 128 0 0 0 128 0zM48 182l-2 1-1-2 2-1 1 2zm6 6l-2-1-1-2h3v3zm5 7c-1 1-3 0-3-1v-3c1-1 2 0 3 1v3zm7 8h-3c-2-1-2-3-1-3h3l1 3zm9 3c0 1-1 2-3 1l-2-2c0-1 2-2 3-1 2 0 3 1 2 2zm11 1c0 2-1 2-3 2l-2-1c0-2 1-2 2-2l3 1zm11 0c0 1-1 2-3 2-1 1-3 0-3-1s1-2 3-2c1-1 2 0 3 1z"
                  fill="dimgray"
                />
              </svg>
            </a>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
