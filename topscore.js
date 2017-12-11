/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])   
var color = d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "red", "#666", "#555", "pink", "black", "blue"]);  

const draw = (words) => {
// Draw your data here... 
	d3.select("#top-score").append("svg")
    .attr("width", 850)
    .attr("height", 350)
    .attr("class", "wordcloud")
    .append("g")
    // without the transform, words words would get cutoff to the left and top, they would
    // appear outside of the SVG area
    .attr("transform", "translate(320,200)")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("fill", function(d, i) { return color(i); })
    .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.Name; });  
}


const load = () => {
  // Load your data here...
	d3.tsv('stats.tsv', (rows) => {
	  	const Players = rows

	  	Players.map(player => {
	  		player.size = player.G*2
	  	})	
	  		
		 d3.layout.cloud().size([800, 300])
        .words(rows)
        .rotate(function(d) { return (~~(Math.random() * 6) -3) *30;})
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();		
	})  
	

}

load()
