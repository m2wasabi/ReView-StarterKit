# Windowsでの環境構築

## Dockerを使ったビルド
Bash
```
docker run --rm -v `pwd`/book:/work -w /work vvakame/review /bin/sh -c "rake pdf"
```

CMD
```
docker run --rm -v "%%CD%%/book:/work" -w /work vvakame/review /bin/sh -c "rake pdf"
```

PowerShell
```
docker run --rm -v (""+$Pwd.Path+"\book:/work") -w /work vvakame/review /bin/sh -c "rake pdf"
```

## Bash on Windowsを使ったビルド
### 1. Bash on Windows のUbuntuを16.04.2に上げる
参考記事:[Bash on Ubuntu on Windows をバージョンアップ(Ubuntu 16.04.2 LTS)](http://my-web-site.iobb.net/~yuki/2017-04/soft-tool/bow/)

Bash on Windowsのバージョン確認
```
uname -a
lsb_release -a
```

Bash on Windowsを入れなおす
```
lxrun /uninstall
lxrun /install
```

bashに入ってパッケージを更新
```
sudo apt update
sudo apt upgrade
```

### 2. Re:Viewの環境をインストールする
参考記事：[Bash on WindowsでFirstStepReVIEW-v2をビルドする](http://qiita.com/atsushieno/items/e87783cfb056f627c4eb)

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt install ruby texlive texlive-latex-extra texlive-binaries texlive-lang-japanese
sudo gem install bundler
npm install
npm run pdf
```