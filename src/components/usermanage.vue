<template>
	<div class="userCon">
		<div class="handsSearch">
			<Input v-model="value1" placeholder="请输入手机号" style="width: 150px"></Input>
			<Input v-model="value2" placeholder="请输入登录账号" style="width: 150px"></Input>
			<Input v-model="value3" placeholder="持仓手数" style="width: 150px"></Input>
			<Input v-model="value4" placeholder="入金次数" style="width: 150px"></Input>
			<Select v-model="model1" style="width:150px" clearable @on-change="changeVal1" placeholder="组别">
		        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
		  </Select>
		  <Select v-model="model2" style="width:150px" clearable @on-change="changeVal2" placeholder="状态">
		        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
		  </Select>
			<Button type="ghost" icon="ios-search" @click="handSearch">搜索</Button>
		</div>
		<div class="userTab">
			<table border="1" bordercolor="grey" heigth="60" cellspacing="0" cellpadding="10">
				<tr>
					<td rowspan="2" width="80">登录帐号</td>
					<td rowspan="2" width="80">用户姓名</td>
					<td rowspan="2" width="120">手机号</td>
					<td rowspan="2" width="80">城市</td>
					<td rowspan="2" width="80">组类别</td>
					<td rowspan="2" width="100">用户类型</td>
					<td rowspan="2" width="80">持仓手数</td>
					<td rowspan="2" width="80">入金次数</td>
					<td colspan="5" width="450">钱包类型</td>
					<td rowspan="2" width="80">状态</td>
					<td rowspan="2" width="200">操作</td>
				</tr>
				<tr>
					<td width="90">类型</td>
					<td width="90">浮动盈亏</td>
					<td width="90">冻结金额</td>
					<td width="90">返佣金额</td>
					<td width="90">可同余额</td>
				</tr>
			</table>
			<Table border :columns="columns7" :data="data6" :show-header="showHeader"></Table>
		</div>
		<Page :total="pages" :current="pageNum" @on-change="change"></Page>
	</div>
