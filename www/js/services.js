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

    function lineStops (mode, line) {}

    function lines (mode, name) {}

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
    disruptionModes: disruptionModes
  };

}]);
