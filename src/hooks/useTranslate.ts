import { useRouter } from 'next/router';
import translation from '../static/translation.json';

type Locale = 'en-US' | 'zh-HK';
type Variables = {
  [key: string]: any,
};

export default function useTranslate() {
  const locale = useRouter().locale as Locale;
  const translated = translation[locale] as { readonly [key: string]: string }
  return (key: string, variables?: Variables) => {
    let parsedOutput = translated[key];
    if (!variables || !parsedOutput) return parsedOutput;
    for (let key in variables) {
      parsedOutput = parsedOutput.replaceAll(`{{${key}}}`, variables[key]);
    }
    return parsedOutput;
  };
}