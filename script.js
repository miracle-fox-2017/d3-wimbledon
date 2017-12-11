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
  d3.tsv("afcw-results.tsv", function(inputData) {
    inputData.forEach(element => {
      data.push(element.GoalsScored)
    })
    redraw(data)
  })
}

// redraw function
let redraw = (data) => {

  const yScale = d3.scaleLinear()
                   .domain([d3.max(data), 0])
                   .range([300, 0])

  const xScale = d3.scaleLinear()
                   .domain([0, data.length])
                   .range([50, width-10])

  const xAxis = d3.axisBottom(xScale)
                  .ticks(data.length)

  const yAxis = d3.axisLeft(yScale)
                  .ticks(d3.max(data))


  svg.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('transform', 'translate(0, -20)')
     .attr('x', (d, i)=> {
        return (i * 15)+50                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     })
     .attr('y', (d)=> {
        return 300 - yScale(d)
     })
     .attr('width', width / data.length-2)
     .attr('height', (d) => {
        return yScale(d)
     })
     .attr('fill', 'teal')

  svg.append('g')
     .attr('transform', 'translate(0, 280)')
     .call(xAxis)

  svg.append('g')
     .attr('height', 200)
     .attr('transform', 'translate(50, 25)')
     .call(yAxis)
}

reload()

