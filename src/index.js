require('smoothscroll-polyfill').polyfill()

const LINE_DEFINITIONS = [
  ["Amazon Alexa"], // is a lot of fun
  ["Ruby"],  // is a lot of fun, too. So
  ["Why can't they just be friends"], // ? Well, all great friendships can turn sour.
  ["Annoyance #1"],                   // is that
  ["AWS Lambda"],                     // doesn't support Ruby, and nor does it intend to. This is a
  ["Pain in the ass"],                // especially because Lambda is all about little web projects, and
  ["Ruby ♥ little web projects"],     // . I mean, it's got wonderful things like
  [
    ["Rack"],         // and a minimal implementation, which is
    ["(Sinatra)"]     // which provides lovely stuff for small web projects, like a
  ],          
  [
    ["Readable DSL"], //
    ["Easy Routing"], // , and being really
    ["Flexible"]      // to all the weird shit you might want to do with it. So the thing is
  ],
  ["Alexa + Sinatra?"],            // should feel like pretty good companions. It's weird that Lambda is standing in their way when
  ["They could be good friends"],  // . But there's another
  ["Annoyance #2"],                // , and that's
  ["JSON"],                        // . JSON in Ruby means lots of
  [
    ["Disgusting hash conversions"], // and a bunch of
    ["Painful testing"]              // with fixture files full of requests and responses all over.
  ],
  ["Disgusting"],                    // . Ugh. So then we get to 
  ["Annoyance #3"],                  // , which is
  ["HTTPS Endpoints"],               // . Alexa needs 'em, and deploying a Ruby app over and over with every file change is a pain. An easy way out is
  [
    ["ngrok"],           // , a tunnelling program that comes with
    ["HTTPS"],           // and paying for it even gives you a
    ["Custom domain"]    // , so you don't have to change it in your skill config each time you restart your computer. So how about a
  ],
  [
    ["Ruby + Alexa framework"],      //
    ["(for Sinatra)"],               //
    ["(ngrok-compatible)"]           // ? Well, here's one I made earlier. I call it
  ],
  ["Ralyxa"],                        // . Kinda like 'Ruby + Alexa'. It's got a reasonably
  [
    ["Nice interface"],              // with lots of nice normal
    ["Sensible defaults"],           // if you don't like coding much, and it's
    ["Sinatra-esque"]                // in that it's all about "quickly creating Alexa skills in Ruby with minimal effort". Built-in is the
  ],
  ["ask and tell syntax"],                    // for natural interactions, and you get
  ["Separate routing from Intent handling"],  // allowing you to pop it into an existing Sinatra application. And with that, let's do a
  ["Demo"]
]

const mountSegment = segment => {
  var segmentWrap = document.createElement('span')
  segmentWrap.className = "segment"
  segmentWrap.innerHTML = `${segment} `

  return segmentWrap
}

const mountLine = (lineDefinition) => {
  var segments = lineDefinition.map(segmentDefinition => mountSegment(segmentDefinition))
  var lineWrap = document.createElement('span')
  segments.forEach(segment => lineWrap.appendChild(segment))

  return lineWrap
}

const render = (lineDefinitions, container) => {
  var lines = lineDefinitions.map(lineDefinition => mountLine(lineDefinition))
  lines.forEach(line => container.appendChild(line))
  
  $(container).bigtext({ maxfontsize: Infinity })
}

const isOffBottom = element => {
  return element.getBoundingClientRect().bottom > window.innerHeight
}

const unveilNextAndScroll = () => {
  var next = document.querySelectorAll('.segment:not(.unveiled)')[0]
  if (!next) return
  
  next.classList.add('unveiled')
  if (isOffBottom(next)) {
    window.scrollBy({ top: next.parentElement.offsetHeight, behaviour: 'smooth' })
  }
}

const setupListeners = () => {
  document.addEventListener('click', unveilNextAndScroll)
}

const disableSelection = target => {
  target.style.cursor = "default"

  if (typeof target.onselectstart!="undefined") {
    return target.onselectstart = () => { return false }
  }

  if (typeof target.style.MozUserSelect!="undefined") {
    return target.style.MozUserSelect = "none"
  }
  
  target.onmousedown = () => { return false }
}

render(LINE_DEFINITIONS, document.getElementById('container'))
setupListeners()
disableSelection(document.body)