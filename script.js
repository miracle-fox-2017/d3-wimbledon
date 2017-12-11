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
const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, 300])

const colorScale = d3.scaleLinear()
      .range(['teal', 'teal'])


      
svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i)=> {
        return i*15
      })
      .attr('y', (d)=> {
        return 300 - yScale(d)
      })
      .attr('width', (width/data.length)-5)
      .attr('height', (d) => {
        return yScale(d)
      })
      .attr('fill', colorScale)
}

reload()
