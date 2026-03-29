import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'pt-BR';

interface Translations {
  [key: string]: string;
}

const en: Translations = {
  // Navigation
  'nav.get_started': 'Get Started',
  'nav.new_preview': 'New Preview',
  'nav.back_dashboard': 'Back to Dashboard',
  'nav.save_project': 'Save Project',
  'nav.saved': 'Saved!',
  
  // Landing Page
  'landing.hero.badge': '✨ Stop guessing, start previewing',
  'landing.hero.title1': 'Preview your social content',
  'landing.hero.title2': ' before the world sees it',
  'landing.hero.subtitle': 'Upload your image, write your caption, and instantly see how it looks on Instagram, LinkedIn, and X. No more post-and-delete anxiety.',
  'landing.hero.cta': 'Start Previewing',
  'landing.features.title': 'Everything you need to preview with confidence',
  'landing.features.1.title': 'Pixel-Perfect Previews',
  'landing.features.1.desc': 'See exactly how your posts will look on Instagram, LinkedIn, and X before hitting publish.',
  'landing.features.2.title': 'Multi-Platform, One Tool',
  'landing.features.2.desc': 'Switch between platform views instantly. No more guessing how content translates across networks.',
  'landing.features.3.title': 'Real-Time Updates',
  'landing.features.3.desc': 'Type your caption and watch it render live — see where truncation happens, catch issues early.',
  'landing.cta.title': 'Ready to preview like a pro?',
  'landing.cta.subtitle': 'Join social media managers who preview before they publish.',
  'landing.cta.button': 'Get Started — It\'s Free',
  'landing.footer': 'Built with ❤️ by PreviewFlow',

  // Login Page
  'login.error.unconfigured': 'Supabase Not Configured',
  'login.error.unconfigured_desc': 'Add your Supabase credentials to .env to enable authentication.',
  'login.error.local_mode': 'Continue in Local Mode',
  'login.login.title': 'Welcome Back',
  'login.login.subtitle': 'Sign in to sculpt your digital presence',
  'login.signup.title': 'Join PreviewFlow',
  'login.signup.subtitle': 'Start previewing your social content like a pro',
  'login.google': 'Continue with Google',
  'login.or_login': 'or sign in with email',
  'login.or_signup': 'or sign up with email',
  'login.email_placeholder': 'Email address',
  'login.password_placeholder': 'Password',
  'login.signin_button': 'Sign In',
  'login.signup_button': 'Get Started',
  'login.no_account': 'Don\'t have an account?',
  'login.switch_signup': 'Sign up',
  'login.has_account': 'Already have an account?',
  'login.switch_login': 'Sign in',

  // Dashboard Page
  'dashboard.header.title': 'Your Previews',
  'dashboard.header.subtitle': 'Manage and edit your social media previews',
  'dashboard.empty.title': 'No previews yet',
  'dashboard.empty.subtitle': 'Create your first social media preview and see how your content looks across platforms.',
  'dashboard.empty.cta': 'Create First Preview',
  
  // Profile Page & Menu
  'profile_menu.settings': 'Profile Settings',
  'profile_menu.signout': 'Sign Out',
  'profile.settings.title': 'Profile Settings',
  'profile.settings.display_name': 'Display Name',
  'profile.settings.display_name_placeholder': 'Your display name',
  'profile.settings.save': 'Save Profile',
  'profile.brands.title': 'My Brands',
  'profile.brands.new': 'New Brand',
  'profile.brands.edit': 'Edit Brand',
  'profile.brands.create_new': 'Create New Brand',
  'profile.brands.name_placeholder': 'Brand name *',
  'profile.brands.username_placeholder': 'username',
  'profile.brands.headline_placeholder': 'Headline or company tagline (optional)',
  'profile.brands.update_button': 'Update Brand',
  'profile.brands.create_button': 'Create Brand',
  'profile.brands.empty': 'No brands yet. Create one to quickly apply your branding to previews.',
  'profile.brands.confirm_delete': 'Delete this brand?',

  // Editor Page & Sidebar
  'editor.sidebar.brand': 'Brand Profile',
  'editor.sidebar.image': 'Image',
  'editor.sidebar.caption': 'Caption',
  'editor.brand.selector_placeholder': 'Select a brand...',
  'editor.brand.manual_override': 'Manual Override',
  'editor.image.upload': 'Click to upload',
  'editor.image.drag': ' or drag and drop',
  'editor.image.formats': 'JPG or PNG, max 5MB',
  'editor.image.replace': 'Replace',
  'editor.image.remove_button': 'Remove image',
  'editor.image.error.type': 'Only JPG and PNG files are supported.',
  'editor.image.error.size': 'File must be under 5MB.',
  'editor.caption.placeholder': 'Write your caption...',
  'editor.premium.label': 'X Premium (Long posts)',
  'editor.limits.ig': 'Instagram truncates at ~125 chars',
  'editor.limits.li': 'LinkedIn truncates at ~140 chars',
  'editor.limits.tw': 'Max 280 characters',
  'editor.limits.tw_premium': 'Premium: up to 25,000 chars (truncates at 280)',
  
  // Labels & Common
  'common.saving': 'Saving...',
  'common.saved_check': '✓ Saved',
  'common.cancel': 'Cancel',
  'common.remove': 'Remove',
  'common.edit': 'Edit',
  'common.delete': 'Delete',
  'common.untitled': 'Untitled Preview',
  'common.no_caption': 'No caption',
  'common.confirm_delete': 'Delete this preview?',
  'mockups.image_placeholder': 'Upload an image to preview',
  'mockups.twitter.show_more': 'Show more',
  'mockups.linkedin.see_more': '...see more',
  'mockups.linkedin.metrics': 'comments • reposts',
  'mockups.linkedin.like': 'Like',
  'mockups.linkedin.comment': 'Comment',
  'mockups.linkedin.repost': 'Repost',
  'mockups.linkedin.send': 'Send',
  'mockups.instagram.location': 'Your Location',
  'mockups.instagram.more': '... more',
  'mockups.instagram.liked_by': 'Liked by ',
  'mockups.instagram.and': ' and ',
  'mockups.instagram.others': 'others',
  'mockups.instagram.comments': 'View all 42 comments',
  'mockups.instagram.time': '2 HOURS AGO',
};

