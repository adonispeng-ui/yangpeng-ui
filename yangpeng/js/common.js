var table;
var loading;

var common = {
	
	ImgUrl:'http://cdn.yangpeng.net//',	imageslim:'?imageslim',
	
	coluimnApiUrl: "http://yangpeng.net:12310/ColuimnInterface/",//栏目api

	pageSize: 10,
	tokenFlag : true,
	
	logout: function() {
		sessionStorage.removeItem("accessToken");
		sessionStorage.removeItem("userInfo");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("userInfo");
		sessionStorage.clear();
		localStorage.clear();
		
		//线上地址
//		window.location.href = "http://www.ljxfw.gov.cn/hljuaa/logout?logout_success_url=http://www.ljxfw.gov.cn/testdjypt/index.html";
		//测试地址
		window.location.href = "http://10.64.43.211:8088/hljuaa/logout?logout_success_url=http://10.64.43.41:8080/testdjypt/index.html";
	},

	toLogin: function() {
		window.location.href = common.oauthUrl + "?response_type=" + common.responseType + "&client_id=" + common.clientId + "&redirect_uri=" + common.redirectUri;
	},
	getAccessToken: localStorage['accessToken'] || localStorage.getItem("accessToken"),
//  getLongAccessToken:'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsic2NpbSIsInBhc3N3b3JkIiwidG9rZW5zIl0sInVzZXJfbmFtZSI6IjI1YjAzZTYzZTU0MDQ0M2YzYTE0N2U4NzYwMmJiOWMyNiIsInNjb3BlIjpbIm9wZW5pZCJdLCJleHAiOjE1Nzc4NDQyNzksImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJhZTI2ZTJhMi00NTc2LTRjYTUtYmY5My1mNDlkYmEzMTUzYzMiLCJjbGllbnRfaWQiOiJHM0wzQThYTkZMUVhROEE4VDhOQjVLTjFSNlBDUTJZWSJ9.i0d1yVCrOR76pazZ-WzxNqpJTE-vplvzYAiRetQnSW5BIPdUcFjx8PKFYvGXi133KVAIaDm1GL4AoPu7JZmpeo_CSaCxmehUBz5puEYZQEWE8-sAqJCMSkbpxi8LWrypv4BsAyFkVGP061ldNxTIOvwnmhiFLU-Df1u7-MOZfw7WA_23qMnrGo5PaeG3l3e2XyzSBU_bavG_mhbpfAIajf1xtqpAAbEXX6Q6LjLaspOA-F52OU4DfhLM3tmRwHLy1B2qXB6I1bVRJqbgvt3NMd0_tLhxXLz7y8UsiZvF7qMgRmCSw546XgYttsGd6FbZeWAFFIUJ1dtYYI3OGyC0NA',

	isLogin: function() {
//		var accessToken = common.getAccessToken;
		var accessToken = localStorage.getItem('accessToken');
//		console.info("accessToken"+accessToken)
		if(accessToken == undefined || accessToken == null) {
			common.toLogin();
		} else if((localStorage.getItem("userInfo") == undefined || localStorage.getItem("userInfo") == null) &&
			(localStorage.getItem("userInfo") == undefined || localStorage.getItem("userInfo") == null)) {
			common.logout();
		}
		else {
			common.ajaxLoginUtil(common.userUrl+"user/find/info", {access_token: accessToken}, common.getUserInfo, "GET", false);
		}
	},
	getUserInfo: function(result) {
		result = result.obj;
//		console.info("result"+result)
		if(result.roles[0] == undefined) {
			layer.confirm("该用户没有权限登录此系统，请联系管理员！", {
				btn: ['取消', '确定'], //按钮,
				icon: 0,
				shade: 0.7
			}, function() {
				common.logout();
			}, function() {
				common.logout();
			});
		} else {
			localStorage.obj = result.userInfo.orgCode
			localStorage.userInfo = JSON.stringify(result);
			localStorage.setItem("syncId", result.userInfo.syncId);
			
			
			$("#realName").html(result.userInfo.realName);
			$("#roleId").val(result.roles[0].id);
			$("#syncId").val(result.userInfo.syncId);
		}
	},
	getRole: function() {
		var role;
		if(localStorage['userInfo'] == undefined) {
			common.ajaxUtil(common.userUrl + "info", {
				access_token: common.getAccessToken
			}, common.getUserInfo, "get", false)
		}
		role = JSON.parse(localStorage['userInfo']).roles[0];
		return role;
	},
	
	ajaxUtil: function(url, params, callBack, method, sync, filter) {
			
		if(params.access_token==null||params.access_token==""||params.access_token==undefined){
			common.tokenFlag = false;
			common.tokenOut("登陆失效，请重新登陆！");
			return;
		}
			
		$.ajax({
			type: method == undefined ? "get" : method,
			url: url,
			async: sync == undefined ? true : sync,
			data: params,
			dataTpye: 'json',
			success: function(result) {
				if(result.code == 1003 && common.tokenFlag){
					common.tokenFlag = false
					common.tokenOut("账号已在其他地方登陆，您已强迫下线！")
					return;
				}
				if(result.success) {
					// callBack(result.obj)
					callBack(result)
				} else {
					callBack(result)
				}
			},
			error: function(data) {
				if(data.status == 401){
					if(common.tokenFlag){
						common.tokenFlag = false;
						common.tokenOut("登陆失效，请重新登陆！");
						return;
					}
				}
				if(data.statusText == 'error'){
					if(common.tokenFlag){
						common.tokenFlag = false;
						common.tokenOut("登陆失效，请重新登陆！");
						return;
					}
				}
				console.log("error")
			},
			dataFilter: filter == undefined ? null : filter
		});
	},
	tokenOut : function(msg){
		if(window.top){
			parent.layer.confirm(msg, {
			    btn: ['确定'],
			    cancel:function(){
			    	common.tokenFlag = true;
			     	parent.common.logout();//退出登录
			     }//按钮
			}, function(){
				common.tokenFlag = true;
				parent.common.logout();//退出登录
			});
		}else{
			layer.confirm(msg, {
			    btn: ['确定'],
			    cancel:function(){
			    	common.tokenFlag = true;
			     	common.logout();//退出登录
			     }//按钮
			}, function(){
				common.tokenFlag = true;
				common.logout();//退出登录
			});
		}
	},
	ajaxLoginUtil: function(url, params, callBack, method, sync, filter) {
		$.ajax({
			type: method == undefined ? "get" : method,
			url: url,
			async: sync == undefined ? true : sync,
			data: params,
			dataTpye: 'json',
			success: function(result) {
				if(result.code == 1003 && common.tokenFlag){
					common.tokenFlag = false
					common.tokenOut("账号已在其他地方登陆，您已强迫下线！")
					return;
				}
				if(result.success) {
					callBack(result)
					result = result.obj;
					if(result.roles[0] == undefined) {
						layer.confirm("该用户没有权限登录此系统，请联系管理员！", {
							btn: ['取消', '确定'], //按钮,
							icon: 0,
							shade: 0.7
						}, function() {
							common.logout();
						}, function() {
							common.logout();
						});
					} else {
						localStorage.obj = result.userInfo.orgCode
						localStorage.userInfo = JSON.stringify(result);
						localStorage.setItem("syncId", result.userInfo.syncId);
						localStorage.setItem("systemCurrentName",result.userInfo.realName)
						$("#roleId").val(result.roles[0].id);
						$("#syncId").val(result.userInfo.syncId);
					}
				} else {
					callBack(result)
				}
			},
			error: function(data) {
				if(data.status == 401){
					if(common.tokenFlag){
						common.tokenFlag = false;
						common.tokenOut("登陆失效，请重新登陆！");
						return;
					}
				}
				console.log("error")
			},
			dataFilter: filter == undefined ? null : filter
		});
	},


	router: function(dom, url) {
		if(window.sessionStorage) {
			sessionStorage.dom = $(dom)[0].outerHTML;
			location.href = url + ".html";
		} else {
			alert("not support")
		}
	},
	/**
	 * 
	 * @param {pageId:分页div的id,curr:当前页,url:请求地址,pageSize:每页显示条数,id:显示数据的div的id,packageData:动态页面方法} args
	 */
	paging: function(args) {
		common.ajaxUtil(
			args.url,
			args.params,
			function(result) {
				layui.use(['laypage', 'layer'], function() {
					var laypage = layui.laypage
					//完整功能
					laypage.render({
						elem: args.pageId, //id
						count: result.totalCount, //数据条数
						limit: args.params.pageSize,
						curr: args.params.pageNo,
						first: '首页',
						last: '尾页',
						layout: ['prev', 'page', 'next', 'count', 'skip'], //显示上一页，下一页，页码，总页数
						jump: function(obj, first) {
							if(!first) {
								args.params.pageNo = obj.curr;
								common.pagingnew(args);
							}
						}
					});
				});
				args.packageData(result);
			}, args.method == undefined ? "get" : args.method
		)
	},
	//数据表格
	tableData: function(id, url, params, cols, pageNo, callback, method) {
		
		if(params.access_token==null||params.access_token==""||params.access_token==undefined){
			common.tokenFlag = false;
			common.tokenOut("登陆失效，请重新登陆！");
			return;
		}
		
		
		//在使用table之前加上下面这句就可以了
		table = $.extend(table, {
			config: {
				checkName: 'lay_CHECKED'
			}
		});
		layui.use('table', function() {
			table = layui.table;
			table.render({
				elem: id,
				url: url,
				title: '数据表格',
				where: params, //如果无需传递额外参数，可不加该参数
				method: method == undefined ? "get" : method, //如果无需自定义HTTP类型，可不加该参数
				request: {
					pageName: 'pageNo',
					limitName: 'pageSize',
				},
				parseData: function(res) { 
//					console.log(res)
					//res 即为原始返回的数据
					/*return {
						"code": "0", //解析接口状态
						"msg": res.msg, //解析提示文本
						"count": res.obj.totalCount, //解析数据长度
						"data": res.obj.result //解析数据列表
					}*/
					
					if(res.code == 1003 && common.tokenFlag){
						common.tokenFlag = false
						common.tokenOut("账号已在其他地方登陆，您已强迫下线！")
						return;
					}

					
					return {
					   	"code": "0", //解析接口状态
					   	"msg": res.msg, //解析提示文本
					   	"count": res.obj.totalCount, //解析数据长度
					   	"data": res.obj.result//解析数据列表
					 }
				},
				cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
				page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
					layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
					curr: pageNo, //设定初始在第 5 页
					prev: '上一页',
					next: '下一页',
					first: '首页',
					last: '尾页',
					groups: 5 //只显示 5 个连续页码
				},
				limit: common.pageSize,
				cols: cols,
				done: callback == undefined ? null : callback,
			});
		});
	},
	//获得数据是对数据进行编译（解决id是long型数据缺失问题）
	ajaxDataFilter: function(data, type) {
		data = data.replace(/comId\":(\d+)/g, "comId\":\"$1\"");
		return data;
	},
	//获得数据是对数据进行编译（解决id是long型数据缺失问题）
	ajaxDataFilters: function(data, type) {
		data = data.replace(/villageId\":(\d+)/g, "villageId\":\"$1\"");
		return data;
	},

	getUrlParams: function(para) {
		var paraArr = location.search.substring(1).split('&');
		for(var i = 0; i < paraArr.length; i++) {
			if(para == paraArr[i].split('=')[0]) {
				return paraArr[i].split('=')[1];
			}
		}
		return '';
	},

	imageError: function(dom, defaultImagePath) {
		$(dom).attr("src", defaultImagePath)
	},

	uuid: function() {    
		var  s = [];    
		var  hexDigits =  "0123456789abcdef";    
		for (var  i = 0; i < 36; i++) {        
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);    
		}    
		s[14] =  "4";  
		// bits 12-15 of the time_hi_and_version field to 0010    
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  
		// bits 6-7 of the clock_seq_hi_and_reserved to 01    
		s[8] = s[13] = s[18] = s[23] =  "-";     
		var  uuid = s.join("");    
		return  uuid;
	},
	layerConfirm: function(param) {
		layer.confirm(param.info, {
			btn: ['取消', '确定'], //按钮,
			icon: 0,
			title: param.title,
		}, function() {
			layer.msg('您已取消操作', {
				icon: 2
			});
		}, param.backFun);
	},

	//上传中遮罩
	//提交遮盖
	loading : function (flag) {
		if (flag) {
			layui.use('layer', function() {
				loading = layui.layer.load(1, {
				 content:'请稍候'
				  ,shade: 0.5
				});
			});
				
		} else {
			layer.close(loading);
		}
	},
	msg: function(flag, title) {
		if(flag) {
			msg = parent.layer.msg(title, {
				icon: 16,
				shade: 0.01
			});
		} else {
			parent.layer.close(msg);
		}
	},
	//处理时间戳
	createTime: function(data, format) {
		if(data != null) {
			var date = new Date(data);
			var map = {
				"M": date.getMonth() + 1, //月份
				"d": date.getDate(), //日
				"h": date.getHours(), //小时
				"m": date.getMinutes(), //分
				"s": date.getSeconds(), //秒
				"q": Math.floor((date.getMonth() + 3) / 3), //季度
				"S": date.getMilliseconds() //毫秒
			};
			format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
				var v = map[t];
				if(v !== undefined) {
					if(all.length > 1) {
						v = '0' + v;
						v = v.substr(v.length - 2);
					}
					return v;
				} else if(t === 'y') {
					return(date.getFullYear() + '').substr(4 - all.length);
				}
				return all;
			});
			return format;
		} else {
			return "暂无数据";
		}
	},
	showMessage: function() {
		parent.layer.msg('操作过于频繁!');
	},
	// 表单验证弹窗
	layerDialog : function(title, content) {
		var style = "font-size:16px;background: #fff;color:#249af2;letter-spacing:2px";
		layer.open({
			type: 1,
			time: 2000,
			shade: [0.5, '#000000'],
			title: [title, style],
			area: ['400px', '110px'],
			content: content,
			zIndex: layer.zIndex, //重点1
		});
	}
};


