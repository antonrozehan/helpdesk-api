import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import path from 'path'

i18next
  .use(Backend)
  .init({
    fallbackLng: 'ru',
    preload: ['ru', 'pl', 'en'],
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/translation.json')
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18next
