$(document).ready(function() {
  console.log("Category");
  $.getScript(base_url+"assets/main/main.js")
  .done(async function( script, textStatus ) {

    res = await $.get(base_url+"api/recordread").then();

    console.log(res);

    data = [];

    if (res.code == 200) {

      if (res.data != undefined) {

        if (res.data.length > 0) {

          $.each(res.data, function(index, val) {


            num = index+1;
            data.push(
              [
                num,
                val.total+" "+val.unit.name,
                val.category.parent.name+" "+val.category.code,
                val.data_created,
                val.input_created,
                "<button class='btn btn-warning edit' data-id='"+val.id+"'><li class='fa fa-edit'></li></button>",
              ]
            );




          });

        }


      }



    }else if (res.code == 404) {
      toastr.error("Data Kosong");
    }else {
      swal("Error","Internal Server Error","error");
    }

    $("#main_table").DataTable({
      data:data
    });

    $("#main_table").on("click", ".edit", async function(event) {
      id = $(this).data("id");
      updateData = await $.get(base_url+"api/recordread/"+id).then();
      unitRead = await $.get(base_url+"api/unitread").then();
      categoryRead = await $.get(base_url+"api/categoryread/-1").then();

      if (unitRead.code == 200 && categoryRead.code == 200 && updateData.code == 200) {
        dunit = unitRead.data;
        dcat = categoryRead.data;
        dup = updateData.data;

        console.log(dcat);

        var dialog = bootbox.dialog({
          title: 'Edit Data',
          message: '<p align=center><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
        });
        dialog.init(function(){
          setTimeout(function(){

            let form = [
              "<div class='row'>",
              "<form class='form-horizontal' id=submit onsubmit='return false'>",
              "<div class='col-md-8 col-md-offset-2'>",
              "<div class='form-group'>",
              "<label>Total</label>",
              "<input class=form-control name=total value='"+dup.total+"' type=number min=0 step='0.1' required>",
              "</div>",
              "<div class='form-group'>",
              "<label>Data Dibuat</label>",
              "<input class=form-control name=data_created id=data_created value='"+dup.data_created+"' type=date  required>",
              "</div>",
              "<div class='form-group'>",
              "<label>Unit</label>",
              "<select class=form-control name=unit_id id=unit_id ></select>",
              "</div>",
              "<div class='form-group'>",
              "<label>Category Codes</label>",
              "<select class=form-control name=category_id id=category_id ></select>",
              "</div>",
              "<div class='form-group'>",
              "<button class='btn btn-success' type=submit >Simpan Data</button>",
              "</div>",
              "</div>",
              "</form>",
              "</div>",
            ]

            dialog.find(".bootbox-body").html(form.join(""));
            var date = new Date(dup.data_created*1000)

            dialog.find("#data_created").val(date.toISOString().slice(0,10));

            $.each(dunit, function(index, val) {
              if (dup.unit_id == val.id) {

                dialog.find("#unit_id").append(([
                  "<option selected value="+val.id+">"+val.name+"</option>"
                ]).join(""));

              }else {

                dialog.find("#unit_id").append(([
                  "<option value="+val.id+">"+val.name+"</option>"
                ]).join(""));

              }


            });

            $.each(dcat, function(index, val) {

              if (dup.category_id == val.id) {

                dialog.find("#category_id").append(([
                  "<option selected value="+val.id+">"+val.parent.name+" "+val.code+"</option>"
                ]).join(""));

              }else {

                dialog.find("#category_id").append(([
                  "<option value="+val.id+">"+val.parent.name+" "+val.code+"</option>"
                ]).join(""));
              }

            });

            dialog.find("#submit").on("submit",function(event) {


              dform = $(this).serializeArray();
              dform[dform.length] = {name:"id",value:id};

              $.post(base_url+"api/recordinsert",dform,function(r){

                if (r.code == 200) {
                  toastr.success("Sukses Tambah Data");
                  setTimeout(function () {
                    location.reload();
                  }, 1000);
                }else {
                  toastr.error("Gagal Tambah Data");
                }

              }).fail(function () {
                console.log("Error Insert");
              })

            })

          },200);
        })
      }else {
        toastr.error("Data Master Belum Di Buat");
      }

    })

    $("#tambah").on("click", async  function(event) {

      if (true) {




        unitRead = await $.get(base_url+"api/unitread").then();
        categoryRead = await $.get(base_url+"api/categoryread/-1").then();

        if (unitRead.code == 200 && categoryRead.code == 200) {
          dunit = unitRead.data;
          dcat = categoryRead.data;

          console.log(dcat);

          var dialog = bootbox.dialog({
            title: 'Tambah Data',
            message: '<p align=center><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
          });
          dialog.init(function(){
            setTimeout(function(){

              let form = [
                "<div class='row'>",
                "<form class='form-horizontal' id=submit onsubmit='return false'>",
                "<div class='col-md-8 col-md-offset-2'>",
                "<div class='form-group'>",
                "<label>Total</label>",
                "<input class=form-control name=total value='' type=number min=0 step=0.1 required>",
                "</div>",
                "<div class='form-group'>",
                "<label>Data Dibuat</label>",
                "<input class=form-control name=data_created value='' type=date  required>",
                "</div>",
                "<div class='form-group'>",
                "<label>Unit</label>",
                "<select class=form-control name=unit_id id=unit_id ></select>",
                "</div>",
                "<div class='form-group'>",
                "<label>Category Codes</label>",
                "<select class=form-control name=category_id id=category_id ></select>",
                "</div>",
                "<div class='form-group'>",
                "<button class='btn btn-success' type=submit >Simpan Data</button>",
                "</div>",
                "</div>",
                "</form>",
                "</div>",
              ]

              dialog.find(".bootbox-body").html(form.join(""));

              $.each(dunit, function(index, val) {

                dialog.find("#unit_id").append(([
                  "<option value="+val.id+">"+val.name+"</option>"
                ]).join(""));

              });

              $.each(dcat, function(index, val) {

                dialog.find("#category_id").append(([
                  "<option value="+val.id+">"+val.parent.name+" "+val.code+"</option>"
                ]).join(""));

              });

              dialog.find("#submit").on("submit",function(event) {


                dform = $(this).serializeArray();

                $.post(base_url+"api/recordinsert",dform,function(r){

                  if (r.code == 200) {
                    toastr.success("Sukses Tambah Data");
                    setTimeout(function () {
                      location.reload();
                    }, 1000);
                  }else {
                    toastr.error("Gagal Tambah Data");
                  }

                }).fail(function () {
                  console.log("Error Insert");
                })

              })

            },200);
          })
        }else {
          toastr.error("Data Master Belum Di Buat");
        }


      }else {
        swal("Info","Data Kosong","error");
      }

    })


  })
  .fail(function( jqxhr, settings, exception ) {
    swal("Error","Failed to Get Main Scripts","error");
  });
});
