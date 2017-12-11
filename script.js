/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  let datascore = []
  d3.tsv("afcw-results.tsv", (data) => {
    let datascore = data
    redraw(datascore)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

  // DATA SCORE-NYA
  let goalScore = data.map((d) => {
    return d.GoalsScored
  })

  // const yScale = d3.scaleLinear()
  // .domain([0, d3.max(datascore)])
  // .range([0, height])

  svg.selectAll('rect')
  .data(goalScore)
  .enter()
  .append('rect')
  .attr('class','bar')
  .attr('x', (d,i) => {
    return i * 25
  })
  .attr('y', (d) => {
    return 300 - d * 20
  })
  .attr('width', 20)
  .attr('height', (d) => {
    return d * 20
  })
}

reload()
