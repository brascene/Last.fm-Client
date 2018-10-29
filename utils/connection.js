
import axios from 'axios'

const connectivity = async () => {
  const config = {
    method: 'get',
    url: 'https://www.google.com',
  }
  const res = await axios(config)
  return res.status >= 200 && res.status <= 299
}

export default connectivity
