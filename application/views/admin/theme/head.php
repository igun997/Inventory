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
      <li class="treeview">
        <a href="#">
          <i class="fa fa-file"></i>
          <span>MASTER DATA</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li><a href="<?= $base_admin("category") ?>"><i class="fa fa-circle-o"></i> Category</a></li>
          <li><a href="<?= $base_admin("unit") ?>"><i class="fa fa-circle-o"></i> Unit</a></li>
          <li><a href="<?= $base_admin("record") ?>"><i class="fa fa-circle-o"></i> Record</a></li>
        </ul>
      </li>
      <li>
        <a href="<?= $base_admin("report") ?>">
          <i class="fa fa-file-o"></i>
          <span>Report</span>
        </a>
      </li>
  </section>
</aside>
<div class="content-wrapper">
