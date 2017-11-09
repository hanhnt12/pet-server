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
    $('#list').click(function (event) {
        event.preventDefault(); $('#products .item').addClass('list-group-item');
    });
    $('#grid').click(function (event) {
        event.preventDefault(); $('#products .item').removeClass('list-group-item');
        $('#products .item').addClass('grid-group-item');
    });

    $(window).on('load', function () {
        $('#statusModal').modal('show');
    });

    // add image when update product
    let imageGroupInput = $('#imageGroupInput');
    // max append 5 image
    var maxAppend = $('.imageGroupInput').size();
    // $(document).on('click', '#btnAddImage', function (event) {
    $('#btnAddImage').on('click', function (event) {
        event.preventDefault();
        // if is not max append then add
        if (maxAppend++ < 5) {
            // clone image input group
            var imageGroup = imageGroupInput.clone().removeAttr('id');
            imageGroup.find('.imagePath').val('');
            imageGroup.find('[name="defaultImage"]').prop('checked', false);
            imageGroup.find('[name="bannerImage"]').prop('checked', false);
            imageGroup.appendTo("#imageGroup");
            $(this).prop('disabled', false);

            // change value of radio on input group
            let defaultImg = document.getElementsByClassName('defaultImage');
            let bannerImg = document.getElementsByClassName('bannerImage');
            let rdImg = defaultImg.length;
            let rdBanner = bannerImg.length;
            defaultImg[rdImg - 1].value = rdImg;
            bannerImg[rdBanner - 1].value = rdBanner;
        } else {
            $('#imagePreview').attr('src', '');
            $('#modalContent').text('Chỉ được nhập tối đa 5 hình ảnh.');
            $('#imageModal').modal('show');
            $(this).prop('disabled', true);
        }
    });

    // remove image when udpate product
    $(document).on('click', '.btnRemove', function (event) {
    // $('.btnRemove').on('click', function (event) {
        event.preventDefault();
        $('#btnAddImage').prop('disabled', false);
        if (maxAppend > 1) {
            $(this).closest('.imageGroupInput').remove();
            // decrease max append
            maxAppend--;
            // refresh value of radios follow order
            let defaultImg = document.getElementsByClassName('defaultImage');
            let bannerImg = document.getElementsByClassName('bannerImage');
            let rdImg = defaultImg.length;
            let rdBanner = bannerImg.length;
            for (let i = 0; i < rdImg; i++) {
                defaultImg[i].value = i + 1;
            }
            for (let i = 0; i < rdBanner; i++) {
                rdBanner[i].value = i + 1;
            }
        } else {
            $('#imagePreview').attr('src', '');
            $('#modalContent').text('Phải có ít nhất 1 hình ảnh.');
            $('#imageModal').modal('show');
        }
    });

    // preview image when udpate product
    $(document).on('click', '.btnPreview', function (event) {
    // $('.btnPreview').on('click', function (event) {
        event.preventDefault();
        var src = $(this).closest('.imageGroupInput').find('[name="imagePath"]').val();
        if (src) {
            $('#modalContent').text('');
            $('#imagePreview').attr('src', src);
            $('#imageModal').modal('show');
        } else {
            $(this).closest('.imageGroupInput').find('[name="imagePath"]').addClass('errorInput');
        }
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