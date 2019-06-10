<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * @author Indra Gunanda
 */
class Laporan extends CI_Controller{
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
    $this->template->setcss([
      base_url("assets/adminlte/bower_components/bootstrap-datepicker/dist/bootstrap-datepicker.min.css")
    ],true);
    $this->template->setjs([
      base_url("assets/adminlte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"),
      base_url("assets/extra/Chart.bundle.js"),
      base_url("assets/main/laporan.js")
    ],true);
    // Builder as Array

    $build = [
      "block_title"=>"Grafik Laporan"
    ];
    // Render
    $this->template->renderHTML(['head','laporan','foot'],['title'=>"Laporan",'other'=>$build]);
  }

}
