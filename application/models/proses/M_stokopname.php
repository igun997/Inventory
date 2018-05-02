<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Stokopname extends CI_Model{

  public function __construct()
  {
    parent::__construct();
  }
  public function getopname($id='',$switch = false)
  {
    if ($switch) {

    }else {
      if ($id == "") {
        return $this->db->select("*")->from("transaksi_barang_masuk")->join("sales","sales.id_sales = transaksi_barang_masuk.id_sales")->join("barang","barang.id_barang = transaksi_barang_masuk.id_barang")->get();
      }else {
        return $this->db->select("*")->from("transaksi_barang_masuk")->join("sales","sales.id_sales = transaksi_barang_masuk.id_sales")->join("barang","barang.id_barang = transaksi_barang_masuk.id_barang")->where("id_transaksi_barang_masuk",$id)->get();
      }
    }
  }

}
