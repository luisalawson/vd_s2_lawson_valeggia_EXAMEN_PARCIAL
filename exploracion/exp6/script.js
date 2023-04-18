d3.csv('todos.csv', d3.autoType).then(data => {
    let chart_6 = Plot.plot({
    marginLeft: 230,
    y: {
      grid: true,
      label: 'Categoria'
    },
    x:{
        label: 'Cantidad'
    },
    marks: [
      Plot.barX(data, Plot.groupY({x: "count"}, {y: 'categoria'})),
    ]
  });
  d3.select('#chart_6').append(() => chart_6);
});

