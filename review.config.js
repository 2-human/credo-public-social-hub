/* Credo Legal — Harassment LP set · review widget config.
 *
 * Comments persist to the same Firebase Realtime Database used by the Meta Ads
 * preview surface (project credo-712c4). The page-slug rule in review-mode.js
 * derives per-LP buckets from URL pathname, so harassment-LP comments don't
 * collide with the ad-preview's comments — they live under their own
 * `/comments/{pushId}` records with a per-LP `page` field.
 *
 * Each LP variant HTML in this folder loads review-bootstrap.js, so the entry
 * button shows up on every variant + on the review hub itself. Reviewers click
 * the button → ?review=1 → widget loads on that LP. The hub propagates ?review=1
 * into its iframes so opening any LP through the hub enters review mode for the
 * LP as well.
 *
 * Until FIREBASE_CONFIG is filled in, comments are stored in THIS browser only
 * (localStorage) — fine for solo review, but NOT shared.
 */
window.CREDO_REVIEW_CONFIG = {
  FIREBASE_CONFIG: {
    apiKey: "AIzaSyCQvyKmdjRlIBcRW8CbC73Ew9o5uFp9jt0",
    authDomain: "credo-712c4.firebaseapp.com",
    databaseURL: "https://credo-712c4-default-rtdb.firebaseio.com",
    projectId: "credo-712c4",
    storageBucket: "credo-712c4.firebasestorage.app",
    messagingSenderId: "494337801532",
    appId: "1:494337801532:web:298e363efe2ed11807f239"
  },
  REVIEW_LABELS: {
    toggleButton: "Comments",
    toggleButtonTitle: "Open comment review mode",
    bannerTitle: "Review mode · Credo Social Hub",
    localOnly: "Local-only — add Firebase config for shared comments",
    exit: "Exit review",
    sidebarTitle: "Comments",
    empty: "No comments here yet. Hover any post or element and click the + to add one.",
    add: "+ Comment",
    save: "Post comment",
    cancel: "Cancel",
    edit: "Edit",
    del: "Delete",
    resolve: "Resolve",
    reopen: "Reopen",
    tabOpen: "Open",
    tabResolved: "Resolved",
    resolvePrompt: "Resolution note (what was done):",
    placeholder: "Your feedback…",
    replacementPlaceholder: "Suggested change (optional)…",
    namePrompt: "Your name (so the team knows who left this comment):"
  }
};
