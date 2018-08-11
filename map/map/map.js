var opts = {
		width : 200,     // 信息窗口宽度
		height: 80,     // 信息窗口高度
		title : "信息" , // 信息窗口标题
		enableMessage:true//设置允许信息窗发送短息
	   };
var map;


$(document).ready(function(){
	// 百度地图API功能
	map = new BMap.Map("allmap");    // 创建Map实例
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
	        BMAP_NORMAL_MAP,
	        BMAP_HYBRID_MAP
	    ]}));
	getGps();
	
})
 function getGps(){
	 $.ajax({ 
	        type: "POST", 
	        dataType: "json", 
	        contentType: 'application/json;charset=UTF-8',
	        data:"{\"userId\":1,\"loginType\":2,\"permissions\":2,\"accessToken\":\"1sfadawaweasdadqwa221\"}",   
	        url: "../map/getGps",
	        success: function(data) {
	        	console.log(data.data);
				var myArray=data.data.dataList;// 你直接这样拿就OK了，  可以去看接口返回， 直接拿回来就是数组
				var pointArray = new Array();
				for (var i = 0; i < myArray.length; i ++) {
					var point = new BMap.Point(myArray[i].longitude,myArray[i].latitude);// 创建点坐标
					pointArray[i]=point;
					var marker = new BMap.Marker(point); // 创建标注
					map.addOverlay(marker); // 将标注添加到地图中
					addClickHandler(myArray[i],marker);  // 添加标注点击事件
				}
				var point = new BMap.Point(myArray[0]==null?116.404:myArray[0].longitude, myArray[0]==null?39.915:myArray[0].latitude);//兼容空值报错 默认北京
				map.centerAndZoom(point, 15);  //我加了让所有点可见后  这个好像没用     初始化地图,设置中心点坐标和地图级别 
				map.setViewport(pointArray); //让所有点可见
	        }
	    });
 	}
	function addClickHandler(myArraydata,marker){//提示窗口
		marker.addEventListener("click",function(e){
			openInfo("设备名称："+myArraydata.deviceName+"<br> SN号:"+myArraydata.sn,e);
			$("#deviceName").val(myArraydata.deviceName)
			$("#sn").val(myArraydata.sn)
		}
		);
	}
	function openInfo(content,e){//提示窗口
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	}
	
	function getDeviceGps(){
		map = new BMap.Map("allmap");    // 创建Map实例
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		 $.ajax({ 
		        type: "POST", 
		        dataType: "json", 
		        contentType: 'application/json;charset=UTF-8',
		        data:"{\"sn\":"+$("#sn").val()+",\"userId\":1,\"loginType\":2,\"permissions\":2,\"accessToken\":\"1sfadawaweasdadqwa221\"}",   
		        url: "../map/getDeviceGps",
		        success: function(data) {
		        	console.log(data.data);
					var myArray=data.data.dataList;
					var pointArray = new Array();
					for (var i = 0; i < myArray.length; i ++) {
						var point = new BMap.Point(myArray[i].longitude,myArray[i].latitude);// 创建点坐标
						pointArray[i]=point;
						var marker = new BMap.Marker(point);// 创建标注
						if(i==0){
							var myIcon1 = new BMap.Icon("./start.png", new BMap.Size(40,80));// 自定义标注图
							marker = new BMap.Marker(point,{icon:myIcon1});
							map.addOverlay(marker);//添加起点
						}
						if(i==(myArray.length-1)){
							var myIcon2 = new BMap.Icon("./end.png", new BMap.Size(40,80));// 自定义标注图
							marker = new BMap.Marker(point,{icon:myIcon2});
							map.addOverlay(marker);//添加终点
		 				}
					}
					
					var point = new BMap.Point(myArray[0]==null?116.404:myArray[0].longitude, myArray[0]==null?39.915:myArray[0].latitude);//兼容空值报错 默认北京
					var polyline = new BMap.Polyline(pointArray,
						    {strokeColor:"blue",//设置颜色
						     strokeWeight:8, //宽度
						    strokeOpacity:0.5//透明度
						     }
						     )
						    map.addOverlay(polyline);  
					map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
					map.setViewport(pointArray); //让所有点可见
		        }

		    });
	 	}