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
  // Titik Y
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(goalScore),0]) //chart tinggi
  .range([0, height-30])
  // Titik X
  const xScale = d3.scaleLinear()
  .domain([0, goalScore.length]) // 0-45
  .range([0, width])

  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(goalScore)])
  .range(['peru','teal'])

  const axisScaleY = d3.scaleLinear()
  .domain([0, d3.max(goalScore)])
  .range([280, 10])

  svg.selectAll('rect')
  .data(goalScore)
  .enter()
  .append('rect')
  .attr('class','bar')
  .attr('x', (d,i) => {
    return i * 15.7+25 //ditambah 25 karena dimulai dari 25
  })
  .attr('y', (d) => {
    // Graphic dari bawah
    return 280 - yScale(d) //280 karena dimulai dari 280
    // return 0  // grafic dimulai dari atas
  })
  .attr('width', 15 )
  .attr('height', (d) => {
    return yScale(d)
  })
  .attr('fill', colorScale)
  // kasih rules
  let axisY = d3.axisLeft().ticks(4).scale(axisScaleY)
  let axisX = d3.axisBottom().ticks(42).scale(xScale)
  svg.append('g')
  .attr('transform', 'translate(25, 0)') //dimulai dari 25
  .call(axisY)
  svg.append('g')
  .attr('transform', 'translate(25, 280)') //dimulai dari 280
  .call(axisX)

}

reload()
