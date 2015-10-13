(function() {

    var _models = {

// -------------------------------------------------------------- //
// ---                                                        --- //
// ---                         ATM Locator                    --- //
// ---                                                        --- //
// -------------------------------------------------------------- //

        atmLocator: {

            data:{},

            set: function(resp) {

                var d = App.Models.parse(resp);

                if (d.atmLocator) {

                    this.data.display = this.orchestrate(d);
                    this.cb();
                }

            },

            orchestrate: function(d) {

                var self = this;

                var arr = [];
                $.each(d.atmLocator, function(j, atm) {

                    $.each(atm.locations, function(i, l) {

                        var data = {};

                        data['labelName'] = l.labelName ? l.labelName : '';

                        if (atm.locationType) {
                            var locationType = atm.locationType;
                            data['typeCode'] = locationType.code ? locationType.code : '';
                            data['typeLabel'] = locationType.labelName ? locationType.labelName : '';
                        }

                        if (l.coordinate) {
                            data['latitude'] = l.coordinate.latitude ? l.coordinate.latitude : '';
                            data['longitude'] = l.coordinate.longitude ? l.coordinate.longitude : '';
                        }

                        if (l.distance) {
                            data['unitCode'] = l.distance.unitCode ? l.distance.unitCode.substring(0,2) : '';
                            data['distance'] = l.distance.unitValue ? l.distance.unitValue : '';
                        }

                        if (l.address) {

                            var address = self.flatten(l.address, {});

                            var addr = [];
                            var lineOne, lineTwo = '';

                            if (address.lineOne)    {
                                addr.push(address.lineOne);
                                lineOne = address.lineOne;

                            }

                            if (address.cityName)   {
                                addr.push(address.cityName);
                                lineTwo = address.cityName + ', ';
                            }

                            if (address.code) {
                                addr.push(address.code);
                                lineTwo += address.code + ', ';
                            }

                            if (address.postalCode) {
                                addr.push(address.postalCode);
                                lineTwo += address.postalCode;
                            }

                            data['address'] = addr.join(', ');

                            data['addLO'] = lineOne;
                            data['addLT'] = lineTwo;

                        }


                        arr.push(data);
                    })
                })

                //sort by distance
                arr.sort(function (a, b) {
                    return a - b;
                });

                return { atms : arr };

            },

            flatten: function(d, obj) {
                var self = this;
                for (var key in d) {
                    if (d.hasOwnProperty(key)) {
                        if (typeof d[key] === 'object') {
                            self.flatten(d[key], obj);
                        } else {
                            obj[key] = d[key];
                        }
                    }
                }

                return obj;
            }

        },

        eof: true

    }

    $.extend( App.Models, _models );

}());

