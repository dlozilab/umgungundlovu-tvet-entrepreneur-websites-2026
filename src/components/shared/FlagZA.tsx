import React from "react";
import styles from './FlagZA.modules.css'

interface FlagZAProps {
    size?:number
}

export default function FlagZA({size = 18}:FlagZAProps) {
    return(
        <svg className={(styles as unknown as Record<string, string>).flag} viewBox="0 0 90 60" width={size} height={(size *60) / 90} aria-hidden="true">
            <rect width="90" height="60" fill="#fff"/>
            <path d="M0 0h90v23H36z" fill="#DE3831"/>
            <path d="M0 0v8l36 15h54v-23z" fill="#DE3831"/>
            <path d="M0 60v-8l36-15h54v23z" fill="#002395"/>
            <path d="M0 14l36 12h54v8H36L0 46z" fill="#007749"/>
            <path d="M0 20l30 10L0 40z" fill="#FFB81c"/>
            <path d="M0 24l23 6L0 36z" fill="#000"/>

        </svg>
    )
}

