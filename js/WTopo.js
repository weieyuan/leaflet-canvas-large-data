(function (context) {

    L.WTopo = L.Layer.extend({
        //region cache
        options: {
            map: undefined,
            ctx: undefined,
            imgMap: {},
            images: {},
            topoData: {}
        },
        //endregion
        //region init new W.Topo()会调用这个函数
        initialize: function (options, callback) {
            Object.assign(this.options, options);
            this._initResource(callback);
        },
        _initResource: function (oCallback) {
            var iCount = Object.keys(this.options.imgMap).length;
            var self = this;
            for (var key in this.options.imgMap) {
                (function (key) {
                    var oImage = new Image();
                    oImage.onload = function () {
                        --iCount;
                        self.options.images[key] = oImage;
                        if (iCount == 0) {
                            oCallback();
                        }
                    };
                    oImage.src = this.options.imgMap[key];
                })(key);
            }
        },
        //endregion
        //region 添加到map中时，会调用
        onAdd: function (map) {
            this.options.map = map;
            this.options.ctx = map.getRenderer(map)._ctx;
            //监听事件
            map.on("moveend", this._updateTopo, this);
        },
        //endregion
        //region draw
        drawTopo: function (oTopoData) {
            this.options.topoData = oTopoData;
            this._updateTopo();
        },
        _updateTopo: function () {
            //绘制节点
            this._drawNodes();
            //绘制链路
            this._drawLinks();
        },
        _drawNodes: function () {
            var self = this;
            var iWidth = this._getNodeWidth();
            var iHeight = this._getNodeHeight();

            this.options.topoData.nodes.forEach(function (oNode) {
                var oImage = self.options.images[oNode.imgKey];
                var oPoint = self._getPointByLatLng(oNode.x, oNode.y);
                self.options.ctx.drawImage(oImage, oPoint.x, oPoint.y, iWidth, iHeight);
            });
        },
        _getNodeWidth: function () {
            return this._getZoom() * 3;
        },
        _getNodeHeight: function () {
            return this._getZoom() * 3;
        },
        _drawLinks: function () {
            var self = this;
            this.options.topoData.links.forEach(function (oLink) {
                var ctx = self.options.ctx;
                //style
                ctx.strokeStyle = oLink.uiLinkColor;
                ctx.lineWidth = oLink.uiLinkWidth * self._getZoom();
                //获取线两端的端点
                var srcPoint = self._getPointByNodeId(oLink.srcNodeId);
                var dstPoint = self._getPointByNodeId(oLink.dstNodeId);
                //绘制线
                ctx.beginPath();
                ctx.moveTo(srcPoint.x, srcPoint.y);
                ctx.lineTo(dstPoint.x, dstPoint.y);
                ctx.stroke();
            });
        },
        _getPointByNodeId: function (strNodeId) {
            var arrNodes = this.options.topoData.nodes;
            var oNode;
            for (var i = 0, len = arrNodes.length; i < len; i++) {
                if (arrNodes[i].id == strNodeId) {
                    oNode = arrNodes[i];
                }
            }
            var oPoint = this._getPointByLatLng(oNode.x, oNode.y);
            var iWidth = this._getNodeWidth();
            var iHeight = this._getNodeHeight();
            return {
                x: oPoint.x + iWidth / 2,
                y: oPoint.y + iHeight / 2
            }
        },
        //endregion
        //region utils
        _getPointByLatLng: function (lng, lat) {
            var latlng = L.latLng(lat, lng);
            var point = this.options.map.latLngToLayerPoint(latlng);
            return point;
        },
        _getZoom: function () {
            return this.options.map.getZoom();
        },
        //endregion
        //region 对象从地图上移除时调用
        onRemove: function () {
            this.options = null;
        }
        //endregion
    });

    L.wTopo = function (options, callback) {
        return new L.WTopo(options, callback);
    };

})(this);