/**
 * Detects if the current device is a touch device
 * Works with real devices and Chrome DevTools emulation
 * @returns boolean True if the device supports touch events
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check for standard touch API
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    return true;
  }

  // Check for IE/Edge specific touch detection
  if (navigator && 'msMaxTouchPoints' in navigator) {
    return (navigator as { msMaxTouchPoints?: number }).msMaxTouchPoints! > 0;
  }

  // Check for mobile/tablet user agent (helps with Chrome DevTools emulation)
  const userAgent = navigator.userAgent.toLowerCase();
  if (
    userAgent.includes('android') ||
    userAgent.includes('iphone') ||
    userAgent.includes('ipad') ||
    userAgent.includes('ipod') ||
    userAgent.includes('silk') ||
    userAgent.includes('mobile') ||
    userAgent.includes('tablet')
  ) {
    return true;
  }

  // Check for touch-capable media query (works in some browser emulators)
  if (window.matchMedia && window.matchMedia('(any-pointer: coarse)').matches) {
    return true;
  }

  return false;
}
