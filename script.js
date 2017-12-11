/* global d3 */

// Our canvas
const width = 1000,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width + 40)
  .attr('height', height)

// Data reloading
let reload = () => {
  const isi =d3.tsv('afcw-results.tsv',(rows)=>{
    redraw (rows)
  })
  // Your data parsing here...
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(data.map(element =>element.GoalsScored))])
  .range(['peru','teal'])
  
  const yScale = d3.scaleLinear()
  .domain([0,d3.max(data.map(element=>element.GoalsScored))])
  .range([0,height])

  const xScale = d3.scaleLinear()
  .domain([0,data.length])
  .range([0,width])

  const yScaleAxis = d3.scaleLinear()
  .domain([d3.max(data.map(element =>element.GoalsScored)),0])
  .range([0,300])

  const x_axis = d3.axisBottom(xScale)

  const y_axis = d3.axisLeft(yScaleAxis)
    
  let yAxisGroup = svg.append('g')
    .attr('transform',`translate(40,-35)`)
    .call(y_axis)

  let xAxisGroup =svg.append('g')
  .attr('transform',`translate(40, ${height -15})`)
  .call(x_axis)

  

 let bar= svg.selectAll('rect')
    .data(data)
      .enter()
      .append('rect')
      .attr('transform','translate(40,-15)')
      .attr('class','bar')
      .attr('width',20)
      .attr('x',(d,i)=>xScale(i))
      .attr('y',(d)=>height)
      .attr('heigth',0)
      .transition()
        .duration(700)
        .ease(d3.easeLinear)
        .attr('y', (d) => height - yScale(d.GoalsScored))
        .attr('height', d => yScale(d.GoalsScored))
        .attr('fill', d => colorScale(d.GoalsScored))
}

reload()
