import { FEATURES } from "./features";

export function Profile() {
  return (
    <section className="section is-profile">
      <div className="profile_container">
        <div className="padding-global height-100">
          <div className="container-large height-100">
            <div className="padding-section-medium height-100 position-relative">
              <div className="carousel_desc-collection">
                <div role="list" className="carousel_list is-desc">
                  {FEATURES.map(({ tag, title, body }) => (
                    <div key={tag} role="listitem" className="carousel_desc">
                      <div className="max-width-custom">
                        <div className="margin-bottom margin-large hide-tablet">
                          <div className="carousel_title-embed">
                            <div className="heading-style-h2">
                              <span data-anim="chars-mask">{tag}</span>
                            </div>
                          </div>
                        </div>
                        <div className="profile_desc">
                          <div className="corner-left">
                            <div className="icon-embed-xtiny">
                              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 9 9" fill="none">
                                <path d="M0.5 8.5L0.499999 2.5C0.499998 1.39543 1.39543 0.500001 2.5 0.500001L8.5 0.499999" stroke="currentColor" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                          <p data-anim="lines-mask">{`${title} ${body}`}</p>
                          <div className="corner-right">
                            <div className="icon-embed-xtiny">
                              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 9 9" fill="none">
                                <path d="M8.5 0.5L8.5 6.5C8.5 7.60457 7.60457 8.5 6.5 8.5L0.500001 8.5" stroke="currentColor" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
