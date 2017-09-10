<template>
	<div class="addUser">
		<div class="formCon">
			<div class="formHeader">
				<Icon type="person-add" style="margin-right:5px;" size="20"></Icon>添加代理
			</div>
		</div>
		<Form :model="formItem" :label-width="80">
			<Row style="margin-top:10px;">
				<Col span="6">
			        <FormItem label="登录账号">
			            <Input v-model="formItem.input1" placeholder="请输入账号"></Input>
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
			        <FormItem label="手机号">
			            <Input v-model="formItem.input4" placeholder="请输入手机号"></Input>
			        </FormItem>
		        </Col>
	        </Row>
	        <Row>
				<Col span="6">
			        <FormItem label="城市code">
			            <Input v-model="formItem.input5" placeholder="请输入城市code"></Input>
			        </FormItem>
	       		</Col>
		        <Col span="6">
			        <FormItem label="通讯地址">
			            <Input v-model="formItem.input6" placeholder="请输入通讯地址"></Input>
			        </FormItem>
		        </Col>
	        </Row>
	   	</Form>
	   	<Row style="text-align: center;">
			<Col span="8">
			<div class="am-form-group am-form-file" id="editOneDiv" style="display: inline-block;width: 150px;margin-top:10px;">
				
				<Button type="ghost" class="upload">
			        <i class="am-icon-cloud-upload"></i>银行卡正面</Button><input id="editOne" type="file">
			</div>
			</Col>
			<Col span="8">
			<div class="am-form-group am-form-file" id="editTwoDiv" style="display: inline-block;width: 150px;margin-top:10px;">
				<Button type="ghost" class="upload">
				    <i class="am-icon-cloud-upload"></i>银行卡反面</Button><input id="editTwo" type="file">
			</div>
			</Col>
			<Col span="8">
			<div class="am-form-group am-form-file" id="editThreeDiv" style="display: inline-block;width: 150px;margin-top:10px;">
				<Button type="ghost" class="upload">
			        <i class="am-icon-cloud-upload"></i>身份证正面</Button><input id="editThree" type="file">
			</div>
			</Col>
		</Row>
		<Row style="text-align: center;">
			<Col span="8">
			<div class="am-form-group am-form-file" id="editFourDiv" style="display: inline-block;width: 150px;margin-top:10px;">
				<Button type="ghost" class="upload">
			        <i class="am-icon-cloud-upload"></i>身份证反面</Button><input id="editFour" type="file">
			</div>
			</Col>
			<Col span="8">
			<div class="am-form-group am-form-file" id="editFiveDiv" style="display: inline-block;width: 150px;margin-top:10px;">
				<Button type="ghost">
			        <i class="am-icon-cloud-upload"></i>协议照片</Button><input id="editFive" type="file">
			</div>
			</Col>
		</Row>
        <div class="addBtn">
        	<Button type="info" @click="addition">添加</Button>
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
                    input6: ''
               },
            }
        },
        mounted:function(){
        	var sourceLink = '';
			/*获取七牛上传tocken方法* 在该ajax回调方法中,调用上传控件初始化方法*/
			setTimeout(()=>{
				getTokenMessage()
			},1000)
			function getTokenMessage() {
			    $.ajax({
			        url:window.apiUrl + '/other/upToken',
			        type: 'POST',
			        data: {},
			        cache: false,
			        contentType: false,    //不可缺
			        processData: false,    //不可缺
			        dataType: 'json',
			        success: function (data) {
			            var obj = data;
			            /*初始化方法, param1:请求tocken|param2上传控件ID*/
			           	uploaderReady(obj.uptoken, 'editOne');
			           	uploaderReady(obj.uptoken, 'editTwo');
			          	uploaderReady(obj.uptoken, 'editThree');
			           	uploaderReady(obj.uptoken, 'editFour');
			            uploaderReady(obj.uptoken, 'editFive');
			
			        }
			    });
			}
			
			/*上传图片*/
			function uploaderReady(token, divId) {
			    //console.log(token, divId)
			    var uploader = Qiniu.uploader({
			        runtimes: 'html5,flash,html4',
			        browse_button: divId,//上传按钮的ID
			        container: divId+'Div',//上传按钮的上级元素ID
			        drop_element: 'btn-uploader',
			        max_file_size: '100mb',//最大文件限制
			        dragdrop: false,
			        chunk_size: '4mb',//分块大小
			        //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
			        uptoken: token,
			        // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
			        // save_key: true,
			        // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
			       domain: 'http://osytqedas.bkt.clouddn.com/',
			        multi_selection: false,//是否允许同时选择多文件
			        //文件类型过滤，这里限制为图片类型
			        filters: {
			            mime_types: [
			                {title: "Image files", extensions: "jpg,jpeg,gif,png"}
			            ]
			        },
			        auto_start: true,
			        unique_names: true,
			        init: {
			            'FilesAdded': function (up, files) {
			                //do something
			            },
			            'BeforeUpload': function (up, file) {
			                //do something
			            },
			            'UploadProgress': function (up, file) {
			                //可以在这里控制上传进度的显示
			                //可参考七牛的例子
			            },
			            'UploadComplete': function () {
			                //do something
			            },
			            'FileUploaded': function (up, file, info) {
			                //每个文件上传成功后,处理相关的事情
			                //console.log(up)
			                var domain = up.getOption('domain');
			                var res = eval('(' + info + ')');
			                sourceLink = domain + res.key; //**获取上传文件的链接地址**
//			                  console.log(sourceLink);
			                  sessionStorage.setItem('imgLink',sourceLink)
			
			                $('#'+divId +'Img').attr('src', sourceLink);
			
			            },
			            'Error': function (up, err, errTip) {
			                //alert(errTip);
			            },
			            'Key': function (up, file) {
			                //当save_key和unique_names设为false时，该方法将被调用
			                return "";
			            }
			        }
			    });
			    uploader.start();
			}
    	},
        methods:{
        	addition(){
        		var imgLink = sessionStorage.getItem('imgLink');
        		console.log(imgLink)
            	window.that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/back/user/addUser',
            		data:JSON.stringify({
            			"loginName":that.formItem.input1,
					    "pwd":that.formItem.input2,
					    "name":that.formItem.input3,
					    "code":that.formItem.input4,
					    "cityCode":that.formItem.input5,
					    "address":that.formItem.input6,
					    "contractImg":imgLink,
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
	.ivu-col-span-8{
		height:40px;
	}
</style>