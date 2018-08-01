# Talk-Hawk
Talk Halk Ionic app

## Tecnologias
 - **Ionic 3** (Framework de integração entre o Apache Cordova ao Angular 5)
 - **Angular 5** (Framework multiplataforma baseado em Typescript)
 - **Google Cloud Firestore** (Banco de dados no-sql *serveless* baseado em nuvem)
 - **Google Cloud Functions** (Ambiente *serveless* de processamento de funções de back-end fornecido pelo Google Firebase)

 
## Plugins Nativos (Cordova/Phonegap)
 - **Text To Speech** (Sintetiza voz a partir de informação textual)
 - **Speech Recognition** (Utiliza o reconhecimento de voz em aparelhos suportados)
 - **Social Sharing**  (Compartilha conteúdo que pode ser customizado para as redes sociais e meios de compartilhamento presentes no aparelho do usuário)
 
 ## Construindo localmente

 Requerimentos:
 >Desconsidere, em todas as menções à instruções em linha de comando a seguir, o comando *sudo* caso esteja esteja usando **Windows**

 #### *Node.js* (https://nodejs.org/download/)

#### *npm (Node Package Manager, é fornecido junto ao node.js)*

Caso você não possua a ultima versão do npm:
```sh
$ sudo npm install npm -g
```

#### Cordova e Ionic CLI

Você pode instalar ambos o comando a seguir:
```sh
$ sudo npm install cordova ionic -g
```

## Instalando as dependências do projeto

#### Clonando este repositório
Basta executar este comando em seu diretório de trabalho:

**É necessário ter o git previamente instalado (https://git-scm.com/downloads)*

```sh
$ git clone https://github.com/rmacedo88/Talk-Hawk.git
```

#### Instalando as Dependências NPM
Após navegar para o diretório raiz do projeto clonado **~/Talk-Hawk/**, execute o comando a seguir:

```sh
$ npm install
```

#### Instalando os plugins do Apache Cordova e suas dependências

Ainda no diretório raiz do projeto clonado, execute os comandos"

>Android
```sh
$ ionic cordova platform add android
$ ionic cordova run android
```

## Testando localmente no Browser

Após instaladas as dependências, basta executar o comando:

```sh
$ ionic serve
```
