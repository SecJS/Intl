import { Folder, Path } from '@secjs/utils'
import { NotFoundException, NotImplementedException } from "@secjs/exceptions";

export class Sntl {
  private static _tempLocale: string
  private static _defaultLocale: string
  private static locales: Map<string, Map<string, any>> = new Map()

  constructor() {
    Sntl.locales.clear()
    Sntl._tempLocale = null
    Sntl._defaultLocale = null
  }

  async load() {
    const path = Path.locales()

    const { folders } = await new Folder(path).load({ withFileContent: true })

    folders.forEach(folder => {
      const filesMap = new Map()

      folder.files.forEach(f => {
        filesMap.set(f.name, JSON.parse(f.content.toString()))
      })

      Sntl.locales.set(folder.name, filesMap)
    })

    return this
  }

  loadSync() {
    const path = Path.locales()

    const { folders } = new Folder(path).loadSync({ withFileContent: true })

    folders.forEach(folder => {
      const filesMap = new Map()

      folder.files.forEach(f => {
        filesMap.set(f.name, JSON.parse(f.content.toString()))
      })

      Sntl.locales.set(folder.name, filesMap)
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
    const locale = Sntl.locales.get(Sntl._tempLocale || Sntl._defaultLocale)

    if (!locale) {
      throw new NotFoundException(
        `Locale ${Sntl._tempLocale || Sntl._defaultLocale} not found`,
      )
    }

    const list = locale.get(key)

    if (!list) {
      throw new NotFoundException(
        `Key ${key} not found in ${Sntl._tempLocale || Sntl._defaultLocale}`,
      )
    }

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

    const locale = Sntl.locales.get(Sntl._tempLocale || Sntl._defaultLocale)

    if (!locale) {
      throw new NotFoundException(
        `Locale ${Sntl._tempLocale || Sntl._defaultLocale} not found`,
      )
    }

    const keys = locale.get(splitedKey[0])

    if (!keys) {
      throw new NotFoundException(
        `File ${splitedKey[0]} not found in locale ${
          Sntl._tempLocale || Sntl._defaultLocale
        }`,
      )
    }

    splitedKey.shift()

    let message: string = keys[splitedKey.join('.')]

    if (!message) {
      throw new NotFoundException(
        `Key ${splitedKey.join('.')} not found in locale ${
          Sntl._tempLocale || Sntl._defaultLocale
        }`,
      )
    }

    if (fields) {
      Object.keys(fields).forEach(k => {
        message = message.replace(new RegExp(`{{\\s*${k}\\s*}}`), fields[k])
      })
    }

    Sntl._tempLocale = null

    return message
  }
}
