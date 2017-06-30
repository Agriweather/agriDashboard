var API = {
    'host': 'http://demo.smartdog.com.tw/agri/',
    'farm_get': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async:false,
            url: API.host + 'mobile/farm_get',
             
            type: 'GET',
            contentType:'application/json',
             
            success: function(json) {
                callback(json);
            }
        });
    }, // end farm_get function
    'farm_getDetail': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async: false,
            url: API.host + 'mobile/farm_get',
             
            type: 'GET',
            data:{
                id:conf.id
            },
            contentType:'application/json',
             
            success: function(json) {
                console.log(json);
                callback(json);
            }
        });
    }, // end farm_getDetail function
    'farm_delete': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async: false,
            url: API.host + 'mobile/farm_delete',
            type: 'POST',
            contentType:'application/json',
            data:{
                id:conf.id
            },
            success: function(json) {
                console.log(json);
                resp = json;
                callback(json);
            }
        });
    }, // end farm_delete function
    'farm_create': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async: false,
            url: API.host + 'mobile/farm',
            data: JSON.stringify(conf.data),
            type: 'POST',
            contentType:'application/json',
            
            success: function(json) {
                console.log(json);
                resp = json;
                callback(json);
            }
        });
    }, // end farm_create function
    'farm_update': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async: false,
            url: API.host + 'mobile/farm',
             
            contentType: 'application/json',
            data: JSON.stringify(conf.data),
            type: 'POST',
             
            success: function(json) {
                console.log(json);
                resp = json;
                callback(json);
            }
        });
    }, // end farm_update function
    'sensor_get': function(conf) {
        var callback = conf.callback;
        $.ajax({
            url: API.host + 'mobile/sensor_get',
             
            type: 'GET',
            contentType:'application/json',
             
            success: function(json) {
                console.log(json)
                callback(json);
            }
        });
    }, // end sensor_get function
    'sensor_getDetail': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async: false,
            url: API.host + 'mobile/sensor_get',
             
            type: 'GET',
            data:{
                id:conf.id
            },
            contentType:'application/json',
             
            success: function(json) {
                callback(json);
            }
        });
    }, // end sensor_getDetail function
    'sensor_create': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async: false,
             
            url: API.host + 'mobile/sensor',
            contentType: 'application/json',
            data: JSON.stringify(conf.data),
            type: 'POST',
            contentType:'application/json',
             
            success: function(json) {
                console.log(json);
                resp = json;
                callback(json);
            }
        });
    }, // end sensor_create function
    'sensor_update': function(conf) {
        console.log(JSON.stringify(conf.data));
        var callback = conf.callback;
        $.ajax({
            async: false,
             
            url: API.host + 'mobile/sensor_put',
            data: JSON.stringify(conf.data),
            type: 'POST',
            contentType:'application/json',
             
            success: function(json) {
                console.log(json)
                callback(json);
            }
        });
    }, // end sensor_update function
    'sensor_delete': function(conf) {
        var callback = conf.callback;
        $.ajax({
            async: false,
            url: API.host + 'mobile/sensor_delete',
            type: 'POST',
            contentType:'application/json',
            success: function(json) {
                console.log(json);
                resp = json;
                callback(json);
            }
        });
    }, // end sensor_delete function

}
