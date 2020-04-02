$(document).ready(function() {
  console.log("Category");
  $.getScript(base_url+"assets/main/main.js")
  .done(async function( script, textStatus ) {

    res = await $.get(base_url+"api/categoryread").then();

    console.log(res);

    data = [];

    if (res.code == 200) {

      if (res.data != undefined) {

        if (res.data.length > 0) {

          $.each(res.data, function(index, val) {

            is_parent = "yes";
            if (val.parent_id != null) {
              is_parent = "no";
            }
            name = "";
            if (val.related != null) {
              name = val.related.name;
            }
            num = index+1;
            data.push(
              [
                num,
                val.name,
                val.code,
                name,
                is_parent,
                "<button class='btn btn-warning edit' data-id='"+val.id+"' data-type='parent'><li class='fa fa-edit'></li></button>",
              ]
            );

            if (val.child != null) {
              $.each(val.child, function(i, v) {

                data.push(
                  [
                    num+"."+(i+1),
                    v.name,
                    v.code,
                    "",
                    "no",
                    "<button class='btn btn-warning edit' data-id='"+v.id+"' data-type='child'><li class='fa fa-edit'></li></button>",
                  ]
                );

              });
            }


          });

        }


      }



    }else {
      swal("Error","Internal Server Error","error");
    }

    $("#main_table").DataTable({
      data:data
    });

    $("#main_table").on("click", ".edit", async function(event) {
      id = $(this).data("id");
      type = $(this).data("type");
      console.log(type);
      updateData = await $.get(base_url+"api/categoryread/"+id).then();

      if (updateData.code == 200) {

        updateData = updateData.data;

        var dialog = bootbox.dialog({
          title: 'Edit Data',
          message: '<p align=center><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
        });

        dialog.init(function(){
          setTimeout(function(){

            if (type == "parent") {

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

            }else {

              let form = [
                "<div class='row'>",
                "<form class='form-horizontal' id=submit onsubmit='return false'>",
                "<div class='col-md-8 col-md-offset-2'>",
                "<div class='form-group'>",
                "<label>Name</label>",
                "<input class=form-control disabled  value='"+updateData.parent.name+"' required>",
                "</div>",
                "<div class='form-group'>",
                "<label>Code</label>",
                "<input class=form-control name=code value='"+updateData.code+"' required>",
                "</div>",
                "<div class='form-group'>",
                "<button class='btn btn-success' type=submit >Simpan Data</button>",
                "</div>",
                "</div>",
                "</form>",
                "</div>",
              ]

              dialog.find(".bootbox-body").html(form.join(""));


            }
            dialog.find("#submit").on("submit", function(event) {

              dform = $(this).serializeArray();
              dform[dform.length] = {name:"id",value:id};

              $.post(base_url+"api/categoryinsert",dform,function(r){

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

    $("#tambah_parent").on("click", async  function(event) {
      selectData = await $.get(base_url+"api/categoryread").then();

      if (selectData.code == 200) {

        select = selectData.data;

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
              "<label>Related To</label>",
              "<select class=form-control name=category_id id=cat_id ></select>",
              "</div>",
              "<div class='form-group'>",
              "<button class='btn btn-success' type=submit >Simpan Data</button>",
              "</div>",
              "</div>",
              "</form>",
              "</div>",
            ]

            dialog.find(".bootbox-body").html(form.join(""));
            dialog.find("#cat_id").html("<option></option>");
            $.each(select, function(index, val) {

              dialog.find("#cat_id").append((
                [
                  "<option value='"+val.id+"'>"+val.name+"</option>"
                ]
              ).join(""));

            });

            dialog.find("#submit").on("submit",function(event) {


              dform = $(this).serializeArray();

              $.post(base_url+"api/categoryinsert",dform,function(r){

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

    $("#tambah_child").on("click", async  function(event) {
      selectData = await $.get(base_url+"api/categoryread").then();

      if (selectData.code == 200) {

        select = selectData.data;

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
              "<label>Code</label>",
              "<input class=form-control name=code value='' required>",
              "</div>",
              "<div class='form-group'>",
              "<label>Parent</label>",
              "<select class=form-control name=parent_id id=cat_id ></select>",
              "</div>",
              "<div class='form-group'>",
              "<button class='btn btn-success' type=submit >Simpan Data</button>",
              "</div>",
              "</div>",
              "</form>",
              "</div>",
            ]

            dialog.find(".bootbox-body").html(form.join(""));
            dialog.find("#cat_id").html("<option></option>");
            $.each(select, function(index, val) {

              dialog.find("#cat_id").append((
                [
                  "<option value='"+val.id+"'>"+val.name+"</option>"
                ]
              ).join(""));

            });

            dialog.find("#submit").on("submit",function(event) {


              dform = $(this).serializeArray();

              $.post(base_url+"api/categoryinsert",dform,function(r){

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
