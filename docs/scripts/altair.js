vegaEmbed("#plot-amenity-boxplot", "charts/amenities_chart.json")
  .then(function (result) {
    // Access the Vega view instance as result.view
  })
  .catch(console.error);

vegaEmbed("#plot-room-type-price", "charts/room_type_vs_price_chart.json")
  .then(function (result) {
    // Access the Vega view instance as result.view
  })
  .catch(console.error);
