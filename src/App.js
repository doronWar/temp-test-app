import React from 'react';
import {connect} from 'react-redux'


import './App.css';


import Swipe from 'react-easy-swipe';


class App extends React.Component {


  constructor() {
    super();
    this.state = {
      flickerIntervalController: 0,
      flage: true,
      counter:0,
    }
  }

  //
  onSwipeStart(event) {

    this.props.mouseIsClicked();
    this.props.startFlickCheck();
    this.props.resetSwipeCalc();
    this.props.flickPowerToDegree(0)
    this.setState({flage: false});

  }

  onSwipeMove(position, event) {

    if (this.props.shouldCountMouseMovement) {

      this.props.addSwipeTimeStamp(event.timeStamp);
      this.props.addSwipePositionArr(position.y);



      if (this.props.prevMousePotion < position.y && !(Math.floor(Math.abs(position.y)% this.props.ratio))) {


        this.props.tempDownByKey();

      }
      else if (this.props.prevMousePotion > position.y && !(Math.floor(Math.abs(position.y) % this.props.ratio))) {
        this.props.tempUpByKey();

      }

      this.props.mousePrevPosition(position.y);

    }


  }

  onSwipeEnd(event) {

    this.props.mouseIsNotClicked();

    const lenghOfAction = this.props.swipePositionArr.length;
    const halfLenghOfAction = Math.floor(this.props.swipePositionArr.length / 2);
    const firstHalfTime = this.props.swipeTimeArr[halfLenghOfAction] - this.props.swipeTimeArr[0];
    const lastHalfTime = this.props.swipeTimeArr[lenghOfAction - 1] - this.props.swipeTimeArr[halfLenghOfAction];
    
    const firstHalfSpeed = Math.abs((this.props.swipePositionArr[halfLenghOfAction]-this.props.swipePositionArr[0])/firstHalfTime);
    const secondHalfSpeed = Math.abs((this.props.swipePositionArr[lenghOfAction-1]))-Math.abs((this.props.swipePositionArr[halfLenghOfAction])/lastHalfTime);
    const accelaration= 10*(secondHalfSpeed - firstHalfSpeed)/(this.props.swipeTimeArr[lenghOfAction - 1]-this.props.swipeTimeArr[0]);


    if (firstHalfTime > lastHalfTime) {
      this.setState({flage: true});
      const timeDiffrences = Math.floor(firstHalfTime - lastHalfTime);


      if (timeDiffrences < 10) {
        this.props.flickPowerToDegree(2);
      }
      if (timeDiffrences > 10 && timeDiffrences < 25) {
        this.props.flickPowerToDegree(3);
      }
      if (timeDiffrences > 25 && timeDiffrences < 35) {
        this.props.flickPowerToDegree(4);
      }
      else if (timeDiffrences > 35) {
        this.props.flickPowerToDegree(5);
      }


      const flickSpeed = accelaration<7? 300: 200
      this.setState({flickerIntervalController: setInterval(() =>this.counterByFlick(), flickSpeed)});

    }
    else {
      this.props.resetSwipeCalc();
    }


  }


  mouseDown(event) {
    this.props.mouseIsClicked();
    this.props.mouseStartPoint(event.screenY);
    this.props.mousePrevPosition(event.screenY)
  }

  mouseMove(event) {

    if (this.props.shouldCountMouseMovement) {
      if (event.screenY > this.props.prevMousePotion) {
        this.props.mousePrevPosition(event.screenY);

        if (!((this.props.startingPoint - event.screenY) % this.props.ratio)) {
          this.props.tempDownByKey();

        }
      }
      else if (event.screenY < this.props.prevMousePotion) {
        this.props.mousePrevPosition(event.screenY);

        if (!((this.props.startingPoint - event.screenY) % this.props.ratio)) {

          this.props.tempUpByKey();
        }
      }


    }
  }

  mouseUp(event) {
    this.props.mouseIsNotClicked();
  }


  tempByScroll(event) {
    if (event.wheelDelta < 0) {
      this.props.addToScrollerCounter(event.wheelDelta);
      if (this.props.scrollerCounter % 1000) {
        this.props.tempDownByKey();
      }
    }
    else if (event.wheelDelta > 0) {
      this.props.subtractFromScrollerCounter(event.wheelDelta)
      if (this.props.scrollerCounter % 1000) {
        this.props.tempUpByKey();
      }

    }
  }

  changeTemperatureByKey(event) {

    if (event.keyCode === 38) {
      this.props.tempUpByKey();
    }
    if (event.keyCode === 40) {
      this.props.tempDownByKey();
    }
  }

  changeTemperatureByClick(event) {

    if (event.currentTarget.className === 'buttom-click') {
      this.props.tempDownByKey();
    }
    else {
      this.props.tempUpByKey();
    }
  }


  backgroundCreator() {

    const ctx = this.canvasGradient.getContext("2d");
    const lingrad = ctx.createLinearGradient(0, 0, 0, 100);
    const green = 37 - Math.floor(35 - this.props.temp);
    const blue =   Math.floor(35 - this.props.temp) * 2 + 27;
    const red = Math.floor(this.props.temp / 2) + 10;
    lingrad.addColorStop(0, `rgba(${red + 20},${green + 40},${blue + 106},1)`);
    lingrad.addColorStop(0.4, `rgba(${red + 31},${green + 90},${blue + 169},1)`);
    lingrad.addColorStop(0.6, `rgba(${red + 22},${green + 80},${blue + 155},1)`);
    lingrad.addColorStop(1, `rgba(${red + 115},${green + 145},${blue + 185},1)`);

    ctx.fillStyle = lingrad;

    ctx.fillRect(0, 0, 300, 300);


  }

