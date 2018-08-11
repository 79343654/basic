<style lang="less">
  #trail{
    width: 100vw;
    height:100vh
  }
</style>

<template>
  <div class="trail">
    <div id="trail"></div>
  </div>
</template>

<script>
  import  start from "../../assets/start.png";
  import  end from "../../assets/end.png"
  export default{
    name:'trail',
    data(){
      return {
        map: '',
        opts: {
          width: 100,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title: "信息", // 信息窗口标题
          enableMessage: true//设置允许信息窗发送短息
        }
      }
    },
    props:['basic'],
    mounted(){
      this.map = new BMap.Map("trail");    // 创建Map实例
      this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      //添加地图类型控件
      this.map.addControl(new BMap.MapTypeControl({
        mapTypes:[
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
        ]}));
      this.getDeviceGps()
    },
    methods:{
      getDeviceGps(){
        let data = {
          sn:this.basic.sn,
          ...this.basic
        };
        this.$http({
          method:'post',
          url:this.ajaxUrl+"/map/getDeviceGps",
          dataType: "json",
          contentType: 'application/json;charset=UTF-8',
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            var myArray = result.data.dataList;
            var pointArray = new Array();
            for (var i = 0; i < myArray.length; i ++) {
              var point = new BMap.Point(myArray[i].longitude,myArray[i].latitude);// 创建点坐标
              pointArray[i]=point;
              var marker = new BMap.Marker(point);// 创建标注
              if(i==0){
                var myIcon1 = new BMap.Icon(start, new BMap.Size(40,80));// 自定义标注图
                marker = new BMap.Marker(point,{icon:myIcon1});
                this.map.addOverlay(marker);//添加起点
              }
              if(i==(myArray.length-1)){
                var myIcon2 = new BMap.Icon(end, new BMap.Size(40,80));// 自定义标注图
                marker = new BMap.Marker(point,{icon:myIcon2});
                this.map.addOverlay(marker);//添加终点
              }
            }

            var point = new BMap.Point(myArray[0]==null?116.404:myArray[0].longitude, myArray[0]==null?39.915:myArray[0].latitude);//兼容空值报错 默认北京
            var polyline = new BMap.Polyline(pointArray,
              {strokeColor:"blue",//设置颜色
                strokeWeight:8, //宽度
                strokeOpacity:0.5//透明度
              }
            )
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
            this.map.setViewport(pointArray); //让所有点可见
          }

        },(erro)=>{
          console.log(erro);
        })
      },
      openInfo(content,e){//提示窗口
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,this.opts);  // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow,point); //开启信息窗口
      },
      addClickHandler(myArraydata,marker){//提示窗口
        const _this = this;
        marker.addEventListener("click",function(e){
            _this.openInfo("设备名称："+myArraydata.deviceName+"<br> SN号:"+myArraydata.sn,e);
          }
        );
      }
    }
  }
</script>
