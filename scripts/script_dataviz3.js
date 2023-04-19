d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  const domiciliosFiltrados = ['PALERMO', 'MATADEROS', 'VILLA PUEYRREDON', 'FLORESTA'];
  const dataFiltrada = data.filter(d => domiciliosFiltrados.includes(d.domicilio_barrio));
  
  let chart = Plot.plot({
    marginLeft: 120,
    marks:[
    Plot.barX(
      dataFiltrada, 
      Plot.groupY(
      {x:"count"},
      {y:'domicilio_barrio',

       fill: d => d.estado_del_contacto === "Abierto" ? "#225EA8" : "#C7D9F1"        

    }
      )),
    ],
   
    color:{
      legend: true,
    },
    y:{
      label: ""
    },
    x:{
      label: ""
    },
  }
  );
  d3.select('#chart_def_3').append(() => chart);
});
