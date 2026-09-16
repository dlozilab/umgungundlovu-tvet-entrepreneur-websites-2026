import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTones} from '../../src/store/selectors'

export function useBrandTheme() {
    const tones =useSelector(selectTones);

    useEffect(()=>{
         const root = document.documentElement.style;
        root.setProperty('--brand', tones.brand);
        root.setProperty('--brand-on', tones.brandOn);
        root.setProperty('brand-ink', tones.brandInk);
        root.setProperty('brand-mid', tones.brandMid);
        root.setProperty('brand-wash', tones.brandWash);
    }, [tones]
       
    )
}
