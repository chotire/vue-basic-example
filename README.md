# Pre-installed
- [Visual Studio Code](https://code.visualstudio.com/download)
- [node.js](https://nodejs.org/ko/download/)
- [git](https://git-scm.com/downloads)

# Project Setup
## vue cli install
```
npm install -g @vue/cli
```
## vue project create
```
vue create my-project or vue create .
```

## add vuetify
```
vue add vuetify
```
## Proxy
로컬 개발 환경에서 API 서버와 통신하기 위한 Proxy 설정.   
루트 디렉토리에서 vue.config.js 파일에 다음 설정 추가
```
module.exports = {
  ...
  devServer: {
    overlay: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
      },
    },
  },
}
```

## ESLint
루트 디렉토리의 .esringrc.js에 다음 설정을 추가
```
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    "no-console": "off",
    "prettier/prettier": ['error', {
      singleQuote: true,
      semi: true,
      useTabs: false,
      tabWidth: 2,
      trailingComma: 'all',
      printWidth: 500,
      bracketSpacing: true,
      arrowParens: 'avoid',
    }]
  }
};
```

# VSCode Tool Setup
## Extensions
- Auto Close Tag
- Auto Rename Tag
- Debugger for Chrome
- ESLint
- Prettier
- IntelliSense for CSS class names in HTML
- Korean Language Pack for Visual Studio Code
- Live Server
- Material Icon Theme
- Path Intellisense
- Prettier
- Vetur
- Vue Peek
- Vue VSCode Snippets
- Git Lens
- Debugger for Chrome

## ESLint
프로젝트 루트 디렉토리에 `.vscode` 디렉토리를 생성하고 `settings.json` 파일을 생성하고 아래 설정을 적용
```
{
  // ESLint
  "eslint.validate": ["javascript", "html", "vue"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "editor.tokenColorCustomizations": {
    "semanticTokenColorCustomizations": true
  }
}
```

## Debug
프로젝트 루트 디렉토리에 `.vscode` 디렉토리를 생성하고 `launch.json` 파일을 생성하고 아래 설정을 적용
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*"
      }
    }
  ]
}
```

## jsconfig
프로젝트내 참조하는 컴포넌트들의 경로를 절대경로로 쉽게 참조할 수 있도록 루트 디렉토리에 `jsconfig.json` 파일을 생성하고 다음 설정을 적용
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./src/*"
      ],
    }
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```