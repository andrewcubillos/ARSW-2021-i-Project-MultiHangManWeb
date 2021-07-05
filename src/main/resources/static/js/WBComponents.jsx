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
                        this.drawPoint(obj.x, obj.y,obj.color1,obj.color2,obj.color3);
                });
        this.myp5 = null;
        this.state = {loadingState: 'Loading Canvas ...'}
        let wsreference = this.comunicationWS; 
        this.sketch = function (p) {
            let x = 100;
            let y = 100;
            let max=255;
            let min=0;
            let max2=200;
            let min2=100;
            let max3=255;
            let min3=200;
            let color1 = Math.round(Math.random() * (max - min) + min);
            let color2 = Math.round(Math.random() * (max2 - min2) + min2);
            let color3 = Math.round(Math.random() * (max3 - min3) + min3);
            let button1;
            let button2;
            let button3;
            let input1;
            let input2;
            let input3;
            p.setup = function () {
                
                p.createCanvas(1000, 450);
                
                p.strokeWeight(10);
                p.stroke(255,255,0);
                p.line(40, 30, 40, 370);         
                p.line(40, 30, 250, 30);
                p.line(40, 100, 100, 30);
                
                p.stroke(0,10,255);
                p.line(340, 30, 340, 370);         
                p.line(340, 30, 550, 30);
                p.line(40, 100, 400, 30);
                
                p.stroke(255,10,0);
                p.line(640, 30, 640, 370);         
                p.line(640, 30, 850, 30);
                p.line(40, 100, 700, 30);
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
            function ahorcar(){
                p.ellipse(50,500,50,50);
               
            }
            p.draw = function () {    
                
                if (p.mouseIsPressed === true) {
                    p.fill(color1, color2, color3);
                    p.ellipse(p.mouseX, p.mouseY, 20, 20);
                    wsreference.send(p.mouseX, p.mouseY,color1,color2,color3); 
                }
                if (p.mouseIsPressed === false) {
                    p.fill(255, 255, 255);
                }
            };
            
            
                
        }
    }
    drawPoint(x, y,color1,color2,color3) {
            this.myp5.fill(color1,color2,color3);
            this.myp5.ellipse(x, y, 20, 20);
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
    send(x, y,color1,color2,color3) {
        let msg = '{ "x": ' + (x) + ', "y": ' + (y) + ', "color1": ' + (color1)+', "color2": ' + (color2)+', "color3": ' + (color3)+ "}";
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }
}
ReactDOM.render(
        <Editor name="Andres"/>,
        document.getElementById('root')
        );