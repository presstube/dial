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

  document.addEventListener("touchstart", e => { handleDialStart(e.touches[0])})
  document.addEventListener("mousedown", handleDialStart)

  function handleDialStart(e) {
    let p = e.touches ? 
      new cjs.Point(e.touches[0].clientX, e.touches[0].clientY) : 
      new cjs.Point(e.clientX, e.clientY)

    let angle = getAngle(container, p)
    granAnglePrev = getGranularAngle(angle, numUnits)
    granAngleCurrent = granAnglePrev
    visDialInteraction(p)
    document.addEventListener("touchmove", handleDialMove)
    document.addEventListener("touchend", handleDialEnd)
    document.addEventListener("mousemove", handleDialMove)
    document.addEventListener("mouseup", handleDialEnd)
  }

  function handleDialMove(e) {
    let p = e.touches ? 
      new cjs.Point(e.touches[0].clientX, e.touches[0].clientY) : 
      new cjs.Point(e.clientX, e.clientY)
    let angle = getAngle(container, p)
    granAngleCurrent = getGranularAngle(angle, numUnits)
    granAngleDelta = granAngleCurrent - granAnglePrev
    if (granAngleDelta !== 0) {
      dialHand.rotation += granAngleDelta
    }
    granAnglePrev = granAngleCurrent
    visDialInteraction(p)
  }

  function handleDialEnd(e) {
    document.removeEventListener("touchmove", handleDialMove)
    document.removeEventListener("touchend", handleDialEnd)
    document.removeEventListener("mousemove", handleDialMove)
    document.removeEventListener("mouseup", handleDialEnd)
  }

  function visDialInteraction(p) {
    line.graphics.clear()
    line.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)")
    line.graphics.moveTo(container.x, container.y)
    line.graphics.lineTo(p.x, p.y)
    line.graphics.endStroke()
  }
  
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

function getGranularAngle(angle, numUnits) {
  let closest = units.reduce((prev, curr) => {
    return (Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev);
  })
  return closest
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
























