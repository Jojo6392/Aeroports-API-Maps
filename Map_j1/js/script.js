
var MAP_API = {

	AVIATION_API_URL: "http://localhost:8888/API/api/airports",
	USER_API_URL: "http://localhost:8888/API/api/users",
	
	map : null,
	airports: null,
	icon: null,
	infoWindow: null,

	initMap : function () {

		this.buildMap();
		this.fetchData();
		this.eventsListener();
		this.handleConnexion()
	},

	buildMap : function () {

		var paris = { 
            lat: 48.8534, 
            lng: 2.3488 
        };

		this.map  = new google.maps.Map(document.getElementById("map"), {
			center: paris,
			zoom: 8,
			disableDoubleClickZoom: true
		});

		this.icon = {
            url: "./img/plane.svg",
            anchor: new google.maps.Point(10,20),
            scaledSize: new google.maps.Size(20,20)
        };
		
	},

	infoWindowAddAirport : function (event) {
		// Create a new InfoWindow.
		let infoWindow = new google.maps.InfoWindow({
			position: event.latLng,
		});
		const coords = event.latLng.toJSON()

		infoWindow.setContent(
		`
		<form id='form'>
			<p>Nom de l'aéroport : <input type='text' name='airport' required></p>
			<p>Longitude : <input type='number' name='lng' value='${coords.lng}' step="any" required></p>
			<p>Latitude : <input type='number' name='lat' value='${coords.lat}' step="any" required></p>
			<p><input type='submit' value='Créer' required></p>
		</form>
		`
		);
		infoWindow.open(this.map);
		
		// On crée le formulaire dans le contenu de la bulle directement ce qui crée un problème au moment
		// où je veux récupérer celui-ci dans la fonction "handleSubmit"
		// @params : Object data, String method
		// 1er paramètre vide car je récupère directement les données depuis le formulaire.
		setTimeout(() => {this.handleSubmit({},'POST')},1000)
	},

	// Fonction de récupération de tous les aéroports
	fetchData : function () {

		fetch(this.AVIATION_API_URL, {methods: 'GET'})
		.then(async (res) => {
			const datas = await res.json();
			datasLength = Object.keys(datas).length;
			for ( let i = 0; i < datasLength; i++) {
				this.appendElementToList(datas[i]);
			}
		})
	},

	// Fonction qui ajoute un aéroport à la liste des aéroports dans le front.
	// @param: Object airport
	appendElementToList : function ( airport ) {

		const airportsList = document.getElementById("airports-list");
		let airportList = document.createElement("li");
		airportList.innerHTML = 
		`<div>
			${airport.name}
			<img src="./img/edit.png" id="edit" alt="edit" width="16px" 
				data-name="${airport.name}"
				data-lat="${airport.latitude}"
				data-lng="${airport.longitude}"
				data-id="${airport.id}" />
			<img src="./img/delete.png" id="delete" alt="delete" width="16px" 
				data-id="${airport.id}"/>
		</div>`;

		// Au clic de l'item (aéroport) dans la liste, entraîne un focus sur l'item en question sur la map avec un petit zoom.
		airportList.addEventListener("click", () => {
			this.map.setCenter(position)
			this.map.setZoom(8);
		})

		// Ajout de l'élément 'aéroport' dans la liste des aéroports.
		airportsList.appendChild(airportList);

		// Ajout d'un marker sur la map qui correspond à l'aéroport qui est ajouté dans la liste.
		const position = {
			lat: Number(airport.latitude),
			lng: Number(airport.longitude)
		}
		this.appendMarkerToMap(position, airport)
		
	},

	// Fonction qui ajoute un marker sur la map
	// @param : Object position, Object airport
	appendMarkerToMap: function ( position, airport ) {
		const marker = new google.maps.Marker({
			position: position,
			map: this.map,
			icon: this.icon
		});

		const infowindow = new google.maps.InfoWindow({
			content: `L'aéroport se nomme ${airport.name}.`,
		});

		marker.addListener("click", () => {
			infowindow.open({
				anchor: marker,
				map,
				shouldFocus: false,
			  });
			  // Fermer la bulle d'info au bout de 2 secondes.
			  setTimeout(()=> {
				infowindow.close()
			},2000)
		});
	},

	// Fonction qui contient les écoutes des events qui n'ont pas besoin d'être dans une fonction en particulier. 
	eventsListener: function () {

		this.map.addListener('dblclick', (event) => {
			this.infoWindowAddAirport(event)
		})

		// Timeout pour avoir le temps de récupérer tout les boutons "edit" et "delete", provoque une erreur sinon.
		setTimeout( () => {
			const editBtns = document.querySelectorAll("#edit")
			for(let i = 0; i < editBtns.length; i++) {
				editBtns[i].addEventListener("click", (e) => {
					data = {
						id: e.target.dataset.id,
						name: e.target.dataset.name,
						lat: e.target.dataset.lat,
						lng: e.target.dataset.lng
					}
					this.handleSubmit(data, 'PUT')
				})
			}

			const deleteBtns = document.querySelectorAll("#delete")
			for(let i = 0; i < deleteBtns.length; i++) {
				deleteBtns[i].addEventListener("click", (e) => {

					const formDelete = document.getElementById("form-delete")
					formDelete.style.display = "block";
					const data = {
						id: e.target.dataset.id
					}
					this.handleSubmit(data, 'DELETE')
				})
			}
		},1000)
	},

	// Fonction qui gère l'ajout, la modification et la suppression d'aéroport.
	/*@param: Object, String */
	handleSubmit: function(data, method) {

		var initObject = { 
			method: method,
			mode: 'cors',
			headers: new Headers(),
			body: JSON.stringify(data),
		};

		if (method == "DELETE") {
			const confirmDelete = document.getElementById("confirmDelete")
			confirmDelete.addEventListener("click", ()=> {

				fetch( this.AVIATION_API_URL, initObject )
				.then(() => {
				})
			})

			const cancelDelete = document.getElementById("cancelDelete")
			cancelDelete.addEventListener("click", () => {
				const formDelete = document.getElementById("form-delete")
				formDelete.style.display = "none";
			})
		}

		else {

			// Accès aux informations du formulaire de mofification de l'aéroport.
			if(method == "PUT") this.editForm(data)

			// Timeout nécessaire pour récupérer les infos du formulaire de modification.
			setTimeout(() => {
				const editForm = document.getElementById("form")
				
				editForm.addEventListener("submit", (e) => {
					var elements = document.getElementById("form").elements;
					
					let newData = {}
					for(var i = 0 ; i < elements.length ; i++){
						var item = elements.item(i);
						newData[item.name] = item.value;
					}

					// ID nécessaire si c'est une modification dans les données qu'on envoie
					if(method == "PUT") newData["id"] = data.id

					// Mise à jour des données à envoyer car celles-ci sont actuellement les anciennes.
					initObject["body"] = JSON.stringify(newData)

					fetch( this.AVIATION_API_URL, initObject )
					.then(() => {
					})
					e.preventDefault()
				})
			}, 1000)
		}
	},


	// Fonction qui affiche le formulaire de modification qui a besoin des données de l'aéroport à modifier en paramètre.
	// @param: Object datas
	editForm: function(datas) {

		const position = {
			lat: Number(datas.lat),
			lng: Number(datas.lng)
		}

		let infoWindow = new google.maps.InfoWindow({
			position: position
		});

		infoWindow.setContent(
		`
		<form id='form'>
			<p>Nom de l'aéroport : <input type='text' name='airport' value="${datas.name}" required></p>
			<p>Longitude : <input type='number' name='lng' value='${datas.lng}' step="any" required></p>
			<p>Latitude : <input type='number' name='lat' value='${datas.lat}' step="any" required></p>
			<p><input type='submit' value='Modifier' required></p>
		</form>
		`
		);
		infoWindow.open(this.map);

		// Timeout pour avoir le temps de récupérer les données du formulaire créer dans la bulle d'information. 
		setTimeout(() => {this.handleSubmit()},1000)
	},

	handleConnexion: function() {
		const formConnexion = document.getElementById("connexion")

		formConnexion.addEventListener("submit", (event) => {
			event.preventDefault()

		})

		var elements = formConnexion.elements;
					
		let data = {}
		for(var i = 0 ; i < elements.length ; i++){
			var item = elements.item(i);
			data[item.name] = item.value;
		}

		var initObject = { 
			method: 'GET',
			mode: 'cors',
			headers: new Headers(),
			body: JSON.stringify(data),
		};

		fetch( this.USER_API_URL, initObject )
		.then(() => {	
		})
	},
}
