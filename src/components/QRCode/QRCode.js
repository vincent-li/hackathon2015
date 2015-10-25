var QRCode = React.createClass({
    componentDidMount : function(){
        var text = this.props.content;
        var QRCodeVersion = 15; // 1-40 see http://www.denso-wave.com/qrcode/qrgene2-e.html
        var canvas = React.findDOMNode(this);
        var qrCanvasContext = canvas.getContext('2d');
        try {
            // QR Code Error Correction Capability 
            // Higher levels improves error correction capability while decreasing the amount of data QR Code size.
            // QRErrorCorrectLevel.L (5%) QRErrorCorrectLevel.M (15%) QRErrorCorrectLevel.Q (25%) QRErrorCorrectLevel.H (30%)
            // eg. L can survive approx 5% damage...etc.
            var qr = new QRCode(QRCodeVersion, QRErrorCorrectLevel.L); 
            qr.addData(text);
            qr.make();
        }
        catch(err) {
            var errorChild = document.createElement("p");
            var errorMSG = document.createTextNode("QR Code FAIL! " + err);
            errorChild.appendChild(errorMSG);
            return errorChild;
        }
    },
    render: function() {
        var t = this;
        var size = t.props.size;
        return (
            <canvas className="qrcode" width={size} height={size}></canvas>
        );
    }
});

module.exports = QRCode;