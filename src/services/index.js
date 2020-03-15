export default class tagService {
  _nameUrl = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag'
  getAnswer = async url => {
    const res = await fetch(`${this._nameUrl}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }

  getImg = async tag => {
    const body = await this.getAnswer(`=${tag}`)
    const url = body.data.image_url
    return url
  }
}
