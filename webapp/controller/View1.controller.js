sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, FeedItem) {
        "use strict";

        return Controller.extend("r8charts.controller.View1", {
            onInit: function () {
                var chartModel = new JSONModel();
                var charts = [
                    {
                        "code": "C",
                        "chart": "column"
                    }, {
                        "code": "B",
                        "chart": "bar"
                    }, {
                        "code": "L",
                        "chart": "line"
                    }, {
                        "code": "P",
                        "chart": "pie"
                    }, {
                        "code": "D",
                        "chart": "donut"
                    }
                ];
                chartModel.setData(charts);
                this.getView().setModel(chartModel, "chartModel");
                this.oVizFrame = this.getView().byId("idVizFrame");
                this.oVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            visible: "value",
                            type: "value"
                        }
                    },
                    valueAxis: {
                        title: {
                            visible: true,
                            text: "Product Price"
                        }
                    },
                    categoryAxis: {
                        title: {
                            visible: true,
                            text: "All Products"
                        }
                    },
                    title: {
                        visible: true,
                        text: "Products Vs Price"
                    }
                });
                var oPopOver = this.getView().byId("idPopOver");
                oPopOver.connect(this.oVizFrame.getVizUid());
            },
            onChange: function (oEvent) {
                var oSelect = this.getView().byId("idSelect");
                var oSelectedItem = oEvent.getParameter("selectedItem");
                oSelect.setSelectedItem(oSelectedItem);
                this.oVizFrame.setVizType(oSelectedItem.getText());
                this.oVizFrame.destroyFeeds();
                if (oSelectedItem.getKey() === 'P') {
                    var colorFeed = new FeedItem({
                        "uid": "color",
                        "type": "Dimension",
                        "values": ["ProductName"]
                    });
                    var sizeFeed = new FeedItem({
                        "uid": "size",
                        "type": "Measure",
                        "values": ["ProductPrice"]
                    });
                    this.oVizFrame.addFeed(colorFeed);
                    this.oVizFrame.addFeed(sizeFeed);
                } else if (oSelectedItem.getKey() === 'B' || oSelectedItem.getKey() === 'L'
                    || oSelectedItem.getKey() === 'C') {
                    var categoryAxis = new FeedItem({
                        'uid': "categoryAxis",
                        'type': "Dimension",
                        'values': ["ProductName"]
                    });
                    var valueAxis = new FeedItem({
                        "uid": "valueAxis",
                        "type": "Measure",
                        "values": ["ProductPrice"]
                    });
                    this.oVizFrame.addFeed(categoryAxis);
                    this.oVizFrame.addFeed(valueAxis);
                }

            }
        });
    });
