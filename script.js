
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
let data = []

d3.tsv('afcw-results.tsv', (rows) => {
  console.log(rows)
  rows.forEach((row) => {
    data.push(row.GoalsScored)
  })
  redraw(data)
})
}

// redraw function
let redraw = (data) => {
// Your data to graph here
let dataset = data

const yScale = d3.scaleLinear()
.domain([0, d3.max(data)])
.range([height - 50, 0 ])

const xScale =
d3.scaleLinear()
.domain([0, dataset.length])
.range([50, width - 50])

const bottomAxis = 
d3.axisBottom(xScale)
.ticks(dataset.length + 1)

const leftAxis = 
d3.axisLeft(yScale)
.ticks(d3.max(data))

const colorScale = d3.scaleLinear()
    .range(['teal', 'teal'])

svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .attr('class', 'bar')
   .attr('x', (d, i) => {
     return i * 14.24
   })
   .attr('y', (d) => {
     return 300 - yScale(d)
   })
   .attr('width', 10)
   .attr('height', (d) => {
     return yScale(d)
   })
   .attr('fill', colorScale)
   .attr('transform', 'translate(50, -25)')

   svg.append('g')
   .attr('transform', 'translate(0, 275)')
   .call(bottomAxis)
 
   svg.append('g')
   .attr('height', 200)
   .attr('transform', 'translate(50, 25)')
   .call(leftAxis)   
}


reload()
