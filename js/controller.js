var dashboard = $.extend(dashboard, {
    controller: {
        infowindow: null,
        init: function(conf) {
            var action = conf.action,
                target = conf.target;
            target.empty();
            target.css('min-height', $(window).height())
            if (action == 'farm') {
                dashboard.controller.createFarmList({
                    target: target
                })
            } else if (action == 'sensor') {
                dashboard.controller.createSensorList({
                    target: target
                })
            } else if (action == 'monitor') {
                // dashboard.controller.initChart({
                //     target: target
                // });
                dashboard.controller.get_ChartData({
                    target: target
                }).then(function(data) {
                    return dashboard.controller.init_carousel(data);
                }).then(function(data) {
                    // console.log('3');
                    // $.each(data.SensorChartJSON,function(i,obj){
                    //     dashboard.controller.initChart({
                    //         target:'carousel'+i,
                    //         json:obj
                    //     });
                    // });
                    dashboard.controller.initChart({
                        target: 'carousel' + 1,
                        temp: data.SensorChartJSON,
                        humidity: data.HumidityChartJSON
                    });
                });
            } else if (action == 'weather') {
                dashboard.controller.createWeatherList({
                    target: target
                })
            } else if(action == 'about'){
                target.empty();
                target.append('<iframe id="about_frame" src="about/about.html" frameborder="0"></iframe>');
                $('#about_frame').width('100%');

            }
        },
        createSensorList: function(conf) {
            var target = conf.target;
            var row = $('<div class="row" style="padding-top:20px;"></div>').appendTo(target);
            var SensorJson = dashboard.model.sensor_get();
            var addBtn;
            if (SensorJson.success) {
                addBtn = $('<div class="col-12 col-sm-6 col-md-4 add-card"><span class="add-btn"><i class="fa fa-plus-circle fa-4x" aria-hidden="true"></i></span></div>').appendTo(row);
                var data = SensorJson.data;
                $.each(data, function(i, obj) {
                    var contentStr = dashboard.display.createCardContent({
                        iconImg: 'fa-thermometer-three-quarters',
                        content: [{
                            icon: 'fa-server',
                            label: '感測欄位',
                            text: obj.ColumnCount
                        }]
                    });
                    var card = dashboard.display.createCard({
                        title: obj.Name,
                        hasBtn: true,
                        deleteBtn: true,
                        btnText: '編輯',
                        attr: [{
                            key: 'sensor-id',
                            val: obj.ID
                        }, {
                            key: 'action',
                            val: 'edit'
                        }],
                        content: contentStr
                    });
                    row.append(card);
                })

                row.find('.card .card-footer .delete-btn').on('click', function() {
                    var id = $(this).parent().attr('sensor-id');
                    dashboard.display.displayModal({
                        content: function() { return '<span>確認要刪除？</span>' },
                        title: '刪除Sensor',
                        btnText: '刪除',
                        param: { id: id },
                        callback: function(param) {
                            //TODO: delete farm
                            dashboard.model.sensor_delete({ id: param.id });
                            dashboard.display.closeModal();
                            target.empty();
                            dashboard.controller.createSensorList({ target: target });
                        }
                    });
                })

                addBtn.find('span').on('click', function(ev) {
                    dashboard.controller.editSensor({
                        target: target,
                        id: $(this).parent().attr('sensor-id'),
                        action: 'add'
                    })
                })
                target.find('.card-btn').on('click', function(ev) {
                    dashboard.controller.editSensor({
                        target: target,
                        id: $(this).attr('sensor-id'),
                        action: $(this).attr('action')
                    })

                })
            } else {
                alert('get farm error');
            }
        },
        createWeatherList: function(conf) {
            var target = conf.target;
            var row = $('<div class="row" style="padding-top:20px;"></div>').appendTo(target);
            var WeatherJson = dashboard.model.weather_get();
            if (WeatherJson.success) {
                var data = WeatherJson.data;
                addBtn = $('<div class="col-12 col-sm-6 col-md-4 add-card"><span class="add-btn"><i class="fa fa-plus-circle fa-4x" aria-hidden="true"></i></span></div>').appendTo(row);
                addBtn.find('span').on('click', function(ev) {
                    dashboard.controller.editWeather({
                        target: target,
                        id: '',
                        action: 'add'
                    })
                });
                $.each(data, function(i, obj) {
                    var contentStr = dashboard.display.createCardContent({
                        iconImg: 'fa-sun-o',
                        content: []
                    });
                    var card = dashboard.display.createCard({
                        title: obj.StationName,
                        hasBtn: true,
                        deleteBtn: true,
                        btnText: '編輯',
                        attr: [{
                            key: 'weather-id',
                            val: obj.ID
                        }, {
                            key: 'action',
                            val: 'edit'
                        }],
                        content: contentStr
                    });

                    row.append(card);
                });

                row.find('.card .card-footer .delete-btn').on('click', function() {
                    var id = $(this).parent().attr('weather-id');
                    dashboard.display.displayModal({
                        content: function() { return '<span>確認要刪除？</span>' },
                        title: '刪除氣象預報',
                        btnText: '刪除',
                        param: { id: id },
                        callback: function(param) {
                            //TODO: delete farm
                            dashboard.model.weather_delete({ id: param.id });
                            dashboard.display.closeModal();
                        }
                    });
                })

                target.find('.card-btn').on('click', function(ev) {
                    dashboard.controller.editWeather({
                        target: target,
                        id: $(this).attr('weather-id'),
                        action: $(this).attr('action')
                    })

                })
            } else {
                alert('get weather error');
            }
        },
        createFarmList: function(conf) {
            var target = conf.target;
            var row = $('<div class="row" style="padding-top:20px;"></div>').appendTo(target);
            var FarmJson = dashboard.model.farm_get();
            var addBtn;
            if (FarmJson.success) {
                var data = FarmJson.data;
                addBtn = $('<div class="col-12 col-sm-6 col-md-4 add-card"><span class="add-btn"><i class="fa fa-plus-circle fa-4x" aria-hidden="true"></i></span></div>').appendTo(row);
                $.each(data, function(i, obj) {
                    var contentStr = dashboard.display.createCardContent({
                        iconImg: 'fa-tree',
                        content: [{
                            icon: 'fa-shower',
                            label: '正在種植',
                            text: obj.CropName
                        }, {
                            icon: 'fa-thermometer-full',
                            label: '感測器總成',
                            text: obj.SensorCount
                        }, {
                            icon: 'fa-calendar',
                            label: '',
                            text: obj.CreateDatetime
                        }]
                    });
                    var card = dashboard.display.createCard({
                        title: obj.Name,
                        hasBtn: true,
                        deleteBtn: true,
                        btnText: '編輯',
                        attr: [{
                            key: 'farm-id',
                            val: obj.ID
                        }, {
                            key: 'action',
                            val: 'edit'
                        }],
                        content: contentStr
                    });
                    row.append(card);
                });
                row.find('.card .card-footer .delete-btn').on('click', function() {
                    var id = $(this).parent().attr('farm-id');
                    dashboard.display.displayModal({
                        content: function() { return '<span>確認要刪除？</span>' },
                        title: '刪除Farm',
                        btnText: '刪除',
                        param: { id: id },
                        callback: function(param) {
                            //TODO: delete farm
                            dashboard.model.farm_delete({ id: param.id });
                            dashboard.display.closeModal();
                        }
                    });
                })
                addBtn.find('span').on('click', function(ev) {
                    dashboard.controller.editFarm({
                        target: target,
                        id: '',
                        action: 'add'
                    })
                })

                target.find('.card-btn').on('click', function(ev) {
                    dashboard.controller.editFarm({
                        target: target,
                        id: $(this).attr('farm-id'),
                        action: $(this).attr('action')
                    })

                })
            } else {
                alert('get farm error');
            }
        },


        editSensor: function(conf) {
            var action = conf.action,
                id = action == 'edit' ? conf.id : '',
                target = conf.target;
            var list_id = ['ActivityColumns', 'Columns'];
            target.empty();
            var setting_row = $('<div class="row setting_block"></div>').appendTo(target);
            setting_row.append('<div class="input-group"> <span class="input-group-addon" id="basic-addon1">Name</span> <input type="text" id="name" class="form-control" placeholder="type name..." aria-describedby="basic-addon1"> </div>');
            setting_row.append('<div class="btn-group" role="group" ><button type="button" id="btn_back" class="btn btn-secondary">返回</button><button type="button" id="btn_save" class="btn btn-primary">儲存</button></div>')
            $('#btn_back').on('click', function() {
                $('#navbarNavDropdown > ul > li.nav-item.dropdown > div > a:nth-child(2)').trigger('click');
            });

            $('#btn_save').on('click', function() {
                dashboard.controller.saveSensor({ id: id, action: action });
                $('#navbarNavDropdown > ul > li.nav-item.dropdown > div > a:nth-child(2)').trigger('click');
            });
            if (action == 'edit') {

                sensorJSON = dashboard.model.sensor_getDetail({ id: id });
                if (sensorJSON.success) {
                    data = sensorJSON.data;
                    setting_row.find('#name').val(data.Name);
                } else {
                    alert('get Sensor detail error');
                }
            } else if (action == 'add') {
                sensorJSON = dashboard.model.sensor_default();
                if (sensorJSON.success) {
                    data = $.extend({
                        ActivityColumns: []
                    }, sensorJSON.data);
                } else {
                    alert('get Sensor detail error');
                }
            }


            // create list block
            lists_row = $('<div class="row lists_block"></div>').appendTo(target);
            $.each(list_id, function(i, str) {
                $('<div class="col-12 col-md-6" id="' + str + '"><div class="card"> <div class="card-header">' + str + '</div> <div class="card-block"><ul class="list list-group"></ul></div></div>').appendTo(lists_row);
                var templete = '';

                if (str.includes('Activity'))
                    templete = '<li class="list-group-item" style="text-align:center"><span class="Name opt_id"></span><a class="listitemBtn" style="float:right"><i class="fa fa-minus-square fa-2x" aria-hidden="true" style="color:red"></i></a></li>';
                else
                    templete = '<li class="list-group-item" style="text-align:center"><span class="Name opt_id"></span><a class="listitemBtn" style="float:right"><i class="fa fa-plus-square fa-2x" aria-hidden="true" ></i></a></li>';
                var options = {
                    valueNames: ['Name', { name: 'opt_id', attr: 'opt_id' }, { name: 'listitemBtn', attr: 'target-ul' }],
                    item: templete
                }
                var values = [];
                $.each(data[str], function(index, obj) {
                    var ul_id = str.includes('Activity') ? str.slice(8) : 'Activity' + str;
                    values.push($.extend(obj, { opt_id: obj.ID, listitemBtn: ul_id }));
                })
                var hackerList = new List(str, options, values);
            });
            lists_row.find('a.listitemBtn').on('click', function(event) {
                var ulID = $(this).attr('target-ul');
                $(this).attr('target-ul', $(this).parents('.col-12.col-md-6').attr('id'));
                var ele = $($(this).parents('li').detach())
                ele.appendTo(lists_row.find('#' + ulID + ' ul'));
                var icon = ele.find('.listitemBtn i');
                if (icon.hasClass('fa-minus-square')) {
                    icon.removeClass('fa-minus-square');
                    icon.addClass('fa-plus-square');
                    icon.css('color', 'black');
                } else {
                    icon.removeClass('fa-plus-square');
                    icon.addClass('fa-minus-square');
                    icon.css('color', 'red');
                }

            })



        }, // end editSensor function

        editFarm: function(conf) {
            var action = conf.action,
                id = action == 'edit' ? conf.id : '',
                target = conf.target;
            var list_id = ['ActivitySensor', 'Sensor', 'ActivityCrop', 'Crop', 'ActivityChart', 'Chart'];
            target.empty();

            var setting_row = $('<div class="row setting_block"></div>').appendTo(target);
            var setting_group = $('<div class="col-12 col-md-4 basic_setting"></div>').appendTo(setting_row);;
            var map_sec = $('<div class="col-12 col-md-8 map-section"><input id="pac-input" class="controls" type="text" placeholder="請輸入位址.."><div id="map"></div></div>').appendTo(setting_row);
            setting_group.append('<div class="input-group"><span class="input-group-addon" id="basic-addon1">Name</span><input type="text" id="name" class="form-control" placeholder="type name..." aria-describedby="basic-addon1"></div>');
            setting_group.append('<div class="input-group"><span class= id="basic-addon2">是否加入輪播</span><select id="slider" class="form-control form-control-md"><option value="Y">是</option><option value="N">否</option></select></div>');
            setting_group.append('<div class="lat-lng-title">農田位置設定</div><div class="input-group"> <span class="input-group-addon" id="basic-addon2">Lat</span> <input type="number" step="0.000001" id="lat" class="form-control" placeholder="Lat" aria-describedby="basic-addon2"> </div><div class="input-group"> <span class="input-group-addon" id="basic-addon2">Lng</span> <input type="number" step="0.000001" id="lng" class="form-control" placeholder="Lng" aria-describedby="basic-addon3"> </div>')
            setting_group.append('<div class="btn-group" role="group" ><button type="button" id="btn_back" class="btn btn-secondary">返回</button><button type="button" id="btn_save" class="btn btn-primary">儲存</button></div>')
            var map = dashboard.controller.initMap({ target: map_sec });

            $('input#lat,input#lng').on('keyup', function() {
                map.setCenter({ lat: parseInt($('#lat').val()), lng: parseInt($('#lng').val()) });
            })

            $('#btn_back').on('click', function() {
                $('#navbarNavDropdown > ul > li.nav-item.dropdown > div > a:nth-child(1)').trigger('click');
            });

            $('#btn_save').on('click', function() {
                dashboard.controller.saveFarm({ id: id, action: action });
                $('#navbarNavDropdown > ul > li.nav-item.dropdown > div > a:nth-child(1)').trigger('click');
            });

            if (action == 'edit') {
                // create list block
                farmJSON = dashboard.model.farm_getDetail({ id: id });
                if (farmJSON.success) {
                    console.log(farmJSON.data);
                    data = farmJSON.data;
                    setting_group.find('#name').val(data.Name);
                    setting_group.find('#slider').val(data.Slider ? 'Y' : 'N');

                    $('#lat').val(data.Lat);
                    $('#lng').val(data.Lon);
                    $('#lng').trigger('keyup');

                } else {
                    alert('get farm detail error');
                }
            } else if (action == 'add') {
                farmJSON = dashboard.model.farm_getDefault();
                if (farmJSON.success) {
                    data = $.extend({
                        ActivitySensor: [],
                        ActivityCrop: [],
                        ActivityChart: []
                    }, farmJSON.data)
                }
            }


            lists_row = $('<div class="row lists_block"></div>').appendTo(target);
            $.each(list_id, function(i, str) {
                $('<div class="col-12 col-md-6" id="' + str + '"><div class="card"> <div class="card-header">' + str + '</div> <div class="card-block"><ul class="list list-group"></ul></div></div>').appendTo(lists_row);
                var templete = '';

                if (str.includes('Activity'))
                    templete = '<li class="list-group-item" style="text-align:center"><span class="Name opt_id"></span><a class="listitemBtn" style="float:right"><i class="fa fa-minus-square fa-2x" aria-hidden="true" style="color:red"></i></a></li>';
                else
                    templete = '<li class="list-group-item" style="text-align:center"><span class="Name opt_id"></span><a class="listitemBtn" style="float:right"><i class="fa fa-plus-square fa-2x" aria-hidden="true" ></i></a></li>';
                var options = {
                    valueNames: ['Name', { name: 'opt_id', attr: 'opt_id' }, { name: 'listitemBtn', attr: 'target-ul' }],
                    item: templete
                }
                var values = [];
                $.each(data[str], function(index, obj) {
                    var ul_id = str.includes('Activity') ? str.slice(8) : 'Activity' + str;
                    values.push($.extend(obj, { opt_id: obj.ID, listitemBtn: ul_id }));
                })
                var hackerList = new List(str, options, values);
            });
            lists_row.find('a.listitemBtn').on('click', function(event) {
                var ulID = $(this).attr('target-ul');
                $(this).attr('target-ul', $(this).parents('.col-12.col-md-6').attr('id'));
                var ele = $($(this).parents('li').detach())
                ele.appendTo(lists_row.find('#' + ulID + ' ul'));
                var icon = ele.find('.listitemBtn i');
                if (icon.hasClass('fa-minus-square')) {
                    icon.removeClass('fa-minus-square');
                    icon.addClass('fa-plus-square');
                    icon.css('color', 'black');
                } else {
                    icon.removeClass('fa-plus-square');
                    icon.addClass('fa-minus-square');
                    icon.css('color', 'red');
                }

            })



        },
        saveFarm: function(conf) {
            var saveObj = {};
            saveObj.Name = $('#name').val();
            saveObj.Slider = $('#slider').val() == 'Y' ? true : false;
            saveObj.Lat = parseInt($('#lat').val());
            saveObj.Lon = parseInt($('#lng').val());
            saveObj.AFA = false;
            if (conf.id != '')
                saveObj.ID = parseInt(conf.id);
            var list_id = ['ActivitySensor', 'Sensor', 'ActivityCrop', 'Crop', 'ActivityChart', 'Chart'];

            $.each(list_id, function(i, ele) {
                var arr = []
                $('#' + ele + ' ul .Name.opt_id').each(function(index, e) {
                    arr.push({ ID: $(e).attr('opt_id'), Name: $(e).text() })
                })
                if (arr.length > 0)
                    saveObj[ele] = arr;
                else
                    saveObj[ele] = null;
            })

            console.log(saveObj);
            if (conf.action == 'edit')
                dashboard.model.farm_put({ obj: saveObj });
            else if (conf.action == 'add')
                dashboard.model.farm_post({ obj: saveObj });
        },

        saveSensor: function(conf) {
            var saveObj = {};
            var action = conf.action;
            saveObj.Name = $('#name').val();
            if (conf.id != '')
                saveObj.ID = parseInt(conf.id);
            var list_id = ['ActivityColumns', 'Columns'];

            $.each(list_id, function(i, ele) {
                var arr = []
                $('#' + ele + ' ul .Name.opt_id').each(function(index, e) {
                    arr.push({ ID: $(e).attr('opt_id'), Name: $(e).text() })
                })
                if (arr.length > 0)
                    saveObj[ele] = arr;
                else
                    saveObj[ele] = null;
            })

            console.log(saveObj);
            if (action == 'add')
                dashboard.model.sensor_post({ obj: saveObj });
            else
                dashboard.model.sensor_put({ obj: saveObj });
        },
        editWeather: function(conf) {
            var action = conf.action,
                id = action == 'edit' ? conf.id : '',
                target = conf.target;
            target.empty();

            var setting_row = $('<div class="row setting_block"></div>').appendTo(target);
            var setting_group = $('<div class="col-12 col-md-4 basic_setting"></div>').appendTo(setting_row);;
            var map_sec = $('<div class="col-12 col-md-8 map-section"><input id="pac-input" class="controls" type="text" placeholder="請輸入位址.."><div id="map"></div></div>').appendTo(setting_row);
            setting_group.append('<div class="station_div">選擇測站：</div><div class="input-group"> <select  id="station_select" class="form-control"><option>請選擇</option></div>')
            setting_group.append('<div class="btn-group" role="group" ><button type="button" id="btn_back" class="btn btn-secondary">返回</button><button type="button" id="btn_save" class="btn btn-primary">儲存</button></div>')
            var map = dashboard.controller.initMap({ target: map_sec });

            var station_arr = dashboard.model.get_stations().data;
            var station_marker = [];
            $('.centerMarker').remove();
            var bounds = new google.maps.LatLngBounds();

            $.each(station_arr, function(i, obj) {
                var opt = '<option value="' + obj.Station_id + '">' + obj.StationName + '</option>';
                $(opt).appendTo($('#station_select'));
                var marker = new google.maps.Marker({
                    position: { lat: obj.Lat, lng: obj.Lon },
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                    title: obj.Station_id
                });

                bounds.extend({ lat: obj.Lat, lng: obj.Lon });
                var content = '<div id="marker-content">' +
                    '<div id="title"><h2">' + obj.StationName + '</h2>' +
                    '</div></div>';
                var infowindow = new google.maps.InfoWindow({
                    content: content
                });
                marker.addListener('click', function() {
                    if (dashboard.infowindow != null)
                        dashboard.infowindow.close();
                    infowindow.open(map, marker);
                    dashboard.infowindow = infowindow;
                    console.log($(this)[0]);
                    map.setCenter($(this)[0].position);

                    $('#station_select').val($(this)[0].title);
                });
                station_marker.push(marker);
            });
            map.fitBounds(bounds);

            $('#station_select').on('change', function(i, ele) {
                var id = $(this).val();
                var target_marker = null;
                $.each(station_marker, function(i, marker) {
                    if (marker.title == id)
                        target_marker = marker;
                })
                if (target_marker != null)
                    new google.maps.event.trigger(target_marker, 'click');
            });




            if (action == 'edit') {
                var default_val = dashboard.model.weather_getDetail({ id: id });
                $('#station_select').val(default_val.Station_id);
                $('#station_select').trigger('change');

            }

            $('#btn_back').on('click', function() {
                $('#navbarNavDropdown > ul > li.nav-item.dropdown > div > a:nth-child(3)').trigger('click');
            });

            $('#btn_save').on('click', function() {
                dashboard.controller.saveFarm({ id: id, action: action });
                $('#navbarNavDropdown > ul > li.nav-item.dropdown > div > a:nth-child(3)').trigger('click');
            });

        }, // end editWeather function
        initMap: function(conf) {
            var target = conf.target;

            var map = new google.maps.Map(target.find('#map')[0], {
                center: { lat: 25.043658, lng: 121.542024 },
                zoom: 8,
                scaleControl: true,
                scrollwheel: true,
                navigationControl: false,
                streetViewControl: false,
                mapTypeControl: false,

            });
            var input = target.find('#pac-input')[0];
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();
                if (places.length == 0) {
                    return;
                }
                places = [places[0]];
                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
                google.maps.event.trigger(map, 'drag');
            });

            target.find('#map').append('<div class="centerMarker"></div>');
            map.addListener('drag', function() {
                $('.basic_setting').find('#lat').val(map.getCenter().lat());
                $('.basic_setting').find('#lng').val(map.getCenter().lng());
            })
            google.maps.event.trigger(map, 'drag');

            var positionControlDiv = document.createElement('div');
            var positionControl = new PositionControl(positionControlDiv, map);
            positionControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(positionControlDiv);


            // create custom control
            function PositionControl(controlDiv, map) {

                // Set CSS for the control border.
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#fff';
                controlUI.style.border = '2px solid #fff';
                controlUI.style.borderRadius = '3px';
                controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI.style.cursor = 'pointer';
                controlUI.style.marginBottom = '5px';
                controlUI.style.marginRight = '10px';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to recenter the map';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.color = 'rgb(25,25,25)';
                controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText.style.fontSize = '12px';
                controlText.style.lineHeight = '38px';
                controlText.style.paddingLeft = '1px';
                controlText.style.paddingRight = '1px';
                controlText.style.height = '32px';
                controlText.innerHTML = '<i class="fa fa-location-arrow" style="font-size:20px;" aria-hidden="true"></i>';
                controlUI.appendChild(controlText);

                // Setup the click event listeners: simply set the map to Chicago.
                controlUI.addEventListener('click', function() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            map.setCenter(pos);
                            google.maps.event.trigger(map, 'drag');
                        }, function() {
                            alert('無法取得位置！');
                        });
                    } else {
                        alert('瀏覽裝置不支援GPS');
                    }
                });

            }

            return map;
        },
        initChart: function(conf) {
            var target = '#' + conf.target;
            // console.log(target);

            var HumidityChartJSON = conf.humidity;
            var SensorChartJSON = conf.temp;
            // console.log(SensorChartJSON);

            var current_wind_speed, current_wind_direction, current_rain;

            d3.csv("js/wind_data.csv", function(d) {
                // console.log(d);
                return {
                    date: d.created_at,
                    id: d.entry_id,
                    field1: d.field1,
                    data1: d.field2,
                    field3: d.field3,
                    field4: d.field4,
                    field5: d.field5
                };
            }, function(error, rows) {
                // console.log(rows);
                console.log(rows[rows.length - 1]);
                current_wind_direction = rows[rows.length - 1].field1;
                current_wind_speed = rows[rows.length - 1].field3;
                current_rain = rows[rows.length - 1].field4;

                console.log(current_wind_speed, current_wind_direction, current_rain);



                // console.log('SensorChartJSON:' + SensorChartJSON);
                SensorChartJSON = JSON.stringify(SensorChartJSON);
                SensorChartJSON = JSON.parse(SensorChartJSON);
                // console.log(SensorChartJSON.data);

                var current_temp = SensorChartJSON.data[SensorChartJSON.data.length - 1].data1;
                var current_humidity = HumidityChartJSON.data[HumidityChartJSON.data.length - 1].data1;
                console.log(current_humidity, current_temp);

                var max = {};
                max.version = null;
                var min = {};
                min.version = null;
                for (i = 0; i < SensorChartJSON.data.length; i++) {
                    var current = SensorChartJSON.data[i].data1;
                    if (max.version === null || current > max.version) {
                        max.version = current;
                        max.date = SensorChartJSON.data[i].date;
                    }
                    if (min.version === null || current < min.version) {
                        min.version = current;
                        min.date = SensorChartJSON.data[i].date;
                    }
                }
                max.type = "Client";
                min.type = "Client";
                max.text = "Max";
                min.text = "Min";
                var marker = [];
                marker.push(max);
                marker.push(min);

                SensorChartJSON['marker'] = marker;
                // console.log(target);

                $('<h4><i class="fa fa-clock-o" aria-hidden="true"></i> 現在時間：' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '</h4>').appendTo(target);
                // var clockpicker = $('<div class="input-group clockpicker">'+
                //     '<input type="text" class="form-control" value="23:30">'+
                //     '<span class="input-group-addon">'+
                //     '<span class="glyphicon glyphicon-time"></span>'+
                //     '</span></div>'
                //     ).appendTo(target);



                $('<div class="row"><div class="col-md-3"><div class="card"><img src="img/thermometer.png" alt="" style="width:50px; height:50px;" align="middle" margin-bottom: 20px; /> <h4>' + current_temp + '°C</h4></div></div>' +
                    '<div class="col-md-3"><div class="card"><img src="img/rain.png"style="width:50px; height:50px;" alt="" /> <h4>' + current_humidity + '%</h4></div></div>' +
                    '<div class="col-md-3"><div class="card"><img src="img/wind.png"style="width:50px; height:50px;" alt="" /><h4>' + current_wind_direction + '°, ' + current_wind_speed + 'm/s</h4></div></div>' +
                    '<div class="col-md-3"><div class="card"><img src="img/umbrellas.png"style="width:50px; height:50px;" alt="" /><h4>' + current_rain + 'mm</h4></div></div>' +
                    '</div>').appendTo(target);


                $('<h4 style="margin-top:30px;"><i class="fa fa-thermometer-half" aria-hidden="true"></i> Temperature</h4><div class="row"><div class="col-md-8 col-md-offset-2" id="container-fluid1"></div></div>').appendTo(target);
                var test = charts_pludgin.init(SensorChartJSON, 'line', '#container-fluid1', 'Temperature (°C)');

                $('<h4 style="margin-top:30px;"><i class="fa fa-tint" aria-hidden="true"></i> Humidity</h4><div class="row"><div class="col-md-8 col-md-offset-2" id="container-fluid2"></div></div>').appendTo(target);
                var test1 = charts_pludgin.init(HumidityChartJSON, 'line', '#container-fluid2', 'Humidity (%)');


                // $('.clockpicker').clockpicker();
            });
        },
        //end init chart
        init_carousel: function(data) {
            return new Promise(function(resolve, reject) {
                json_len = data.SensorChartJSON.length;
                console.log(json_len);
                json_len = 3;

                carousel_plugin.init(json_len, data.target).then(function() {
                    resolve(data)
                });
                // console.log('1');
                // resolve(data);
            });
        },
        get_ChartData: function(conf) {
            return new Promise(function(resolve, reject) {
                var data = {}
                data['target'] = conf.target;

                var d = new Date();
                d.getHours(); // => 9
                d.getMinutes(); // =>  30
                d.getSeconds(); // => 51

                console.log(d.getHours(), d.getMinutes(), d.getSeconds(), d.getDate(), d.getMonth() + 1, d.getFullYear());
                year = d.getFullYear();
                month = d.getMonth() + 1;
                day = d.getDate();
                hour = d.getHours();
                minute = d.getMinutes();
                second = d.getSeconds();

                //for testing
                month = 6;
                day = 30;
                hour = 1
                minute = 0;
                // end

                //get 30 minutes before current time
                end_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                if (minute >= 30) {
                    start_time = year + '-' + month + '-' + (day) + ' ' + hour + ':' + (minute - 30) + ':' + second;
                } else {
                    if (hour - 1 < 0) {
                        start_time = year + '-' + month + '-' + (day - 1) + ' ' + (hour - 1 + 24) + ':' + (60 + minute - 30) + ':' + second;
                    } else {
                        start_time = year + '-' + month + '-' + (day) + ' ' + (hour - 1) + ':' + (60 + minute - 30) + ':' + second;
                    }
                }
                console.log(start_time, end_time);

                SensorChartJSON = dashboard.model.sonsor_data_chart({
                    data: {
                        t: '0',
                        start: start_time,
                        end: end_time,
                        sensor: 'AgriWeather1'
                    }
                });
                data['SensorChartJSON'] = SensorChartJSON;

                HumidityChartJSON = dashboard.model.sonsor_data_chart({
                    data: {
                        t: '1',
                        start: start_time,
                        end: end_time,
                        sensor: 'AgriWeather1'
                    }
                });
                data['HumidityChartJSON'] = HumidityChartJSON;
                resolve(data);
            });



        }
        //end init carousel

    }
});