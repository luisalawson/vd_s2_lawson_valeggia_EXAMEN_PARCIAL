d3.csv('data/todos.csv', d3.autoType).then(data => {
  

  let chart_def_1 = Plot.plot({
    marginLeft: 230,
    marks: [
      Plot.barX(
        data,
        Plot.groupY(
          { x: "count" }, 
          {
            y: "categoria",
            sort: { y: "x", reverse: true },  
            fill: d => d.categoria === "LIMPIEZA Y RECOLECCIÓN" ? "#225EA8" : "#C7D9F1"        
          } 
        ),
      )
    ],
    y: {
      label: "",
      tickTransform: d => d.toLowerCase()
    },

  });

  d3.select('#chart_def_1').append(() => chart_def_1);

});




