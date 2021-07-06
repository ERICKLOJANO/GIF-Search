import React, {Component} from 'react';
import swal from 'sweetalert';



class GIFView extends Component {
    constructor(props){
        super(props);

    };

copiedLinkAlert = () => {
    navigator.clipboard.writeText(this.props.embed_url);
    swal({
        text: "Link Copied to Clipboard",
        icon: "success",
        button: false,
    })
}

    render(){
        return(
            <div className = 'gif-item'>
                <img src={this.props.src} onClick = {() => {this.copiedLinkAlert()}} className = 'gif-image'/>
                <div className = 'gif-text'>
                <a href = {this.props.bitly_url} target="_blank" rel="noopener noreferrer" className = 'gif-title'>{this.props.title}</a>
                </div>
            </div>
        )
    }
}

export default GIFView;