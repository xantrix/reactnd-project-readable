/**
* Order array in ASC/DESC by key
* @param  {Object[]} arr - target array
* @param  {string} order - order (asc or desc) 
* @param  {string} by - key (voteScore | timestamp)
* @return {Object[]} The ordered array
*/

export default (arr, order='asc', by='voteScore') => {
  
  if (order === 'asc') {
    return arr.sort(
      (a, b) => b[by] - a[by]
    );
  } else {
    return arr.sort(
      (a, b) => a[by] - b[by]
    );
  }
  
}