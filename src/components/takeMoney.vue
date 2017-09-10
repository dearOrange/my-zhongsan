<template>
	<div class="takeCon">
		<div class="searchHead">
			<Input v-model="value2" placeholder="昵称" style='width:200px'></Input>
			<Input v-model="value3" placeholder="手机号" style='width:200px'></Input>
        	<DatePicker type="datetime" placeholder="开始的日期和时间" style="width: 200px" @on-change="changeVal1"></DatePicker>
        	<DatePicker type="datetime" placeholder="结束的日期和时间" style="width: 200px" @on-change="changeVal2"></DatePicker>
            <Button type="ghost" icon="ios-search" @click="handSearch">搜索</Button>
            <span v-model="sumMoney">总金额：{{sumMoney}}</span>
		</div>
		<Table border :columns="columns7" :data="data6"></Table>
		<Page :total="pages" :current="page" @on-change="change"></Page>
		<Modal
	        v-model="modal1"
	        title="请填写拒绝原因"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <Input v-model="value" placeholder="请输入理由" style="width: 300px"></Input>
	    </Modal>
	</div>
</template>
<script>
    export default {
        data () {
            return {
            	pages:10,
            	page:1,
            	modal1: false,
            	value:'',
            	value4:'',
            	value5:'',
            	value2:'',
            	value3:'',
            	sumMoney:0,
                columns7: [
                    {
                        title: '昵称',
                        key: 'nickName'
                    },
                    {
                        title: '手机号',
                        key: 'code',
                        width:120
                    },
                    {
                        title: '提现金额',
                        key: 'ttmMoney'
                    },
                    {
                        title: '提现账号',
                        key: 'ttmCard'
                    },
                    {
                        title: '账号类型',
                        key: 'ttmType'
                    },
                    {
                        title: '申请时间',
                        key: 'ttmAddTime',
                        width:150
                    },
                    {
                        title: '审核时间',
                        key: 'ttmCheckTime',
                        width:150
                    },
                    {
                        title: '审核状态',
                        key: 'ttmStatus'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
							return h('div', this.data6[params.index].ttmStatus == '待审核' ? [
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
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看')
								]:[h('div', this.data6[params.index].ttmStatus == '通过' ? [
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
												this.takemoney(params.index)
											}
										}
									}, '打款'),
									h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看')
								]:[h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看')])
							]);
						}
                    }
                ],
                data6: [
                    
                ],
                keepNum:0,
                dateVal1:'',
                dateVal2:''
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '提现详情',
                    content: `昵称：${this.data6[index].nickName}<br>手机号：${this.data6[index].code}<br>提现金额：${this.data6[index].ttmMoney}<br>账号类型：${this.data6[index].ttmType}<br>提现账号：${this.data6[index].ttmCard}<br>审核状态：${this.data6[index].ttmStatus}<br>拒绝原因：${this.data6[index].ttmRefuseReason}<br>申请时间：${this.data6[index].ttmAddTime}<br>审核人：${this.data6[index].checkName}<br>打款时间：${this.data6[index].ttmPayTime}<br>打款人：${this.data6[index].payName}`
                })
            },
            through (index) {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/tTakeMoney/updateStatus',
            		data:JSON.stringify({
            			"ttmId":that.data6[index].ttmId,
    					"ttmStatus":1
            		})
            	}).then(function(res){
            		var data = res.data;
            		if(data.code == 502){
            			that.$router.push('/');
            		}
            		that.data6[index].ttmStatus = '通过';
            	})
            },
            takemoney (index) {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/tTakeMoney/updateStatus',
            		data:JSON.stringify({
            			"ttmId":that.data6[index].ttmId,
    					"ttmStatus":3
            		})
            	}).then(function(res){
            		var data = res.data;
            		console.log(data)
            		that.data6[index].ttmStatus = '已打款';
            	})
            },
            reject (index) {
            	this.modal1 = true;
            	this.keepNum = index;
            	console.log(this.keepNum)
            },
            ok () {
                var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/tTakeMoney/updateStatus',
            		xhrFields:{withCredentials:true},
            		data:JSON.stringify({
            			"ttmId":that.data6[that.keepNum].ttmId,
    					"ttmStatus":2,
    					"ttmRefuseReason":that.value
            		})
            	}).then(function(res){
            		var data = res.data;
            		console.log(data)
            		if(data.code == 502){
            			that.$router.push('/')
            		}else if (data.code == 100){
            			that.data6[that.keepNum].ttmStatus = "拒绝"
            		}else if (data.code == 102){
            			alert(data.msg);
            		}
            		
            	})
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
           	change (page) {
           		this.pageNum = page;
           		this.takeSet();
           	},
           	takeSet () {
           		var that = this;
           		this.ajax({
           			method:'post',
           			url:this.apiUrl + '/tTakeMoney/selectTakeMoneyList',
           			data:JSON.stringify({
           				"currentPage":that.pageNum,
    					"pageSize":10
           			})
           		}).then(function(res){
           			that.pages = res.data.pages;
           			that.sumMoney = res.data.sumMoney;
           			var data = res.data.data;
//         			console.log(data)
           			var dataArr = [];
           			for(var i=0;i<data.length;i++){
           				var obj={};
           				obj.nickName = data[i].nickName;
           				obj.code = data[i].code;
           				obj.ttmId = data[i].ttmId;
           				if(data[i].payName == null){
           					data[i].payName = ""
           				}
           				if(data[i].checkName == undefined){
           					data[i].checkName = ""
           				}
           				obj.payName = data[i].payName;
           				obj.checkName = data[i].checkName;
						if(data[i].ttmPayTime == null){
							data[i].ttmPayTime = '';
							obj.ttmPayTime = data[i].ttmPayTime;
						}else{
							
           					obj.ttmPayTime = format(data[i].ttmPayTime);
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
						if(data[i].ttmType == 1){
							data[i].ttmType = '支付宝';
						}else if(data[i].ttmType == 2){
							data[i].ttmType = '银行卡';
						}
						if(data[i].ttmStatus == 0){
							data[i].ttmStatus = '待审核';
						}else if(data[i].ttmStatus == 1){
							data[i].ttmStatus = '通过';
						}else if(data[i].ttmStatus == 2){
							data[i].ttmStatus = '拒绝';
						}else if(data[i].ttmStatus == 3){
							data[i].ttmStatus = '已打款';
						}
           				obj.ttmAddTime = format(data[i].ttmAddTime);
           				obj.ttmCard = data[i].ttmCard;
           				obj.ttmCheckTime = format(data[i].ttmCheckTime);
           				obj.ttmMoney = data[i].ttmMoney;
           				if(data[i].ttmRefuseReason == null){
           					data[i].ttmRefuseReason = '';
           				}
           				obj.ttmRefuseReason = data[i].ttmRefuseReason;
           				obj.ttmStatus = data[i].ttmStatus;
           				obj.ttmType = data[i].ttmType;
           				dataArr.push(obj);
           				that.data6 = dataArr;
           			}
           		})
           },
           	changeVal1 (value) {
           		this.dateVal1 = value;
           	},
           	changeVal2 (value) {
           		this.dateVal2 = value;
           	},
           	handSearch () {
           		var that = this;
           		this.ajax({
           			method:'post',
           			url:this.apiUrl + '/tTakeMoney/selectTakeMoneyList',
           			data:JSON.stringify({
           				"currentPage":that.pageNum,
					    "pageSize":10,
					    "code":that.value3,
					    "nickName":that.value2,
					    "startTime":that.dateVal1,
					    "endTime":that.dateVal2
           			})
           		}).then(function(res){
           			that.pages = res.data.pages;
           			var data = res.data.data;
//         			console.log(data)
           			var dataArr = [];
           			for(var i=0;i<data.length;i++){
           				var obj={};
           				obj.nickName = data[i].nickName;
           				obj.code = data[i].code;
           				obj.ttmId = data[i].ttmId;
           				obj.payName = data[i].payName;
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
						if(data[i].ttmType == 1){
							data[i].ttmType = '支付宝';
						}else if(data[i].ttmType == 2){
							data[i].ttmType = '银行卡';
						}
						if(data[i].ttmStatus == 0){
							data[i].ttmStatus = '待审核';
						}else if(data[i].ttmStatus == 1){
							data[i].ttmStatus = '通过';
						}else if(data[i].ttmStatus == 2){
							data[i].ttmStatus = '拒绝';
						}else if(data[i].ttmStatus == 3){
							data[i].ttmStatus = '已打款';
						}
           				obj.ttmAddTime = format(data[i].ttmAddTime);
           				obj.ttmCard = data[i].ttmCard;
           				obj.ttmCheckTime = format(data[i].ttmCheckTime);
           				obj.ttmMoney = data[i].ttmMoney;
           				obj.ttmPayTime = format(data[i].ttmPayTime);
           				obj.ttmRefuseReason = data[i].ttmRefuseReason;
           				obj.ttmStatus = data[i].ttmStatus;
           				obj.ttmType = data[i].ttmType;
           				dataArr.push(obj);
           				that.data6 = dataArr;
           			}
           		})
           	}
        },
        mounted() {
        	this.takeSet();
        }
    }
</script>

<style scoped>
	.searchHead{
		margin:10px 0;
	}
	.ivu-form-item {
		margin-bottom:0;
	}
	/*.ivu-row{
		display:inline-block;
		width:400px;
	}*/
</style>