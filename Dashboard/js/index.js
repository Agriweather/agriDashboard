var addModalContent = function(conf) {
    var modal = $(conf.modal),
    	title = conf.title,
    	content = conf.content;

    modal.find('.modal-title').text(title);
    modal.find('.modal-body').html(content);
    if(modal.find(conf.callback_target).length>0){
    	modal.find(conf.callback_target).off('click').on('click',conf.callback);
    }
    modal.modal('show');
}
var deleteSensor = function(selctor) {

}

function close(){
    $('.sensor-close').click(function() {
        var _this = $(this);
        var conf = {
            modal: '#indexModal',
            title: '移除感測器',
            content: '確認移除感測器嗎？',
            callback_target: '.btn-danger',
            callback:function(){
                $(_this).parents('.col').remove();
            }
        };
        addModalContent(conf);
    });
}

var url = 'http://demo.smartdog.com.tw/agri/';



$('document').ready(function(){

    $.getJSON(url+'mobile/sensor/' ,function(raw_data){
        console.log(raw_data);
    });

}); 



// $('document').ready(function() {

//     $.getJSON( "https://suwenyu.github.io/test_sensor/sensor_data.json", function( data ) {
//         $.each( data, function( key, val ) {
//             console.log(key, val);

//             $('#sensor_data').append(
//                 '<div class="col col-12 col-sm-6 col-md-4">'+
//                     '<div class="sensor-item">'+
//                         '<div class=row>'+
//                             '<div class="col-10">'+
//                                 '<div class="sensor-mark">'+
//                                     'Sensor ' + val['sensor_num']+
//                                 '</div>'+
//                             '</div>'+
//                             '<div class="col-2">'+
//                                 '<div class="sensor-close F-right">'+
//                                     '<i class="fa fa-times"></i>'+
//                                 '</div>'+
//                             '</div>'+
//                         '</div>'+
//                     '<hr class="sensor-hr">'+
//                         '<div class="sensor-id">'+
//                             '<span>ID:'+val['sensor_id']+'</span>'+
//                         '</div>'+
//                         "<div class='sensor-num'>"+
//                             '<span>目前共有'+val['data'].length+'個感測器欄位</span>'+
//                         '</div>'+
//                         "<div class='sensor-edit'>"+
//                             '<a href="sensor/edit.html"><button type="button" class="btn btn-success sensor-edit-btn">編輯</button></a>'+
//                         '</div>'+
//                     '</div>'+
//                 '</div>'
//                 );

//         });


//         close();

//     });



//     close();
// });
