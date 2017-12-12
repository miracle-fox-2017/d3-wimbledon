/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', marginLeft + width)
  .attr('height', height)
  .style('background', '#cacaca')

let dataset = []
d3.tsv('afcw-results.tsv', (rows) => {
    rows.map(row => {
      return dataset.push(row.GoalsScored)
    });
    redraw(dataset)
})


// Data reloading
let reload = (data) => {
  // Your data parsing here...
  
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  // console.log(data)
  
  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range(['peru', 'teal'])

  var xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  var xaxis = d3.axisBottom().scale(xScale).ticks(data.length)
  svg.append('g').attr('class', 'xaxis').attr('transform',"translate(30," + (height - 20) + ")").call(xaxis)
  
  //untuk set yAxis
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, (height - margin)])

  var yaxis = d3.axisLeft().scale(yScale).ticks(d3.max(data))
  svg.append('g').attr('class', 'yaxis').attr('transform', 'translate(30, 0)').call(yaxis)

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('transform','translate(10, 0)')
  .attr('x', (d, i) => {
    return xScale(i) + 22
  })
  .transition()
  .duration(3000)
  .attr('y', (d) => {
    return  280 -yScale(d)
  })
  .attr('width', 15)
  .attr('height', (d) => {
    return yScale(d)
  })
  .attr('fill', colorScale)
  .on('mouseover', function(d, i){
    d3.select(this).style('fill', '#bada55')
  })
  .on('mouseout', function(d, i){
    d3.select(this).style('fill', colorScale(d))
  })
  
}

reload()
