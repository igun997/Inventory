<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Transaksi extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    if($this->session->hak_akses == null){
      redirect("admin/login");
    }
  }

  function index()
  {
    // Where Folder View ?
    $this->template->setFolder("admin");
    //What Default Style ?
    $this->template->defaultStyle("admin");
    // Set CSS as Array
    // If TRUE that APPENDING if False that REPLACE ALL STYLESHEET
    // Set JS as Array
    // If TRUE that APPENDING if False that REPLACE ALL JS
    $this->template->setcss([
      base_url("assets/extra/selectize/css/selectize.bootstrap3.css")
    ],true);
    $this->template->setjs([
      base_url("assets/extra/selectize/js/standalone/selectize.js"),
      base_url("assets/main/transaksi.js")
    ],true);
    // Builder as Array

    $build = [
      "block_title"=>"Transaksi Barang Keluar"
    ];
    // Render
    $this->template->renderHTML(['head','transaksi','foot'],['title'=>"Transaksi Barang Keluar",'other'=>$build]);
  }
}
