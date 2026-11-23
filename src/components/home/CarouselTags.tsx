import { FEATURES } from "./features";

export function CarouselTags() {
  return (
    <div className="carousel_tags-wrapper">
      <div className="carousel_tags-collection">
        <div role="list" className="carousel_list is-desc">
          {FEATURES.map(({ tag }) => (
            <div key={tag} role="listitem" className="carousel_tag">
              <div data-anim="chars-mask">{tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
