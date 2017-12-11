/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
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
    // use data here
    let result = data.map(d => d.GoalsScored)
    redraw(result)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  var yScale = d3.scaleLinear()
                 .domain([0, 4])
                 .range([0, height-30])

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('id', 'result')
    .attr('x', (d, i) => {
      return i*14.15 + (width/46)
    })
    .attr('y', (d) => {
      return (height-20 - yScale(d))
    })
    .attr('width', 10)
    .attr('height', (d) => {
      return yScale(d)
    })

    var xscale = d3.scaleLinear()
                   .domain([0, 46])
                   .range([0, width - 100]);

    var yscale = d3.scaleLinear()
                   .domain([0, 4])
                   .range([height - 30, 0]);

    var x_axis = d3.axisBottom()
                   .ticks(46)
                   .scale(xscale);

    var y_axis = d3.axisLeft()
                   .ticks(4)
                   .scale(yscale);

    svg.append("g")
       .attr("transform", "translate(15, 10)")
       .call(y_axis);

    var xAxisTranslate = height/2 + 130;

    svg.append("g")
            .attr("transform", "translate(15, " + xAxisTranslate  +")")
            .call(x_axis)


}

reload()
