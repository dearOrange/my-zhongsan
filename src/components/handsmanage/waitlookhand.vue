<template>
	<div class="waitCon">
		<div class="handsSearch">
			<Input v-model="value1" placeholder="请输入手机号" style="width: 150px"></Input>
		
			<Input v-model="value2" placeholder="请输入昵称" style="width: 150px"></Input>
		
			<Input v-model="value3" placeholder="请输入城市code" style="width: 150px"></Input>
			
			<Select v-model="model1" style="width:150px" clearable @on-change="changeVal1">
		        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
		   </Select>
		   <Select v-model="model2" style="width:150px" clearable @on-change="changeVal2">
		        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
		   </Select>
			<Button type="ghost" icon="ios-search" @click="handSearch">搜索</Button>
		</div>
		<Table border :columns="columns7" :data="data6"></Table>
    	<Page :total="pages" :current="pageNum" @on-change="change"></Page>
	</div>
    
</template>
<script>
    export default {
        data () {
            return {
            	pageNum:1,
                pages:10,
                value1:'',
                value2:'',
                value3:'',
                model1:'',
                model2:'',
                columns7: [
                	{
                        title: '序号',
                        key: 'index',
                        width:60
                    },
                    {
                        title: '账户',
                        key: 'loginName'
                    },
                    {
                        title: '手机号',
                        key: 'code'
                    },
                    {
                        title: '昵称',
                        key: 'nickName'
                    },
                    {
                        title: '操盘手',
                        key: 'type'
                    },
                    {
                        title: '城市code',
                        key: 'cityCode'
                    },
                    {
                        title: '等级',
                        key: 'traderLevel'
                    },
                    {
                        title: '交易所',
                        key: 'futuresRange'
                    },
                    {
                        title: '收益率',
                        key: 'yield'
                    },
                    {
                        title: '交易胜率',
                        key: 'winRate'
                    },
                    {
                        title: '状态',
                        key: 'state'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.through(params.index)
                                        }
                                    }
                                }, '通过'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.reject(params.index)
                                        }
                                    }
                                }, '拒绝')
                            ]);
                        }
                    }
                ],
                data6: [
                    
                ],
                cityList1: [
                	{
                        value: 1,
                        label: '公开操盘手'
                    },
                    {
                        value: 2,
                        label: '非公开操盘手'
                    }
                ],
                cityList2: [
                	{
                        value: 0,
                        label: '周'
                    },
                    {
                        value: 1,
                        label: '月'
                    },
                    {
                        value: 2,
                        label: '年'
                    }
                ],
                city1Num:'',
                city2Num:''
            }
        },
        methods: {
            through (index) {
                var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/trader/checkTrader',
            		data:JSON.stringify({
            			"id":that.data6[index].id,
    					"state":1
            		})
            	}).then(function(res){
            		
            	})
            },
            reject (index) {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/trader/checkTrader',
            		data:JSON.stringify({
            			"id":that.data6[index].id,
    					"state":2
            		})
            	}).then(function(res){
            		
            	})
            },
            change (page) {
            	this.pageNum = page;
            	this.handSet();
            },
            handSet () {
            	var that = this;
	        	this.ajax({
	        		method:'post',
	        		url:this.apiUrl + '/trader/getCheckTraderList',
	        		data:JSON.stringify({
	        			"currentPage":that.pageNum,
	 					"pageSize":10
	        		})
	        	}).then(function(res){
	        		that.pages = res.data.pages*10;
	        		var data = res.data.resultList;
	        		var handStr = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
	        			obj.id = data[i].id;
	        			obj.loginName = data[i].loginName;
	        			obj.code = data[i].code;
	        			obj.nickName = data[i].nickName;
	        			obj.traderLevel = data[i].traderLevel;
	        			obj.cityCode = data[i].cityCode;
	        			obj.yield = data[i].yield;
	        			obj.winRate = data[i].winRate;
	        			if(data[i].state == 0){
							data[i].state = "待审核"
						}
						if(data[i].type == 1){
							data[i].type = "公开操盘手"
						}else if(data[i].type == 2){
							data[i].type = "非公开操盘手"
						}
						if(data[i].futuresRange == 1){
							data[i].futuresRange = "国外"
						}else if(data[i].futuresRange == 0){
							data[i].futuresRange = "国内"
						}else if(data[i].futuresRange == 2){
							data[i].futuresRange = "香港"
						}
						obj.type = data[i].type;
	        			obj.state = data[i].state;
	        			obj.futuresRange = data[i].futuresRange;
	        			handStr.push(obj)
	        			that.data6=handStr;
	        		}
	        	})
           },
           changeVal1 (value) {
           		this.city1Num = value;
           },
           changeVal2 (value) {
           		this.city2Num = value;
           },
           handSearch () {
           		var that = this;
           		this.ajax({
           			method:'post',
           			url:this.apiUrl + '/trader/getCheckTraderList',
           			data:JSON.stringify({
           				"currentPage":that.pageNum,
						"pageSize":10,
						"time":that.city2Num,
						"code":that.value1,
						"type":that.city1Num,
						"nickName":that.value2,
						"cityCode":that.value3
           			})
           		}).then(function(res){
           			that.pages = res.data.pages*10;
	        		var data = res.data.resultList;
	        		var handStr = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
	        			obj.id = data[i].id;
	        			obj.loginName = data[i].loginName;
	        			obj.code = data[i].code;
	        			obj.nickName = data[i].nickName;
	        			obj.traderLevel = data[i].traderLevel;
	        			obj.cityCode = data[i].cityCode;
	        			obj.yield = data[i].yield;
	        			obj.winRate = data[i].winRate;
	        			if(data[i].state == 0){
							data[i].state = "待审核"
						}
						if(data[i].type == 1){
							data[i].type = "公开操盘手"
						}else if(data[i].type == 2){
							data[i].type = "非公开操盘手"
						}
						if(data[i].futuresRange == 1){
							data[i].futuresRange = "国外"
						}else if(data[i].futuresRange == 0){
							data[i].futuresRange = "国内"
						}else if(data[i].futuresRange == 2){
							data[i].futuresRange = "香港"
						}
						obj.type = data[i].type;
	        			obj.state = data[i].state;
	        			obj.futuresRange = data[i].futuresRange;
	        			handStr.push(obj)
	        			that.data6=handStr;
	        		}
           		})
           }
        },
        mounted (){
        	this.handSet();
        }
    }
</script>

<style scoped>
	
</style>