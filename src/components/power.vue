<template>
	<div class="powerList">
		<div class="powerHead">
			<Icon type="locked" size="20" style="margin-right:6px;"></Icon>权限设置
		</div>
		<div class="tableHead">用户组id</div>
		<Table border :columns="columns4" :data="data1"></Table>
		<div class="tableSec">角色id</div>
		<Table border :columns="columns2" :data="data2"></Table>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                columns4: [
                    {
                        title: '名称',
                        key: 'tagName'
                    },
                    {
                        title: '是否删除',
                        key: 'tagDesc'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 95,
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
                                            this.setting1(params.index)
                                        }
                                    }
                                }, '设置权限')
                            ]);
                        }
                    }
                ],
                data1: [
                    
                ],
                columns2: [
                    {
                        title: '登录账号',
                        key: 'loginName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 95,
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
                                            this.setting2(params.index)
                                        }
                                    }
                                }, '设置权限')
                            ]);
                        }
                    }
                ],
                data2: [
                    
                ]
            }
        },
        methods: {
        	setting2 (index) {
        		var that = this;//根据角色获取id权限
	    		this.ajax({
	    			method:'post',
	    			url:this.apiUrl + '/role/selectRoleByAdminId',
	    			data:JSON.stringify({
	    				"id":that.data2[index].roleId
	    			})
	    		}).then(function(res){
	    			var data = res.data.data;
	    			var id = data.id;
	    			var roleFunction = data.roleFunction;
	    			localStorage.setItem('token3',id);
	    			localStorage.setItem('token4',roleFunction);
	    		})
        		this.$router.push('/roleId');
	        },
	        setting1 (index) {
        		var that = this;//根据角色获取id权限
	    		this.ajax({
	    			method:'post',
	    			url:this.apiUrl + '/role/selectRoleByAdminId',
	    			data:JSON.stringify({
	    				"id":that.data2[index].roleId
	    			})
	    		}).then(function(res){
	    			var data = res.data.data;
	    			var groupId = data.groupId;
	    			var roleFunction = data.roleFunction;
	    			localStorage.setItem('token1',groupId);
	    			localStorage.setItem('token2',roleFunction);
	    		})
        		this.$router.push('/powerSet');
        	}
        },
        mounted(){
        	var that = this;
        	this.ajax({
        		method:'post',
        		url:this.apiUrl + '/role/selectGroupAndAdmin',
        	}).then(function(res){
        		var data = res.data.data;
        		for(var i=0;i<data.length;i++){
        			var obj = {};
					obj.tagName = data[i].tagName;
					obj.tagDesc = data[i].tagDesc;
					obj.tagId = data[i].tagId;
					that.data1.push(obj);
        		}
        		for(var i=0;i<data.length;i++){
        			var dataChildren = data[i].listAdmin;
        			for(var j=0;j<dataChildren.length;j++){
        				var objChild = {};
        				objChild.loginName = dataChildren[j].loginName;
        				objChild.roleId = dataChildren[j].roleId;
        				that.data2.push(objChild);
        			}
        			
        			
        		}
        	})
        }
    }
</script>

<style scoped>
	.powerHead{
		border:1px solid #ccc;
		padding:10px;
	}
	.tableHead{
		margin-top:10px;
		padding:10px;
		border:1px solid #ccc;
	}
	.tableSec{
		margin-top:10px;
		padding:10px;
		border:1px solid #ccc;
	}
</style>