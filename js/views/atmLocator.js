App.Views.atmLocator = {

    el: '.targetContent',

    template: _.template(Util.getTemplate('atmLocator')),

    viewName: 'atmLocator',

    data:{},

    events: function(){

        $('.atmLocator').on('click', '.atmList .toggleTabs li', this.filter)
        $('.atmLocator').on('click', '.atmSection .directions', this.getDirections)
        $('.atmLocator').on('click', '.atmList .goSearch', this.getATMByZip )
        $('.atmLocator').on('submit', '.atmList .searchBox form', this.getATMByZip )
    },

    init: function(){

        this.events()

    },

    render: function () {

        var self = App.Views.atmLocator

        if (App.Models.atmLocator.data.display) {

            $(self.el).html( self.template( App.Models.atmLocator.data.display ))
            delete App.Models.atmLocator.data.display
            self.init()

        } else {

            App.Services.getATMLocations()

        }

    },

    getATMByZip: function(e) {

        e.preventDefault()
        var zip = $('.searchField').val()
        App.Views.layout.slideReset()
        App.Services.getATMs(zip)

    },

    filter: function(e) {

        var $el = $(e.currentTarget)

        var t = $el.data('tab')

        if (t === 'all') {

            $('.atmSection').show()

        } else if (t === 'reload') {

            $('.reload').show()
            $('.atm').hide()

        } else if (t === 'atm'){

            $('.atm').show()
            $('.reload').hide()

        }

        var count = $('.atmSection').filter(':visible').length

        $('.atmList .count').text(count)

    },

    getMap: function(latlon) {

        var ExternalResourceAction = {
            "ExternalResourceAction": {
                "resourceURI": 'https://maps.google.com/?q=' + latlon,
                "title": "Show Map",
                "message": "Open Map on Safari",
                "ok": "Map",
                "cancel": "Cancel",
                "actions": {
                    "iOS": [
                        {
                            "title": "Apple Map",
                            "resourceURI": "https://maps.apple.com/?q=" + latlon
                        },
                        {
                            "title": "Google Map",
                            "resourceURI": "comgooglemaps-x-callback://?q=" + latlon + "&zoom=14&x-success=link"
                        },
                        {
                            "title": "Safari",
                            "resourceURI": "https://maps.google.com/?q=" + latlon
                        },
                        {
                            "title": "Cancel"
                        }
                    ],
                    "Android": [
                        {
                            "title": "Google Map",
                            "resourceURI": "https://maps.apple.com/?q=" + latlon
                        },
                        {
                            "title": "geo-URI",
                            "resourceURI": latlon
                        },
                        {
                            "title": "Cancel"
                        }
                    ]
                }
            },
            "type": "ExternalResourceAction"
        }

        Container.Action.processAction(ExternalResourceAction, false, false);
    },

    eof: true

}