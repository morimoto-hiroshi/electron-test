# electron-test

+ Electronでローカルファイルの読み書き

## ローカルディレクトリの構築メモ

### Electronのインストール

```
npm init
npm install --save-dev electron
```

--save-dev オプションは electron の依存関係を dependencies でなく devDependencies に設定する。
```
  "devDependencies": {
    "electron": "^25.2.0"
  }
```
配布用ビルドで dependencies に electron があるとエラーになる。

### package.json の修正

+ "main" を "main.js" に変更。
+ scripts に "start": "electron ." を追加。

```
  "main": "main.js",
  "scripts": {
    "start": "electron .",
  },
```

### 開発モードで実行

+ Electronから起動 isElectron:true
```
npm start
```

+ ブラウザで public/index.html を読み込んだ（エクスプローラで index.html を実行した）場合は isElectron:false で動く。
