<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{title}</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  {css}
  <link rel="stylesheet" href="{url}">
  {/css}

</head>
<body class="hold-transition skin-red sidebar-mini">
  <script type="text/javascript">
    const base_url = "<?= base_url() ?>";
  </script>
  <style media="screen">
    .modal{
      overflow-y:scroll;
    }
    .modal-dialog{
      width:80%;
    }
  </style>
<div class="wrapper">
<header class="main-header">
  <!-- Logo -->
  <a href="<?= base_url() ?>" class="logo">
    <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini"></span>
    <!-- logo for regular state and mobile devices -->
    <span class="logo-lg">LOGO</span>
  </a>
  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>

    <div class="">
        <!-- User Account: style can be found in dropdown.less -->

  </nav>
</header>
<aside class="main-sidebar">
  <section class="sidebar">
    <!-- Sidebar user panel -->

    <!-- search form -->
    <!--Logo-->
    <!--<div class="col-md-6 col-md-offset-3">
      LOGO
    </div>-->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <?php
    $base_admin = function($url=""){
      return base_url("admin/".$url);
    };
    ?>
    <ul class="sidebar-menu" data-widget="tree">
      <li>
        <a href="<?= $base_admin() ?>">
          <i class="fa fa-home"></i>
          <span>HOME</span>
        </a>
      </li>
      <?php if($this->session->hak_akses == "admin"): ?>
        <li>
          <a href="<?= $base_admin("transaksi") ?>">
            <i class="fa fa-arrow-up"></i> <span>Pengeluaran Barang</span>
            <span class="pull-right-container">
            </span>
          </a>
        </li>
      <?php endif; ?>
      <?php if($this->session->hak_akses == "gudang"): ?>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>MASTER DATA</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="<?= $base_admin("barang") ?>"><i class="fa fa-circle-o"></i> Barang</a></li>
            <li><a href="<?= $base_admin("kategoribarang") ?>"><i class="fa fa-circle-o"></i> Kategori Barang</a></li>
          </ul>
        </li>
        <li>
        <a href="<?= $base_admin("stokopname") ?>">
          <i class="fa fa-adjust"></i> <span>Purchase Order</span>
          <span class="pull-right-container">
          </span>
        </a>
      </li>
    <?php endif; ?>
      <!-- <li>
        <a href="<?= $base_admin("akuntan") ?>">
          <i class="fa fa-money"></i> <span>Akuntan</span>
          <span class="pull-right-container">
          </span>
        </a>
      </li> -->
      <li>
        <a href="<?= $base_admin("laporan") ?>">
          <i class="fa fa-list"></i> <span>Laporan</span>
          <span class="pull-right-container">
          </span>
        </a>
      </li>
      <li>
        <a href="<?= $base_admin("logout") ?>">
          <i class="fa fa-power-off"></i> <span>LOGOUT</span>
          <span class="pull-right-container">
          </span>
        </a>
      </li>
  </section>
</aside>
<div class="content-wrapper">
