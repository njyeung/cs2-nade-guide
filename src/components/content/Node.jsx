import React, {useState, useEffect, Component, memo} from "react";
import {Card, Form, Accordion} from "react-bootstrap"
import { SketchPicker } from 'react-color'

function Node(props) {

    // props: {
    //     ...localProps: props for this component 
    //
    //     allNodes: props for all nodes 
    //     updateData: function to update data
    //     k: key
    //     advanced: bool to toggle advanced options
    //     view: 'list' or 'grid'
    // }

    const [localProps, setLocalProps] = useState(null)
    const [children, setChildren] = useState({})
    const [imgSrc, setImgSrc] = useState('')

    useEffect(()=>{
        setLocalProps(props.localProps)
        var obj = {}
        Object.keys(props.allNodes).filter((key)=>props.allNodes[key].MasterNodeId == props.localProps.Id).forEach((key)=>obj[key] = props.allNodes[key])
        setChildren(obj)
    }, [])

    useEffect(()=>{
        try{
            var obj = {[props.k]: {...localProps}}
            if(children!=null) {
                Object.keys(children).forEach((key)=>obj[key] = children[key])
            }
            props.updateData(obj)

            if(localProps.Type.toLowerCase() == 'grenade') {
                setImgSrc(`./images/quickcreate2.jpg`)
            }
            if(localProps.Type.toLowerCase() == 'spot') {
                setImgSrc(`./images/spot1.jpg`)
            }
            if(localProps.Type.toLowerCase() == 'position') {
                setImgSrc(`./images/position1.jpg`)
            }
            if(localProps.Type.toLowerCase() == 'text') {
                setImgSrc(`./images/text3.jpg`)
            }
            if(localProps.Type.toLowerCase() == 'line') {
                setImgSrc(`./images/line2.jpg`)
            }
        }
        catch(e) {
            // type is prolly null
        }

    }, [localProps])

    function rgbArrToJson(arr) {
        return {
            r: Math.floor(arr[0]),
            g: Math.floor(arr[1]),
            b: Math.floor(arr[2])
          };
    }
    function rgbArrToCss(arr) {
        return `rgb(${Math.floor(arr[0])}, ${Math.floor(arr[1])}, ${Math.floor(arr[2])})`
    }
    function changeColor(color) {
        setLocalProps((props)=>{
            return {...props, Color: [Number(color.rgb.r), Number(color.rgb.g), Number(color.rgb.b)]}
        })
    }

    // TODO: FIX HTML ID ISSUE
    // TODO: Add Horizontal align property to parent and child nodes

    return localProps ? <Card style={!localProps.Enabled ? {...styles.card, filter: 'brightness(70%)'} : {...styles.card}}>
        { props.view=='list' ? 
            <img style={{position: 'absolute', right: '0%', top: '0%', width: '150px', margin: '1rem', borderRadius: '1rem'}} src={imgSrc} alt={`image of ${localProps.Type}`} />
            :<></>
        }
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'end'}}>
            <h3 style={{color: 'rgb(255,140,0)'}}>{localProps.Title.Text=="" ? "[no title]" : <b>"{localProps.Title.Text}"</b>} &nbsp;</h3>
            <h5>&nbsp; Type: <b>"{localProps.Type}"</b></h5>
            
        </div>
        <Form.Label style={{color: 'lightgray'}}>Id: {localProps.Id}</Form.Label>
        <Form.Label style={{color: 'lightgray'}}>Key: {props.k}</Form.Label>

        <Form.Check id="switch" type="switch" label="Enabled" checked={localProps.Enabled} onChange={()=>setLocalProps((props)=>{return {...props, Enabled: !props.Enabled}})}></Form.Check>
        
        <br />

        <Form.Label htmlFor="title">Title:</Form.Label>
        <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Title: {...props.Title, Text: e.target.value}}})} 
        value={localProps.Title.Text} id="title" placeholder="none"/>
        
        { // Advanced settings for title
            props.advanced ? <div style={{width: '100%', paddingLeft: '2rem'}}>
            <Form.Label htmlFor="titleFontSize">Title Font Size:</Form.Label>
            <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Title: {...props.Title, FontSize: Number(e.target.value)}}})} 
            value={localProps.Title.FontSize} id="titleFontSize" type="number" placeholder="none"/>

            <Form.Label htmlFor="titleFadeIn">Title Fade In Distance:</Form.Label>
            <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Title: {...props.Title, FadeInDist: Number(e.target.value)}}})} 
            value={localProps.Title.FadeInDist} id="titleFadeIn" type="number" placeholder="none"/>
    
            <Form.Label htmlFor="titleFadeOut">Title Fade Out Distance:</Form.Label>
            <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Title: {...props.Title, FadeOutDist: Number(e.target.value)}}})} 
            value={localProps.Title.FadeOutDist} id="titleFadeOut" type="number" placeholder="none"/>
            </div> : <></>
        }

        <Form.Label htmlFor="description">Description:</Form.Label>
        <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Desc: {...props.Desc, Text: e.target.value}}})} 
        value={localProps.Desc.Text} id="description" placeholder="none"/>

        { // Advanced settings for description
            props.advanced ? <div style={{width: '100%', paddingLeft: '2rem'}}>
            <Form.Label htmlFor="descFontSize">Description Font Size:</Form.Label>
            <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Desc: {...props.Desc, FontSize: Number(e.target.value)}}})} 
            value={localProps.Desc.FontSize} id="descFontSize" type="number" placeholder="none"/>

            <Form.Label htmlFor="descFadeIn">Description Fade In Distance:</Form.Label>
            <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Desc: {...props.Desc, FadeInDist: Number(e.target.value)}}})} 
            value={localProps.Desc.FadeInDist} id="descFadeIn" type="number" placeholder="none"/>
    
            <Form.Label htmlFor="descFadeOut">Description Fade Out Distance:</Form.Label>
            <Form.Control onChange={(e)=>setLocalProps((props)=>{return {...props, Desc: {...props.Desc, FadeOutDist: Number(e.target.value)}}})} 
            value={localProps.Desc.FadeOutDist} id="descFadeOut" type="number" placeholder="none"/>
            </div> : <></>
        }
        <br />
        {
            localProps.Color!=undefined ? <>
                <Form.Label>Text Color: </Form.Label>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <SketchPicker color={rgbArrToJson(localProps.Color)}
                    onChange={changeColor} disableAlpha={true}/> 
                    { localProps.Title.Text!='' || localProps.Desc.Text!='' ?
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '1rem', textAlign: 'center'}}>
                            <h5>Preview: </h5>
                            <div style={{padding: '0.5rem', maxWidth: '20rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', textAlign: 'center'}}>
                                <h6 style={{color: rgbArrToCss(localProps.Color)}}>{localProps.Title.Text}</h6>     
                                <p style={{color: rgbArrToCss(localProps.Color)}}>{localProps.Desc.Text}</p>    
                            </div>
                        </div> : <></>
                    }
                </div>
            </>
            : <></>
        }
        <br />

        <Form.Check type="switch" label="Text Face Player" checked={localProps.TextFacePlayer} onChange={()=>setLocalProps((props)=>{return {...props, TextFacePlayer: !props.TextFacePlayer}})}></Form.Check>
        <Form.Check type="switch" label="Reveal On Success" checked={localProps.ReavealOnSuccess} onChange={()=>setLocalProps((props)=>{return {...props, RevealOnSuccess: !props.RevealOnSuccess}})}></Form.Check>
        {localProps.JumpThrow!=undefined ? <Form.Check type="switch" label="JumpThrow" checked={localProps.JumpThrow} onChange={()=>setLocalProps((props)=>{return {...props, JumpThrow: !props.JumpThrow}})}></Form.Check> : <></>}  

        { 
            Object.keys(children).length>0 ?
            <>
                <br />
                <h5>Children Nodes:</h5> 
            </>  
            : <></>
        } 
        
        <Accordion data-bs-theme="dark" style={{width: '100%'}} alwaysOpen>
            {Object.keys(children).map((key)=>
            <Accordion.Item key={key} eventKey={key} >
                <Accordion.Header> 
                    {children[key].Title.Text=="" ? "[no title]" : <b>"{children[key].Title.Text}"</b>}
                    &nbsp;
                    SubType:&nbsp;<b>{children[key].SubType}</b>
                </Accordion.Header>
                <Accordion.Body style={{display: 'flex', flexDirection: 'column'}}>
                    <Form.Label style={{color: 'lightgray'}}>Id: {children[key].Id}</Form.Label>
                    <Form.Label style={{color: 'lightgray'}}>Key: {key}</Form.Label>
                    <Form.Check id="switch" type="switch" label="Enabled" checked={children[key].Enabled} onChange={()=>setChildren((props)=>{
                        return {...props, [key]: {...props[key], Enabled: !props[key].Enabled}}
                    })}></Form.Check>
        
                    <Form.Label htmlFor="title">Title:</Form.Label>
                    <Form.Control onChange={(e)=>setChildren((props)=>{
                        return {...props, [key]: {...props[key], Title: {...props[key].Title, Text: e.target.value}}} // wtf is this shit
                    })} 
                    value={children[key].Title.Text} id="title" placeholder="none"/>

                    { // Advanced settings for child's title
                        props.advanced ? <div style={{width: '100%', paddingLeft: '2rem'}}>
                        <Form.Label htmlFor="childTitleFontSize">Title Font Size:</Form.Label>
                        <Form.Control onChange={(e)=>setChildren((props)=>{
                            return {...props, [key]: {...props[key], Title: {...props[key].Title, FontSize: Number(e.target.value)}}}
                        })} 
                        value={children[key].Title.FontSize} id="childTitleFontSize" type="number" placeholder="none"/>

                        <Form.Label htmlFor="childTitleFadeIn">Title Fade In Distance:</Form.Label>
                        <Form.Control onChange={(e)=>setChildren((props)=>{
                            return {...props, [key]: {...props[key], Title: {...props[key].Title, FadeInDist: Number(e.target.value)}}}
                        })} 
                        value={children[key].Title.FadeInDist} id="childTitleFadeIn" type="number" placeholder="none"/>
                
                        <Form.Label htmlFor="childTitleFadeOut">Title Fade Out Distance:</Form.Label>
                        <Form.Control onChange={(e)=>setChildren((props)=>{
                            return {...props, [key]: {...props[key], Title: {...props[key].Title, FadeOutDist: Number(e.target.value)}}}
                        })} 
                        value={children[key].Title.FadeOutDist} id="childTitleFadeOut" type="number" placeholder="none"/>
                        </div> : <></>
                    }

                    <Form.Label htmlFor="description">Description:</Form.Label>
                    <Form.Control onChange={(e)=>setChildren((props)=>{
                        return {...props, [key]: {...props[key], Desc: {...props[key].Desc, Text: e.target.value}}}
                    })}
                    value={children[key].Desc.Text} id="description" placeholder="none"/>

                    { // Advanced settings for child's description
                        props.advanced ? <div style={{width: '100%', paddingLeft: '2rem'}}>
                        <Form.Label htmlFor="childDescriptionFontSize">Description Font Size:</Form.Label>
                        <Form.Control onChange={(e)=>setChildren((props)=>{
                            return {...props, [key]: {...props[key], Desc: {...props[key].Desc, FontSize: Number(e.target.value)}}}
                        })} 
                        value={children[key].Desc.FontSize} id="childDescriptionFontSize" type="number" placeholder="none"/>

                        <Form.Label htmlFor="childDescriptionFadeIn">Description Fade In Distance:</Form.Label>
                        <Form.Control onChange={(e)=>setChildren((props)=>{
                            return {...props, [key]: {...props[key], Desc: {...props[key].Desc, FadeInDist: Number(e.target.value)}}}
                        })} 
                        value={children[key].Desc.FadeInDist} id="childDescriptionFadeIn" type="number" placeholder="none"/>
                
                        <Form.Label htmlFor="childDescriptionFadeOut">Description Fade Out Distance:</Form.Label>
                        <Form.Control onChange={(e)=>setChildren((props)=>{
                            return {...props, [key]: {...props[key], Desc: {...props[key].Desc, FadeOutDist: Number(e.target.value)}}}
                        })} 
                        value={children[key].Desc.FadeOutDist} id="childDescriptionFadeOut" type="number" placeholder="none"/>
                        </div> : <></>
                    }

                    <br />

                    <Form.Check type="switch" label="Text Face Player" checked={children[key].TextFacePlayer} onChange={()=>setChildren((props)=>{
                        return {...props, [key]: {...props[key], TextFacePlayer: !props[key].TextFacePlayer}}
                    })}></Form.Check>
                    <Form.Check type="switch" label="Reveal On Success" checked={children[key].ReavealOnSuccess} onChange={()=>setChildren((props)=>{
                        return {...props, [key]: {...props[key], RevealOnSuccess: !props[key].RevealOnSuccess}}
                    })}></Form.Check>
                </Accordion.Body>
            </Accordion.Item>
            )}
        </Accordion>
    </Card> : <></>
}

const styles = {
    card: {
        margin:'0.5rem', 
        padding: '2rem',
        color: 'white', 
        backgroundColor: 'rgb(31,41,55)', 
        boxShadow: '2px 2px 12px #141414', 
        borderRadius: '1rem',
        alignItems: 'flex-start'
    }
}
export default memo(Node);