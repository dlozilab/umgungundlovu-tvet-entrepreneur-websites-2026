import { useEffect } from "react";
import { selectMeta } from "../../store/selectors";
import { getPublicUrl } from "../../utils/storage";
import { useSelector } from "react-redux";

export default function MegaTags() {
    const meta = useSelector(selectMeta);

    useEffect(() => {
        if (!meta) return;
        document.title = meta.title;

        const setContent = (id: string, value:string) => {
            const el = document.getElementById(id);
            if (el) el.setAttribute('content', value);
        };
        const setHref = (id: string, value: string) => {
            const el = document.getElementById(id);
            if (el) el.setAttribute('href', value);
        };


        setContent('meta-desc', meta.description);
        setHref('meta-favicon', getPublicUrl(meta.favicon));
        setContent('og-site', meta.title);
        setContent('og-title', meta.title);
        setContent('og-desc', meta.description);
        setContent('og-image', getPublicUrl(meta.ogImage));
        setContent('tw-title', meta.title);
        setContent('tw-desc', meta.description);
        setContent('tw-image', getPublicUrl(meta.ogImage));
    }, [meta]);
    return null;
   
}