<?php
class Validate{

	private $data;
	protected $error = [];
	protected $commom = [
		'int'=>'/^\d+$/',
		'integer'=>'/^-?\d+$/',
		'phone'=>'/^1[35678]\d{9}$/',
		'email'=>'/^[a-zA-z0-9.]+@\w+\.\w+(\.\w+)?$/i',
		'id_card'=>'/^\d{17}[\d|x]|\d{15}$/i'
	];

	public function __construct($data){
		$this->data = $data;
	}

	public static function with($data){
		return new self($data);
	}

	public function require($key, $msg = ''){
		$res = isset($this->data[$key]) && !($this->data[$key] == '' || $this->data[$key] == null);
		if(!$res)
			$this->error[] = $msg ?: "{$key} is not in this array";
		return $this;
	}

	public function range($key, $s = [0, 9], $msg = ''){
		if(!$this->key_exist($key)){
			$this->error[] = "{$key} is not exist";
			return $this;
		}
		$res = $this->data[$key]>$s[0] && $this->data[$key]<$s[1];
		if(!$res)
			$this->error[] = $msg ?: "{$key} is not between {$s[0]}-{$s[1]}";
		return $this;
	}

	public function regex($key, $s, $msg = ''){
		if(!$this->key_exist($key)){
			$this->error[] = "{$key} is not exist";
			return $this;
		}
		$regex = $s;
		if(in_array($s, array_keys($this->commom))){
			$regex = $this->commom[$s];
		}
		$res = preg_match($regex, $this->data[$key]);
		if(!$res){
			$this->error[] = $msg;
		}
		return $this;
	}

	public function key_exist($key){
		return isset($this->data[$key]);
	}

	public function getError(){
		return $this->error;
	}

	public function getFirstError(){
		$error = $this->error;
		if(count($error)>0)
			return $error[0]
		return false;
	}
}

$array = [
	'name'=>'John',
	'age'=>5,
	'email'=>'123456789@qq.com'
];

//demo
$error = Validate::with($array)->require('name', '姓名不能为空')->range('num', [60, 100])->regex('email', 'email', '邮箱格式错误')->getError();
var_dump($error);
