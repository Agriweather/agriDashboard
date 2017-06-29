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
                    '<i class="material-icons md-light">cancel</i>' +
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
                    '<a href="farm/edit.html"><button type="button" class="btn btn-default sensor-edit-btn">編輯</button></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            })
        } else if (type == 'monitor') {
            $list.prepend('<div class="row" ><a href="monitor.html"><button type="button" id="start_carousel" class="btn btn-warning sensor-edit-btn">開始輪播</button></a></div>')
            $.each(data, function(index, obj) {
                $list.find('.upper_row').append(
                    '<div class="col col-12 col-sm-6 col-md-4">' +
                    '<div class="farm-item group-item">' +
                    '<div class=row>' +
                    '<div class="col-6">' +
                    '<div class="mark">' +
                    '農田' + obj['ID'] +
                    '</div>' +
                    '</div>' +
                    '<div class="col-6">' +
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
                    '<a href="monitor/edit.html"><button type="button" class="btn btn-default sensor-edit-btn">編輯</button></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            });
        } else if (type == 'sensor') {
            $.each(data, function(index, obj) {
                $list.find('.upper_row').append(
                    '<div class="col col-12 col-sm-6 col-md-4">' +
                    '<div class="sensor-item">' +
                    '<div class=row>' +
                    '<div class="col-10">' +
                    '<div class="mark">' +
                    '<i class="fa fa-thermometer-empty" aria-hidden="true"></i>' +
                    ' Sensor ' + obj['ID'] +
                    '</div>' +
                    '</div>' +
                    '<div class="col-2">' +
                    '<div class="sensor-close F-right">' +
                    '<i class="material-icons md-light">cancel</i>' +
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
                    '<a href="sensor/edit.html"><button type="button" class="btn btn-primary waves-effect waves-light sensor-edit-btn">編輯</button></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            });
        }




        //TODO: append html

        $('.block').on('click', function() {
            callback();
        })
        $(target).empty().append($list);
        return $list;
    },


    createDetailView: function(conf) {
        //.....
    }
}
