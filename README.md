# Re:Viewのための空テンプレート


## 執筆環境の構築方法

### 初期セットアップ

```
bundle install
npm install
```

### 各種オペレーション

#### 原稿の新規作成

`book` ディレクトリに新規原稿を作る
```
review-init book
```

※原稿のディレクトリはデフォルトでは `book` ですが、環境変数で変更できます

`articles` ディレクトリ以下の原稿のPDF作成
```
env BOOK_DIR=articles ./node_modules/.bin/gulp pdf
```

#### HTML生成

```
./node_modules/.bin/gulp html
```

→ webroot配下にhtmlが生成される


#### PDF生成 (Texのインストールが必要)

```
./node_modules/.bin/gulp pdf
```

→ book.pdfが生成される

#### textlintの監視の実行

```
./node_modules/.bin/gulp watch
```

#### gulpコマンドまとめ

| 動作 | コマンド |
| --- | --- |
| 構文チェック | gulp textlint |
| 構文チェック(監視) | gulp watch |
| HTML生成 | gulp html |
| PDF生成 | gulp pdf |
| epub生成 | gulp epub |
| text生成 | gulp text |
| LaTex生成 | gulp latex |
| InDesign XML生成 | gulp idxml |
| 生成ファイル削除 | gulp clean |
