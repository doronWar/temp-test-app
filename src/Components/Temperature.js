import React from 'react';
import { connect } from 'react-redux'



class Temperature extends React.Component{



  changeTemperatureByKey(event){

console.info(event.keyCode);
    if(event.keyCode === 38){
      this.props.tempUpByKey();
    }
    if(event.keyCode === 40){
      this.props.tempDownByKey();
    }
  }


  mouseDown(event){
    const isTouchSupported = 'ontouchstart' in window;
    console.info(isTouchSupported)
    console.info('mouse cordinations', event.screenY);
    console.info(this.divHolder.clientHeight);
  }

  mouseMove(event){
    console.info('mouse move', event.screenY);
  }

  componentDidMount(){
    const test = document.querySelector('html');
    test.addEventListener('keydown', (e)=>{this.changeTemperatureByKey(e)})
  }


  mouseAndSwipLogic(location){
    if (this.props.shouldCountMouseMovement) {
      if (location > this.props.prevMousePotion) {
        this.props.mousePrevPosition(location);

        if (!((this.props.startingPoint - location) % this.props.ratio)) {
          this.props.tempDownByKey();

        }
      }
      else if (location < this.props.prevMousePotion) {
        this.props.mousePrevPosition(location);

        if (!((this.props.startingPoint - location) % this.props.ratio)) {

          this.props.tempUpByKey();
        }
      }


    }
  }
//
//
// <Swipe
// onSwipeStart={this.onSwipeStart.bind(this)}
// onSwipeMove={this.onSwipeMove.bind(this)}
// onSwipeEnd={this.onSwipeEnd.bind(this)}>


                                //privious auto flick couter system:
  // for (let i=0; i< degreeToChange; i++) {
  //     console.info(this.props.shouldCountMouseMovement);
  //   if(i===0){
  //     if(this.props.swipePositionArr[0]<0){
  //       setTimeout(()=>this.props.tempUpByKey(),350)
  //     }
  //     else{
  //       setTimeout(()=>this.props.tempDownByKey(),350)
  //     }
  //   }
  //   else{
  //     if(this.props.swipePositionArr[0]<0){
  //       setTimeout(()=>this.props.tempUpByKey(),350*i)
  //     }
  //     else{
  //       setTimeout(()=>this.props.tempDownByKey(),350*i)
  //     }
  //
  //   }
  // // if(this.props.shouldCountMouseMovement){
  // //   console.info('check');
  // // }
  //
  // }




                  //endSwup left overes:

  // const firstHalfSpeed=    (this.props.swipeTimeArr[halfLenghOfAction]-this.props.swipeTimeArr[0])/(Math.abs(this.props.swipePositionArr[halfLenghOfAction])- Math.abs(this.props.swipePositionArr[0]))
  // const lastHalfSpeed=  (this.props.swipeTimeArr[lenghOfAction-1]-this.props.swipeTimeArr[halfLenghOfAction])/ (Math.abs(this.props.swipePositionArr[lenghOfAction-1])- Math.abs(this.props.swipePositionArr[halfLenghOfAction]))
  // console.info(this.props.swipeTimeArr[halfLenghOfAction]-this.props.swipeTimeArr[0]);
  // console.info(this.props.swipeTimeArr[lenghOfAction-1]-this.props.swipeTimeArr[halfLenghOfAction]);
  // console.info(this.props.swipeTimeArr[lenghOfAction-1]-this.props.swipeTimeArr[0]);

  // console.info('starting speed: 0');
  // console.info('middle point speed:', firstHalfSpeed);
  // console.info('end speed:', lastHalfSpeed );
  // console.info('accelaration', (lastHalfSpeed-firstHalfSpeed)/(this.props.swipeTimeArr[lenghOfAction-1]-this.props.swipeTimeArr[0]));

  //

  //
  //
  // console.info( 'first half speed', firstHalfSpeed);
  // console.info( 'last half speed', lastHalfSpeed);




  // console.log('swiping...', this.props.swipstartingPoint, this.props.swipStartTime, this.props.prevMousePotion, this.props.swipEndTime);
  // console.info('time:', this.props.swipEndTime-this.props.swipStartTime, 'distance:',Math.abs(this.props.prevMousePotion)-Math.abs(this.props.swipstartingPoint));

  // console.info('speed',(this.props.swipEndTime-this.props.swipStartTime)/ (Math.abs(this.props.prevMousePotion)-Math.abs(this.props.swipstartingPoint)));

  // console.info(this.props.swipeTimeArr);
  // console.info(this.props.swipePositionArr);
  // console.log('End swiping...', event);




  //swip start:

  //   this.props.mouseIsClicked();
  //   // this.props.mouseStartPoint(event.screenY);
  //   // this.props.mousePrevPosition(event.screenY)
  //
  //   // console.log('Start swiping...', event);
  //   // const isTouchSupported = 'ontouchstart' in window;
  //   // console.info(isTouchSupported)




  // componentDidMount() {
  //   const diviedHightByThirdOfTemperature=44
  //   this.props.saveRatio(Math.floor(window.innerHeight / diviedHightByThirdOfTemperature));
  //   //const htmlBody = document.querySelector('html');
  //   if ('ontouchstart' in window) {
  //   }
  //   else {
  //
  //     window.addEventListener('keydown', (e) => {
  //       this.changeTemperatureByKey(e)
  //     })
  //
  //   }
  //
  //
  // }

mouseMove(event) {
    this.mouseAndSwipLogic(event.screenY)
    // if (this.props.shouldCountMouseMovement) {
    //   if (event.screenY > this.props.prevMousePotion) {
    //     this.props.mousePrevPosition(event.screenY);
    //
    //     if (!((this.props.startingPoint - event.screenY) % this.props.ratio)) {
    //       this.props.tempDownByKey();
    //
    //     }
    //   }
    //   else if (event.screenY < this.props.prevMousePotion) {
    //     this.props.mousePrevPosition(event.screenY);
    //
    //     if (!((this.props.startingPoint - event.screenY) % this.props.ratio)) {
    //
    //       this.props.tempUpByKey();
    //     }
    //   }
    //
    //
    // }

  }

  render(){
    return(

      <div className="temp"
      onClick={(event)=> this.changeTemperatureByKey(event)}
           onMouseDown={(e)=> this.mouseDown(e)}
           onMouseMove={(e)=>this.mouseMove(e)}
           ref={(div)=> this.divHolder = div}
           tabIndex="1"

      >


        <p className="temp-output">{this.props.temp}</p>

      </div>

    )
  }
}

function mapStateToProps(data){
  return{
    temp: data.Temp,
  }
}

function mapDispatchToProps(dispatch){
  return{
    tempUpByKey(){
      dispatch({
        type:'UP_BY_KEY'
      })
    },
    tempDownByKey(){
      dispatch({
        type:'DOWN_BY_KEY'
      })
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Temperature)