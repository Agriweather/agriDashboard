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






$('document').ready(function() {

    $.getJSON( "../sensor_data.json", function( data ) {
        console.log( data );
    });



    $('.sensor-close').on('click', function(event) {
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
    })
})
