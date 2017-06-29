var API = {
    'host': 'http://demo.smartdog.com.tw/agri/',
    'farm_get': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async:false,
            url: API.host + 'mobile/farm',
            jsonp:'callback',
            type: 'GET',
            contentType:'application/json',
            dataType:'jsonp',
            success: function(json) {
                callback(json);
            }
        });
    }, // end farm_get function
    'farm_getDetail': function(conf) {
        $.ajax({
            async: false,
            url: API.host + 'mobile/farm/' + conf.id,
            type: 'GET',
            success: function(json) {
                console.log(json);
                resp = json;
            }
        });
    }, // end farm_getDetail function
    'farm_delete': function(conf) {
        $.ajax({
            async: false,
            url: API.host + 'mobile/farm' + conf.id,
            type: 'DELETE',
            success: function(json) {
                console.log(json);
                resp = json;
            }
        });
    }, // end farm_delete function
    'farm_create': function(conf) {
        $.ajax({
            async: false,
            url: API.host + 'mobile/farm',
            contentType: 'application/json',
            data: JSON.stringify(conf.data),
            type: 'POST',
            success: function(json) {
                console.log(json);
                resp = json;
            }
        });
    }, // end farm_create function
    'farm_update': function(conf) {
        $.ajax({
            async: false,
            url: API.host + 'mobile/farm',
            contentType: 'application/json',
            data: JSON.stringify(conf.data),
            type: 'PUT',
            success: function(json) {
                console.log(json);
                resp = json;
            }
        });
    }, // end farm_update function
    'sensor_get': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async:false,
            url: API.host + 'mobile/sensor',
            jsonp:'callback',
            type: 'GET',
            contentType:'application/json',
            dataType:'jsonp',
            success: function(json) {
                callback(json);
            }
        });
    }, // end sensor_get function
    'sensor_getDetail': function(conf) {
        $.ajax({
            async: false,
            url: API.host + 'mobile/sensor' + conf.id,
            type: 'GET',
            success: function(json) {
                console.log(json);
                resp = json;
            }
        });
    }, // end sensor_getDetail function
    'sensor_create': function(conf) {
        $.ajax({
            async: false,
            url: API.host + 'mobile/sensor',
            contentType: 'application/json',
            data: JSON.stringify(conf.data),
            type: 'POST',
            success: function(json) {
                console.log(json);
                resp = json;
            }
        });
    }, // end sensor_create function
    'sensor_update': function(conf) {
        $.ajax({
            async: false,
            url: API.host + 'mobile/sensor',
            contentType: 'application/json',
            data: JSON.stringify(conf.data),
            type: 'PUT',
            success: function(json) {
                console.log(json);
                resp = json;
            }
        });
    }, // end sensor_update function
    'sensor_delete': function(conf) {
        $.ajax({
            async: false,
            url: API.host + 'mobile/sensor',
            type: 'DELETE',
            success: function(json) {
                console.log(json);
                resp = json;
            }
        });
    }, // end sensor_delete function

}
