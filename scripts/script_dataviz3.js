
d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  const domiciliosFiltrados = ['PALERMO', 'MATADEROS', 'VILLA PUEYRREDON', 'FLORESTA','CABALLITO','VILLA URQUIZA'];
  dataFiltrada = data.filter(d => domiciliosFiltrados.includes(d.domicilio_barrio));
  let chart = Plot.plot({
    width:750, // Increase the chart width
    height: 600, // Increase the chart height
    font: 'Poppins', // Set font family to P
    marginLeft: 120,
    marks:[
    Plot.barY(
      dataFiltrada, 
      Plot.groupX(
      {y:"count"},
      {x:'domicilio_barrio',
      //fill: d => d.estado_del_contacto === "Cerrado" ? "#225EA8" : "#E8F2FC", 
       //fill: d => d.domicilio_barrio === "MATADEROS" ? "#C71C39" : "#E8F2FC", 

       fill: function(d) {
        if (d.estado_del_contacto === 'Cerrado') {
          if (d.domicilio_barrio === 'MATADEROS') {
            return '#1CA24D'; // Rojo si el barrio es Mataderos
            
          } else if (d.domicilio_barrio === 'PALERMO') {
            return '#C71C39'; // Verde si el barrio es Palermo
          } else {
            return '#B6B6B6'; // Gris oscuro si el estado es Cerrado pero el barrio no es Mataderos ni Palermo
          }
        } 
        else if(d.estado_del_contacto === 'Abierto') {
          if (d.domicilio_barrio === 'MATADEROS') {
            return '#D6F0E0'; // Rojo si el barrio es Mataderos
            
          } else if (d.domicilio_barrio === 'PALERMO') {
            return '#FEE8EE'; // Verde si el barrio es Palermo
          }
          else {
            return '#EAEAEA'; // Gris muy claro si el estado es Abierto
          }
        }
      }
      
      }
      )),
      Plot.text(
        dataFiltrada,
        Plot.groupX(
          {y: "count", text: d => `${((d.filter(e => e.estado_del_contacto === 'Cerrado').length / d.length) * 100).toFixed(0)}%`},
          {x:'domicilio_barrio',
          
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
    y: {
      label: "",
      ticks: 0,
    },    
    x: {
      label: "",
      tickSize: 10,
      tickPadding: 10,
    },
    
  }
  );
  d3.select('#chart_def_3').append(() => chart);
});
