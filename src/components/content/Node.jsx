import React, {useState, useEffect, Component} from "react";
import {Card, Form} from "react-bootstrap"
function Node(props) {
    // props: {
    //     localProps: props for this component 
    //     allNodes: props for all nodes 
    //     updateData: function to update data
    //     k: key
    // }

    const [localProps, setLocalProps] = useState(null)
    const [children, setChildren] = useState(null)

    useEffect(()=>{
        setLocalProps(props.localProps)
        var obj = {}
        Object.keys(props.allNodes).filter((key)=>props.allNodes[key].MasterNodeId == props.localProps.Id).forEach((key)=>obj[key] = props.allNodes[key])
        setChildren(obj)
    }, [])

    useEffect(()=>{
        try{
            var obj = {[props.k]: {...localProps}}
            Object.keys(children).forEach((key)=>obj[key] = children[key])
            props.updateData(obj)
        }
        catch(e) {
            console.log(e)
        }
    }, [localProps])

    return localProps&&localProps.SubType=="main" ? <Card style={styles.card}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'end'}}>
            <h3>{localProps.Title.Text=="" ? "[no title]" : <b>"{localProps.Title.Text}"</b>} &nbsp;</h3>
            <h5>&nbsp; Type: <b>"{localProps.Type}"</b></h5>
        </div>
        <Form.Label>Id: {localProps.Id}</Form.Label>
        <Form.Label>Key: {props.k}</Form.Label>

        <Form.Check id="switch" type="switch" label="Enabled" checked={localProps.Enabled} onChange={()=>setLocalProps((props)=>{return {...props, Enabled: !props.Enabled}})}></Form.Check>
        
        <Form.Label htmlFor="title">Title:</Form.Label>
        <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Title: {...props.Title, Text: e.target.value}}})} 
        value={localProps.Title.Text} id="title" placeholder="none"/>

        <Form.Label htmlFor="description">Description:</Form.Label>
        <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Desc: {...props.Desc, Text: e.target.value}}})} 
        value={localProps.Desc.Text} id="description" placeholder="none"/>

        <br />
        <Form.Check id="switch" type="switch" label="Text Face Player" checked={localProps.TextFacePlayer} onChange={()=>setLocalProps((props)=>{return {...props, TextFacePlayer: !props.TextFacePlayer}})}></Form.Check>
        <Form.Check id="switch" type="switch" label="Reveal On Success" checked={localProps.ReavealOnSuccess} onChange={()=>setLocalProps((props)=>{return {...props, RevealOnSuccess: !props.RevealOnSuccess}})}></Form.Check>

        {Object.keys(children).map((key)=><h2>{children[key].Id}</h2>)}
    </Card> : <></>
}

const styles = {
    card: {
        margin:'1rem', 
        width: '100%', 
        padding: '2rem',
        color: 'white', 
        backgroundColor: 'rgb(31,41,55)', 
        boxShadow: '2px 2px 12px #141414', 
        borderRadius: '1rem',
        alignItems: 'flex-start'
    }
}
export default Node;