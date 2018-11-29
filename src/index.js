require('smoothscroll-polyfill').polyfill()

const LINE_DEFINITIONS = [
  ["Learning"],
  ["  Six key ways to build it in  "],
  [
    ["1. Context"],
    ["2. Goals"]
  ],
  [
    ["3. Tasks"],
    ["4. Resources"]
  ],
  [
    ["5. Assessment"],
    ["6. Feedback"]
  ],
  ["   Context   "],
  ["       Start here       "],
  ["Stop demonstrating downwards"],
  ["Start mapping upwards"],
  [
    ["How does my system fit other systems?"],
    ["Where am I doing my work right now?"]
  ],
  [
    ["Diagramming sessions"],
    ["Constant links to the domain"]
  ],
  ["   Goals   "],
  ["(A theory of goal setting & task performance – Locke)"],
  ["What can I say about myself?"],
  [
    ["Specific"],
    ["Aspirational"],
    ["Expected"],
    ["Believed"]
  ],
  ["(Pygmalion in the classroom – Rosenthal and Jacobson)"],
  ["   Tasks   "],
  ["   Everything is an exercise   "],
  [
    ["Time"],
    ["Minimal unblocking"],
    ["Keywords"],
    ["Encouragement"]
  ],
  ["   Resources   "],
  [
    ["You"],
    ["Reading"],
    ["Prep exercises"]
  ],
  ["      Be Socratic      "],
  [
    ["Ask questions"],
    ["Build a library"],
    ["Keep focussed"]
  ],
  ["  ☠️ ☠️ ☠️ Avoid Tutorials ☠️ ☠️ ☠️  "],
  ["   Assessment   "],
  [
    ["Concretes"],
    ["Concepts"],
    ["Skills"],
    ["Behaviours"]
  ],
  [
    ["Concepts – Ask"],
    ["Skills – Observe"]
  ],
  ["   Feedback   "],
  ["   Have a structure   "],
  ["Build it in with authentic tools"],
  [
    ["Require intentionality"],
    ["Keep it tight"],
    ["Demand iteration"]
  ]
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