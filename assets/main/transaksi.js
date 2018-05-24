$(document).ready(function() {
  $.getScript(base_url + "assets/main/main.js")
    .done(function(script, textStatus) {
      var table_main = $('#table_main').DataTable({
        ajax: base_url + "api/transaksiget"
      });
      $("#table_main").on('click', '.edit', function(event) {
        event.preventDefault();
        idnow = $(this).data("id");
        var dialog = bootbox.dialog({
          title: 'Prepare Menu ',
          message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
        });
        dialog.init(function() {
          setTimeout(function() {
            idtrx = idnow;
            cek = get(base_url + "api/transaksiget/" + idtrx + "/1");
            if (cek.status == 1 && cek.data.status_transaksi == "waiting") {
              input = [{
                label: "Barang",
                name: "id_barang",
                type: "select2",
                id: "barang"
              }, {
                label: "Total",
                name: "total_keluar",
                type: "number",
                step: "0.1",
                id: "total_keluar"
              }, {
                label: "",
                name: "id_transaksi_barang_keluar",
                type: "hidden",
                value: idtrx
              }, {
                label: "",
                name: "",
                type: "hidden",
                id: "total_stok"
              }, {
                label: "",
                name: "harga_jual",
                type: "hidden",
                id: "harga_jual"
              }, {
                label: "",
                name: "harga_modal",
                type: "hidden",
                id: "harga_modal"
              }];
              button = {
                type: "submit",
                name: "Simpan Barang",
                class: "primary"
              };
              html = builder(input, button, "save");
              table1 = table(["ID", "Nama Barang", "Jumlah Barang", "Harga", "Subtotal"], [], "table_bk");
              table2 = table(["ID", "Nama Barang", "Jumlah Barang", "Harga", "Subtotal"], [], "table_bkpre");
              input = [{
                label: "Total Pembayaran",
                name: "",
                type: "disabled",
                id: "tb",
                value: ""
              }, {
                label: "Bayar",
                name: "total_bayar",
                type: "number",
                id: "total_bayar",
                step: "0.1"
              }];
              button = {
                type: "submit",
                name: "Simpan Transaksi",
                class: "success"
              };
              html2 = builder(input, button, "savetrx");
              dialog.find(".modal-title").html("Edit Transaksi ID " + idtrx);
              dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>" + html + "</div><div class='col-md-12'><label>Order</label>" + table1 + "</div><div class='col-md-12'><label>Pre Order</label>" + table2 + "</div><div class='col-md-12'>" + html2 + "</div></div>");
              console.log("Remove Tab Index");
              dialog.find(".bootbox").removeAttr('tabindex');
              var $select = dialog.find("#barang").selectize({
                valueField: 'id_barang',
                labelField: 'nama_barang',
                searchField: 'nama_barang',
                options: [],
                load: function(query, callback) {
                  if (!query.length) return callback();
                  $.ajax({
                    url: base_url+'api/barangget/-1/2',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                      country: query,
                    },
                    error: function() {
                      callback();
                    },
                    success: function(res) {
                      callback(res);
                    }
                  });
                }
              });
              var selectize = $select[0].selectize;
              var table_main_sub = dialog.find("#table_bk").DataTable({
                ajax: base_url + "api/barangkeluarget/" + idtrx
              });
              var table_main_sub_pre = dialog.find("#table_bkpre").DataTable({
                ajax: base_url + "api/barangkeluarpreorderget/" + idtrx
              });
              var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
              dialog.find("#tb").val(total.total);
              var getb = function() {
                sd = get(base_url + "api/barangget/-1/1");
                if (sd.status == 1) {
                  sd_data = sd.data;
                  selectize.clearOptions();
                  selectize.addOption({
                    value: "",
                    text: ""
                  });
                  selectize.addItem("");
                  for (var i = 0; i < sd_data.length; i++) {
                    selectize.addOption({
                      value: sd_data[i].id_barang,
                      text: sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok
                    });
                    selectize.addItem(sd_data[i].id_barang);
                  }
                } else {
                  bootbox.hideAll();
                  swal("Error", "Data Tidak Ada ", "error");
                }
              };
              dialog.find("#barang").on('change', function(event) {
                event.preventDefault();
                idbarang = $(this).val();
                sbarang = get(base_url + "api/barangget/" + idbarang + "/1");
                if (sbarang.status == 1) {
                  dialog.find("#harga_jual").val(sbarang.data.harga_jual);
                  dialog.find("#harga_modal").val(sbarang.data.harga_modal);
                  dialog.find("#total_stok").val(sbarang.data.stok);
                } else {
                  swal("Error", "Data Barang Tidak Ditemukan", "error");
                }
              });
              dialog.find("#save").on('submit', function(event) {
                event.preventDefault();
                var s = $(this).serializeArray();
                var current = parseFloat(dialog.find("#total_stok").val());
                var t_keluar = parseFloat(dialog.find("#total_keluar").val());

                if (t_keluar > current) {
                  console.log("Preorder");
                  var t_masuk = (t_keluar - current);
                  var keluar = s;
                  keluar = jQuery.grep(keluar, function(value) {
                    return value.name != "total_keluar";
                  });
                  keluar[keluar.length] = {
                    name: "total_keluar",
                    value: current
                  };
                  if (current != 0) {
                    ins = post(base_url + "api/barangkeluarsave", keluar);
                  } else {
                    ins = {
                      status: 1
                    };
                  }
                  if (ins.status == 1) {
                    table_main_sub.ajax.reload();
                    keluar = jQuery.grep(keluar, function(value) {
                      return value.name != "total_keluar";
                    });
                    keluar[keluar.length] = {
                      name: "total_keluar",
                      value: t_masuk
                    };
                    ins = post(base_url + "api/barangkeluarpreordersave", keluar);
                    if (ins.status == 1) {
                      var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                      dialog.find("#tb").val(total.total);
                      console.log(total);
                      table_main_sub_pre.ajax.reload();
                      swal("Sukses", "Data Barang Di Simpan", "success");
                    } else {
                      swal("Error", "Data Barang Gagal Di Simpan", "error");
                    }
                  } else {
                    swal("Error", "Data Barang Gagal Di Simpan", "error");
                  }
                } else {
                  ins = post(base_url + "api/barangkeluarsave", s);
                  if (ins.status == 1) {
                    var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                    dialog.find("#tb").val(total.total);
                    swal("Sukses", "Data Barang Di Simpan", "success");
                    table_main_sub.ajax.reload();
                    table_main_sub_pre.ajax.reload();
                  } else {
                    swal("Error", "Data Barang Gagal Di Simpan", "error");
                  }
                }
              });
              dialog.find("#savetrx").on('submit', function(event) {
                event.preventDefault();
                dform = $(this).serializeArray();
                dform[dform.length] = {
                  name: "id_transaksi_barang_keluar",
                  value: idtrx
                };
                var tb = parseFloat(dialog.find("#tb").val());
                var bayar = parseFloat(dialog.find("#total_bayar").val());
                i = post(base_url + "api/akuntansave", {
                  id_transaksi_barang_keluar: idtrx,
                  tipe: "pemasukan",
                  total: bayar,
                  alasan: "Pembayaran"
                });
                if (i.status != 1) {
                  swal("Error", "Kesalahan di Akuntan", "error");
                } else {
                  if (bayar < tb) {
                    dform[dform.length] = {
                      name: "status_transaksi",
                      value: "cashbon"
                    };
                    dform[dform.length] = {
                      name: "cashbon",
                      value: (tb - bayar)
                    };
                    up = post(base_url + "api/transaksiupdate", dform);
                    if (up.status == 1) {
                      bootbox.hideAll();
                      table_main.ajax.reload();
                      swal("Sukses", "Transaksi Berhasil", "success");
                    } else {
                      swal("Error", "Transaksi Gagal", "error");
                    }
                  } else if (bayar == tb) {
                    dform[dform.length] = {
                      name: "status_transaksi",
                      value: "lunas"
                    };
                    dform[dform.length] = {
                      name: "cashbon",
                      value: "0"
                    };
                    up = post(base_url + "api/transaksiupdate", dform);
                    if (up.status == 1) {
                      bootbox.hideAll();
                      table_main.ajax.reload();
                      swal("Sukses", "Transaksi Berhasil", "success");
                    } else {
                      swal("Error", "Transaksi Gagal", "error");
                    }
                  } else {
                    swal("Error", "Jumlah Bayar Terlalu Besar", "error");
                  }
                }
              });
              dialog.find('#table_bk tbody').on('click', 'tr', function() {
                var data = table_main_sub.row(this).data();
                if (data[0] != undefined) {
                  console.log(data[0]);
                  id = data[0];
                  var dialog = bootbox.dialog({
                    title: 'Prepare Menu ',
                    message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
                  });
                  dialog.init(function() {
                    setTimeout(function() {
                      var build = [
                        '<div class="row">',
                        '<div class="col-md-12">',
                        '<button class="btn btn-warning btn-block edit">Edit</button>',
                        '</div>',
                        '<div class="col-md-12">',
                        '<button class="btn btn-danger btn-block hapus">Hapus</button>',
                        '</div>',
                        '</div>'
                      ];
                      dialog.find(".modal-title").html("Pilih Opsi");
                      dialog.find(".bootbox-body").html(build.join(""));
                      dialog.find(".edit").on('click', function(event) {
                        event.preventDefault();
                        var gedit = get(base_url + "api/barangkeluarget/" + id + "/1");
                        if (gedit.status == 1) {
                          console.log("Edit");
                          input = [{
                            label: "Barang",
                            type: "select2",
                            name: "id_barang",
                            id: "brg"
                          }, {
                            label: "Total",
                            type: "number",
                            id: "total_keluar",
                            name: "total_keluar",
                            value: gedit.data.total_keluar
                          }, {
                            label: "",
                            type: "hidden",
                            id: "harga_modal",
                            name: "harga_modal",
                            value: gedit.data.harga_modal
                          }, {
                            label: "",
                            type: "hidden",
                            id: "harga_jual",
                            name: "harga_jual",
                            value: gedit.data.harga_jual
                          }, {
                            label: "",
                            type: "hidden",
                            id: "id_barang_keluar",
                            name: "id_barang_keluar",
                            value: id
                          }, {
                            label: "",
                            name: "",
                            type: "hidden",
                            id: "total_stok",
                            value: gedit.data.stok
                          }];
                          button = {
                            type: "submit",
                            name: "Update",
                            class: "warning"
                          };
                          html = builder(input, button, "upedit");
                          dialog.find(".modal-title").html("Edit Barang");
                          dialog.find(".bootbox-body").html(html);
                          dialog.find("#brg").ready(function() {
                            sd = get(base_url + "api/barangget/-1/1");
                            if (sd.status == 1) {
                              sd_data = sd.data;
                              for (var i = 0; i < sd_data.length; i++) {
                                if (sd_data[i].id_barang == gedit.data.id_barang) {
                                  dialog.find("#brg").append("<option value='" + sd_data[i].id_barang + "' selected>" + sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok + "</option>");
                                  continue;
                                }
                                dialog.find("#brg").append($('<option>', {
                                  value: sd_data[i].id_barang,
                                  text: sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok
                                }));
                              }
                            } else {
                              bootbox.hideAll();
                              swal("Error", "Data Tidak Ada ", "error");
                            }
                          });
                          dialog.find("#brg").on('change', function(event) {
                            event.preventDefault();
                            idbarang = $(this).val();
                            sbarang = get(base_url + "api/barangget/" + idbarang + "/1");
                            if (sbarang.status == 1) {
                              dialog.find("#harga_jual").val(sbarang.data.harga_jual);
                              dialog.find("#harga_modal").val(sbarang.data.harga_modal);
                            } else {
                              swal("Error", "Data Barang Tidak Ditemukan", "error");
                            }
                          });
                          dialog.find("#upedit").on('submit', function(event) {
                            event.preventDefault();
                            dform = $(this).serializeArray();
                            up = post(base_url + "api/barangkeluarupdate", dform);
                            if (up.status == 1) {
                              dialog.modal("hide");
                              cur = parseFloat(dialog.find("#total_keluar").val());
                              old = parseFloat(gedit.data.total_keluar);
                              total_stok = parseFloat(dialog.find("#total_stok").val());
                              if (cur > old && total_stok > cur) {
                                plus = (cur - old);
                                plus = (total_stok - plus);
                                console.log("Pengurangan Stok " + plus);
                                post(base_url + "api/barangupdate", {
                                  id_barang: gedit.data.id_barang,
                                  stok: plus
                                });
                              } else if (cur < old) {
                                plusuk = (old - cur);
                                plusuk = (plusuk + total_stok);
                                console.log("Penambahan Stok " + plusuk);
                                post(base_url + "api/barangupdate", {
                                  id_barang: gedit.data.id_barang,
                                  stok: plusuk
                                });
                              }
                              var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                              $("#tb").val(total.total);

                              swal("Sukses", "Data Di Update", "success");
                              table_main_sub.ajax.reload();
                            } else {
                              swal("Error", "Data Gagal Di Update", "error");
                            }
                          });
                        } else {
                          swal("Error", "Barang Tidak Ditemukan", "error");
                        }
                      });
                      dialog.find(".hapus").on('click', function(event) {
                        event.preventDefault();
                        console.log("Hapus");
                        var con = confirm("Apakah Anda Yakin ? ");
                        if (con) {
                          var del = post(base_url + "api/barangkeluardelete", {
                            id_barang_keluar: id
                          });
                          if (del.status == 1) {
                            dialog.modal("hide");
                            var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                            $("#tb").val(total.total);

                            swal("Sukses", "Data Di Hapus", "success");
                            table_main_sub.ajax.reload();
                          } else {
                            swal("Error", "Data Gagal Di Hapus", "error");
                          }
                        }
                      });

                    }, 1000);
                  });
                }
              });
              dialog.find('#table_bkpre tbody').on('click', 'tr', function() {
                var data = table_main_sub_pre.row(this).data();
                if (data[0] != undefined) {
                  console.log(data[0]);
                  id = data[0];
                  var dialog = bootbox.dialog({
                    title: 'Prepare Menu ',
                    message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
                  });
                  dialog.init(function() {
                    setTimeout(function() {
                      var build = [
                        '<div class="row">',
                        '<div class="col-md-12">',
                        '<button class="btn btn-warning btn-block edit">Edit</button>',
                        '</div>',
                        '<div class="col-md-12">',
                        '<button class="btn btn-danger btn-block hapus">Hapus</button>',
                        '</div>',
                        '</div>'
                      ];
                      dialog.find(".modal-title").html("Pilih Opsi");
                      dialog.find(".bootbox-body").html(build.join(""));
                      dialog.find(".edit").on('click', function(event) {
                        event.preventDefault();
                        var gedit = get(base_url + "api/barangkeluarpreorderget/" + id + "/1");
                        if (gedit.status == 1) {
                          console.log("Edit");
                          input = [{
                            label: "Barang",
                            type: "select2",
                            name: "id_barang",
                            id: "brg"
                          }, {
                            label: "Total",
                            type: "number",
                            id: "total_keluar",
                            name: "total_keluar",
                            value: gedit.data.total_keluar
                          }, {
                            label: "",
                            type: "hidden",
                            id: "harga_modal",
                            name: "harga_modal",
                            value: gedit.data.harga_modal
                          }, {
                            label: "",
                            type: "hidden",
                            id: "harga_jual",
                            name: "harga_jual",
                            value: gedit.data.harga_jual
                          }, {
                            label: "",
                            type: "hidden",
                            id: "id_transaksi_barang_keluar_preorder",
                            name: "id_transaksi_barang_keluar_preorder",
                            value: id
                          }, {
                            label: "",
                            name: "",
                            type: "hidden",
                            id: "total_stok",
                            value: gedit.data.stok
                          }];
                          button = {
                            type: "submit",
                            name: "Update",
                            class: "warning"
                          };
                          html = builder(input, button, "upedit");
                          dialog.find(".modal-title").html("Edit Barang Preorder");
                          dialog.find(".bootbox-body").html(html);
                          dialog.find("#brg").ready(function() {
                            sd = get(base_url + "api/barangget/-1/1");
                            if (sd.status == 1) {
                              sd_data = sd.data;
                              for (var i = 0; i < sd_data.length; i++) {
                                if (sd_data[i].id_barang == gedit.data.id_barang) {
                                  dialog.find("#brg").append("<option value='" + sd_data[i].id_barang + "' selected>" + sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok + "</option>");
                                  continue;
                                }
                                dialog.find("#brg").append($('<option>', {
                                  value: sd_data[i].id_barang,
                                  text: sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok
                                }));
                              }
                            } else {
                              bootbox.hideAll();
                              swal("Error", "Data Tidak Ada ", "error");
                            }
                          });
                          dialog.find("#brg").on('change', function(event) {
                            event.preventDefault();
                            idbarang = $(this).val();
                            sbarang = get(base_url + "api/barangget/" + idbarang + "/1");
                            if (sbarang.status == 1) {
                              dialog.find("#harga_jual").val(sbarang.data.harga_jual);
                              dialog.find("#harga_modal").val(sbarang.data.harga_modal);
                            } else {
                              swal("Error", "Data Barang Tidak Ditemukan", "error");
                            }
                          });
                          dialog.find("#upedit").on('submit', function(event) {
                            event.preventDefault();
                            dform = $(this).serializeArray();
                            up = post(base_url + "api/barangkeluarpreorderupdate", dform);
                            if (up.status == 1) {
                              dialog.modal("hide");
                              swal("Sukses", "Data Di Update", "success");
                              var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                              $("#tb").val(total.total);

                              table_main_sub_pre.ajax.reload();
                            } else {
                              swal("Error", "Data Gagal Di Update", "error");
                            }
                          });
                        } else {
                          swal("Error", "Barang Tidak Ditemukan", "error");
                        }
                      });
                      dialog.find(".hapus").on('click', function(event) {
                        event.preventDefault();
                        console.log("Hapus");
                        var con = confirm("Apakah Anda Yakin ? ");
                        if (con) {
                          var del = post(base_url + "api/barangkeluarpreorderdelete", {
                            id_transaksi_barang_keluar_preorder: id
                          });
                          if (del.status == 1) {
                            dialog.modal("hide");
                            swal("Sukses", "Data Di Hapus", "success");
                            var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                            $("#tb").val(total.total);

                            table_main_sub_pre.ajax.reload();
                          } else {
                            swal("Error", "Data Gagal Di Hapus", "error");
                          }
                        }
                      });

                    }, 1000);
                  });
                }
              });

            } else if (cek.status == 1 && cek.data.status_transaksi == "lunas") {
              bootbox.hideAll();
              swal("Sukses", "Transaksi Sudah Selesai", "info");
            } else if (cek.status == 1 && cek.data.status_transaksi == "cashbon") {
              input = [{
                label: "Total Pembayaran",
                type: "disabled",
                value: (parseFloat(cek.data.cashbon) + parseFloat(cek.data.total_bayar))
              }, {
                label: "Sisa Pembayaran",
                type: "disabled",
                value: (parseFloat(cek.data.cashbon))
              }, {
                label: "Bayar",
                type: "number",
                step: "0.1",
                name: "bayar",
                id: "bayar"
              }, {
                label: "",
                type: "hidden",
                name: "id_transaksi_barang_keluar",
                value: cek.data.id_transaksi_barang_keluar
              }];
              button = {
                type: "submit",
                name: "Bayar",
                class: "success"
              };
              html = builder(input, button, "byar");
              dialog.find(".modal-title").html("Bayar Cashbon");
              dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>" + html + "</div></div>");
              dialog.find("#byar").on('submit', function(event) {
                event.preventDefault();
                dform = $(this).serializeArray();
                ta = (parseFloat(cek.data.cashbon) + parseFloat(cek.data.total_bayar));
                tbs = parseFloat(cek.data.total_bayar);
                ba = parseFloat(dialog.find("#bayar").val());
                if (ba == parseFloat(cek.data.cashbon)) {
                  post(base_url + "api/transaksiupdate", {
                    id_transaksi_barang_keluar: cek.data.id_transaksi_barang_keluar,
                    cashbon: "0",
                    total_bayar: ta,
                    status_transaksi: "lunas"
                  });

                } else if (ba > parseFloat(cek.data.cashbon)) {
                  swal("Error", "Pembayaran Terlalu Besar", "error")
                } else {
                  sisa = (parseFloat(cek.data.cashbon) - ba);
                  tsb = (tbs + ba);
                  post(base_url + "api/transaksiupdate", {
                    id_transaksi_barang_keluar: cek.data.id_transaksi_barang_keluar,
                    cashbon: sisa,
                    total_bayar: tsb
                  });
                }
                ins = post(base_url + "api/barangkeluarcashbonsave", dform);
                if (ins.status == 1) {
                  bootbox.hideAll();
                  table_main.ajax.reload();
                  swal("Sukses", "Data Di Simpan", "success");
                } else {
                  swal("Error", "Data Gagal Di Simpan", "error");
                }
              });
            } else {
              bootbox.hideAll();
              swal("Sukses", "Transaksi Sudah Selesai", "info");
            }
          }, 1000);
        });
      });
      $("#table_main").on('click', '.detail', function(event) {
        idnow = $(this).data("id");
        var dialog = bootbox.dialog({
          title: 'Prepare Menu ',
          message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
        });
        dialog.init(function() {
          setTimeout(function() {
            gdata = get(base_url + "api/transaksiget/" + idnow + "/1");
            if (gdata.status == 1) {
              t1 = table(["ID", "Nama Barang", "Total", "Subtotal"], [], "t1");
              t2 = table(["ID", "Nama Barang", "Total", "Subtotal"], [], "t2");
              t3 = table(["ID", "Bayar", "Tanggal Bayar"], [], "t3");
              t4 = [
                '<p><b>No Faktur : </b>' + gdata.data.nofaktur + '</p>',
                '<p><b>Nama Pembeli : </b>' + gdata.data.nama_pembeli + '</p>',
                '<p><b>Alamat : </b>' + gdata.data.alamat + '</p>',
                '<p><b>Status Transaksi : </b>' + (gdata.data.status_transaksi).toUpperCase() + '</p>',
                '<p><b>Total Bayar : </b>' + gdata.data.total_bayar + '</p>',
                '<p><b>Cashbon : </b>' + gdata.data.cashbon + '</p>'
              ]
              dialog.find(".modal-title").html("Detail Transaksi");
              dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'><h4>Data Transaksi</h4><hr>" + t4.join("") + "</div><div class='col-md-12'><h4>Barang Keluar</h4><hr>" + t1 + "</div><div class='col-md-12'><h4>Barang Keluar [PREORDER]</h4><hr>" + t2 + "</div><div class='col-md-12'><h4>Cashbon Tracker</h4><hr>" + t3 + "</div></div>");
              tt1 = dialog.find("#t1").DataTable({
                ajax: base_url + "api/barangkeluarget/" + idnow
              });
              tt2 = dialog.find("#t2").DataTable({
                ajax: base_url + "api/barangkeluarpreorderget/" + idnow
              });
              tt3 = dialog.find("#t3").DataTable({
                ajax: base_url + "api/barangkeluarcashbonget/" + idnow
              });
            } else {
              swal("Error", "Data Tidak Ditemukan", "error");
            }
          }, 1000);
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
            input = [{
              label: "Nama Pembeli",
              name: "nama_pembeli",
              type: "text"
            }, {
              label: "Alamat",
              name: "alamat",
              type: "text"
            }];
            button = {
              type: "submit",
              name: "Lanjutkan",
              class: "primary"
            };
            html = builder(input, button, "save");
            dialog.find(".modal-title").html("Tambah Transaksi");
            dialog.find(".bootbox-body").html(html);
            dialog.find("#save").on('submit', function(event) {
              event.preventDefault();
              dform = $(this).serializeArray();
              timestamp = $.now();
              dform[dform.length] = {
                name: "nofaktur",
                value: timestamp
              };
              ins = post(base_url + "api/transaksisave", dform);
              idtrx = get(base_url + "api/transaksigetbyfaktor/" + timestamp);
              if (ins.status == 1 && idtrx.status == 1) {
                idtrx = idtrx.id;
                input = [{
                  label: "Barang",
                  name: "id_barang",
                  type: "select2",
                  id: "barang"
                }, {
                  label: "Total",
                  name: "total_keluar",
                  type: "number",
                  step: "0.1",
                  id: "total_keluar"
                }, {
                  label: "",
                  name: "id_transaksi_barang_keluar",
                  type: "hidden",
                  value: idtrx
                }, {
                  label: "",
                  name: "",
                  type: "hidden",
                  id: "total_stok"
                }, {
                  label: "",
                  name: "harga_jual",
                  type: "hidden",
                  id: "harga_jual"
                }, {
                  label: "",
                  name: "harga_modal",
                  type: "hidden",
                  id: "harga_modal"
                }];
                button = {
                  type: "submit",
                  name: "Simpan Barang",
                  class: "primary"
                };
                html = builder(input, button, "save");
                table1 = table(["ID", "Nama Barang", "Jumlah Barang", "Harga", "Subtotal"], [], "table_bk");
                table2 = table(["ID", "Nama Barang", "Jumlah Barang", "Harga", "Subtotal"], [], "table_bkpre");
                input = [{
                  label: "Total Pembayaran",
                  name: "",
                  type: "disabled",
                  id: "tb",
                  value: ""
                }, {
                  label: "Bayar",
                  name: "total_bayar",
                  type: "number",
                  id: "total_bayar",
                  step: "0.1"
                }];
                button = {
                  type: "submit",
                  name: "Simpan Transaksi",
                  class: "success"
                };
                html2 = builder(input, button, "savetrx");
                dialog.find(".modal-title").html("Tambah Barang Nomor " + timestamp);
                dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'>" + html + "</div><div class='col-md-12'><label>Order</label>" + table1 + "</div><div class='col-md-12'><label>Pre Order</label>" + table2 + "</div><div class='col-md-12'>" + html2 + "</div></div>");
                var $select = dialog.find("#barang").selectize({
                  valueField: 'id_barang',
                  labelField: 'nama_barang',
                  searchField: 'nama_barang',
                  options: [],
                  load: function(query, callback) {
                    if (!query.length) return callback();
                    $.ajax({
                      url: base_url+'api/barangget/-1/2',
                      type: 'GET',
                      dataType: 'json',
                      data: {
                        country: query,
                      },
                      error: function() {
                        callback();
                      },
                      success: function(res) {
                        callback(res);
                      }
                    });
                  }
                });
                var selectize = $select[0].selectize;
                var table_main_sub = dialog.find("#table_bk").DataTable({
                  ajax: base_url + "api/barangkeluarget/" + idtrx
                });
                var table_main_sub_pre = dialog.find("#table_bkpre").DataTable({
                  ajax: base_url + "api/barangkeluarpreorderget/" + idtrx
                });
                var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                dialog.find("#tb").val(total.total);
                var getb = function() {
                  sd = get(base_url + "api/barangget/-1/1");
                  if (sd.status == 1) {
                    sd_data = sd.data;
                    selectize.clearOptions();
                    selectize.addOption({
                      value: "",
                      text: ""
                    });
                    selectize.addItem("");
                    for (var i = 0; i < sd_data.length; i++) {
                      selectize.addOption({
                        value: sd_data[i].id_barang,
                        text: sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok
                      });
                      selectize.addItem(sd_data[i].id_barang);
                    }
                  } else {
                    bootbox.hideAll();
                    swal("Error", "Data Tidak Ada ", "error");
                  }
                };
                dialog.find("#barang").on('change', function(event) {
                  event.preventDefault();
                  idbarang = $(this).val();
                  sbarang = get(base_url + "api/barangget/" + idbarang + "/1");
                  if (sbarang.status == 1) {
                    dialog.find("#harga_jual").val(sbarang.data.harga_jual);
                    dialog.find("#harga_modal").val(sbarang.data.harga_modal);
                    dialog.find("#total_stok").val(sbarang.data.stok);
                  } else {
                    swal("Error", "Data Barang Tidak Ditemukan", "error");
                  }
                });
                dialog.find("#save").on('submit', function(event) {
                  event.preventDefault();
                  var s = $(this).serializeArray();
                  var current = parseFloat(dialog.find("#total_stok").val());
                  var t_keluar = parseFloat(dialog.find("#total_keluar").val());

                  if (t_keluar > current) {
                    console.log("Preorder");
                    var t_masuk = (t_keluar - current);
                    var keluar = s;
                    keluar = jQuery.grep(keluar, function(value) {
                      return value.name != "total_keluar";
                    });
                    keluar[keluar.length] = {
                      name: "total_keluar",
                      value: current
                    };
                    if (current != 0) {
                      ins = post(base_url + "api/barangkeluarsave", keluar);
                    } else {
                      ins = {
                        status: 1
                      };
                    }
                    if (ins.status == 1) {
                      table_main_sub.ajax.reload();


                      keluar = jQuery.grep(keluar, function(value) {
                        return value.name != "total_keluar";
                      });
                      keluar[keluar.length] = {
                        name: "total_keluar",
                        value: t_masuk
                      };
                      ins = post(base_url + "api/barangkeluarpreordersave", keluar);
                      if (ins.status == 1) {
                        var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                        dialog.find("#tb").val(total.total);
                        console.log(total);
                        table_main_sub_pre.ajax.reload();
                        swal("Sukses", "Data Barang Di Simpan", "success");
                      } else {
                        swal("Error", "Data Barang Gagal Di Simpan", "error");
                      }
                    } else {
                      swal("Error", "Data Barang Gagal Di Simpan", "error");
                    }
                  } else {
                    ins = post(base_url + "api/barangkeluarsave", s);
                    if (ins.status == 1) {
                      var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                      dialog.find("#tb").val(total.total);
                      swal("Sukses", "Data Barang Di Simpan", "success");
                      table_main_sub.ajax.reload();
                      table_main_sub_pre.ajax.reload();

                    } else {
                      swal("Error", "Data Barang Gagal Di Simpan", "error");
                    }
                  }
                });
                dialog.find("#savetrx").on('submit', function(event) {
                  event.preventDefault();
                  dform = $(this).serializeArray();
                  dform[dform.length] = {
                    name: "id_transaksi_barang_keluar",
                    value: idtrx
                  };
                  var tb = parseFloat(dialog.find("#tb").val());
                  var bayar = parseFloat(dialog.find("#total_bayar").val());
                  i = post(base_url + "api/akuntansave", {
                    id_transaksi_barang_keluar: idtrx,
                    tipe: "pemasukan",
                    total: bayar,
                    alasan: "Pembayaran"
                  });
                  if (i.status != 1) {
                    swal("Error", "Kesalahan di Akuntan", "error");
                  } else {
                    if (bayar < tb) {
                      dform[dform.length] = {
                        name: "status_transaksi",
                        value: "cashbon"
                      };
                      dform[dform.length] = {
                        name: "cashbon",
                        value: (tb - bayar)
                      };
                      up = post(base_url + "api/transaksiupdate", dform);
                      if (up.status == 1) {
                        bootbox.hideAll();
                        table_main.ajax.reload();
                        swal("Sukses", "Transaksi Berhasil", "success");
                      } else {
                        swal("Error", "Transaksi Gagal", "error");
                      }
                    } else if (bayar == tb) {
                      dform[dform.length] = {
                        name: "status_transaksi",
                        value: "lunas"
                      };
                      dform[dform.length] = {
                        name: "cashbon",
                        value: "0"
                      };
                      up = post(base_url + "api/transaksiupdate", dform);
                      if (up.status == 1) {
                        bootbox.hideAll();
                        table_main.ajax.reload();
                        swal("Sukses", "Transaksi Berhasil", "success");
                      } else {
                        swal("Error", "Transaksi Gagal", "error");
                      }
                    } else {
                      swal("Error", "Jumlah Bayar Terlalu Besar", "error");
                    }
                  }
                });
                dialog.find('#table_bk tbody').on('click', 'tr', function() {
                  var data = table_main_sub.row(this).data();
                  if (data[0] != undefined) {
                    console.log(data[0]);
                    id = data[0];
                    var dialog = bootbox.dialog({
                      title: 'Prepare Menu ',
                      message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
                    });
                    dialog.init(function() {
                      setTimeout(function() {
                        var build = [
                          '<div class="row">',
                          '<div class="col-md-12">',
                          '<button class="btn btn-warning btn-block edit">Edit</button>',
                          '</div>',
                          '<div class="col-md-12">',
                          '<button class="btn btn-danger btn-block hapus">Hapus</button>',
                          '</div>',
                          '</div>'
                        ];
                        dialog.find(".modal-title").html("Pilih Opsi");
                        dialog.find(".bootbox-body").html(build.join(""));
                        dialog.find(".edit").on('click', function(event) {
                          event.preventDefault();
                          var gedit = get(base_url + "api/barangkeluarget/" + id + "/1");
                          if (gedit.status == 1) {
                            console.log("Edit");
                            input = [{
                              label: "Barang",
                              type: "select2",
                              name: "id_barang",
                              id: "brg"
                            }, {
                              label: "Total",
                              type: "number",
                              id: "total_keluar",
                              name: "total_keluar",
                              value: gedit.data.total_keluar
                            }, {
                              label: "",
                              type: "hidden",
                              id: "harga_modal",
                              name: "harga_modal",
                              value: gedit.data.harga_modal
                            }, {
                              label: "",
                              type: "hidden",
                              id: "harga_jual",
                              name: "harga_jual",
                              value: gedit.data.harga_jual
                            }, {
                              label: "",
                              type: "hidden",
                              id: "id_barang_keluar",
                              name: "id_barang_keluar",
                              value: id
                            }, {
                              label: "",
                              name: "",
                              type: "hidden",
                              id: "total_stok",
                              value: gedit.data.stok
                            }];
                            button = {
                              type: "submit",
                              name: "Update",
                              class: "warning"
                            };
                            html = builder(input, button, "upedit");
                            dialog.find(".modal-title").html("Edit Barang");
                            dialog.find(".bootbox-body").html(html);
                            dialog.find("#brg").ready(function() {
                              sd = get(base_url + "api/barangget/-1/1");
                              if (sd.status == 1) {
                                sd_data = sd.data;
                                for (var i = 0; i < sd_data.length; i++) {
                                  if (sd_data[i].id_barang == gedit.data.id_barang) {
                                    dialog.find("#brg").append("<option value='" + sd_data[i].id_barang + "' selected>" + sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok + "</option>");
                                    continue;
                                  }
                                  dialog.find("#brg").append($('<option>', {
                                    value: sd_data[i].id_barang,
                                    text: sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok
                                  }));
                                }
                              } else {
                                bootbox.hideAll();
                                swal("Error", "Data Tidak Ada ", "error");
                              }
                            });
                            dialog.find("#brg").on('change', function(event) {
                              event.preventDefault();
                              idbarang = $(this).val();
                              sbarang = get(base_url + "api/barangget/" + idbarang + "/1");
                              if (sbarang.status == 1) {
                                dialog.find("#harga_jual").val(sbarang.data.harga_jual);
                                dialog.find("#harga_modal").val(sbarang.data.harga_modal);
                              } else {
                                swal("Error", "Data Barang Tidak Ditemukan", "error");
                              }
                            });
                            dialog.find("#upedit").on('submit', function(event) {
                              event.preventDefault();
                              dform = $(this).serializeArray();
                              up = post(base_url + "api/barangkeluarupdate", dform);
                              if (up.status == 1) {
                                dialog.modal("hide");
                                cur = parseFloat(dialog.find("#total_keluar").val());
                                old = parseFloat(gedit.data.total_keluar);
                                total_stok = parseFloat(dialog.find("#total_stok").val());
                                if (cur > old && total_stok > cur) {
                                  plus = (cur - old);
                                  plus = (total_stok - plus);
                                  console.log("Pengurangan Stok " + plus);
                                  post(base_url + "api/barangupdate", {
                                    id_barang: gedit.data.id_barang,
                                    stok: plus
                                  });
                                } else if (cur < old) {
                                  plusuk = (old - cur);
                                  plusuk = (plusuk + total_stok);
                                  console.log("Penambahan Stok " + plusuk);
                                  post(base_url + "api/barangupdate", {
                                    id_barang: gedit.data.id_barang,
                                    stok: plusuk
                                  });
                                }
                                var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                                $("#tb").val(total.total);

                                swal("Sukses", "Data Di Update", "success");
                                table_main_sub.ajax.reload();
                              } else {
                                swal("Error", "Data Gagal Di Update", "error");
                              }
                            });
                          } else {
                            swal("Error", "Barang Tidak Ditemukan", "error");
                          }
                        });
                        dialog.find(".hapus").on('click', function(event) {
                          event.preventDefault();
                          console.log("Hapus");
                          var con = confirm("Apakah Anda Yakin ? ");
                          if (con) {
                            var del = post(base_url + "api/barangkeluardelete", {
                              id_barang_keluar: id
                            });
                            if (del.status == 1) {
                              dialog.modal("hide");
                              var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                              $("#tb").val(total.total);
                              swal("Sukses", "Data Di Hapus", "success");

                              table_main_sub.ajax.reload();
                            } else {
                              swal("Error", "Data Gagal Di Hapus", "error");
                            }
                          }
                        });

                      }, 1000);
                    });
                  }
                });
                dialog.find('#table_bkpre tbody').on('click', 'tr', function() {
                  var data = table_main_sub_pre.row(this).data();
                  if (data[0] != undefined) {
                    console.log(data[0]);
                    id = data[0];
                    var dialog = bootbox.dialog({
                      title: 'Prepare Menu ',
                      message: '<p><center><i class="fa fa-spin fa-spinner"></i> Loading...</center></p>'
                    });
                    dialog.init(function() {
                      setTimeout(function() {
                        var build = [
                          '<div class="row">',
                          '<div class="col-md-12">',
                          '<button class="btn btn-warning btn-block edit">Edit</button>',
                          '</div>',
                          '<div class="col-md-12">',
                          '<button class="btn btn-danger btn-block hapus">Hapus</button>',
                          '</div>',
                          '</div>'
                        ];
                        dialog.find(".modal-title").html("Pilih Opsi");
                        dialog.find(".bootbox-body").html(build.join(""));
                        dialog.find(".edit").on('click', function(event) {
                          event.preventDefault();
                          var gedit = get(base_url + "api/barangkeluarpreorderget/" + id + "/1");
                          if (gedit.status == 1) {
                            console.log("Edit");
                            input = [{
                              label: "Barang",
                              type: "select2",
                              name: "id_barang",
                              id: "brg"
                            }, {
                              label: "Total",
                              type: "number",
                              id: "total_keluar",
                              name: "total_keluar",
                              value: gedit.data.total_keluar
                            }, {
                              label: "",
                              type: "hidden",
                              id: "harga_modal",
                              name: "harga_modal",
                              value: gedit.data.harga_modal
                            }, {
                              label: "",
                              type: "hidden",
                              id: "harga_jual",
                              name: "harga_jual",
                              value: gedit.data.harga_jual
                            }, {
                              label: "",
                              type: "hidden",
                              id: "id_transaksi_barang_keluar_preorder",
                              name: "id_transaksi_barang_keluar_preorder",
                              value: id
                            }, {
                              label: "",
                              name: "",
                              type: "hidden",
                              id: "total_stok",
                              value: gedit.data.stok
                            }];
                            button = {
                              type: "submit",
                              name: "Update",
                              class: "warning"
                            };
                            html = builder(input, button, "upedit");
                            dialog.find(".modal-title").html("Edit Barang Preorder");
                            dialog.find(".bootbox-body").html(html);
                            dialog.find("#brg").ready(function() {
                              sd = get(base_url + "api/barangget/-1/1");
                              if (sd.status == 1) {
                                sd_data = sd.data;
                                for (var i = 0; i < sd_data.length; i++) {
                                  if (sd_data[i].id_barang == gedit.data.id_barang) {
                                    dialog.find("#brg").append("<option value='" + sd_data[i].id_barang + "' selected>" + sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok + "</option>");
                                    continue;
                                  }
                                  dialog.find("#brg").append($('<option>', {
                                    value: sd_data[i].id_barang,
                                    text: sd_data[i].nama_barang + " - Stok = " + sd_data[i].stok
                                  }));
                                }
                              } else {
                                bootbox.hideAll();
                                swal("Error", "Data Tidak Ada ", "error");
                              }
                            });
                            dialog.find("#brg").on('change', function(event) {
                              event.preventDefault();
                              idbarang = $(this).val();
                              sbarang = get(base_url + "api/barangget/" + idbarang + "/1");
                              if (sbarang.status == 1) {
                                dialog.find("#harga_jual").val(sbarang.data.harga_jual);
                                dialog.find("#harga_modal").val(sbarang.data.harga_modal);
                              } else {
                                swal("Error", "Data Barang Tidak Ditemukan", "error");
                              }
                            });
                            dialog.find("#upedit").on('submit', function(event) {
                              event.preventDefault();
                              dform = $(this).serializeArray();
                              up = post(base_url + "api/barangkeluarpreorderupdate", dform);
                              if (up.status == 1) {
                                dialog.modal("hide");
                                swal("Sukses", "Data Di Update", "success");
                                var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                                $("#tb").val(total.total);

                                table_main_sub_pre.ajax.reload();
                              } else {
                                swal("Error", "Data Gagal Di Update", "error");
                              }
                            });
                          } else {
                            swal("Error", "Barang Tidak Ditemukan", "error");
                          }
                        });
                        dialog.find(".hapus").on('click', function(event) {
                          event.preventDefault();
                          console.log("Hapus");
                          var con = confirm("Apakah Anda Yakin ? ");
                          if (con) {
                            var del = post(base_url + "api/barangkeluarpreorderdelete", {
                              id_transaksi_barang_keluar_preorder: id
                            });
                            if (del.status == 1) {
                              dialog.modal("hide");
                              swal("Sukses", "Data Di Hapus", "success");
                              var total = get(base_url + "api/barangkeluarcalc/" + idtrx);
                              $("#tb").val(total.total);

                              table_main_sub_pre.ajax.reload();
                            } else {
                              swal("Error", "Data Gagal Di Hapus", "error");
                            }
                          }
                        });

                      }, 1000);
                    });
                  }
                });
              } else {
                bootbox.hideAll();
                swal("Error", "Transaksi Gagal", "error");
              }
            });
          }, 500);
        });
      });
      $("#table_main").on('click', '.detail', function(event) {

      });
    })
    .fail(function(jqxhr, settings, exception) {
      swal("Error", "Failed to Get Main Scripts", "error");
    });
});
