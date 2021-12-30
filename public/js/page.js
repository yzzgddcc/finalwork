new Vue({
	el: '#page-break',
	data: {
		cur: 1,
		all: 20
	},
	watch: {
		cur: function(newValue, oldValue){
			console.log(arguments);
		}
	},
	methods: {
		btnClick(num){
			if(num!=this.cur){
				this.cur=num;
			}
		},
		pageClick(){
			console.log('现在是'+this.cur+'页')
		},
		pageSkip(){
			var maxPage = this.all;
			var skipPage = Number(document.getElementsByClassName("jumppage")[0].value);
			console.log(typeof skipPage);
			if(!skipPage){
				alert("请输入跳转页码");
				return;
			}else if(skipPage<1 || skipPage>maxPage){
				alert("您输入的页码超过页数范围了！");
				return;
			}else{
				//this.cur=skipPage;
				this.btnClick(skipPage);
				this.pageClick();
			}
		}
	},
	computed: {
		indexs(){
			var left = 1;
			var right = this.all;
			var arr = [];
			if(this.all>=7){
				if(this.cur>4 && this.cur<this.all-3){
					left = this.cur-3;
					right = this.cur+3;
				}else if(this.cur<=4){
                    left=1;
                    right=7;
				}else{
					left=this.all-6;
					right=this.all;
				}
			}
			while(left<=right){
				arr.push(left);
				left++;
			}
			return arr;
		}
	}
})
