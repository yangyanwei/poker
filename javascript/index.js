window.onload = function(){
    //
    //var fn = function(){
    //    for(var i=0;i<5;i++){
    //        var s = '';
    //        for(var j=0;j<i+1;j++){
    //           s+='*';
    //        }
    //        console.log('');
    //        console.log(s);
    //    }
    //}
    //fn();
    //
    //var fn1 = function(){
    //    for(var i=0;i<5;i++){
    //        for(var k=0; k<4-i;k++){
    //            document.write('-')
    //        }
    //        for(var j=0;j<i*2+1;j++){
    //            document.write('*');
    //        }
    //        document.write('<br/>');
    //    }
    //}
    //fn1();
    //写一个函数 在页面中创建28个元素 在一个div中
    //28个元素都用定位   top：30

    var poker = document.getElementById('poker');
    var test = document.getElementById('test');
    var top=50;
    var fn = function(){
        for(var i=0;i<7;i++){
            for(var j=0;j<i+1;j++){
                var x = Math.random() * 4000 - 2000,
                    y = Math.random() * 4000 - 2000,
                    z = Math.random() * 4000 - 2000;
                var puke = document.createElement('div');
                puke.setAttribute('class','puke');
                puke.setAttribute('id',i+'_'+j);
                puke.style.top = i*top+'px';
                puke.style.left = (6-i)*60 + j*130 +'px';
                poker.appendChild(puke);
                puke.style.webkitTransform = 'translate3d('+x+'px,'+y+'px,'+z+'px)';
            }
        }
    }
    fn();
    var elk = document.getElementsByClassName('puke');
    setTimeout(function(){
        for(var i=0;i<elk.length;i++){
            elk[i].style.webkitTransform = 'translate3d(0,0,0)';
        }
    },1000);
    //事件委托
    var previous = null;
    var next = document.createElement('div');
    next.setAttribute('class','next');
    next.setAttribute('id','next');
    next.innerHTML = 'next';
    poker.appendChild(next);

    var again = document.createElement('div');
    again.setAttribute('class','again');
    again.setAttribute('id','again');
    again.innerHTML = 'again';
    poker.appendChild(again);

    var right = document.createElement('div');
    right.setAttribute('class','rr');
    poker.appendChild(right);
    for(var j=0;j<24;j++){
        var down = document.createElement('div');
        down.setAttribute('class','down');
        down.setAttribute('id','dd_'+j);
        poker.appendChild(down);
    };
    var down = document.getElementsByClassName('down');

    var next = document.getElementById('next');
    var again= document.getElementById('again');

    document.onmousedown = function(e){
        e.preventDefault();
    };
    var s=0;
    var good = document.getElementById('good');
    var bad = document.getElementById('bad');
    var firstnumber='',secendnumber='';
    var diyi='',dier='',defact = 0,fl=10,x,y;
    poker.onclick = function(e){
        e.preventDefault();
        var el = e.target;
        if(e.target == this)return;


        var id = el.getAttribute('id');
        x = Number(id.split('_')[0]);
        y = Number(id.split('_')[1]);
        var puke1 = document.getElementById(x+1 +'_'+ y);
        var puke2 = document.getElementById(x+1 +'_'+ y+1);
        if(puke1 || puke2)return;
        if(previous != null){
            previous.style.border = '1px solid black';
        }
        el.style.border = '2px solid red';
        previous = el;
        var id = el.getAttribute('id');
        if(id == 'next'){
            if( down.length == 0 ) return ;
            down[down.length-1].style.zIndex =fl;
            down[down.length-1].setAttribute('class','rr');
            fl++;
        }
        var pai = document.getElementsByClassName('pai');
        if(id == 'again'){
            var rr = document.getElementsByClassName('rr');
            if(rr.length == 0 ){
                return ;
            }
            defact+=1;
            console.log(defact);
            var l =  rr.length;
            for(i = 0 ; i < l ; i++){
                var re =  rr[0];
                re.setAttribute('class','down');
            }
            fl--;
            if(defact >= 3 ){
                bad.style.display = 'block';
                //location.reload();
                return;
            }
        }
        if(String(id).length<3)return;
        x = Number(id.split('_')[0]);
        y = Number(id.split('_')[1]);

        var da1 = document.getElementById( (x+1) +'_'+ (y  ) );
        var da2 = document.getElementById( (x+1) +'_'+ (y+1) );

        if(da1 || da2 ){return;}
        el.style.border = '2px solid red' ;
        if(firstnumber==''){
            firstnumber = el.innerHTML ;
            diyi = id ;
            var yi = document.getElementById(diyi);
            if( el.innerHTML == 'J' ){
                firstnumber  =  '11' ;
            }
            if( el.innerHTML == 'Q' ){
                firstnumber  =  '12' ;
            }
            if( el.innerHTML == 'K' ){
                poker.removeChild(yi);
                firstnumber = '' ;secendnumber='';
                diyi='',dier='';
                s +=1;
                test.innerHTML=s;
            }
            if( el.innerHTML == 'A' ){
                firstnumber  =  '1' ;
            }
        }else{
            secendnumber= el.innerHTML ;
            dier = id ;
            var er = document.getElementById(dier);

            if( el.innerHTML == 'J' ){
                secendnumber  =  '11' ;
            }
            if( el.innerHTML == 'Q' ){
                secendnumber  =  '12' ;
            }
            if( el.innerHTML == 'K' ){
                poker.removeChild(er);
                firstnumber='';secendnumber='';
                diyi='',dier='';
                s += 1;
                test.innerHTML=s;
            }
            if( el.innerHTML == 'A' ){
                secendnumber  =  '1' ;
            }
            var jjj = true ;
        }
        var dahe = Number(firstnumber) + Number(secendnumber);
        if( jjj ){
            if( dahe == 13 ){
                yi = document.getElementById(diyi);
                er = document.getElementById(dier);
                poker.removeChild(yi);
                poker.removeChild(er);
                firstnumber = '' ;
                secendnumber = '' ;
                s+=2;
                test.innerHTML=s;
                return;
            }else{
                firstnumber = '' ; secendnumber = '' ;
                diyi='',dier='';
            }
        }
        if(puke.length <= 2 ){
            good.style.display='block';
        }

    };

    var dict = {
        1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K'};
    //写一个函数 随机生成数组 长度为13 里面为1-13的随机数
    //便利数组 按桂策输出数字
    var puke = document.getElementsByClassName('puke');
    var fn2 = function(){
        var arr=[];
        for(var i=0;i<puke.length;i++){
            var aa = Math.floor(Math.random()*13+1);
            arr.push(aa);
        }
        //for(i=0;i<arr.length;i++){
        //    console.log(dict[arr[i]]);
        //}
    };
    fn2();

//写一个函数 生成一个混乱的扑克配
//['rd','bk','fk','mh']

    var hh = ['rd','bk','fk','mh'];
    var fn3 = function(){
        var pokerl =[],hs,nu;
        var zidian = {};
        while(pokerl.length !=52){
            hs = hh[Math.floor(Math.random()*4)];
            nu = dict[Math.floor(Math.random()*13+1)];
            var pai = {huase:hs,number:nu};
            if(!zidian[hs+nu]) {
                pokerl.push(pai);
                zidian[hs + nu] = true;
            }
        }
        return pokerl;
    };
    fn3();
    var pokerl= fn3();
        //poker.length = 28;
        var el = document.getElementsByClassName('puke');
        for(var i=0;i<el.length;i++){
            el[i].innerHTML = pokerl[i].number;
            if(pokerl[i].huase == 'rd'){
                el[i].style.backgroundImage=  'url(./images/a1.gif)';
            }
            if(pokerl[i].huase == 'bk'){
                el[i].style.backgroundImage = 'url(./images/a4.gif)';
            }
            if(pokerl[i].huase == 'fk'){
                el[i].style.backgroundImage = 'url(./images/a2.gif)';
            }
            if(pokerl[i].huase == 'mh'){
                el[i].style.backgroundImage = 'url(./images/a3.gif)';
            }

        }
        var poker = document.getElementById('poker');

    var els = document.getElementsByClassName('down');
    for(var i=0;i<els.length;i++){
        els[i].innerHTML = pokerl[i].number;
        if(pokerl[i].huase == 'rd'){
            els[i].style.backgroundImage=  'url(./images/a1.gif)';
        }
        if(pokerl[i].huase == 'bk'){
            els[i].style.backgroundImage = 'url(./images/a4.gif)';
        }
        if(pokerl[i].huase == 'fk'){
            els[i].style.backgroundImage = 'url(./images/a2.gif)';
        }
        if(pokerl[i].huase == 'mh'){
            els[i].style.backgroundImage = 'url(./images/a3.gif)';
        }

    }

    var again = document.getElementById('again');
    again.onclick =function(){
       location.reload();
    }
















}
