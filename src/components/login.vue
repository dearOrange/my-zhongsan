<template>
		<i-form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
		    <Form-item class="formLogin-title">
		        <h3>系统登录</h3>
		    </Form-item>
	        <Form-item prop="username">
	            <i-input size="large" type="text" id="userId" v-model="formLogin.username" placeholder="用户名">
	                <Icon type="ios-person-outline" slot="prepend"></Icon>
	            </i-input>
	        </Form-item>
	        <Form-item prop="password">
	            <i-input size="large"  type="password" placeholder="密码" id="passWord" v-model="formLogin.password">
	                <Icon type="ios-locked-outline" slot="prepend"></Icon>
	            </i-input>
	        </Form-item>
	          <Form-item class="login-no-bottom">
	            <Checkbox-group v-model="formLogin.remember">
	                <Checkbox label="记住密码" name="remember"></Checkbox>
	            </Checkbox-group>
	        </Form-item>
	        <Form-item class="login-no-bottom">
	            <Row >
	                <i-col :xs="{ span: 4, offset: 6 }" >
	                    <i-button type="primary" id="login" @click="handleSubmit('formLogin')">登录</i-button>
	                </i-col>
	                <i-col :xs="{ span: 4, offset: 6 }">
	                    <i-button  type="primary" id="resert" @click="formLoginReset('formLogin')">重置</i-button>
	                </i-col>
	            </Row>
	        </Form-item>
	   </i-form>
</template>
<script>
    export default {
        data() {
        	return {
        		formLogin: {
                    username: '',
                    password: '',
                    remember: []
               },
               formLoginRules: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
        	}
        },
        methods: {
        	handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                	sessionStorage.setItem('user', JSON.stringify(this.formLogin.username));
                    if (valid) {
                        var that = this;
                        localStorage.setItem("token1",that.formLogin.username);
                        localStorage.setItem("token2",that.formLogin.password);
		        		this.ajax({
		        			method:'post',
		        			url:this.apiUrl + '/back/admin/login',
		        			xhrFields:{withCredentials:true},
		        			data: JSON.stringify({
								"loginName": that.formLogin.username,
								"pwd": that.formLogin.password
							}),
		        		}).then(function(res){
		        			var data=res.data;
		        			if(data.code == 100){
		        				that.$router.push('/function');
		        			}else if(data.code == 102){
		        				alert(data.msg);
		        			}else if(data.code == 103){
		        				alert(data.msg);
		        			}else if(data.code == 104){
		        				alert(data.msg);
		        			}else{
		        				alert(data.msg);
		        			}
		        		})
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                     if(this.formLogin.remember[0] == "记住密码"){
                        localStorage.setItem('username', JSON.stringify(this.formLogin.username));
                        localStorage.setItem('password', JSON.stringify(this.formLogin.password));
                    }else{
                        localStorage.removeItem('username');
                        localStorage.removeItem('password');
                    }
                })
            },
        	formLoginReset(name){
                this.$refs[name].resetFields();
            }
        },
        mounted() {
            if(localStorage.getItem('username')){
                this.formLogin.userId = JSON.parse(localStorage.getItem('username'));
            }
            if(localStorage.getItem('password')){
                this.formLogin.passWord = JSON.parse(localStorage.getItem('password'));
            }
        }
    }
</script>


<style scoped>
  .card-box {
    padding: 20px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    width: 400px;
  }
  
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .formLogin-title {
      text-align: center;
      font-seze: 28px;
  }
  .formLogin-title h3{
      font-size: 18px;
  }
  .login-no-bottom {
      	margin-bottom: 10px;
  }
 
</style>