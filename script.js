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
  var scale = d3.scaleLinear()
                .domain([0, 42])
                .range([0, width])

  var yScale = d3.scaleLinear()
                 .domain([0, 4])
                 .range([0, height])

  var axisBottom = d3.axisBottom()
                    .ticks(42)
                    .scale(scale)

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('id', 'result')
    .attr('x', (d, i) => {
      return i*16 + (width/42)
    })
    .attr('y', (d) => {
      return (height - yScale(d))
    })
    .attr('width', 15)
    .attr('height', (d) => {
      return yScale(d)
    })

  svg.append("g")
     .attr('id', 'result')
     .attr('x', 0)
     .attr('y', 100)
     .call(axisBottom);


}

reload()
