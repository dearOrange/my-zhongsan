<template>
	<div class="powerCon">
		<div class="powerHead">
			<Icon type="android-lock" size="20" style="margin-right:6px;"></Icon>角色权限设置
		</div>
		<div class="powerSection">
			<div class="sectionLeft">
				<div class="left-header">管理列表</div>
				<ul @click='setFormItem($event)'>
					<li v-for='(formItem,index) in formItemData' :key='index' :index='index'>
						<Checkbox v-model='single[index]' :label="formItem.tfDesc" :name="formItem.id"></Checkbox>{{formItem.tfDesc}}
					</li>
				</ul>
			</div>
			<div class="sectionRight">
				<div class="left-header">权限列表</div>
				<Form :label-width="80" class="formList">
					<FormItem v-if='index == activeIndex' v-for='(formItem,index) in formItemData' :key='index'>
		                	<Checkbox v-if='formItem.children.length' v-for='(formItemChild,ind) in formItem.children' :name="formItemChild.id" v-model='singleChild[ind]'>{{formItemChild.tfDesc}}</Checkbox>
			        </FormItem>
				</Form>
				<div class="formBtn">
					<Button type="primary" @click="powerSet">设置</Button>
					<Button type="info" @click="powerCancel">取消</Button>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		data () {
			return {
				activeIndex: 0,
				formItemData: [],
				single: [],
				singleChild:[],
			}
		},
		methods: {
			setFormItem (e) {
				this.activeIndex = e ? e.target.getAttribute('index') : 0;
				this.$nextTick(() => {
					var FatherChild = document.getElementsByClassName("sectionRight")[0];
	    			var CheckboxItems = FatherChild.getElementsByClassName('ivu-checkbox-wrapper');
	    			this.singleChild = [];
	    			for(var i=0,len=CheckboxItems.length;i<len;i++) {
						this.singleChild[i] = false;
					}
	    			var roleFunction = localStorage.getItem("token2");
		        	var aa = roleFunction.split(',');
	    			this.checkChild(CheckboxItems, aa);
				})
			},
			powerSet () {
				var id = localStorage.getItem("token3");
				this.ajax({
					method:'post',
					url:this.apiUrl + '/role/updateByRoleId',
					data:JSON.stringify({
						"id":id,
    					"roleFunction":roleFunction
					})
				}).then(function(res){
					console.log(res)
				})
			},
			powerCancel () {
				this.$Message.info('已取消');
			},
			check (CheckboxItem, aa) {
        		for(let i = 0,len=CheckboxItem.length;i<len;i++){
        			for(let o = 0;o<aa.length;o++){
        				if(CheckboxItem[i].getAttribute('name') == aa[o] ){
							var newSingle = this.single.map((r, ind) => {
								if(ind == i) {
									return !r
								}else {
									return r
								}
							})
							this.single = newSingle
        				}
        			}
        		}
			},
			checkChild (CheckboxItems, aa) {
				for(let i = 0,len=CheckboxItems.length;i<len;i++){
        			for(let o = 0;o<aa.length;o++){
        				if(CheckboxItems[i].getAttribute('name') == aa[o] ){
							var newSingle = this.singleChild.map((r, ind) => {
								if(ind == i) {
									return !r
								}else {
									return r
								}
							})
							this.singleChild = newSingle
        				}
        			}
        		}
			}
		},
        mounted() {
        	var that = this;
        	this.ajax({
        		method:'post',
        		url:this.apiUrl + '/function/getAllFunctionList',
        	}).then(function(res){
        		that.formItemData = res.data.data;
        		for(var i=0,len=res.data.data.length;i<len;i++) {
        			that.single[i]	= false;
        		}
        		that.$nextTick(function() {
        			var Father = document.getElementsByClassName("sectionLeft")[0];
        			var CheckboxItem = Father.getElementsByClassName('ivu-checkbox-wrapper');
        			var FatherChild = document.getElementsByClassName("sectionRight")[0];
    				var CheckboxItems = FatherChild.getElementsByClassName('ivu-checkbox-wrapper');
    				for(var i=0,len=CheckboxItems.length;i<len;i++) {
    					that.singleChild[i] = false;
    				}
        			var roleFunction = localStorage.getItem("token2");
	        		var aa = roleFunction.split(',');
	        		that.check(CheckboxItem, aa);
	        		that.setFormItem();
        		})
				
        	});
		    
        }
    }
</script>

<style scoped>
	.powerHead{
		border:1px solid #ccc;
		padding:10px;
	}
	.powerSection{
		height:600px;
		background:#F9FAFC;
		padding:20px 20px;
	}
	.sectionLeft{
		display:block;
		width:200px;
		height:100%;
		float:left;
		
	}
	.left-header{
		height:40px;
		background:#2D8CF0;
		color:#fff;
		text-align: center;
		line-height: 40px;
	}
	.sectionLeft>ul>li{
		height:40px;
		border:1px solid #ccc;
		border-top:0;
		line-height: 40px;
		cursor: pointer;
		padding-left:50px;
	}
	.sectionRight{
		height:400px;
		width:auto;
		margin-left:220px;
		border:1px solid #ccc;
	}
	.formList{
		height:300px;
	}
	.formBtn{
		text-align: center;
	}
</style>