$(document).ready(function () {
    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

    //Click dropdown
    panelsButton.click(function () {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(400, function () {
            //Completed slidetoggle
            if (idFor.is(':visible')) {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            }
            else {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        })
    });


    $('[data-toggle="tooltip"]').tooltip();

});


/// product list index
$(document).ready(function () {
    $('#list').click(function (event) { event.preventDefault(); $('#products .item').addClass('list-group-item'); });
    $('#grid').click(function (event) { event.preventDefault(); $('#products .item').removeClass('list-group-item'); $('#products .item').addClass('grid-group-item'); });

    $(window).on('load', function () {
        $('#statusModal').modal('show');
    });

    // add image when update product
    let imageGroupInput = $('#imageGroupInput');
    // max append 5 image
    var maxAppend = $('.imageGroupInput').size();
    $('#btnAddImage').on('click', function () {
        // if is not max append then add
        if (maxAppend++ < 5) {
            imageGroupInput.clone().removeAttr('id').appendTo("#imageGroup");
        } else {
            $('#imagePreview').attr('src', '');
            $('#modalContent').text('Chỉ được nhập tối đa 5 hình ảnh.');
            $('#imageModal').modal('show');
        }
        return false;
    });

    // remove image when udpate product
    $('.btnRemove').on('click', function() {
        if (maxAppend > 1) {
            $(this).closest('.imageGroupInput').remove();
            // decrease max append
            maxAppend--;
        } else {
            $('#imagePreview').attr('src', '');
            $('#modalContent').text('Phải có ít nhất 1 hình ảnh.');
            $('#imageModal').modal('show');
        }
        
        return false;
    });

    // preview image when udpate product
    $('.btnPreview').on('click', function() {
        var src = $(this).closest('.imageGroupInput').find('[name="imagePath"]').val();
        if (src) {
            $('#modalContent').text('');
            $('#imagePreview').attr('src', src);
            $('#imageModal').modal('show');
        }
        return false;
    });

    // get item error
    var itemNameError = $('input[type="hidden"][name="err_item"]').val();
    // highlight and focus to item error
    if (itemNameError) {
        var itemError = '[name="' + itemNameError + '"]';
        $(itemError).addClass('errorInput');
        $(itemError).focus();
    }
    
});