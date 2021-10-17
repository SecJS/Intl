import { parse } from 'path'
import { getFolders } from '@secjs/utils'
import { NotImplementedException } from '@secjs/exceptions'

export class Sntl {
  private static _tempLocale: string
  private static _defaultLocale: string
  private static locales: Map<string, Map<string, any>> = new Map()

  async load() {
    const path = `${process.cwd()}/resources/locales`

    const { folders } = await getFolders(path, true)

    folders.forEach(folder => {
      const filesMap = new Map()

      folder.files.forEach(file => {
        if (typeof file.value !== 'string') return

        filesMap.set(parse(file.name).name, JSON.parse(file.value))
      })

      Sntl.locales.set(folder.path, filesMap)
    })

    return this
  }

  setDefaultLocale(locale: string) {
    Sntl._defaultLocale = locale

    return this
  }

  static changeLocale(locale: string) {
    if (!this.locales.get(locale)) {
      throw new NotImplementedException('LOCALE_NOT_IMPLEMENTED')
    }

    Sntl._defaultLocale = locale

    return this
  }

  static defaultLocale(): string {
    return Sntl._defaultLocale
  }

  static forLocale(locale: string) {
    Sntl._tempLocale = locale

    return this
  }

  static list(key: string, fields?: any) {
    const list = Sntl.locales
      .get(Sntl._tempLocale || Sntl._defaultLocale)
      .get(key)

    if (fields) {
      Object.keys(fields).forEach(k => {
        Object.keys(list).forEach(l => {
          list[l] = list[l].replace(new RegExp(`{{\\s*${k}\\s*}}`), fields[k])
        })
      })
    }

    return list
  }

  static formatMessage(key: string, fields?: any): string {
    const splitedKey = key.split('.')

    const keys = Sntl.locales
      .get(Sntl._tempLocale || Sntl._defaultLocale)
      .get(splitedKey[0])

    splitedKey.shift()

    let message: string = keys[splitedKey.join('.')]

    if (fields) {
      Object.keys(fields).forEach(k => {
        message = message.replace(new RegExp(`{{\\s*${k}\\s*}}`), fields[k])
      })
    }

    Sntl._tempLocale = null

    return message
  }
}
