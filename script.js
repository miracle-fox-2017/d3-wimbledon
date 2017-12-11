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
  let data = []
  // Your data parsing here..
  d3.tsv('afcw-results.tsv', (rows) => {
    rows.forEach(function (row) {
      data.push(row.GoalsScored)
    })
    redraw(data)
  })

}

// redraw function
let redraw = (data) => {
  svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i)=> {
        return i * 5
      })
      .attr('y', (d)=> {
        return 300-d * 10
      })
      .attr('width', 20)
      .attr('height', (d) => {
        return d * 10
      })
}

reload()
