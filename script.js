/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
  marginLeft = 40
  // yscale = d3.scaleLiner().domain([0, d3.max()])

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  let data = []
  let score = []
  let oppenent = []
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", function (a) {
    this.score = a.map(b => {
      return b.GoalsScored
    })
    this.oppenent = a.map(b => {
      return b.Oppenent
    })
    this.data = a
    redraw(this.score)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  console.log('height', height)
  console.log('width', width)
  const yscale = d3.scaleLinear()
                    .domain([0, d3.max(data)])
                    .range([0, 300])

  const colorScale = d3.scaleLinear()
                      .domain([0, d3.max(data)])
                      .range(['peru', 'teal'])

  const x_scale = d3.scaleLinear()
                  .domain([0, d3.max(data)])
                  .range([0, width - 100])
  
  const y_scale = d3.scaleLinear()
                    .domain([d3.max(data), 0])
                    .range([height/2, 0])

  const x_axis = d3.axisBottom().scale(x_scale)
  const y_axis = d3.axisLeft().scale(y_scale)

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * 22
    })
    .attr('y', (d) => {
      return 300 - yscale(d)
    })
    .attr('width', 20)
    .attr('height', (d) => {
      return yscale(d)
    })
    .attr('fill', colorScale)
    .append('g')
    .attr('transform', 'translate(50, 0)')
    .call(x_axis)
    .attr('transform', 'translate(0, 280')
    .call(y_axis)
}

reload()
