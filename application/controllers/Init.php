<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 	 * Initialization Program From Here
 	 * Redirect to Default Folder in ci controller
	 */

class Init extends CI_Controller {

	public function index()
	{
		redirect("admin");
	}
}
