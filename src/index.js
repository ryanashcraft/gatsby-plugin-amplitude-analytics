import React from "react"
import PropTypes from "prop-types"

const NEWTAB = '_blank';
const MIDDLE_CLICK = 1;

function OutboundLink({ eventType, eventProperties, href, target, onClick, children, ...rest }) {
  const handleClick = e => {
    const amplitudeEventType = eventType || window.amplitudeEventTypes.outboundLinkClick;
    const amplitudeProperties = Object.assign({ href: href }, eventProperties);
    const sameTarget = target !== NEWTAB;
    const normalClick = !(e.ctrlKey || e.shiftKey || e.metaKey || e.button === MIDDLE_CLICK);

    if (sameTarget && normalClick) {
      e.preventDefault();
      window.amplitude.getInstance().logEvent(amplitudeEventType, amplitudeProperties, () => {
        window.location.href = href;
      });
    } else {
      window.amplitude.getInstance().logEvent(amplitudeEventType, amplitudeProperties);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a href={href} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

OutboundLink.propTypes = {
  eventName: Proptypes.string,
  eventProperties: Proptypes.any,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.element,
}

export { OutboundLink }
