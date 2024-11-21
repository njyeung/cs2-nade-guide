import React, { useEffect, useState, useContext} from "react"
import {Col, Row, Container, Button, Card, Form} from "react-bootstrap"

function TextPanel(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [float, setFloat] = useState(true)
    const [facePlayer, setFacePlayer] = useState(false)

    const [output, setOutput] = useState('annotation_create text "label"')
    
    useEffect(()=>{
        updateOutput()
    }, [title, description, float, facePlayer])

    function updateOutput() {
        setOutput(`annotation_create text "${title ? title : "title"}" "${description ? description : "text"}" ${float==true ? "float" : "surface"} ${facePlayer==true ? "faceplayer" : ""}`)
    }

    function copy(type) {
        var copyText = document.getElementById(type);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    return <>
        <h4>
            Text
        </h4>
        <p>
            Stand at the location, position your cursor where you want the text to be, and paste the following command in the console.
        </p>
        <h4>
            Properties
        </h4>
        <Form.Label htmlFor="title">Text Title</Form.Label>
        <Form.Control placeholder="Window Smoke" onChange={(e)=>setTitle(e.target.value)} value={title} id="title"/>
        <br />
        <Form.Label htmlFor="description">Text Description</Form.Label>
        <Form.Control placeholder="Left click and jump throw" onChange={(e)=>setDescription(e.target.value)} value={description} id="description"/>
        <br />
        <Form.Check id="switch" type="switch" label="Float / Surface" onChange={()=>setFloat((p)=>!p)}></Form.Check>
        <Form.Text style={{color:'white'}}>
            Enable surface for text to be projected on the wall that you are looking at.
        </Form.Text>
        <br />
        <Form.Check id="faceplayer" type="switch" label="Face Player" onChange={()=>setFacePlayer((p)=>!p)}></Form.Check>
        <Form.Text style={{color:'white'}}>
            Enable for text box to always be positioned facing the player.
        </Form.Text>
        <br />
        <h4>
            Output
        </h4>
        <Form.Control id='output' value={output} readOnly={true} as="textarea" rows={3} />
        <Button style={{marginTop: '0.5rem', width: '10rem'}} onClick={()=>copy('output')} variant="success">Click to Copy</Button>
    </> 
}
export default TextPanel