<template>
	<div class="noticeCon">
		<div class="noticeHead">
			<Button type="primary" @click="modal1 = true">新增</Button>
		</div>
		<Table border :columns="columns7" :data="data6"></Table>
		<Page :total="pages" :current="pageNum" @on-change="change"></Page>
		<Modal
	        v-model="modal1"
	        title="新增公告"
	        @on-ok="ok1"
	        @on-cancel="cancel">
	        <Form :model="formRight" label-position="right" :label-width="100">
		        <FormItem label="公告标题">
		            <Input v-model="formRight.input1"></Input>
		        </FormItem>
		        <FormItem label="html代码">
		            <Input v-model="formRight.input2"></Input>
		        </FormItem>
		    </Form>
	    </Modal>
	    <Modal
	        v-model="modal2"
	        title="编辑公告"
	        @on-ok="ok2"
	        @on-cancel="cancel">
	        <Form :model="formRight" label-position="right" :label-width="100">
		        <FormItem label="公告标题">
		            <Input v-model="formRight.input3"></Input>
		        </FormItem>
		        <FormItem label="填写内容">
		            <Input v-model="formRight.input4"></Input>
		        </FormItem>
		    </Form>
	    </Modal>
	</div>
    
</template>
<script>
    export default {
        data () {
            return {
            	modal1: false,
            	modal2:false,
            	formRight: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: ''
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
                        title: '公告标题',
                        key: 'title'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
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
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                data6: [
                    
                ],
                editNum:0
            }
        },
        methods: {
        	show (index) {
        		var that = this;
        		that.formRight.input4 = that.data6[index].url;
        		this.ajax({
        			method:'post',
        			url:this.apiUrl + '/back/news/getNewsOne',
        			data:JSON.stringify({
        				"id":that.data6[index].id
        			})
        		}).then(function(res){
        			if(res.data.code == 100){
        				that.$Modal.info({
		                    title: '公告信息',
		                    content: `${res.data.html}`
		                })
        			}else if(res.data.code == 101){
        				alert(res.data.msg);
        			}
        		})
        	},
            edit (index) {
                this.modal2 = true;
                this.formRight.input3 = this.data6[index].title;
                this.formRight.input4 = this.data6[index].url;
                this.editNum = index;
            },
            ok2 () {//编辑
            	var that = this;
            	console.log(that.formRight.input3)
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/back/news/editNews',
            		data:JSON.stringify({
            			"id":that.data6[that.editNum].id,
            			"title":that.formRight.input3,
    					"url":that.formRight.input4
            		})
            	}).then(function(res){
            		window.location.reload();
            	})
                
            },
            ok1 () {//新增
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/back/news/editNews',
            		data:JSON.stringify({
            			"title":that.formRight.input1,
    					"url":that.formRight.input2
            		})
            	}).then(function(res){
            		window.location.reload();
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
					url:this.apiUrl + '/back/news/getNewsList',
					data:JSON.stringify({
						"page":that.pageNum,
						"size":10
					})
				}).then(function(res){
					that.pages = res.data.pages*10;
					var data = res.data.resultList;
					var dataPush = [];
					for(var i=0;i<data.length;i++){
						var obj = {};
						obj.index = i+1;
						obj.title = data[i].title;
						obj.id = data[i].id;
						obj.url = data[i].url;
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
						if(data[i].type == 1){
							data[i].type = '公告';
						}else if(data[i].type == 2){
							data[i].type = '新闻';
						}else if(data[i].type == 3){
							data[i].type = '头条';
						}
						obj.type = data[i].type;
						dataPush.push(obj)
						that.data6 = dataPush;
					}
				})
            }
        },
        mounted (){
			this.noticeStr();
		}
    }
</script>

<style scoped>
	.noticeHead{
		margin:10px 40px;
	}
</style>