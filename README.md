# 🌾 Sistema de Descargas

Sistema de controle de ordens de descarga com suporte a **PWA (Progressive Web App)** — pode ser instalado como aplicativo no computador ou celular diretamente pelo navegador.

---

## 📁 Estrutura de arquivos

```
/
├── index.html          ← Sistema principal
├── manifest.json       ← Configuração do PWA
├── service-worker.js   ← Cache offline e instalação
└── icons/
    ├── icon-192.png    ← Ícone do app (192×192)
    └── icon-512.png    ← Ícone do app (512×512)
```

---

## 🚀 Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `sistema-descarga`)
2. Suba todos estes arquivos para a branch `main`
3. Vá em **Settings → Pages**
4. Em **Source**, selecione `Deploy from a branch` → `main` → `/ (root)`
5. Clique em **Save**
6. Aguarde ~1 minuto e acesse: `https://SEU_USUARIO.github.io/sistema-descarga/`

---

## 📲 Como instalar como app

Após abrir o site no navegador:

- **Chrome/Edge no PC**: Clique no ícone de instalação (📥) na barra de endereços
- **Chrome no Android**: Toque em "Adicionar à tela inicial" no menu
- **Safari no iPhone**: Toque em Compartilhar → "Adicionar à Tela de Início"

---

## ✅ Funciona offline

Após a primeira visita, o sistema fica salvo no dispositivo e funciona **sem internet**.
