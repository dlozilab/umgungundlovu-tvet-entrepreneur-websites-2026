import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import Field from "../../components/shared/Field";
import SaveBar from "../../components/shared/SaveBar";
import { selectBusiness, selectBusinessId, setField, saveArea, selectSiteDirty } from "../../store/slices/siteSlice";
import { flashToast } from "../../store/slices/uiSlice";

export default function BusinessDetialsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const business = useSelector(selectBusiness);
    const dirty = useSelector(selectSiteDirty);
    const businessId = useSelector(selectBusinessId);
    const [saving, setSaving] = useState(false);

    if (!business || !businessId) return null;

    async function handleSave() {
        setSaving(true);
        const result = await dispatch(
            saveArea({
                businessId: businessId!, area: 'details', patch: {name: business!.name, headline:business!.headline, description: business!.description},

            })
        );
        setSaving(false);
        if (saveArea.fulfilled.match(result)) dispatch(flashToast('Saved'));
        else dispatch(flashToast('Could not save'));
        
    }
    return (
        <section>
            <h2> Business Detials</h2>
            <p>Your name and the words at the top of the home page..</p>
            <Field label="Business" value={business.name} onChange={(v) => dispatch(setField({path: 'name', value: v}))}/>
            <Field label="Headline"
            hint="The big sentence on your homepage"
            value={business.headline}
            onChange={(v) => dispatch(setField({path: 'headline', value:v}))}/>
            <Field label="Short Description"
            type="textarea"
            hint="Also used when someone shares your link on whatsapp"
            value={business.description}
            onChange={(v)=> dispatch(setField({path: 'description', value: v}))}/>

            <SaveBar onSave={handleSave} saving={saving} dirty={dirty}/>
        </section>
    )
}