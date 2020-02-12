var map = L.map('mapid').on('load', onMapLoad).setView([41.4140756,2.1841405], 12);
//map.locate({setView: true, maxZoom: 17});
	
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];

function onMapLoad() {
	console.log("Mapa cargado");
	$.getJSON("http://localhost/mapa/api/apiRestaurants.php", function (result) {
		var kindFood=[];
		result.forEach(function (r) {
			data_markers.push(r);
			// filtro valores de kind_food y los vinculo a selector
			var auxKindFood=(r.kind_food).split(","); 
			auxKindFood.forEach(function (val){
					if (kindFood.indexOf(val) ===-1){
						kindFood.push(val);
						$('#kind_food_selector').append( '<option value='+val+">"+val+"</option>");
					};
			});
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