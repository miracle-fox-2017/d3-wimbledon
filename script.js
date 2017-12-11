/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40
itemWidth = 20

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    redraw(rows)
  })
}



// redraw function
let redraw = (data) => {
  const arrGoalScored = [] 
  
  data.forEach(item => {
    arrGoalScored.push(+item.GoalsScored)
  });
  
  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(arrGoalScored)])
    .range(['purple', 'wheat'])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(arrGoalScored)])
    .range([0, height])

  svg.selectAll('rect')
    .data(arrGoalScored)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('width', itemWidth)
    .attr('height', (data) => {
      return yScale(data)
    })
    .attr('fill', colorScale)
    .attr('x', (data, index) => {
      return index * (itemWidth + 2)
      
    })
    .attr('y', (data, index) => {
      return height - yScale(data)
      // return 300 - data * 50
      // Height = 300, data = 1 * kelipatan
    })
}

reload()
