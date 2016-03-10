/********************************************
 * === REST Actions
 *
 * Defines the AJAX calls for different
 * REST actions.
 *
 *******************************************/

export function index(url, normalizeFunc) {
  const def = $.Deferred();

  $.ajax({
    url: url,
    dataType: 'json',
    type: 'GET'
  }).then(
    function( data, response ){ def.resolve( normalizeFunc(data) ); },
    function( data ){ def.reject( normalizeFunc(data) ); }
  );

  return def;
}

export function create(content, url, normalizeFunc) {
  const def = $.Deferred();

  $.ajax({
    url: url,
    dataType: 'json',
    type: 'POST',
    data: content
  }).then(
    function( data, response ){ def.resolve( normalizeFunc(data) ); },
    function( data ){ def.reject( normalizeFunc(data) ); }
  );

  return def;
}

export function update(content, url, normalizeFunc) {
  const def = $.Deferred();

  $.ajax({
    url: url,
    dataType: 'json',
    type: 'PUT',
    data: content
  }).then(
    function( data, response ){ def.resolve( normalizeFunc(data) ); },
    function( data ){ def.reject( normalizeFunc(data) ); }
  );

  return def;
}

export function destroy(url) {
  const def = $.Deferred();

  $.ajax({
    url: url,
    dataType: 'json',
    type: 'DELETE'
  }).then(
    function( data, response ){ def.resolve(); },
    function( data ){ def.reject(); }
  );

  return def;
}
