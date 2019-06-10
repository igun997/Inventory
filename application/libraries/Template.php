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
    $this->ci->load->helper('directory');
    $this->ci->load->helper('file');
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
    $baseassets = FCPATH."core";
    $base = directory_map($baseassets);
    if (!file_exists($baseassets."/assets/".$type)) {
      exit("Default Style Wrong");
      die();
    }
    $readfile = read_file($baseassets."/assets/".$type);
    $readfile = explode("[CSS]",$readfile);
    $readfile = explode("[JS]",$readfile[1]);
    $css = explode("\r\n",$readfile[0]);
    $js = explode("\r\n",$readfile[1]);
    foreach ($js as $key => &$value) {
      if ($value == "") {
        unset($js[$key]);
      }
    }
    foreach ($css as $key => &$value) {
      if ($value == "") {
        unset($css[$key]);
      }
    }
    foreach ($css as $key => &$value) {
      $baseexp = explode("-|",$value);
      if (count($baseexp) > 1) {
        $value = base_url($baseexp[1]);
      }
    }
    foreach ($js as $key => &$value) {
      $baseexp = explode("-|",$value);
      if (count($baseexp) > 1) {
        $value = base_url($baseexp[1]);
      }
    }
    $this->css = $css;
    $this->js = $js;
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
