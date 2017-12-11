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
  d3.tsv('afcw-results.tsv',(rows)=>{
    this.data = rows
    redraw (this.data)
    // console.log(rows)
  })
  // Your data parsing here...
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  let dataGoals = data.map((d)=>{
    return d.GoalsScored
  })
  const yScale = d3.scaleLinear()
  .domain([0,d3.max(dataGoals)])
  .range([0,height])

  const xScale = d3.scaleLinear()
  .domain([0,d3.max(dataGoals)])
  .range([0,width])
  
  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataGoals)])
  .range(['peru','teal'])

  svg.selectAll('rect')
    .data(dataGoals)//ini dari dataGoals yg sudah di map
    .enter()
    .append('rect')
    .attr('class','bar')
    .attr('x',(d,i)=>{
      // console.log(d);
      return i * 25
    })
    .attr('y',(d)=>{
      return 300 - yScale(d)
    })
    .attr('width', 20)
    .attr('height',(d)=>{
      return yScale(d)
    })    
    .attr('fill',colorScale)
}

reload()
