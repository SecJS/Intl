# Intl 🌏

> Very simple Intl support for NodeJS Applications

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/secjs/intl.svg?style=social&label=Star&maxAge=2592000)](https://github.com/secjs/intl/stargazers/)

<p>
    <a href="https://www.buymeacoffee.com/secjs" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</p>

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/intl?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/intl?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">

  <img alt="Commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always maintain a viable and simple internationalization package to use in any type of `NodeJS Framework`.

<img src=".github/intl.png" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

> To use the high potential from this package you need to install first this other packages from SecJS,
> it keeps as dev dependency because one day `@secjs/core` will install everything once.

```bash
npm install @secjs/contracts @secjs/exceptions @secjs/utils
```

```bash
npm install @secjs/intl
```

## Usage

### Sntl 

> Format messages using json files inside resources/locales folder. Is extremely important to create 
> the folder resources/locales in the project root, and inside you need to create the folders for 
> each language, example: resources/locales/en-us.

> resources/locales/en-us/messages.json
```json
{
  "greeting": "Hello!, my name is {{name}}!"
}
```

> resources/locales/pt-br/messages.json
```json
{
  "greeting": "Olá!, meu nome é {{name}}!"
}
```

```ts
import { Sntl } from '@secjs/intl'

// First set the defaultLocale and call load, 
// to get all files inside resources folder.

// Now you can call Sntl anywhere and use as you want.
await new Sntl.setDefaultLocale('en-us').load()

Sntl.formatMessage('messages.greeting', { name: 'João' }) 
// 'Hello!, my name is João!'

// Use forLocale to call for a specific locale in runtime
Sntl.forLocale('pt-br').formatMessage('messages.greeting', { 
  name: 'João',
}) // 'Olá!, meu nome é João!'

Sntl.forLocale('en-us').formatMessage('messages.greeting', { 
  name: 'João',
}) // 'Hello!, my name is João!'

// Use changeLocale to change the defaultLocale in runtime
Sntl.changeLocale('pt-br').formatMessage('messages.greeting', { 
  name: 'João',
}) 
// 'Olá!, meu nome é João!'

Sntl.forLocale('en-us').formatMessage('messages.greeting', {
  name: 'João',
}) // 'Hello!, my name is João!'

// Use list to get all keys inside the json file
Sntl.list('stub', { name: 'João' }) // { test: 'Hello!, my name is João!' }
```

---

## License

Made with 🖤 by [jlenon7](https://github.com/jlenon7) :wave:
