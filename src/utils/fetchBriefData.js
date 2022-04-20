import config from '../config'
import axios from './axios'

export const fetchBriefData = async (id, onSuccess, onError, setLoading) => {
  if (setLoading) setLoading(true)

  const section = config.sections.BriefData

  if (section === undefined || section.url === null) {
    if (setLoading) {
      setLoading(false)
    }

    onError(`payloadType: briefData is not supported in url`)
    return
  }
  console.log()
  const url = section.url.replace('{{ID}}', id)
  const {data: { succeeded, result, error }} = await axios.get(url)
  if (setLoading) {
    setLoading(false)
  }

  if (succeeded === true && error === null) {
    onSuccess(result)
  } else {
    onError(error)
  }
}
