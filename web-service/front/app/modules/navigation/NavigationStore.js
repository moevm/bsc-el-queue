import * as R from 'ramda'
import * as qs from 'qs'

export default class NavigationStore {
  constructor(history) {
    this.history = history
  }

  get queryParams() {
    return this.history.location.search |> R.tail |> qs.parse
  }

  goToPage = (path) => {
    this.history.push(path)
  }
}
