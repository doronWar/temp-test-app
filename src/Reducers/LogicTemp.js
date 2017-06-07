
const data ={
  degreeToScreenratio: 0,
  startingPointCalc: 0,
  isMouseInMovement: false,
  lastPositionWhileMovement:0,
  scrollCounter:0,
  checkForFlick: false,
  // swipeStartTime:0,
  // swipeEndTime:0,
  swipeStartingPoint:0,
  swipeLastTimeStamp:[],
  swipeLastPositionStamp:[],
  flickDegreesToChange:-1,
}

export default function Logictemmp(curent =data, action) {


  switch(action.type){
    case 'SAVE_RATIO':
      return Object.assign({}, curent, {degreeToScreenratio: action.ratio});

    case 'SAVE_MOUSE_START_POINT':
      return Object.assign({}, curent, {startingPointCalc: action.y});

    case 'MOUSE_IS_CLICKED':
      return Object.assign({}, curent, {isMouseInMovement: true});

    case 'MOUSE_IS_NOT_CLICKED':
      return Object.assign({}, curent, {isMouseInMovement: false});

    case 'LAST_POSITION_WHILE_MOVEMENT':
      return Object.assign({}, curent, {lastPositionWhileMovement: action.prevY});

    case 'ADD_TO_SCROLLER':
      return Object.assign({}, curent, {scrollCounter: action.newSum + curent.scrollCounter});

    case 'SUBTRACT_FROM_SCROLLER':
      return Object.assign({}, curent, {scrollCounter: curent.scrollCounter + action.newSum });

    // case 'SAVE_SWIPE_START_TIME':                                   //maybe can erase this
    //   return Object.assign({}, curent, {swipeStartTime: action.time });
    //
    // case 'SAVE_SWIPE_END_TIME':                                   //maybe can erase this
    //   return Object.assign({}, curent, {swipeEndTime: action.time });

    case 'SAVE_SWIPE_START_POINT':
      return Object.assign({}, curent, {swipeStartingPoint: action.y });

    case 'RESET_SWIPE_CALC':                                      //maybe can erase this
      return Object.assign({}, curent, {swipeLastTimeStamp: [], swipeLastPositionStamp:[]});

    case 'START_FLICK_CHECK':
      return Object.assign({}, curent, {checkForFlick: true });

    case 'RESET_FLICK_CHECK':
      return Object.assign({}, curent, {checkForFlick: false });

    case 'SAVE_ARR_TIME_STAMP':
      const timeArr= [...curent.swipeLastTimeStamp];
      timeArr.push(action.time);
      return Object.assign({}, curent, {swipeLastTimeStamp: timeArr});

    case 'SAVE_ARR_POSITION_STAMP':
    const PositionArr= [...curent.swipeLastPositionStamp];
    PositionArr.push(action.y)
    return Object.assign({}, curent, {swipeLastPositionStamp: PositionArr});
    case 'SET_FLICK_DEGREES':
      return Object.assign({}, curent, {flickDegreesToChange: action.num  });
    case 'FLICK_DEGREES_CHANGER':
      return Object.assign({}, curent, {flickDegreesToChange: curent.flickDegreesToChange -1  });
    case 'RESET_FLICK_DEGREES':
      return Object.assign({}, curent, {flickDegreesToChange: -1  });
    default:
      return Object.assign({}, curent);

    // case 'RESET_TIME_STAMP':
    //   return Object.assign({}, curent, {SwipeLastTimestamp: 0 })


  }

  // if( action.type === 'SAVE_RATIO'){
  //   return Object.assign({}, curent, {degreeToScreenratio: action.ratio})
  // }
  //
  // if( action.type === 'SAVE_MOUSE_START_POINT'){
  //
  //   return Object.assign({}, curent, {startingPointCalc: action.y})
  // }




  // return curent
}