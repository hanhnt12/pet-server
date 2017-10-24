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

    $('#btnAddImage').on('click', function () {
        $("#imagePath").clone().removeAttr('id').appendTo("#imageInput");
        return false;
    })

    // get item error
    var itemNameError = $('input[type="hidden"][name="err_item"]').val();
    // highlight and focus to item error
    if (itemNameError) {
        var itemError = '[name="' + itemNameError + '"]';
        $(itemError).addClass('errorInput');
        $(itemError).focus();
    }
    
});