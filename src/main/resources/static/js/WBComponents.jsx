class Editor extends React.Component {
    render() {
        return (
                <div>
                    
                   
                    <div id="toolstatus"></div>
                    
                    <div id="container"></div>
                    <WBCanvas />
                   
                    <div id="info"></div>
                </div>
                );
    }
}
class WBCanvas extends React.Component {
    
    constructor(props) {
        
        super(props);
        this.comunicationWS =
                new WSBBChannel(BBServiceURL(),
                        (msg) => {
                var obj = JSON.parse(msg);
                         console.log("On func call back ", msg);
                        this.drawEllipse(obj.xi, obj.yi,obj.color1,obj.color2,obj.color3);
                        this.drawLine(obj.x1, obj.y1,obj.x2, obj.y2,obj.color1,obj.color2,obj.color3);
                        
                });
        
        this.myp5 = null;
        this.state = {loadingState: 'Loading Canvas ...'};
        let wsreference = this.comunicationWS; 
        let wrong1=0;
        let wrong2=0;
        let wrong3=0;
        
        
        
        this.sketch = function (p) {
            let x = 100;
            let y = 100;
            let color1 = 125;
            let color2 = 50;
            let color3 = 0;
            let button1;
            let button2;
            let button3;
            let input1;
            let input2;
            let input3;
            let yi=105;
            let y2=130;
            let y3=240;
            let y4=160;
            let y5=290;
            let palabram1;
            let palabram2;
            let palabram3;
            
         
            
            p.setup = () => {
                
                p.createCanvas(1000, 580);
                p.background(0,255,255);
                p.textSize(47);
                p.noStroke();
                p.fill(0);
                palabram1=p.createElement('h2', '');
                palabram1.position(40, 490);
                palabram2=p.createElement('h2', '');
                palabram2.position(340, 490);
                palabram3=p.createElement('h2', '');
                palabram3.position(640, 490);
                
                p.strokeWeight(10);
                p.stroke(color1,color2,color3);
                p.line(40, 30, 40, 370);         
                p.line(40, 30, 260, 30);
                p.line(40, 100, 100, 30);
                p.strokeWeight(4);
                p.line(250, 30, 250, 90);
                p.strokeWeight(10);
                
                p.stroke(color3,color1,color2);
                p.line(340, 30, 340, 370);         
                p.line(340, 30, 560, 30);
                p.line(340, 100, 400, 30);
                p.strokeWeight(4);
                p.line(550, 30, 550, 90);
                p.strokeWeight(10);
                
                p.stroke(color2,color3,color1);
                p.line(640, 30, 640, 370);         
                p.line(640, 30, 860, 30);
                p.line(640, 100, 700, 30);
                p.strokeWeight(4);
                p.line(850, 30, 850, 90);
                p.strokeWeight(10);
                
                input1 = p.createInput();
                input1.position(40, 580);
                input2 = p.createInput();
                input2.position(340, 580);
                input3 = p.createInput();
                input3.position(640, 580);
              
                button1=p.createButton("submit");
                button1.position(40+input1.width, 580);
                
                
                button2=p.createButton("submit");
                button2.position(340+input2.width, 580);
           
                
                button3=p.createButton("submit");
                button3.position(640+input3.width, 580);
                
                
                
            };
            
            p.draw = () => {    
                 
                 button2.mousePressed(ahorcar2);
                 button1.mousePressed(ahorcar1);
                 button3.mousePressed(ahorcar3);
                
               
            };
            function ahorcamiento(x1,x2,x3,x4,x5,c1,c2,c3,wrong){
                p.strokeWeight(2);
                p.stroke(c1,c2,c3);
                p.fill(0,255,255);
                if (wrong===0){
                    
                    p.ellipse(x1,yi,50,50);
                    wsreference.sendelipse(x1,yi,c1,c2,c3);
                }
                else if(wrong===1){
                   
                    p.line(x1, y2, x1, y3);   
                    wsreference.sendeline(x1,y2,x1,y3,c1,c2,c3);
                    
                }
                else if(wrong===2){
                   
                    p.line(x1, y2, x2, y4);   
                    wsreference.sendeline(x1,y2,x2,y4,c1,c2,c3);
                    
                }
                else if(wrong===3){
                   
                    p.line(x1, y2, x3, y4);   
                    wsreference.sendeline(x1,y2,x3,y4,c1,c2,c3);
                    
                }
                else if(wrong===4){
                   
                    p.line(x1, y3, x4, y5);   
                    wsreference.sendeline(x1,y3,x4,y5,c1,c2,c3);
                    
                }
                else if(wrong===5){
                   
                     p.line(x1, y3, x5, y5);   
                    wsreference.sendeline(x1,y3,x5,y5,c1,c2,c3);
                    //p.line(x1, yi-10, x1+20, y2-30);   
                    //wsreference.sendeline(x1, yi-10, x1+20, y2-30,c1,c2,c3);
                    //p.line(x1+20, yi-10, x1, y2-30);   
                    //wsreference.sendeline(x1+20, yi-10, x1, y2-30,c1,c2,c3);
                    
                }
                
                
            }
            function palabra(L,P,N,X1,X2,X3,X4,X5,C1,C2,C3,W){
               
                if(buscar(L,N)===false){
                    if(W==="wrong1"){
                        W=wrong1;
                        wrong1++;}
                    if(W==="wrong2"){
                        W=wrong2;
                        wrong2++;}
                    if(W==="wrong2"){
                        W=wrong3;
                        wrong2++;}
                    ahorcamiento(X1,X2,X3,X4,X5,C1,C2,C3,W);
                    
                }
                else{
                    
                    P.html(mostrar(L,N)); 
                }
                   
            }
            function ahorcar1(){
                palabra(input1.value(),palabram1,1,250,220,280,220,280,color1,color2,color3,"wrong1");
            };
            function ahorcar2(){
                palabra(input2.value(),palabram2,2,550,520,580,520,580,color3,color1,color2,"wrong2");
            
            };
            function ahorcar3(){
                palabra(input3.value(),palabram3,3,850,820,880,820,880,color2,color3,color1,"wrong3");
             
            };
            
            
            
            
                
        };
    }
    
