"use strict"

/////////////////////////// 
/////////////////////////// 
function fxSample(arr) {
  return arr[Math.floor(fxrand()*arr.length)]
}

function fxSampleRarity(arr, rarityTarget) {
  return arr[Math.floor(fxrand() * (arr.length * rarityTarget))]
}

function fxSampleRarityID(arr, rarityTarget) {
  return Math.floor(fxrand() * (arr.length * rarityTarget))
}
///////////////////////////
///////////////////////////

// META 

let AALoaderLib = document.createElement("script")
let AALib = document.createElement("script")
let AALibPile = document.createElement("script")
let loaderLib
let lib
let libPile

let capturer
let captureIndex = 0
let capturing = false

let currentSorter = 'iteration'

let rarityTarget

let lemonPrincessType
let objkts
let crosshairs
let dialHand
let dialFace = new cjs.Container()
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
let darkMode = true
let iteration
let dialInterval
let clickTimeout
let units = _.times(numUnits, index => {
  return index * increment
})


// MINT
let loader
let currentColorScheme
let currentBGColor
let items
let secItems
let terItems
let princessItems = []
let maxItems = 4
let minItems = 4
let numItemsPrimary
let numItemsSecondary
let numItemsTertiary
let color
let nestedColor
let terColor
let assetID
let secAssetID
let terAssetID
let xMoveRange = 150 
let yMoveRange = 150
let xMoveRangeSec = 300 
let yMoveRangeSec = 300
let xMoveRangeTer = 800 
let yMoveRangeTer = 800
let tweenWaitMax = 500
let tweenDuration = 300
let tweenEaseIn = cjs.Ease.quintInOut
let tweenEaseOut = cjs.Ease.quintInOut
let rotationRateMax = 0.5
let rate = 1


let colorschemes = [

{scheme: ["0e0004","31081f","6b0f1a","b91372","fa198b","b7ad99","ff4365","00d9c0","fffff3"], featureName: "chroma squelch"},
{scheme: ["590d22","800f2f","a4133c","c9184a","ff4d6d","ff758f","d2fd35","ffccd5","fff0f3"], featureName: "raspberry sorbet"},
{scheme: ["d8f3dc","b7e4c7","ff0a50","74c69d","52b788","40916c","2d6a4f","1b4332","081c15"], featureName: "mint strawberry"},
{scheme: ["ffd9da","ea638c","89023e","30343f","1b2021","93b7be","798071","623cea","16302b"], featureName: "vibrant prancy decepticon"},
{scheme: ["9a8f97","c3baba","e9e3e6","b2b2b2","736f72","a30b37","40bcd8","355070","49beaa"], featureName: "icy puddle"},
{scheme: ["2d2a32","ddd92a","eae151","eeefa8","fafdf6","cc2936","6b818c","eee5e9","c7e8f3"], featureName: "yacht panties"},
{scheme: ["7cfef0","6bffb8","2ceaa3","28965a","2a6041","090909","4b5043","a40e4c","2c2c54"], featureName: "dusk forest"},
{scheme: ["bbe1c3","a7cdbd","869d7a","91785d","8b5d33","433e0e","e0b0d5","ffa552","ba5624"], featureName: "cordoroy ashtray"},
{scheme: ["4d5057","4e6e5d","4da167","3bc14a","cfcfcf","ed1c24","fdfffc","f1d302","f2e2d2"], featureName: "citrus chinos"},
{scheme: ["985f99","9684a1","aaacb0","b6c9bb","bfedc1","2d0320","0d160b","5c1a1b","5c573e"], featureName: "middleaged pony"},
{scheme: ["104f55","32746d","9ec5ab","01200f","011502","885053","fe5f55","23022e","ffa69e"], featureName: "fragrant domicile"},
{scheme: ["78c0e0","449dd1","192bc2","150578","0e0e52","6eeb83","e4ff1a","ffb800","ff5714"], featureName: "vibro squinky"},
{scheme: ["0d1f2d","546a7b","9ea3b0","fae1df","e4c3ad","6d2e46","ffe74c","ff5964","f9db6d"], featureName: "pastel fruit balance"},
{scheme: ["007f5f","2b9348","55a630","80b918","aacc00","bfd200","eb4833","eeef20","ffff3f"], featureName: "mealy apple"},
{scheme: ["247ba0","70c1b3","b2dbbf","f3ffbd","ff1654","30362f","625834","da7422","8b2635"], featureName: "dashing plop"},
{scheme: ["331832","d81e5b","f0544f","c6d8d3","fdf0d5"], featureName: "grape pony harmonica"},
{scheme: ["1b2f33","28502e","47682c","8c7051","ef3054"], featureName: "forest strawberry pop"},
{scheme: ["d8e2dc","ffffff","ffcad4","f4acb7","9d8189"], featureName: "overcast barbie flesh"},
{scheme: ["5c415d","694966","74526c","dbd053","c89933"], featureName: "gentle aubergine pram"},
{scheme: ["fbc2b5","ffa8a9","f786aa","a14a76","cdb2ab"], featureName: "maxi flesh"},
{scheme: ["ea526f","070600","f7f7ff","23b5d3","279af1"], featureName: "valiant robot"},
{scheme: ["c4bbaf","a5978b","5c4742","8d5b4c","5a2a27"], featureName: "desert chocolate"},
{scheme: ["07020d","5db7de","f1e9db","a39b8b","716a5c"], featureName: "warrior raccoon"},
{scheme: ["98eb59","801912","cf1d11","ed5d53","c2534c"], featureName: "crimson acid bath"},
{scheme: ["1d1e18","6b8f71","aad2ba","d9fff5","b9f5d8"], featureName: "slightly dead princess"},
{scheme: ["f45b69","f6e8ea","22181c","5a0001","f13030"], featureName: "rouge pop"},
{scheme: ["527a2c","ebb2ce","e6177b","6b4a5a","ffc7e2"], featureName: "watermelon completion"},
{scheme: ["000000","ffffff","494949","7c7a7a","ff5d73"], featureName: "dark cupcake"},
{scheme: ["25ced1","ffffff","fceade","ff8a5b","ea526f"], featureName: "90s chapstick"},
{scheme: ["87946a","261e38","d631a2","c9bce6","381a7a"], featureName: "righteous codpiece"},

]

