class Editor extends React.Component {
    render() {
        return (
                <div>
                    <h1>HangManWeb</h1>
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
                });
        this.myp5 = null;
        this.state = {loadingState: 'Loading Canvas ...'}
        let wsreference = this.comunicationWS;
        this.sketch = function (p) {
            /*
             * @name Input and Button
             * @description Input text and click the button to see it affect the the canvas.
             */
            let input1,input2,input3, button1,button2,button3, greeting;

            p.setup=function()  {
                // create canvas
                p.createCanvas(710, 700);

                input1=p.createInput();
                input1.position(30,605);
                button1=p.createButton('submit');
                button1.position(input1.x + input1.width, 605);
                
                input2=p.createInput();
                input2.position(330,605);
                button2=p.createButton('submit');
                button2.position(input2.x + input2.width, 605);
                
                input3=p.createInput();
                input3.position(630,605);
                button3=p.createButton('submit');
                button3.position(input3.x + input3.width, 605);
                
           
        }
    }
    }
    

    componentDidMount() {
        this.myp5 = new p5(this.sketch, 'container');
        this.setState({loadingState: 'Canvas Loaded'});
    }
    render()
    {
        return(
                <div>
                    <h4>Drawing status: {this.state.loadingState}</h4>
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
    send(x, y) {
        let msg = '{ "x": ' + (x) + ', "y": ' + (y) + "}";
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }
}
ReactDOM.render(
        <Editor name="Andres"/>,
        document.getElementById('root')
        );