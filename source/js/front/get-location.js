FormBuilder = FormBuilder || {};
FormBuilder.Front = FormBuilder.Front || {};

FormBuilder.Front.getLocation = (function ($) {

	var componentForm = {
	       	street_number: 	{autofillName : 'street-address',  addressType : 'short_name'},
	        route: 			{autofillName : 'street-address', addressType : 'short_name'},
	        locality: 		{autofillName : 'city', 		  addressType : 'long_name'},
	        postal_code: 	{autofillName : 'postal-code',    addressType : 'long_name'}
    	};

    function getLocation() {
        $(function() {
        	var locationButton = document.getElementById('form-get-location');
        	if (!navigator.geolocation || locationButton === null) {
				return;
			}

            this.handleEvents();
        }.bind(this));
    }

    getLocation.prototype.handleEvents = function() {
        $('#form-get-location').click(function(e) {
        	e.preventDefault();
            $target = $(e.target).parents('[class*="mod-form"]');
            $(e.target).find('.pricon').removeClass().addClass('spinner spinner-dark');

	        navigator.geolocation.getCurrentPosition(
	            function(position) {
			        var lat = position.coords.latitude,
			        	lng = position.coords.longitude,
			        	googleMapsPos = new google.maps.LatLng(lat, lng),
			        	googleMapsGeocoder = new google.maps.Geocoder();

						googleMapsGeocoder.geocode({'latLng': googleMapsPos},
						    function(results, status) {
						    	var fullAddress = [];

								if (status == google.maps.GeocoderStatus.OK && results[0]) {
							        // Get each component of the address from the place details and fill the form
							        for (var i = 0; i < results[0].address_components.length; i++) {
							         	var addressType = results[0].address_components[i].types[0];

							          	if (componentForm[addressType]) {
							            	var value = results[0].address_components[i][componentForm[addressType].addressType];
							            	$target.find('[name="address[' + componentForm[addressType].autofillName + ']"]').val(value);
							          	}

								       	// Combine street name and street number
						            	if (addressType == 'route') {
						            		fullAddress[0] = value;
						            	} else if(addressType == 'street_number') {
						            		fullAddress[1] = value;
						            	}
						            	$target.find('[name="address[street-address]"]').val(fullAddress.join(' '));
					            	}
								}
						});
				// Reset button icon
				$(e.target).find('.spinner').removeClass().addClass('pricon pricon-location-pin');
	            },
	            function() {
	            	// Show message if Geolocate went wrong
					$(e.target).html('<span><i class="pricon pricon-notice-warning"></i> ' + formbuilder.something_went_wrong + '</span>');
	            }
	        );
        }.bind(this));
    };

	return new getLocation();

})(jQuery);
