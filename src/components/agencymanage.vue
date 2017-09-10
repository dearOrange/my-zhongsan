<template>
	<div class="agencyList">
		<Input v-model="value2" placeholder="登录账号" style='width:200px'></Input>
		<Input v-model="value3" placeholder="手机号" style='width:200px'></Input>
		<Input v-model="value4" placeholder="姓名" style='width:200px'></Input>
	    <Button type="ghost" icon="ios-search" @click="handSearch">搜索</Button>
	    <Button type="success" icon="android-add" @click="modal1 = true">添加</Button>
	    <div class="agencyTab">
	    	<Table border :columns="columns7" :data="data6"></Table>
	    	<Page :total="pages" :current="pageNum" @on-change="change"></Page>
	    </div>
	    <Modal
	        v-model="modal1"
	        title="添加代理"
	        @on-ok="ok1"
	        @on-cancel="cancel">
	        <Form :model="formRight" label-position="right" :label-width="100">
	        	<FormItem label="登录账号">
		            <Input v-model="formRight.value1"></Input>
		        </FormItem>
		        <FormItem label="密码">
		            <Input v-model="formRight.value2"></Input>
		        </FormItem>
		        <FormItem label="姓名">
		            <Input v-model="formRight.value3"></Input>
		        </FormItem>
		        <FormItem label="区县code">
		            <Input v-model="formRight.value4"></Input>
		        </FormItem>
		        <FormItem label="手机号">
		            <Input v-model="formRight.value5"></Input>
		        </FormItem>
		        <FormItem label="通讯地址">
		            <Input v-model="formRight.value6"></Input>
		        </FormItem>
		        <Row style="text-align: center;">
					<Col span="8">
					<div class="am-form-group am-form-file" id="addOneDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img src="" id="addOneImg"/>
						<Button type="ghost" class="upload">
					        <i class="am-icon-cloud-upload"></i>银行卡正面</Button><input id="addOne" type="file" multiple="">
					</div>
					</Col>
					<Col span="8">
					<div class="am-form-group am-form-file" id="addTwoDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="src[1]" id="addTwoImg"/>
						<Button type="ghost" class="upload">
						    <i class="am-icon-cloud-upload"></i>银行卡反面</Button><input id="addTwo" type="file" multiple="">
					</div>
					</Col>
					<Col span="8">
					<div class="am-form-group am-form-file" id="addThreeDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="src[2]" id="addThreeImg"/>
						<Button type="ghost" class="upload">
					        <i class="am-icon-cloud-upload"></i>协议照片</Button><input id="addThree" type="file" multiple="">
					</div>
					</Col>
				</Row>
				<Row style="text-align: center;">
					<Col span="8">
					<div class="am-form-group am-form-file" id="addFourDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="src[3]" id="addFourImg"/>
						<Button type="ghost" class="upload">
					        <i class="am-icon-cloud-upload"></i>身份证正面</Button><input id="addFour" type="file" multiple="">
					</div>
					</Col>
					<Col span="8">
					<div class="am-form-group am-form-file" id="addFiveDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="src[4]" id="addFiveImg"/>
						<Button type="ghost">
					        <i class="am-icon-cloud-upload"></i>身份证反面</Button><input id="addFive" type="file" multiple="">
					</div>
					</Col>
				</Row>
			</Form>
	    </Modal>
	    <Modal
	        v-model="modal2"
	        title="修改代理"
	        @on-ok="ok2"
	        @on-cancel="cancel">
	        <Form :model="formRight" label-position="right" :label-width="100">
		        <FormItem label="代理姓名">
		            <Input v-model="formRight.input1"></Input>
		        </FormItem>
		        <FormItem label="区县code">
		            <Input v-model="formRight.input2"></Input>
		        </FormItem>
		        <FormItem label="手机号">
		            <Input v-model="formRight.input3"></Input>
		        </FormItem>
		        <FormItem label="通讯地址">
		            <Input v-model="formRight.input4"></Input>
		        </FormItem>
		        <Row style="text-align: center;">
					<Col span="8">
					<div class="am-form-group am-form-file" id="editOneDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="srcs[0]" id="editOneImg"/>
						<Button type="ghost" class="upload">
					        <i class="am-icon-cloud-upload"></i>银行卡正面</Button><input id="editOne" type="file" multiple="">
					</div>
					</Col>
					<Col span="8">
					<div class="am-form-group am-form-file" id="editTwoDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="srcs[1]" id="editTwoImg"/>
						<Button type="ghost" class="upload">
						    <i class="am-icon-cloud-upload"></i>银行卡反面</Button><input id="editTwo" type="file" multiple="">
					</div>
					</Col>
					<Col span="8">
					<div class="am-form-group am-form-file" id="editThreeDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="srcs[2]" id="editThreeImg"/>
						<Button type="ghost" class="upload">
					        <i class="am-icon-cloud-upload"></i>协议照片</Button><input id="editThree" type="file" multiple="">
					</div>
					</Col>
				</Row>
				<Row style="text-align: center;">
					<Col span="8">
					<div class="am-form-group am-form-file" id="editFourDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="srcs[3]" id="editFourImg"/>
						<Button type="ghost" class="upload">
					        <i class="am-icon-cloud-upload"></i>身份证正面</Button><input id="editFour" type="file" multiple="">
					</div>
					</Col>
					<Col span="8">
					<div class="am-form-group am-form-file" id="editFiveDiv" style="display: inline-block;width: 150px;margin-top:10px;">
						<img :src="srcs[4]" id="editFiveImg"/>
						<Button type="ghost">
					        <i class="am-icon-cloud-upload"></i>身份证反面</Button><input id="editFive" type="file" multiple="">
					</div>
					</Col>
				</Row>
			</Form>
	    </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            	modal1:false,
            	modal2:false,
            	src: [],
            	srcs:[],
            	formRight: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    value1: '',
                    value2: '',
                    value3: '',
                    value4: '',
                    value5: '',
                    value6: ''
              },
                pageNum:1,
                pages:10,
                value2: '',
                value3: '',
                value4: '',
                columns7: [
                	{
                        title: '序号',
                        key: 'index',
                        width:60
                    },
                    {
                        title: '登录帐号',
                        key: 'loginName'
                    },
                    {
                        title: '所在地区',
                        key: 'cityCode'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '手机号',
                        key: 'code',
                        width:120
                    },
                    {
                        title: '家庭地址',
                        key: 'address'
                    },
                    {
                        title: '佣金',
                        key: 'commision'
                    },
                    {
                        title: '用户量',
                        key: 'userCount'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
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
                                            this.changeagency(params.index)
                                        }
                                    }
                                }, '修改'),
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
                                }, '查看'),
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
                keepNum:0
            }
        },
        methods: {
        	show (index) {
        		this.$Modal.info({
                    title: '代理信息',
                    content: `登录账号：${this.data6[index].loginName}<br>所在地区：${this.data6[index].cityCode}<br>姓名：${this.data6[index].name}<br>手机号：${this.data6[index].code}<br>家庭地址：${this.data6[index].address}<br>佣金：${this.data6[index].commision}<br>用户量：${this.data6[index].userCount}<br>协议照片：${this.data6[index].contractImg}<br>银行卡正面：${this.data6[index].bankImg}<br>银行卡反面：${this.data6[index].bankImgO}<br>身份证正面：${this.data6[index].idcardImg}<br>身份证反面：${this.data6[index].idcardImgO}`
                })
        	},
            changeagency (index) {
            	var editOneImg = document.getElementById("editOneImg").getAttribute("src");
			    var editTwoImg = document.getElementById('editTwoImg').getAttribute('src');
			    var editThreeImg = document.getElementById('editThreeImg').getAttribute('src');
			    var editFourImg = document.getElementById('editFourImg').getAttribute('src');
			    var editFiveImg = document.getElementById('editFiveImg').getAttribute('src');
            	this.modal2 = true;
            	this.keepNum = index;
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/agent/getAgent',
            		data:JSON.stringify({
            			"id":that.data6[that.keepNum].id
            		})
            	}).then(function(res){
            		var data = res.data.data;
            		that.formRight.input3 = data.code;
            		that.formRight.input1 = data.name;
            		that.formRight.input2 = data.cityCode;
            		that.formRight.input4 = data.address;
				    console.log(editFiveImg)
            		editFourImg = data.idcardImg;
            		editFiveImg = data.idcardImgO;
            		editOneImg = data.bankImg;
            		editThreeImg = data.contractImg;
            		editTwoImg = data.bankImgO;
            		console.log(data.bankImgO)
            	})
            },
            ok2 () {//修改
			    console.log(editFiveImg)
                var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + "/agent/updateAgent",
            		data:JSON.stringify({
            			"id":that.data6[that.keepNum].id,
					    "cityCode":that.formRight.input2,
					    "name":that.formRight.input1,
					    "code":that.formRight.input3,
					    "address":that.formRight.input4,
					    "idcardImg":editFourImg,
					    "idcardImgO":editFiveImg,
					    "bankImg":editOneImg,
					    "bankImgO":editTwoImg,
					    "contractImg":editThreeImg
            		})
            	}).then(function(res){
            		console.log(res)
            	})
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            remove (index) {
            	var that = this;
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + "/agent/delAgent",
            		data:JSON.stringify({
            			"id":that.data6[index].id
            		})
            	}).then(function(res){
            		
            	})
                that.data6.splice(index, 1);
            },
            change (page) {//改变页数
            	this.pageNum = page;
            	this.agencySet();
            },
            agencySet () {
            	var that = this;
	        	this.ajax({
	        		method:'post',
	        		url:this.apiUrl + '/agent/getAgentList',
	        		data:JSON.stringify({
	                    "page":that.pageNum,
	    				"size":10
	        		})
	        	}).then(function(res){
	        		that.pages = res.data.pages*10;
	        		var data = res.data.resultList;
	        		var agencyStr = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
						obj.pwd = data[i].pwd;
						obj.loginName = data[i].loginName;
						obj.id = data[i].id;
						obj.cityCode = data[i].cityCode;
						obj.name = data[i].name;
						obj.code = data[i].code;
						obj.address = data[i].address;
						obj.commision = data[i].commision;
						obj.userCount = data[i].userCount;
						obj.bankImg = data[i].bankImg;
						obj.bankImgO = data[i].bankImgO;
						obj.idcardImg = data[i].idcardImg;
						obj.contractImg = data[i].contractImg;
						obj.idcardImgO = data[i].idcardImgO;
						agencyStr.push(obj)
						that.data6 = agencyStr;
	        		}
	        	})
           },
           handSearch () {
            	var that = this;
            	console.log(that.value2)
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/agent/getAgentList',
            		data:JSON.stringify({
            			"page":that.pageNum,
					    "size":10,
					    "loginName":that.value2,
					    "code":that.value3,
					    "name":that.value4
            		})
            	}).then(function(res){
            		var data = res.data.resultList;
	        		var agencyStr = [];
	        		for(var i=0;i<data.length;i++){
	        			var obj = {};
	        			obj.index = i+1;
						obj.pwd = data[i].pwd;
						obj.loginName = data[i].loginName;
						obj.id = data[i].id;
						obj.cityCode = data[i].cityCode;
						obj.name = data[i].name;
						obj.code = data[i].code;
						obj.address = data[i].address;
						obj.commision = data[i].commision;
						obj.userCount = data[i].userCount;
						obj.bankImg = data[i].bankImg;
						obj.bankImgO = data[i].bankImgO;
						obj.idcardImg = data[i].idcardImg;
						obj.contractImg = data[i].contractImg;
						obj.idcardImgO = data[i].idcardImgO;
						agencyStr.push(obj)
						that.data6 = agencyStr;
	        		} 
            	})
            },
            ok1 () {//新增
				window.that = this;
				var addOneImg = document.getElementById("addOneImg").getAttribute("src");
			    var addTwoImg = document.getElementById('addTwoImg').getAttribute('src');
			    var addThreeImg = document.getElementById('addThreeImg').getAttribute('src');
			    var addFourImg = document.getElementById('addFourImg').getAttribute('src');
			    var addFiveImg = document.getElementById('addFiveImg').getAttribute('src');
            	this.ajax({
            		method:'post',
            		url:this.apiUrl + '/agent/addAgent',
            		data:JSON.stringify({
            			"loginName":that.formRight.value1,
					    "pwd":that.formRight.value2,
					    "name":that.formRight.value3,
					    "code":that.formRight.value5,
					    "cityCode":that.formRight.value4,
					    "address":that.formRight.value6,
					    "contractImg":addThreeImg,
					    "bankImg":addOneImg,
					    "bankImgO":addTwoImg,
					    "idcardImg":addFourImg,
					    "idcardImgO":addFiveImg
            		})
            	}).then(function(res){
            		console.log(res);
            	})
            }
        },
        mounted(){
        	window.that = this;
        	this.agencySet();
			/*获取七牛上传tocken方法* 在该ajax回调方法中,调用上传控件初始化方法*/
			setTimeout(()=>{
				getTokenMessage()
			},1000)
			function getTokenMessage() {
			    window.that.ajax({
			        url:window.apiUrl + '/other/upToken',
			        method: 'POST',
			        data: {},
			        cache: false,
			        contentType: false,    //不可缺
			        processData: false,    //不可缺
			        dataType: 'json'
			    }).then(function (data) {
			            var obj = data.data;
			            /*初始化方法, param1:请求tocken|param2上传控件ID*/
			           	uploaderReady(obj.uptoken, 'editOne');
			           	uploaderReady(obj.uptoken, 'editTwo');
			          	uploaderReady(obj.uptoken, 'editThree');
			           	uploaderReady(obj.uptoken, 'editFour');
			            uploaderReady(obj.uptoken, 'editFive');
			            uploaderReady(obj.uptoken, 'addOne');
			           	uploaderReady(obj.uptoken, 'addTwo');
			          	uploaderReady(obj.uptoken, 'addThree');
			           	uploaderReady(obj.uptoken, 'addFour');
			            uploaderReady(obj.uptoken, 'addFive');
			
			        })
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
			       	domain: 'http://osjlnflyg.bkt.clouddn.com/',
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
			                var sourceLink = domain + res.key; //**获取上传文件的链接地址**
			                  console.log(sourceLink);
//			                  sessionStorage.setItem('imgLink',sourceLink)
							var imgsrc = []
							var addOneImg = document.getElementById("addOneImg").setAttribute("src",sourceLink);
							var addTwoImg = document.getElementById("addTwoImg").setAttribute("src",sourceLink);
							var addThreeImg = document.getElementById("addThreeImg").setAttribute("src",sourceLink);
							var addFourImg = document.getElementById("addFourImg").setAttribute("src",sourceLink);
							var addFiveImg = document.getElementById("addFiveImg").setAttribute("src",sourceLink);
							var editOneImg = document.getElementById("editOneImg").setAttribute("src",sourceLink);
							var editTwoImg = document.getElementById("editTwoImg").setAttribute("src",sourceLink);
							var editThreeImg = document.getElementById("editThreeImg").setAttribute("src",sourceLink);
							var editFourImg = document.getElementById("editFourImg").setAttribute("src",sourceLink);
							var editFiveImg = document.getElementById("editFiveImg").setAttribute("src",sourceLink);
			                imgsrc.push(sourceLink)
			                console.log(imgsrc)
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
        }
    }
</script>
<style scoped>
	.agencyTab{
		margin-top:10px;
	}
	.ivu-col-span-8{
		height:40px;
	}
	img{
		height:0;
		width:0;
	}
</style>