var addModalContent = function(conf) {
    var modal = $(conf.modal),
        title = conf.title,
        content = conf.content;

    modal.find('.modal-title').text(title);
    modal.find('.modal-body').html(content);
    if (modal.find(conf.callback_target).length > 0) {
        modal.find(conf.callback_target).off('click').on('click', conf.callback);
    }
    modal.modal('show');
}
var deleteSensor = function(selctor) {

}

function close() {
    $('.sensor-close').click(function() {
        var _this = $(this);
        var conf = {
            modal: '#indexModal',
            title: '移除感測器',
            content: '確認移除感測器嗎？',
            callback_target: '.btn-danger',
            callback: function() {
                $(_this).parents('.col').remove();
            }
        };
        addModalContent(conf);
    });
};

var url = 'http://demo.smartdog.com.tw/agri';



$('document').ready(function() {
    



    // $.ajax({
    //     method: 'GET',
    //     url: url + '/mobile/sensor'
    // }).done(function(data) {
    //     append_sensor_data(data);
    //     close();
    // });


    // $.ajax({
    //     url: url + '/mobile/farm',
    //     jsonp: 'callback',
    //     type: 'GET',
    //     contentType: 'application/json',
    //     dataType: 'jsonp',
    // }).done(function(data) {
    //     console.log(data);
    //     append_farm_data(data);

    //     append_farm_data_monitor(data);

    //     close();
    // });



    // close();
});

function append_farm_data_monitor(data) {
    $.each(data.data, function(key, val) {
        $('#farm_data_monitor').append(
            '<div class="col col-12 col-sm-6 col-md-4">' +
            '<div class="farm-item group-item">' +
            '<div class=row>' +
            '<div class="col-6">' +
            '<div class="farm-mark">' +
            '農田' + val['ID'] +
            '</div>' +
            '</div>' +
            '<div class="col-6">' +
            '<div class="checkbox checkbox-warning">' +
            '<input id="checkbox"' + val['ID'] + ' type="checkbox">' +
            '<label for="checkbox"' + val['ID'] + '>' +
            '加入輪播' +
            '</label>' +
            ' </div>' +
            '</div>' +
            '</div>' +
            '<hr class="sensor-hr hr">' +
            '<div class="group-item-content">' +
            '<div><span>' + val['CreateDatetime'] + '建立</span></div>' +
            '<div><span>目前種植' + val['CropName'] + '</span></div>' +
            '<div><span>目前共有' + val['SensorCount'] + '個感測器欄位</span></div>' +
            '</div>' +
            '<div class="group-edit">' +
            '<a href="edit.html"><button type="button" class="btn btn-default sensor-edit-btn">編輯</button></a>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    });
}


function append_farm_data(data) {
    $.each(data.data, function(key, val) {
        $('#farm_data').append(
            '<div class="col col-12 col-sm-6 col-md-4">' +
            '<div class="farm-item group-item">' +
            '<div class=row>' +
            '<div class="col-10">' +
            '<div class="farm-mark">' +
            '農田' + val['ID'] +
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
            '<div><span>' + val['CreateDatetime'] + '建立</span></div>' +
            '<div><span>目前種植' + val['CropName'] + '</span></div>' +
            '<div><span>目前共有' + val['SensorCount'] + '個感測器欄位</span></div>' +
            '</div>' +
            '<div class="group-edit">' +
            '<a href="edit.html"><button type="button" class="btn btn-default sensor-edit-btn">編輯</button></a>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    });
};



function append_sensor_data(data) {
    $.each(data.data, function(key, val) {
        $('#sensor_data').append(
            '<div class="col col-12 col-sm-6 col-md-4">' +
            '<div class="sensor-item">' +
            '<div class=row>' +
            '<div class="col-10">' +
            '<div class="sensor-mark">' +
            '<i class="fa fa-thermometer-empty" aria-hidden="true"></i>' +
            ' Sensor ' + val['ID'] +
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
            '<span>ID:' + val['ID'] + '</span>' +
            '</div>' +
            "<div class='sensor-num'>" +
            '<span>目前共有' + val['ColumnCount'] + '個感測器欄位</span>' +
            '</div>' +
            "<div class='sensor-edit'>" +
            '<a href="sensor/edit.html"><button type="button" class="btn btn-primary waves-effect waves-light sensor-edit-btn">編輯</button></a>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    });
};
