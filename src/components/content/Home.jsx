import React, { memo } from "react"
import { Container, Button } from "react-bootstrap";

function Home () {
    function copy(type) {
        var copyText = document.getElementById(type);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    return <Container style={{color: 'white'}}>
        <h1>CS2 Nade Guide Helper Tool</h1>
        <p>This is a project to help users easily create nade guide maps. Just visit <a href="/editor">the helper tool</a> if you're 
        ready to start generating console commands for your nade lineups, or keep reading for a step by step guide!</p>
        <h2>Setting up</h2>
        <p>Join a practice map of your choice and paste the following starter commands in your terminal:</p>
        <textarea id="command1" style={{width: '100%', height: 'auto'}} contentEditable={false} value="sv_cheats 1;mp_maxmoney 65535;mp_startmoney 65535;bot_kick;sv_infinite_ammo 1;mp_freezetime 0;mp_roundtime 60;mp_roundtime_defuse 60;mp_roundtime_hostage 60;mp_buytime 60000;mp_buy_anywhere 1;sv_showimpacts 1;sv_grenade_trajectory_prac_pipreview true;sv_grenade_trajectory_prac_trailtime 10;sv_grenade_trajectory_time_spectator 10;sv_allow_annotations true;annotation_clear;mp_restartgame 1;"></textarea>
        <Button onClick={()=>copy('command1')} style={{marginBottom: '0.5rem'}} variant="success">Click to Copy</Button>
        <p>After your server restarts, paste these commands in the terminal to quickly obtain your grenades:</p>
        <textarea id="command2" style={{width: '100%', height: 'auto'}} contentEditable={false} value="give weapon_ak47;give weapon_smokegrenade;give weapon_molotov;give weapon_flashbang;give weapon_hegrenade;"></textarea>
        <Button onClick={()=>copy('command2')} style={{marginBottom: '0.5rem'}}  variant="success">Click to Copy</Button>
        <p>Now you're ready to head over to <a href="/editor">the tool page</a>!</p>
        <h2>Saving your guide</h2>
        <p>In the terminal, type annotation_save followed by the file name you want to save your guide:</p>
        <textarea style={{width: '100%', height: 'auto'}} value="annotation_save [file name]"></textarea>
        <p>Then, visit your annotations directory in <b>C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\annotations</b> to retreive your file</p>
        <h4>Additional</h4>
        <p>You may also edit your annotation file and add throwing instructions directly, as it is a .txt file!</p>
    </Container>
}

export default memo(Home);
