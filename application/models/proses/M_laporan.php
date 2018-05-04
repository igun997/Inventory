<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_laporan extends CI_Model{

  public function __construct()
  {
    parent::__construct();
  }
  public function getlaporanbarangkeluar($start='',$end='')
  {
     $d = $this->db->select("*")
    ->from("transaksi_barang_keluar")
    ->join("barang_keluar","barang_keluar.id_transaksi_barang_keluar = transaksi_barang_keluar.id_transaksi_barang_keluar")
    ->join("barang","barang_keluar.id_barang = barang.id_barang")
    ->where("transaksi_barang_keluar.tgl_transaksi_keluar >= ",$start)
    ->where("transaksi_barang_keluar.tgl_transaksi_keluar <= ",$end)
    ->where("transaksi_barang_keluar.status_transaksi <= ","lunas")
    ->get();
    return $d->result();
  }
  public function getlaporankasmasuk($start='',$end='')
  {
    $d = $this->db->select("*")
   ->from("akuntan_log")
   ->join("transaksi_barang_keluar","akuntan_log.id_transaksi_barang_keluar = transaksi_barang_keluar.id_transaksi_barang_keluar","left")
   ->join("transaksi_barang_masuk","transaksi_barang_masuk.id_transaksi_barang_masuk = akuntan_log.id_transaksi_barang_masuk","left")
   ->where("akuntan_log.tgl_transaksi >= ",$start)
   ->where("akuntan_log.tgl_transaksi <= ",$end)
   ->where("akuntan_log.tipe <= ","pemasukan")
   ->get();
   return $d->result();
  }
  public function getlaporanstokopname($start='',$end='')
  {
    $d = $this->db->select("*")
   ->from("transaksi_barang_masuk")
   ->join("sales","sales.id_sales = transaksi_barang_masuk.id_sales")
   ->join("barang","barang.id_barang = transaksi_barang_masuk.id_barang")
   ->where("transaksi_barang_masuk.tgl_transaksi_masuk >= ",$start)
   ->where("transaksi_barang_masuk.tgl_transaksi_masuk <= ",$end)
   ->get();
   $t = $d->result();
   $data = [];
   foreach ($t as $key => $value) {
     $data["data"][] = $value;
   }
   foreach ($data["data"] as $key => $value) {
     $data["data"][$key]->item_hutang = [];
     $data["data"][$key]->item_terima = [];
     $a = $this->db->get_where("transaksi_barang_masuk_hutang",["id_transaksi_barang_masuk"=>$value->id_transaksi_barang_masuk]);
     $b = $this->db->get_where("transaksi_barang_masuk_terima",["id_transaksi_barang_masuk"=>$value->id_transaksi_barang_masuk]);
     $data["data"][$key]->item_hutang = $a->result();
     $data["data"][$key]->item_terima = $b->result();


   }
   return $data ;
  }
  public function getlaporankaskeluar($start='',$end='')
  {
    $d = $this->db->select("*")
   ->from("akuntan_log")
   ->join("transaksi_barang_keluar","akuntan_log.id_transaksi_barang_keluar = transaksi_barang_keluar.id_transaksi_barang_keluar","left")
   ->join("transaksi_barang_masuk","transaksi_barang_masuk.id_transaksi_barang_masuk = akuntan_log.id_transaksi_barang_masuk","left")
   ->where("akuntan_log.tgl_transaksi >= ",$start)
   ->where("akuntan_log.tgl_transaksi <= ",$end)
   ->where("akuntan_log.tipe <= ","pengeluaran")
   ->get();
   return $d->result();
  }

}
