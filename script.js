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
  .append('g')
  .attr('transform', `translate(${marginLeft}, ${margin})`)

// Data reloading
let reload = () => {
  
  // Your data parsing here..
  d3.tsv('afcw-results.tsv', (rows) => {
    redraw(rows)
  })

}



// redraw function
let redraw = (rows) => {
  let data = []
  rows.forEach(function (row) {
    data.push(row.GoalsScored)
  })
const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, 300])

const xScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, width-margin])

svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('height', 0)
      .attr('x', (d, i)=> {
        return i*15
      })
      .attr('y', (d)=> {
        return 300 - yScale(d)
      })
      .transition()
      .duration(400)
      .delay((d, i) => { 
        return i * 100 
      })
      .attr('width', (width/data.length)-5)
      .attr('height', (d) => {
        return yScale(d)
      })
      .attr('fill','teal')

      svg.append('g')
      .attr('transform', 'translate(0, 10)')
      .call(d3.axisLeft(yScale).tickValues(d3.range(0,  d3.max(data))))
}

reload()
