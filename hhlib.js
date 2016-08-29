
var hhlib = {};

//为空返回 true 其他 false
hhlib.isEmpty = function(){
	if(arguments.length == 0){
		return true;
	}
	if(arguments.length == 1){
		var arg = arguments[0];
		if(arg instanceof Object){
			for(var i in arg){
				if(arg[i] == null || arg[i].toString().trim() == ''){
					return true;
				}
			}
		}else{
			if(arg == null || arg.toString().trim() == ''){
				return true;
			}
		}
	}
	if(arguments.length > 1){
		for(var i in arguments){
			if(arguments[i] == null || arguments[i].toString().trim() ==''){
				return true;
			}
		}
	}
	return false;
};

hhlib.isInt = function(value){
	var pattern = /^\d+$/;
	return pattern.test(value);
};

hhlib.inArr = function(value, arr){
	if(arr instanceof Object){
		for(var i in arr){
			if(value == arr[i]){
				return true;
			}
		}
	}
	return false;
};

hhlib.isIdnumber = function(value){
	var pattern = /^\d{17}[\d|x]|\d{15}$/;
	return pattern.test(value);
};

hhlib.max = function(a, b){
	try{
		var res = a>b ? a : b;
	}catch(e){
		return false;
	}
	return res;
};

hhlib.min = function(a, b){
	try{
		var res = a<b ? a : b;
	}catch(e){
		return false;
	}
	return res;
};

//返回秒时间戳
hhlib.getTime = function(date){
	if(!date){
		return parseInt(Date.now()/1000);
	}else{
		try{
			return parseInt(new Date(date).getTime()/1000);
		}catch(e){
			return false;
		}
	}
};

hhlib.inArr2 = function(value, arr){
	if(arr instanceof Object){
    for(var i in arr){
      if(arr[i] instanceof Object){
        if(this.inArr2(value, arr[i])){
          return true;
        }
      }else{
        if(value == arr[i]) {
          return true;
        }
      }
    }
  }
  return false;
};

hhlib.obj_keys = function(obj){
	var res = new Array();
	if(obj instanceof Object){
		for(var i in obj){
			res.push(i);
		}
	}
	return res;
};

hhlib.obj_values = function(obj){
	var res = new Array();
	if(obj instanceof Object){
		for(var i in obj){
			res.push(obj[i]);
		}
	}
	return res;
};

hhlib.arr2obj = function(arr){
	var res = {};
	for(var i in arr){
		res[i] = arr[i];
	}
	return res;
};

// hhlib.getErrorMsg = function(code){
// 	var error = require('../lib/errorcode');
// 	return error[code];
// };

module.exports = hhlib;
