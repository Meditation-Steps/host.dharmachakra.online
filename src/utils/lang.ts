import { SUPPORTED_LANGS } from "@/constants/lang.ts";

export type Language = (typeof SUPPORTED_LANGS)[number];

export function isSupportedLang(lang: string | undefined): boolean {
    return SUPPORTED_LANGS.includes(lang as Language);
}
