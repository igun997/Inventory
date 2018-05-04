<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * @author Indra Gunanda
 */
class Home extends CI_Controller{
  /**
 	 * Konstruktor
 	 *
 	 * @return void
	 */

  public function __construct()
  {
    parent::__construct();
    $this->load->model("crud/main");
    // if($this->session->userlogin != "admin"){
    //   redirect("admin/login");
    // }
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
      base_url("assets/main/home.js")
    ],true);
    // Builder as Array
    $this->main->setTable("barang_keluar");
    $tk = $this->main->get();
    $this->main->setTable("transaksi_barang_masuk");
    $tm = $this->main->get();
    $this->main->setTable("akuntan");
    $pm = $this->main->get(["tipe"=>"pemasukan"]);
    $pmh = 0;
    foreach ($pm->result() as $key => $value) {
      $pmh = $pmh+$value->total;
    }
    $this->main->setTable("akuntan");
    $pm = $this->main->get(["tipe"=>"pengeluaran"]);
    $pmk = 0;
    foreach ($pm->result() as $key => $value) {
      $pmk = $pmk+$value->total;
    }
    $build = [
      "block_title"=>"Dashboard",
      "bk_count"=>number_format($tk->num_rows()),
      "bm_count"=>number_format($tm->num_rows()),
      "pnhi_count"=>number_format($pmk),
      "phi_cunt"=>number_format($pmh)
    ];
    // Render
    $this->template->renderHTML(['head','home','foot'],['title'=>"Dashboard",'other'=>$build]);
  }

}
