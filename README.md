# leaflet-canvas-large-data
在leaflet地图上使用leaflet的marker绘制节点，polyline绘制链路，发现在5000个节点和5000条链路数量规模时，发现浏览器卡死，响应缓慢。

该项目研究了在leaflet地图上高性能地展示大数据，**实测在10000个节点和10000条链路数量规模时，绘制时间在5秒以内，且浏览器响应流畅**。

## Demo
**[在线Demo](https://weieyuan.github.io/leaflet-canvas-large-data)**

![demo](./demo/demo1.gif)

## 运行
下载或者克隆参考代码，直接访问index.html文件。