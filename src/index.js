require('smoothscroll-polyfill').polyfill()

const LINE_DEFINITIONS = [
  ["Alexa"],
  ["Is a lot of fun"],
  ["Ruby"],
  ["AWS Lambda"],
  ["HTTPS Endpoint"],
  ["Pain in the ass"],
  [["Production"], ["Development"]],
  ["Ruby ♥ little web projects"],
  [["Rack"], ["(Sinatra)"]],
  [["Readable DSL"], ["Easy Routing"], ["Flexible"]],
  ["Alexa + Sinatra"],
  [["ngrok"], ["HTTPS"], ["Custom domain"]],
  ["JSON"],
  [["Disgusting hash conversions"], ["Painful testing"]],
  ["Disgusting"],
  [["Ruby + Alexa framework?"], ["(for Sinatra)"]],
  ["Ralyxa"],
  [["Nice interface"], ["Sensible defaults"], ["Sinatra-esque"]],
  ["ask and tell syntax"],
  ["Separate routing from Intent handling"],
  ["Fun"]
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