<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_barangkeluar extends CI_Model{

  public function __construct()
  {
    parent::__construct();
  }
  public function getbarangkeluar($id='',$switch = false)
  {
    if ($switch) {
      $where = "id_barang_keluar";
    }else {
      $where = "id_transaksi_barang_keluar";
    }
    if ($id != '') {
      return $this->db->select("*")->from("barang_keluar")->join("barang","barang.id_barang = barang_keluar.id_barang")->where($where,$id)->get();
    }else {
      return $this->db->select("*")->from("barang_keluar")->join("barang","barang.id_barang = barang_keluar.id_barang")->get();
    }
  }
  public function getbarangkeluarpreorder($id='',$switch = false)
  {
    if ($switch) {
      $where = "id_transaksi_barang_keluar_preorder";
    }else {
      $where = "id_transaksi_barang_keluar";
    }
    if ($id != '') {
      return $this->db->select("*")->from("transaksi_barang_keluar_preorder")->join("barang","barang.id_barang = transaksi_barang_keluar_preorder.id_barang")->where($where,$id)->get();
    }else {
      return $this->db->select("*")->from("transaksi_barang_keluar_preorder")->join("barang","barang.id_barang = transaksi_barang_keluar_preorder.id_barang")->get();
    }
  }

}
