require('smoothscroll-polyfill').polyfill()

const LINES = [
  ["Hello"],
  ["Welcome to Makers Academy"],
  ["It's", "Great", "Here"],
  ["It's", "Great", "Here"],["It's", "Great", "Here"],
  ["Welcome to Makers Academy"],
  ["It's", "Great", "Here"],
  ["Great to see you!"],
  ["Welcome to Makers Academy"],
  ["Welcome to Makers Academy"],
  ["Hello"],
  ["Great to see you!"]
]

const mountSegment = segment => {
  var segmentWrap = document.createElement('span')
  segmentWrap.className = "segment"
  segmentWrap.innerHTML = `${segment} `

  return segmentWrap
}

const renderLine = (line, container) => {
  var segments = line.map(segment => mountSegment(segment))
  var lineWrap = document.createElement('span')
  segments.forEach(segment => lineWrap.appendChild(segment))

  container.appendChild(lineWrap)
}

const render = (lines, container) => {
  lines.forEach(line => renderLine(line, container))
  $(container).bigtext({ maxfontsize: 10000 });
}

const offBottom = element => {
  return element.getBoundingClientRect().bottom > window.innerHeight
}

const unveilNext = () => {
  let next = document.querySelectorAll('.segment:not(.unveiled)')[0]
  if(next) { 
    next.classList.add('unveiled')
    if(offBottom(next)) {
      window.scrollBy({ top: next.offsetHeight, behaviour: 'smooth' })
    }
  }
}

const setupListeners = () => {
  document.addEventListener('click', unveilNext)
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

render(LINES, document.getElementById('container'))
setupListeners()
disableSelection(document.body)