import React, { Component } from 'react'
import NewsItems from './NewsItems'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    // First Constructor will run; then render()
    constructor() {
        super();
        console.log("I'm constructor of News.js")

        // hooks: state
        this.state = {
            articles: [],
            loading: false,
            totalResults: 0,
            page: 1
        }
    }

    // componentDidMount => method run after render() methon
    // async -> "await" for data to load
    async componentDidMount() {
        // getting setProgress as props from App.js
        this.props.setProgress(50)

        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b108202f64d14997b0aa800360895453&page=${this.state.page}`

        console.log("CDM")
        this.setState({ loading: true });

        // wait till data get
        let data = await fetch(url)
        // wait till data parse
        let parseddata = await data.json()

        this.props.setProgress(70);

        console.log(parseddata)
        console.log("results", parseddata.totalResults)
        // changing the state object
        this.setState({
            articles: parseddata.articles,
            loading: false,
            totalResults: parseddata.totalResults
        })

        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        //  it will append next page data
        this.setState({ page: this.state.page + 1 })

        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b108202f64d14997b0aa800360895453&page=${this.state.page}`

        console.log("CDM")
        this.setState({ loading: true });

        // wait till data get
        let data = await fetch(url)
        // wait till data parse
        let parseddata = await data.json()
        console.log(parseddata)
        console.log("results", parseddata.totalResults)
        // changing the state object
        // appending the data to articles list
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            loading: false,
            totalResults: parseddata.totalResults
        })

    }


    render() {
        return (
            <div className="container my-3">
                {/* if state.loading is true then only run spinner */}
                {this.state.loading && <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div></div>}
                    style={{ overflow: "hidden" }}>

                    <div className="row">
                        {this.state.articles.map((data, index) => {
                            return <div className="col-md-4 my-3" key={index}>
                                <NewsItems title={data.title} description={data.description} urlimage={data.urlToImage} url={data.url} />
                            </div>
                        })}
                    </div>

                </InfiniteScroll >
            </div>

        )
    }
}

export default News
