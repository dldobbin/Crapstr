$(document).ready(function() {
	var map;
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
	    var pooButton = $('<div class="control" style="zIndex: 1;">poo</div>');
	    pooButton.click(function() {
	    	if (!pooButton.hasClass('selected')) {
	    		$('.selected').removeClass('selected');
	    		pooButton.addClass('selected');

	    		clearMarkers();

	    		placeKnownMarkers();

	    		map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
	    	}
	    });
	    var searchButton = $('<div class="control" style="zIndex: 1;">search</div>');
	    searchButton.click(function() {
	    	if (!searchButton.hasClass('selected')) {
	    		$('.selected').removeClass('selected');
	    		searchButton.addClass('selected');

	    		clearMarkers();

	    		if (!searchBar) {
	    			searchBar = $('<div class="control">'
	    							+ '<form>'
	    								+ '<input type="text" />'
	    								+ '<input type="submit" value="Search" />'
	    							+ '</form>'
	    						+ '</div>');
	    			searchBar.children().submit(function(event) {
	    				event.preventDefault();
	    				clearMarkers();
						var service = new google.maps.places.PlacesService(map);
					    var request = {
					    	location: map.getCenter(),
					    	radius: 5000,
					    	keyword: $(this).children('input[type=text]')[0].value
					    };
					    service.radarSearch(request, function(results, status) {
					    	if (status == google.maps.places.PlacesServiceStatus.OK) {
					    		results.forEach(function(result) {
					    			createToilet(result.geometry.location, result.place_id);
					    		});
					    	}
					    });
	    			});
	    		}

	    		map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchBar[0]);
	    	}
	    });
	    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchButton[0]);
	    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(pooButton[0]);

		pooButton.click();
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
				content = $("<div class='infowindow_container'>" + content + "<div class='button'>Add Review</div></div>");
				content.children('.button').click(function() {
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
		var content = $("<div class='infowindow_container'>"
						+ "<div class='rating star-0'>"
							+ "<div></div>"
							+ "<div></div>"
							+ "<div></div>"
							+ "<div></div>"
							+ "<div></div>"
						+ "</div>"
						+ "<p><b>Description</b>: <input type='text' /></p>"
						+ "<div class='cancel button'>Cancel</div>"
						+ "<div class='submit button'>Submit</div>"
					  + "</div>");
		var rating = 0;
		content.find('.rating div').mouseover(function() {
			content.children('.rating').removeClass().addClass('rating star-' + String($(this).index() + 1));
		});
		content.find('.rating div').mouseout(function() {
			content.children('.rating').removeClass().addClass('rating star-' + rating);
		});
		content.find('.rating div').click(function() {
			rating = $(this).index() + 1;
		});
		
		content.find('.cancel').click(function() {
			infowindow.setContent(oldContent);
		});
		
		content.find('.submit').click(function() {
			console.log({placeId: placeId, desc: content.find('input[type=text]')[0].value, rating: rating, isNew: isNew});
		});

		infowindow.setContent(content[0]);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
});