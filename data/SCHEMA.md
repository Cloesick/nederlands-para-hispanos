# 📐 Schema de uma lição (`data/lessons/*.json`)

```jsonc
{
  "id": "a1-01-kennismaken",          // = nome do arquivo
  "unit": "A1",                        // A1 | A2 | B1 | B2 | C1
  "title": "Se apresentar · Kennismaken",
  "emoji": "👋",
  "infographic": "assets/infographics/x.svg",  // opcional
  "teaching": [                        // 2-4 cards didáticos, HTML simples
    { "emoji": "🎯", "title": "...", "html": "<p>...</p>" }
  ],
  "phrases": [                         // frases-ponte alinhadas por papel
    {
      "nl": [ { "t": "Wat", "r": "qw" }, { "t": "is", "r": "verb" }, ... ],
      "pt": [ { "t": "Qual", "r": "qw" }, { "t": "é", "r": "verb" }, ... ],
      "lit": "glosa literal (opcional)",
      "note": "insight do padrão (opcional)"
    }
  ],
  "vocab": [
    { "nl": "de afspraak", "art": "de", "split": "af (fechado) + spraak (fala)",
      "pt": "compromisso", "emoji": "📅" }
  ],
  "exercises": [
    { "type": "mc",     "q": "...", "options": ["a","b","c"], "answer": 0, "explain": "..." },
    { "type": "listen", "nl": "frase falada", "options": ["...","..."], "answer": 0, "explain": "..." },
    { "type": "fill",   "before": "Ik", "after": "Sofia.", "answer": "heet", "alt": ["ben"], "hint": "...", "explain": "..." },
    { "type": "order",  "pt": "tradução", "tokens": ["na","ordem","certa"], "answer": "na ordem certa", "altAnswers": ["outra ordem certa"], "explain": "..." },
    { "type": "match",  "pairs": [["nl","pt"], ["nl","pt"]], "explain": "..." }
  ]
}
```

## 🎨 Papéis de palavra (`r`) — a ponte de cores

| código | tipo | estilo |
|---|---|---|
| `qw` | palavra interrogativa | roxo itálico |
| `verb` | verbo (inclui particípio/infinitivo) | coral negrito |
| `noun` | substantivo | azul negrito |
| `art` | artigo | cinza |
| `pron` | pronome (inclui "dele", possessivos) | dourado itálico |
| `prep` | preposição | verde sublinhado |
| `adj` | adjetivo | teal itálico |
| `adv` | advérbio (inclui "morgen") | marrom |
| `neg` | negação (niet/geen/não) | vermelho ondulado |
| `num` | número | magenta |
| `conj` | conjunção | cinza-azulado pontilhado |
| `part` | prefixo separável (op, aan...) | laranja tracejado |
| `punc` / `x` | pontuação / outro | sem estilo |

**Regra de ouro:** o mesmo conceito recebe o MESMO papel nas duas línguas. É isso que cria o reconhecimento de padrões.

Regras de exercício: `answer` de mc/listen é índice 0-based; em `order`, `tokens` ficam na ordem CERTA e `answer` = tokens unidos por espaço (o app embaralha sozinho); `altAnswers` (opcional) lista outras ordenações igualmente corretas, como em orações subordinadas neerlandesas onde advérbio e objeto podem trocar de posição; todo exercício tem `explain` em PT-BR.
