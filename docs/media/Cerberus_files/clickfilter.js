window.onload = function(){
        jQuery(".funding td.column-2").click(function(){

            var name = jQuery(this).html();
            var id = jQuery(".funding").attr("id");
            var table  = jQuery(".funding").dataTable();
            var search = jQuery("input[aria-controls="+id+"]");

            if( search.val() == ""){
                table.fnFilter(name);
            }else{
                table.fnFilter("");
            }

        });     

        jQuery(".MandA td.column-3").click(function(){

            var name = jQuery(this).html();
            var id = jQuery(".MandA").attr("id");
            var table  = jQuery(".MandA").dataTable();
            var search = jQuery("input[aria-controls="+id+"]");

            if( search.val() == ""){
                table.fnFilter(name);
            }else{
                table.fnFilter("");
            }


        });  

    };  