</template>
<script>
    export default {
        data () {
            return {
            	showHeader:false,
            	value1:'',
            	value2:'',
            	value3:'',
            	value4:'',
            	model1:'',
            	model2:'',
                columns7: [
                    {
                        title: '登录帐号',
                        key: 'loginName',
                        width:80
                    },
                    {
                        title: '用户姓名',
                        key: 'name',
                        width:80
                    },
                    {
                        title: '手机号',
                        key: 'code',
                        width:120
                    },
                    {
                        title: '城市',
                        key: 'cityCode',
                        width:80
                    },
                    {
                        title: '组类别',
                        key: 'tradeGroup',
                        width:80
                    },
                    {
                        title: '用户类型',
                        key: 'type',
                        width:100
                    },
                    {
                        title: '持仓手数',
                        key: 'positionNum',
                        width:80
                    },
                    {
                        title: '入金次数',
                        key: 'recordNum',
                        width:80
                    },
                    {
                        title: '类型',
                        key: 'walletType',
                        width:90
                    },
                    {
                        title: '浮动盈亏',
                        key: 'realProfit',
                        width:90
                    },
                    {
                        title: '冻结金额',
                        key: 'freezeMoney',
                        width:90
                    },
                    {
                        title: '返佣金额',
                        key: 'rebateMoney',
                        width:90
                    },
                    {
                        title: '可用余额',
                        key: 'supMoney',
                        width:90
                    },
                    {
                        title: '状态',
                        key: 'state',
                        width:80
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                            	h('Button', {
                                    props: {
                                        type: 'success',
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.reject(params.index)
                                        }
                                    }
                                }, '拒绝'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    
                ],
                cityList1: [
                	
                	{
                        value: 0,
                        label: '模拟组'
                    },
                    {
                        value: 1,
                        label: '交易组'
                    }
                ],
                cityList2: [
                	
                	{
                        value: 0,
                        label: '待审核'
                    },
                    {
                        value: 1,
                        label: '已通过'
                    },
                    {
                        value: 2,
                        label: '拒绝'
                    }
                ],
                keepNum:0,
                pageNum:1,
                pages:10,
                city1Num:'',
                city2Num:''
            }
        },
        methods: {
        	through (index) {
               	var that = this;
	        	this.ajax({
	        		method:'post',
	        		url:this.apiUrl + '/back/user/checkUser',
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
	        		url:this.apiUrl + '/back/user/checkUser',
	        		data:JSON.stringify({
            			"id":that.data6[index].id,
            			"state":2
            		})
	        	}).then(function(res){
	        		
	        	})
            },
            remove (index) {
            	console.log(this)
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/back/user/checkUser',
            		data:JSON.stringify({
            			"id":that.data6[index].id,
            			"state":3
            		})
            	}).then(function(res){
            		
            	})
            	console.log(this)
                this.data6.splice(index, 1);
                this.keepNum = index;
            },
            change (page) {
            	this.pageNum = page;
            	this.userSet();
            },
            userSet(){
            	var that = this;
	        	this.ajax({
	        		method:'post',
	        		url:this.apiUrl + '/back/user/getUsersList',
	        		data:JSON.stringify({
	        			"page":that.pageNum,
	    				"size":10
	        		}),
	        	}).then(function(res){
	        		that.pages = res.data.pages*10;
	        		var data = res.data.data;
					var dataPush = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
						obj.id = data[i].id;
						obj.name = data[i].name;
						obj.loginName = data[i].loginName;
						obj.code = data[i].code;
						obj.cityCode = data[i].cityCode;
						obj.positionNum = data[i].positionNum;
						obj.recordNum = data[i].recordNum;
						var walletList = data[i].walletList;
						for(var j=0;j<walletList.length;j++){
							obj.realProfit = walletList[j].realProfit;
							obj.freezeMoney = walletList[j].freezeMoney;
							obj.rebateMoney = walletList[j].rebateMoney;
							obj.supMoney = walletList[j].supMoney;
							if(walletList[j].type == 1){
								walletList[j].type = "美金"
							}else if(walletList[j].type == 0){
								walletList[j].type = "人民币"
							}else if(walletList[j].type == 2){
								walletList[j].type = "港币"
							}
							obj.walletType = walletList[j].type;
						}				
						if(data[i].state == 1){
							data[i].state = "已通过"
						}else if(data[i].state == 0){
							data[i].state = "待审核"
						}else if(data[i].state == 2){
							data[i].state = "拒绝"
						}
						if(data[i].state == 1||data[i].state == 2){
							
						}
						
						if(data[i].tradeGroup == 1){
							data[i].tradeGroup = "交易组"
						}else if(data[i].tradeGroup == 0){
							data[i].tradeGroup = "模拟组"
						}
						
						if(data[i].type == 0){
							data[i].type = "普通用户"
						}
						
						obj.type = data[i].type;
						obj.tradeGroup = data[i].tradeGroup;
						obj.state = data[i].state;
						dataPush.push(obj)
						that.data6 = dataPush;
						
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
           			url:this.apiUrl + '/back/user/getUsersList',
           			data:JSON.stringify({
					    "page":that.pageNum,
					    "size":10,
					    "code":that.value1,
					    "loginName":that.value2,
					    "tradeGroup":that.city1Num,
					    "positionNum":that.value3,
					    "recordNum":that.value4,
					    "uState":that.city2Num
					})
           		}).then(function(res){
           			that.pages = res.data.pages*10;
	        		var data = res.data.data;
					var dataPush = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
						obj.id = data[i].id;
						obj.name = data[i].name;
						obj.loginName = data[i].loginName;
						obj.code = data[i].code;
						obj.cityCode = data[i].cityCode;
						obj.positionNum = data[i].positionNum;
						obj.recordNum = data[i].recordNum;
						var walletList = data[i].walletList;
						for(var j=0;j<walletList.length;j++){
							obj.realProfit = walletList[j].realProfit;
							obj.freezeMoney = walletList[j].freezeMoney;
							obj.rebateMoney = walletList[j].rebateMoney;
							obj.supMoney = walletList[j].supMoney;
							if(walletList[j].type == 1){
								walletList[j].type = "美金"
							}else if(walletList[j].type == 0){
								walletList[j].type = "人民币"
							}else if(walletList[j].type == 2){
								walletList[j].type = "港币"
							}
							obj.walletType = walletList[j].type;
						}				
						if(data[i].state == 1){
							data[i].state = "已通过"
						}else if(data[i].state == 0){
							data[i].state = "待审核"
						}else if(data[i].state == 2){
							data[i].state = "拒绝"
						}
						
						if(data[i].tradeGroup == 1){
							data[i].tradeGroup = "交易组"
						}else if(data[i].tradeGroup == 0){
							data[i].tradeGroup = "模拟组"
						}
						
						if(data[i].type == 0){
							data[i].type = "普通用户"
						}
						
						obj.type = data[i].type;
						obj.tradeGroup = data[i].tradeGroup;
						obj.state = data[i].state;
						dataPush.push(obj)
						that.data6 = dataPush;
						
	        		}
           		})
           	}
       	},
        mounted(){
        	this.userSet();
        }
    }
</script>
<style scoped>
	.handsSearch{
		margin:10px 0;
	}
</style>