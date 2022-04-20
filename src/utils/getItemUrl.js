import config from "../config"

export function getItemUrl(item, itemType = false) {
  console.log(item);
  let type = 'movie'
  if (
    item.type != null &&
    item.type.toLowerCase() === config.itemTypes.Series.toLowerCase()
  ) {
    type = config.itemTypes.Series.toLowerCase()
  }
  let title = item.caption || item.title || item.castName
  if (title) {
    title = title.replace(
      /[^a-zA-Z0-9\u0633\u06A9\u06AF\u06C0\u06CC\u060C\u062A\u062B\u062C\u062D\u062E\u062F\u063A\u064A\u064B\u064C\u064D\u064E\u064F\u067E\u0670\u0686\u0698\u200C\u0621-\u0629\u0630-\u0639\u0641-\u0654]/g,
      '_'
    )
  }
  let link = '/'
  if (itemType === false) {
    link = `/${type}/`
  } else if (itemType === 'Collection') {
    link = `/collection-`
  } else if (itemType === 'Person') {
    link = `/person-`
  }
  let prefix = ''
  if (item.id && itemType === false) {
    link += item.id
    prefix = '-'
  }
  if (item.referenceId && itemType === 'Collection') {
    link += item.referenceId
    prefix = '-'
  }
  if (item.castId && itemType === 'Person') {
    link += item.castId
    prefix = '-'
  }
  if (title) {
    link += `${prefix}${title}`
  }
  return link
}
