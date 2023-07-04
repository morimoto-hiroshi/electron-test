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

+ ブラウザで index.html を直接読み込んだ場合（エクスプローラで index.html を実行した場合）は isElectron:false で動く。

## 配布用パッケージ作成

### package.json の修正

+ author と description を記述する。空欄だと make エラーになる。

### ビルド

```
npm install --save-dev @electron-forge/cli
npx electron-forge import
npm run make
```

+ なお .gitignore があれば、出力ディレクトリ out/ を自動で追記してくれる。

+ out/make/squirrel.windows/x64/electron-test-1.0.0 Setup.exe が生成されている。

+ Setup.exe を実行すると /Users/{username}/AppData/Local/electron_test/app-1.0.0/electron-test.exe として展開され実行される。

+ コントロールパネル＞プログラムと機能 に electron-test が表示され、アンインストールできる。

## 参考

+ [Electron 公式 - クイックスタート](https://www.electronjs.org/ja/docs/latest/tutorial/quick-start)
+ [Zenn Electron入門 - メインプロセスとレンダラープロセス](https://zenn.dev/sprout2000/books/6f6a0bf2fd301c/viewer/13319)
