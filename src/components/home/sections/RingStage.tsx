import styles from "./RingStage.module.css";

// A beat with no text: the scene turns the shuttles into a ring.
export function RingStage() {
  return <section data-stage="ring" className={styles.stage} aria-hidden="true" />;
}
