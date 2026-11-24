import { useCallback, useEffect, useId, useRef, useState } from "react";

import { isDesktop } from "@/components/shared/breakpoints";

// Read by the smooth scroll, which holds the page still while the sheet covers it.
const MENU_OPEN_ATTRIBUTE = "data-menu-open";

// While the full-screen sheet is open, the page behind it leaves the tab order and the scroll stops.
function holdPageBehindSheet(menuArea: HTMLElement): () => void {
  const header = menuArea.closest("header");
  const behind = Array.from(header?.parentElement?.children ?? []).filter((element) => element !== header && !element.hasAttribute("inert"));
  behind.forEach((element) => element.setAttribute("inert", ""));
  document.documentElement.setAttribute(MENU_OPEN_ATTRIBUTE, "");
  return () => {
    behind.forEach((element) => element.removeAttribute("inert"));
    document.documentElement.removeAttribute(MENU_OPEN_ATTRIBUTE);
  };
}

// Open state of the top bar menu: a panel under the toggle on desktop, a full-screen sheet below it.
// Escape or a click outside the toggle and menu closes it.
export function useTopBarMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuAreaRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && menuAreaRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("click", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    const menuArea = menuAreaRef.current;
    if (!open || !menuArea || isDesktop()) return;
    return holdPageBehindSheet(menuArea);
  }, [open]);

  const toggle = useCallback(() => setOpen((wasOpen) => !wasOpen), []);

  // The desktop panel stays open after a jump; the sheet gets out of the way of the section it leads to.
  const closeSheetAfterJump = useCallback(() => {
    if (!isDesktop()) setOpen(false);
  }, []);

  return { open, menuId, menuAreaRef, toggleRef, toggle, closeSheetAfterJump };
}
