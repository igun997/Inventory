<section class="content">
  <div class="row">
  <?php if($this->session->hak_akses == "admin"): ?>
  <div class="col-md-6  col-md-offset-3">
    <div class="box box-danger">
      <div class="box-header with-border">
        <h1 class="box-title">Laporan Barang Keluar</h1>
      </div>
      <div class="box-body">
        <div id="lapeng">

        </div>
      </div>
    </div>
  </div>
  <?php endif; ?>
  <?php if($this->session->hak_akses == "gudang"): ?>
  <div class="col-md-6 col-md-offset-3">
    <div class="box box-danger">
      <div class="box-header with-border">
        <h1 class="box-title">Laporan Stok Opname</h1>
      </div>
      <div class="box-body">
        <div id="lapopname">

        </div>
      </div>
    </div>
  </div>
  <?php endif; ?>
  <?php if($this->session->hak_akses == "direktur"): ?>
  <div class="col-md-6">
    <div class="box box-danger">
      <div class="box-header with-border">
        <h1 class="box-title">Laporan Pemasukan</h1>
      </div>
      <div class="box-body">
        <div id="kasmasuk">

        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="box box-danger">
      <div class="box-header with-border">
        <h1 class="box-title">Laporan Pengeluaran</h1>
      </div>
      <div class="box-body">
        <div id="kaskeluar">

        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="box box-danger">
      <div class="box-header with-border">
        <h1 class="box-title">Laporan Barang Keluar</h1>
      </div>
      <div class="box-body">
        <div id="lapeng">

        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="box box-danger">
      <div class="box-header with-border">
        <h1 class="box-title">Laporan Stok Opname</h1>
      </div>
      <div class="box-body">
        <div id="lapopname">

        </div>
      </div>
    </div>
  </div>
  <?php endif; ?>
  </div>
</section>
