d3.csv('autos_2.csv', d3.autoType).then(data => {
    let chart_1 = Plot.plot({
    marginBottom: 100,
    y: {
      grid: true,
      label: 'Cantidad'
    },
    x:{
        tickRotate:-45,
        label: 'Barrio'
    },
    marks: [
      Plot.barY(data, Plot.groupX({y: "count"}, {x: 'domicilio_barrio'})),
    ]
  });
  d3.select('#chart_1').append(() => chart_1);
});

