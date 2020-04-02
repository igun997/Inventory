<?php


class Indra_Helper{

	public static $ci_instance;
	public static $indie_instance;

	public static $apiKey;
	public static $hashidInstance;

	public static function getCIInstance(){

		if(!self::$ci_instance){

			self::$ci_instance = &get_instance();
		}

		return self::$ci_instance;
	}
	public static function getProper($class)
	{
		$reflector = new ReflectionClass($class);
    $properties = $reflector->getProperties();
    $defaults = $reflector->getDefaultProperties();

    $serealized = "O:" . strlen($class) . ":\"$class\":".count($properties) .':{';
    foreach ($properties as $property){
        $name = $property->getName();
        if($property->isProtected()){
                $name = chr(0) . '*' .chr(0) .$name;
            } elseif($property->isPrivate()){
                $name = chr(0)  . $class.  chr(0).$name;
            }
            $serealized .= serialize($name);
            if(array_key_exists($property->getName(),$defaults) ){
                $serealized .= serialize($defaults[$property->getName()]);
            } else {
                $serealized .= serialize(null);
            }
        }
    $serealized .="}";
    return unserialize($serealized);
	}

	public static function returnResponse($httpCode, $data = NULL, $message = NULL, $pagination_data = NULL, $time_range = NULL){

		$CI = self::getCIInstance();

		$response = [];

		switch ($httpCode){
			case 200:
				$response['code'] = 200;
				(empty($message)) ? $response['message'] = 'OK' : $response['message'] = $message;
				break;
			case 400:
				$response['code'] = 400;
				(empty($message)) ? $response['message'] = "Bad Request" : $response['message'] = $message;
				break;
			case 401:
				$response['code'] = 401;
				(empty($message)) ? $response['message'] = "Invalid Parameter" : $response['message'] = $message;
				break;
			case 403:
				$response['code'] = 403;
				(empty($message)) ? $response['message'] = "Invalid Login Data" : $response['message'] = $message;
				break;
			case 404:
				$response['code'] = 404;
				(empty($message)) ? $response['message'] = "No Data" : $response['message'] = $message;
				break;
			case 500:
				$response['code'] = 500;
				(empty($message)) ? $response['message'] = "System Error" : $response['message'] = $message;
				break;
			case 301:
				return $CI->response("Moved Permanently", 301);
				break;
			default:
				$response['code'] = $httpCode;
				(empty($message)) ? $response['message'] = "" : $response['message'] = $message;
				(empty($data)) ? $response['data'] = [] : $response['data'] = $data;
				break;
		}

		if( ! empty($data)){
			$response['data'] = $data;
		}

		if( ! empty($pagination_data)){
			$response['pagination'] = $pagination_data;
		}

		if( ! empty($time_range)){
			$response['time_range'] = $time_range;
		}

		$CI->output
			->set_content_type('application/json')
			->_display(json_encode($response));
		die();
	}
	public static function unsetObject($data,Array $res,Int $status = 1)
	{
		if ($res[0] == "*") {
			return $data;
		}
		if ($status == 1) {
			foreach ($data as $key => &$value) {
				foreach ($value as $k => $v) {
					if (!in_array($k,$res)) {
						unset($value->{$k});
					}
				}
			}
			return $data;
		}elseif ($status == 0) {
			foreach ($data as $key => &$value) {
				if (!in_array($key,$res)) {
					unset($data->{$key});
				}
			}
			return $data;
		}
	}

}
