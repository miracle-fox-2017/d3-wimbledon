/* global d3 */
// d3.tsv('afcw-results.tsv', (rows) => {
// 	console.log(rows)
// })

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
  // .style('background', '#cacaca')

// Data reloading
let reload = () => {
	d3.tsv('afcw-results.tsv', (rows) => {
		redraw(rows)
	})
  // Your data parsing here...
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

  const score = data.map((goals) => {
  	return +goals.GoalsScored
  })

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(score)])
  .range([0, height])


  const yscale = d3.scaleLinear()
  .domain([d3.max(score),0])
  .range([0, height])

  const xscale = d3.scaleLinear()
  .domain([0, score.length])
  .range([0, width])

  const x_axis = d3.axisBottom()
  .scale(xscale)
  	.tickPadding(3)
  	.ticks(score.length)


  const y_axis = d3.axisLeft()
  .scale(yscale)
    .tickPadding(3)
    .ticks(d3.max(score))

  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(score)])
  .range(['peru', 'teal'])

  svg.selectAll('rect')
  .data(score)
  .enter()
  .append('rect')
  .attr('width', 10)
  .attr('height', (d) => {
  	return yScale(d)
  }) 
  .attr('x', (d,i) => {
  	return (i * 12)+30 
  })
  .attr('y', (d) => {
  	return 280 - yScale(d)
  })
  .attr('fill',colorScale) 

  svg.append("g")
  .attr("transform", `translate(30,280)`)
  .call(x_axis)


  svg.append("g")
  .attr("transform", `translate(30,0)`)
  .call(y_axis)
}

reload()
