d3.csv('data/todos.csv', d3.autoType).then(data => {
    let chart_def_1 = Plot.plot({
      marginBottom: 150,
    y: {
      grid: true,
      label: 'Categoria'
    },
    x:{
        label: 'Cantidad',
        tickRotate: -45
    },
    marks: [
      Plot.barY(data, Plot.groupX({y: "count"}, {x: 'categoria'})),
    ]
  });
  d3.select('#chart_def_1').append(() => chart_def_1);
});

