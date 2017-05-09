# Slides framework

A framework for writing slides similar to Gary Bernhardt's opening slides at DeconstructConf 2017.

## Usage

To add lines, modify the `LINES` constant in src/index.js. Build the project, and then open index.html. Each click reveals a new array.

You can add segments to lines (e.g. sections of lines that appear once-per-click) as subarrays.

## Development

Build the project using `npm install`. Watch for project changes using `npm run watch`, or build once using `npm run build`.

All interesting code is in src/index.js. Some interesting code is in style.css.

Sadly, due to some funky async module loading experiences, I had to load both BigText (which handles the text resizing effect) and jQuery (which is generally a pain in the ass) in the head of the document. If you can figure out how to force them to load properly, let me know.
