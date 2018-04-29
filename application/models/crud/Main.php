<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 	 * Main CRUD
 	 *
	 */

class Main extends CI_Model{
  public $table = "user";
  public function __construct()
  {
    parent::__construct();

  }
  /**
 	 * Set Your Table
 	 *
 	 * @param string $value
 	 * @return void
	 */

  public function setTable($value='')
  {
    $this->table = $value;
    return $this;
  }
  /**
 	 * Run Primary Query
 	 * @example $this->main->setTable("TABLE"); $this->main->get();
 	 * @param mixed $value
 	 * @return mixed
	 */
  public function get($data = "",$order="")
  {
    if($data != ""){
      if($order != ""){
        return $this->db->order_by($order["table"],$order["order"])->get_where($this->table,$data);
      }else{
        return $this->db->get_where($this->table,$data);
      }
    }else{
      if($order != ""){
        return $this->db->order_by($order["table"],$order["order"])->get($this->table);
      }else{
        return $this->db->get($this->table);
      }
    }
  }
  /**
 	 * Run Primary Query
 	 * @example $this->main->setTable("TABLE"); $this->main->get();
 	 * @param mixed $value
 	 * @return mixed
	 */
  public function insert($data=[])
  {
    return $this->db->insert($this->table,$data);
  }
  /**
 	 * Run Primary Query
 	 * @example $this->main->setTable("TABLE"); $this->main->get();
 	 * @param mixed $value
 	 * @return mixed
	 */
  public function delete($data=[])
  {
     $this->db->delete($this->table,$data);
     return $this->db->affected_rows() > 0;
  }
  /**
 	 * Run Primary Query
 	 * @example $this->main->setTable("TABLE"); $this->main->get();
 	 * @param mixed $value
 	 * @return mixed
	 */
  public function update($data=[],$where=[])
  {
    if(count($where) > 0){
      $this->db->update($this->table,$data,$where);
      return $this->db->affected_rows() > 0;
    }else{
      $this->db->update($this->table,$data);
      return $this->db->affected_rows() > 0;
    }
  }

}
