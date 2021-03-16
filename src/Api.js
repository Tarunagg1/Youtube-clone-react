import axios from 'axios'

console.log(process.env.REACT_APP_YT_API_KEY)
const request = axios.create({
   baseURL: 'https://youtube.googleapis.com/youtube/v3/',
   params: {
      // key: 'AIzaSyCOoquLockIxYZVE5nreKPDMDbVTh6KT-U',
      key:'AIzaSyD_dPTG91ERhuB8UXjIWic4pJw6PvLoMg8'
   },
})

export default request