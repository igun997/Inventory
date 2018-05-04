$(document).ready(function() {
  $.getScript(base_url+"assets/main/main.js")
  .done(function( script, textStatus ) {
    chart();
    function chart() {
  		var config = {
  			type: 'line',
  			data: {
  				labels:["Teset"],
  				datasets: [{
  					label: 'Keuntungan Kotor',
  					backgroundColor: "#DD4B39",
  					borderColor: "#DD4B39",
  					data: [1,2,3,4],
  					fill: false,
  				}, {
  					label: 'Keuntungan Bersih',
  					fill: false,
  					backgroundColor: "#1E282C",
  					borderColor: "#1E282C",
  					data: [4,2,12,4],
  				}]
  			},
  			options: {
  				responsive: true,
  				title: {
  					display: true,
  					text: 'Laporan Penjualan'
  				},
  				tooltips: {
  					mode: 'index',
  					intersect: false,
  				},
  				hover: {
  					mode: 'nearest',
  					intersect: true
  				},
  				scales: {
  					xAxes: [{
  						display: true,
  						scaleLabel: {
  							display: true,
  							labelString: 'Tanggal'
  						}
  					}],
  					yAxes: [{
  						display: true,
  						scaleLabel: {
  							display: true,
  							labelString: 'Nilai'
  						}
  					}]
  				}
  			}
  		};
  		var ctx = document.getElementById('chart_laporan').getContext('2d');
  		window.myLine = new Chart(ctx, config);
    }
    // laporan Barang Keluar
    input = [
      {
        label:"Mulai",
        type:"text",
        name:"start",
        id:"start_penjualan"
      },{
        label:"Selesai",
        type:"text",
        name:"end",
        id:"end_penjualan"
      }
    ];
    button = {name:"Cari",class:"success",type:"submit"};
    html = builder(input,button,"cari",true,false,base_url+"api/laporanpenjualan");
    $("#lapeng").html(html);
    $("#start_penjualan").datepicker({
      format:"yyyy-mm-dd"
    });
    $("#end_penjualan").datepicker({
      format:"yyyy-mm-dd"
    });
    // Laporan Akuntan Masuk
    input_kasmasuk = [
      {
        label:"Mulai",
        type:"text",
        name:"start",
        id:"start_kasmasuk"
      },{
        label:"Selesai",
        type:"text",
        name:"end",
        id:"end_kasmasuk"
      }
    ];
    buttonkasmasuk = {name:"Cari",class:"success",type:"submit"};
    htmlkasmasuk = builder(input_kasmasuk,buttonkasmasuk,"cari",true,false,base_url+"api/laporankasmasuk");
    $("#kasmasuk").html(htmlkasmasuk);
    $("#start_kasmasuk").datepicker({
      format:"yyyy-mm-dd"
    });
    $("#end_kasmasuk").datepicker({
      format:"yyyy-mm-dd"
    });
    // Laporan Akuntan Keluar
    input_kasmasuk = [
      {
        label:"Mulai",
        type:"text",
        name:"start",
        id:"start_kaskeluar"
      },{
        label:"Selesai",
        type:"text",
        name:"end",
        id:"end_kaskeluar"
      }
    ];
    buttonkasmasuk = {name:"Cari",class:"success",type:"submit"};
    htmlkasmasuk = builder(input_kasmasuk,buttonkasmasuk,"cari",true,false,base_url+"api/laporankaskeluar");
    $("#kaskeluar").html(htmlkasmasuk);
    $("#start_kaskeluar").datepicker({
      format:"yyyy-mm-dd"
    });
    $("#end_kaskeluar").datepicker({
      format:"yyyy-mm-dd"
    });
    // Laporan Stok Opname
    input_kasmasuk = [
      {
        label:"Mulai",
        type:"text",
        name:"start",
        id:"start_opname"
      },{
        label:"Selesai",
        type:"text",
        name:"end",
        id:"end_opname"
      }
    ];
    buttonkasmasuk = {name:"Cari",class:"success",type:"submit"};
    htmlkasmasuk = builder(input_kasmasuk,buttonkasmasuk,"cari",true,false,base_url+"api/laporanopname");
    $("#lapopname").html(htmlkasmasuk);
    $("#start_opname").datepicker({
      format:"yyyy-mm-dd"
    });
    $("#end_opname").datepicker({
      format:"yyyy-mm-dd"
    });
  })
  .fail(function( jqxhr, settings, exception ) {
    swal("Error","Failed to Get Main Scripts","error");
  });
});
