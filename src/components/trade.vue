<template>
	<div class="tradeCon">
		<div class="tradeHead">交易管理</div>
		<div class="searchList">
			<Input v-model="value1" placeholder="登录账号" style='width:200px'></Input>
			<Input v-model="value2" placeholder="手机号" style='width:200px'></Input>
			<Input v-model="value3" placeholder="期货code" style='width:200px'></Input>
			<Input v-model="value4" placeholder="期货名称" style='width:200px'></Input>
			<Select v-model="model1" style="width:200px" clearable @on-change="changeVal">
		        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>
		    <Button type="ghost" icon="ios-search" @click="handSearch">搜索</Button>
		</div>
		<Table border :columns="columns5" :data="data5"></Table>
		<Page :total="pages" :current="pageNum" @on-change="change"></Page>
	</div>
    
</template>
<script>
	import $ from 'jquery' 
    export default {
        data () {
            return {
            	pageNum:1,
                pages:10,
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                model1:'',
                columns5: [
                	{
                        title: '序号',
                        key: 'index',
                        width:60
                    },
                    {
                        title: '委托时间',
                        key: 'createTime'
                    },
                    {
                        title: '成交时间',
                        key: 'overTime'
                    },
                    {
                        title: '订单ID',
                        key: 'oid'
                    },
                    {
                        title: '登录帐号',
                        key: 'loginName'
                    },
                    {
                        title: '手机号',
                        key: 'code'
                    },
                    {
                        title: '期货CODE',
                        key: 'futuresCode'
                    },
                    {
                        title: '期货名称',
                        key: 'futuresName'
                    },
                    {
                        title: '委托价',
                        key: 'price'
                    },
                    {
                        title: '成交量',
                        key: 'volume'
                    },
                    {
                        title: '成交价',
                        key: 'overPrice'
                    },
                    {
                        title: '盈亏',
                        key: 'profit'
                    },
                    {
                        title: '订单类型',
                        key: 'type'
                    },
                    {
                        title: '订单状态',
                        key: 'state'
                    }
                ],
                data5: [
                    
                ],
                cityList: [
                    {
                        value: 0,
                        label: '普通交易'
                    },
                    {
                        value: 1,
                        label: '跟单交易'
                    },
                    {
                        value: 2,
                        label: '模拟交易'
                    }
                ],
                typeNum:''
            }
        },
        methods : {
        	tradeSet () {
        		var that = this;
	        	this.ajax({
	        		method:'post',
	        		url:this.apiUrl + '/backOrder/selectBackOrderList',
	        		data:JSON.stringify({
	        			"currentPage":that.pageNum,
	    				"pageSize":10
	        		})
	        	}).then(function(res){
	        		that.pages = res.data.pages*10;
	        		var data = res.data.resultList;
	        		var dataPush = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
	        			obj.code = data[i].code;
	        			if(data[i].overTime == null){
							data[i].overTime = '';
							obj.overTime = data[i].overTime;
						}else{
							
           					obj.overTime = format(data[i].overTime);
						}
	        			function add0(m){return m<10?'0'+m:m }
						function format(shijianchuo)
						{
							var time = new Date(shijianchuo);
							var y = time.getFullYear();
							var m = time.getMonth()+1;
							var d = time.getDate();
							var h = time.getHours();
							var mm = time.getMinutes();
							var s = time.getSeconds();
							return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
						}
	        			obj.createTime = format(data[i].createTime);
	        			obj.futuresCode = data[i].futuresCode;
	        			obj.futuresName = data[i].futuresName;
	        			obj.loginName = data[i].loginName;
	        			obj.oid = data[i].oid;
	        			obj.overPrice = data[i].overPrice;
	        			obj.volume = data[i].volume;
	        			obj.price = data[i].price;
	        			obj.profit = data[i].profit;
	        			if(data[i].state == 0){
	        				data[i].state = "进行中";
	        			}else if(data[i].state == 1){
	        				data[i].state = "已结束";
	        			}else if(data[i].state == 2){
	        				data[i].state = "已取消";
	        			}
	        			if(data[i].type == 0){
	        				data[i].type = "普通交易";
	        			}else if(data[i].type == 1){
	        				data[i].type = "跟单交易";
	        			}else if(data[i].type == 2){
	        				data[i].type = "模拟交易";
	        			}
	        			obj.state = data[i].state;
	        			obj.type = data[i].type;
	        			dataPush.push(obj)
	        			that.data5 = dataPush;
	        		}
	        	})
        	},
        	change (page) {
            	this.pageNum = page;
            	this.tradeSet();
            },
            changeVal (value) {
            	this.typeNum = value;
            },
            handSearch () {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/backOrder/selectBackOrderList',
            		data:JSON.stringify({
            			"currentPage":that.pageNum,
					    "pageSize":10,
					    "loginName":that.value1,
					    "code":that.value2,
					    "futuresCode":that.value3,
					    "futuresName":that.value4,
					    "type":that.typeNum
            		})
            	}).then(function(res){
            		that.pages = res.data.pages*10;
            		var data = res.data.resultList;
	        		var dataPush = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
	        			obj.code = data[i].code;
	        			obj.createTime = format(data[i].createTime);
	        			obj.futuresCode = data[i].futuresCode;
	        			obj.futuresName = data[i].futuresName;
	        			obj.loginName = data[i].loginName;
	        			obj.oid = data[i].oid;
	        			obj.overPrice = data[i].overPrice;
	        			obj.overTime = format(data[i].overTime);
	        			obj.volume = data[i].volume;
	        			obj.price = data[i].price;
	        			obj.profit = data[i].profit;
	        			if(data[i].state == 0){
	        				data[i].state = "进行中";
	        			}else if(data[i].state == 1){
	        				data[i].state = "已结束";
	        			}
	        			if(data[i].type == 0){
	        				data[i].type = "普通交易";
	        			}else if(data[i].type == 1){
	        				data[i].type = "跟单交易";
	        			}else if(data[i].type == 2){
	        				data[i].type = "模拟交易";
	        			}
	        			obj.state = data[i].state;
	        			obj.type = data[i].type;
	        			dataPush.push(obj)
	        			that.data5 = dataPush;
	        		}
            	})
            }
        },
        mounted () {
        	this.tradeSet();
        }
        	
    }
</script>
<style scoped>
	.tradeHead{
		border:1px solid #ccc;
		padding:10px;
	}
	.searchList{
		margin:10px 0;
	}
</style>