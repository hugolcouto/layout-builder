# Hello World!
> Framework para desenvolvimento front-end utilizando pug e sass

![] (https://raw.githubusercontent.com/hugolcouto/layout-builder/master/build/assets/img/open_source_gunter.png)

Este projeto tem como finalidade ajudar no desenvolvimento de páginas estáticas em HTML ou PHP. É uma estrutura simples que agiliza o meu trabalho e pode ser que venha a ser útil para você também :D

## Como funciona
O framework funciona com Pug, Sass e JS com Jquery. A estrutura roda com Gulp e é de fácil personalização. O arquivo `config.json` indica os caminhos de output dos arquivos compilados.

Os diretórios seguem a seguinte estrutura:
- `build`
- `source`
    - `img`
    - `js`
        - `compiled` 
        - `scripts` 
        - `structure`
    - `scss`
        - `base`
        - `components`
        - `layouts`
        - `utils`
        - `vendor`
    - `tmp`
    - `views`
        - `_layout`

1. Todas os arquivos de imagens deve ser colocadas na pasta `./source/img`

2. Arquivos de JavaScript dentro da pasta `./source/js/scripts`
    * A pasta `./source/js/structure` contém os arquivos de abertura e fechamento da tag de JQuery. Os arquivos são concatenados e direcionados para a pasta `./source/js/compiled`. Portanto, os arquivos que vão dentro da pasta structure não necessitam de tags de abertura e fechamento de Jquery. Também é possível utilizar arquivos separados da maneira que melhor lhe conver, pois todos serão compilados em uma única estrutura e, posteriormente, minificado.

3. Arquivos pug deverão ir na pasta `views`
    * O diretório `_layout` comporta a base da página (header e footer). Ela não será direcionada para a pasta build no final do processo. Alterações nesse arquivo pode necessitar uma reinicialização do processo do gulp.
    * Existem duas tags especiais neste framework que foram definidas dentro do arquivo gulpfile para que fique mais prático trabalhar com PHP utilizando este template: `php` e `echo`. A tag `php` será convertida pelo gulp em `<?php ?>` enquanto `echo` será convertida em `<?= ?>`.


