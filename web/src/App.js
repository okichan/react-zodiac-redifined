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
    enteredWord: "",
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
    alert("No you can't delete us!")
  };

  render() {
    const { data, error, selectedPhotos, isSelectMode } = this.state;

    return (
      <Router>
        <div className="App">
          <header className="header">
            <Link to="/">
              <h1 className="h1 text-center" onClick={this.clearSearch}>12 Zodiac Animals Re-defined!</h1>
              <h5>Becuase who wants to be rats and snakes!?</h5>
            </Link>
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
                  <div className="tools">
                    <SearchField
                      enteredWord={this.enteredWord}
                      searchImage={this.searchImage}
                      enteredWordHandler={this.enteredWordHandler}
                      clearSearch={this.clearSearch}
                    />
                    <DeleteSwitch
                      data={data}
                      selectPhotosToggle={this.selectPhotosToggle}
                      deletePhotos={this.deletePhotos}
                      isSelectMode={isSelectMode}
                    />
                  </div>
                  <h3 className="center">
                  { data && data.length === 1 ? "you are..." : "" }
                  </h3>
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
        </div>
      </Router>
    );
  }
}

export default App;
