"use strict"

/////////////////////////// 
/////////////////////////// 
function fxSample(arr) {
  return arr[Math.floor(fxrand()*arr.length)]
}
///////////////////////////
///////////////////////////

let AALoaderLib = document.createElement("script")
let AALib = document.createElement("script")
let loaderLib
let lib
let loader
let lemonPrincessType
let objkts
let hammer
let crosshairs
let dialHand
let dialFace
let dialUnits
let currentRot = 0
let lastRot = 0
let faceRadius = 330
let dialInnerRadius = 0
let dialOuterRadius = 330
let numUnits = 300
let increment = 360 / numUnits
let granAnglePrev = 0
let granAngleCurrent = 0
let granAngleDelta = 0
let granAngleOffset = 0
let dialRotation = 0
let line
let bgRect
let currentColorScheme
let currentBGColor
let darkMode = true
let iteration
let dialInterval
let units = _.times(numUnits, index => {
  return index * increment
})

let colorschemes = [

  ["590d22","800f2f","a4133c","c9184a","ff4d6d","ff758f","d2fd35","ffccd5","fff0f3"],
  ["d8f3dc","b7e4c7","ff0a50","74c69d","52b788","40916c","2d6a4f","1b4332","081c15"],
  ["007f5f","2b9348","55a630","80b918","aacc00","bfd200","eb4833","eeef20","ffff3f"],
  ["0d1f2d","546a7b","9ea3b0","fae1df","e4c3ad","6d2e46","ffe74c","ff5964","f9db6d"],
  ["bbe1c3","a7cdbd","869d7a","91785d","8b5d33","433e0e","e0b0d5","ffa552","ba5624"],
  ["9a8f97","c3baba","e9e3e6","b2b2b2","736f72","a30b37","40bcd8","355070","49beaa"],
  ["985f99","9684a1","aaacb0","b6c9bb","bfedc1","2d0320","0d160b","5c1a1b","5c573e"],
  ["ffd9da","ea638c","89023e","30343f","1b2021","93b7be","798071","623cea","16302b"],
  ["247ba0","70c1b3","b2dbbf","f3ffbd","ff1654","30362f","625834","da7422","8b2635"],
  ["0e0004","31081f","6b0f1a","b91372","fa198b","b7ad99","ff4365","00d9c0","fffff3"],
  ["7cfef0","6bffb8","2ceaa3","28965a","2a6041","090909","4b5043","a40e4c","2c2c54"],
  ["104f55","32746d","9ec5ab","01200f","011502","885053","fe5f55","23022e","ffa69e"],
  ["78c0e0","449dd1","192bc2","150578","0e0e52","6eeb83","e4ff1a","ffb800","ff5714"],
  ["2d2a32","ddd92a","eae151","eeefa8","fafdf6","cc2936","6b818c","eee5e9","c7e8f3"],
  ["4d5057","4e6e5d","4da167","3bc14a","cfcfcf","ed1c24","fdfffc","f1d302","f2e2d2"],

  ["331832","d81e5b","f0544f","c6d8d3","fdf0d5"],
  ["1b2f33","28502e","47682c","8c7051","ef3054"],
  ["ea526f","070600","f7f7ff","23b5d3","279af1"],
  ["07020d","5db7de","f1e9db","a39b8b","716a5c"],
  ["5c415d","694966","74526c","dbd053","c89933"],
  ["c4bbaf","a5978b","5c4742","8d5b4c","5a2a27"],
  ["fbc2b5","ffa8a9","f786aa","a14a76","cdb2ab"],
  ["d8e2dc","ffffff","ffcad4","f4acb7","9d8189"],
]


loadLoaderLib()

function loadLoaderLib() {
  AALoaderLib.setAttribute("src", "AA/loader.js")
  document.body.appendChild(AALoaderLib)
  AALoaderLib.addEventListener("load", () => {
    let comp = AdobeAn.getComposition("6E551C23227A4C0691433EE6D5852D40")
    loaderLib = comp.getLibrary()

    // console.log("loaded loader lib")

    kickoffLoader()

  }, false)
}

