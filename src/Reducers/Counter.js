

export default function Counter(curent =0, action) {

  if(action.type=== 'ADD'){
    return curent+1
  }
  if(action.type=== 'REMOVE'){
    return curent-1
  }

  return curent
}