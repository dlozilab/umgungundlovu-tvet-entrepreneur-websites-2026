type NavItem = {
    label: string;
    href: string;

}
type NavListProps ={
    items: NavItem[];
    onNavigate?: () =>void
}

function NavList({
    items, onNavigate
}: NavListProps) {
    return (
        <nav className="nav-list">
            {items.map((item) => (
                <a key={item.href} href={item.href} onClick={onNavigate}>{item.label} </a>
            ))}
        </nav>
    )
}

export default NavList;