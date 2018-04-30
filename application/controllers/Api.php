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
       $this->response(["status"=>2]);
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
       $this->response(["status"=>2]);
     }
   }

}
