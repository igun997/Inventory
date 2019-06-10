<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * @author Indra Gunanda
 */
class Akuntan extends CI_Controller{
  /**
 	 * Konstruktor
 	 *
 	 * @return void
	 */

  public function __construct()
  {
    parent::__construct();
    $this->load->model("crud/main");
    if($this->session->hak_akses == null){
      redirect("admin/login");
    }
  }
  /**
 	 * Index Home
 	 *
 	 * @return void
	 */

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
    $this->template->setjs([
      base_url("assets/main/akuntan.js")
    ],true);
    // Builder as Array
    // Calc New Accuntant
    $this->main->setTable("akuntan");
    $a = $this->main->get();
    $a = $a->result();
    $masuk = 0;
    $keluar = 0;
    foreach ($a as $key => $value) {
      if ($value->tipe == "pemasukan") {
        $masuk = $masuk+$value->total;
      }else {
        $keluar = $keluar+$value->total;
      }
    }
    //OLD Acc
    $this->main->setTable("akuntan_log");
    $a = $this->main->get();
    $a = $a->result();
    $masukOld = 0;
    $keluarOld = 0;
    foreach ($a as $key => $value) {
      if ($value->tipe == "pemasukan") {
        $masukOld = $masukOld+$value->total;
      }else {
        $keluarOld = $keluarOld+$value->total;
      }
    }
    $build = [
      "block_title"=>"Akuntan Hari Ini",
      "block_title1"=>"Akuntan Lama",
      "pengeluaran_now"=>number_format($keluar),
      "pemasukan_now"=>number_format($masuk),
      "pengeluaran_old"=>number_format($keluarOld),
      "pemasukan_old"=>number_format($masukOld)
    ];
    // Render
    $this->template->renderHTML(['head','akuntan','foot'],['title'=>"Akuntan",'other'=>$build]);
  }

}
