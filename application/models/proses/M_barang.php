<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_barang extends CI_Model{

  public function __construct()
  {
    parent::__construct();
  }
  public function getbarang($id='')
  {
    if ($id == '') {
      $d = $this->db->select("*")->from("barang")->join("kategori_barang","kategori_barang.id_kategori_barang = barang.id_kategori_barang")->get();
    }else {
      $d = $this->db->select("*")->from("barang")->join("kategori_barang","kategori_barang.id_kategori_barang = barang.id_kategori_barang")->where("barang.id_barang",$id)->get();
    }
    return $d;
  }

}
