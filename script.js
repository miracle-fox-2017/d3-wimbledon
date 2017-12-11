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
  .style('background', '#cacaca')
  
// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", function(data) {
    redraw(data);
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const multipler = 50
  const dataValue = data.map(d => d.GoalsScored)
  console.log(dataValue)
  
  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataValue)])
                   .range([0, height])

  const xScale = d3.scaleLinear()  
              .domain([0, d3.max(dataValue)])
              .range([0, width]);

  svg.selectAll('rect')
     .data(dataValue)
     .enter()
     .append('rect')
     .attr('x', (d, i) => {
       return i * 16
      })
     .attr('width', 15)
     .attr('height', (d) => {
       return yScale(d)
     })
}

reload()
