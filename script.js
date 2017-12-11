/* global d3 */

// Our canvas
const width = 750, height = 300, margin = 20, marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('./afcw-results.tsv',(rows)=>{
    redraw(rows);
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  console.log(data);
}

reload()
