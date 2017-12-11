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
  d3.tsv("afcw-results.tsv", function(data) {
    redraw(data);
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const multipler = 50
  const dataValue = data.map(d => d.GoalsScored)
  console.log(dataValue)
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataValue)])
    .range([0, height-40])

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(dataValue)])
    .range(['red', 'blue'])

  svg.selectAll('rect')
     .data(dataValue)
     .enter()
     .append('rect')
     .attr('x', (d, i) => {
       return i * (width-marginLeft)/dataValue.length
      })
     .attr('y', height)
     .attr('width', width/dataValue.length-5)
    //  .attr('height', (d) => {
    //    return yScale(d)
    //  })
    //  .attr('fill', colorScale)
     .attr("transform", "translate(20, -20)")

     var t = d3.transition()
     .duration(750)
     .ease(d3.easeLinear);
  
  svg.selectAll('rect')
    .transition(t)
    .style('fill', colorScale)
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })

  var scaleX = d3.scaleLinear()
    .domain([0, dataValue.length])
    .range([0, width-marginLeft])

  // Add scales to axis
  var x_axis = d3.axisBottom()
        .scale(scaleX)
  x_axis.ticks(dataValue.length)
  //Append group and insert axis
  svg.append("g")
    .attr("transform", "translate(20, 280)")
    .call(x_axis)

  var scaleY = d3.scaleLinear()
    .domain([d3.min(dataValue), d3.max(dataValue)])
    .range([height, 40])

  var y_axis = d3.axisLeft()
    .scale(scaleY)

  y_axis.ticks(d3.max(dataValue))
  svg.append("g")
    .attr("transform", "translate(20, -20)")
    .call(y_axis)
    
}

reload()
