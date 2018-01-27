(function (context) {
    context.W = context.W || {};

    var W = context.W;

    W.Leaflet = function () {
        const tileUrl = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}";
        const accessToken = "pk.eyJ1Ijoid2VpZXl1YW4iLCJhIjoiY2o4NnI3MDgzMGV2NjMzbXRwcG8yMnRxeCJ9.5-Or95mUtT6521sXBp1-Tw";

        this.map;

        this.init = function (strDomId, options) {
            //init map
            this.map = L.map(strDomId, {
                center: options.center,
                zoom: options.zoom,
                preferCanvas: true
            });

            //init tileLayer
            L.tileLayer(tileUrl, {
                id: "mapbox.streets",
                accessToken: accessToken
            }).addTo(this.map);
        };
    };

})(this);