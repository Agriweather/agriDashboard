var display = {
    createTableView: function(conf) {
        var data = conf.data;
        var callback = conf.callback;
        var target = conf.target;
        var addBtn = conf.addBtn;
        var type = conf.type;

        var $list = $('<div class="group-list"><div class="row upper_row"></div></div>');


        if (addBtn) {
            $list.find('.upper_row').append('<div class="col col-12 col-sm-6 col-md-4">' + '<div class="sensor-item add-item">' +
                '<div class="add-button"><a href="sensor/edit.html"><i class="material-icons md-48">add</i></a></div>' + '</div></div>')
        }
        if (type == 'normal') {
            $.each(data, function(index, obj) {
                $list.find('.upper_row').append(
                    '<div class="col col-12 col-sm-6 col-md-4">' +
                    '<div class="farm-item group-item">' +
                    '<div class=row>' +
                    '<div class="col-10">' +
                    '<div class="mark">' +
                    '農田' + obj['ID'] +
                    '</div>' +
                    '</div>' +
                    '<div class="col-2">' +
                    '<div class="group-close  F-right">' +
                    '<i class="material-icons cancel-btn md-light" id="' + obj['ID'] + '">cancel</i>' +
                    ' </div>' +
                    '</div>' +
                    '</div>' +
                    '<hr class="sensor-hr hr">' +
                    '<div class="group-item-content">' +
                    '<div><span>' + obj['CreateDatetime'] + '建立</span></div>' +
                    '<div><span>目前種植' + obj['CropName'] + '</span></div>' +
                    '<div><span>目前共有' + obj['SensorCount'] + '個感測器</span></div>' +
                    '</div>' +
                    '<div class="group-edit">' +
                    '<button type="button" farm-id="' + obj.ID + '" class="btn btn-default farm-edit-btn">編輯</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );

            })
            $list.find('.add-button').on('click', function() {
                controller.edit_farm_page({
                    action: 'add'
                })
            })
            $list.find('cancel-btn').on('click', function() {
                API.farm_farm_delete({
                    id: $(this).attr('id')
                })
                $('a[nav-target="farm"]').trigger('click');
            })
        } else if (type == 'monitor') {
            $list.prepend('<div class="row" ><a href="monitor.html"><button type="button" id="start_carousel" class="btn btn-warning sensor-edit-btn">開始輪播</button></a></div>')
            $.each(data, function(index, obj) {
                $list.find('.upper_row').append(
                    '<div class="col col-12 col-sm-6 col-md-4">' +
                    '<div class="farm-item group-item">' +
                    '<div class=row>' +
                    '<div class="col-4">' +
                    '<div class="mark">' +
                    '農田' + obj['ID'] +
                    '</div>' +
                    '</div>' +
                    '<div class="col-8">' +
                    '<div class="checkbox checkbox-warning">' +
                    '<input id="checkbox' + obj['ID'] + '" type="checkbox">' +
                    '<label for="checkbox' + obj['ID'] + '">' +
                    '加入輪播' +
                    '</label>' +
                    ' </div>' +
                    '</div>' +
                    '</div>' +
                    '<hr class="sensor-hr hr">' +
                    '<div class="group-item-content">' +
                    '<div><span>' + obj['CreateDatetime'] + '建立</span></div>' +
                    '<div><span>目前種植' + obj['CropName'] + '</span></div>' +
                    '<div><span>目前共有' + obj['SensorCount'] + '個感測器</span></div>' +
                    '</div>' +
                    '<div class="group-edit">' +
                    '<a href="monitor/edit.html"><button type="button" class="btn btn-default monitor-edit-btn">編輯</button></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            });
        } else if (type == 'sensor') {
            $.each(data, function(index, obj) {
                console.log(obj.Name)
                $list.find('.upper_row').append(
                    '<div class="col col-12 col-sm-6 col-md-4">' +
                    '<div class="sensor-item">' +
                    '<div class=row>' +
                    '<div class="col-10">' +
                    '<div class="mark">' +
                    '<i class="fa fa-thermometer-empty" aria-hidden="true"></i>' +
                    '<span>' + obj.Name + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-2">' +
                    '<div class="sensor-close F-right">' +
                    '<i class="material-icons md-light" id="' + obj['ID'] + '">cancel</i>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<hr class="sensor-hr">' +
                    '<div class="sensor-id">' +
                    '<span>ID:' + obj['ID'] + '</span>' +
                    '</div>' +
                    "<div class='sensor-num'>" +
                    '<span>目前共有' + obj['ColumnCount'] + '個感測器欄位</span>' +
                    '</div>' +
                    "<div class='sensor-edit'>" +
                    '<a href="#"><button sensor-id="' + obj['ID'] + '"type="button" class="btn btn-primary waves-effect waves-light sensor-edit-btn">編輯</button></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            });
            $list.find('.add-button').on('click', function() {
                controller.edit_sensor_page({
                    action: 'add'
                })
            })
            $list.find('cancel-btn').on('click', function() {
                API.farm_farm_delete({
                    id: $(this).attr('id')
                })
                $('a[nav-target="sensor"]').trigger('click');
            })
        }




        //TODO: append html
        $(target).empty().append($list);
        $('.sensor-edit-btn').on('click', function() {
            var id = $(this).attr('sensor-id');
            controller.edit_sensor_page({
                id: id,
                action: 'edit'
            })
        });

        $('.farm-edit-btn').on('click', function() {
            var id = $(this).attr('farm-id');
            controller.edit_farm_page({
                id: id,
                action: 'edit'
            })
        });
        return $list;
    },

    createFarmDetailView: function(conf) {
        var data = conf.data;
        var target = conf.target;
        var action = conf.action;
        console.log(target)
        $(target).append(
            '<div class="row" style="margin-top:10px">' +
            '<div class="col offset-8 col-4">' +
            '<div class="btn-group  edit-btn-group" role="group" aria-label="Basic example">' +
            '<button type="button" class="btn btn-secondary float-right farm-edit-history">歷史資料</button>' +
            '<button type="button" farm-id="' + data.ID + '" class="btn btn-secondary float-right farm-save">儲存</button>' +
            '<button type="button" class="btn btn-secondary float-right farm-edit-cancel">取消</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row ">' +
            '<div class="col col-6">' +
            '<div class="farm-name input-group">' +
            '<span class="input-group-addon" id="Farm-name-addon1">名稱:</span>' +
            '<input type="text" id="farm-name" class="form-control" placeholder="" aria-describedby="Sensor-name-addon1" maxlength="256" value="' + data.Name + '">' +
            '</div>' +
            '<div class="date">' +
            '<label>' + data.CreateDatetime + '建立</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-10">' +
            '<div class="form-check">' +
            '<label class="form-check-label">' +
            '<input class="form-check-input" id="monitor_CB" type="checkbox" value="">加入果菜世菜行情至即時監測' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<dlv class="col col-3">' +
            '</dlv>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-6">' +
            '<label>此農田使用的感測器</label>' +
            '<div class="list-group connectionsortable sensor-use">' +
            '</div>' +
            '</div>' +
            '<div class="col col-6">' +
            '<label>可選擇的感測器</label>' +
            '<div class="list-group connectionsortable sensor-available">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-6">' +
            '<label>此農田使用的作物</label>' +
            '<div class="list-group connectionsortable crop-use">' +
            '</div>' +
            '</div>' +
            '<div class="col col-6">' +
            '<label>可選擇的作物</label>' +
            '<div class="list-group connectionsortable crop-available">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-6">' +
            '<label>此農田使用的監測表</label>' +
            '<div class="list-group connectionsortable chart-use">' +
            '</div>' +
            '</div>' +
            '<div class="col col-6">' +
            '<label>可選擇的監測表</label>' +
            '<div class="list-group connectionsortable chart-available">' +
            '</div>' +
            '</div>' +
            '</div>'
        )
        $.each(data.AcivitySensor, function(index, obj) {
            console.log(obj)
            var row = $(
                '<div class="form-group row" >' +
                '<label for="inlineFormCustomSelect" sensor-id="' + obj.ID + '" class="col-12 col-form-label" >' + obj.Name + '</label>' +
                '</div>')
            $('.sensor-use').append(row)
        })
        $.each(data.Sensor, function(index, obj) {
            console.log(obj)
            var row = $(
                '<div class="form-group row" >' +
                '<label for="inlineFormCustomSelect" sensor-id="' + obj.ID + '" class="col-12 col-form-label" >' + obj.Name + '</label>' +
                '</div>')
            $('.sensor-available').append(row)
        })


        $.each(data.AcivityCrop, function(index, obj) {
            console.log(obj)
            var row = $(
                '<div class="form-group row" >' +
                '<label for="inlineFormCustomSelect" crop-id="' + obj.ID + '" class="col-12 col-form-label" >' + obj.Name + '</label>' +
                '</div>')
            $('.crop-use').append(row)
        })
        $.each(data.Crop, function(index, obj) {
            console.log(obj)
            var row = $(
                '<div class="form-group row" >' +
                '<label for="inlineFormCustomSelect" crop-id="' + obj.ID + '" class="col-12 col-form-label" >' + obj.Name + '</label>' +
                '</div>')
            $('.crop-available').append(row)
        })
        $.each(data.AcivityChart, function(index, obj) {
            console.log(obj)
            var row = $(
                '<div class="form-group row" >' +
                '<label for="inlineFormCustomSelect" chart-id="' + obj.ID + '" class="col-12 col-form-label" >' + obj.Name + '</label>' +
                '</div>')
            $('.chart-use').append(row)
        })
        $.each(data.Chart, function(index, obj) {
            console.log(obj)
            var row = $(
                '<div class="form-group row" >' +
                '<label for="inlineFormCustomSelect" chart-id="' + obj.ID + '" class="col-12 col-form-label" >' + obj.Name + '</label>' +
                '</div>')
            $('.chart-available').append(row)
        })

        $('.sensor-use,.sensor-available,.crop-use,.crop-available,.chart-use,.chart-available').sortable({
            connectWith: ".connectionsortable"
        }).disableSelection();

        $('.farm-edit-cancel').on('click', function() {
            $('a[nav-target="farm"]').trigger('click');
        })
        $('.farm-save').on('click', function() {
            var Asensor,sensor,Acrop,crop,Achart,chart;
            $('.sensor-use label').each(function(){
                var obj ={
                    ID:$(this).attr('id'),
                    Name:$(this).text()
                }
                Asensor.push(obj)
            })
            $('.sensor-available label').each(function(){
                var obj ={
                    ID:$(this).attr('id'),
                    Name:$(this).text()
                }
                sensor.push(obj)
            })
            $('.crop-use label').each(function(){
                var obj ={
                    ID:$(this).attr('id'),
                    Name:$(this).text()
                }
                Acrop.push(obj)
            })
            $('.crop-available label').each(function(){
                var obj ={
                    ID:$(this).attr('id'),
                    Name:$(this).text()
                }
                crop.push(obj)
            })
            $('.chart-use label').each(function(){
                var obj ={
                    ID:$(this).attr('id'),
                    Name:$(this).text()
                }
                Achart.push(obj)
            })
            $('.chart-available label').each(function(){
                var obj ={
                    ID:$(this).attr('id'),
                    Name:$(this).text()
                }
                chart.push(obj)
            })
            if (action == 'edit') {
                API.farm_update({
                    data:{
                        ID:$('.farm-save').attr('farm-id'),
                        Name:$('#farm-name').val(),
                        Sensor:sensor,
                        AcivitySensor:Asensor,
                        Crop:crop,
                        AcivityCrop:Acrop,
                        Chart:chart,
                        AcivityChart:Achart
                    },
                    callback:function(){
                        $('a[nav-target="farm"]').trigger('click');
                    }
                })

            } else if (action == 'add') {
                API.farm_create({
                    data:{
                        ID:999,
                        Name:$('#farm-name').val(),
                        Sensor:sensor,
                        AcivitySensor:Asensor,
                        Crop:crop,
                        AcivityCrop:Acrop,
                        Chart:chart,
                        AcivityChart:Achart
                    },
                    callback:function(){
                        $('a[nav-target="farm"]').trigger('click');
                    }
                })
            }
        })



    },


    createSensorDetailView: function(conf) {
        var data = conf.data;
        var callback = conf.callback;
        var target = conf.target;
        var action = conf.action;
        console.log(data)
        $(target).append(
            '<div clas="row" style="margin-top:10px">' +
            '<div class="col offset-9 col-2">' +
            '<div class="btn-group  edit-btn-group" role="group" aria-label="Basic example">' +
            '<button type="button" sensor-id="' + data.ID + '" class="btn btn-primary float-right sensor-save">儲存</button>' +
            '<button type="button" class="btn btn-secondary float-right sensor-edit-cancel">取消</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row ">' +
            '<div class="col col-6">' +
            '<div class="Sensor-name input-group">' +
            '<span class="input-group-addon" id="sensor-name-addon1">名稱:</span>' +
            '<input type="text" id="sensor-name" class="form-control" placeholder="" aria-describedby="Sensor-name-addon1" maxlength="256" value="' + data.Name + '">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-6">' +
            '<span>目前使用中的欄位</span>' +
            '</div>' +
            '<div class="col col-6">' +
            '<span>可使用的欄位</span>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-6">' +
            '<div class="sensor-column connectionsortable">' +
            '</div>' +
            '</div>' +
            '<div class="col col-6">' +
            '<div class="sensor-format connectionsortable">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-12">' +
            '<div class="row">' +
            '<div class="col col-12">' +
            '<span>目前資料</span>' +
            '<button type="button" class="btn btn-secondary btn-reload">Reload</button>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-12">' +
            '<div class="sensor-transfer-log">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        )

        $.each(data.ActivityColumns, function(index, obj) {
            console.log(obj)
            var row = $(
                '<div class="form-group row" >' +
                '<label for="inlineFormCustomSelect" class="col-3 col-form-label" >' + obj.Name + '</label>' +
                '<div class="col-9">' +
                '<select class="custom-select" attr-id="' + obj.ID + '" id="inlineFormCustomSelect" value="">' +
                '</select>' +
                '</div>' +
                '</div>')
            $.each(obj.ActivityType, function(index, type) {
                var opt;
                if (type.Activity == true) {
                    opt = $('<option selected value="' + type.ID + '">' + type.Name + '</option>')
                } else
                    opt = $('<option value="' + type.ID + '">' + type.Name + '</option>')
                row.find('select.custom-select').append(opt);
            })
            $('.sensor-column').append(row)
        })
        $.each(data.Columns, function(index, obj) {
            console.log(obj)
            var row = $(
                '<div class="form-group row">' +
                '<label for="inlineFormCustomSelect" class="col-3 col-form-label" >' + obj.Name + '</label>' +
                '<div class="col-9">' +
                '<select class="custom-select" attr-id="' + obj.ID + '" id="inlineFormCustomSelect" value="">' +
                '</select>' +
                '</div>' +
                '</div>')
            $.each(obj.ActivityType, function(index, type) {
                var opt;
                if (type.Activity == true) {
                    opt = $('<option selected value="' + type.ID + '">' + type.Name + '</option>')
                } else
                    opt = $('<option value="' + type.ID + '">' + type.Name + '</option>')
                row.find('select.custom-select').append(opt);
            })
            $('.sensor-format').append(row)
        })

        $('.sensor-column,.sensor-format').sortable({
            connectWith: ".connectionsortable"
        }).disableSelection();

        $('.sensor-edit-cancel').on('click', function() {
            $('a[nav-target="sensor"]').trigger('click');
        })

        $('.sensor-save').on('click', function() {
            var A_col = [];
            $('.sensor-column >.form-group').each(function(index, ele) {
                var ID = $(ele).find('select').attr('attr-id');
                var Name = $(ele).find('label').text();
                var Type = [];
                var selected = $(ele).find('select').val();
                $(ele).find('select>option').each(function(index, ele) {
                    var type = {
                        ID: $(this).attr('value'),
                        Name: $(this).text(),
                        Activity: $(this).attr('value') == selected
                    }
                    Type.push(type);
                });
                var col = {
                    ID: ID,
                    Name: Name,
                    ActivityType: Type,
                }

                A_col.push(col);
            });

            if (action == 'edit') {


                API.sensor_update({
                    data: {
                        ID: $(this).attr('sensor-id'),
                        Name: $('#sensor-name').val(),
                        ActivityColumns: A_col,
                        Columns: []
                    },
                    callback: function(json) {
                        alert(json.success);
                        $('a[nav-target="sensor"]').trigger('click');
                    }
                })
            } else if (action == 'add') {
                API.sensor_create({
                    data: {
                        ID: 999,
                        Name: $('#sensor-name').val(),
                        ActivityColumns: A_col,
                        Columns: []
                    },
                    callback: function(json) {
                        alert(json.success);
                        $('a[nav-target="sensor"]').trigger('click');
                    }
                })
            }
        })


    }
}
