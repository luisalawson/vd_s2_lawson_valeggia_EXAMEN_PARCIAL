d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  const domiciliosFiltrados = ['PALERMO', 'MATADEROS', 'VILLA PUEYRREDON', 'FLORESTA','CABALLITO','VILLA URQUIZA'];
  dataFiltrada = data.filter(d => domiciliosFiltrados.includes(d.domicilio_barrio));
  let chart = Plot.plot({
    width: 850, // Increase the chart width
    height: 700, // Increase the chart height
    font: 'Poppins', // Set font family to P
    marginLeft: 120,
    marks:[
    Plot.barY(
      dataFiltrada, 
      Plot.groupX(
      {y:"count"},
      {x:'domicilio_barrio',
       fill: d => d.estado_del_contacto === "Cerrado" ? "#225EA8" : "#E8F2FC"        
    }
      )),
      Plot.text(
        dataFiltrada,
        Plot.groupX(
          {y: "count", text: d => `${((d.filter(e => e.estado_del_contacto === 'Cerrado').length / d.length) * 100).toFixed(0)}%`},
          {x:'domicilio_barrio',
           //fill: d => d.estado_del_contacto === "Cerrado" ? "#225EA8" : "#EBECF0" ,  
           dy: 40,
           fontSize: 15,
           fontWeight: 'bold'     
        }
          ),
      )
    ],
    color:{
      legend: true,
    },
    y:{
      label: "",
      ticks: 0
     
    },
    x:{
      label: ""
    },
  }
  );
  d3.select('#chart_def_3').append(() => chart);
});