function loadLib() {
  AALib.setAttribute("src", "AA/lib.js")
  document.body.appendChild(AALib)
  AALib.addEventListener("load", () => {
    let comp=AdobeAn.getComposition("1B1D331872B84B678B30A74AB80E74A9")
    lib=comp.getLibrary()
    loadData()
  }, false)
}

function loadData() {
  fetch("scripts/dillsack-data.json")
    .then(response => response.json())
    .then(json => {
      objkts = json.data.generativeToken.entireCollection
      objkts = _.sortBy(objkts, 'iteration')
      // console.log("KAKAK", json.data.generativeToken.entireCollection)
      _.delay(kickoffMain, 1000)
      // kickoff()
    })
}

function kickoffLoader() {
  cjs.Ticker.framerate = 30
  createjs.Ticker.addEventListener("tick", tick)

  bgRect = new cjs.Shape()
  container.addChild(bgRect)
  // colorBG('#0000FF')

  loader = new loaderLib.PTLogoSigilsSmall()
  container.addChild(loader)

  loadLib()
}

function colorBG(color) {
  bgRect.graphics.clear()
  bgRect.graphics.beginFill(color).drawRect(-5000, -5000, 10000, 10000)
}


function posPT() {
  let margin = 60
  loader.x = ((stage.width / 2) / scaler) - (margin/scaler)
  loader.y = (-(stage.height / 2) / scaler) + (margin/scaler)
  loader.scaleX = loader.scaleY = 0.5 / scaler
  loader.gotoAndStop(0)
}

function posLemonPrincessType() {
  // let margin = 80
  lemonPrincessType.x = (-(stage.width / 2) / scaler) + (120/scaler)
  lemonPrincessType.y = (-(stage.height / 2) / scaler) + (50/scaler)
  lemonPrincessType.scaleX = lemonPrincessType.scaleY = 0.5 / scaler
  // lemonPrincessType.gotoAndStop(0)
}


function kickoffMain() {

  posPT()

  window.addEventListener("keydown", e => {
    // console.log("KEY: ", e)
    if (e.key == "g") {
    }
  })

  line = new cjs.Shape()
  stage.addChild(line)


  makeDialUnits(objkts)
  // dialHand = new lib.DialHand()
  dialHand = new cjs.Shape()
  dialHand.graphics.setStrokeStyle(1).beginStroke("rgba(255,255,255,1)")
  dialHand.graphics.moveTo(0, -dialInnerRadius)
  dialHand.graphics.lineTo(0, -dialOuterRadius)
  // dialHand.graphics.endStroke()
  dialFace.addChild(dialHand)
  // dialFace.alpha = 0

  crosshairs = new lib.Crosshairs()
  dialFace.addChild(crosshairs)

  lemonPrincessType = new lib.LemonPrincessType()
  container.addChild(lemonPrincessType)
  posLemonPrincessType()


  document.addEventListener("touchstart", e => { handleDialStart(e.touches[0])})
  document.addEventListener("mousedown", handleDialStart)

  // loadIteration(1)
  startPrincess(1)

  function handleDialStart(e) {
    // click.play(0,0)
    cjs.Tween.get(dialFace, {override:true})
      // .wait(500)
      .to({alpha: 1}, tweenDuration, tweenEaseOut)
    
    let p = e.touches ? 
      new cjs.Point(e.touches[0].clientX, e.touches[0].clientY) : 
      new cjs.Point(e.clientX, e.clientY)

    let angle = getAngle(container, p)
    
    // granAnglePrev = getGranularAngle(angle, numUnits)
    // granAngleCurrent = granAnglePrev  

    // granAnglePrev = getGranularAngle(angle, numUnits)
    granAngleCurrent = getGranularAngle(angle, numUnits)
    granAngleOffset = granAngleCurrent - dialRotation


    // visDialInteraction(p)
    document.addEventListener("touchmove", handleDialMove)
    document.addEventListener("touchend", handleDialEnd)
    document.addEventListener("mousemove", handleDialMove)
    document.addEventListener("mouseup", handleDialEnd)
    destroyCurrentPrincess()
  }

  function handleDialMove(e) {
    let p = e.touches ? 
      new cjs.Point(e.touches[0].clientX, e.touches[0].clientY) : 
      new cjs.Point(e.clientX, e.clientY)
    let angle = getAngle(container, p)
    granAngleCurrent = getGranularAngle(angle, numUnits)
    granAngleDelta = granAngleCurrent - granAnglePrev
    if (granAngleDelta !== 0) {
      // click.play(0,0)
      // dialRotation += granAngleDelta
      dialRotation = granAngleCurrent - granAngleOffset
      let rawIteration = Math.round((dialRotation % 360)/increment) + 1
      iteration = rawIteration < 1 ? numUnits + rawIteration : rawIteration 
      loadIteration(iteration)
      dialHand.rotation = dialRotation
      loader.gotoAndStop(Math.abs(iteration-1 % loader.totalFrames))
      
      // clearTimeout(dialInterval)
      // dialInterval = setTimeout(e => {
      //   startPrincess(iteration)
      // }, 200)

      // let toStep = granAngleDelta < 0 ? -1 : 1
      // stepLoader(toStep)
      // loader.gotoAndStop(_.random(loader.totalFrames))
      // cjs.Tween.get(dialHand, {override:true}).to({rotation: dialRotation}, 100, cjs.Ease.quadOut)
    }
    granAnglePrev = granAngleCurrent
    // visDialInteraction(p)
  }

  function handleDialEnd(e) {
    cjs.Tween.get(dialFace, {override:true})
      // .wait(500)
      .to({alpha: 0}, tweenDuration, tweenEaseOut)
    document.removeEventListener("touchmove", handleDialMove)
    document.removeEventListener("touchend", handleDialEnd)
    document.removeEventListener("mousemove", handleDialMove)
    document.removeEventListener("mouseup", handleDialEnd)
    startPrincess(iteration)
  }

  function visDialInteraction(p) {
    line.graphics.clear()
    line.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)")
    line.graphics.moveTo(container.x, container.y)
    line.graphics.lineTo(p.x, p.y)
    line.graphics.endStroke()
  }

}

