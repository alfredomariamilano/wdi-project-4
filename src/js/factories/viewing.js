angular
  .module('discovereel')
  .factory('Viewing', Viewing);

Viewing.$inject = ['$resource', 'API'];
function Viewing($resource, API) {
  return $resource(`${API}/viewings/:id`, { id: '@_id' }, {
    'query': { method: 'GET', isArray: true },
    'update': { method: 'PUT' }
  });
}
