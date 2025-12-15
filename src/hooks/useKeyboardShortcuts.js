import { useEffect } from "react";

/**
 * Custom hook for handling keyboard shortcuts in the extension
 * @param {Object} handlers - Object containing handler functions for different shortcuts
 * @param {Function} handlers.onSave - Handler for Ctrl+S (save profile)
 * @param {Function} handlers.onAutofill - Handler for Ctrl+L (autofill form)
 * @param {Array} dependencies - Dependencies array for useEffect
 */
export const useKeyboardShortcuts = (handlers, dependencies = []) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+S or Cmd+S - Save profile
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handlers.onSave?.();
      }

      // Ctrl+L or Cmd+L - Autofill form
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault();
        handlers.onAutofill?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, dependencies);
};
