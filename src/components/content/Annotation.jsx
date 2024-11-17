import React from "react"
import { Card, Button, Carousel, Overlay } from "react-bootstrap";

function Annotation(props) {

    const active = props.active
    const images = ["https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200"]
    const styles = {
        card: {display: 'flex', transform: 'scale(95%)', filter: 'brightness(80%)', boxShadow : '2px 2px 12px #141414', background: '#05152d', overflow: 'hidden', flexDirection: 'column', minHeight: '100%', margin: "0.5rem", border:'none', borderRadius: '1rem'},
        cardActive: {boxShadow: '0px 0px 22px rgba(255,140,0,0.33)', transform: 'scale(100%)',border: '1px solid rgb(255,140,0)', filter: 'brightness(1)'},
        image: {width: '100%', filter: 'brightness(80%)'},
        imageActive: {width: '100%', filter: 'brightness(30%)'}
    }
    
    return <Card className="hoverable trans" onClick={()=>props.setActive(props.title)}
    style={active==props.title ? {...styles.card, ...styles.cardActive} : {...styles.card}}>
        <div style={{width: '100%', position: 'relative', textAlign: 'center'}}>
            <Carousel pause={false} controls={false} variant="dark">
                {images.map((img)=> <Carousel.Item>
                    <img style={active==props.title ? {...styles.imageActive} : {...styles.image}} src={img} alt="" />
                </Carousel.Item>)}
            </Carousel>
            <h1 style={{ position: 'absolute', color: "white", top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>{props.title}</h1>
        </div>
        <br/>
        <div style={{flexGrow: 1, padding: "1rem", color:'white'}}>
            <p>{props.content}</p>
        </div>
    </Card>
}


export default Annotation;