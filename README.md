# PreviewFlow

![PreviewFlow Banner](/src/assets/preview-flow-logo.png)

O PreviewFlow é um visualizador de mídias sociais multiplataforma baseado na web, voltado para agências de marketing, social media managers e designers. Ele permite visualizar exatamente como o seu conteúdo (imagens e textos) vai aparecer em diferentes redes sociais (Instagram, LinkedIn, X/Twitter) *antes* de ir ao ar.

---

## 📖 O Problema que Identificamos

Nas agências de marketing, criar conteúdo para mídias sociais é um processo colaborativo e de alto risco. No entanto, um dos maiores pontos de dor que frequentemente interrompe o fluxo de trabalho é: **a ansiedade do "postar e deletar"**.

Ao preparar posts para múltiplas plataformas (ex.: feed quadrado/retrato do Instagram, feed para desktop do LinkedIn, feed mobile do X), é muito difícil prever com precisão como será o visual final. O texto acaba cortado de surpresa atrás do botão "Ver Mais", partes importantes da imagem sofrem cortes acidentais e as zonas de segurança são frequentemente violadas.

**Por que isso importa?** Porque a mídia social é a vitrine principal de uma marca. Um corte esquisito ou a frase de impacto cortada no texto podem diminuir drasticamente o engajamento, passar uma imagem não-profissional para os clientes e forçar exclusões e republicações frenéticas, prejudicando o impulsionamento inicial do algoritmo da plataforma.

---

## 💡 A Solução

Nós construímos o **PreviewFlow** para eliminar esse "achismo". Em vez de depender de templates rígidos e defasados do Photoshop ou enviar posts de teste para contas privadas, o PreviewFlow entrega um ambiente dinâmico diretamente no navegador que imita instantaneamente o CSS e as limitações de layout dos feeds das principais redes sociais.

### Como a Agência Utiliza no Dia a Dia

**Quem usa?**
- **Social Media Managers**: Para validar o tamanho do texto, descobrir exatamente onde a frase é cortada pelo "Ver mais" e garantir que a "isca" inicial está bem legível.
- **Designers Gráficos**: Para validar rapidamente se suas composições, textos sobrepostos em imagens e zonas de segurança funcionam perfeitamente através de diferentes proporções de tela.
- **Atendimentos / Account Managers**: Para apresentar mockups super reais das campanhas para o cliente, acelerando aprovações.

**Em qual momento ele entra na rotina?**
O PreviewFlow entra bem na transição entre a *fase de criação e aprovação da peça* e a *fase de agendamento/publicação*. Logo que o designer finaliza a arte e o redator termina o copy, o Account ou o Social Media Manager abre a ferramenta, joga a imagem lá, cola a legenda e simplesmente varia entre as opções (Instagram, LinkedIn, etc).

**Como isso altera o processo hoje?**
Atualmente, as agências geralmente mandam apresentações PDF estáticas, ou documentos do Google (Docs) misturando imagens aleatórias e legendas. O cliente precisava *ter a imaginação* para saber como o post da campanha ficaria no ar. Com o PreviewFlow, a agência consegue gerar uma visão idêntica do post final na rede (inclusive simulando botão de likes, comentários, nome de usuário, etc), diminuindo o atrito na hora do processo de aprovação, cortando a necessidade de várias rodadas de refação ou erro num "post definitivo" no ar.

---

## 🛠️ Detalhes Técnicos

O PreviewFlow é construído com um tech stack moderno, escalável e extremamente responsivo para manter a agilidade nesse mercado rápido.

### Tech Stack
- **Frontend**: ReactJS (utilizando Vite para start do servidor na hora e HMR veloz).
- **Styling**: Vanilla CSS usando variáveis globais nativas (abrimos mão de frameworks cheios de classes para poder simular e clonar, 1 pra 1, de forma altamente precisa, o Visual/CSS nativo das plataformas reais).
- **Backend/Database**: Supabase (PostgreSQL).
- **Authentication**: Supabase Auth (Email/Senha & Login pelo Google).
- **Storage**: Supabase Storage buckets para uploads confiáveis das imagens na nuvem e ícones das marcas (avatares).
- **Context/State**: React Context API para guardar todo o nosso "State" global dinâmico (Previews, Perfil do Usuário Logado, Idiomas, Plataformas das Marcas do Cliente). Mantém a nossa arquitetura super limpa, livre de "prop drilling" constante, e exime do boilerplate massivo que o Redux traria pra cá.
- **Localização (i18n)**: Internacionalização nativa de ponta-a-ponta, totalmente suportada em Inglês (US) e Português do Brasil, auto-detectando instantaneamente o idioma de preferência no navegador do usuário.

### Funcionalidades
- **Previews Dinâmicos**: Uma engine central de mockup que renderiza com alta fidelidade a representação visual do Instagram (feed), LinkedIn e X/Twitter.
- **Gerenciador de Marcas (Brands)**: Permite a criação e alternância entre dezenas de clientes (Brands) da agência, permitindo trocar avatar, @usernames e handles numa fração de segundos para validar múltiplos projetos em um só lugar.
- **Multilíngue/i18n**: Botão seletor de linguagem premium com persistência da preferência do usuário.
- **Toggle "Premium" do X**: Chave indicadora para simular de forma precisa o limite imposto numa conta do X tradicional (280 caracteres) versus contas que assinam o Premium (para posts longos).
