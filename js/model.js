var dashboard = $.extend(dashboard, {
    model: {
        host: '../../../',
        farm_get: function(conf) {
            var resp;

            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/farm',

                type: 'GET',
                contentType: 'application/json',

                success: function(json) {
                    resp = json;
                }
            });
            // resp = JSON.parse('{"success":true,"data":[{"ID":4,"Name":"宜蘭測試田","CreateDatetime":"2017-07-25","CropName":"短期葉菜","SensorCount":2}]}');
            return resp;
        }, // end farm_get function

        farm_getDetail: function(conf) {
            var id = conf.id;
            var resp;
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/farm/' + id,
                type: 'GET',
                contentType: 'application/json',

                success: function(json) {
                    resp = json;
                }
            });

            // resp = JSON.parse('{"success":true,"data":{"ID":4,"Name":"宜蘭測試田","CreateDatetime":"2017-07-25","AFA":false,"AcivitySensor":[{"ID":5,"Name":"AgriWeather1"},{"ID":6,"Name":"AgriWeather2"}],"Sensor":[],"AcivityCrop":[{"ID":13,"Name":"短期葉菜"}],"Crop":[{"ID":13,"Name":"短期葉菜"},{"ID":14,"Name":"雜糧"},{"ID":15,"Name":"包葉菜"},{"ID":16,"Name":"米"},{"ID":17,"Name":"根莖菜"},{"ID":18,"Name":"花菜"},{"ID":19,"Name":"蕈菜"},{"ID":20,"Name":"果菜"},{"ID":21,"Name":"瓜菜"},{"ID":22,"Name":"豆菜"}],"AcivityChart":[{"ID":5,"Name":"濕度監測圖"},{"ID":6,"Name":"溫度監測圖"}],"Chart":[{"ID":5,"Name":"濕度監測圖"},{"ID":6,"Name":"溫度監測圖"}],"Slider":true}}');
            return resp;
        }, // end farm_getDetail function

        farm_getDefault: function() {
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/AgriDefaultData',
                type: 'POST',
                contentType: 'application/json',
                success: function(json) {
                    resp = json;
                }
            });

            // resp = JSON.parse('{"success":true,"data":{"Crop":[{"ID":13,"Name":"短期葉菜"},{"ID":14,"Name":"雜糧"},{"ID":15,"Name":"包葉菜"},{"ID":16,"Name":"米"},{"ID":17,"Name":"根莖菜"},{"ID":18,"Name":"花菜"},{"ID":19,"Name":"蕈菜"},{"ID":20,"Name":"果菜"},{"ID":21,"Name":"瓜菜"},{"ID":22,"Name":"豆菜"}],"Sensor":[{"ID":5,"Name":"AgriWeather1","ColumnCount":0},{"ID":6,"Name":"AgriWeather2","ColumnCount":0}],"Chart":[{"ID":5,"Name":"濕度監測圖"},{"ID":6,"Name":"溫度監測圖"}]}}');
            return resp;
        },

        farm_put: function(conf) {
            var obj = conf.obj;
            console.log(JSON.stringify(obj));
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/farm',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function(json) {
                    console.log(json);
                }
            });

        }, // end farm_put function

        farm_post: function(conf) {
            var obj = conf.obj;
            console.log(JSON.stringify(obj));
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/farm',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function(json) {
                    console.log(json);
                }
            });

        }, // end farm_put function

        farm_delete: function(conf) {
            var id = conf.id;
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/farm/' + id,
                type: 'DELETE',
                success: function(json) {
                    console.log(json);
                }
            });

        }, // end farm_put function

        sensor_get: function(conf) {
            var resp;
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/sensor',
                type: 'GET',
                contentType: 'application/json',

                success: function(json) {
                    resp = json;
                }
            });


            // resp = JSON.parse('{"success":true,"data":[{"ID":5,"Name":"AgriWeather1","ColumnCount":4},{"ID":6,"Name":"AgriWeather2","ColumnCount":4}]}');
            return resp;
        }, // end sensor_get function

        sensor_getDetail: function(conf) {
            var resp,
                id = conf.id
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/sensor/' + id,
                type: 'GET',
                contentType: 'application/json',

                success: function(json) {
                    resp = json;
                }
            });

            // resp = JSON.parse('{"success":true,"data":{"ID":5,"Name":"AgriWeather1","ActivityColumns":[{"ID":23,"ColumnID":5,"Name":"溫度-深層"},{"ID":25,"ColumnID":6,"Name":"溫度-淺層"},{"ID":27,"ColumnID":7,"Name":"濕度-深層"},{"ID":29,"ColumnID":8,"Name":"濕度-淺層"}],"Columns":[{"ID":5,"ColumnID":0,"Name":"溫度-深層"},{"ID":6,"ColumnID":0,"Name":"溫度-淺層"},{"ID":7,"ColumnID":0,"Name":"濕度-深層"},{"ID":8,"ColumnID":0,"Name":"濕度-淺層"}]}}');
            return resp;
        },

        sensor_post: function(conf) {
            var obj = conf.obj;
            console.log(JSON.stringify(obj));
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/sensor',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function(json) {
                    console.log(json);
                }
            });
        }, // end sensor_post function

        sensor_put: function(conf) {
            var obj = conf.obj;
            console.log(JSON.stringify(obj));
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/sensor',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function(json) {
                    console.log(json);
                }
            });
        }, // end sensor_put function

        sensor_delete: function(conf) {
            var id = conf.id;
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/sensor/' + id,
                type: 'DELETE',
                success: function(json) {
                    console.log(json);
                }
            });
        },

        sensor_default: function() {
            var resp;
            $.ajax({
                async: false,
                url: dashboard.model.host + 'mobile/sensorDefault',
                type: 'POST',
                success: function(json) {
                    resp = json;
                    console.log(json);
                }
            });

            resp = JSON.parse('{"success":true,"data":{"Columns":[{"ID":5,"ColumnID":0,"Name":"溫度-深層"},{"ID":6,"ColumnID":0,"Name":"溫度-淺層"},{"ID":7,"ColumnID":0,"Name":"濕度-深層"},{"ID":8,"ColumnID":0,"Name":"濕度-淺層"}]}}');
            return resp;
        },

        weather_get: function(conf) {
            var resp;
            // $.ajax({
            //     async: false,
            //     url: dashboard.model.host + 'mobile/sensor',
            //     type: 'GET',
            //     contentType: 'application/json',

            //     success: function(json) {
            //         resp = json;
            //     }
            // });


            resp = JSON.parse('{"success":true,"data":[{"ID":5,"Name":"氣象預報1","StationName":"測站1"},{"ID":10,"Name":"氣象預報2","StationName":"測站5"}]}');
            return resp;
        }, // end sensor_get function

        weather_getDetail: function(conf) {
            var resp,
                id = conf.id
            // $.ajax({
            //     async: false,
            //     url: dashboard.model.host + 'mobile/sensor/' + id,
            //     type: 'GET',
            //     contentType: 'application/json',

            //     success: function(json) {
            //         resp = json;
            //     }
            // });

            resp = JSON.parse('{"success":true,"data":{"ID":5,"Name":"氣象預報1","StationName":"測站1"},"Lat":23,"Lon":121,"StationID":123}');
            return resp;
        },

        weather_post: function(conf) {
            var obj = conf.obj;
            console.log(JSON.stringify(obj));
            // $.ajax({
            //     async: false,
            //     url: dashboard.model.host + 'mobile/sensor',
            //     type: 'POST',
            //     contentType: 'application/json',
            //     data: JSON.stringify(obj),
            //     success: function(json) {
            //         console.log(json);
            //     }
            // });
        }, // end sensor_post function

        weather_put: function(conf) {
            var obj = conf.obj;
            console.log(JSON.stringify(obj));
            // $.ajax({
            //     async: false,
            //     url: dashboard.model.host + 'mobile/sensor',
            //     type: 'PUT',
            //     contentType: 'application/json',
            //     data: JSON.stringify(obj),
            //     success: function(json) {
            //         console.log(json);
            //     }
            // });
        }, // end sensor_put function

        weather_delete: function(conf) {
            var id = conf.id;
            // $.ajax({
            //     async: false,
            //     url: dashboard.model.host + 'mobile/sensor/' + id,
            //     type: 'DELETE',
            //     success: function(json) {
            //         console.log(json);
            //     }
            // });
        },
        sonsor_data_chart:function(conf){
            var resp;

            $.ajax({
                async: false,
                url : dashboard.model.host + 'mobile/AgriSensorData',
                type: 'POST',
                data: JSON.stringify(conf.data),
                contentType: 'application/json',

                success: function(json){
                    resp = json;
                }

            });
            return resp;
        }




    }
});