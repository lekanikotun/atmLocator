(function() {

    var _app = {

        id : "atmLocator",

        init: function () {

            this.setEventObjects();

        },

        processAction: function() {

            if (App.Config.actionProcessed) return

            App.Config.actionProcessed = true;
            App.Models.atmLocator.cb = App.Views.atmLocator.render;
            App.Services.getATMLocations();

        },

        eof: true

    }

    $.extend( App, _app );

}())

Container.wakeUp();
