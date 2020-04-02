<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Category_Object{

	// Main Field
	public $id;
	public $name;
	public $code;
	public $category_id;

	// CI Global Object
	private $ci;

	public function __construct($object){

		$this->id = empty($object->id) ? NULL : $object->id;
		$this->name = empty($object->name)?NULL:$object->name;
		$this->code = empty($object->code)?NULL:$object->code;
		$this->category_id = empty($object->category_id) ? NULL : $object->category_id;
		$this->parent_id = empty($object->parent_id) ? NULL : $object->parent_id;

		$this->ci = Indra_Helper::getCIInstance();
	}

	public function getRecords()
	{
			$this->ci->load->model("record_model");

			$this->record_model->withCategoryId($this->id);

			return $this->record_model->find();
	}

	public function getCategory()
	{

		$this->ci->load->model("category_model");

		$this->ci->category_model->withId($this->category_id);

		$res = $this->ci->category_model->findOne();

		if ($res == null) {

			$this->ci->category_model->withCategoryId($this->id);

			$res = $this->ci->category_model->findOne();

		}


		return $res;

	}

	public function getParent()
	{

		if ($this->parent_id != null) {
			$this->ci->load->model("category_model");

			$this->ci->category_model->withId($this->parent_id);

			return $this->ci->category_model->findOne();
		}

		return null;


	}

	public function getChild()
	{

		if ($this->parent_id == null) {

			$this->ci->load->model("category_model");

		$this->ci->category_model->withParentId($this->id);

			return $this->ci->category_model->find();

		}

		return null;


	}

}

class Category_model extends CI_Model{

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

		$result = $this->db->get('category')->result();

		if($result){

			$return = [];

			foreach($result as $r){

				$return[] = new Category_Object($r);
			}

			if($this->is_pagination){

				$this->db->select('category.id');
				$this->pagination_data = [
					'total_record' => $this->db->count_all_results('category')
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

		$result = $this->db->get('category')->row();

		if($result){

			if($this->is_cache_enabled){

				$this->db->flush_cache();
				$this->joined = [];
				$this->is_cache_enabled = FALSE;
			}

			return new Category_Object($result);
		}

		if($this->is_cache_enabled){

			$this->db->flush_cache();
			$this->joined = [];
			$this->is_cache_enabled = FALSE;
		}

		return NULL;
	}

	public function save(Category_Object $object){

		if(empty($object->id)){

			if($this->db->insert('category', $object)){

				return TRUE;
			}
		}else{

			$this->db->where('id', $object->id);
			if($this->db->update('category', $object)){

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
				$this->db->order_by('category.name','asc');
				break;
			case self::SORT_NAME_DESC:
				$this->db->order_by('category.name','desc');
				break;
			case self::SORT_CREATED_ASC:
				$this->db->order_by('category.time_created','asc');
				break;
			case self::SORT_CREATED_DESC:
				$this->db->order_by('category.time_created','desc');
				break;

			default:
				break;
		}

		return $this;
	}

	public function withId($id){

		$this->_start_query_cache();

		$this->db->where('category.id', $id);

		return $this;
	}

	public function withParentId($id,$not = false){

		$this->_start_query_cache();

		if ($not) {

			$this->db->where('category.parent_id is NOT NULL', null,false);

		}else {


			$this->db->where('category.parent_id', $id);

		}


		return $this;
	}

	public function withCategoryId($id){

		$this->_start_query_cache();

		$this->db->where('category.category_id', $id);

		return $this;
	}
}
