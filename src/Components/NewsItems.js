import React, { Component } from 'react'

export class NewsItems extends Component {
    
    render() {
        // props
        let { title, description, urlimage, url } = this.props
        return (
            <div className="continer">
                <div className="card" style={{width: "18rem"}}>
                    <img src={urlimage?urlimage:'https://i.stack.imgur.com/6M513.png'} className="card-img-top" alt={urlimage?urlimage:''} />
                    <div className ="card-body">
                    <h5 className ="card-title">{title?title:''}...</h5>
                    <p className ="card-text">{description?description:''}...</p>
                    <a href={url?url:''} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
