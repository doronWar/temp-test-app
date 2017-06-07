

export default function Temp(curent =20, action) {


  if(action.type===  'UP_BY_KEY'){
    if(curent<35){
      return curent +1
    }
    else return curent

  }
  if(action.type===  'DOWN_BY_KEY'){
    if(curent>15){
      return curent -1
    }
    else return curent


  }




  return curent
}