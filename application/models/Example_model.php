<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Example_Object{

	// Main Field
	public $id;
	public $name;
	public $time_created;

	// CI Global Object
	private $ci;

	public function __construct($object){

		$this->id = empty($object->id) ? NULL : $object->id;
		$this->name = $object->name;
		$this->time_created = intval($object->time_created);

		$this->ci = Indra_Helper::getCIInstance();
	}
}

class Example_Model extends CI_Model{

	const SORT_NAME_ASC = 1;
	const SORT_NAME_DESC = 2;
	const SORT_CREATED_ASC = 3;
	const SORT_CREATED_DESC = 4;

	private $is_pagination = FALSE;
	private $pagination_data = [];

	private $limit = 0;
	private $offset = 0;

	private $is_cache_enabled = FALSE;
	private $caching = [];

	private $joined = [];

	public function __construct(){

		parent::__construct();
	}

	private function _start_query_cache(){

		if(!$this->is_cache_enabled){

			$this->db->start_cache();
			$this->is_cache_enabled = TRUE;
		}
	}

	public function find(){

		if($this->is_cache_enabled){

			$this->db->stop_cache();
		}
		if($this->is_pagination){

			$this->db->limit($this->limit, $this->offset);
		}

		$result = $this->db->get('example')->result();

		if($result){

			$return = [];

			foreach($result as $r){

				$return[] = new Example_Object($r);
			}

			if($this->is_pagination){

				$this->db->select('example.id');
				$this->pagination_data = [
					'total_record' => $this->db->count_all_results('example')
				];
			}
			if($this->is_cache_enabled){

				$this->db->flush_cache();
				$this->joined = [];
				$this->is_cache_enabled = FALSE;
			}

			return $return;
		}

		if($this->is_cache_enabled){

			$this->db->flush_cache();
			$this->joined = [];
			$this->is_cache_enabled = FALSE;
		}

		return NULL;
	}

	public function findOne(){

		if($this->is_cache_enabled){

			$this->db->stop_cache();
		}

		$result = $this->db->get('example')->row();

		if($result){

			if($this->is_cache_enabled){

				$this->db->flush_cache();
				$this->joined = [];
				$this->is_cache_enabled = FALSE;
			}

			return new Example_Object($result);
		}

		if($this->is_cache_enabled){

			$this->db->flush_cache();
			$this->joined = [];
			$this->is_cache_enabled = FALSE;
		}

		return NULL;
	}

	public function save(Example_Object $object){

		if(empty($object->id)){

			if($this->db->insert('example', $object)){

				return TRUE;
			}
		}else{

			$this->db->where('id', $object->id);
			if($this->db->update('example', $object)){

				return TRUE;
			}
		}

		return FALSE;
	}

	public function setLimit($limit, $offset = 0){

		$this->is_pagination = TRUE;

		$this->limit = $limit;
		$this->offset = $offset;

		return $this;
	}

	public function getPaginationData(){

		$response = $this->pagination_data;

		$this->is_pagination = FALSE;
		$this->pagination_data = [];

		return $response;
	}

	public function resetFilter(){

		$this->is_pagination = FALSE;
		$this->pagination_data = [];
	}

	public function sortData($method){

		switch (intval($method)) {
			case self::SORT_NAME_ASC:
				$this->db->order_by('example.name','asc');
				break;
			case self::SORT_NAME_DESC:
				$this->db->order_by('example.name','desc');
				break;
			case self::SORT_CREATED_ASC:
				$this->db->order_by('example.time_created','asc');
				break;
			case self::SORT_CREATED_DESC:
				$this->db->order_by('example.time_created','desc');
				break;

			default:
				break;
		}

		return $this;
	}

	public function withId($id){

		$this->_start_query_cache();

		$this->db->where('example.id', $id);

		return $this;
	}
}
