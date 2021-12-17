"use strict"

/////////////////////////// 
/////////////////////////// 
function fxSample(arr) {
  return arr[Math.floor(fxrand()*arr.length)]
}
///////////////////////////
///////////////////////////

let AALib = document.createElement("script")
let lib
let hammer
let crosshairs
let dialHand
let dialFace
let dialUnits
let currentRot = 0
let lastRot = 0
let faceRadius = 300
let numUnits = 50
let increment = 360 / numUnits
let granAnglePrev = 0
let granAngleCurrent = 0
let granAngleDelta = 0
let line
let units = _.times(numUnits, index => {
  return index * increment
})
// let click = new Pizzicato.Sound({ 
//     source: 'file',
//     options: { 
//       path: './sounds/click3.wav',
//       loop: false }
// }, function() {
//   console.log('sound file loaded: ', );
// })

loadLib()
function loadLib() {
  AALib.setAttribute("src", "AA/lib.js")
  document.body.appendChild(AALib)
  AALib.addEventListener("load", () => {
    let comp=AdobeAn.getComposition("1B1D331872B84B678B30A74AB80E74A9")
    lib=comp.getLibrary()
    kickoff()
  }, false)
}

function kickoff() {
  cjs.Ticker.framerate = 30
  createjs.Ticker.addEventListener("tick", tick)

  window.addEventListener("keydown", e => {
    console.log("KEY: ", e)
    if (e.key == "g") {
    }
  })

  line = new cjs.Shape()
  stage.addChild(line)

  // window.addEventListener("touchstart", e => {
  //   // console.log("ts: ", e)
  //   // console.log("ts: ", e)
  //   let p = new cjs.Point(e.touches[0].clientX, e.touches[0].clientY)
  //   let angle = getAngle(container, p)
  //   granAnglePrev = getGranularAngle(angle, numUnits)
  //   granAngleCurrent = granAnglePrev
  //   line.graphics.clear()
  //   line.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)")
  //   line.graphics.moveTo(container.x, container.y)
  //   line.graphics.lineTo(p.x, p.y)
  //   line.graphics.endStroke()
  // })

  // window.addEventListener("touchmove", e => {
  //   // console.log("tm: ", e.touches[0])
  //   // console.log("co: ", container.y)
  //   let p = new cjs.Point(e.touches[0].clientX, e.touches[0].clientY)
  //   let angle = getAngle(container, p)
  //   granAngleCurrent = getGranularAngle(angle, numUnits)
  //   granAngleDelta = granAngleCurrent - granAnglePrev
  //   if (granAngleDelta !== 0) {
  //     click.play(0,0)
  //     // audio.play()
  //     dialHand.rotation += granAngleDelta
  //   }
  //   granAnglePrev = granAngleCurrent
  //   line.graphics.clear()
  //   line.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)")
  //   line.graphics.moveTo(container.x, container.y)
  //   line.graphics.lineTo(p.x, p.y)
  //   line.graphics.endStroke()
  // })


  let hammer = new Hammer(document, {
    'recognizers' : 
      [[Hammer.Pan, {
        direction: Hammer.DIRECTION_ALL,
        threshold: 1
      }]]
  })

  hammer.on('panstart', e => {
    let p = new cjs.Point(e.changedPointers[0].clientX, e.changedPointers[0].clientY)
    let angle = getAngle(container, p)
    // let angle = getAngle(container, e.center)
    granAnglePrev = getGranularAngle(angle, numUnits)
    granAngleCurrent = granAnglePrev
    line.graphics.clear()
    line.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)")
    line.graphics.moveTo(container.x, container.y)
    line.graphics.lineTo(p.x, p.y)
    line.graphics.endStroke()

  })

  hammer.on('panmove', e => {
    console.log("asdasd: ", e)
    let p = new cjs.Point(e.changedPointers[0].clientX, e.changedPointers[0].clientY)
    let angle = getAngle(container, p)
    // let angle = getAngle(container, e.center)
    granAngleCurrent = getGranularAngle(angle, numUnits)
    granAngleDelta = granAngleCurrent - granAnglePrev
    if (granAngleDelta !== 0) {
      // click.play(0,0)
      dialHand.rotation += granAngleDelta
    }
    granAnglePrev = granAngleCurrent
    line.graphics.clear()
    line.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)")
    line.graphics.moveTo(container.x, container.y)
    line.graphics.lineTo(p.x, p.y)
    line.graphics.endStroke()
  })

  hammer.on('panend', e => {
    // updateRot(e)
    // snapToClosestDialUnit()
  })
  
  crosshairs = new lib.Crosshairs()
  container.addChild(crosshairs)

  dialHand = new lib.DialHand()
  container.addChild(dialHand)

  makeDialUnits(numUnits)

}

function tick(e) {
  stage.update()
}

function getAngle(p1, p2) {
  let angle = (Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI) - 90
  angle = angle < 0 ? 360 + angle : angle
  return angle
}

function getAngleRaw(x1, y1, x2, y2) {
  let angle = (Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI) - 90
  angle = angle < 0 ? 360 + angle : angle
  return angle
}

function getGranularAngle(angle, numUnits) {
  let closest = units.reduce((prev, curr) => {
    return (Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev);
  })
  return closest
}

function updateRot(e) {
  lastRot = currentRot
  currentRot = getAngle(container, e.center)
  let diff = currentRot - lastRot
  // console.log("diff: ", diff, dial)
  dialHand.rotation += diff
}

function makeDialUnits(numUnits) {

  dialFace = new cjs.Container()
  dialUnits = _.times(numUnits, makeDialUnit)
  container.addChild(dialFace)

  function makeDialUnit(index) {
    let degrees = (360 / numUnits) * index
    let point = PTUtils.polarDegrees(faceRadius, degrees)
    let dialUnit = new lib.DialUnit()
    dialUnit.rotation = degrees
    dialUnit.x = point.x
    dialUnit.y = point.y
    dialFace.addChild(dialUnit)
    return dialUnit
    // console.log('point: ', point)
  }
}


function snapToClosestDialUnit() {
  let dialRot = dialHand.rotation % 360
  dialRot = dialRot < 0 ? (360 + dialRot) % 360 : dialRot
  let adjustedDialRot = (numUnits / 360) * dialRot

  let dialUnitsRots = _.map(dialUnits, dialUnit => {
    return dialUnit.rotation
  })

  var closest = dialUnitsRots.reduce((prev, curr) => {
    return (Math.abs(curr - dialRot) < Math.abs(prev - dialRot) ? curr : prev);
  });

  dialHand.rotation = closest
}

























