<template>
	<div class="addUser">
		<div class="formCon">
			<div class="formHeader">
				<Icon type="person-add" style="margin-right:5px;" size="20"></Icon>添加用户
			</div>
			<Form :model="formItem" :label-width="80">
				<Row style="margin-top:10px;">
					<Col span="6">
				        <FormItem label="用户名">
				            <Input v-model="formItem.input1" placeholder="请输入用户名"></Input>
				        </FormItem>
		       		</Col>
			        <Col span="6">
				        <FormItem label="密码">
				            <Input v-model="formItem.input2" placeholder="请输入密码"></Input>
				        </FormItem>
			        </Col>
		        </Row>
		        <Row>
					<Col span="6">
				        <FormItem label="姓名">
				            <Input v-model="formItem.input3" placeholder="请输入姓名"></Input>
				        </FormItem>
		       		</Col>
			        <Col span="6">
				        <FormItem label="电话">
				            <Input v-model="formItem.input4" placeholder="请输入电话"></Input>
				        </FormItem>
			        </Col>
		        </Row>
		        <Row>
					<Col span="6">
				        <FormItem label="城市id">
				            <Input v-model="formItem.input5" placeholder="请输入城市id"></Input>
				        </FormItem>
		       		</Col>
			        <Col span="6">
				        <FormItem label="组类别">
				            <Input v-model="formItem.input6" placeholder="请输入组类别"></Input>
				        </FormItem>
			        </Col>
		        </Row>
		        <Row>
					<Col span="6">
				        <FormItem label="身份">
				            <Input v-model="formItem.input7" placeholder="请输入身份"></Input>
				        </FormItem>
		       		</Col>
		        </Row>
		   	</Form>
		   	<Row style="text-align: center;">
				<Col span="6">
			        <Upload
			            :before-upload="handleUpload"
			            action="//jsonplaceholder.typicode.com/posts/">
			            <Button type="ghost" icon="ios-cloud-upload-outline">银行卡正面</Button>
			        </Upload>
			        <div v-if="file !== null">待上传文件：{{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button></div>
	       		</Col>
	       		<Col span="6">
			        <Upload
			            :before-upload="handleUpload"
			            action="//jsonplaceholder.typicode.com/posts/">
			            <Button type="ghost" icon="ios-cloud-upload-outline">银行卡反面</Button>
			        </Upload>
			        <div v-if="file !== null">待上传文件：{{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button></div>
	       		</Col>
	        </Row>
		   	<Row style="text-align: center; margin-top:10px;">
				<Col span="6">
			        <Upload
			            :before-upload="handleUpload"
			            action="//jsonplaceholder.typicode.com/posts/">
			            <Button type="ghost" icon="ios-cloud-upload-outline">身份证正面</Button>
			        </Upload>
			        <div v-if="file !== null">待上传文件：{{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button></div>
	       		</Col>
	       		<Col span="6">
			        <Upload
			            :before-upload="handleUpload"
			            action="//jsonplaceholder.typicode.com/posts/">
			            <Button type="ghost" icon="ios-cloud-upload-outline">身份证正面</Button>
			        </Upload>
			        <div v-if="file !== null">待上传文件：{{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button></div>
	       		</Col>
	        </Row>
	        <div class="addBtn">
	        	<Button type="info" @click="addition">添加</Button>
	        </div>
		</div>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    input5: '',
                    input6: '',
                    input7: ''
                },
                file: null,
                loadingStatus: false
            }
        },
        methods:{
        	handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('上传成功')
                }, 1500);
            },
            addition(){
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/back/user/addUser',
            		data:JSON.stringify({
            			"loginName":that.formItem.input1,
					    "pwd":that.formItem.input2,
					    "name":that.formItem.input3,
					    "code":that.formItem.input4,
					    "cityCode":that.formItem.input5,
					    "tradeGroup":that.formItem.input6,
					    "type":that.formItem.input7,
					    "bankImg":"ww",
					    "bankImgO":"WWW",
					    "idcardImg":"ccc",
					    "idcardImgO":"aa"
            		})
            	}).then(function(res){
            		console.log(res);
            	})
            }
        }
    }
</script>
<style scoped>
	.addUser{
		background:#F9FAFC;
	}
	.formHeader{
		border-bottom:1px solid #ccc;
		padding:10px;
		font-weight: 900;
	}
	.formCon{
		border:1px solid #ccc
	}
	.addBtn{
		margin:50px 0 10px 270px;
	}
</style>