function tick(e) {
  stage.update()
}

function loadIteration(iteration) {
  // should be sanitizing this before it comes in
  iteration = iteration < 1 ? numUnits + iteration : iteration 
  // console.log('iter: ', iteration)
  let fxhash = _.result(_.find(objkts, function(objkt) {
    return objkt.iteration == iteration;
  }), 'generationHash');
  bootFXHash(fxhash)
  currentColorScheme = fxSample(colorschemes)
  currentBGColor = fxSample(currentColorScheme)
  colorBG("#" + currentBGColor)
  let currentLightOrDark = lightOrDark(currentBGColor)
  if (currentLightOrDark == "dark" && !darkMode || currentLightOrDark == "light" && darkMode) {
    setDarkMode(!darkMode)
  }
  // console.log('lightOrDark', lightOrDark(currentBGColor))
  let displayNum = iteration.toString()
  displayNum = displayNum.length == 1 ? "00" + displayNum : displayNum
  displayNum = displayNum.length == 2 ? "0" + displayNum : displayNum
  // console.log("displayNum: ", displayNum.length)
  document.getElementById('overlay').innerHTML = '<p class="hash">' + fxhash + '</p>' + '<p class="num">' + displayNum + '/' + numUnits + '</p>'
  // document.getElementById('overlayhash').innerHTML = '<p>' + fxhash + '</p>'
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

function makeDialUnits(objkts) {

  let numUnits = objkts.length

  dialFace = new cjs.Container()
  dialUnits = _.times(numUnits, makeDialUnit)
  container.addChild(dialFace)

  function makeDialUnit(index) {
    let objktData = objkts[index]
    let degrees = (360 / numUnits) * (index)
    let point = PTUtils.polarDegrees(faceRadius, degrees)

    bootFXHash(objktData.generationHash)
    currentColorScheme = fxSample(colorschemes)
    currentBGColor = fxSample(currentColorScheme)

    // let dialUnit = new lib.DialUnit()
    let dialUnit = new cjs.Shape()
    dialUnit.graphics.setStrokeStyle(8).beginStroke("#" + currentBGColor)
    dialUnit.graphics.moveTo(0, 0)
    dialUnit.graphics.lineTo(0, -20)
    dialUnit.rotation = degrees
    dialUnit.x = point.x
    dialUnit.y = point.y
    dialFace.addChild(dialUnit)
    return dialUnit
  }
}

function stepLoader(steps) {
  // console.log('tostep: ', steps)
  let nextFrame = loader.currentFrame + steps
  nextFrame = nextFrame < 0 ? loader.totalFrames - 1 : nextFrame
  nextFrame = nextFrame > loader.totalFrames ? 0 : nextFrame
  loader.gotoAndStop(nextFrame)
}



let oldResize = window.onresize
window.onresize = e => {
  // console.log("new resize")
  oldResize(e)
  posPT()
  posLemonPrincessType()
}


function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
    // if (hsp > 140) {

        return 'light';
    } 
    else {

        return 'dark';
    }
}

