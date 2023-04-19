d3.csv('data/todos.csv', d3.autoType).then(data => {
  const domiciliosFiltrados = ['LIMPIEZA Y RECOLECCIÓN', 'TRÁNSITO', 'CALLES Y VEREDAS', 'ARBOLADO Y ESPACIOS VERDES','TRÁMITES Y SERVICIOS','ORDENAMIENTO DEL ESPACIO PÚBLICO','MEDIOS DE TRANSPORTE','ALUMBRADO', 'RECICLADO Y PROTECCIÓN AMBIENTAL','CONTROL EDILICIO','FISCALIZACIÓN ACTIVIDADES COMERCIALES','BARRIOS EMERGENTES'];
  dataFiltrada = data.filter(d => domiciliosFiltrados.includes(d.categoria));
  let chart_def_1 = Plot.plot({
    width: 1000, // Increase the chart width
    height: 600, // Increase the chart height
    font: 'Poppins', // Set font family to Poppins
    marginLeft: 230,
    marks: [
      Plot.barX(
        dataFiltrada,
        Plot.groupY(
          { x: "count" }, 
          {
            y: "categoria",
            sort: { y: "x", reverse: true },  
            fill: d => d.categoria === "LIMPIEZA Y RECOLECCIÓN" ? "#225EA8" : "#C7D9F1"        
          } 
        ), 
      ),
      Plot.text(
        dataFiltrada,
        Plot.groupY(
          { x: "count", text:"count" }, 
          {
            y: "categoria",
            //fill: d => d.categoria === "LIMPIEZA Y RECOLECCIÓN" ? "#225EA8" : "#C7D9F1"        ,
            sort: { y: "x", reverse: true },  
            dx: 30,
            fontSize: 15,
            fontWeight: 'bold'
          } 
        ), 
      )
    ],
    y: {
      label: "",
      tickTransform: d => d.toLowerCase()
    },
    x: {
      domain:[0,4500]
    },

  });

  d3.select('#chart_def_1').append(() => chart_def_1);

});




