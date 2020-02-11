var map = L.map('mapid').on('load', onMapLoad).setView([41.4140756,2.1841405], 12);
//map.locate({setView: true, maxZoom: 17});
	
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];
function onMapLoad() {

	console.log("Mapa cargado");
	$.getJSON("http://localhost/mapa/api/apiRestaurants.php", function (result) {
		var newKindFood=[];
		result.forEach(function (r) {
/* 			console.log(JSON.stringify(r));
 */			data_markers.push(r);
			if(newKindFood.indexOf(r.kind_food)===-1){
				newKindFood.push(r.kind_food);
				$('#kind_food_selector').append( '<option value='+r.kind_food+">"+r.kind_food+"</option>");
			}
		});	
		 render_to_map(data_markers, 'all');
	});
}


$('#kind_food_selector').on('change', function() {
  console.log("selector======"+this.value);
  render_to_map(data_markers, this.value);
});


function render_to_map(data_markers,filter){
	markers.clearLayers();
	for (var i = 0; i < data_markers.length; i++) {
		var food=data_markers[i].kind_food;
		if(food.includes(filter)){
			console.log("food= "+food+" filter= "+filter);
			var marker = L.marker([data_markers[i].lat, data_markers[i].lng], data_markers[i].name);
			marker.addTo(markers);
			marker.bindPopup(data_markers[i].name);
		}
	}
	markers.addTo(map)
}

    /*
	FASE 3.1
		1) Relleno el data_markers con una petición a la api
		2) Añado de forma dinámica en el select los posibles tipos de restaurantes
		3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
	*/

	/*
	FASE 3.2
		1) Limpio todos los marcadores
		2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
	*/	
