import config from '../config'
import axios from './axios'

export const fetchData = async (
  payloadKey,
  payloadType,
  onSuccess,
  onError,
  setLoading,
  options = {}
) => {
  if (setLoading) {
    setLoading(true)
  }

  const section = config.sections[payloadType]

  if (section === undefined || section.url === null) {
    if (setLoading) {
      setLoading(false)
    }

    onError(`payloadType: ${payloadType} is not supported in url`)
    return
  }
  console.log();
  const url = section.url.replace('{{PAYLOAD_KEY}}', payloadKey)
  let params = {}
  for (let key in section) {
    if (key !== 'url') {
      params[key] = options[key] 
      
      if (params[key] === undefined && section[key] !== undefined) {
        params[key] = section[key]
      }
    }
  }
  const { data: {succeeded, result, error} } = await axios.get(url, {
    params: params,
    
  })
  if (setLoading) {
    setLoading(false)
  }

  if (succeeded === true && error === null) {
    onSuccess(result)
  } else {
    onError(error)
  }
}
