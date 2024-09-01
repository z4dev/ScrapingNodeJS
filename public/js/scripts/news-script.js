$(document).ready(function () {
    $("#dataTables-news").dataTable();
    $('a[data-toggle="modal"]').on('click', function() {
      var imageUrl = $(this).data('image-url');
      console.log("aaaaaaaaaa");
      $('#modalImage').attr('src', imageUrl);
    });
    $('a').tooltip()
  });