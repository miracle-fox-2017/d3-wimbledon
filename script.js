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
      return this.score = b.GoalsScored
    })
    this.oppenent = a.map(b => {
      console.log(b)
      return this.oppenent = b.Oppenent
    })
    this.data = a
    redraw(this.data)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const yscale = d3.scaleLinear()
                    .domain([0, d3.max(this.score)])
                    .range([0, 300])
  const colscale = d3.scaleLinear()
                      .domain([0, d3.max(this.score)])
                      .range(['peru', 'teal'])

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * 22
    })
    .attr('y', ({GoalsScored}) => {
      return 300 - yscale(GoalsScored)
    })
    .attr('width', 20)
    .attr('height', ({ GoalsScored }) => {
      return yscale(GoalsScored)
    })
    .attr('fill', colscale)
}

reload()
