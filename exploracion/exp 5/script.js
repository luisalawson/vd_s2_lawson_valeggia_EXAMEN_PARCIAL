d3.csv('autos_2.csv', d3.autoType).then(data => {
    let chart_5 = Plot.plot({
    marginLeft: 100,
    y: {
      grid: true,
      label: 'Canal'
    },
    x:{
      grid: true,
      label: 'Cantidad'
    },
    marks: [
      Plot.barX(data, Plot.groupY({x: "count"}, {y:'canal'})),
    ]
  });
  d3.select('#chart_5').append(() => chart_5);
});

