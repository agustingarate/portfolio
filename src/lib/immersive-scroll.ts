const IMMERSIVE_EVENT = 'scroll-immersive-change';

export function setImmersiveScroll(owner: string, active: boolean) {
  if (active) {
    document.body.dataset.scrollImmersive = owner;
  } else if (document.body.dataset.scrollImmersive === owner) {
    delete document.body.dataset.scrollImmersive;
  }

  window.dispatchEvent(
    new CustomEvent(IMMERSIVE_EVENT, {
      detail: Boolean(document.body.dataset.scrollImmersive),
    }),
  );
}

export function isImmersiveScrollActive() {
  return Boolean(document.body.dataset.scrollImmersive);
}

export { IMMERSIVE_EVENT };
