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
        id = $(this).data("id");
        var dialog = bootbox.dialog({
          title: 'Prepare Menu ',
          message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
        });
        dialog.init(function() {
          setTimeout(function() {
            dialog.find(".modal-title").html("Edit");
            d = get(base_url+"api/kategoribarangget/"+id);
            if (d.status == 1) {
              inputbuild = [
                {
                  label:"Nama Kategori",
                  type:"text",
                  name:"nama_kategori",
                  value:d.data.nama_kategori
                },{
                  label:"Satuan Kategori",
                  type:"text",
                  name:"satuan_kategori",
                  value:d.data.satuan_kategori
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
              dialog.find("#update").on('submit', function(event) {
                event.preventDefault();
                dform = $(this).serializeArray();
                indexF = dform.length;
                dform[indexF] = {name:"id_kategori_barang",value:id};
                up = post(base_url+"api/kategoribarangupdate",dform);
                if (up.status == 1) {
                  bootbox.hideAll();
                  swal("Sukses","Data Berhasil Di Update","success");
                  table_main.ajax.reload();
                }else {
                  swal("Error","Data Gagal Di Update","error");
                }
              });
            }else {
              swal("Error","Server Error","success");
            }
          },500);
        });
      });
      $("#add").on('click', function(event) {
        event.preventDefault();
        var dialog = bootbox.dialog({
          title: 'Prepare Menu ',
          message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
        });
        dialog.init(function() {
          setTimeout(function() {
            builinput = [
              {
                type : "text",
                label:"Nama",
                name : "nama_kategori",
                value : ""
              },{
                type : "text",
                label:"Satuan",
                name : "satuan_kategori",
                value : ""
              }
            ]
            buttonbbuilder = {
              type:"submit",
              name:"Simpan",
              class:"success"
            }
            dialog.find(".modal-title").html("Tambahkan");
            dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>"+builder(builinput,buttonbbuilder,"save")+"</div></div>");
            dialog.find("#save").on('submit', function(event) {
              event.preventDefault();
              dform = $(this).serializeArray();
              ins = post(base_url+"api/kategoribarangsave",dform);
              if (ins.status == 1) {
                bootbox.hideAll();
                swal("Sukses","Data Berhasil di Tambahkan","success");
                table_main.ajax.reload();
              }else {
                swal("Gagal","Data Gagal di Tambahkan","error");
              }
            });
          },200);
        });

      });
    })
    .fail(function(jqxhr, settings, exception) {
      swal("Error", "Failed to Get Main Scripts", "error");
    });
});
