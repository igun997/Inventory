<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    $this->load->model("crud/main");

  }

  function index()
  {
    $this->template->setFolder("login");
    $this->template->defaultStyle("loginstyle");
    $dpost = $this->input->post(null,true);
    if (isset($dpost["username"])) {
      $this->main->setTable("admin");
      $cek = $this->main->get(["username"=>$dpost["username"]]);
      if ($cek->num_rows() > 0) {
        $pwcek = $this->main->get(["password"=>$dpost["password"]]);
        if ($pwcek->num_rows() > 0) {
          $rw = $cek->row_array();
          $this->session->set_userdata($rw);
          redirect("admin/");
        }else {
          $this->session->set_flashdata("msg","<div class='alert alert-danger'>Password Salah</div>");
        }
      }else {
        $this->session->set_flashdata("msg","<div class='alert alert-danger'>Username Salah</div>");
      }
    }
    $build = [
        "block_title"=>"Halaman Masuk Sistem",
        "msg"=>$this->session->flashdata("msg")
    ];
    $this->template->renderHTML(["head",'home',"foot"],['title'=>"Halaman Masuk",'other'=>$build]);

  }

}
