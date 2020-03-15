import React from "react"
import "./index.css"

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
