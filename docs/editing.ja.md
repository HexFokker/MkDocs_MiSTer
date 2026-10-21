---
hide:
  - toc
---

このガイドでは、このドキュメントサイトの編集方法を説明します。wiki ページの編集に似ていますが、いくつか追加のステップがあります。すべての編集は GitHub 上の MkDocs_MiSTer リポジトリーの管理者によって承認されます。

## このドキュメントサイトのページを編集・コントリビュートする方法

まず GitHub アカウントが必要です：

[GitHub にサインアップ](https://github.com/signup){target=_blank}

次に、編集したいページに行き、右上のペンアイコンをクリック：

![Edit this documentation page button](img/contrib1.png)

ドキュメントリポジトリーをフォークします。リポジトリーはプロジェクトのファイルが保管される場所で、フォークは変更を加えられるあなた個人のコピーです。"Fork this Repository" をクリック：

![Fork the repository for this documentation page](img/contrib2.png)

テキストエディターで変更を加えます。[Markdown 記法](https://www.markdownguide.org/cheat-sheet/){target=_blank}に従ってください。エディターの Preview タブは作業の見え方を示しますが、MkDocs 固有のタグや書式（例：リンクを新しいタブで開く `{target=_blank}`）は、サイト上での表示通りには表示されないことがあります：

![Use the markdown editor on GitHub to make your changes](img/contrib3.png)

変更内容とその理由の短い説明を書き、"Propose changes" をクリックしてフォークにコミット：

![Propose the changes to the documentation page](img/contrib4.png)

次にプルリクエストを作成します。リポジトリー管理者にあなたの変更を受け入れてもらうためのリクエストです。まず作業を再確認してください：

![Check your work and click "Create pull request"](img/contrib5.png)

プルリクエストフォームが現れます。管理者に変更をメインリポジトリーへマージしてもらう前の最終確認です。管理者はプルリクエストをレビューし、マージするかクローズします。マージされるとすぐにサイトが更新されるので、すべてが正しいことを確認してください：

![Last chance to check your work, and then click "Create pull request"](img/contrib6.png)

この例では、birdybrain というユーザーがとてもおかしな変更を送ったため、彼のプルリクエストは却下・クローズされました。彼はこれにかなり腹を立てて無礼な返信をしました。birdybrain のようにならないでください。敬意を持ち、目的を理解し、管理者と協力するようにしましょう：

![Be respectful and mindful of the goal of the documentation site](img/contrib7.png)

この方法でページを編集すれば、リポジトリーのフォーク、変更のコミット、GitHub でのプルリクエスト作成の方法が分かったはずです。
