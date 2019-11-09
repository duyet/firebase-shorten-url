const gtagTrack = (eventCategory, eventAction, eventLabel, data) => {
  if (typeof window === 'undefined') return;
  if (!('gtag' in window)) return;
  window.gtag('event', eventAction, {
    event_category: eventCategory,
    event_label: eventLabel,
    ...data,
  });
};

export default gtagTrack;
