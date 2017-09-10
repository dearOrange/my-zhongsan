<template>
	<div class="moneyCon">
		<div class="entryList">
			<Input v-model="value1" placeholder="登录账号" style='width:200px'></Input>
			<Input v-model="value2" placeholder="手机号" style='width:200px'></Input>
			<Select v-model="model1" style="width:200px" clearable @on-change="changeVal1" placeholder="用户类型">
		        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>
		    <Select v-model="model2" style="width:200px" clearable @on-change="changeVal2" placeholder="记录类型">
		        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>
		    <Select v-model="model3" style="width:200px" clearable @on-change="changeVal3" placeholder="钱包类型">
		        <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>
		    <Button type="ghost" icon="ios-search" @click="handSearch">搜索</Button>
		</div>
		<Table border :columns="columns1" :data="data1"></Table>
		<Page :total="pages" :current="pageNum" @on-change="change"></Page>
	</div>
</template>

<script>
	export default{
		data () {
            return {
            	pageNum:1,
                pages:10,
                value1:'',
                value2:'',
                model1:'',
                model2:'',
                model3:'',
                columns1: [
                	{
                        title: '序号',
                        key: 'index',
                        width:60
                    },
                    {
                        title: '登录账号',
                        key: 'loginName'
                    },
                    {
                        title: '手机号',
                        key: 'code'
                    },
                    {
                        title: '用户类型',
                        key: 'userType'
                    },
                    {
                        title: '记录类型',
                        key: 'type'
                    },
                    {
                        title: '钱包类型',
                        key: 'walletType'
                    },
                    {
                        title: '金额',
                        key: 'money'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    }
                ],
                data1: [
                    
                ],
                cityList1:[
                	{
                        value: 0,
                        label: '普通用户'
                    },
                    {
                        value: 1,
                        label: '公开操盘手'
                    },
                    {
                        value: 2,
                        label: '非公开操盘手'
                    }
                ],
                cityList2:[
                	{
                        value: 0,
                        label: '充值'
                    },
                    {
                        value: 1,
                        label: '提现'
                    },
                    {
                        value: 2,
                        label: '每日结算'
                    },
                    {
                        value: 5,
                        label: '操盘提成-操盘手'
                    }
                ],
                cityList3:[
                	{
                        value: 0,
                        label: '人民币'
                    },
                    {
                        value: 1,
                        label: '美金'
                    },
                    {
                        value: 2,
                        label: '港币'
                    }
                ],
                city1Num:'',
                city2Num:'',
                city3Num:'',
            }
        },
        methods : {
        	change (page) {
            	this.pageNum = page;
            	this.entrySet();
            },
            entrySet () {
            	var that = this;
				this.ajax({
					method:'post',
					url:this.apiUrl + '/walletRecord/selectInOutRecordList',
					data:JSON.stringify({
						"currentPage":that.pageNum,
					    "pageSize":10
					})
				}).then(function(res){
					that.pages = res.data.pages*10;
					var data = res.data.resultList;
					var entryStr = [];
					for(var i=0;i<data.length;i++){
						var obj = {};
						obj.index = i+1;
						obj.loginName = data[i].loginName;
						obj.code = data[i].code;
						obj.money = data[i].money;
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
						if(data[i].userType == 0){
							data[i].userType = "普通用户";
						}else if(data[i].userType == 1){
							data[i].userType = "公开操盘手";
						}else if(data[i].userType == 2){
							data[i].userType = "非公开操盘手";
						}
						if(data[i].walletType == 0){
							data[i].walletType = "人民币";
						}else if(data[i].walletType == 1){
							data[i].walletType = "美金";
						}else if(data[i].walletType == 2){
							data[i].walletType = "港币";
						}
						if(data[i].type == 0){
							data[i].type = "充值";
						}else if(data[i].type == 1){
							data[i].type = "提现";
						}else if(data[i].type == 2){
							data[i].type = "每日结算";
						}else if(data[i].type == 5){
							data[i].type = "操盘提成-操盘手";
						}
						obj.userType = data[i].userType;
						obj.walletType = data[i].walletType;
						obj.type = data[i].type;
						entryStr.push(obj);
						that.data1 = entryStr;
					}
				})
           	},
           	changeVal1 (value) {
           		this.city1Num = value;
           	},
           	changeVal2 (value) {
           		this.city2Num = value;
           	},
           	changeVal3 (value) {
           		this.city3Num = value;
           	},
           	handSearch () {
           		var that = this;
           		this.ajax({
           			method:'post',
           			url:this.apiUrl + '/walletRecord/selectInOutRecordList',
           			data:JSON.stringify({
           				"currentPage":that.pageNum,
					    "pageSize":10,
					    "loginName":that.value1,
					    "code":that.value1,
					    "userType":that.city1Num,
					    "type":that.city2Num,
					    "walletType":that.city3Num
           			})
           		}).then(function(res){
           			that.pages = res.data.pages*10;
					var data = res.data.resultList;
					console.log(data);
					var entryStr = [];
					for(var i=0;i<data.length;i++){
						var obj = {};
						obj.index = i+1;
						obj.loginName = data[i].loginName;
						obj.code = data[i].code;
						obj.money = data[i].money;
						obj.createTime = format(data[i].createTime);
						if(data[i].userType == 0){
							data[i].userType = "普通用户";
						}else if(data[i].userType == 1){
							data[i].userType = "公开操盘手";
						}else if(data[i].userType == 2){
							data[i].userType = "非公开操盘手";
						}
						if(data[i].walletType == 0){
							data[i].walletType = "人民币";
						}else if(data[i].walletType == 1){
							data[i].walletType = "美金";
						}else if(data[i].walletType == 2){
							data[i].walletType = "港币";
						}
						if(data[i].type == 0){
							data[i].type = "充值";
						}else if(data[i].type == 1){
							data[i].type = "提现";
						}else if(data[i].type == 2){
							data[i].type = "每日结算";
						}else if(data[i].type == 5){
							data[i].type = "操盘提成-操盘手";
						}
						obj.userType = data[i].userType;
						obj.walletType = data[i].walletType;
						obj.type = data[i].type;
						entryStr.push(obj);
						that.data1 = entryStr;
					}
           		})
           	}
       	},
		mounted () {
			this.entrySet();
		}
	}
</script>

<style scoped>
	.entryList{
		margin:10px 0;
	}
</style>