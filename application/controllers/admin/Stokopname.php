<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stokopname extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    $this->load->model("crud/main");
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
    $this->template->setjs([
      base_url("assets/main/stokopname.js")
    ],true);
    // Builder as Array

    $build = [
      "block_title"=>"Stok Opname"
    ];
    // Render
    $this->template->renderHTML(['head','stokopname','foot'],['title'=>"Stok Opname",'other'=>$build]);
  }

}
