function Cs142TemplateProcessor(template){
	this.template = template;
	Cs142TemplateProcessor.prototype.fillIn= function(dictionary){
		let rx = /{{[a-zA-Z]*}}/g;
		let arr = this.template.match(rx);
		let a = this.template;
		arr.map((el)=>{
			el = el.slice(2, el.length - 2);
			let repl = "{{" + el + "}}";
			if(dictionary[el]){
				a = a.replace(repl, dictionary[el]);
			} else {
				a= a.replace(repl, "");
			}
		});
		return a;
	}
}
