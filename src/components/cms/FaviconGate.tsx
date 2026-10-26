import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import { selectAuthProfile, signOut } from '../../store/slices/authSlice';
import {
  saveArea,
  selectBusiness,
  selectBusinessId,
  setField,
} from '../../store/slices/siteSlice';
import { useImageUpload } from '../../hooks/useImageUpload';
import { makeFaviconBlob } from '../../utils/makeFavicon';
import { getPublicUrl } from '../../utils/storage';
import { deleteStorageFileBestEffort } from '../../utils/deleteStorageFile';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import styles from './FaviconGate.module.css';

type Phase = 'choose' | 'working' | 'done';

const UPLOAD_ERROR = "We couldn't upload that. Please check your connection and try again.";

export default function FaviconGate() {
  const dispatch = useDispatch<AppDispatch>();
  const business = useSelector(selectBusiness);
  const businessId = useSelector(selectBusinessId);
  const profile = useSelector(selectAuthProfile);
  const { uploadBlob } = useImageUpload();
  const [phase, setPhase] = useState<Phase>('choose');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chooseButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const needsFavicon = Boolean(business && !business.faviconPath && profile?.role === 'owner');
  const open = needsFavicon || phase === 'done';
  const faviconUrl = getPublicUrl(business?.faviconPath || '');

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    chooseButtonRef.current?.focus();

    function trapFocus(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', trapFocus);
    return () => {
      document.removeEventListener('keydown', trapFocus);
      document.body.style.overflow = previousOverflow;
      if (previousFocusRef.current?.isConnected) previousFocusRef.current.focus();
      else document.querySelector<HTMLElement>('main.cmsMain')?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (phase === 'choose') chooseButtonRef.current?.focus();
    else if (phase === 'working') dialogRef.current?.focus();
    else dialogRef.current?.querySelector<HTMLButtonElement>('button:not([disabled])')?.focus();
  }, [open, phase]);

  async function handlePick(file: File) {
    if (!business || !businessId) return;
    setError('');
    setPhase('working');

    try {
      const blob = await makeFaviconBlob(file);
      const result = await uploadBlob(
        blob,
        businessId,
        'branding',
        `favicon-${Date.now()}`,
        'png',
        'image/png'
      );
      if (!result) throw new Error(UPLOAD_ERROR);

      const previousPath = business.faviconPath || '';
      dispatch(setField({ path: 'faviconPath', value: result.path }));
      const saved = await dispatch(
        saveArea({
          businessId,
          area: 'branding',
          patch: { faviconPath: result.path },
        })
      );
      if (!saveArea.fulfilled.match(saved)) {
        dispatch(setField({ path: 'faviconPath', value: previousPath }));
        throw new Error(UPLOAD_ERROR);
      }

      if (previousPath && previousPath !== result.path) {
        void deleteStorageFileBestEffort(previousPath);
      }
      setPhase('done');
    } catch (uploadError: unknown) {
      setError(uploadError instanceof Error && uploadError.message ? uploadError.message : UPLOAD_ERROR);
      setPhase('choose');
    }
  }

  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div
        ref={dialogRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="favicon-gate-title"
        tabIndex={-1}
      >
        <div className={styles.tabPreview} aria-label={`Browser tab preview for ${business?.name || 'your website'}`}>
          <div className={styles.tabIcon}>
            {faviconUrl ? (
              <img src={faviconUrl} alt="" />
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
            )}
          </div>
          <span className={styles.tabName}>{business?.name || 'Your website'}</span>
          <span className={styles.tabClose} aria-hidden="true">×</span>
        </div>

        {phase === 'working' ? (
          <div className={styles.working}>
            <h2 id="favicon-gate-title" className={styles.visuallyHidden}>Uploading your icon</h2>
            <Loader label="Uploading your icon…" />
          </div>
        ) : phase === 'done' ? (
          <>
            <p className={styles.eyebrow}>ONE QUICK STEP</p>
            <h2 id="favicon-gate-title">Your icon is live!</h2>
            <p className={styles.body}>Look at the browser tab. Your picture is there now.</p>
            <img className={styles.largePreview} src={faviconUrl} alt="Your website icon preview" />
            <Button
              variant="solid"
              block
              onClick={() => {
                setPhase('choose');
                setError('');
              }}
            >
              Continue to my dashboard
            </Button>
          </>
        ) : (
          <>
            <p className={styles.eyebrow}>ONE QUICK STEP</p>
            <h2 id="favicon-gate-title">Add your website icon</h2>
            <p className={styles.body}>
              A favicon is the tiny picture that shows on the browser tab, right next to your website name. It also appears when someone saves your site to their phone. It helps customers spot your business at a glance.
            </p>
            <p className={styles.tip}>
              Tip: use a simple, square picture. Your logo works well. Keep it bold, because it will be shown very small.
            </p>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <Button
              variant="solid"
              block
              onClick={() => inputRef.current?.click()}
              ref={chooseButtonRef}
            >
              Choose a picture
            </Button>
            <input
              ref={inputRef}
              className={styles.fileInput}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                event.currentTarget.value = '';
                if (file) void handlePick(file);
              }}
            />
            <p className={styles.footnote}>You can change it any time under Branding.</p>
          </>
        )}

        <button className={styles.signOut} type="button" onClick={() => dispatch(signOut())}>
          Sign out
        </button>
      </div>
    </div>
  );
}
