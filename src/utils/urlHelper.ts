/**
 * Helper to get the public, unauthenticated shareable URL for students
 */
export function getPublicShareUrl(className?: string, schoolName?: string): string {
  try {
    let origin = window.location.origin;
    
    // In AI Studio environment: ais-dev-* requires developer Google login,
    // whereas ais-pre-* is the public preview accessible by anyone without login.
    if (origin.includes('ais-dev-')) {
      origin = origin.replace('ais-dev-', 'ais-pre-');
    }

    const pathname = window.location.pathname;
    const baseUrl = `${origin}${pathname}`;
    const params = new URLSearchParams();
    
    if (className && className.trim()) {
      params.set('class', className.trim());
    }
    if (schoolName && schoolName.trim() && schoolName.trim() !== 'Trường THPT Châu Thành 2') {
      params.set('school', schoolName.trim());
    }

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  } catch {
    return window.location.href;
  }
}
