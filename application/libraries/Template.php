<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 	 * Template Engine V.0.1
 	 * @author Indra GUnanda
	 */

class Template {
  public $ci;
  public $css = [];
  public $js = [];
  public $menu = [];
  public $folder = "";
  /**
 	 * Get Instance CI, Load Helper URL & Parser
 	 *
 	 * @return void
	 */

  public function __construct()
  {
    $this->ci =& get_instance();
    $this->ci->load->helper('url');
    $this->ci->load->library('parser');
  }
  /**
 	 * Set View Folder Dalam Contoh Kasus Berikut
 	 * -- View
   * ---- admin
   * Itu berarti di daalm setFolder ada pilih
   * $this->template->setFolder("admin");
 	 * @param string $data
 	 * @return void
	 */

  public function setFolder($data='')
  {
    $this->folder = $data;
  }
  /**
 	 * Default Style adalah CSS & JS default pada saat intitialisasi projek awal
 	 *
 	 * @param string $type
 	 * @return void
	 */

  public function defaultStyle($type='')
  {
    if($type == "admin"){
      $css = [
        base_url("assets/adminlte/bower_components/bootstrap/dist/css/bootstrap.min.css"),
        base_url("assets/adminlte/bower_components/font-awesome/css/font-awesome.min.css"),
        base_url("assets/adminlte/bower_components/Ionicons/css/ionicons.min.css"),
        base_url("assets/adminlte/dist/css/AdminLTE.min.css"),
        base_url("assets/adminlte/dist/css/skins/_all-skins.min.css"),
        base_url("assets/adminlte/bower_components/morris.js/morris.css"),
        base_url("assets/adminlte/bower_components/jvectormap/jquery-jvectormap.css"),
        base_url("assets/adminlte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css"),
        base_url("assets/adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.css"),
        base_url("assets/extra/swal.css"),
        base_url("assets/extra/datatables/datatables.min.css"),
        base_url("assets/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css")
      ];
      $js = [
        base_url("assets/adminlte/bower_components/jquery/dist/jquery.min.js"),
        base_url("assets/adminlte/bower_components/jquery-ui/jquery-ui.min.js"),
        base_url("assets/adminlte/bower_components/bootstrap/dist/js/bootstrap.min.js"),
        base_url("assets/adminlte/bower_components/raphael/raphael.min.js"),
        base_url("assets/adminlte/bower_components/morris.js/morris.min.js"),
        base_url("assets/adminlte/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"),
        base_url("assets/adminlte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"),
        base_url("assets/extra/swal.js"),
        base_url("assets/extra/datatables/datatables.min.js"),
        base_url("assets/extra/bootbox.min.js"),
        base_url("assets/adminlte/dist/js/adminlte.min.js")
      ];
      $this->css = $css;
      $this->js = $js;
    }elseif ($type == "user") {
      $css = [
        ''
      ];
      $js = [
        ''
      ];
      $this->css = $css;
      $this->js = $js;
    }elseif ($type == "public") {
      $css = [
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
      ];
      $js = [
        '//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'
      ];
      $this->css = $css;
      $this->js = $js;
    }else{
      exit("Default Style Wrong");
      die();
    }
  }
  /**
 	 * Set CSS untuk menambah kan CSS baru atau mengganti default CSS yang sudah di load sebelumnya dengan option setcss(DATA_ARRAY_URL,REPLACE OR APPEND)
 	 * @example $this->template->setcss(["URL_CSS"],TRUE)
 	 * @param mixed $data,$append
 	 * @return void
	 */

  public function setcss($data=[],$append=false)
  {
    if($append){
      foreach ($data as $key => $value) {
        array_push($this->css,$value);
      }
    }else{
      $this->css = $data;
    }
  }
  /**
 	 * Set JS untuk menambah kan JS baru atau mengganti default JS yang sudah di load sebelumnya dengan option setcss(DATA_ARRAY_URL,REPLACE OR APPEND)
 	 * @example $this->template->setcss(["JS"],TRUE)
 	 * @param mixed $data,$append
 	 * @return void
	 */
  public function setjs($data=[],$append=false)
  {
    if($append){
      foreach ($data as $key => $value) {
        array_push($this->js,$value);
      }
    }else{
      $this->js = $data;
    }
  }
  /**
 	 * Under Contrsuction
 	 *
	 */

  public function menuBuilder($datamenu = [],$append = false)
  {
    if($append){
      foreach ($datamenu as $key => $value) {
        array_push($this->menu,$value);
      }
    }else{
      $this->menu = $datamenu;
    }
  }
  /**
 	 * renderHTML untuk rendering semua data yang sudah di susun ke dalam bentuk HTML dengan memakai bantuan library parser Codeigniter 3
   * Input Render yang pertama adalah data array 3 View , diaman yang biasa kita kenal dengan header,body,footer di dalam view dan terletak di folder pages,untuk urutan filder header dan footer di letakan di folder theme dan body di pages
 	 * @example $this->template->renderHTML(["heder","body","footer"],["title"=>"Test Page"]);
 	 * @param array $data,$page_data
 	 * @return void
	 */

  public function renderHTML($data=[],$page_data=[])
  {

    $css = $this->css;
    $js = $this->js;
    $cssready = [];
    $jsready = [];
    $i = 0;
    foreach ($css as $key => $value) {
      $cssready[$i++]["url"] = $value;
    }
    $i = 0;
    foreach ($js as $key => $value) {
      $jsready[$i++]["url"] = $value;
    }
    if(count($page_data) > 0){
      $data_asset = [];
      if(isset($page_data["other"])){
        foreach ($page_data["other"] as $key => $value) {
          $data_asset[$key] = $value;
        }
      }
      $data_asset["title"] = $page_data["title"];
      $data_asset["css"] = $cssready;
      $data_asset["js"] = $jsready;
    }
    if(isset($data[0])){
      $this->ci->parser->parse($this->folder."/theme/".$data[0], $data_asset);
    }
    if(isset($data[1])){
      $this->ci->parser->parse($this->folder."/pages/".$data[1], $data_asset);
    }
    if(isset($data[2])){
      $this->ci->parser->parse($this->folder."/theme/".$data[2], $data_asset);
    }
  }
}
