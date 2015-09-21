
(function() {


    var _services = {

        // -------------------------------------------------------------- //
        // ---                                                        --- //
        // ---                        ATM Locator                     --- //
        // ---                                                        --- //
        // -------------------------------------------------------------- //

        getATMLocations: function() {

            var self = this

            var success = function(position) {

                console.log(position)

                var latitude = position.coords.latitude.toFixed(6)
                var longitude = position.coords.longitude.toFixed(6)

                App.Models.atmLocator.data.coords = { latitude: latitude, longitude: longitude }

                self.getATMs(latitude, longitude)

            }

            var error = function(err) {

                App.Models.atmLocator.data.display = { atms: false, errorMsg: App.Lang.PCD_geoLocationError }
                App.Views.atmLocator.render()

            }

            Container.Geolocation.getLocation( success, error )

        },

        getATMs: function(val1, val2) {

            var url

            if (arguments.length == 1) {

                url = App.Models.paycard.data.display.atmLocator + '?postal=' + val1 + '&rad=10m&limit=20&type=atm,reload'

            } else {

                url = App.Models.paycard.data.display.atmLocator + '?latitude=' + val1 + '&longitude=' + val2 + '&rad=10m&limit=20&type=atm,reload'
            }

            var RESTRequest = {
                RESTRequest: {
                    method: 'GET',
                    URI:    url
                }
            }

            var onRESTSuccess = function(resp) {

                App.Models.atmLocator.set(resp)

            }

            var onRESTError = function(err) {

                var r = App.Services.parseSORMessage(err)
                App.Models.atmLocator.data.display = { atms: false, errorMsg: r }
                App.Views.atmLocator.render()

            }

            Container.REST.invoke( RESTRequest, onRESTSuccess, onRESTError )
        },

        eof:true


    };


    $.extend( App.Services, _services )


}());