import React, {Component} from 'react';
import GIFView from './GIFView';

class GIFLayout extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const GIFNums = this.props.GIFNums;

        return(
            <div className = 'gif-layout'>
                {this.props.gifs.map((gif, i) =>
                i < GIFNums ? (
                    <GIFView key = {i} title = {gif.title} src = {gif.url} bitly_url = {gif.bitly_url} embed_url = {gif.embed_url}/>
                ) : ('')
                )}
            </div>
        );
    }
}

export default GIFLayout;