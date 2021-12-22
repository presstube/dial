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
let faceRadius = 500
let dialInnerRadius = 10
let dialOuterRadius = 490
let numUnits = 300
let increment = 360 / numUnits
let granAnglePrev = 0
let granAngleCurrent = 0
let granAngleDelta = 0
let dialRotation = 0
let line
let bgRect
let currentColorScheme
let currentBGColor
let darkMode = true
let units = _.times(numUnits, index => {
  return index * increment
})

// let click = new Pizzicato.Sound({ 
//     source: 'file',
//     options: { 
//       path: './sounds/click3.wav',
//       loop: false }
// }, function() {
  console.log('sound file loaded: ', );
// })

let colorschemes = [
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
  // console.log("colorBG: ", clearig)
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


  makeDialUnits(numUnits)
  // dialHand = new lib.DialHand()
  dialHand = new cjs.Shape()  
  dialHand.graphics.setStrokeStyle(1).beginStroke("rgba(255,255,255,1)")
  dialHand.graphics.moveTo(0, -dialInnerRadius)
  dialHand.graphics.lineTo(0, -dialOuterRadius)
  dialHand.graphics.endStroke()
  dialFace.addChild(dialHand)
  // dialFace.alpha = 0

  crosshairs = new lib.Crosshairs()
  dialFace.addChild(crosshairs)

  lemonPrincessType = new lib.LemonPrincessType()
  container.addChild(lemonPrincessType)
  posLemonPrincessType()


  document.addEventListener("touchstart", e => { handleDialStart(e.touches[0])})
  document.addEventListener("mousedown", handleDialStart)

  loadIteration(1)

  function handleDialStart(e) {
    // click.play(0,0)
    cjs.Tween.get(dialFace, {override:true}).to({alpha: 1}, 100, cjs.Ease.quadIn)
    
    let p = e.touches ? 
      new cjs.Point(e.touches[0].clientX, e.touches[0].clientY) : 
      new cjs.Point(e.clientX, e.clientY)

    let angle = getAngle(container, p)
    granAnglePrev = getGranularAngle(angle, numUnits)
    granAngleCurrent = granAnglePrev
    // visDialInteraction(p)
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
      // click.play(0,0)
      dialRotation += granAngleDelta
      loadIteration(Math.ceil((dialRotation % 360)/increment))
      dialHand.rotation = dialRotation
      let toStep = granAngleDelta < 0 ? -1 : 1
      stepLoader(toStep)
      // loader.gotoAndStop(_.random(loader.totalFrames))
      // cjs.Tween.get(dialHand, {override:true}).to({rotation: dialRotation}, 100, cjs.Ease.quadOut)
    }
    granAnglePrev = granAngleCurrent
    // visDialInteraction(p)
  }

  function handleDialEnd(e) {
    cjs.Tween.get(dialFace, {override:true}).to({alpha: 0}, 100, cjs.Ease.quadOut)
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

}

function tick(e) {
  stage.update()
}

function loadIteration(iteration) {
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
    // if (hsp > 50) {

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
  } else {
    document.getElementById("overlay").style.color = "#000033"
    simpleRecolor(lemonPrincessType, "#000033")
    simpleRecolor(loader, "#000033")
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















