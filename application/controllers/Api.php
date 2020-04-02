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
        $this->load->model("category_model");
        $this->load->model("unit_model");
        $this->load->model("record_model");
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

    public function categoryread_get($id = null)
    {

      if ($id == -1) {

        $this->category_model->withParentId(null,true);
        $data = $this->category_model->find();

        foreach ($data as $key => &$value) {
          $value->parent = $value->getParent();
        }

        Indra_Helper::returnResponse(200,$data);


      }

      if ($id == null) {
        $this->category_model->withParentId(null);
        $data = $this->category_model->find();

        foreach ($data as $key => &$value) {
          $value->parent = $value->getParent();
          $value->child = $value->getChild();
          $value->related = $value->getCategory();
        }

      }else {
        $this->category_model->withId($id);
        $data = $this->category_model->findOne();
        $data->parent = $data->getParent();
        $data->child = $data->getChild();
        $data->related = $data->getCategory();
      }


      if ($data != null) {
        Indra_Helper::returnResponse(200,$data);
      }

      Indra_Helper::returnResponse(404);



    }

    public function categoryinsert_post()
    {

      $data = $this->input->post(NULL,true);

      if (isset($data["id"])) {

        $this->category_model->withId($data["id"]);
        $temp = $this->category_model->findOne();

        foreach ($data as $key => $value) {
          $temp->{$key} = $value;
        }

        $data = $temp;

      }

      $data = (object) $data;
      $category = new Category_Object($data);

      $save = $this->category_model->save($category);

      if ($save) {

        Indra_Helper::returnResponse(200,$data);

      }else {

        Indra_Helper::returnResponse(500,$category);

      }


    }

    public function unitread_get($id = null)
    {
      if ($id == null) {
        $data = $this->unit_model->find();
      }else {
        $this->unit_model->withId($id);
        $data = $this->unit_model->findOne();
      }


      if ($data != null) {
        Indra_Helper::returnResponse(200,$data);
      }

      Indra_Helper::returnResponse(404);



    }

    public function unitinsert_post()
    {

      $data = $this->input->post(NULL,true);

      if (isset($data["id"])) {

        $this->unit_model->withId($data["id"]);
        $temp = $this->unit_model->findOne();

        foreach ($data as $key => $value) {
          $temp->{$key} = $value;
        }

        $data = $temp;

      }

      $data = (object) $data;
      $unit = new Unit_Object($data);

      $save = $this->unit_model->save($unit);

      if ($save) {

        Indra_Helper::returnResponse(200,$data);

      }else {

        Indra_Helper::returnResponse(500,$unit);

      }


    }

    public function recordread_get($id = null)
    {
      if ($id == null) {
        $data = $this->record_model->find();

        if ($data !=  null) {

          foreach ($data as $key => &$value) {
            $value->category = $value->getCategory();
            $value->category->parent = $value->category->getParent();
            $value->unit = $value->getUnit();
            $value->data_created = date("d-m-Y",$value->data_created);
            $value->input_created = date("d-m-Y",$value->input_created);
          }

        }

      }else {
        $this->record_model->withId($id);
        $data = $this->record_model->findOne();
      }



      if ($data != null) {
        Indra_Helper::returnResponse(200,$data);
      }

      Indra_Helper::returnResponse(404);



    }

    public function recordinsert_post()
    {

      $data = $this->input->post(NULL,true);

      if (isset($data["id"])) {

        $this->record_model->withId($data["id"]);
        $temp = $this->record_model->findOne();

        foreach ($data as $key => $value) {
          if ($key == "data_created") {
            $temp->{$key} = strtotime($value);
          }else {
            $temp->{$key} = $value;
          }

        }

        $data = $temp;

      }else {
        $data["data_created"] = strtotime($data["data_created"]);
        $data["input_created"] = time();

      }

      $data = (object) $data;
      $unit = new Record_Object($data);

      $save = $this->record_model->save($unit);

      if ($save) {

        Indra_Helper::returnResponse(200,$data);

      }else {

        Indra_Helper::returnResponse(500,$unit);

      }


    }
}
