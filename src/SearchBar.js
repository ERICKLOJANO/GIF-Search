import React, {Component} from'react';
import axios from 'axios';


const InfoAPI = {
    KEY: 'AZ6pMJriyxR3EPcTbZGZHy3wJLGrvnO4',

    get SearchedGIF(){
        return `https://api.giphy.com/v1/gifs/search?q=`;
    },

    get SearchedGIFEnd(){
        return `&api_key=${this.KEY}`;
    },
    
    get Trending(){
        return `https://api.giphy.com/v1/gifs/trending?api_key=${this.KEY}`;
    },

    get Random(){
        return `https://api.giphy.com/v1/gifs/random?api_key=${this.KEY}`
    }

}


class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            gifs: [],
            searchQuery: '',
        };


        //OUR FUNCTIONS
        this.TrendingGIFS = this.trendingGIFS.bind(this);
        this.SearchingGIFS = this.searchingGIFS.bind(this);
        this.RandomGIFS = this.randomGIFS.bind(this);
        this.GetGIFS = this.GetGIFS.bind(this);
        this.SearchQueryChanged = this.SearchQueryChanged.bind(this);
        
    }

    async componentDidMount(){
        this.TrendingGIFS();
    }


    GetGIFS = (link) => {
        axios.get(link).then((results) => {
            let data = results.data.data;
            let URLs = [];
            console.log(results);

            for(const key in data) {
                const url = data[key].images['downsized'].url;
                const title = data[key].title;
                const bitly_url = data[key].bitly_url;
                const embed_url = data[key].embed_url;
                URLs.push({url: url, title: title, bitly_url: bitly_url, embed_url: embed_url});
            }

            this.props.onGifsRequest(URLs);
        });
    };


    searchingGIFS = () => {
        const QUERY = this.state.searchQuery.trim().split(' ').join('+');
        const APISearch = InfoAPI.SearchedGIF + QUERY + InfoAPI.SearchedGIFEnd;
        this.GetGIFS(APISearch);
    };

    trendingGIFS = () => {
        this.GetGIFS(InfoAPI.Trending)
    }

    randomGIFS = () => {
        axios.get(InfoAPI.Random).then((results) => {
            let url = results.data.data.images.downsized.url;
            let title = results.data.data.title;
            let bitly_url = results.data.data.bitly_url;
            let embed_url = results.data.data.embed_url;

            this.props.onGifsRequest([{
                url: url, title: title, bitly_url: bitly_url, embed_url: embed_url
            }])

        })
    }

    SearchQueryChanged(event){
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            this.searchingGIFS();
        }
    }


    render(){
        return(
            <div>
                <div id = 'searchBar'>
                    <input 
                        name = 'searchQuery'
                        type = 'text'
                        placeholder = 'Search Here!'
                        value = {this.state.searchQuery}
                        onChange = {this.SearchQueryChanged}
                        id = 'searchQuery'
                        onKeyPress = {this.handleKeyPress}
                    />

                    <button onClick = {this.searchingGIFS} id = 'searchButton'>
                        SEARCH
                    </button>

                    <div className = "button-group">
                        <button className = "main-buttons" onClick = {this.trendingGIFS}>TRENDING</button>
                        <button className = "main-buttons" onClick = {this.RandomGIFS}>RANDOM</button>
                    </div>

                </div>
            </div>
        )
    }
    
}

export default SearchBar;