function setDarkMode(isDark) {
  darkMode = isDark
  if (isDark) {
    document.getElementById("overlay").style.color = "#EEEEEE"
    simpleRecolor(lemonPrincessType, "#EEEEEE")
    simpleRecolor(loader, "#EEEEEE")
    simpleRecolor(crosshairs, "#EEEEEE")
    dialHand.graphics._stroke.style = "#EEEEEE"
  } else {
    document.getElementById("overlay").style.color = "#000033"
    simpleRecolor(lemonPrincessType, "#000033")
    simpleRecolor(loader, "#000033")
    simpleRecolor(crosshairs, "#000033")
    dialHand.graphics._stroke.style = "#000033"
  }
}

// wretched
function simpleRecolor(item, color) { 
  let currentFrame = item.currentFrame
  let paused = item.paused
  _.times(item.totalFrames, frameIndex => {
    item.gotoAndStop(frameIndex)
    _.times(item.children.length, childIndex => {
      if (item.children[childIndex].graphics._stroke) {
        item.children[childIndex].graphics._stroke.style = color
      }
    })
  })
  item.gotoAndStop(currentFrame)
  if (item.paused) item.play()
}



////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

let items
let secItems
let princessItems = []
let maxItems = 5
let minItems = 5
let numItems
let color
let nestedColor
let assetID
let secAssetID
let xMoveRange = 150 
let yMoveRange = 150
let xMoveRangeSec = 300 
let yMoveRangeSec = 300
let tweenWaitMax = 500
let tweenDuration = 300
let tweenEaseIn = cjs.Ease.quintInOut
let tweenEaseOut = cjs.Ease.quintInOut
// let rotationRateMax = 0.5
let rate = 1

let primaryAssetData = [
  {name: "Pulsor0", playhead: "pingpong", fill: true, stroke:true},
  {name: "BugmaAnchor", playhead: "pingpong", fill: true, stroke:true},
  {name: "Pulsor0", playhead: "pingpong", fill: true, stroke:true},
  {name: "Looper0", playhead: "loop", fill: true, stroke:true},
  {name: "Constellation0", playhead: "loop", fill: false, stroke:true, pureStrokes:false},
  {name: "Looper2", playhead: "loop", fill: true, stroke:false},
  {name: "Looper3", playhead: "loop", fill: true, stroke:false},
  {name: "Hairy0", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Features0", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Constellation1", playhead: "loop", fill: false, stroke:true, pureStrokes:false},
]

