
var MAP_API = {

	AVIATION_API_URL: "http://api.aviationstack.com/v1/airports?access_key=a2d018a0ef8c07caebee19bf97c2bc14",
	
	map : null,
	airports: null,
	icon: null,

	initMap : function () {

		this.buildMap();
		this.fetchData();
	},

	buildMap : function () {

		var paris = { 
            lat: 48.8534, 
            lng: 2.3488 
        };

		this.map  = new google.maps.Map(document.getElementById("map"), {
			center: paris,
			zoom: 8,
		});

		this.icon = {
            url: "./img/plane.svg",
            anchor: new google.maps.Point(10,20),
            scaledSize: new google.maps.Size(20,20)
        };
		
	},

	fetchData : function () {
		fetch(this.AVIATION_API_URL)
		.then(async (res) => {
			const datas = await res.json()
			for ( let i = 0; i < datas.data.length; i++) {
				this.appendElementToList(datas.data[i]);
			}
		})
	},

	appendElementToList : function ( airport ) {

		const airportsList = document.getElementById("airports-list");
		let airportList = document.createElement("li");
		airportList.innerText = airport.airport_name;

		airportList.addEventListener("click", () => {
			this.map.setCenter(position)
			this.map.setZoom(8);
		})
		airportsList.appendChild(airportList);

		const position = {
			lat: Number(airport.latitude),
			lng: Number(airport.longitude)
		}
		this.appendMarkerToMap(position, airport)
		
	},

	appendMarkerToMap: function ( position, airport ) {
		const marker = new google.maps.Marker({
			position: position,
			map: this.map,
			icon: this.icon
		});

		const infowindow = new google.maps.InfoWindow({
			content: `L'aéroport se nomme ${airport.airport_name} et est situé dans le pays nommé ${airport.country_name}.`,
		});

		marker.addListener("click", () => {
			infowindow.open({
				anchor: marker,
				map,
				shouldFocus: false,
			  });
			  setTimeout(()=> {
				infowindow.close()
			},2000)
		});
	}
}
