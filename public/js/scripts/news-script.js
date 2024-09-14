$(document).ready(function () {
    $("#dataTables-news").dataTable();
    $('a[data-toggle="modal"]').on('click', function() {
      var imageUrl = $(this).data('image-url');
      $('#modalImage').attr('src', imageUrl);
    });
    $('a').tooltip()
  });