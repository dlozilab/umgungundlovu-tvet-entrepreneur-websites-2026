type IconProps = {
    name: string;
    size?: number;
}

function Icon({ name, size=20}: IconProps) {
    const icons: Record<string, string> = {
        menu: "☰",
    close: "X",
    arrow: "→",
    phone: "☎",
    email: "✉",
    location: "⌖",
    whatsapp: "◉",
    check: "✓",
    edit: "✎",
    trash: "🗑",
  }
   

    return(
        <span className="icon" style={{ fontSize:size,}} 
        aria-hidden="true">{icons[name]?? "•"}</span>
    )
 }

 export default Icon;