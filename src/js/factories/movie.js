angular
  .module("discovereel")
  .factory("Movie", Movie);

Movie.$inject = ["$resource", "API"];
function Movie($resource, API) {
  return $resource(`${API}/movies/:id`, { id: "@_id" }, {
    'query':  { method: "GET", isArray: true },
    'update': { method: "PUT" },
  });
}
