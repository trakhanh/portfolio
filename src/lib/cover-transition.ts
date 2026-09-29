/**
 * Shared-element hand-off from a project card to its case study.
 * The card marks the project it opens; the case study checks the mark so its
 * cover skips the fade-in (the view transition already flies it into place),
 * then clears it after mount. Reading and clearing are separate because
 * StrictMode renders state initialisers twice.
 */
let pending: string | null = null;

export const coverName = (id: string) => `cover-${id}`;

export function markCoverTransition(id: string) {
  pending = id;
}

export function isCoverTransition(id: string): boolean {
  return pending === id;
}

export function clearCoverTransition() {
  pending = null;
}