let secondaryAssetData = [
  {name: "Sakkaya0", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Sakkaya1", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Sakkaya2", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya3", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya5", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya6", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya7", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya8", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya10", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya11", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya12", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya13", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya14", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya15", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya16", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  // {name: "Sakkaya17", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
]

function startPrincess(iteration) {
  // console.log('starting princess:', iteration)
  
  // destroyCurrentPrincess()

  
  // booting fxhash
  let fxhash = _.result(_.find(objkts, function(objkt) {
    return objkt.iteration == iteration;
  }), 'generationHash');
  bootFXHash(fxhash)
  // setting up color scheme, choosing bg color, painting bg
  currentColorScheme = fxSample(colorschemes)
  currentBGColor = fxSample(currentColorScheme)
  colorBG("#" + currentBGColor)

  // setting initial values - comes after color so that color can be first thing easily for interface
  numItems = Math.floor(fxrand() * maxItems) + minItems
  assetID = Math.floor(fxrand() * primaryAssetData.length)
  secAssetID = Math.floor(fxrand() * secondaryAssetData.length)

  // painting UI as dark or light mode
  let currentLightOrDark = lightOrDark(currentBGColor)
  if (currentLightOrDark == "dark" && !darkMode || currentLightOrDark == "light" && darkMode) {
    setDarkMode(!darkMode)
  }

  // rendering hash & edition #s
  let displayNum = iteration.toString()
  displayNum = displayNum.length == 1 ? "00" + displayNum : displayNum
  displayNum = displayNum.length == 2 ? "0" + displayNum : displayNum
  // console.log("displayNum: ", displayNum.length)
  document.getElementById('overlay').innerHTML = '<p class="hash">' + fxhash + '</p>' + '<p class="num">' + displayNum + '/' + numUnits + '</p>'

  spawnNewPrincess()

}

function destroyCurrentPrincess() {
  // console.log('destroying current princess')
  _.map(items, destroyPrincessItem)
  _.map(secItems, destroyPrincessItem)
  items = []
  secItems = []
}

function destroyPrincessItem(item) {
  // cjs.Tween.get(item, {override:true})
  //   .wait(Math.random() * tweenWaitMax)
  //   .to({scaleX: 0, scaleY: 0}, tweenDuration, tweenEaseIn)
  //   .call(e => {
  //     container.removeChild(item)
  //     item.removeEventListener('tick')
  //     // console.log("removed: ", item)
  //   })

  container.removeChild(item)
  item.removeEventListener('tick')
}

function spawnNewPrincess() {
  color = "#" + fxSample(currentColorScheme)
  nestedColor = "#" + fxSample(currentColorScheme)
  items = _.times(numItems, makePulsor)
  secItems = _.times(numItems, makeSegundo)
}

function makePulsor(index) {

  if (fxrand() < 0.4) { // deciding whether to switch asset or not
    assetID = Math.floor(fxrand() * primaryAssetData.length)
  }

  let itemData = primaryAssetData[assetID]
  // let itemData = assetData[1]

  let item = new lib[itemData.name]()

  recolor(item, itemData, color)

  // let tempColor = color 
  // tempColor = pSBC(colorShiftAmount, tempColor)
  // let strokeColor = pSBC(-0.4, tempColor)
  // if (itemData.fill) recolorFill(item, tempColor)
  // if (itemData.stroke) {
  //   recolorStroke(item, strokeColor)
  //   setStrokeWidth(item, 2)
  // }

  // here is where synchrony would come it
  item.gotoAndStop(Math.floor(fxrand() * item.totalFrames))

  let forward = true

  // let rotationRate = fxrand() * rotationRateMax - fxrand() * rotationRateMax

  if (itemData.playhead == "pingpong") {
    item.addEventListener('tick', e => {
      if (forward) {
        item.gotoAndStop(item.currentFrame + rate)
      } else {
        item.gotoAndStop(item.currentFrame - rate)
      }
      if (item.currentFrame >= item.totalFrames - rate && forward) {
        forward = false
      } else if (item.currentFrame <= 0 && !forward) {
        forward = true
      }
      // item.rotation += rotationRate
    })
  } else {
    item.play()
  }

  item.x = fxrand() * xMoveRange - fxrand() * xMoveRange
  item.y = fxrand() * yMoveRange - fxrand() * yMoveRange
  // arrPosX += fxrand() * xMoveRange - fxrand() * xMoveRange
  // xMoveRange -= xMoveRangeIncrement
  // arrPosY -= 20
  let targetScaleX = fxrand() < 0.4 ? 1 : -1
  item.scaleX = item.scaleY = 0
  cjs.Tween.get(item, {override:true})
    .wait(Math.random() * tweenWaitMax)
    .to({scaleX: targetScaleX, scaleY: 1}, tweenDuration, tweenEaseIn)
  // item.scaleX = fxrand() < 0.4 ? 1 : -1
  // yPos += 20
  item.rotation = fxrand() * 360

  // let color = "#00ff00"
  // let color = "#00ff00"
  container.addChildAt(item, 1)

  if (item.anchor1) {
    console.log("anchor found ")
    makeNested(item)
  } 

  function makeNested() {
    let nestedItemData = fxSample(primaryAssetData)
    // let nestedItemData = secondaryAssetData[2]
    let nestedItem = new lib[nestedItemData.name]()
    nestedItem.scaleX = nestedItem.scaleY = 0.5
    let nestedItemForward = true

    recolor(nestedItem, nestedItemData, nestedColor, 2)
    nestedItem.gotoAndStop(Math.floor(fxrand() * item.totalFrames))
    if (itemData.playhead == "pingpong") {
      nestedItem.addEventListener('tick', e => {
        if (nestedItemForward) {
          nestedItem.gotoAndStop(nestedItem.currentFrame + rate)
        } else {
          nestedItem.gotoAndStop(nestedItem.currentFrame - rate)
        }
        if (nestedItem.currentFrame >= nestedItem.totalFrames - rate && nestedItemForward) {
          nestedItemForward = false
        } else if (nestedItem.currentFrame <= 0 && !nestedItemForward) {
          nestedItemForward = true
        }
        // nestedItem.rotation += rotationRate
      })
    } else {
      nestedItem.play()
    }
    item.anchor1.addChild(nestedItem)
  }

  return item


}

function makeSegundo(index) {
  if (fxrand() < 0.4) {
    secAssetID = Math.floor(fxrand() * secondaryAssetData.length)
  }
  console.log("secAssetID: ", secAssetID)
  let itemData = secondaryAssetData[secAssetID]
  let item = new lib[itemData.name]()
  recolor(item, itemData, color)
  item.play()
  item.x = fxrand() * xMoveRangeSec - fxrand() * xMoveRangeSec
  item.y = fxrand() * yMoveRangeSec - fxrand() * yMoveRangeSec
  let targetScaleX = fxrand() < 0.4 ? 1 : -1
  item.scaleX = item.scaleY = 0
  cjs.Tween.get(item, {override:true})
    .wait(Math.random() * tweenWaitMax)
    .to({scaleX: targetScaleX, scaleY: 1}, tweenDuration, tweenEaseIn)
  item.rotation = fxrand()*360
  container.addChildAt(item, Math.floor(fxrand()*container.children.length))
  return item
}


function recolor(item, itemData, color, depth) {
  depth = !depth ? 1 : depth
  let tempColor = color 
  let colorShiftRange = 5
  let colorShiftAmount = fxrand()/colorShiftRange - fxrand()/colorShiftRange
  tempColor = pSBC(colorShiftAmount, tempColor)
  let strokeColor = pSBC(-0.4, tempColor)
  if (itemData.fill) recolorFill(item, tempColor)
  if (itemData.stroke) {
    recolorStroke(item, strokeColor, itemData.pureStrokes)
    setStrokeWidth(item, 2 * depth, itemData.pureStrokes)
  }
}

function recolorFill(item, color) {
  _.times(item.totalFrames, frameIndex => {
    item.gotoAndStop(frameIndex) 
    item.children[0].graphics._fill.style = color
  })
}

function recolorStroke(item, color, pure) {
  if (pure) {
    _.times(item.children.length, childIndex => {
      _.times(item.totalFrames, frameIndex => {
        item.gotoAndStop(frameIndex) 
        item.children[childIndex].graphics._stroke.style = color
      })
    })
  } else {
    _.times(item.totalFrames, frameIndex => {
      item.gotoAndStop(frameIndex) 
      item.children[1].graphics._stroke.style = color
    })
  }
  // console.log("chasdoij", item.children)

}

function setStrokeWidth(item, width, pure) {
  // _.times(item.totalFrames, frameIndex => {
  //   item.gotoAndStop(frameIndex) 
  //   item.children[1].graphics._strokeStyle.width = width
  // })

  if (pure) {
    _.times(item.children.length, childIndex => {
      _.times(item.totalFrames, frameIndex => {
        item.gotoAndStop(frameIndex)
        item.children[childIndex].graphics._strokeStyle.width = width
      })
    })
  } else {
    _.times(item.totalFrames, frameIndex => {
      item.gotoAndStop(frameIndex) 
      item.children[1].graphics._strokeStyle.width = width
    })
  }
}








