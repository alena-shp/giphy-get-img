import React from 'react'
import './index.css'

import tagService from './services'
import ImgItem from './ImgItem'

export default class App extends React.Component {
  state = {
    tag: '',
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
    if (!url) {
      this.setState({ isNotFindTag: true })
      return
    }
    return this.setState(state => {
      return {
        images: [
          ...state.images,
          {
            tag: state.tag,
            url: url,
            id: Date.now().toString()
          }
        ],
        isLoading: false,
        tag: ''
      }
    })
  }

  onError = err => {
    this.setState({ err: true, isLoading: false })
  }

  onChangeTag = e => {
    const tag = e.target.value
    this.setState({ tag, isStartGetImg: false })
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
    const {
      images,
      isLoading,
      isStartGetImg,
      isGrouped,
      isNotFindTag,
      err
    } = this.state

    const notice = isStartGetImg ? <p>заполните поле 'тег'</p> : null

    const loading = isLoading ? <p>загрузка...</p> : null

    const error = err && <p className="text-err">произошла ошибка</p>

    const btnName = isGrouped ? 'Разгруппировать' : 'Группировать'

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

    const connect = isNotFindTag ? (
      <p>По тегу ничего не найдено</p>
    ) : (
      <ImgItem
        images={images}
        isGrouped={isGrouped}
        tagGroups={tagGroups}
        loading={loading}
        onImageClick={this.onImageClick}
      />
    )

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

        {connect}
        {error}
      </div>
    )
  }
}
