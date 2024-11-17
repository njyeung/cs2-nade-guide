import React, { useEffect, useState, useContext} from "react"
import {Col, Row, Container, Button, Card, Form} from "react-bootstrap"

import Annotation from './Annotation'
import QuickCreatePanel from "./QuickCreatePanel";
import TextPanel from "./TextPanel";
import PositionPanel from "./PositionPanel";

export default function Editor(props) {

    const [active, setActive] = useState("Quick Create");

    function panel() {
        switch(active){
            case 'Quick Create': return <QuickCreatePanel />
            case 'Position': return <PositionPanel/>
            case 'Text': return <TextPanel />
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
            <Card style={{padding: '2rem', color: 'white', backgroundColor: 'rgb(31,41,55)', boxShadow: '2px 2px 12px #141414', borderRadius: '1rem'}}>
                {panel()}
            </Card>
        </Container>
    </div>
}
