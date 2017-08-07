carousel_plugin = {
    init:function(item_num,target){
        return new Promise(function(resolve, reject){

        
        carousel_data = '';
        // $(target).append(
        //         '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">'+
        //         '<ol class="carousel-indicators">'
        //     );
        carousel_data = carousel_data + '<div id="myCarousel" class="carousel slide" data-ride="carousel">'+
                '<ol class="carousel-indicators">';
            
            
        carousel_plugin.loop_li(item_num, target ,carousel_data).then(function(carousel_data){
            // console.log('test1');
            // $(target).append(
            //     '</ol>'+
            //     '<div class="carousel-inner" role="listbox">'
            // );
            carousel_data = carousel_data + '</ol>'+
                '<div class="carousel-inner" role="listbox">';
            // console.log('test3');
            return carousel_plugin.loop_item(item_num, target , carousel_data);
        }).then(function(carousel_data){
            // $(target).append('</div></div>');
            carousel_data = carousel_data + '</div></div>';
            return carousel_plugin.append_data(carousel_data ,target);
        }).then(function(carousel_data){
            console.log('finish');
            $('.carousel').carousel({
                interval: 2000
            });
            console.log('carousel start!');
            resolve();
        });
        
        });
    },
    append_data:function(carousel_data, target){
        return new Promise(function(resolve, reject){
           target.append(carousel_data); 
           resolve(carousel_data);
        });
    },
    loop_li:function(item_num, target , carousel_data){
        return new Promise(function( resolve, reject){
            for(i = 0 ; i < item_num ; i++){
                if(i == 0){
                    // $(target).append(
                    //     '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>'  
                    // );
                    carousel_data = carousel_data + '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
                }
                else{
                    // $(target).append(
                    //     '<li data-target="#carouselExampleIndicators" data-slide-to="'+i+'"></li>'  
                    // );
                    carousel_data = carousel_data + '<li data-target="#myCarousel" data-slide-to="'+i+'"></li>';
                }
            }
            resolve(carousel_data);
        });
    },
    loop_item:function(item_num, target , carousel_data){
        return new Promise(function(resolve , reject){
            for(i = 0 ; i < item_num ; i++){
                if(i == 0){
                    carousel_data = carousel_data + '<div class="carousel-item active"><div class="carousel_pannel" id="carousel1" style="width:100%; background-color:white"></div><div id="line_chart"></div></div>';
                    // $(target).append('<div class="item active">Hello'+i+'</div>')
                }
                else{
                    carousel_data = carousel_data + '<div class="carousel-item"><div class="carousel_pannel" id="carousel'+(i+1)+'" style="width:100%;">another page</div></div>';
                    // $(target).append('<div class="item">'+i+'</div>')
                }
            }
            resolve(carousel_data);
        });
        
    }
}

// var test3 = carousel_plugin.init(3, '#foo' );
