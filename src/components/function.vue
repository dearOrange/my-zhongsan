<template>
	<div id="funcTable">
		<div class="funcTab">
			<Table class="tableCon" border :columns="columns7" :data="data6"></Table>
		</div>
		<Modal
	        v-model="modal1"
	        title="修改功能"
	        @on-ok="ok1"
	        @on-cancel="cancel">
	        <Form :model="formRight" label-position="right" :label-width="100">
		        <FormItem label="名称">
		            <Input id="funcName" v-model="formRight.input1"></Input>
		        </FormItem>
		        <FormItem label="id">
		            <Input id="funcId" v-model="formRight.input3"></Input>
		        </FormItem>
			</Form>
	    </Modal>
	    <Modal
	        v-model="modal2"
	        title="新增功能"
	        @on-ok="ok2"
	        @on-cancel="cancel">
	        <Form :model="formRight" label-position="right" :label-width="100">
		        <FormItem label="名称">
		            <Input id="funcName" v-model="formRight.input4"></Input>
		        </FormItem>
		        <FormItem label="url">
		            <Input id="funcUrl" v-model="formRight.input5"></Input>
		        </FormItem>
		        <FormItem label="id">
		            <Input id="funcId" v-model="formRight.input6"></Input>
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
            	modal2: false,
                formRight: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    input5: '',
                    input6: ''
                },
                columns7: [
                    {
                        title: '名称',
                        key: 'tfDesc',
                        align:'center'
                    },
                    {
                        title: '地址',
                        key: 'url',
                        align:'center'
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
                                }, '修改'),
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
                                            this.add(params.index)
                                        }
                                    }
                                }, '新增'),
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
                    
                ]
            }
        },
        methods: {
            add (index) {
                this.modal2 = true;
            },
            remove (index) {
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/function/delFunction',
            		data:JSON.stringify({
            			"id":this.data6[index].id
            		})
            	}).then(function(res){
            		
            	})
                this.data6.splice(index, 1);
            },
            change (index) {
            	this.modal1 = true;
            	this.formRight.input1 = this.data6[index].tfDesc;
            	this.formRight.input3 = this.data6[index].id;
            },
            ok1 () {
            	var that = this;
                this.ajax({
            		method:'post',
            		url:this.apiUrl + '/function/editFunction',
            		data:JSON.stringify({
            			"id":that.formRight.input3,
            			"tfDesc":that.formRight.input1
            		})
            	}).then(function(res){
            		var data = res.data;
            		if(data.code == 107){
            			alert(data.msg);
            		}else if(data.code == 101){
            			alert(data.msg);
            		}else if(data.code == 108){
            			alert(data.msg);
            		}else if(data.code == 101){
            			window.location.reload();
            		}
            	})
            },
            ok2 () {
            	var that = this;
            	console.log(that.formRight.input4);
                this.ajax({
            		method:'post',
            		url:this.apiUrl + '/function/addFunction',
            		data:JSON.stringify({
            			"tfDesc":that.formRight.input4,
            			"uri":that.formRight.input5
            		})
            	}).then(function(res){
            		var data = res.data;
            		if(data.code == 107){
            			alert(data.msg);
            		}else if(data.code == 101){
            			alert(data.msg);
            		}else if(data.code == 100){
            			window.location.reload();
            		}
            	})
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        },
		mounted(){
			let that = this;
			var tableArr = [];
			this.ajax({
				method:'post',
				url:this.apiUrl + '/function/getAllFunctionList',
			}).then(function(res){
				var data = res.data.data;
				for(let i=0;i<data.length;i++){
					var obj = {};
					obj.tfDesc = data[i].tfDesc;
					obj.url = data[i].uri;
					obj.id = data[i].id;
					that.data6.push(obj);
					var dataChild = data[i].children;
					if(dataChild.length){
						for(var j=0;j<dataChild.length;j++){
							var objChild = {};
							objChild.tfDesc = dataChild[j].tfDesc;
							objChild.url = dataChild[j].uri;
							objChild.id = dataChild[j].id;
							that.data6.push(objChild);
						}
					}
					
					
				}
			})
		}
		
	}
</script>

<style scoped>
	
</style>
	
