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
 
 ## Ferramentas
 - [macOS High Sierra 10.13.6](https://itunes.apple.com/la/app/macos-high-sierra/id1246284741?mt=12&ls=1) Usado para construir em ambiente unix e garantir o build da aplicação nos demais ambientes.
 - [Windows 10 Pro 1803](https://www.microsoft.com/pt-br/windows) Ambiente de construção do aplicativo
 - [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/) IDE utilizado em ambos os ambientes mencionados
 - [Github](https://github.com/) Repositório do código-fonte
 - [PostMan](https://www.getpostman.com/apps) Teste dos endpoints da API rest consumida pelo aplicativo


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

# Adicionando suporte ao Google Cloud Firebase
> Porquê escolhemos o *Firebase* frente a serviços como o **AWS API Gateway (Amazon)**
>: Serviços embutidos na plataforma como:
>- Autenticação
>- Banco de dados em tempo real (realtime database)
>- Reporte de erros (Crash Reports)
>- Etc...

São necessários os seguintes passos:
1. Criar uma API REST por meio de funções localmente em Node.js ou javascript (estamos usando Node.js)
2. Publicar as funções no Firebase
3. Acessar por meio de algum cliente REST

#### Instalando

```sh
$ sudo npm install -g firebase-tools
```

#### Efetuando login

> É necessário criar uma conta na plataforma em (https://firebase.google.com/)

Ainda dentro do diretório raiz do projeto, executar o comando:

```sh
$ firebase login
```

Uma janela do browser padrão do seu sistema se abrirá e vc vai fazer login com a conta *Google* usada para criar a conta no *Google Cloud Firebase*. Após o login, vc recebe um feedback tanto no browser quanto no terminal.

#### Configurando localmente o suporte ao Google Cloud Functions

Basta digitar o seguinte comando no terminal:

```sh
$ firebase init functions
```

O Firebase vai solicitar algumas configurações:
> Inicialização do diretório com a estrutura padrão do Cloud Functions
1. Marque *Y* para continuar
> Escolha do projeto padrão (caso não tenha nenhum, marque a opção *create a new project*). Você pode configurar múltiplos em uma mesma conta.
2. Marque o projeto Talk Hawk dev
> Em seguida, será solicitada a linguagem de programação a ser usada nas funções.
3. Escolha *TypeScript*
>Marque **N** para as opções subsequentes

#### Instalando as Dependências NPM

Após concluída a configuração básica, navegue até o diretório **Talk-Hawk/functions/** e digite o comando:

```sh
$ npm install
```

#### Efetuando o Deploy das funções no Firebase

>Sempre que for necessário fazer um deploy, deve-se estar dentro do diretório **Talk-Hawk/functions/**

Execute o comando:

```sh
$ firebase deploy --only functions
```

> Para testar localmente no **Google Chrome**, recomendamos instalar a extensão/plugin [**Allow-Control-Allow-Origin**](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) para evitar problemas com [*CORS*](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
