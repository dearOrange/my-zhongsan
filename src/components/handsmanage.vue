<template>
	<div class="handCon">
		<div class="handsSearch">
			<label>手机号:</label><Input v-model="value1" placeholder="请输入手机号" style="width: 150px"></Input>
		
			<label>昵称:</label><Input v-model="value2" placeholder="请输入昵称" style="width: 150px"></Input>
		
			<label>城市code:</label><Input v-model="value3" placeholder="请输入城市code" style="width: 150px"></Input>
			
			<Select v-model="model1" style="width:150px" clearable @on-change="changeVal1" placeholder="操盘手类型">
		        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
		   </Select>
		   <Select v-model="model2" style="width:150px" clearable @on-change="changeVal2" placeholder="汇总周期">
		        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
		   </Select>
			<Button type="ghost" icon="ios-search" @click="handSearch">搜索</Button>
		</div>
		<div class="handDer">
			<div class="handHeader">
				<Icon type="android-hand" style="margin-right:10px;" size="20"></Icon>操盘手列表
			</div>
			<div class="handTab">
				<Table border :columns="columns7" :data="data6"></Table>
			</div>
		</div>
		<div class="handPage">
			<Page :total="pages" :current="pageNum" @on-change="change"></Page>
		</div>
		<Modal
	        v-model="modal1"
	        title="修改操盘手信息"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <Form :model="formRight" label-position="right" :label-width="100">
		        <FormItem label="电话">
		            <Input v-model="formRight.input1" placeholder="请输入电话"></Input>
		        </FormItem>
		        <FormItem label="昵称">
		            <Input v-model="formRight.input2" placeholder="请输入昵称"></Input>
		        </FormItem>
		        <FormItem label="账号">
		            <Input v-model="formRight.input3" placeholder="请输入用户名"></Input>
		        </FormItem>
		        <FormItem label="地址">
		            <Input v-model="formRight.input4" placeholder="请输入地址"></Input>
		        </FormItem>
		        <FormItem label="城市">
		            <Input v-model="formRight.input5" placeholder="请输入城市"></Input>
		        </FormItem>
			</Form>
	    </Modal>
	    <Modal
	        v-model="modal2"
	        title="查看信息"
	        @on-ok="sure"
	        @on-cancel="cancel">
	        <p>你好</p>
	    </Modal>
	</div>
</template>
<script>
    export default {
        data () {
            return {
            	value1:'',
            	value2:'',
            	value3:'',
            	modal1:false,
            	modal2:false,
            	model1:'',
            	model2:'',
            	formRight:{
            		input1:'',
            		input2:'',
            		input3:'',
            		input4:'',
            		input5:'',
            		input6:'',
            		input7:''
            	},
            	pageNum:1,
                pages:10,
                columns7: [
                	{
                        title: '序号',
                        key: 'index',
                        width:60
                    },
                    {
                        title: '账号',
                        key: 'loginName'
                    },
                    {
                        title: '手机号',
                        key: 'code',
                        width:120
                    },
                    {
                        title: '昵称',
                        key: 'nickName'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '等级',
                        key: 'traderLevel'
                    },
                    {
                        title: '城市',
                        key: 'cityCode'
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
                        width: 130,
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
                                            this.changeHand(params.index)
                                        }
                                    }
                                }, '修改'),
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
                                            this.findStatic(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                data6: [
                    
                ],
                handNum:0,
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
            changeHand (index) {
                this.modal1 = true;
                this.handNum = index;
                this.formRight.input1 = this.data6[this.handNum].code;
            	this.formRight.input2 = this.data6[this.handNum].nickName;
            	this.formRight.input3 = this.data6[this.handNum].loginName;
            	this.formRight.input4 = this.data6[this.handNum].address;
            	this.formRight.input5 = this.data6[this.handNum].cityCode;
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            changeVal1 (value) {
            	this.city1Num = value;
            },
            changeVal2 (value) {
            	this.city2Num = value;
            },
            handSearch () {
            	var that = this;
            	if(that.city1Num == 0){
            		that.city1Num = '';
            	}
            	console.log(that.city1Num);
            	console.log(that.city2Num)
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/trader/getTraderList',
            		data:JSON.stringify({
            			"currentPage":that.pageNum,
						"pageSize":10,
						"code":that.value1,
						"type":that.city1Num,
						"nickName":that.value2,
						"cityCode":that.value3,
						"time":that.city2Num
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
	        			obj.nickName = data[i].nickName;
	        			obj.traderLevel = data[i].traderLevel;
	        			obj.code = data[i].code;
	        			obj.cityCode = data[i].cityCode;
	        			obj.winRate = data[i].winRate;
	        			obj.yield = data[i].yield;
	        			if(data[i].state == 1){
							data[i].state = "已通过"
						}else if(data[i].state == 2){
							data[i].state = "拒绝"
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
	        			obj.state = data[i].state;
	        			obj.type = data[i].type;
	        			obj.futuresRange = data[i].futuresRange;
	        			handStr.push(obj)
	        			that.data6=handStr;
	        		}
            	})
            },
            ok () {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/trader/updateTrader',
            		data:JSON.stringify({
            			"id":that.data6[that.handNum].id,
            			"code": that.formRight.input1,
					    "nickName": that.formRight.input2,
					    "address": that.formRight.input4,
					    "cityCode": that.formRight.input5,
					    "name": that.formRight.input3
            		})
            	}).then(function(res){
            		console.log(res);
            	})
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            change (page) {
            	this.pageNum = page;
            	this.handSet();
            },
            handSet () {
            	var that = this;
	        	this.ajax({
	        		method:'post',
	        		url:this.apiUrl + '/trader/getTraderList',
	        		data:JSON.stringify({
	        			"currentPage":that.pageNum,
	 					"pageSize":10
	        		})
	        	}).then(function(res){
	        		that.pages = res.data.pages*10;
	        		var data = res.data.resultList;
	        		console.log(data)
	        		var handStr = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
	        			obj.id = data[i].id;
	        			obj.loginName = data[i].loginName;
	        			obj.nickName = data[i].nickName;
	        			obj.traderLevel = data[i].traderLevel;
	        			obj.code = data[i].code;
	        			obj.cityCode = data[i].cityCode;
	        			obj.winRate = data[i].winRate;
	        			obj.yield = data[i].yield;
	        			if(data[i].state == 1){
							data[i].state = "已通过"
						}else if(data[i].state == 2){
							data[i].state = "拒绝"
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
	        			obj.state = data[i].state;
	        			obj.type = data[i].type;
	        			obj.futuresRange = data[i].futuresRange;
	        			handStr.push(obj)
	        			that.data6=handStr;
	        		}
	        	})
           	},
           	findStatic (index) {
           		var that = this;
           		this.ajax({
           			method:'post',
           			url:this.apiUrl + '/trader/getTraderById',
           			data:JSON.stringify({
           				'id':that.data6[index].id
           			})
           		}).then(function(res){
           			var data = res.data.data;
           			if(data.tradeGroup == 0){
           				data.tradeGroup = '模拟组'
           			}else if(data.tradeGroup == 1){
           				data.tradeGroup = '交易组'
           			}
           			if(data.type == 1){
           				data.type = '公开操盘手'
           			}else if(data.type == 2){
           				data.type = '非公开操盘手'
           			}
           			if(data.name == null){
           				data.name = ''
           			}
           			that.$Modal.info({
                    title: '操盘手信息',
                    content: `登录账号：${data.loginName}<br>手机号：${data.code}<br>密码：${data.pwd}<br>姓名：${data.name}<br>昵称：${data.nickName}<br>通讯地址：${data.address}<br>城市CODE：${data.cityCode}<br>组类别：${data.tradeGroup}<br>操盘手类型：${data.type}`
                })
           		})
           	},
           	sure () {
           		this.$Message.info('点击了确定');
           	}
        },
        mounted () {
        	this.handSet();
        }
    }
</script>

<style scoped>
	.handDer{
		border:1px solid #ccc;
		background:#F9FAFC;
	}
	.handHeader{
		padding:10px;
		font-weight: 900;
	}
	.handTab{
		border-top:1px solid #ccc;
	}
	.handPage{
		padding: 20px;
	}
	.handsSearch{
		margin:20px 10px 10px;
	}
	.handsSearch label{
		margin:0 10px 0 15px;
	}
</style>