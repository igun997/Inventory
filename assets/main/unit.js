$(document).ready(function() {
  console.log("Category");
  $.getScript(base_url+"assets/main/main.js")
  .done(async function( script, textStatus ) {

    res = await $.get(base_url+"api/unitread").then();

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
                val.name,
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
      updateData = await $.get(base_url+"api/unitread/"+id).then();

      if (updateData.code == 200) {

        updateData = updateData.data;

        console.log(updateData);

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
              "<label>Name</label>",
              "<input class=form-control name=name value='"+updateData.name+"' required>",
              "</div>",
              "<div class='form-group'>",
              "<button class='btn btn-success' type=submit >Simpan Data</button>",
              "</div>",
              "</div>",
              "</form>",
              "</div>",
            ]

            dialog.find(".bootbox-body").html(form.join(""));

            dialog.find("#submit").on("submit", function(event) {

              dform = $(this).serializeArray();
              dform[dform.length] = {name:"id",value:id};

              $.post(base_url+"api/unitinsert",dform,function(r){

                if (r.code == 200) {

                  swal("Sukses","Simpan Data Berhasil","success");

                  setTimeout(function () {
                    location.reload();
                  }, 1000);

                }else {

                  swal("Error","Gagal Update Data","error");

                }

              }).fail(function(){

                swal("Error","Gagal Update Data","error");

              })


            })




          }, 1000);
      });

      }else {
        swal("Error","Data Not Found","error");
      }

    })

    $("#tambah").on("click", async  function(event) {

      if (true) {


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
              "<label>Name</label>",
              "<input class=form-control name=name value='' required>",
              "</div>",
              "<div class='form-group'>",
              "<button class='btn btn-success' type=submit >Simpan Data</button>",
              "</div>",
              "</div>",
              "</form>",
              "</div>",
            ]

            dialog.find(".bootbox-body").html(form.join(""));


            dialog.find("#submit").on("submit",function(event) {


              dform = $(this).serializeArray();

              $.post(base_url+"api/unitinsert",dform,function(r){

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
        swal("Info","Data Kosong","error");
      }

    })


  })
  .fail(function( jqxhr, settings, exception ) {
    swal("Error","Failed to Get Main Scripts","error");
  });
});
