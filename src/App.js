import React from "react"
import "./index.css"

import tagService from "./services"

export default class App extends React.Component {
  state = {
    tag: "",
    images: [],
    isStartGetImg: false,
    isLoading: false,
    isGrouped: false,
    isNotFindTag: false,
    err: false
  }

  TagServices = new tagService()

  updataImg = () => {
    const { tag } = this.state
    this.TagServices.getImg(tag)
      .then(this.onImgLoaded)
      .catch(this.onError)
  }

  onChangeTag = e => {
    const tag = e.target.value
    this.setState({ tag })
    console.log(tag)
  }

  render() {
    return (
      <div className="app">
        <div className="form">
          <div className="action">
            <input
              value={this.state.tag}
              type="text"
              className="form-control"
              placeholder="введите тег"
              onChange={this.onChangeTag}
            />
            <button type="button" className="btn btn-primary">
              Загрузить
            </button>

            <button type="button" className="btn btn-danger">
              Очистить
            </button>
            <button type="button" className="btn btn-warning">
              Сгруппировать
            </button>
          </div>
        </div>
      </div>
    )
  }
}
