<section class="content">
  <div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-aqua"><i class="fa fa-arrow-up"></i></span>

        <div class="info-box-content">
          <span class="info-box-text">Barang Keluar</span>
          <span class="info-box-number">{bk_count}</span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
    <!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-red"><i class="fa fa-arrow-down"></i></span>

        <div class="info-box-content">
          <span class="info-box-text">Barang Masuk</span>
          <span class="info-box-number">{bm_count}</span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
    <!-- /.col -->

    <!-- fix for small devices only -->
    <div class="clearfix visible-sm-block"></div>

    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-green"><i class="fa fa-money"></i></span>

        <div class="info-box-content">
          <span class="info-box-text">Pemasukan <br> Hari Ini</span>
          <span class="info-box-number">{phi_cunt}</span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
    <!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>

        <div class="info-box-content">
          <span class="info-box-text">Pengeluaran<br> Hari Ini</span>
          <span class="info-box-number">{pnhi_count}</span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
    <!-- /.col -->
  </div>
  <!-- Small boxes (Stat box) -->
    <div class="row">
    <div class="col-md-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h1 class="box-title">{block_title}</h1>
        </div>
        <div class="box-body">
          <div class="table-responsive">
            <table class="table" id="main_table">
              <thead>
                <tr>
                  <th colspan="4"><center>Informasi Faktur</center></th>
                  <th colspan="2"><center>Keuntungan</center></th>
                </tr>
                <tr>
                  <th>No Faktur</th>
                  <th>Status Transaksi</th>
                  <th>Total Pembayaran</th>
                  <th>Tanggal Transaksi</th>
                  <th>Bersih</th>
                  <th>Kotor</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
