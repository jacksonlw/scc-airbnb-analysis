vegaEmbed("#plot-amenity-boxplot", "altair/amenities_chart.json")
  .then(function (result) {
    // Access the Vega view instance as result.view
  })
  .catch(console.error);
