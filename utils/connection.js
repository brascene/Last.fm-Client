
import axios from 'axios'

const connectivity = async () => {
  const axiosConfig = {
    method: 'get',
    url: 'https://www.google.com',
  }
  const res = await axios(axiosConfig)
  return res.status >= 200 && res.status <= 299
}

export default connectivity
