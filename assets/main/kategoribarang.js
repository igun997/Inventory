$(document).ready(function() {
  $.getScript(base_url + "assets/main/main.js")
    .done(function(script, textStatus) {
      console.log("Kategori Barang");
      console.log(textStatus);
      var table_main = $('#table_main').DataTable({
        ajax: base_url + "api/kategoribarangget"
      });
      $("#table_main").on('click', '.edit', function(event) {
        event.preventDefault();
        data = $(this).data("id");
        console.log(data);
        var dialog = bootbox.dialog({
          title: 'Prepare Menu ',
          message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
        });
        dialog.init(function() {
          setTimeout(function() {
            dialog.find(".modal-title").html("Edit");
            inputbuild = [
              {
                label:"Nama Kategori",
                type:"text",
                name:"nama_kategori"
              },{
                label:"Satuan Kategori",
                type:"text",
                name:"satuan_kategori"
              }
            ];
            button = {
              class:"warning",
              type:"submit",
              name:"Update"
            };
            build = [
              "<div class='row'>",
              "<div class='col-md-12'>",
              builder(inputbuild,button,"update"),
              "</div>",
              "</div>"
            ];
            dialog.find(".bootbox-body").html(build.join(""));
          },500);
        });
      });
    })
    .fail(function(jqxhr, settings, exception) {
      swal("Error", "Failed to Get Main Scripts", "error");
    });
});
