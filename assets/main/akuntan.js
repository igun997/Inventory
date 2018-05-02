$(document).ready(function() {
  $.getScript(base_url+"assets/main/main.js")
  .done(function( script, textStatus ) {
    console.log("Kategori Barang");
    console.log(textStatus);
    var table_main = $('#table_main').DataTable({
      ajax: base_url + "api/akuntanget"
    });
    $("#add").on('click', function(event) {
      event.preventDefault();
      event.preventDefault();
      id = $(this).data("id");
      var dialog = bootbox.dialog({
        title: 'Prepare Menu ',
        message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
      });
      dialog.init(function() {
        setTimeout(function() {
          var build = [
            '<div class="row">',
            '<div class="col-md-12">',
            '<button class="btn btn-danger btn-block kurang">Tambah Pengeluaran</button>',
            '</div>',
            '<div class="col-md-12">',
            '<button class="btn btn-success btn-block tambah">Tambah Pemasukan</button>',
            '</div>',
            '<div class="col-md-12">',
            '<button class="btn btn-primary btn-block tutup">Tutup Sesi Akuntan</button>',
            '</div>',
            '</div>'
          ];
          dialog.find(".modal-title").html("Pilih Opsi");
          dialog.find(".bootbox-body").html(build.join(""));
          dialog.find(".tutup").on('click', function(event) {
            event.preventDefault();
            var a = confirm("Apakah Kamu Yakin ? Semua Data Keuangan Akan Di Arsipkan");
            if (a) {
              d = get(base_url+"api/deleteakuntan");
              if (d.status == 1) {
                table_main.ajax.reload();
                swal("Sukses","Akuntan Di Tutup","success");
                bootbox.hideAll();
              }else {
                swal("Error","Akuntan Gagal Tutup","error");
              }
            }
          });
          dialog.find(".tambah").on('click', function(event) {
            event.preventDefault();
            input = [
              {
                label:"Total",
                id:"total",
                name:"total",
                type:"number",
                step:"0.1"
              },{
                label:"Alasan",
                id:"alasan",
                name:"alasan",
                type:"text"
              },{
                label:"",
                id:"tipe",
                name:"tipe",
                type:"hidden",
                value:"pemasukan"
              }
            ]
            b = builder(input,{name:"Simpan",class:"success",type:"submit"},"save") ;
            html = "<div class='row'><div class='col-md-12'>"+b+"</div></div>";
            dialog.find(".modal-title").html("Pemasukan");
            dialog.find(".bootbox-body").html(html);
            dialog.find("#save").on('submit',function(event) {
              event.preventDefault();
              dform = $(this).serializeArray();
              ins = post(base_url+"api/akuntansave",dform);
              if (ins.status == 1) {
                bootbox.hideAll();
                swal("Sukses","Data Gagal Di Simpan","success");
                table_main.ajax.reload();
              }else {
                swal("Error","Data Gagal Di Simpan","error");
              }
            });
          });
          dialog.find(".kurang").on('click', function(event) {
            event.preventDefault();
            input = [
              {
                label:"Total",
                id:"total",
                name:"total",
                type:"number",
                step:"0.1"
              },{
                label:"Alasan",
                id:"alasan",
                name:"alasan",
                type:"text"
              },{
                label:"",
                id:"tipe",
                name:"tipe",
                type:"hidden",
                value:"pengeluaran"
              }
            ]
            b = builder(input,{name:"Simpan",class:"success",type:"submit"},"save") ;
            html = "<div class='row'><div class='col-md-12'>"+b+"</div></div>";
            dialog.find(".modal-title").html("Pengeluaran");
            dialog.find(".bootbox-body").html(html);
            dialog.find("#save").on('submit',function(event) {
              event.preventDefault();
              dform = $(this).serializeArray();
              ins = post(base_url+"api/akuntansave",dform);
              if (ins.status == 1) {
                bootbox.hideAll();
                swal("Sukses","Data Gagal Di Simpan","success");
                table_main.ajax.reload();
              }else {
                swal("Error","Data Gagal Di Simpan","error");
              }
            });
          });
        });
      });
    });
  })
  .fail(function( jqxhr, settings, exception ) {
    swal("Error","Failed to Get Main Scripts","error");
  });
});
