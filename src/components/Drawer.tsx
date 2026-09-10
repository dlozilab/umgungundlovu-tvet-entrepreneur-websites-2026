type DrawerProps = {
    open: boolean;
    onClose: ()=> void
    children: React.ReactNode
}

function Drawer({
    open, onClose, children
}: DrawerProps) {
    if (!open) {
        return null
    }

    return (
        <div className="drawer-backdrop" onClick={onClose}>
            <aside className="drawer" onClick={(event) => event.stopPropagation()}>
                <button className="drawer-close" onClick={onClose} aria-label="Close Menu">X</button>
                {children}
                </aside> </div>
    )
}

export default Drawer