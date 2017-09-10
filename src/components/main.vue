<template>
	<div id="mainContent">
		<div class="mainHeader">
			<h1>this is logo</h1>
			<div class="navCon">
				<div class="userinfo">
                  	<Dropdown placement="bottom-end">
                        <span class="head-img">
                            你好！   {{curUserName}}
                            <img src="../assets/user.jpg">
                        </span>
                        <Dropdown-menu slot="list">
                            <Dropdown-item @click.native="modifyPassWord()">修改密码</Dropdown-item>
                            <Dropdown-item  @click.native="logout()" divided>退出</Dropdown-item>
                        </Dropdown-menu>
                	</Dropdown>
                </div>
			</div>
		</div>
		<div class="mainLeft" :class="{'layout-hide-text': spanLeft < 4}">
			<Row type="flex">
		        <i-col :span="spanLeft" class="layout-menu-left">
		            <Menu :mode="modeType" :active-name="this.$route.path" :open-names="openNames" @on-select="menuSelect" width="auto"  theme="dark" accordion>
		            	<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
			                <Submenu :name="item.name" v-if="!item.leaf">
			                    <template slot="title">
	                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
	                                <span class="layout-text" >{{item.name}}</span>
	                            </template>
	                            <template v-for="(child,childIndex) in item.children">
	                                <Menu-item :name="child.path">{{child.name}}</Menu-item>
	                            </template>
			                </Submenu>
			                <template  v-if="item.leaf&&item.children.length>0">
	                            <Menu-item :name="item.children[0].path">
	                                 <Icon :type="item.iconCls"></Icon>
	                                <span class="layout-text" >{{item.children[0].name}}</span>
	                            </Menu-item>
	                        </template>
		                </template>
		            </Menu>
		        </i-col>
		        <i-col :span="spanRight" class="layout-menu-right">
		        	<div class="content-header">
						<Breadcrumb>
							<Tooltip content="首页">
						        <BreadcrumbItem href="/function">
						        	<Icon type="ios-home-outline" style="margin-right:5px;"></Icon>Home
						        </BreadcrumbItem>
					       </Tooltip>
					       <Tooltip :content="$route.name">
						        <BreadcrumbItem>
						        	{{$route.name}}
						        </BreadcrumbItem>
					       </Tooltip>
					   </Breadcrumb>
					</div>
	                <div class="layout-content">
	                    <div class="layout-content-main">
	                        <router-view></router-view>
	                     </div>
	                </div>
	            </i-col>
		  </Row>
		  <Modal v-model="modal1" title="修改密码" @on-ok="comfirmModifyPS"  @on-cancel="cancel" >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Form-item label="原密码" prop="oldPassword">
                    <Input v-model="formValidate.oldPassword" placeholder="请输入原始密码"></Input>
                </Form-item>
                <Form-item label="新密码" prop="newPassword">
                    <Input v-model="formValidate.newPassword" placeholder="请输入新密码"></Input>
                </Form-item>
                 <Form-item label="确认新密码" prop="resetPassword">
                    <Input v-model="formValidate.resetPassword" placeholder="请再次输入新密码"></Input>
                </Form-item>
            </Form>
        </Modal>
		</div>
	</div>
</template>

<script>
	export default {
        data () {
            return {
            	spanLeft: 4,
                spanRight: 20,
               	openNames: [this.$route.matched[0].name],
                curUserName : sessionStorage.getItem('user')?sessionStorage.getItem('user').replace(/\"/g, ""):"",
                modeType: "vertical",
                modal1: false,
                formValidate: {
                    oldPassword: '',
                    newPassword: '',
                    resetPassword:''
                },
                ruleValidate: {
                    oldPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    resetPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 4 ? 14 : 24;
            }
        },
        methods:{
        	logout(){
        		var that = this;
        		this.ajax({
        			method:'post',
        			url:this.apiUrl + '/back/admin/exit',
        		}).then(function(res){
        			if(res.data.code == 100){
        				that.$router.push('/');
        			}
        		})
        	},
        	modifyPassWord() {
                this.modal1 = true;
            },
            comfirmModifyPS() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.modal1 = false;
                        var username = localStorage.getItem("token1");
		                var that = this;
		                that.formValidate.oldPassword = localStorage.getItem("token2");
		                this.ajax({
		                	method:"post",
		                	url:this.apiUrl + "/back/admin/resetAdPwd",
		                	data:JSON.stringify({
		                		"loginName":username,
							    "pwd":that.formValidate.oldPassword,
							    "pwd1":that.formValidate.newPassword,
							    "pwd2":that.formValidate.resetPassword
		                	})
		                }).then(function(res){
		            		console.log(res);
		            	})
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            cancel(){
                this.modal1 = false;
                this.$Message.info('点击了取消');
            },
            menuSelect(name) {
                 this.$router.push({ path: name });
            }
        },
        mounted(){
        	var username = localStorage.getItem('token1');
        	var password = localStorage.getItem('token2')
        	this.ajax({
				method:'post',
				url:this.apiUrl + '/back/admin/login',
				xhrFields:{withCredentials:true},
				data: JSON.stringify({
					"loginName": username,
					"pwd": password
				}),
			}).then(function(res){
				
			})
        }
    }
</script>

<style scoped>
	#mainContent{
		width:100%;
		height:100%;
	}
	.mainHeader{
		height:70px;
		color:#fff;
	}
	.mainHeader>h1{
		width:240px;
		height:100%;
		float:left;
	}
	.mainHeader>.navCon{
		margin-left:240px;
		height:100%;
		width:auto;
	}
	.userinfo{
		float:right;
	    margin-right:30px;
	}
	.userinfo .ivu-dropdown{
	    margin-top: 50px;
	}
	.content-header{
		background:#fff;
		height:39px;
		line-height: 39px;
		padding-left:10px;
	}
	.ivu-tooltip-popper{
		top:80px !important;
	}
	.mainLeft .ivu-menu-submenu{
		background:#2e363f;
		border:1px solid #1f262d;
		color:#939da8;
	}
	.mainLeft .ivu-menu-item{
		background:#2e363f;
		border:1px solid #1f262d;
		color:#939da8;
	}
	.mainLeft .ivu-menu-item:hover{
		background:#2e363f;
	}
	.mainLeft .ivu-menu-submenu .ivu-menu-item{
		background:#2e363f;
	}
	.mainLeft .ivu-menu-submenu .ivu-menu-item:hover{
		background:#2d8cf0;
		color:#fff;
	}
	.demo-breadcrumb-separator{
        color: #ff5500;
        padding: 0 5px;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
	    background: #2d8cf0;
	    color:#fff;
    }
    .head-img {
	    width: 100%;
	    height: 54px;
	    line-height: 54px;
	    float: right;
	    margin-top: -50px;
	}
	.head-img img{
	    border-radius: 20px;
	    margin: 10px 0px 10px 10px;
	    width: 40px;
	    height: 40px;
	    float: right;
	}
	.layout-menu-right{
		height:827px;
		background:#eee;
	}
	.layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .layout-content{
    	padding:15px;
    }
    .layout-content-main{
    	height:763px;
    	overflow:auto;
    }
  
</style>