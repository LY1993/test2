
function text(){
	
	var num = 0;
	function add{
	
	num++;
	}
	
	var sp = document.getElementById('sp');	
	sp.innerText = "点击了"+(num)+"次";

	return add;
}
var b = text();
var btn = document.getElementById('btn');
btn.onlick = b();





