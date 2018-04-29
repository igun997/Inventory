<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Upload_wrapper extends CI_Model{

  public function __construct()
  {
    parent::__construct();
  }
  /**
 	 * Upload
 	 *
 	 * @param mixed $name='',$is_update = false,$old_path = ""
 	 * @return mixed
	 */

  public function upload($name='',$is_update = false,$old_path = "")
  {
    $config["detect_mime"] = true;
    $config["encrypt_name"] = true;
    $config["mod_mime_fix"] = true;
    $config['upload_path'] = realpath(APPPATH . '../upload/');
    $config['allowed_types'] = 'jpg|jpeg|png|gif';
    $config['max_size'] = 1000;
    $this->load->library('upload', $config);
    $files = $_FILES;
    if($is_update){
      if ($files[$name]["size"] > 0) {
          @$delete = unlink(realpath(APPPATH . '../upload/'.$old_path));
          if($this->upload->do_upload($name)){
            return $this->upload->data();
          }else{
            return $this->upload->display_errors();
          }
      }else{
        return false;
      }
    }else{
      if ($files[$name]["size"] > 0) {
        if($this->upload->do_upload($name)){
          return $this->upload->data();
        }else{
          return $this->upload->display_errors();
        }
      }else{
        return false;
      }
    }
  }
}
