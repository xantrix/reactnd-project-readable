import axios from 'axios';

/**
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
const getRandomToken = () => (
  localStorage.token = localStorage.token ? 
                       localStorage.token :
                       Math.random().toString(36).substr(-8)
)

export default axios.create({
  headers: {
    'Accept': 'application/json',
    'Authorization': getRandomToken(),
  }
});