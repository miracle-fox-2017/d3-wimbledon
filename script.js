/* global d3 */

// Our canvas
const width = 750,
      height = 300,
      margin = 20
      marginLeft = 40,
      multiplier = 100

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  let allData = []
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", function(error, data) {
    // console.log('INI YANG DI PANGGIL', data)
    data.map(newData => {
      allData.push(...newData.GoalsScored)
    })
    redraw(allData)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  // console.log('REDDRAW',data)
  const yScale = d3.scaleLinear()
    .domain([0, 4])
    .range([0, height])

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
      return i * 15
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })
    .attr('width', 12)
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('margin-left', marginLeft)
    .style('fill', 'green')

}

reload()
