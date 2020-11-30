import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import axios from "axios"
//bootstrap
import {Container, Row, Col, Button, Form} from "react-bootstrap"

const App = () => {
    const [urlToShorten, setUrlToShorten] = useState("")
    const [shortenedUrl, setShortenedUrl] = useState("")
    function createShortenedURL(e){
        e.preventDefault()
        axios.post("/api/preshorten", {url: urlToShorten}).then(snap => {
            setShortenedUrl("http://localhost:3000/short/" + snap.data.shortened)
            console.log(shortenedUrl)
            console.log(snap)
        }).catch(err => console.log(err.message))
    }

    function updateUrlToShorten(e){
        setUrlToShorten(e.target.value)
        console.log(e.target.value)
    }  
    return (
        <div className="app">
            <Container fluid>
                <Row>
                    <Col sm={12} className="center">
                        <div className="title center paddinged">
                            <h1>Shortener!</h1>
                        </div>
                        <div className="shortener-container full-width">
                            <div className="shortener">
                                <form onSubmit={createShortenedURL}>
                                    <input onChange={updateUrlToShorten} placeholder="Paste the url you want to shorten here"/>
                                    <input type="submit" value="Shorten!" className="button margined-top"/>
                                </form>
                            </div>
                            <div className="shortened_url">
                                <h4>{shortenedUrl}</h4>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App;