class Editor extends React.Component {
    render() {
        return (
                <div>
                    <h1>            HANGMAN             </h1>
                    <hr/>
                    <div id="toolstatus"></div>
                    <hr/>
                    <div id="container"></div>
                    <WBCanvas />
                    <hr/>
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
            
            let yi=75;
            let y2=110;
            let y3=200;
            let y4=175;
            let y5=250;
            
            
            
           
           
            
            p.setup = () => {
                
                p.createCanvas(1000, 500);
              
                p.strokeWeight(10);
                p.stroke(color1,color2,color3);
                p.line(40, 30, 40, 370);         
                p.line(40, 30, 250, 30);
                p.line(40, 100, 100, 30);
                p.line(250, 30, 250, 50);
                
                
                p.stroke(color3,color1,color2);
                p.line(340, 30, 340, 370);         
                p.line(340, 30, 550, 30);
                p.line(340, 100, 400, 30);
                p.line(550, 30, 550, 50);
                
                p.stroke(color2,color3,color1);
                p.line(640, 30, 640, 370);         
                p.line(640, 30, 850, 30);
                p.line(640, 100, 700, 30);
                p.line(850, 30, 850, 50);
                
                
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
            function ahorcamiento(x1,x2,x3,x4,x5,c1,c2,c3,wrong){
                p.stroke(c1,c2,c3);
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
                    p.line(5, 8, 50, 100);   
                    wsreference.sendeline(x1-10, yi+10, x1+10, y2-10,c1,c2,c3);
                    p.line(x1+10, yi+10, x1-10, y2-10);   
                    wsreference.sendeline(x1+10, yi+10, x1-10, y2-10,c1,c2,c3);
                    
                    
                }
                
            }
            function ahorcar1(){
                
                ahorcamiento(250,220,280,220,280,color1,color2,color3,wrong1);
                wrong1++;
                
            };
            function ahorcar2(){
                
                ahorcamiento(550,520,580,520,580,color3,color1,color2,wrong2);
                wrong2++;
                
            };
            function ahorcar3(){
                
                ahorcamiento(850,820,880,820,880,color2,color3,color1,wrong3);
                wrong3++;
                
            };
            
            p.draw = () => {    
                 
                 button2.mousePressed(ahorcar2);
                 button1.mousePressed(ahorcar1);
                 button3.mousePressed(ahorcar3);
                
               
            };
            
            
                
        };
    }
    drawEllipse(x,y,color1,color2,color3) {
            this.myp5.stroke(color1,color2,color3);
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