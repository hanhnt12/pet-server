$("#searchclear").click(function(){
  $("#input-search").val('');
});

$('#search-product').submit(function() {
  if (!$("#input-search").val()) {
    let searchAlert = $('.search-alert').remove();
    $(this).prepend('<div class="alert alert-warning search-alert">Vui lòng nhập điều kiện tìm kiếm.</div>');
    $("#input-search").css({background: '#f2dede'});
    return false;
  }
})