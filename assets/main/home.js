$(document).ready(function() {
  $.getScript(base_url+"assets/main/main.js")
  .done(function( script, textStatus ) {
    var cur = 0;
    var laba = 0;
    var kotor = 0;
    $("#main_table").DataTable({
      ajax:base_url+"api/dashboardreport",
      createdRow: function(row, data, dataIndex){
        console.log(data);
        dateexp = data[3].split(" ");
        console.log(dateexp[0]);
        if (cur == 0) {
          console.log("First Date");
          cur = dateexp;
        }else if (cur == dateexp[0]) {
          laba = laba + data[4];
          kotor = kotor + data[5];
        }else if (cur != dateexp[0]) {
          var table = this.api();
          
        }
        if(data[0] === 'Ashton Cox'){
            $('td:eq(0)', row).attr('colspan', 4);
            $('td:eq(1)', row).css('display', 'none');
            $('td:eq(2)', row).css('display', 'none');
            $('td:eq(3)', row).css('display', 'none');
            this.api().cell($('td:eq(0)', row)).data('N/A');
        }
    }
    });
  })
  .fail(function( jqxhr, settings, exception ) {
    swal("Error","Failed to Get Main Scripts","error");
  });
});
