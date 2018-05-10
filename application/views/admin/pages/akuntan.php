<section class="content">
  <div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-aqua"><i class="fa fa-arrow-up"></i></span>

        <div class="info-box-content">
          <span class="info-box-text">Total <br>Pemasukan</span>
          <span class="info-box-number">{pemasukan_old}</span>
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
          <span class="info-box-text">Total <br>Pengeluaran</span>
          <span class="info-box-number">{pengeluaran_old}</span>
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
          <span class="info-box-number">{pemasukan_now}</span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
    <!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-yellow"><i class="fa fa-money"></i></span>

        <div class="info-box-content">
          <span class="info-box-text">Pengeluaran<br> Hari Ini</span>
          <span class="info-box-number">{pengeluaran_now}</span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
    <!-- /.col -->
  </div>

  <div class="row">
  <div class="col-md-12">
    <div class="box box-danger">
      <div class="box-header with-border">
        <h1 class="box-title">{block_title}</h1>
        <button type="button" id="add" class="btn btn-primary pull-right">
          <i class="fa fa-money"></i>
        </button>
      </div>
      <div class="box-body">
        <table class="table" id="table_main">
          <thead>
            <th>ID</th>
            <th>Tipe</th>
            <th>Transaksi ID</th>
            <th>Total</th>
            <th>Alasan</th>
            <th>Tanggal Transaksi</th>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
</section>
