var prevWindowOnError = window.onerror;
window.onerror = function(message, url, line, col, error) {
  line = line || 0;
  col = col || 0;

  if(error) {
    var stack = getNormalizedStacktrace(error);
  } else {
    var stack = 'window@'+url+':'+line+':'+col;
  }

  var now = Date.now();
  Kadira.trackError({
    appId : Kadira.options.appId,
    name : message,
    source : 'client',
    startTime : now,
    type : 'window.onerror',
    info : getBrowserInfo(),
    stacks : [{at: now, events: [], stack: stack}],
    count: 1,
  });

  if(prevWindowOnError && typeof prevWindowOnError === 'function') {
    prevWindowOnError(message, url, line, col, error);
  }
}