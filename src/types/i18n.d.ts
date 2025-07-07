declare module 'i18n-js' {
  interface I18n {
    t(key: string, config?: any): string;
    locale: string;
    fallbacks: boolean;
    defaultLocale: string;
    translations: Record<string, any>;
  }

  const I18n: I18n;
  export default I18n;
} 