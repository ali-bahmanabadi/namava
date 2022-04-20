import ExclusiveDubItem from "../components/ExclusiveDubItem/ExclusiveDubItem"
import MovieItem from "../components/MovieItem/MovieItem"
import config from "../config"

export const getNamavaUrl = (url) => {
  return `https://www.namava.ir${url}`
}

export const getItemComponent = (payloadType) =>  {
  switch (payloadType) {
    case config.pageItemsType.PostGroup:
    case config.pageItemsType.Latest:
    case config.pageItemsType.LatestEpisods:
    case config.pageItemsType.CategoryGroup:
      return MovieItem
    case config.pageItemsType.ExclusiveDubs:
      return ExclusiveDubItem
    default:
      return undefined
  
}
}