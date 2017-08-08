var dashboard = $.extend(dashboard, {
    display: {
        'createCard': function(opt) {

            hasBtn = opt.hasBtn;
            var btn = hasBtn ? '<div class="card-footer"><a href="#" class="card-btn btn btn-primary">' + opt.btnText + '</a>' : '';
            btn = opt.deleteBtn ? btn + '<a href="#" class="delete-btn btn btn-danger">刪除</a>' : btn;
            if(hasBtn)
                btn+='</div>';
            var $eleStr = $('<div class="col-12 col-sm-6 col-md-4"><div class="card"><div class="card-header">' + opt.title + '</div><div class="card-block">' + opt.content + '</div>' + btn + '</div></div>');
            if (hasBtn) {
                $.each(opt.attr, function(i, e) {
                    $eleStr.find('.card-btn').attr(e.key, e.val);
                    $eleStr.find('.card-footer').attr(e.key, e.val);
                })
            }
            return $eleStr;
        },
        'createCardContent': function(obj) {

            if (obj.iconImg != '')
                inputStr = '<span><i class="fa ' + obj.iconImg + ' fa-4x" aria-hidden="true"></i></span>';
            $.each(obj.content, function(i, ele) {
                var str = '<div style="margin-top: 5px;">';
                if (ele.icon != '')
                    str += '<span><i class="fa ' + ele.icon + '" aria-hidden="true"></i></span>';
                if (ele.label != '')
                    str += ele.label + ': ';
                str += ele.text;
                str += '</div>';
                inputStr += str;
            })

            return inputStr;
        },
        'displayModal':function(conf){
            $('#myModal').find('.modal-body').html(conf.content());
            $('#myModal').find('#modal-title').text(conf.title);
             $('#myModal').find('.modal-btn').text(conf.btnText);
             $('#myModal').find('.modal-btn').on('click',function(){
                conf.callback(conf.param);
             })
            $('#myModal').modal('show');
        },
        'closeModal':function(){
            $('#myModal').modal('hide');

        }
    }
})