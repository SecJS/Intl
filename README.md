# Intl 🌏

> Very simple Intl support for NodeJS Applications

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/intl?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/intl?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
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
// { message: 'Hello!, my name is João!' }

// Use forLocale to call for a specific locale in runtime
Sntl.forLocale('pt-br').formatMessage('messages.greeting', { 
  name: 'João',
}) // { message: 'Olá!, meu nome é João!' }

Sntl.forLocale('en-us').formatMessage('messages.greeting', { 
  name: 'João',
}) // { message: 'Hello!, my name is João!' }

// Use changeLocale to change the defaultLocale in runtime
Sntl.changeLocale('pt-br').formatMessage('messages.greeting', { 
  name: 'João',
}) 
// { message: 'Olá!, meu nome é João!' }
```

---

Made with 🖤 by [jlenon7](https://github.com/jlenon7) :wave:
