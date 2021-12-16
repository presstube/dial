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
let numUnits = 300
// let numUnits = Math.floor(Math.random()*200) + 100

AALib.setAttribute("src", "AA/lib.js")
document.body.appendChild(AALib)
AALib.addEventListener("load", () => {
  let comp=AdobeAn.getComposition("1B1D331872B84B678B30A74AB80E74A9")
  lib=comp.getLibrary()
  kickoff()
}, false)

function kickoff() {
  cjs.Ticker.framerate = 30
  createjs.Ticker.addEventListener("tick", tick)


// let swiper = new Hammer(element, {'recognizers' : [[Hammer.Pan, {direction : Hammer.DIRECTION_NONE}]]});

  window.addEventListener("keydown", e => {
    console.log("KEY: ", e)
    if (e.key == "g") {
    }
  })
  let hammer = new Hammer(document, {
    'recognizers' : 
      [[Hammer.Pan, {
        direction: Hammer.DIRECTION_ALL,
        threshold: 1
      }]]
  })

  hammer.on('panstart', e => {
    currentRot = getAngle(container, e.center)
    updateRot(e)
  })
  hammer.on('panmove', e => {
    updateRot(e)
  })
  hammer.on('panend', e => {
    updateRot(e)
    // console.log("panend: ", dialHand.rotation % 360)
    // dialHand.rotation = dialHand.rotation
    snapToClosestDialUnit()
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
  let angle = Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI
  // console.log("angle: ", angle)
  return angle
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

























