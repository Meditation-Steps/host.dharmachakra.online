## How to add new locale

1. Add locale files to `./src/locales/NEW_LOCALE_NAME`.
2. Expand SUPPORTED_LANGS array in `./src/constants/lang` by adding NEW_LOCALE_NAME.
3. Add

`import pagesNEW_LOCALE_NAME from "./locales/NEW_LOCALE_NAME/pages.json";`

`import timerNEW_LOCALE_NAME from "./locales/NEW_LOCALE_NAME/timer.json";`

and

`
[LANG_EN]: {
   timer: timerNEW_LOCALE_NAME,
   pages: pagesNEW_LOCALE_NAME,
},
`
to `resources` object in `./src/i18n`.
