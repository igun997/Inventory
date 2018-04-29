<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kategoribarang extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    $this->load->model("crud/main");
    // if($this->session->userlogin != "admin"){
    //   redirect("admin/login");
    // }
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
      base_url("assets/main/kategoribarang.js")
    ],true);
    // Builder as Array

    $build = [
      "block_title"=>"Kategori Barang"
    ];
    // Render
    $this->template->renderHTML(['head','kategoribarang','foot'],['title'=>"Master - Kategori Barang",'other'=>$build]);
  }

}
