<template>
	<div class="userList">
		<Select v-model="model1" style="width:200px" clearable @on-change="changeVal">
	        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select>
	    <Button type="info" icon="ios-search" @click="handSearch">搜索</Button>
	    <Button type="success" icon="android-add" @click="addAdmin">添加</Button>
	    <div class="userTab">
	    	<Table border :columns="columns7" :data="data6"></Table>
	    	<Page :total="pages" :current="pageNum" @on-change="change"></Page>
	    </div>
	    <Modal
	        v-model="modal2"
	        title="修改密码"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <Form :model="formRight" label-position="right" :label-width="100">
		        <FormItem label="新密码">
		            <Input id="oldPwd" v-model="formRight.input1"></Input>
		        </FormItem>
		        <FormItem label="确认密码">
		            <Input id="newPwd" v-model="formRight.input2"></Input>
		        </FormItem>
			</Form>
	    </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            	modal2:false,
            	formRight: {
                    input1: '',
                    input2: ''
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
                        title: '姓名',
                        key: 'loginName',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.loginName)
                            ]);
                        }
                    },
                    {
                        title: '类型',
                        key: 'tagName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
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
                                            this.noShow(params.index)
                                        }
                                    }
                                }, '禁用'),
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
                                }, '启用'),
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
                                            this.changePwd(params.index)
                                        }
                                    }
                                }, '修改密码'),
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
                cityList: [
                    
                ],
                model1: '',
                keepNum:0,
                groupNum:''
            }
        },
        methods: {
            noShow (index) {
                var that = this;
                var preBtn = $('button>span');
            		console.log(preBtn)
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + "/back/admin/updateAdmin",
            		data:JSON.stringify({
            			"id":this.data6[index].id,
    					"state":1
            		})
            	}).then(function(res){
            		
            	})
            },
            show (index) {
                var that = this;
                var preBtn = $('button>span');
            		console.log(preBtn)
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + "/back/admin/updateAdmin",
            		data:JSON.stringify({
            			"id":this.data6[index].id,
    					"state":0
            		})
            	}).then(function(res){
            		
            	})
            },
            changePwd (index) {
            	this.modal2 = true;
            	this.keepNum = index;
            },
            ok () {
                var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + "/back/admin/updateAdmin",
            		data:JSON.stringify({
            			"id":that.data6[that.keepNum].id,
					    "pwd1":that.formRight.input1,
					    "pwd2":that.formRight.input2
            		})
            	}).then(function(res){
            		
            	})
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            remove (index) {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + "/back/admin/updateAdmin",
            		data:JSON.stringify({
            			"id":this.data6[index].id,
    					"state":2
            		})
            	}).then(function(res){
            		
            	})
                this.data6.splice(index, 1);
            },
            change (page) {
            	this.pageNum = page;
            	this.adminSet();
            },
            adminSet () {
            	var that = this;
	        	this.ajax({
	        		method:'post',
	        		url:this.apiUrl + '/back/admin/getAdminList',
	        		data:JSON.stringify({
	                    "currentPage":that.pageNum,
	                    "pageSize":10 
	        		})
	        	}).then(function(res){
	        		that.pages = res.data.pages*10;
	        		var data = res.data.resultList;
	        		var adminStr = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
						obj.tagName = data[i].tagName;
						obj.loginName = data[i].loginName;
						obj.id = data[i].id;
						adminStr.push(obj)
						that.data6 = adminStr;
	        		}
	        	})
           },
           changeVal (value) {
           		this.groupNum = value;
           },
           handSearch () {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/back/admin/getAdminList',
            		data:JSON.stringify({
	                    "currentPage":that.pageNum,
	                    "pageSize":10,
	                    "groupId":that.groupNum
	        		})
            	}).then(function(res){
            		var data = res.data.resultList;
	        		var adminStr = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
						obj.tagName = data[i].tagName;
						obj.loginName = data[i].loginName;
						obj.id = data[i].id;
						adminStr.push(obj)
						that.data6 = adminStr;
	        		}
            	})
            },
            addAdmin () {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/back/admin/addAdmin'
            	}).then(function(res){
            		
            	})
            }
        },
        mounted(){
        	this.adminSet();
        	var that = this;
        	this.ajax({
        		method:'post',
        		url:this.apiUrl + '/back/admin/selectAdminGroup',
        	}).then(function(res){
        		var data = res.data.resultList;
        		
        		for(var i=0;i<data.length;i++){
        			var objs = {};
					objs.label = data[i].tagName;
					objs.value = data[i].tagId;
					that.cityList.push(objs);
        		}
        	});
        	
        }
    }
</script>
<style scoped>
	.userTab{
		margin-top:10px;
	}
</style>