  componentDidMount() {

    this.backgroundCreator();

    let thirdOfTemperaturePosibelMovement = 34;


    if ('ontouchstart' in window) {
      thirdOfTemperaturePosibelMovement = 44;
      const dividBy = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
      this.props.saveRatio(Math.floor(dividBy / thirdOfTemperaturePosibelMovement));
    }
    else {
      window.addEventListener('keydown', (e) => {
        this.changeTemperatureByKey(e)
      });


      window.addEventListener('mousewheel', (e) => this.tempByScroll(e));
      this.props.saveRatio(Math.floor(window.innerHeight / thirdOfTemperaturePosibelMovement));

    }

  }

  componentDidUpdate() {
    this.backgroundCreator();
    if (this.props.degreesToMoveByFlick === 0) {
      clearInterval(this.state.flickerIntervalController);
      this.props.flickDegreeChanger();
    }
  }

  counterByFlick() {


    if (this.props.swipePositionArr[this.props.swipePositionArr.length-1] < 0) {
      this.props.tempUpByKey();
    }
    else {
      this.props.tempDownByKey();
    }
    this.props.flickDegreeChanger();

  }


  render() {


    return (
      <div>

        <Swipe
          onSwipeStart={this.onSwipeStart.bind(this)}
          onSwipeEnd={this.onSwipeEnd.bind(this)}
          onSwipeMove={this.onSwipeMove.bind(this)}>

          <div className="temperature-holder"
               ref={(div) => this.divHolder = div}
               onKeyDown={(event) => this.changeTemperatureByKey(event)}
               onMouseDown={(e) => this.mouseDown(e)}
               onMouseMove={(e) => this.mouseMove(e)}
               onMouseUp={(e) => this.mouseUp(e)}>


            <div className="top-click"
                 onClick={(e) => this.changeTemperatureByClick(e)}
            ><p className="icon-up">^</p></div>

            <p className="temp-output">{this.props.temp}</p>
            <canvas id="tutorial"
                    ref={(canvasGradient) => this.canvasGradient = canvasGradient}/>
            <div className="buttom-click"
                 onClick={(e) => this.changeTemperatureByClick(e)}
            ><p className="icon-down">v</p></div>

          </div>

        </Swipe>


      </div>
    )

  }
}


function mapStateToProps(data) {
  return {
    temp: data.Temp,
    ratio: data.LogicTemp.degreeToScreenratio,
    startingPoint: data.LogicTemp.startingPointCalc,
    shouldCountMouseMovement: data.LogicTemp.isMouseInMovement,
    prevMousePotion: data.LogicTemp.lastPositionWhileMovement,
    scrollerCounter: data.LogicTemp.scrollCounter,
    swipstartingPoint: data.LogicTemp.swipeStartingPoint,
    checkForFlick: data.LogicTemp.checkForFlick,
    swipeTimeArr: data.LogicTemp.swipeLastTimeStamp,
    swipePositionArr: data.LogicTemp.swipeLastPositionStamp,
    degreesToMoveByFlick: data.LogicTemp.flickDegreesToChange,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tempUpByKey(){
      dispatch({
        type: 'UP_BY_KEY'
      })
    },
    tempDownByKey(){
      dispatch({
        type: 'DOWN_BY_KEY'
      })
    },
    saveRatio(ratio){
      dispatch({
        type: 'SAVE_RATIO',
        ratio: ratio,
      })
    },
    mouseStartPoint(y){
      dispatch({
        type: 'SAVE_MOUSE_START_POINT',
        y: y,
      })
    },
    mouseIsClicked(){
      dispatch({
        type: 'MOUSE_IS_CLICKED',
      })
    },
    mouseIsNotClicked(){
      dispatch({
        type: 'MOUSE_IS_NOT_CLICKED',
      })
    },
    mousePrevPosition(prevY){
      dispatch({
        type: 'LAST_POSITION_WHILE_MOVEMENT',
        prevY: prevY,
      })
    },
    addToScrollerCounter(toAdd){
      dispatch({
        type: 'ADD_TO_SCROLLER',
        newSum: toAdd,
      })
    },
    subtractFromScrollerCounter(toSubtract){
      dispatch({
        type: 'SUBTRACT_FROM_SCROLLER',
        newSum: toSubtract,
      })
    },
    saveSwipeStartPoint(point){
      dispatch({
        type: 'SAVE_SWIPE_START_POINT',
        y: point,
      })
    },
    resetSwipeCalc(){
      dispatch({
        type: 'RESET_SWIPE_CALC',

      })
    },
    startFlickCheck(){
      dispatch({
        type: 'START_FLICK_CHECK',

      })
    },
    addSwipeTimeStamp(timeStamp){
      dispatch({
        type: 'SAVE_ARR_TIME_STAMP',
        time: timeStamp,

      })
    },
    addSwipePositionArr(position){
      dispatch({
        type: 'SAVE_ARR_POSITION_STAMP',
        y: position,

      })
    },
    flickPowerToDegree(degree){
      dispatch({
        type: 'SET_FLICK_DEGREES',
        num: degree,
      })
    },
    flickDegreeChanger(){
      dispatch({
        type: 'FLICK_DEGREES_CHANGER',
      })
    },
    resetFlickPowerToDegree(){
      dispatch({
        type: 'RESSET_FLICK_DEGREES',
      })
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

