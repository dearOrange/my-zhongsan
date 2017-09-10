<template>
	<div class="setCon">
		<div class="setHead"><Icon type="settings" size="20" style="padding:8px;border-right:1px solid #ccc;"></Icon><span>设置</span></div>
		<Table stripe :columns="columns1" :data="data1"></Table>
		<Page :total="pages" :current="pageNum" @on-change="change"></Page>
		<Modal
	        v-model="modal1"
	        title="普通的Modal对话框标题"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <Form :model="formLeft" label-position="left" :label-width="100">
		        <FormItem label="值">
		            <Input v-model="formLeft.input1"></Input>
		        </FormItem>
		    </Form>
	    </Modal>
	</div>
</template>
<script>
    export default {
        data () {
            return {
            	modal1:false,
            	formLeft:{
            		input1:''
            	},
            	pageNum:1,
                pages:10,
                columns1: [
                    {
                        title: '键',
                        key: 'cKey'
                    },
                    {
                        title: '值',
                        key: 'cValue'
                    },
                    {
                        title: '描述',
                        key: 'content'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 80,
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
                                            this.change(params.index)
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                data1: [
                    
                ],
                setNum: 0
            }
        },
        methods : {
        	change (index) {
        		this.modal1 = true;
        		this.formLeft.input1 = this.data1[index].cValue;
        		this.setNum = index;
        	},
        	ok () {
        		var that = this;
                this.ajax({
        			method:'post',
        			url:this.apiUrl + '/back/config/updateConfig',
        			data:JSON.stringify({
        				"cKey":that.data1[that.setNum].cKey,
    					"cValue":that.formLeft.input1
        			})
        		}).then(function(res){
        			if(res.data.code == 100){
        				window.location.reload();
        			}
        		})
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            change (page) {
            	this.pageNum = page;
            	this.noticeStr();
            },
            noticeStr () {
            	var that = this;
	        	this.ajax({
	        		method:'post',
	        		url:this.apiUrl + '/back/config/selectConfigList',
	        		data:JSON.stringify({
	        			"currentPage":that.pageNum,
	    				"pageSize":20
	        		})
	        	}).then(function(res){
	        		that.pages = res.data.pages*10;
	        		var data = res.data.resultList;
	        		var dataPush = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.cKey = data[i].cKey;
	        			obj.cValue = data[i].cValue;
	        			obj.content = data[i].content;
	        			dataPush.push(obj)
	        			that.data1 = dataPush;
	        		}
	        	})
            }
        },
        mounted () {
        	this.noticeStr();
        }
    }
</script>
<style scoped>
	.setHead{
		border:1px solid #ccc;
		border-bottom:0;
		font-size:16px;
	}
	.setHead>span{
		padding:10px;
	}
</style>