let primaryAssetData = [
  {featureName: "useful conversion", name: "UsefulConversion", playhead: "loop", fill: true, stroke:true},
  {featureName: "calculated outreach", name: "CalculatedOutreach", playhead: "pingpong", fill: true, stroke:true},
  {featureName: "host portion", name: "HostPortion", playhead: "pingpong", fill: true, stroke:true},
  {featureName: "sensory influx", name: "SensoryInflux", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "tense junction", name: "TenseJunction", playhead: "loop", fill: false, stroke:true, pureStrokes:false},
  {featureName: "partial remembrance", name: "PartialRemembrance", playhead: "loop", fill: true, stroke:false},
  {featureName: "swift reaction", name: "SwiftReaction", playhead: "loop", fill: false, stroke:true, pureStrokes:false},
  {featureName: "completed dream", name: "CompletedDream", playhead: "loop", fill: true, stroke:false},
  {featureName: "tactile whisp", name: "TactileWhisp", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "furtive offering", name: "FurtiveOffering", playhead: "pingpong", fill: true, stroke:true},
  {featureName: "sweet fumble", name: "SweetFumble", playhead: "loop", fill: true, stroke:true},
  {featureName: "precious dream", name: "PreciousDream", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "famished pupa", name: "FamishedPupa", playhead: "loop", fill: true, stroke:true},
]

