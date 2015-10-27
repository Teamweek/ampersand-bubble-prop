# State mixin

exports.bubbleProp = do ->
  cache = {}
  (prop, name) ->
    if prop
      cached = cache[name]
      if cached
        @stopListening cached.prop, 'all', cached.handler
      handler = @_getEventBubblingHandler name
      @listenTo prop, 'all', handler
      cache[name] = {prop, handler}
