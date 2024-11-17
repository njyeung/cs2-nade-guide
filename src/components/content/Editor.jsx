import React, { useEffect, useState, useContext} from "react"
import {Col, Row, Container, Button, Card} from "react-bootstrap"

import Annotation from './Annotation'

export default function Editor(props) {

    const [active, setActive] = useState("Quick Create");

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
            <Card>
                <div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus rem dolorem molestias quia nesciunt fugiat reprehenderit commodi eveniet corrupti deserunt!</p>
                </div>
            </Card>
        </Container>
    </div>
}
