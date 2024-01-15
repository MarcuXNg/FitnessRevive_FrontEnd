import {onCLS, onFID, onFCP, onLCP, onTTFB} from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry); // Cumulative Layout Shift (CLS)
    onFID(onPerfEntry); // First Input Delay (FID)
    onFCP(onPerfEntry); // First Contentful Paint (FCP)
    onLCP(onPerfEntry); // Largest Contentful Paint (LCP)
    onTTFB(onPerfEntry); // Time to First Byte (TTFB)
  }
};

export default reportWebVitals;
