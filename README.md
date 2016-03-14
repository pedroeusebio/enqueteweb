# enqueteweb

Para realizar a instalaçao do Projeto sao necessarios alguns passos(manual de instalação para linux) :
    1. Instalar o NodeJS e NPM
      linux : sudo apt-get install nodejs npm
    2. criar link simbolico de nodejs para node :
      sudo  ln -s /usr/bin/nodejs /usr/bin/node
    3. na pasta do projeto instale o babel-cli global:
      sudo npm install -g babel-cli
    4. instale todas as dependencias do projeto :
      npm install 
    5. para iniciar o projeto:
      npm start
    os Arquivos de configuração para o banco de dados serão passados por email, pois sao informações confidenciais.
    Esses dados deverão ser copiados para uma um arquivo .env dentro da pasta do projeto.
    
    
