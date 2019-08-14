var crypto = require('crypto');

    export const paramAll = (req) => {
        var parameter = {};
        if (req.params) {
            for (var p in req.params) {
                parameter[p] = req.params[p];
            }
        }
        if (req.body) {
            for (var p in req.body) {
                parameter[p] = req.body[p];
            }
        }
        if (req.query) {
            for (var p in req.query) {
                parameter[p] = req.query[p];
            }
        }
        return parameter;
    };

    export const encryPassword = (password) => {
        password = 'tao1024' + password;
        var md5 = crypto.createHash('md5');
        var pwd = md5.update(password);
        password = md5.digest('hex');
        return password;
    };

    export const autoCbErrFunction = (originalCb, newCb) =>{
        return function (err, result) {
            if (err) {
                console.log(err);
                originalCb(err);
                return;
            }
            newCb(result);
        }
    }

    //返回拼接上sign的请求对象
    export const createSign = (obj, secret)=> {
        var sortArrStr = getSortStrByAsciiWithObj(obj); //组成按字母顺序排序的字符串

        var waitSecretStr = secret + sortArrStr + secret; //使用前后加secret的方式拼接待加密字符串  
        // console.log(waitSecretStr);
        var md5 = crypto.createHash('md5');
        md5.update(waitSecretStr); 
        var stringSign = md5.digest('hex');
        var sign = stringSign.toLocaleLowerCase(); 
        obj.sign = sign;
        return obj;
    }

    //构造按Ascii码顺序组成的字符串
    function getSortStrByAsciiWithObj(obj) {
        var arr = [];
        for (var key in obj) {
            arr.push(key);
        }
        var sortArr = getsParaFromArr(arr); //返回按字母顺序排序的数组
        var sortArrStr = '';
        sortArr.forEach(function (key) {
            var item = {};
            item[key] = obj[key];
            sortArrStr += key + '=' + obj[key];
        });

        return sortArrStr;
    }

    //传入数组，返回按Ascii码排序的数组
    function getsParaFromArr(sParaTemp) {
        var sPara = [];
        //除去数组中的空值和签名参数
        for (var i1 = 0; i1 < sParaTemp.length; i1++) {
            var value = sParaTemp[i1];
            if (value == null || value == "" || value == "sign") {
                continue;
            }
            sPara.push(value);
        }
        sPara = sPara.sort();
        return sPara;
    }