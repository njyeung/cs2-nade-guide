import React, { useEffect, useState, useContext} from "react"
import {Col, Row, Container, Button, Card, Form} from "react-bootstrap"

import Annotation from './Annotation'

export default function Editor(props) {

    const [active, setActive] = useState("Quick Create");

    function panel() {
        switch(active){
            case 'Quick Create': return <>
                <Form.Label htmlFor="inputPassword5">Label</Form.Label>
                <Form.Control id="inputPassword5"/>
                <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                </Form.Text>
                <Form.Control as="textarea" rows={3} />
            </>
            case 'Position': return <>
            </>
            case 'Text': return <>
                <label>Title</label>
                <input type="text" />
                <label>Body</label>
                <input type="text" />
                <label>Float / Surface</label>
                <Form.Check type="switch" />
                <textarea></textarea>
            </>
            case 'Line': return <>
            </>
            case 'Spot': return <>
            </>
            default: return <></>
        }
    }
    return <div>
        <Container>
            <Row>
                <Col>
                    <Annotation setActive={setActive} active={active} title={"Quick Create"} content={"Quickly create a grenade lineup with position, text, and spot all at once"}></Annotation>
                </Col>
                <Col>
                    <Annotation setActive={setActive} active={active} title={"Position"} content={"Create a standing position at your location"}></Annotation>
                </Col>
                <Col>
                    <Annotation setActive={setActive} active={active} title={"Text"} content={"Create a text opacity where your crosshair is pointed"}></Annotation>
                </Col>
                <Col>
                    <Annotation setActive={setActive} active={active} title={"Line"} content={"Don't know what this does"}></Annotation>
                </Col>
                <Col>
                    <Annotation setActive={setActive} active={active} title={"Spot"} content={"Create a line-up where your crosshair is pointed"}></Annotation>
                </Col>
            </Row>
        </Container>
        <br />
        <br />
        <br />
        <Container>
            <Card style={{padding: '2rem'}}>
                {panel()}
            </Card>
        </Container>
    </div>
}
