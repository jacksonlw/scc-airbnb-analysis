// Visualization script (with D3JS)

async function loadData() {
  // Check if github pages

  let basePath = "";
  if (window.location.hostname.includes("github.io")) {
    basePath += "scc-airbnb-analysis";
  }

  const data = await d3.csv(`${basePath}/scc_airbnbs.csv`);

  // Convert the performance score and price to numbers
  data.forEach((d) => {
    d.performance_score = +d.performance_score;
    d.price = +d.price;
    d.accommodates = +d.accommodates;
    d.bathrooms = +d.bathrooms;
    d.bedrooms = +d.bedrooms;
    d.beds = +d.beds;
    d.availability_365 = +d.availability_365;
    d.amenities = JSON.parse(d.amenities);
  });

  console.log(data);

  return data;
}

const scatterPlot = (data) => {
  let width = 1000,
    height = 600;

  let margin = {
    top: 50,
    bottom: 60,
    left: 75,
    right: 40,
  };

  let svg = d3
    .select("#plot-price-score-scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#f1f4f8");

  //Define the scale
  let yscale = d3
    .scaleLinear()
    .domain([0, 365])
    .range([height - margin.bottom, margin.top]);

  let xscale = d3
    .scaleLinear()
    .domain([0, 2000])
    .range([margin.left, width - margin.right]);

  //Draw the scale
  let yaxis = svg
    .append("g")
    .call(d3.axisLeft().scale(yscale))
    .attr("transform", `translate(${margin.left} , 0)`);

  let xaxis = svg
    .append("g")
    .call(d3.axisBottom().scale(xscale))
    .attr("transform", `translate(0,${height - margin.bottom})`);

  const color = d3.scaleSequential(d3.interpolateViridis);

  //Draw the circles
  let circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("cx", (d) => xscale(d.price))
    .attr("cy", (d) => yscale(d.availability_365))
    .attr("fill", (d) => color(d.performance_score / 100))
    .attr("opacity", 0.7)
    .attr("stroke", "#000");

  //Draw the labels
  svg
    .append("text")
    .text("Price per night (USD)")
    .attr("x", width / 2)
    .attr("y", height - 15)
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text("Availability over next year")
    .attr("x", 0 - height / 2)
    .attr("y", 25)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text(
      " Relationship Between Price Per Night and Availability of Listings Over the Next Year"
    )
    .attr("x", width / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("style", "font-weight: bold;");
};

loadData().then((data) => {
  scatterPlot(data);
});
