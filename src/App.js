import React, {Component} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import GIFLayout from './GIFLayout'

class App extends Component {
    constructor(props){
      super(props);

      this.state = {
        gifs: [],
        GIFNums: 24,
      };

      this.displayGIF = this.displayGIF.bind(this);
      // this.changeGIFNum = this.changeGIFNum.bind(this);
    }

    displayGIF = (gifs) => {
      this.setState({gifs: gifs });
    };

    // changeGIFNum = (n) => {
    //   const currentVal = this.state.GIFNums;
    //   const futureVal = currentVal + n;

    //   if(futureVal > 1 && futureVal < 50){
    //     this.setState({GIFNums: futureVal});
    //   }
    //   else if(futureVal >= 50){
    //     this.setState({GIFNums: 50});
    //   }
    // };


    render(){
      return (
        <div>
          <h1>GIF SEARCH</h1>
          <h2 className = "name-text">by <a className="name-link" href="http://linkedin.com/in/ericklojano">Erick Lojano</a></h2>
          <div className = "smalltext">
          <p className = "smalltext-left">Click on GIFs to copy their embed link and share with friends!</p>
          <p className = "smalltext-right">Click on GIF titles to view the GIF on the GIPHY site</p>
          </div>
          <SearchBar 
            onGifsRequest = {this.displayGIF}
            changeGIFNum = {this.changeGIFNum}
          />
          <div className = 'GIF-shown'>
            {/* <p>Showing {this.state.GIFNums} GIFs</p> */}
          </div>

          <GIFLayout GIFNums = {this.state.GIFNums} gifs = {this.state.gifs}/>
        </div>
      );
    }
}

export default App;
