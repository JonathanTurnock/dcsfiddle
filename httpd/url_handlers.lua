httpd.url_handlers = {}

httpd.url_handlers["^/$"] = function(request, response)
    response:return_text("UP")
end

httpd.url_handlers["^/health$"] = function(requst, response)
    res = {}
    res.status = "UP"
    res.version = httpd.version
    response:return_json(res)
end

httpd.url_handlers["^/api$"] = function(request, response)
    local commandstring = from_base64(request._GET["command"])

    env.info("Executing command:" .. commandstring)

    local result = assert(loadstring(commandstring))()

    response:return_json(result)
end