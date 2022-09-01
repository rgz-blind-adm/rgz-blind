import { PlayButtonProps } from '../../plugins/gatsby-mdx-tts/SpeechOutput';
import React from 'react'

export const PlayButton: React.FunctionComponent<PlayButtonProps> = props => (
    <button className="button" onClick={props.onClick}>{props.isPlaying ? "Aufhören" : "Vorlesen"}</button>
);