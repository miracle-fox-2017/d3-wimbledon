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
  let goalArr = []
  d3.tsv('afcw-results.tsv', (data) => {
    data.forEach((dataGoals) => {
      goalArr.push(dataGoals.GoalsScored)
    })
    redraw(goalArr)
  })
}

// redraw function
let redraw = (data) => {
  let yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, 300])

  let yScaleAxis = d3.scaleLinear()
  .domain([d3.max(data), 0])
  .range([0, height])

  let xScaleAxis = d3.scaleLinear()
  .domain([1, data.length])
  .range([0, 690])

  let yAxis = d3.axisLeft(yScaleAxis)
  svg.append("g")
  .attr("transform", `translate(30, -20)`)
  .call(yAxis);

  let xAxis = d3.axisBottom(xScaleAxis).ticks(data.length)
  svg.append("g")
  .attr("transform", `translate(30, ${height - 20})`)
  .call(xAxis)

  // Your data to graph here
  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr("transform", `translate(30, -20)`)
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return i * 15
  })
  .attr('y', (d) => {
    return 300 - yScale(d)
  })
  .attr('width',12)
  .attr('height', (d) => {
    return yScale(d)
  })
}

reload()