    drawEllipse(x,y,color1,color2,color3) {
            this.myp5.stroke(color1,color2,color3);
            this.myp5.fill(0,255,255);
            this.myp5.ellipse(x, y, 50, 50);
    }
    drawLine(x1,y1,x2,y2,color1,color2,color3) {
            this.myp5.stroke(color1,color2,color3);
            this.myp5.line(x1, y1, x2, y2);
    }
    
    componentDidMount() {
        
        this.myp5 = new p5(this.sketch, 'container');
        this.setState({loadingState: 'Canvas Loaded'});
    }
    render()
    {
        return(
                <div>
                
                </div>);
    }
}
const palabras=["colombia","china","japon","uruguay","argentina"];
console.log(palabras[Math.random() * (palabras.lenght- 0) + 0]);
const word=Array.from(palabras[1]);
const word2=Array.from(palabras[2]);
const word3=Array.from(palabras[0]);
const palabra1= new Array(word.length);
const palabra2= new Array(word2.length);
const palabra3= new Array(word3.length);
palabra1.fill("-");
palabra2.fill("-");
palabra3.fill("-");
function buscar(lt,num) {
    var bool;
    if(num===1)bool=word.includes(lt);
    if(num===2)bool=word2.includes(lt);
    if(num===3)bool=word3.includes(lt);
    return bool;
    }
function mostrar(letra,num){
    var pal;
   
    if(num===1){
        pos=word.indexOf(letra);
        palabra1[pos]=letra;
        pal=palabra1;
    }
    if(num===2){
        pos=word2.indexOf(letra);
        palabra2[pos]=letra;
        pal=palabra2;
    }
    if(num===3){
        pos=word3.indexOf(letra);
        palabra3[pos]=letra;
        pal=palabra3;
    }
    return pal.join('');
}

// Retorna la url del servicio. Es una función de configuración.
function BBServiceURL() {
    var host = window.location.host;
    var url = 'wss://' + (host) + '/bbService';
    console.log("URL Calculada: " + url);
    return url;
}
class WSBBChannel {
    constructor(URL, callback) {
        this.URL = URL;
        this.wsocket = new WebSocket(URL);
        this.wsocket.onopen = (evt) => this.onOpen(evt);
        this.wsocket.onmessage = (evt) => this.onMessage(evt);
        this.wsocket.onerror = (evt) => this.onError(evt);
        this.receivef = callback;
    }
    onOpen(evt) {
        console.log("In onOpen", evt);
    }
    onMessage(evt) {
        console.log("In onMessage", evt);
        // Este if permite que el primer mensaje del servidor no se tenga encuenta.
                // El primer mensaje solo confirma que se estableció la conexión.
                // De ahí en adelante intercambiaremos solo puntos(x,y) con el servidor
                if (evt.data != "Connection established.") {
        this.receivef(evt.data);
    }
    }
    onError(evt) {
        console.error("In onError", evt);
    }
    sendelipse(xi, yi,color1,color2,color3) {
        let msg = '{ "xi": ' + (xi) + ', "yi": ' + (yi)  +  ', "color1": ' + (color1)+', "color2": ' + (color2)+', "color3": ' + (color3)+ "}";
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }
    sendeline(x1, y1,x2,y2,color1,color2,color3) {
        let msg = '{ "x1": ' + (x1) + ', "y1": ' + (y1)  +', "x2": ' + (x2)  +', "y2": ' + (y2)  +  ', "color1": ' + (color1)+', "color2": ' + (color2)+', "color3": ' + (color3)+ "}";
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }
}
ReactDOM.render(
        <Editor name="Andres"/>,
        document.getElementById('root')
        );