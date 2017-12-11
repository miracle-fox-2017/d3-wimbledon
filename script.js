/* global d3 */

// Our canvas
const width = 750,
      height = 300,
      margin = 20,
      marginLeft = 40,
      multiplier = 100

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)


// Data reloading
let reload = () => {
  let allData = []
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", function(error, data) {
    // console.log('INI YANG DI PANGGIL', data)
    data.map(newData => {
      allData.push(newData.GoalsScored)
    })
    redraw(allData)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  // console.log('REDDRAW',data)
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, height])

const xScaleAxis = d3.scaleLinear()
  .domain([0, 50])
  .range([0, width])
  
const yScaleAxis = d3.scaleLinear()
  .domain([d3.max(data), 0])
  .range([0, 300])
  
const xAxis = d3.axisBottom(xScaleAxis)
  
const yAxis = d3.axisLeft(yScaleAxis)

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('transform', 'translate(30, -20)')
      .attr('x', (d, i) => {
        return i * 15
      })
      .attr('width', 12)
      .attr("fill", function(d) {
        if (d > 3) {
          return "#92d050";
        } else if (d > 2) {
          return "#fbf042";
        } else if (d > 1) {
          return "#EB7B33";
        }
        return "#eb5b4a";
      })
      .attr("y", height)
    .transition()
      .delay(500)
      .duration(2500)
      .ease(d3.easeBounce)
      .attr('height', (d) => {
        return yScale(d)
      })
      .attr('y', (d) => {
        return height - yScale(d)
      })
      .attr('margin-left', marginLeft)   // position the circle at 250 on the y axis
    // Add the Y Axis
   svg.append("g")
      .attr('transform', 'translate(30, -20)')
      .call(yAxis);
    
      // Add the Y Axis
   svg.append("g")
      .attr('transform', `translate(30, ${height - 20})`)
      .call(xAxis)
      
}

reload()
