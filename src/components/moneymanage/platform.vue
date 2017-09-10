<template>
	<div class="moneyCon">
		<Table border :columns="columns1" :data="data1"></Table>
		<Page :total="pages" :current="pageNum" @on-change="change"></Page>
	</div>
</template>

<script>
	export default{
		data () {
            return {
            	pageNum:1,
                pages:10,
                columns1: [
                	{
                        title: '序号',
                        key: 'index',
                        width:60
                    },
                    {
                        title: '交易流水ID',
                        key: 'id'
                    },
                    {
                        title: '交易订单ID',
                        key: 'orderId'
                    },
                    {
                        title: '记录类型',
                        key: 'type'
                    },
                    {
                        title: '金额',
                        key: 'money'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    }
                ],
                data1: [
                    
                ]
            }
        },
        methods : {
        	change (page) {
            	this.pageNum = page;
            	this.platSet();
            },
            platSet () {
            	var that = this;
				this.ajax({
					method:'post',
					url:this.apiUrl + '/walletRecord/selectInOutRecordList',
					data:JSON.stringify({
						"currentPage":that.pageNum,
					    "pageSize":10
					})
				}).then(function(res){
					that.pages = res.data.pages*10;
					var data = res.data.resultList;
					var platStr = [];
					for(var i=0;i<data.length;i++){
						var obj = {};
						obj.index = i+1;
						obj.id = data[i].id;
						obj.orderId = data[i].orderId;
						obj.type = data[i].type;
						obj.money = data[i].money;
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
						
						if(data[i].type == 0){
							data[i].type = "手续费";
						}else if(data[i].type == 2){
							data[i].type = "隔夜费";
						}else if(data[i].type == 3){
							data[i].type = "平台提成";
						}
						obj.type = data[i].type;
						platStr.push(obj)
						that.data1 = platStr;
					}
				})
            }
       },
		mounted () {
			this.platSet();
		}
	}
</script>

<style scoped>
	
</style>