const pt: Translations = {
  // Navigation
  'nav.get_started': 'Começar',
  'nav.new_preview': 'Novo Preview',
  'nav.back_dashboard': 'Voltar para Dashboard',
  'nav.save_project': 'Salvar Projeto',
  'nav.saved': 'Salvo!',
  
  // Landing Page
  'landing.hero.badge': '✨ Pare de adivinhar, comece a prever',
  'landing.hero.title1': 'Visualize seu conteúdo',
  'landing.hero.title2': ' antes que o mundo veja',
  'landing.hero.subtitle': 'Faça upload da sua imagem, escreva a legenda e veja instantaneamente como fica no Instagram, LinkedIn e X. Sem mais ansiedade ao postar.',
  'landing.hero.cta': 'Começar a Visualizar',
  'landing.features.title': 'Tudo o que você precisa para postar com confiança',
  'landing.features.1.title': 'Previews Perfeitos',
  'landing.features.1.desc': 'Veja exatamente como seus posts ficarão no Instagram, LinkedIn e X antes de publicar.',
  'landing.features.2.title': 'Multi-Plataforma, Uma Ferramenta',
  'landing.features.2.desc': 'Alterne entre as plataformas instantaneamente. Sem mais adivinhações.',
  'landing.features.3.title': 'Atualizações em Tempo Real',
  'landing.features.3.desc': 'Digite sua legenda e veja atualizar ao vivo — entenda onde o texto é cortado e evite problemas.',
  'landing.cta.title': 'Pronto para prever como um profissional?',
  'landing.cta.subtitle': 'Junte-se aos social medias que validam os posts antes de publicar.',
  'landing.cta.button': 'Começar — É Grátis',
  'landing.footer': 'Feito com ❤️ por PreviewFlow',

  // Login Page
  'login.error.unconfigured': 'Supabase Não Configurado',
  'login.error.unconfigured_desc': 'Adicione suas credenciais do Supabase no .env para ativar a autenticação.',
  'login.error.local_mode': 'Continuar em Modo Local',
  'login.login.title': 'Bem-vindo de volta',
  'login.login.subtitle': 'Entre para moldar sua presença digital',
  'login.signup.title': 'Junte-se ao PreviewFlow',
  'login.signup.subtitle': 'Comece a visualizar seu conteúdo como um profissional',
  'login.google': 'Continuar com Google',
  'login.or_login': 'ou entre com e-mail',
  'login.or_signup': 'ou cadastre-se com e-mail',
  'login.email_placeholder': 'Endereço de e-mail',
  'login.password_placeholder': 'Senha',
  'login.signin_button': 'Entrar',
  'login.signup_button': 'Começar',
  'login.no_account': 'Não tem uma conta?',
  'login.switch_signup': 'Cadastre-se',
  'login.has_account': 'Já possui uma conta?',
  'login.switch_login': 'Entrar',

  // Dashboard Page
  'dashboard.header.title': 'Seus Previews',
  'dashboard.header.subtitle': 'Gerencie e edite suas visualizações de redes sociais',
  'dashboard.empty.title': 'Nenhum preview ainda',
  'dashboard.empty.subtitle': 'Crie seu primeiro preview e veja como seu conteúdo fica em todas as plataformas.',
  'dashboard.empty.cta': 'Criar Primeiro Preview',
  
  // Profile Page & Menu
  'profile_menu.settings': 'Configurações de Perfil',
  'profile_menu.signout': 'Sair',
  'profile.settings.title': 'Configurações de Perfil',
  'profile.settings.display_name': 'Nome de Exibição',
  'profile.settings.display_name_placeholder': 'Seu nome de exibição',
  'profile.settings.save': 'Salvar Perfil',
  'profile.brands.title': 'Minhas Marcas',
  'profile.brands.new': 'Nova Marca',
  'profile.brands.edit': 'Editar Marca',
  'profile.brands.create_new': 'Criar Nova Marca',
  'profile.brands.name_placeholder': 'Nome da marca *',
  'profile.brands.username_placeholder': 'nomedeusuario',
  'profile.brands.headline_placeholder': 'Título ou slogan (opcional)',
  'profile.brands.update_button': 'Atualizar Marca',
  'profile.brands.create_button': 'Criar Marca',
  'profile.brands.empty': 'Nenhuma marca ainda. Crie uma para aplicar rapidamente seu branding aos previews.',
  'profile.brands.confirm_delete': 'Excluir esta marca?',

  // Editor Page & Sidebar
  'editor.sidebar.brand': 'Perfil da Marca',
  'editor.sidebar.image': 'Imagem',
  'editor.sidebar.caption': 'Legenda',
  'editor.brand.selector_placeholder': 'Selecione uma marca...',
  'editor.brand.manual_override': 'Edição Manual',
  'editor.image.upload': 'Clique para upload',
  'editor.image.drag': ' ou arraste e solte',
  'editor.image.formats': 'JPG ou PNG, máx. 5MB',
  'editor.image.replace': 'Substituir',
  'editor.image.remove_button': 'Remover imagem',
  'editor.image.error.type': 'Apenas arquivos JPG e PNG são suportados.',
  'editor.image.error.size': 'Arquivo deve ter menos de 5MB.',
  'editor.caption.placeholder': 'Escreva sua legenda...',
  'editor.premium.label': 'X Premium (Posts longos)',
  'editor.limits.ig': 'Instagram corta a partir de ~125 caract.',
  'editor.limits.li': 'LinkedIn corta a partir de ~140 caract.',
  'editor.limits.tw': 'Máx 280 caracteres',
  'editor.limits.tw_premium': 'Premium: até 25.000 caract. (corta no 280)',
  
  // Labels & Common
  'common.saving': 'Salvando...',
  'common.saved_check': '✓ Salvo',
  'common.cancel': 'Cancelar',
  'common.remove': 'Remover',
  'common.edit': 'Editar',
  'common.delete': 'Excluir',
  'common.untitled': 'Preview Sem Título',
  'common.no_caption': 'Sem legenda',
  'common.confirm_delete': 'Excluir este preview?',
  'mockups.image_placeholder': 'Faça upload de uma imagem para o preview',
  'mockups.twitter.show_more': 'Mostrar mais',
  'mockups.linkedin.see_more': '...ver mais',
  'mockups.linkedin.metrics': 'comentários • recompartilhamentos',
  'mockups.linkedin.like': 'Gostar',
  'mockups.linkedin.comment': 'Comentar',
  'mockups.linkedin.repost': 'Recompartilhar',
  'mockups.linkedin.send': 'Enviar',
  'mockups.instagram.location': 'Sua Localização',
  'mockups.instagram.more': '... mais',
  'mockups.instagram.liked_by': 'Curtido por ',
  'mockups.instagram.and': ' e ',
  'mockups.instagram.others': 'outros',
  'mockups.instagram.comments': 'Ver todos os 42 comentários',
  'mockups.instagram.time': 'HÁ 2 HORAS',
};

const dictionaries = {
  en,
  'pt-BR': pt,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Detect stored language or browser language on mount
    const stored = localStorage.getItem('previewflow_lang') as Language | null;
    if (stored && (stored === 'en' || stored === 'pt-BR')) {
      setLanguageState(stored);
    } else {
      const browserLang = navigator.language || navigator.languages?.[0];
      if (browserLang && browserLang.startsWith('pt')) {
        setLanguageState('pt-BR');
      } else {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('previewflow_lang', lang);
  };

  const t = (key: string): string => {
    const dict = dictionaries[language] || dictionaries['en'];
    return dict[key] || dictionaries['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
