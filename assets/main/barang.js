$(document).ready(function() {
  $.getScript(base_url+"assets/main/main.js")
  .done(function( script, textStatus ) {
    var table_main = $('#table_main').DataTable({
      ajax: base_url + "api/barangget"
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
          g = get(base_url+"api/barangget/"+id);
          if (g.status == 1) {
            ed = g.data;
            input = [{type:"text",name:"nama_barang",label:"Nama Barang",value:ed.nama_barang},{type:"text",name:"stok",label:"Stok",value:ed.stok},{type:"text",name:"stok_minimum",label:"Stok Minimum",value:ed.stok_minimum},{type:"text",name:"harga_modal",label:"Harga Modal",value:ed.harga_modal},{type:"text",name:"harga_jual",label:"Harga Jual",value:ed.harga_jual},{type:"select2",name:"id_kategori_barang",label:"Kategori",id:"kb"}];
            button = {type:"submit",class:"warning",name:"Update"};
            var html = builder(input,button,"update");
            dialog.find(".modal-title").html("Edit");
            dialog.find(".bootbox-body").html(html);
            dialog.find("#kb").ready(function() {
              sd = get(base_url+"api/kategoribarangget/-1/1");
              if (sd.status == 1) {
                sd_data = sd.data;
                for (var i = 0; i < sd_data.length; i++) {
                  if (ed.id_kategori_barang == sd_data[i].id_kategori_barang) {
                    dialog.find("#kb").append('<option value="'+sd_data[i].id_kategori_barang+'" selected>'+sd_data[i].nama_kategori+" - "+sd_data[i].satuan_kategori+'</option>');
                    continue;
                  }
                  dialog.find("#kb").append($('<option>', {value:sd_data[i].id_kategori_barang, text:sd_data[i].nama_kategori+" - "+sd_data[i].satuan_kategori}));
                }
              }else {
                bootbox.hideAll();
                swal("Error","Data Tidak Ada ","error");
              }
            });
            dialog.find("#update").on('submit',function(event) {
              event.preventDefault();
              dform = $(this).serializeArray();
              dform[dform.length] = {name:"id_barang",value:id};
              up = post(base_url+"api/barangupdate",dform);
              if (up.status == 1) {
                bootbox.hideAll();
                swal("Sukses","Update Berhasil","success");
                table_main.ajax.reload();
              }else {
                swal("Error","Update Gagal","error");
              }
            });
          }else {
            bootbox.hideAll();
            swal("Error","Data Tidak Ada","error");
          }

        },500);
      });
    });
    $("#add").on('click',function(event) {
      event.preventDefault();
      var dialog = bootbox.dialog({
        title: 'Prepare Menu ',
        message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
      });
      dialog.init(function() {
        setTimeout(function() {
          dialog.find(".modal-title").html("Tambahkan");
          input = [{type:"text",name:"nama_barang",label:"Nama Barang"},{type:"text",name:"stok",label:"Stok"},{type:"text",name:"stok_minimum",label:"Stok Minimum"},{type:"text",name:"harga_modal",label:"Harga Modal"},{type:"text",name:"harga_jual",label:"Harga Jual"},{type:"select2",name:"id_kategori_barang",label:"Kategori",id:"kb"}];
          button = {type:"submit",class:"success",name:"Simpan"};
          var html = builder(input,button,"save");
          dialog.find(".bootbox-body").html(html);
          dialog.on('shown.bs.modal', function() {
            dialog.removeAttr("tabindex");
          });
          dialog.find("#kb").ready(function() {
            sd = get(base_url+"api/kategoribarangget/-1/1");
            if (sd.status == 1) {
              sd_data = sd.data;
              for (var i = 0; i < sd_data.length; i++) {
                dialog.find("#kb").append($('<option>', {value:sd_data[i].id_kategori_barang, text:sd_data[i].nama_kategori+" - "+sd_data[i].satuan_kategori}));
              }
            }else {
              bootbox.hideAll();
              swal("Error","Data Tidak Ada ","error");
            }
          });
          dialog.find("#save").on('submit',function(event) {
            event.preventDefault();
            dform = $(this).serializeArray();
            ins = post(base_url+"api/barangsave",dform);
            if (ins.status == 1) {
              bootbox.hideAll();
              swal("Sukses","Data Berhasil Di Simpan","success");
              table_main.ajax.reload();
            }else {
              swal("Gagal","Data Gagal Di Simpan","error");
            }
          });
        },400);
      });
    });
  })
  .fail(function( jqxhr, settings, exception ) {
    swal("Error","Failed to Get Main Scripts","error");
  });
});
