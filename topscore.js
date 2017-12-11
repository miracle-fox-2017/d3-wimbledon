/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const color=d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "red", "#666", "#555", "pink", "black", "blue"]);

const draw = (words) => {
  // Draw your data here...
  d3.select("#top-score").append("svg")
    .attr('width',750)
    .attr('height',350)
    .attr('class','wordcloud')
    .append('g')
    .attr('transform','translate(320,200)')
    .selectAll('text')
    .data(words)
    .enter().append('text')
    .style('font-size',function(data){
      return data.size+"px"
    })
    .style('fill',function(data,i){
      return color(i)
    })
    .attr('transform',function(data){
      return `translate(${[data.x,data.y]})rotate(${data.rotate})`
    })
    .text(function(data){
      return data.Name
    })
}


const load = () => {
  // Load your data here...
  d3.tsv('./stats.tsv',(rows)=>{
    rows.map(function(player){
      player.size=player.G*2
    })
    d3.layout.cloud().size([800, 300])
    .words(rows)
    .rotate(function(data){
      return Math.round(Math.random()) * 90
    })
    .fontSize(function(data){
       return data.size
     })
    .on('end',draw)
    .start();
  });
}

load()
