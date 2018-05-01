<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/**
 	 * API Restfull
 	 * @author Indra Gunanda
	 */

class Api extends REST_Controller
{
    /**
 	 * Konstruktor
 	 * Konstruktor Berisi, pemuatan model "crud/main" dan "admin/car"  serta limitasi pengguna hanya untuk hak akses "admin"
 	 * @return json
	 */

    public function __construct()
    {
        parent::__construct();
        $this->load->model("crud/main");
    }
    /**
 	 * Initial Method
 	 *
 	 * @return json
	 */

    public function index_post()
    {
        $this->response([], 404);
    }
    /**
   * Initial Method
   *
   * @return json
   */
    public function index_get()
    {
        $this->response([], 404);
    }
    /**
   * Initial Method
   *
   * @return json
   */
    public function index_put()
    {
        $this->response([], 404);
    }
    /**
   * Initial Method
   *
   * @return json
   */
    public function index_delete()
    {
        $this->response([], 404);
    }
    /**
 	 * Get Car
 	 * Memuat data Tracking Mobil
 	 * @return json
	 */
   public function kategoribarangget_get($id='',$in = 0)
   {
     $this->main->setTable("kategori_barang");
     if ($id == '' || $id == -1) {
       $data = $this->main->get();
       $data = $data->result();
       if ($in == 0) {
         $build = [];
         $build["data"] = [];
         foreach ($data as $key => $value) {
           $build["data"][] = [$value->id_kategori_barang,$value->nama_kategori,$value->satuan_kategori,"<button class='btn btn-warning edit' type='button' data-id='".$value->id_kategori_barang."'><li class='fa fa-edit'></li></button>"];
         }
         $this->response($build);
       }else {
         $this->response(["status"=>1,"data"=>$data]);
       }
     }else {
       $data = $this->main->get(["id_kategori_barang"=>$id]);
       $data = $data->result();
       if (count($data) > 0) {
         $data = $data[0];
         $this->response(["status"=>1,"data"=>$data]);
       }else {
         $this->response(["status"=>0]);
       }
     }
   }
   public function kategoribarangupdate_post()
   {
     $dpost = $this->input->post(null,true);
     $id = $dpost["id_kategori_barang"];
     unset($dpost["id_kategori_barang"]);
     $this->main->setTable("kategori_barang");
     $up = $this->main->update($dpost,["id_kategori_barang"=>$id]);
     if ($up) {
       $a = ["status"=>1];
     }else {
       $a = ["status"=>0];
     }
     $this->response($a);
   }
   public function kategoribarangsave_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("kategori_barang");
     $ins = $this->main->insert($dpost);
     if ($ins) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function barangget_get($id = '',$in = 0)
   {
     $this->load->model("proses/m_barang");
     if ($id == '' || $id == -1) {
       $d = $this->m_barang->getbarang();
       $res = $d->result();
       if ($in == 0) {
         $b = [];
         $b["data"] = [];
         foreach ($res as $key => $value) {
           $b["data"][] = [$value->id_barang,$value->nama_barang,$value->stok." ".$value->satuan_kategori,$value->stok_minimum,number_format($value->harga_modal),number_format($value->harga_jual),$value->nama_kategori,"<button class='btn btn-warning edit' data-id='".$value->id_barang."' type='button'><li class='fa fa-edit'></li></button>"];
         }
       }else {
         $b = ["status"=>1,"data"=>$res];
       }
       $this->response($b);
     }else {
       $d = $this->m_barang->getbarang($id);
       $res = $d->result();
       if (count($res) > 0) {
         $res = $res[0];
         $this->response(["status"=>1,"data"=>$res]);
       }else {
         $this->response(["status"=>0]);
       }
     }
   }
   public function barangkeluarsave_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("barang_keluar");
     $ins = $this->main->insert($dpost);
     if ($ins) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function barangkeluarcalc_get($id='')
   {
     $this->main->setTable("barang_keluar");
     $a = $this->main->get(["id_transaksi_barang_keluar"=>$id]);
     $this->main->setTable("transaksi_barang_keluar_preorder");
     $b = $this->main->get(["id_transaksi_barang_keluar"=>$id]);
     $build = 0;
     foreach ($a->result() as $key => $value) {
       $build = $build + ($value->harga_jual*$value->total_keluar);
     }
     foreach ($b->result() as $key => $vy) {
       $build = $build + ($vy->harga_jual*$vy->total_keluar);
     }
     $this->response(["status"=>1,"total"=>$build]);
   }
   public function barangkeluarpreordersave_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("transaksi_barang_keluar_preorder");
     $ins = $this->main->insert($dpost);
     if ($ins) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function barangkeluarget_get($id = '',$in = 0)
   {
     $this->load->model("proses/m_barangkeluar");
     if ($id == '' || $id == -1) {
       $d = $this->m_barangkeluar->getbarangkeluar();
       $res = $d->result();
       if ($in == 0) {
         $b = [];
         $b["data"] = [];
         foreach ($res as $key => $value) {
           $b["data"][] = [$value->id_barang_keluar,$value->nama_barang,$value->total_keluar,($value->total_keluar*$value->harga_jual)];
         }
       }else {
         $b = ["status"=>1,"data"=>$res];
       }
       $this->response($b);
     }else {
       $d = $this->m_barangkeluar->getbarangkeluar($id);
       $res = $d->result();
       if ($in == 0) {

         $b = [];
         $b["data"] = [];
         foreach ($res as $key => $value) {
           $b["data"][] = [$value->id_barang_keluar,$value->nama_barang,$value->total_keluar,$value->harga_jual,($value->total_keluar*$value->harga_jual)];
         }
        $this->response($b);
       }else {
         $d = $this->m_barangkeluar->getbarangkeluar($id,true);
         $res = $d->result();
         if (count($res) > 0) {
           $res = $res[0];
           $this->response(["status"=>1,"data"=>$res]);
         }else {
           $this->response(["status"=>0]);
         }
       }
     }
   }
   public function barangkeluardelete_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("barang_keluar");
     $del = $this->main->delete($dpost);
     if ($del) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function barangkeluarupdate_post()
   {
     $dpost = $this->input->post(null,true);
     $id = $dpost["id_barang_keluar"];
     unset($dpost["id_barang_keluar"]);
     $this->main->setTable("barang_keluar");
     $up = $this->main->update($dpost,["id_barang_keluar"=>$id]);
     if ($up) {
       $a = ["status"=>1];
     }else {
       $a = ["status"=>0];
     }
     $this->response($a);
   }
   public function barangkeluarpreorderupdate_post()
   {
     $dpost = $this->input->post(null,true);
     $id = $dpost["id_transaksi_barang_keluar_preorder"];
     unset($dpost["id_transaksi_barang_keluar_preorder"]);
     $this->main->setTable("transaksi_barang_keluar_preorder");
     $up = $this->main->update($dpost,["id_transaksi_barang_keluar_preorder"=>$id]);
     if ($up) {
       $a = ["status"=>1];
     }else {
       $a = ["status"=>0];
     }
     $this->response($a);
   }
   public function barangkeluarpreorderdelete_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("transaksi_barang_keluar_preorder");
     $del = $this->main->delete($dpost);
     if ($del) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function barangkeluarpreorderget_get($id = '',$in = 0)
   {
     $this->load->model("proses/m_barangkeluar");
     if ($id == '' || $id == -1) {
       $d = $this->m_barangkeluar->getbarangkeluarpreorder();
       $res = $d->result();
       if ($in == 0) {
         $b = [];
         $b["data"] = [];
         foreach ($res as $key => $value) {
           $b["data"][] = [$value->id_transaksi_barang_keluar_preorder ,$value->nama_barang,$value->total_keluar,($value->total_keluar*$value->harga_jual)];
         }
       }else {
         $b = ["status"=>1,"data"=>$res];
       }
       $this->response($b);
     }else {
       $d = $this->m_barangkeluar->getbarangkeluarpreorder($id);
       $res = $d->result();
       if ($in == 0) {
         $b = [];
         $b["data"] = [];
         foreach ($res as $key => $value) {
           $b["data"][] = [$value->id_transaksi_barang_keluar_preorder ,$value->nama_barang,$value->total_keluar,$value->harga_jual,($value->total_keluar*$value->harga_jual)];
         }
        $this->response($b);
       }else {
         $d = $this->m_barangkeluar->getbarangkeluarpreorder($id,true);
         $res = $d->result();
         if (count($res) > 0) {
           $res = $res[0];
           $this->response(["status"=>1,"data"=>$res]);
         }else {
           $this->response(["status"=>0]);
         }
       }
     }
   }
   public function barangupdate_post()
   {
     $dpost = $this->input->post(null,true);
     $id = $dpost["id_barang"];
     unset($dpost["id_barang"]);
     $this->main->setTable("barang");
     $up = $this->main->update($dpost,["id_barang"=>$id]);
     if ($up) {
       $a = ["status"=>1];
     }else {
       $a = ["status"=>0];
     }
     $this->response($a);
   }
   public function barangsave_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("barang");
     $ins = $this->main->insert($dpost);
     if ($ins) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function barangkeluarcashbonget_get($id='')
   {
     $this->main->setTable("transaksi_barang_keluar_cashbon");
     $i = $this->main->get(["id_transaksi_barang_keluar"=>$id]);
     $d = [];
     $d["data"] = [];
     foreach ($i->result() as $key => $value) {
       $d["data"][] = [$value->id_transaksi_barang_keluar,$value->bayar,date("d-m-Y H:i:s",strtotime($value->tgl_bayar))];
     }
     $this->response($d);
   }
   public function barangkeluarcashbonsave_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("transaksi_barang_keluar_cashbon");
     $ins = $this->main->insert($dpost);
     if ($ins) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function transaksigetbyfaktor_get($id='')
   {
     $this->main->setTable("transaksi_barang_keluar");
     $row = $this->main->get(["nofaktur"=>$id]);
     if ($row->num_rows() > 0) {
       $this->response(["status"=>1,"id"=>$row->row()->id_transaksi_barang_keluar]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function transaksiget_get($id = '',$in = 0)
   {
     $this->main->setTable("transaksi_barang_keluar");
     if ($id == '' || $id == -1) {
       $d = $this->main->get();
       $res = $d->result();
       if ($in == 0) {
         $b = [];
         $b["data"] = [];
         foreach ($res as $key => $value) {
           if ($value->status_transaksi == "lunas") {
             $trx_status = "<span class='label label-success'>Lunas</span>";
           }elseif ($value->status_transaksi == "cashbon") {
             $trx_status = "<span class='label label-warning'>Cashbon</span>";
           }elseif ($value->status_transaksi == "preorder") {
             $trx_status = "<span class='label label-primary'>Preorder</span>";
           }else {
             $trx_status = "<span class='label label-danger'>Tidak Ada Barang</span>";
           }
           $b["data"][] = [$value->id_transaksi_barang_keluar,$value->nofaktur,$value->nama_pembeli,$value->alamat,$trx_status,$value->tgl_transaksi_keluar,"<button class='btn btn-success detail' data-id='".$value->id_transaksi_barang_keluar."' type='button'><li class='fa fa-search'></li></button> <a class='btn btn-primary' href='".base_url("api/print/".$value->id_transaksi_barang_keluar)."' target='_blank'><li class='fa fa-print'></li></a> <button class='btn btn-warning edit' data-id='".$value->id_transaksi_barang_keluar."' type='button'><li class='fa fa-edit'></li></button>"];
         }
       }else {
         $b = ["status"=>1,"data"=>$res];
       }
       $this->response($b);
     }else {
       $d = $this->main->get(["id_transaksi_barang_keluar"=>$id]);
       $res = $d->result();
       if (count($res) > 0) {
         $res = $res[0];
         $this->response(["status"=>1,"data"=>$res]);
       }else {
         $this->response(["status"=>0]);
       }
     }
   }
   public function transaksiupdate_post()
   {
     $dpost = $this->input->post(null,true);
     $id = $dpost["id_transaksi_barang_keluar"];
     unset($dpost["id_transaksi_barang_keluar"]);
     $this->main->setTable("transaksi_barang_keluar");
     $up = $this->main->update($dpost,["id_transaksi_barang_keluar"=>$id]);
     if ($up) {
       $a = ["status"=>1];
     }else {
       $a = ["status"=>0];
     }
     $this->response($a);
   }

   public function transaksisave_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("transaksi_barang_keluar");
     $ins = $this->main->insert($dpost);
     if ($ins) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function akuntansave_post()
   {
     $dpost = $this->input->post(null,true);
     $this->main->setTable("akuntan");
     $ins = $this->main->insert($dpost);
     if ($ins) {
       $this->response(["status"=>1]);
     }else {
       $this->response(["status"=>0]);
     }
   }
   public function print_get($id="")
   {
     $this->load->model("proses/m_barangkeluar");
     $this->load->library("pdfgenerator");
     $this->main->setTable("transaksi_barang_keluar");
     $d = $this->main->get(["id_transaksi_barang_keluar"=>$id]);
     $c = $this->m_barangkeluar->getbarangkeluar($id);
     $b = $this->m_barangkeluar->getbarangkeluarpreorder($id);
     $d = $d->row();
     if ($d->status_transaksi == "lunas") {
       $totalall = 0;
       $itembuild = [];
       $itembuildpre = [];
       if ($c->num_rows() > 0) {
         $totalbk = 0;
         $itemset = [];
         foreach ($c->result() as $key => $value) {
           $temp = [
             '<tr>',
             '<td>'.$value->nama_barang.'</td>',
             '<td>'.$value->total_keluar.'</td>',
             '<td>Rp. '.number_format($value->total_keluar*$value->harga_jual).'</td>',
             '</tr>'
           ];
           $totalbk = $totalbk + ($value->total_keluar*$value->harga_jual);
           $itemset[] = implode("",$temp);
         }
         $itembuild = [
           '<center><h4>Barang Keluar</h4></center>',
           '<style>',
           'table, th, td {',
             'border: 1px solid black;',
             'border-collapse: collapse;',
             '}',
             'th, td {',
               'padding: 5px;',
               'text-align: left;',
               '}',
               '</style>',
               '<table style="width:100%">',
               '<tr>',
               '<th>Nama Barang</th>',
               '<th>Total</th>',
               '<th>Subtotal</th>',
               '</tr>',
               implode("",$itemset),
               '<tr>',
               '<th colspan="2">Total</th>',
               '<th>Rp. '.number_format($totalbk).'</th>',
               '</tr>',
               '</table>'
         ];
         $totalall = $totalall + $totalbk;
       }
       if ($b->num_rows() > 0) {
         $totalbkpre = 0;
         $itemsetpre = [];
         foreach ($b->result() as $key => $value) {
           $temp = [
             '<tr>',
             '<td>'.$value->nama_barang.'</td>',
             '<td>'.$value->total_keluar.'</td>',
             '<td>Rp. '.number_format($value->total_keluar*$value->harga_jual).'</td>',
             '</tr>'
           ];
           $totalbkpre = $totalbkpre + ($value->total_keluar*$value->harga_jual);
           $itemsetpre[] = implode("",$temp);
         }
         $itembuildpre = [
           '<center><h4>Barang Keluar [PREORDER]</h4></center>',
           '<style>',
           'table, th, td {',
             'border: 1px solid black;',
             'border-collapse: collapse;',
             '}',
             'th, td {',
               'padding: 5px;',
               'text-align: left;',
               '}',
               '</style>',
               '<table style="width:100%">',
               '<tr>',
               '<th>Nama Barang</th>',
               '<th>Total</th>',
               '<th>Subtotal</th>',
               '</tr>',
               implode("",$itemsetpre),
               '<tr>',
               '<th colspan="2">Total</th>',
               '<th>Rp. '.number_format($totalbkpre).'</th>',
               '</tr>',
               '</table>'
         ];
         $totalall = $totalall + $totalbkpre;
       }
       $build = [
         '<center><h1>Faktur Pembelian</h1></center>',
         '<center><h3>TB Kagum Lestari</h3></center>',
         '<style>',
         'table, th, td {',
             'border: 1px solid black;',
             'border-collapse: collapse;',
         '}',
         'th, td {',
             'padding: 5px;',
             'text-align: left;',
         '}',
         '</style>',
         '<table style="width:100%">',
           '<tr>',
             '<th width="30%">Nomor Faktur</th>',
             '<td>'.$d->nofaktur.'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Nama Pembeli</th>',
             '<td>'.$d->nama_pembeli.'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Alamat</th>',
             '<td>'.$d->alamat.'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Status Faktur</th>',
             '<td>'.strtoupper($d->status_transaksi).'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Tanggal Transaksi</th>',
             '<td>'.date("d-m-Y H:i:s",strtotime($d->tgl_transaksi_keluar)).'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Total Pembayaran</th>',
             '<td>Rp. '.number_format($totalall).'</td>',
           '</tr>',
         '</table>',
         implode("",$itembuild),
         implode("",$itembuildpre),
       ];
       $this->pdfgenerator->generate(implode("",$build),"anu");
     }elseif ($d->status_transaksi == "cashbon") {
       $totalall = 0;
       $itembuild = [];
       $itembuildpre = [];
       if ($c->num_rows() > 0) {
         $totalbk = 0;
         $itemset = [];
         foreach ($c->result() as $key => $value) {
           $temp = [
             '<tr>',
             '<td>'.$value->nama_barang.'</td>',
             '<td>'.$value->total_keluar.'</td>',
             '<td>Rp. '.number_format($value->total_keluar*$value->harga_jual).'</td>',
             '</tr>'
           ];
           $totalbk = $totalbk + ($value->total_keluar*$value->harga_jual);
           $itemset[] = implode("",$temp);
         }
         $itembuild = [
           '<center><h4>Barang Keluar</h4></center>',
           '<style>',
           'table, th, td {',
             'border: 1px solid black;',
             'border-collapse: collapse;',
             '}',
             'th, td {',
               'padding: 5px;',
               'text-align: left;',
               '}',
               '</style>',
               '<table style="width:100%">',
               '<tr>',
               '<th>Nama Barang</th>',
               '<th>Total</th>',
               '<th>Subtotal</th>',
               '</tr>',
               implode("",$itemset),
               '<tr>',
               '<th colspan="2">Total</th>',
               '<th>Rp. '.number_format($totalbk).'</th>',
               '</tr>',
               '</table>'
         ];
         $totalall = $totalall + $totalbk;
       }
       if ($b->num_rows() > 0) {
         $totalbkpre = 0;
         $itemsetpre = [];
         foreach ($b->result() as $key => $value) {
           $temp = [
             '<tr>',
             '<td>'.$value->nama_barang.'</td>',
             '<td>'.$value->total_keluar.'</td>',
             '<td>Rp. '.number_format($value->total_keluar*$value->harga_jual).'</td>',
             '</tr>'
           ];
           $totalbkpre = $totalbkpre + ($value->total_keluar*$value->harga_jual);
           $itemsetpre[] = implode("",$temp);
         }
         $itembuildpre = [
           '<center><h4>Barang Keluar [PREORDER]</h4></center>',
           '<style>',
           'table, th, td {',
             'border: 1px solid black;',
             'border-collapse: collapse;',
             '}',
             'th, td {',
               'padding: 5px;',
               'text-align: left;',
               '}',
               '</style>',
               '<table style="width:100%">',
               '<tr>',
               '<th>Nama Barang</th>',
               '<th>Total</th>',
               '<th>Subtotal</th>',
               '</tr>',
               implode("",$itemsetpre),
               '<tr>',
               '<th colspan="2">Total</th>',
               '<th>Rp. '.number_format($totalbkpre).'</th>',
               '</tr>',
               '</table>'
         ];
         $totalall = $totalall + $totalbkpre;
       }
       $build = [
         '<center><h1>Faktur Pembelian</h1></center>',
         '<center><h3>TB Kagum Lestari</h3></center>',
         '<style>',
         'table, th, td {',
             'border: 1px solid black;',
             'border-collapse: collapse;',
         '}',
         'th, td {',
             'padding: 5px;',
             'text-align: left;',
         '}',
         '</style>',
         '<table style="width:100%">',
           '<tr>',
             '<th width="30%">Nomor Faktur</th>',
             '<td>'.$d->nofaktur.'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Nama Pembeli</th>',
             '<td>'.$d->nama_pembeli.'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Alamat</th>',
             '<td>'.$d->alamat.'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Status Faktur</th>',
             '<td>'.strtoupper($d->status_transaksi).'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Tanggal Transaksi</th>',
             '<td>'.date("d-m-Y H:i:s",strtotime($d->tgl_transaksi_keluar)).'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Total Pembayaran</th>',
             '<td>Rp. '.number_format($totalall).'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Total Dibayarkan</th>',
             '<td>Rp. '.number_format($d->total_bayar).'</td>',
           '</tr>',
           '<tr>',
             '<th width="30%">Sisa Pembayaran</th>',
             '<td>Rp. '.number_format($d->cashbon).'</td>',
           '</tr>',
         '</table>',
         implode("",$itembuild),
         implode("",$itembuildpre),
       ];
       $this->pdfgenerator->generate(implode("",$build),"anu");
     }else {
       echo "Transaksi Yang Belum Selesai Tidak Mempunyai Laporan";
     }
   }
}
