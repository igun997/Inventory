$(document).ready(function() {
  $.getScript(base_url+"assets/main/main.js")
  .done(function( script, textStatus ) {
    table_main = $("#table_main").DataTable({
      ajax: base_url + "api/stokopnameget"
    });
    $("#table_main").on('click', 'tbody tr', function(event) {
      event.preventDefault();
      data = table_main.row(this).data();
      id = data[0];
      console.log(data[0]);
      var cek = get(base_url+"api/stokopnameget/"+id+"/1");
      if (cek.status == 1 ) {
        if (cek.data[0].status_transaksi != "lunas") {
          var dialog = bootbox.dialog({
            title: 'Prepare Menu ',
            message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
          });
          dialog.init(function() {
            setTimeout(function() {
              var build = [
                '<div class="row">',
                '<div class="col-md-12">',
                '<button class="btn btn-success btn-block bayar">Bayar Hutang</button>',
                '</div>',
                '</div>'
              ];
              dialog.find(".modal-title").html("Pilih Opsi");
              dialog.find(".bootbox-body").html(build.join(""));
              dialog.find(".bayar").on('click',function(event) {
                event.preventDefault();
                input =  [
                  {
                    label:"Total Bayar",
                    type:"number",
                    step:"0.1",
                    name:"bayar",
                    id:"dibayar"
                  },{
                    label:"",
                    type:"hidden",
                    name:"id_transaksi_barang_masuk",
                    value:id
                  }
                ];
                button = {type:"submit",name:"Bayarkan",class:"warning"};
                a = builder(input,button,"update");
                dialog.find(".modal-title").html("Pembayaran");
                dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>"+a+"</div></div>");
                dialog.find("#update").on('submit', function(event) {
                  event.preventDefault();
                  var cur = get(base_url+"api/stokopnamehutangheap/"+id);
                  totaldibayar = parseFloat(cur.bayar);
                  dibayar = parseFloat(dialog.find("#dibayar").val());
                  hutang = parseFloat(cek.data[0].hutang);
                  sumdibayar = parseFloat(cek.data[0].total_bayar)+dibayar;
                  f = totaldibayar + dibayar;
                  nowhutang = (hutang - dibayar);
                  // Sampai Sini
                  if (dibayar <= hutang) {
                    if (dibayar == hutang) {
                      dpo = {id_transaksi_barang_masuk:id,total_bayar:sumdibayar,hutang:nowhutang,status_transaksi:"lunas"};
                    }else {
                      dpo = {id_transaksi_barang_masuk:id,total_bayar:sumdibayar,hutang:nowhutang}
                    }
                    console.log("Total Di Bayar "+totaldibayar);
                    dform = $(this).serializeArray();
                    dform[dform.length] = {name:"bayar",value:dibayar};
                    post(base_url+"api/stokopnameupdate",dpo);
                    up = post(base_url+"api/stokopnamehutangsave",dform);
                    if (up.status == 1) {
                      bootbox.hideAll();
                      table_main.ajax.reload();
                      swal("Sukses","Data Tersimpan","success");
                    }else {
                      swal("Error","Gagal Simpan Data","error");
                    }
                  }else {
                    swal("Error","Jumlah Pembayaran Terlalu Besar","error");
                  }
                });
              });
            });
          });
        }else if (cek.data[0].status_penerimaan != "selesai") {
          var dialog = bootbox.dialog({
            title: 'Prepare Menu ',
            message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
          });
          dialog.init(function() {
            setTimeout(function() {
              var build = [
                '<div class="row">',
                '<div class="col-md-12">',
                '<button class="btn btn-success btn-block terima">Penerimaan Barang</button>',
                '</div>',
                '</div>'
              ];
              dialog.find(".modal-title").html("Pilih Opsi");
              dialog.find(".bootbox-body").html(build.join(""));
              dialog.find(".terima").on('click',function(event) {
                event.preventDefault();
                input =  [
                  {
                    label:"Total",
                    type:"number",
                    step:"0.1",
                    name:"total",
                    id:"total"
                  },{
                    label:"",
                    type:"hidden",
                    name:"id_transaksi_barang_masuk",
                    value:id
                  }
                ];
                button = {type:"submit",name:"Konfirmasi",class:"warning"};
                a = builder(input,button,"update");
                dialog.find(".modal-title").html("Penerimaan Barang");
                dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>"+a+"</div></div>");
                dialog.find("#update").on('submit', function(event) {
                  event.preventDefault();
                  dform = $(this).serializeArray();
                  nowmasuk = parseFloat(data[8]);
                  console.log("Sekarang "+nowmasuk);
                  tonow = nowmasuk + parseFloat(dialog.find("#total").val());
                  console.log(tonow);
                  if (tonow <= data[7]) {
                    if (tonow == data[7]) {
                      post(base_url+"api/stokopnameupdate",{status_penerimaan:"selesai",id_transaksi_barang_masuk:id});
                    }
                    ins = post(base_url+"api/stokopnameterimabarangsave",dform);
                    if (ins.status == 1) {
                      bootbox.hideAll();
                      table_main.ajax.reload();
                      swal("Sukses","Data Tersimpan","success");
                    }else {
                      swal("Error","Data Gagal Di Simpan","error");
                    }
                  }else {
                    swal("Total Terima Terlalu Banyak");
                  }
                });
              });
            });
          });
        }else {
          swal("Transaksi Ini Sudah Selesai");
        }
      }else {
        swal("Transaksi Ini Tidak Ada");
      }

    });
    var adls = $("#add").on('click', function(event) {
      event.preventDefault();
      var dialog = bootbox.dialog({
        title: 'Prepare Menu ',
        message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
      });
      dialog.init(function() {
        setTimeout(function() {
          var build = [
            '<div class="row">',
            '<div class="col-md-12">',
            '<button class="btn btn-success btn-block tambah">Tambah Sales</button>',
            '</div>',
            '<div class="col-md-12">',
            '<button class="btn btn-success btn-block list">List Sales</button>',
            '</div>',
            '<div class="col-md-12">',
            '<button class="btn btn-primary btn-block cek">Cek Stok Opname</button>',
            '</div>',
            '</div>'
          ];
          dialog.find(".modal-title").html("Pilih Opsi");
          dialog.find(".bootbox-body").html(build.join(""));
          dialog.find(".list").on('click', function(event) {
            event.preventDefault();
            html = table(["ID","Nama Sales","Nama Perusahaan","Alamat"],[],"tbl_sales");
            dialog.find(".modal-title").html("List Sales");
            dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>"+html+"</div></div>");
            tbl_sales = dialog.find("#tbl_sales").DataTable({
              ajax: base_url + "api/salesget"
            });
            dialog.find("tbody").on('click', 'tr', function(event) {
              event.preventDefault();
              data = tbl_sales.row(this).data();
              input = [
                {
                  label:"Nama Sales",
                  type:"text",
                  name:"nama_sales",
                  value:data[1]
                },{
                  label:"Nama Perusahaan",
                  type:"text",
                  name:"nama_perusahaan",
                  value:data[2]
                },{
                  label:"Alamat",
                  type:"text",
                  name:"alamat",
                  value:data[3]
                },{
                  label:"",
                  type:"hidden",
                  name:"id_sales",
                  value:data[0]
                }
              ];
              button = {type:"submit",name:"Update",class:"warning"};
              buttondel = {type:"button",name:"Delete",class:"danger",id:"del",data:data[0]};
              html = builder(input,button,"update",buttondel);
              dialog.find(".modal-title").html("Edit Sales");
              dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>"+html+"</div></div>");
              dialog.find("#del").on('click', function(event) {
                event.preventDefault();
                var s = confirm("Apakah Anda Yakin ? ");
                if (s) {
                  del = post(base_url+"api/salesdelete",{id_sales:data[0]});
                  if(del.status == 1){
                    swal("Sukses","Data Di Hapus","success");
                    setTimeout(function () {
                      bootbox.hideAll();
                      adls.trigger('click');
                    }, 1000);
                  }else {
                    swal("Error","Data Gagal Di Hapus","error");
                  }
                }
              });
              dialog.find("#update").on('submit', function(event) {
                event.preventDefault();
                dform = $(this).serializeArray();
                up = post(base_url+"api/salesupdate",dform);
                if (up.status == 1) {
                  tbl_sales.ajax.reload();
                  swal("Sukses","Data Tersimpan","success");
                  setTimeout(function () {
                    bootbox.hideAll();
                    adls.trigger('click');
                  }, 1000);
                }else {
                  swal("Error","Data Tidak Tersimpan","error");
                }
              });
            });
          });
          dialog.find(".tambah").on('click', function(event) {
            event.preventDefault();
            input = [
              {
                label:"Nama Sales",
                type:"text",
                name:"nama_sales"
              },{
                label:"Nama Perusahaan",
                type:"text",
                name:"nama_perusahaan"
              },{
                label:"Alamat",
                type:"text",
                name:"alamat"
              }
            ];
            button = {type:"submit",name:"Simpan",class:"success"};
            html = builder(input,button,"save");
            dialog.find(".modal-title").html("Tambah Sales");
            dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>"+html+"</div></div>");
            dialog.find("#save").on('submit', function(event) {
              event.preventDefault();
              dform = $(this).serializeArray();
              ins = post(base_url+"api/salessave",dform);
              if (ins.status == 1) {
                bootbox.hideAll();
                swal("Sukses","Data Tersimpan","success");
                setTimeout(function () {
                  bootbox.hideAll();
                }, 1000);
              }else {
                swal("Error","Data Tidak Tersimpan","error");
              }
            });
          });
          dialog.find(".cek").on('click', function(event) {
            event.preventDefault();
            columns = ["ID","Nama Barang","Harga Modal","Stok","Stok Minimum"];
            h = table(columns,[],"tbl_cstok");
            dialog.find(".modal-title").html("Stok Opname");
            dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>"+h+"</div></div>");
            tbl_cstok = dialog.find("#tbl_cstok").DataTable({
              ajax: base_url + "api/cekstokopnameget"
            });
            dialog.find("#tbl_cstok").on('click', 'tbody tr', function(event) {
              event.preventDefault();
              dcstok = tbl_cstok.row(this).data();
              var dialog = bootbox.dialog({
                title: 'Prepare Menu ',
                message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
              });
              dialog.init(function() {
                setTimeout(function() {
                  input = [
                    {
                      label:"ID Barang",
                      type:"disabled",
                      value:dcstok[0],
                      id:"idbrg"
                    },{
                      label:"",
                      type:"hidden",
                      value:dcstok[0],
                      name:"id_barang"
                    },{
                      label:"Sales",
                      type:"select2",
                      name:"id_sales",
                      id:"siselect"
                    },{
                      label:"Harga Per Item",
                      type:"number",
                      step:"0.1",
                      name:"",
                      value:dcstok[2],
                      id:"tharga"
                    },{
                      label:"Total Masuk",
                      type:"number",
                      step:"0.1",
                      name:"total_masuk",
                      id:"tmasuk"
                    },{
                      label:"Total Pembayaran",
                      type:"number",
                      step:"0.1",
                      name:"",
                      id:"tbayar"
                    },{
                      label:"Dibayarkan",
                      type:"number",
                      step:"0.1",
                      name:"",
                      id:"dbayar"
                    }
                  ];
                  button = {type:"submit",name:"Simpan",class:"primary"};
                  ha = builder(input,button,"save");
                  dialog.find(".modal-title").html("Opname");
                  dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>"+ha+"</div></div>");
                  dialog.find("#tmasuk").on('change',  function(event) {
                    event.preventDefault();
                    total = parseFloat($(this).val());
                    hrg = parseFloat(dialog.find("#tharga").val());
                    dialog.find("#tbayar").val((total*hrg));
                  });

                  dialog.find("#siselect").ready(function() {
                    sd = get(base_url+"api/salesget/-1/1");
                    if (sd.status == 1) {
                      for (var i = 0; i < sd.data.length; i++) {
                        dialog.find("#siselect").append($("<option>",{value:sd.data[i].id_sales,text:sd.data[i].nama_sales}));
                      }
                    }else {
                      bootbox.hideAll();
                      swal("Error","Maaf Anda Belum Mengisi Daftar Sales","error");
                    }
                  });
                  dialog.find("#save").on('submit', function(event) {
                    event.preventDefault();
                    bayar = parseFloat(dialog.find("#dbayar").val());
                    tbayar = parseFloat(dialog.find("#tbayar").val());
                    if (bayar < tbayar) {
                      dform = $(this).serializeArray();
                      hutang = (tbayar - bayar);
                      tbayar = tbayar-hutang;
                      dform[dform.length] = {name:"hutang",value:hutang};
                      dform[dform.length] = {name:"total_bayar",value:tbayar};
                      dform[dform.length] = {name:"status_transaksi",value:"hutang"};
                      console.log(dform);
                      ins = post(base_url+"api/stokopnamesave",dform);
                      if (ins.status == 1) {
                        bootbox.hideAll();
                        swal("Sukses","Data Berhasil di Simpan","success");
                        table_main.ajax.reload();
                      }else {
                        swal("Error","Data Gagal di Simpan","error");
                      }
                    }else if (bayar == tbayar) {
                      cekheap = get(base_url+"api/akuntanheapcek/"+bayar);
                      if (cekheap.status == 1) {
                        dform = $(this).serializeArray();
                        dform[dform.length] = {name:"hutang",value:0};
                        dform[dform.length] = {name:"total_bayar",value:tbayar};
                        dform[dform.length] = {name:"status_transaksi",value:"lunas"};
                        console.log(dform);
                        ins = post(base_url+"api/stokopnamesave",dform);
                        if (ins.status == 1) {
                          bootbox.hideAll();
                          swal("Sukses","Data Berhasil di Simpan","success");
                          table_main.ajax.reload();
                        }else {
                          swal("Error","Data Gagal di Simpan","error");
                        }
                      }else {
                        swal("Error","Uang Yang Ada Di Dompet Anda Tidak Mencukupi","error");
                      }
                    }else {
                      swal("Total Pembayaran Melebihi Total Yang Harus Di Bayar");
                    }

                  });
                },1000);
              });
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
