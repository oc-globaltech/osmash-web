import { closestIndex } from "./math";
import { isMobileWidth } from "./deviceProfile";

// Desktop snaps only between the hero and the next section; mobile pages through the first six.
const DESKTOP_SNAP_COUNT = 2;
const MOBILE_SNAP_COUNT = 6;

export type SectionBand = { top: number; height: number; snap: boolean };

// Page sections stacked top to bottom, measured from the DOM.
export class Sections {
  items: SectionBand[] = [];

  measure(): void {
    const snapCount = isMobileWidth() ? MOBILE_SNAP_COUNT : DESKTOP_SNAP_COUNT;
    let top = 0;
    this.items = [...document.querySelectorAll("section")].map((el, i) => {
      const band = { top, height: el.clientHeight, snap: i < snapCount };
      top += el.clientHeight;
      return band;
    });
  }

  closestTo(position: number): number {
    return closestIndex(
      this.items.map(({ top }) => top),
      position,
    );
  }

  get first(): SectionBand {
    return this.items[0];
  }

  get second(): SectionBand {
    return this.items[1];
  }
}
