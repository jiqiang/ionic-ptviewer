/**
 * PTViewer services.
 */
angular.module('ptviewer.services', [])

.factory('ptvtt', ['$http', function ($http) {
  var developerId = '1000433',

    securityKey = '3e644583-fced-11e4-9dfa-061817890ad2',

    baseUrl = 'http://timetableapi.ptv.vic.gov.au';

    function hash (request) {
      var shaObj = new jsSHA("SHA-1", "TEXT");
      shaObj.setHMACKey(securityKey, "TEXT");
      shaObj.update(request);
      return shaObj.getHMAC("HEX");
    }

    function httpBuildQuery (data) {
      var memo = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          memo.push(encodeURI(key) + '=' + encodeURI(data[key]));
        }
      }
      return memo.join('&');
    }

    function endpoint (request, data) {
      data.devid = developerId;
      var signature = hash(request + '?' + httpBuildQuery(data));
      data.signature = signature;
      var memo = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          memo.push(encodeURI(key) + '=' + encodeURI(data[key]));
        }
      }

      return baseUrl + request + '?' + memo.join('&');
    }

    function call (endpoint) {
      return $http({
        method: 'GET',
        url: endpoint,
        timeout: 15000
      });
    }

    function healthCheck () {
      var data = {timestamp: moment.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')};
      return call(endpoint('/v2/healthcheck', data));
    }

    function stopNearby (lat, lng) {}

    function poi (lat1, lng1, lat2, lng2, grid_depth, limit, poi_types) {}

    function search (text) {}

    function broadNextDeparture (mode, stop, limit) {}

    function specificNextDepartures (mode, line, stop, direction, limit, datetime) {}

    function stoppingPattern (mode, run, stop, datetime) {}

    function lineStops (mode, line) {
      return call(
        endpoint(
          '/v2/mode/@mode/line/@line/stops-for-line'
            .replace(/@mode/g, mode)
            .replace(/@line/g, line),
          {}
        )
      );
    }

    function lines (mode) {
      return call(
        endpoint('/v2/lines/mode/@mode'.replace(/@mode/g, mode), {})
      );
    }

    function disruptions (modes) {
      return call(
        endpoint(
          '/v2/disruptions/modes/@modes'.replace(/@modes/g, modes.join(',')),
          {}
        )
      );
    }

    function disruptionModes () {
      return [
        {key: 'general', name: 'General', checked: true},
        {key: 'metro-bus', name: 'Metro bus', checked: true},
        {key: 'metro-tram', name: 'Metro tram', checked: true},
        {key: 'metro-train', name: 'Metro train', checked: true},
        {key: 'regional-bus', name: 'Regional bus', checked: true},
        {key: 'regional-coach', name: 'Regional coach', checked: true},
        {key: 'regional-train', name: 'Regional train', checked: true}
      ];
    }

    function lineModes () {
      return [
        {value: 0, name: 'Train (metropolitan)'},
        {value: 1, name: 'Tram'},
        {value: 2, name: 'Bus (metropolitan and regional)'},
        {value: 3, name: 'V/Line train and coach'},
        {value: 4, name: 'NightRider'}
      ];
    }

  return {
    healthCheck: healthCheck,
    stopNearby: stopNearby,
    poi: poi,
    search: search,
    broadNextDeparture: broadNextDeparture,
    specificNextDepartures: specificNextDepartures,
    stoppingPattern: stoppingPattern,
    lineStops: lineStops,
    lines: lines,
    disruptions: disruptions,
    disruptionModes: disruptionModes,
    lineModes: lineModes
  };

}])

.factory('ptvmap', [function () {

  function addMarker (coordinate, map) {
    var marker = new google.maps.Marker({
      position: coordinate,
      map: map
    });
  }

  function render (element, coordinates) {
    var map = new google.maps.Map(document.getElementById('line_map'), {
      zoom: 12,
      center: coordinates[0],
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      streetViewControl: false,
      mapTypeControl: false
    });

    for (var i = 0; i < coordinates.length; i++) {
      addMarker(coordinates[i], map);
    }
  }

  return {
    render: render
  }
}]);