let secondaryAssetData = [
  {featureName: "conversion twitch", name: "ConversionTwitch", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "preference factory", name: "PreferenceFactory", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "oscillation quad", name: "OscillationQuad", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "wonder tract", name: "WonderTract", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "rejected transmission", name: "RejectedTransmission", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "collab seq", name: "CollabSeq", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "challenge struct", name: "ChallengeStruct", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "contentment wreath", name: "ContentmentWreath", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "tally trade", name: "TallyTrade", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "transmution femur", name: "TransmutionFemur", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "pulse collar", name: "PulseCollar", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "morsel gobble", name: "MorselGobble", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "hopeful pathway 1", name: "HopefulPathway1", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "hopeful pathway 2", name: "HopefulPathway2", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "hopeful pathway 3", name: "HopefulPathway3", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "circular wish", name: "CircularWish", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "triongus buttle", name: "TriongusButtle", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "triadic buttus", name: "TriadiclButtus", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {featureName: "kidney shimmer", name: "KidneyShimmer", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
]

let tertiaryAssetData = [
  {name: "Tertiary1", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary2", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary3", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary4", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary5", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary6", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary7", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary8", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary9", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary10", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary11", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary12", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary13", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary14", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
  {name: "Tertiary15", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
]

// this gets called a la cart around town
let manifest = []

let features = {}

function prepMintValues() {
  // sort out all the shit and put it in $features

  // console.log("manifest: ", manifest)

  let names = _.map(manifest, item => {
    return item.featureName
  })

  const occurrences = names.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {})

  features = _.merge(occurrences, features)
  // console.log("features: ", features)
}

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
  // console.log("loading lib ")
  AALib.setAttribute("src", "AA/lib.js")
  document.body.appendChild(AALib)
  AALib.addEventListener("load", () => {
    // console.log("completed loading lib ")
    let comp = AdobeAn.getComposition("1B1D331872B84B678B30A74AB80E74A9")
    lib = comp.getLibrary()
    loadLibPile()
  }, false)
}

function loadLibPile() {
  // console.log("loading lib pile")
  AALibPile.setAttribute("src", "AA/lib-pile.js")
  document.body.appendChild(AALibPile)
  AALibPile.addEventListener("load", () => {
    // console.log("completed loading lib pile")
    let comp = AdobeAn.getComposition("9DDB8738695F40A58CB0CE0618646207")
    libPile = comp.getLibrary()

    // kickoffSingle()
    loadData()

  }, false)
}

function loadData() {
  fetch("scripts/dillsack-data.json")
    .then(response => response.json())
    .then(json => {
      objkts = json.data.generativeToken.entireCollection
      objkts = _.sortBy(objkts, 'iteration')

      objkts = _.map(objkts, objkt => {
        objkt.generationHash = bootFXHash()
        return objkt
      })

      // objkts[0].generationHash = "oodTLU88WkgH8rSC2zSngbwYV39Bk2fjh4AXxvCmqVrGBq81p7V"

      // objkts = _.take(objkts, 23)
      objkts = _.take(objkts, 187)

      // console.log("data: ", objkts[0])      

      // objkts = _.concat(objkts, _.times(300 - objkts.length, index => {
      //   return {
      //     generationHash: "oocaj1odZwbFyeRr4err47GQhqxbB4haNNMQdT4VAzHdusBffK8",
      //     iteration: index + objkts.length,
      //     owner: {
      //       name: "Bilbo Baggins"
      //     },
      //     notYetMinted: true
      //   }
      // }))

      // console.log("objkts: ", objkts)

      kickoffMany()
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

  _.delay(loadLib, 500)
  // loadLib()
}

function colorBG(color) {
  bgRect.graphics.clear()
  bgRect.graphics.beginFill(color).drawRect(-5000, -5000, 10000, 10000)
}

function posPT() {
  // let margin = 60
  // loader.x = ((stage.width / 2) / scaler) - (margin/scaler)
  // loader.y = (-(stage.height / 2) / scaler) + (margin/scaler)
  // loader.scaleX = loader.scaleY = 0.5 / scaler

  loader.x = ((stage.width / 2) / scaler) - (60 / scaler)
  loader.y = ((stage.height / 2) / scaler) - (60 / scaler)
  loader.scaleX = loader.scaleY = 0.5 / scaler
  // loader.gotoAndStop(0)
}

function posLemonPrincessType() {
  // let margin = 80
  lemonPrincessType.x = (-(stage.width / 2) / scaler) + (120/scaler)
  lemonPrincessType.y = (-(stage.height / 2) / scaler) + (50/scaler)
  lemonPrincessType.scaleX = lemonPrincessType.scaleY = 0.5 / scaler
  // lemonPrincessType.gotoAndStop(0)
}


function kickoffSingle() {
  startPrincessRaw()
}

function kickoffMany() {

  const urlParams = new URLSearchParams(window.location.search);
  const iter = urlParams.get('id')
  const sorter = urlParams.get('sortby')

  currentSorter = sorter ? sorter : 'iteration'

  posPT()

  window.addEventListener("keydown", e => {
    // console.log("KEY: ", e)
    if (e.key == "ArrowLeft" || e.code == "Space") {
      handlePrev()
    } else if (e.key == "ArrowRight") {
      handleNext()
    } else if (e.key == "p") {
      sortByPrice()
    } else if (e.key == "i") {
      sortByIteration()
    }
  })

  line = new cjs.Shape()
  stage.addChild(line)

  // makeDialUnits(objkts)
  // dialHand = new lib.DialHand()
  dialHand = new cjs.Shape()
  dialHand.graphics.setStrokeStyle(1).beginStroke("rgba(255,255,255,1)")
  dialHand.graphics.moveTo(0, -dialInnerRadius)
  dialHand.graphics.lineTo(0, -dialOuterRadius)
  // dialHand.graphics.endStroke()
  dialFace.addChild(dialHand)
  dialFace.alpha = 0

  crosshairs = new lib.Crosshairs()
  dialFace.addChild(crosshairs)

  lemonPrincessType = new lib.LemonPrincessType()
  container.addChild(lemonPrincessType)
  posLemonPrincessType()

  canvas.addEventListener("touchstart", e => { handleDialStart(e.touches[0])})
  canvas.addEventListener("mousedown", handleDialStart)
  canvas.addEventListener("click", handleNext)

  if (iter) {
    iteration = Number(iter)
  } else {
    iteration = 1
  }

  if (currentSorter == 'iteration') {
    sortByIteration()
  } else if (currentSorter == 'price') {
    sortByPrice()
  }

  loadIteration(iteration)
  startPrincess(iteration)

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
    canvas.addEventListener("touchmove", handleDialMove)
    canvas.addEventListener("touchend", handleDialEnd)
    canvas.addEventListener("mousemove", handleDialMove)
    canvas.addEventListener("mouseup", handleDialEnd)
    destroyCurrentPrincess()
  }

  function handleDialMove(e) {
    canvas.removeEventListener("click", handleNext)
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
      // console.log("dialRotation: ", dialRotation)
      // console.log("granAngleDelta: ", granAngleDelta)
      let totalMinted = objkts.length-1
      if (granAngleDelta < 0 && (dialRotation <= 0 || dialRotation >= totalMinted * increment)) {
        dialRotation = totalMinted * increment
        granAngleCurrent = getGranularAngle(angle, numUnits)
        granAngleOffset = granAngleCurrent - dialRotation
      } else if (granAngleDelta > 0 && dialRotation >= totalMinted * increment) {
        dialRotation = 0
        granAngleCurrent = getGranularAngle(angle, numUnits)
        granAngleOffset = granAngleCurrent - dialRotation
      }
      let rawDegree = Math.round((dialRotation % 360)/increment)
      let degree = rawDegree
      degree = rawDegree < 0 ? numUnits + rawDegree : rawDegree 
      loadIteration(objkts[degree].iteration)
      dialHand.rotation = dialRotation
    }
    granAnglePrev = granAngleCurrent
    // visDialInteraction(p)
  }

  function handleDialEnd(e) {
    cjs.Tween.get(dialFace, {override:true})
      // .wait(500)
      .to({alpha: 0}, tweenDuration, tweenEaseOut)
    canvas.removeEventListener("touchmove", handleDialMove)
    canvas.removeEventListener("touchend", handleDialEnd)
    canvas.removeEventListener("mousemove", handleDialMove)
    canvas.removeEventListener("mouseup", handleDialEnd)
    startPrincess(iteration)
    // canvas.addEventListener("click", handleNext)
    _.delay(e => {
      canvas.addEventListener("click", handleNext)
    }, 10)
  }

  function visDialInteraction(p) {
    line.graphics.clear()
    line.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)")
    line.graphics.moveTo(container.x, container.y)
    line.graphics.lineTo(p.x, p.y)
    line.graphics.endStroke()
  }

  capturer = new CCapture({
    format: 'gif',
    workersPath: 'libs/',
    framerate: 30,
  })

}

function handlePrev() {
  let firstIter = objkts[0].iteration
  let lastIter = objkts[objkts.length-1].iteration
  let newIter
  if (iteration == firstIter) {
    newIter = lastIter
  } else {
    newIter = iteration - 1
  }
  loadIteration(newIter)
  destroyCurrentPrincess()
  startPrincess(newIter)
}

function handleNext() {
  let firstIter = objkts[0].iteration
  let lastIter = objkts[objkts.length-1].iteration
  let newIter
  if (iteration == lastIter) {
    newIter = firstIter
  } else {
    newIter = iteration + 1
  }
  loadIteration(newIter)
  destroyCurrentPrincess()
  startPrincess(newIter)
}

function tick(e) {
  stage.update()
  
  if (capturing) {
    capturer.capture(canvas);
    captureIndex++
    if (captureIndex == 96) {
      capturer.stop();
      capturer.save(blob => {
        // title.visible = true
        download( blob, "presstube-lemon-princess-" + iteration + ".gif", "image/gif" );
        // document.getElementById("overlay").style.visibility = "hidden"
        // console.log("asdsad: ", onResize)
        // window.onresize = window.savedResize
        window.onresize()
        loader.gotoAndStop(Math.abs(iteration-1 % loader.totalFrames))
        loader.visible = true
        document.getElementById("overlay").style.visibility = "visible"

        capturer = new CCapture({
          format: 'gif',
          workersPath: 'libs/',
          framerate: 30,
        })

      });
    }
  }
}

function loadIteration(iter) {
  iteration = iter
  // console.log('iter: ', iteration)
  let fxhash = _.result(_.find(objkts, function(objkt) {
    return objkt.iteration == iteration;
  }), 'generationHash');
  bootFXHash(fxhash)
  // console.log('generationHash: ', fxhash)
rarityTarget = fxrand()
// console.log("rarityTarget: ", rarityTarget)
// rarityTarget = 1
  currentColorScheme = fxSampleRarity(colorschemes, rarityTarget).scheme
  currentBGColor = fxSample(currentColorScheme)
  colorBG("#" + currentBGColor)
  recolorUI("#" + currentBGColor)

  loader.gotoAndStop(Math.abs(iteration-1 % loader.totalFrames))

  updateReadout()

}

function sortByPrice() {
  currentSorter = 'price'
  objkts = _.orderBy(objkts, [objkt => {
    let rank = 0
    if (objkt.offer) {
      rank = objkt.offer.price
    }
    return rank
  }],['desc'])

  updateParams()
  destroyDialUnits()
  makeDialUnits(objkts)
  dialReadjust(iteration)
}

function sortByIteration() {
  currentSorter = 'iteration'
  objkts = _.orderBy(objkts, ['iteration'],['asc'])

  updateParams()
  destroyDialUnits()
  makeDialUnits(objkts)
  dialReadjust(iteration)
}

function getUser(objkt) {
  if (objkt.offer) {
    return objkt.offer.issuer
  } else {
    return objkt.owner
  }
}

function getUserName(user) {
  if (user.name) {
    return user.name
  } else {
    return "Anon " + user.id.substring(0,8) + "..."
  }
}

function getUserLink(user) {
  return "https://tzkt.io/" + user.id
}

function updateReadout() {

  let data = _.find(objkts, {iteration: iteration})
  // is it "overlay" or "readout"? cummon...
  let overlay = document.getElementById('overlay')
  overlay.innerHTML = ""

  // hash
  let hashReadout = document.createElement("p")
  hashReadout.classList.add("hash")
  hashReadout.innerHTML = fxhash
  // overlay.appendChild(hashReadout)

  // iteration number
  let displayNum = iteration.toString()
  displayNum = displayNum.length == 1 ? "00" + displayNum : displayNum
  displayNum = displayNum.length == 2 ? "0" + displayNum : displayNum
  let iterReadout = document.createElement("p")
  iterReadout.classList.add("num")
  iterReadout.innerHTML = displayNum + '/' + numUnits
  overlay.appendChild(iterReadout)

  let user = getUser(data)
  let name = getUserName(user)
  let link = getUserLink(user)

  // owner
  let ownerLink = document.createElement("a")
  ownerLink.innerHTML = "👛 " + name
  ownerLink.href = link
  ownerLink.target = "_blank"
  ownerLink.classList.add("owner")
  overlay.appendChild(ownerLink)

  let gifLink = document.createElement("a")
  gifLink.innerHTML = "📽 Export as GIF"
  gifLink.classList.add("owner")
  gifLink.addEventListener("click", e => {
    e.preventDefault()
    gifExport()
  })
  overlay.appendChild(gifLink)


  if (data.offer) {
    // owner

    let offerLink = document.createElement("a")
    let offerLinkButton = document.createElement("button")
    offerLink.innerHTML = "🟢 " + String(data.offer.price / 1000000) + "tz"
    // offerLinkButton.innerHTML = String(data.offer.price / 1000000) + " tz"
    // offerLink.appendChild(offerLinkButton)
    offerLink.href = "https://www.fxhash.xyz/objkt/slug/" + data.slug
    offerLink.target = "_blank"
    offerLink.classList.add("owner")
    // offerLink.classList.add("offer")
    // offerLinkButton.classList.add("collect")
    overlay.appendChild(offerLink)

    // let offerLink = document.createElement("a")
    // let offerLinkButton = document.createElement("button")
    // offerLink.innerHTML = "💸 "
    // offerLinkButton.innerHTML = String(data.offer.price / 1000000) + " tz"
    // offerLink.appendChild(offerLinkButton)
    // offerLink.href = "https://www.fxhash.xyz/objkt/slug/" + data.slug
    // offerLink.target = "_blank"
    // offerLink.classList.add("owner")
    // offerLinkButton.classList.add("collect")
    // overlay.appendChild(offerLink)
  }

}

function gifExport() {
  console.log("BEGIN")

  document.getElementById("overlay").style.visibility = "hidden"
  
  let dimensions = 350
  let scaleBound = 700

  canvas.width = dimensions
  canvas.height = dimensions
  scaler = 1
  if (canvas.width < scaleBound || canvas.height < scaleBound) { 
    let smallestScaleSize = canvas.width < canvas.height ? canvas.width : canvas.height
    scaler = smallestScaleSize / scaleBound
  }
  container.scaleX = scaler
  container.scaleY = scaler
  container.x = canvas.width / 2
  container.y = canvas.height / 2

  stage.width = canvas.width
  stage.height = canvas.height

  let ratio = window.devicePixelRatio
  if (ratio === undefined) return
  canvas.setAttribute("width", dimensions * ratio)
  canvas.setAttribute("height", dimensions * ratio)
  stage.scaleX = stage.scaleY = ratio
  canvas.style.width = dimensions + "px"
  canvas.style.height = dimensions + "px"
  
  posPT()
  posLemonPrincessType()
  loader.play()
  // loader.visible = false
  loader.x = dimensions / 1.2
  loader.y = dimensions / 1.2
  loader.scaleX = loader.scaleY = 0.5

  // window.savedResize = window.onresize
  // window.onresize = null

  // title.visible = false
  captureIndex = 0
  capturing = true
  capturer.start();
  // document.getElementById("gifreadout").style.visibility = "visible";
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

  // let numUnits = objkts.length

  dialUnits = _.times(numUnits, makeDialUnit)
  container.addChild(dialFace)

  function makeDialUnit(index) {
    let objktData = objkts[index] ? objkts[index] : {
      generationHash: "ooow3rcMs8ousgZiLLRYHBXLuYko9N42A7zr9658Pfn4tAUMbxE"
    }

    let degrees = (360 / numUnits) * (index)
    let point = PTUtils.polarDegrees(faceRadius, degrees)

    // seems dangerous to have this in here if I'm sorting...
    bootFXHash(objktData.generationHash)
// console.log("rarityTarget: ", rarityTarget)
rarityTarget = fxrand()
// rarityTarget = 1
    currentColorScheme = fxSampleRarity(colorschemes, rarityTarget).scheme
    // currentColorScheme = fxSample(colorschemes)
    currentBGColor = fxSample(currentColorScheme)

    // let dialUnit = new lib.DialUnit()
    let dialUnit = new cjs.Shape()
    dialUnit.graphics.setStrokeStyle(8).beginStroke("#" + currentBGColor)
    dialUnit.graphics.moveTo(0, 0)
    dialUnit.graphics.lineTo(0, -20)
    dialUnit.graphics.endStroke()
    if (objktData.offer) {
      dialUnit.graphics.setStrokeStyle(8, "round").beginStroke("rgba(0,255,0,0.5)")
      dialUnit.graphics.moveTo(0, 10)
      dialUnit.graphics.lineTo(0, 11)
      dialUnit.graphics.endStroke()
    }

    dialUnit.rotation = degrees
    dialUnit.x = point.x
    dialUnit.y = point.y
    dialFace.addChild(dialUnit)
    return dialUnit
  }
}

function destroyDialUnits() {
  _.map(dialUnits, dialUnit => {
    dialFace.removeChild(dialUnit)
  })
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

function recolorUI(color) {
  // console.log("recoloringU")
  // check to see if it's dark or light
  let darkOrLight = lightOrDark(color)
  let shiftAmount = darkOrLight == "dark" ? 0.3 : -0.6
  let UIColor = pSBC( shiftAmount, color );
  document.getElementById("overlay").style.color = UIColor
  document.getElementById("footer").style.color = UIColor
  simpleRecolor(lemonPrincessType, UIColor)
  simpleRecolor(loader, UIColor)
  simpleRecolor(crosshairs, UIColor)
  dialHand.graphics._stroke.style = UIColor

  // choose a darkened version of color if light, or lightened version if dark
  // apply new color to interface elements
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
  if (!paused) item.play()
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////



function updateParams() {
  const params = new URLSearchParams(location.search);
  params.set('id', iteration);
  if (currentSorter) params.set('sortby', currentSorter)
  params.toString(); // => test=123&cheese=yummy
  window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
}

function dialReadjust(iteration) {
  // guts out dial readjusting
  let rotty = _.findIndex(objkts, objkt => {
    return objkt.iteration == iteration
  })
  let incr = 360 / 300
  dialHand.rotation = rotty * incr
  dialRotation = rotty * incr
}

function startPrincessRaw() {
  loader.visible = false
  spawnNewPrincess()
}

function startPrincess(iteration) {
  // console.log('starting princess:', iteration)
  
  // destroyCurrentPrincess()

  dialReadjust(iteration)

  updateParams()

  // booting fxhash
  let fxhash = _.result(_.find(objkts, function(objkt) {
    return objkt.iteration == iteration;
  }), 'generationHash');

  bootFXHash(fxhash)

  // // painting UI as dark or light mode
  // let currentLightOrDark = lightOrDark(currentBGColor)
  // if (currentLightOrDark == "dark" && !darkMode || currentLightOrDark == "light" && darkMode) {
  //   setDarkMode(!darkMode)
  // }

  // // rendering hash & edition #s
  // let displayNum = iteration.toString()
  // displayNum = displayNum.length == 1 ? "00" + displayNum : displayNum
  // displayNum = displayNum.length == 2 ? "0" + displayNum : displayNum
  // // console.log("displayNum: ", displayNum.length)
  // document.getElementById('overlay').innerHTML = '<p class="hash">' + fxhash + '</p>' + '<p class="num">' + displayNum + '/' + numUnits + '</p>'

  spawnNewPrincess()
  recolorUI("#" + currentBGColor)

}

function destroyCurrentPrincess() {
  // console.log('destroying current princess')
  _.map(items, destroyPrincessItem)
  _.map(secItems, destroyPrincessItem)
  items = []
  secItems = []
  // _.map(terItems, destroyPrincessItem)
  // terItems = []
}

function destroyPrincessItem(item) {
  // cjs.Tween.get(item, {override:false})
  //   .wait(Math.random() * 100)
  //   .to({scaleX: 0, scaleY: 0}, 200, tweenEaseIn)
  //   .call(e => {
  //     container.removeChild(item)
  //     item.removeEventListener('tick')
  //     // console.log("removed: ", item)
  //   })

  container.removeChild(item)
  item.removeEventListener('tick')
}

function spawnNewPrincess() {
rarityTarget = fxrand()
// console.log("fxhash: ", fxhash)
// console.log("rarityTarget: ", rarityTarget)
// rarityTarget = 1
  // console.log("rarityTarget: ", rarityTarget)
  let scheme = fxSampleRarity(colorschemes, rarityTarget)
  features.palette = scheme.featureName 
  currentColorScheme = scheme.scheme
  currentBGColor = fxSample(currentColorScheme)
  colorBG("#" + currentBGColor)
  numItemsPrimary = Math.floor(fxrand() * maxItems) + minItems
  numItemsSecondary = Math.floor(fxrand() * maxItems) + minItems
  // console.log("numItemsPrimary: ", numItemsPrimary)
  // console.log("numItemsSecondary: ", numItemsSecondary)
  assetID = fxSampleRarityID(primaryAssetData, rarityTarget)
  secAssetID = fxSampleRarityID(secondaryAssetData, rarityTarget)
  color = "#" + fxSample(currentColorScheme)
  nestedColor = "#" + fxSample(currentColorScheme)
  items = _.times(numItemsPrimary, makePulsor)
  secItems = _.times(numItemsSecondary, makeSegundo)
  // terColor = "#" + fxSample(currentColorScheme)
  // terItems = _.times(numItemsTertiary, makeTertiary)

  prepMintValues()
}

function makePulsor(index) {

  if (fxrand() < 0.4) { // deciding whether to switch asset or not
    // assetID = Math.floor(fxrand() * primaryAssetData.length)
    assetID = fxSampleRarityID(primaryAssetData, rarityTarget)
  }

  let itemData = primaryAssetData[assetID]
  manifest.push(itemData)
  // let itemData = assetData[1]

  // console.log("lib: ", lib)
  // console.log("asdasd: ", itemData.name)
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
    // console.log("anchor found ")
    makeNested(item)
  } 

  function makeNested() {
    // let nestedItemData = fxSample(primaryAssetData)
    let nestedItemData = fxSampleRarity(primaryAssetData, rarityTarget)
    manifest.push(nestedItemData)
    // console.log("asdasdsa:", nestedItemData)
    // let nestedItemData = secondaryAssetData[2]
    let nestedItem = new lib[nestedItemData.name]()
    nestedItem.scaleX = nestedItem.scaleY = 0.5
    let nestedItemForward = true

    recolor(nestedItem, nestedItemData, nestedColor, 2)
    nestedItem.gotoAndStop(Math.floor(fxrand() * nestedItem.totalFrames)) // synchrony
    if (nestedItemData.playhead == "pingpong") {
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
    // secAssetID = Math.floor(fxrand() * secondaryAssetData.length)
    secAssetID = fxSampleRarityID(secondaryAssetData, rarityTarget)
  }
  let itemData = secondaryAssetData[secAssetID]
  manifest.push(itemData)
  let item = new libPile[itemData.name]()
  recolor(item, itemData, color)
  item.x = fxrand() * xMoveRangeSec - fxrand() * xMoveRangeSec
  item.y = fxrand() * yMoveRangeSec - fxrand() * yMoveRangeSec
  let targetScaleX = fxrand() < 0.4 ? 1 : -1
  item.scaleX = item.scaleY = 0
  cjs.Tween.get(item, {override:true})
    .wait(Math.random() * tweenWaitMax)
    .to({scaleX: targetScaleX, scaleY: 1}, tweenDuration, tweenEaseIn)
  item.rotation = fxrand()*360
  container.addChildAt(item, Math.floor(fxrand()*container.children.length))
  item.gotoAndPlay(Math.floor(fxrand() * item.totalFrames))
  // item.stop()


  return item
}


function makeTertiary() {
  // if (fxrand() < 0.4) {
  //   // secAssetID = Math.floor(fxrand() * secondaryAssetData.length)
  //   terAssetID = fxSampleRarityID(tertiaryAssetData, rarityTarget)
  // }
  let itemData = tertiaryAssetData[terAssetID]
  let item = new lib[itemData.name]()
  recolor(item, itemData, nestedColor)
  item.x = fxrand() * xMoveRangeTer - fxrand() * xMoveRangeTer
  item.y = fxrand() * yMoveRangeTer - fxrand() * yMoveRangeTer
  let targetScaleX = fxrand() < 0.4 ? 1 : -1
  item.scaleX = item.scaleY = 0
  cjs.Tween.get(item, {override:true})
    .wait(Math.random() * tweenWaitMax)
    .to({scaleX: targetScaleX, scaleY: 1}, tweenDuration, tweenEaseIn)
  item.rotation = fxrand()*360
  container.addChildAt(item, Math.floor(fxrand() * container.children.length))
  item.gotoAndPlay(Math.floor(fxrand() * item.totalFrames))


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








