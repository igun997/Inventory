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
    // if($this->session->hak_akses == null){
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

    $build = [
      "block_title"=>"Dashboard",
      "bk_count"=>0,
      "bm_count"=>0,
      "pnhi_count"=>0,
      "phi_cunt"=>0
    ];
    // Render
    $this->template->renderHTML(['head','home','foot'],['title'=>"Dashboard",'other'=>$build]);
  }

}
