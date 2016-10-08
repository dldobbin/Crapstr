$(document).ready(function() {
	/*var map;
	var markers = [];
	var infowindow = new google.maps.InfoWindow();
	var searchBar;
	function initialize() {
		//Create map
	    var mapOptions = {
	      zoom: 15,
	      center: new google.maps.LatLng(41.8762686,-87.6322661),
	      clickableIcons: false,
	      mapTypeControl: false
	    };
	    map = new google.maps.Map(document.getElementById('map-canvas'),
	        mapOptions);

	    //Add controls
	    var pooButton = createControl('poo');
	    pooButton.addEventListener('click', function() {
	    	if (!$(pooButton).hasClass('selected')) {
	    		$('.selected').removeClass('selected');
	    		$(pooButton).addClass('selected');

	    		clearMarkers();

	    		placeKnownMarkers();

	    		map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
	    	}
	    });
	    var searchButton = createControl('search');
	    searchButton.addEventListener('click', function() {
	    	if (!$(searchButton).hasClass('selected')) {
	    		$('.selected').removeClass('selected');
	    		$(searchButton).addClass('selected');

	    		clearMarkers();

	    		if (!searchBar) {
	    			searchBar = document.createElement('div');
	    			$(searchBar).addClass('control');
	    			var searchField = document.createElement('input');
	    			searchField.type = 'text';
	    			searchBar.appendChild(searchField);
	    			var button = document.createElement('input');
	    			button.type = 'button';
	    			button.value = 'Search';
	    			button.addEventListener('click', function() {
	    				clearMarkers();
						var service = new google.maps.places.PlacesService(map);
					    var request = {
					    	location: map.getCenter(),
					    	radius: 5000,
					    	keyword: searchField.value
					    };
					    service.radarSearch(request, function(results, status) {
					    	if (status == google.maps.places.PlacesServiceStatus.OK) {
					    		results.forEach(function(result) {
					    			createToilet(result.geometry.location, result.place_id);
					    		});
					    	}
					    });
	    			});
	    			searchBar.appendChild(button);
	    		}

	    		map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchBar);
	    	}
	    });
	    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchButton);
	    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(pooButton);

		$(pooButton).click();
	}

	function createControl(label) {
		var d = document.createElement('div');
		$(d).addClass('control');
		$(d).text(label);
		d.index = 1;
		return d;
	}

	function placeKnownMarkers() {
		var sql = 'SELECT * FROM 1l58quwTJ_4GHi7azXgEDSjUweIro3z3c_Tdll4QC WHERE ST_INTERSECTS(location,CIRCLE(LATLNG' + map.getCenter() + ',5000))';
		var url = 'https://www.googleapis.com/fusiontables/v1/query?sql=' + sql + '&key=AIzaSyCWJcO-gIheo7bBxqkBh1y-5ZCo1BBiuaE';

		$.ajax({
			url: url,
			dataType: 'json'
		}).done(function(data) {
			(data.rows || []).forEach(function(row) {
				[lat,lng] = row[1].split(',');
				createToilet(new google.maps.LatLng(lat,lng), row[0]);
			});
		});
	}

	function createToilet(loc, placeId) {
		var marker = new google.maps.Marker({
			position: loc,
			icon: "static/graylet.png",
			map: map
		});
		markers.push(marker);

		google.maps.event.addListener(marker,'click',function() {
			var sql = "SELECT * FROM 1nKtjFslKAKR59eYsCCW8vbpeznAJeqe_7ZFS3KL1 WHERE placeId='" + placeId + "'";
			var url = 'https://www.googleapis.com/fusiontables/v1/query?sql=' + sql + '&key=AIzaSyCWJcO-gIheo7bBxqkBh1y-5ZCo1BBiuaE';

			$.ajax({
				url: url,
				dataType: 'json'
			}).done(function(data) {
				var content = '';
				var total = 0;
				var isNew = false;
				if (data.rows) {
					data.rows.forEach(function(row) {
						content += "<hr><div><p class='rating star-" + row[1] + "'/><p><b>Description</b>: " + row[2] + "</p></div>";
						total += Number(row[1]);
					});
					content = "<div><p class='rating star-" + String(Math.round(2*total/data.rows.length)/2).replace('.','-') + "'/></div>" + content;
				} else {
					content = "No reviews yet! Be the first to review this terlet!";
					isNew = true;
				}
				content = $("<div class='infowindow_container'>" + content + "</div>");
				var add_button = document.createElement('div');
				$(add_button).addClass('add_button');
				$(add_button).text('Add Review');
				content.append(add_button);
				add_button.addEventListener('click', function() {
					createSubmissionForm(content[0], isNew, placeId);
				});
				infowindow.setContent(content[0]);
				infowindow.open(map,marker);
			});
		});
	}

	function clearMarkers() {
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
	}

	function createSubmissionForm(oldContent, isNew, placeId) {
		var content = $("<div class='infowindow_container'></div>");
		var ratingElement = document.createElement('p');
		var rating = 0;
		ratingElement.className = 'rating star-0';
		for (var i = 4; i >= 0; i--) {
			(function(iCopy) {
				var d = document.createElement('div');
				d.addEventListener('mouseover', function() {
					ratingElement.className = 'rating star-' + String(5-iCopy);
				});
				d.addEventListener('mouseout', function() {
					ratingElement.className = 'rating star-' + String(rating);
				});
				d.addEventListener('click', function() {
					rating = 5-iCopy;
				});
				$(ratingElement).append(d);
			}(i));
		};
		content.append(ratingElement);
		var des_element = $("<p><b>Description</b>: </p>")[0];
		var input = $("<input type='text'/>")[0];
		$(des_element).append(input);
		content.append(des_element);

		var cancel_button = document.createElement('div');
		$(cancel_button).addClass('add_button');
		$(cancel_button).text('Cancel');
		cancel_button.addEventListener('click', function() {
			infowindow.setContent(oldContent);
		});
		content.append(cancel_button);

		var submit_button = document.createElement('div');
		$(submit_button).addClass('add_button');
		$(submit_button).text('Submit');
		submit_button.addEventListener('click', function() {
			console.log({placeId: placeId, desc: input.value, rating: rating, isNew: isNew});
		});
		content.append(submit_button);

		infowindow.setContent(content[0]);
	}

	google.maps.event.addDomListener(window, 'load', initialize);*/
});