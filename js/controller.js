var controller = {
    target: {},
    init: function(target, nav) {
        controller.target = target;
        
        $(nav).find('li>a').each(function(i, ele) {
            switch ($(ele).attr('nav-target')) {
                case 'monitor':
                    $(ele).on('click', controller.monitor_page);
                    break;
                case 'farm':
                    $(ele).on('click', function(e){
                    	e.preventDefault();
                    	controller.farm_page()
                    });
                    break;
                case 'sensor':
                	$(ele).on('click', controller.sensor_page);
                    break;
                case 'crop':
                    break;

            }
        })

    },
    farm_page: function() {
    	controller.target.empty();
        API.farm_get({
            callback: function(farm_json) {
                if (farm_json.hasOwnProperty('success') && farm_json.success == true) {
                    group = display.createTableView({
                        data: farm_json.data,
                        callback: function() {},
                        target: controller.target,
                        addBtn: true,
                        type:'normal'
                    });
                }
            }
        });
    },
    monitor_page:function(){
    	controller.target.empty();
    	API.farm_get({
            callback: function(farm_json) {
                if (farm_json.hasOwnProperty('success') && farm_json.success == true) {
                    group = display.createTableView({
                        data: farm_json.data,
                        callback: function() {},
                        target: controller.target,
                        addBtn: false,
                        type:'monitor'
                    });
                }
            }
        });
    },
    sensor_page:function(){
    	controller.target.empty();
    	API.sensor_get({
            callback: function(sensor_json) {
                if (sensor_json.hasOwnProperty('success') && sensor_json.success == true) {
                    group = display.createTableView({
                        data: sensor_json.data,
                        callback: function() {},
                        target: controller.target,
                        addBtn: false,
                        type:'sensor'
                    });
                }
            }
        });
    },
    crop_page:function(){
    	controller.target.empty();
    }

}
