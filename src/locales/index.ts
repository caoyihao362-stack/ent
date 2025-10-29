import { zhCN } from './zh-CN';
import { zhTW } from './zh-TW';
import { en } from './en';

export type Language = 'zh-CN' | 'zh-TW' | 'en';

export const translations = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
};

export type TranslationKeys = typeof zhCN;
