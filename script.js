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
  d3.tsv('afcw-results.tsv', (rows) => {
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {
   
  // console.log(data[data.length-1].GoalsScored)
  
  let scores = []
  
  data.forEach(team => {
    scores.push(team.GoalsScored)
  })
  
  
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(scores)])
  .range([0,300])
  
  var yAxis = d3.axisLeft(yScale)
  
  svg.style('background', '#cacaca')
  .style('padding-left', marginLeft)
  .selectAll('rect')
  .data(scores)
  .enter()
  .append('rect')
  .attr('x', (d, i) => {
    return i * 15
  })
  .attr('y', (d) => {
    return height - yScale(d)
  })
  .attr('width', 10)
  .attr('height', (d) => {
    return yScale(d)
  })
  svg.append('g')
  .attr('transform', `translate(0, ${d3.max(scores)})`)
  .call(yAxis)
}


reload()
