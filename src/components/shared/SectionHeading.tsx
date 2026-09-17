import React from "react";
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string;
title: string
}
export default function SectionHeading({eyebrow, title }: SectionHeadingProps) {
  return (
    <>
    {eyebrow && <p className={styles.eyebrow}> {eyebrow}</p>}
    <h2 className={styles.heading}>{title}</h2>
    </>
  )

}
