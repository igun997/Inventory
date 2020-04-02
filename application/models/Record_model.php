<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Record_Object{

	// Main Field
	public $id;
	public $total;
	public $unit_id;
	public $category_id;
	public $input_created;
	public $data_created;

	// CI Global Object
	private $ci;

	public function __construct($object){

		$this->id = empty($object->id) ? NULL : $object->id;
		$this->total = floatval($this->total);
		$this->unit_id = $this->unit_id;
		$this->category_id = $this->category_id;
		$this->input_created = intval($object->input_created);
		$this->data_created = intval($object->data_created);

		$this->ci = Indra_Helper::getCIInstance();
	}

	public function getUnit()
	{

		$this->ci->load->model("unit_model","unit_model");

		$this->unit_model->withId($this->unit_id);

		return $this->unit_model->findOne();

	}

	public function getCategory()
	{

		$this->ci->load->model("category_model","category_model");

		$this->category_model->withId($this->category_id);

		return $this->category_model->findOne();

	}
}

class Record_Model extends CI_Model{

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

		$result = $this->db->get('record')->result();

		if($result){

			$return = [];

			foreach($result as $r){

				$return[] = new Record_Object($r);
			}

			if($this->is_pagination){

				$this->db->select('record.id');
				$this->pagination_data = [
					'total_record' => $this->db->count_all_results('record')
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

		$result = $this->db->get('record')->row();

		if($result){

			if($this->is_cache_enabled){

				$this->db->flush_cache();
				$this->joined = [];
				$this->is_cache_enabled = FALSE;
			}

			return new Record_Object($result);
		}

		if($this->is_cache_enabled){

			$this->db->flush_cache();
			$this->joined = [];
			$this->is_cache_enabled = FALSE;
		}

		return NULL;
	}

	public function save(Record_Object $object){

		if(empty($object->id)){

			if($this->db->insert('record', $object)){

				return TRUE;
			}
		}else{

			$this->db->where('id', $object->id);
			if($this->db->update('record', $object)){

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
				$this->db->order_by('record.name','asc');
				break;
			case self::SORT_NAME_DESC:
				$this->db->order_by('record.name','desc');
				break;
			case self::SORT_CREATED_ASC:
				$this->db->order_by('record.time_created','asc');
				break;
			case self::SORT_CREATED_DESC:
				$this->db->order_by('record.time_created','desc');
				break;

			default:
				break;
		}

		return $this;
	}

	public function withId($id){

		$this->_start_query_cache();

		$this->db->where('record.id', $id);

		return $this;
	}

	public function withUnitId($id){

		$this->_start_query_cache();

		$this->db->where('record.unit_id', $id);

		return $this;
	}

	public function withCategoryId($id){

		$this->_start_query_cache();

		$this->db->where('record.category_id', $id);

		return $this;
	}
}
