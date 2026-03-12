# Planejador de Vídeos YouTube

Sistema para planejar quais vídeos do YouTube assistir com base no tempo disponível por dia da semana e em uma palavra-chave de busca.

## O que o projeto faz

- **Busca vídeos** no YouTube a partir de uma palavra-chave
- **Mostra as 5 palavras** mais frequentes nos títulos e descrições
- **Exibe a duração** de cada vídeo
- Permite **informar minutos disponíveis** para cada dia da semana (domingo a sábado)
- O usuário pode definir quanto tempo pode assistir em cada dia e usar o sistema para organizar a playlist

## Pré-requisitos

1. **Node.js** (para rodar o servidor de desenvolvimento)
2. **Chave da API do YouTube Data v3** — criar em [Google Cloud Console](https://console.cloud.google.com/)

### Como obter a API key

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto ou selecione um existente
3. Ative a **YouTube Data API v3** (APIs e serviços > Biblioteca)
4. Crie credenciais (APIs e serviços > Credenciais > Criar credenciais > Chave de API)
5. Copie a chave gerada

## Como rodar

### 1. Configurar a API key

Crie ou edite o arquivo `environment.json` na raiz do projeto:

```json
{
  "GOOGLE_API_KEY": "SUA_CHAVE_DA_API_AQUI"
}
```

**Importante:** adicione `environment.json` ao `.gitignore` para não versionar sua chave.

### 2. Instalar e iniciar o servidor

O projeto usa arquivos estáticos e precisa de um servidor para carregar módulos ES e arquivos (evitando problemas de CORS com `file://`).

```bash
npx serve .
```

Ou, se preferir instalar globalmente:

```bash
npm install -g serve
serve .
```

### 3. Acessar a aplicação

Abra no navegador: **http://localhost:3000**

## Estrutura do projeto

```
desafio-js/
├── index.html              # Página principal
├── script.js               # Inicialização da aplicação
├── styles.css              # Estilos
├── environment.json        # Chave da API (não versionar)
├── components/
│   ├── header/             # Formulário (dias da semana + busca)
│   ├── rankingWords/       # Top 5 palavras
│   └── listVideos/         # Lista de vídeos
└── services/
    └── youtubeService.js   # Chamadas à API do YouTube
```

## Tecnologias

- JavaScript (ES Modules)
- YouTube Data API v3
- HTML/CSS (sem framework)
