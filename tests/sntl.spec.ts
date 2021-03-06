import { Sntl } from '../src/Sntl'

describe('\n Sntl', () => {
  beforeAll(async () => {
    await new Sntl().setDefaultLocale('en-us').load()
  })

  it('should be able to format messages using default', async () => {
    const message = Sntl.formatMessage('stub.test', { name: 'João' })

    expect(message).toBe('Hello my name is João!')
  })

  it('should be able to format messages in pt-br', async () => {
    const message = Sntl.forLocale('pt-br').formatMessage('stub.test', {
      name: 'João',
    })

    expect(message).toBe('Olá meu nome é João!')
  })

  it('should be able to change default locale in runtime', async () => {
    Sntl.changeLocale('pt-br')

    const message = Sntl.formatMessage('stub.test', {
      name: 'João',
    })

    expect(message).toBe('Olá meu nome é João!')
  })

  it('should be able to see what is the default locale in Sntl', async () => {
    expect(Sntl.defaultLocale()).toBe('pt-br')
  })

  it('should be able to list all the messages inside the key and pass fields', async () => {
    expect(Sntl.list('stub')).toStrictEqual({
      test: 'Olá meu nome é {{ name }}!',
    })
    expect(Sntl.list('stub', { name: 'João' })).toStrictEqual({
      test: 'Olá meu nome é João!',
    })
    expect(Sntl.forLocale('en-us').list('stub')).toStrictEqual({
      test: 'Hello my name is {{name}}!',
    })
  })

  it('should be able to reload Sntl locales and load it sync', async () => {
    new Sntl().setDefaultLocale('en-us').loadSync()

    const message = Sntl.formatMessage('stub.test', { name: 'João' })

    expect(message).toBe('Hello my name is João!')
  })

  it('should throw errors when cant found the locale', async () => {
    new Sntl().setDefaultLocale('pt-pt').loadSync()

    try {
      Sntl.formatMessage('stub.test', { name: 'João' })
    } catch (error) {
      expect(error.name).toBe('NotFoundException')
      expect(error.status).toBe(404)
      expect(error.content).toBe('Locale pt-pt not found')
      expect(error.isSecJsException).toBe(true)
    }
  })

  it('should throw errors when cant found the key from locale', async () => {
    new Sntl().setDefaultLocale('en-us').loadSync()

    try {
      Sntl.formatMessage('stub.nonexistent', { name: 'João' })
    } catch (error) {
      expect(error.name).toBe('NotFoundException')
      expect(error.status).toBe(404)
      expect(error.content).toBe('Key nonexistent not found in locale en-us')
      expect(error.isSecJsException).toBe(true)
    }
  })
})
