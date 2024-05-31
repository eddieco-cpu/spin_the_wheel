# 初始化專案

1. vite + ts

```
npm create vite@latest ./ -- --template vanilla-ts
```

```
https://cn.vitejs.dev/guide/
```

2. tailwind css init

```
//安裝依賴
npm install -D tailwindcss postcss autoprefixer
```

```
//初始化 tailwind config, postcss config
npx tailwindcss init -p
```

```
//編輯 tailwind.config
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. 部屬到 github page

參考文章
https://weiyun0912.github.io/Wei-Docusaurus/docs/Vite/Vite-Github-Pages/

```
// 提交前記得都要下 deploy 指令
npm run deploy
```
