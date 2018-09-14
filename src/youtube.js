import React from 'react';
import './index.css';

const API_KEY = 'AIzaSyAOiC3_6ShXGatLS9xqt4iomUTf2vqcyLc';

class Youtube extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: 'Youtube',
            part: 'snippet',
            maxResults: 20,
            videosList: '',
            showLoading: true,
            currentView: 'list'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchYoutube = this.searchYoutube.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    changeView(e) {
        if (this.state.currentView === 'list') {
            this.setState({
                currentView: 'grid'
            });
        } else {
            this.setState({
                currentView: 'list'
            });
        }
    }
    
    componentDidMount() {
        console.log('component did mount');
    }
    searchYoutube() {

        this.setState({
            videoList: 'loading.......'
        });
        var url = new URL("https://www.googleapis.com/youtube/v3/search"),
                params = {
                    part: this.state.part,
                    maxResults: this.state.maxResults,
                    q: this.state.search,
                    key: API_KEY,
                    type: 'video'
                };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        // `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=dota2&key=AIzaSyAOiC3_6ShXGatLS9xqt4iomUTf2vqcyLc&type=video`
        fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(result => {
                    let videoList = result.items.map((video) => {
                        const videoID = video.id.videoId;
                        const videoTitle = video.snippet.title;
                        const videoDescription = video.snippet.description;
                        const url = `https://www.youtube.com/embed/${videoID}`;
                        return (
                                <React.Fragment>
                                <div className="col-md-4">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" src={url} alt={url} title={videoTitle}></iframe>
                                    </div>
                                    <div className="caption">
                                    <div><strong>TITLE : </strong>{videoTitle}</div>
                                        <div><strong>Description : </strong>{videoDescription}</div>                                
                                    </div>
                                </div>
                                </React.Fragment>
                                );
                    });
                    this.setState({
                        showLoading: false,
                        videoList: videoList
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        var displayElement = '';
        if (this.state.currentView === 'grid') {
            displayElement = (<div className="row">
                {this.state.videoList} 
            </div>
                    );
        } else {
            displayElement = this.state.videoList;
        }
        return (
                <React.Fragment>
                    <div>
                        <label>
                            Search:
                        </label>
                            <input className="form-control" type="text" value={this.state.search} name="search" onChange={this.handleInputChange} />
                        <label>
                            Part:
                        </label>
                            <select className="form-control" name="part" value={this.state.part} onChange={this.handleInputChange}>
                                <option value="id">id</option>
                                <option value="snippet">snippet</option>
                                <option value="id, snippet">id, snippet</option>
                            </select>
                        <label>
                            MaxResults:
                        </label>
                            <select className="form-control" value={this.state.maxResults} name="maxResults" onChange={this.handleInputChange}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        <button className="btn btn-success optionsCSS" onClick={this.searchYoutube}>search</button>
                        <button className="btn btn-info optionsCSS" onClick={(e) => this.changeView(e)}>{this.state.currentView}</button>
                    </div>
                    {displayElement}
                </React.Fragment>
                );
    }
}

export default Youtube;