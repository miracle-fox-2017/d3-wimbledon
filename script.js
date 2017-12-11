/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", function(data) {
    // use data here
    let result = data.map(d => d.GoalsScored)
    redraw(result)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('id', 'result')
    .attr('x', (d, i) => {
      return i * (margin + 5)
    })
    .attr('y', (d) => {
      return height - d * 20
    })
    .attr('width', margin)
    .attr('height', (d) => {
      return d * 50
    })


}

reload()
