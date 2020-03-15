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
  }

  onImageClick = tag => {
    this.setState({ tag })
  }

  onClearImg = () => {
    this.setState({ images: [] })
  }

  onGroupImg = () => {
    this.setState(state => ({ isGrouped: !state.isGrouped }))
  }

  render() {
    const { images, isLoading, isStartGetImg, isGrouped, err } = this.state

    const notice = isStartGetImg ? <p>заполните поле 'тег'</p> : null

    const loading = isLoading ? <p>загрузка...</p> : null

    const error = err ? <p>произошла ошибка</p> : null

    const btnName = isGrouped ? "Разгруппировать" : "Группировать"

    const groupByTag = images => {
      const result = {}

      images.forEach(({ tag, url }) => {
        if (result[tag]) {
          result[tag] = [...result[tag], url]
        } else {
          result[tag] = [url]
        }
      })

      return result
    }

    const tagGroups = groupByTag(images)

    return (
      <div className="app">
        <div className="form">
          <div className="action">
            <input
              onChange={this.onChangeTag}
              value={this.state.tag}
              type="text"
              className="form-control"
              placeholder="введите тег"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onGetImg}
            >
              Загрузить
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onClearImg}
            >
              Очистить
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={this.onGroupImg}
            >
              {btnName}
            </button>
          </div>
          <div className="notice">{notice}</div>
        </div>

        {isGrouped ? (
          <div className="item-tags-wrapper">
            {Object.keys(tagGroups).map(tag => (
              <div className="item-tags">
                <h3 className="item-title">{tag}</h3>
                <div className="item-row">
                  {tagGroups[tag].map(imageUrl => (
                    <div
                      className="item"
                      onClick={() => {
                        this.onImageClick(tag)
                      }}
                    >
                      <img src={imageUrl} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
        {error}
      </div>
    )
  }
}
