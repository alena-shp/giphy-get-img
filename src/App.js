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

  onGetImg = () => {
    if (!this.state.tag) {
      this.setState({ isStartGetImg: true })
      return
    }
    this.setState({ isLoading: true })
    this.updataImg()
  }

  updataImg = () => {
    const { tag } = this.state
    this.TagServices.getImg(tag)
      .then(this.onImgLoaded)
      .catch(this.onError)
  }

  onImgLoaded = url => {
    return this.setState(state => {
      return {
        images: [
          ...state.images,
          {
            tag: state.tag,
            url: url,
            id: url
          }
        ],
        isLoading: false,
        tag: ""
      }
    })
  }

  onError = err => {
    this.setState({ err: true, isLoading: false })
  }

  onChangeTag = e => {
    const tag = e.target.value
    this.setState({ tag })
    console.log(tag)
  }

  onImageClick = tag => {
    this.setState({ tag })
  }

  render() {
    const { isLoading } = this.state

    const loading = isLoading ? <p>загрузка...</p> : null

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
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onGetImg}
            >
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

        <div className="images">
          {this.state.images.map(img => (
            <div
              className="item"
              key={img.id}
              onClick={() => {
                this.onImageClick(img.tag)
              }}
            >
              <img src={img.url} alt="" />
            </div>
          ))}
          {loading}
        </div>
      </div>
    )
  }
}
