<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Logout extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    //Codeigniter : Write Less Do More
  }

  function index()
  {
      $this->session->sess_destroy();
      redirect('admin/login');
  }

}
