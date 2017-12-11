/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40
itemWidth = 20
extraWidth = width + marginLeft

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('padding-left', '30px')
  .attr('padding-bottom', '30px')
  .attr('width', extraWidth)
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
    .domain([d3.min(arrGoalScored), d3.max(arrGoalScored)])
    .range([height/2   , 0])

  const xScale = d3.scaleLinear()
    .domain([0, arrGoalScored.length])
    .range([0, width])
  
  // const xScale = d3.scaleOrdinal()
  //   .domain([0, arrGoalScored.length])
  //   .range([0, arrGoalScored.length]);

  const x_axis = d3.axisBottom().scale(xScale).ticks(arrGoalScored.length) // 0 - 46
  const y_axis = d3.axisLeft().scale(yScale)  // 0 - 4

  console.log(d3.max(arrGoalScored))

  svg
    .append("g").attr("transform", "translate(30, 280)").call(x_axis)
    .append("g").attr("transform", "translate(0,-170)").call(y_axis)

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
      return index * (itemWidth + 2) + marginLeft
      
    })
    .attr('y', (data, index) => {
      return height - yScale(data) - marginLeft
      // return 300 - data * 50
      // Height = 300, data = 1 * kelipatan
    })
    
}

reload()