/* ==========================================================================
   SmartCV AI — Landing page
   URL de l'application : à renseigner pour connecter les boutons
   Connexion / Créer un compte à l'application réelle.
   ========================================================================== */
const APP_URL = "";

/* ---------- Icônes Lucide ---------- */
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

/* ---------- Navigation mobile ---------- */
const navLinks = document.getElementById("nav-links");
const menuToggle = document.getElementById("menu-toggle");

function syncMenuState() {
  if (window.innerWidth <= 760) {
    navLinks.setAttribute("hidden", "");
  } else {
    navLinks.removeAttribute("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

menuToggle.addEventListener("click", () => {
  const isOpen = !navLinks.hasAttribute("hidden");
  if (isOpen) {
    navLinks.setAttribute("hidden", "");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu de navigation");
  } else {
    navLinks.removeAttribute("hidden");
    menuToggle.setAttribute("aria-label", "Fermer le menu de navigation");
  }
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  refreshIcons();
});

document.querySelectorAll(".nav-link-close").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 760 && !navLinks.hasAttribute("hidden")) {
      navLinks.setAttribute("hidden", "");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu de navigation");
    }
  });
});

window.addEventListener("resize", syncMenuState);
syncMenuState();

/* ==========================================================================
   Modale Connexion / Créer un compte
   ========================================================================== */
const authModal = document.getElementById("auth-modal");
const authModalTitle = document.getElementById("auth-modal-title");
const authModalText = document.getElementById("auth-modal-text");
const authModalIcon = document.getElementById("auth-modal-icon");
const authModalContinue = document.getElementById("auth-modal-continue");
const authModalClose = document.getElementById("auth-modal-close");
const authModalCancel = document.getElementById("auth-modal-cancel");

const AUTH_LABELS = {
  connexion: {
    title: "Connexion",
    text: "La connexion se fait directement dans l'application SmartCV AI. Vous serez redirigé vers votre espace personnel après vous être authentifié.",
    icon: "log-in",
    cta: "Continuer vers la connexion"
  },
  inscription: {
    title: "Créer un compte",
    text: "La création de compte se fait directement dans l'application SmartCV AI. Vous pourrez ensuite renseigner votre profil et soumettre votre CV.",
    icon: "user-plus",
    cta: "Continuer vers l'inscription"
  }
};

let currentAuthMode = "connexion";

document.querySelectorAll("[data-auth]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    currentAuthMode = trigger.getAttribute("data-auth");
    const labels = AUTH_LABELS[currentAuthMode];
    authModalTitle.textContent = labels.title;
    authModalText.textContent = labels.text;
    authModalContinue.replaceChildren();
    authModalContinue.insertAdjacentHTML("afterbegin", `<i data-lucide="${labels.icon}"></i>${labels.cta}`);
    authModalIcon.replaceChildren();
    authModalIcon.insertAdjacentHTML("afterbegin", `<i data-lucide="${labels.icon}"></i>`);
    authModal.removeAttribute("hidden");
    refreshIcons();
    authModalClose.focus();
  });
});

function closeAuthModal() {
  authModal.setAttribute("hidden", "");
}

authModalClose.addEventListener("click", closeAuthModal);
authModalCancel.addEventListener("click", closeAuthModal);
authModalContinue.addEventListener("click", () => {
  if (APP_URL) {
    const target = `${APP_URL}${currentAuthMode === "connexion" ? "/connexion" : "/inscription"}`;
    window.location.href = target;
  }
});
authModal.addEventListener("click", (event) => {
  if (event.target === authModal) closeAuthModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !authModal.hasAttribute("hidden")) closeAuthModal();
});

/* ==========================================================================
   Chatbot IA — assistant limité aux deux missions du cahier des charges :
   1. Fonctionnement et utilisation de l'application.
   2. Conseils sur la rédaction, la présentation et l'amélioration d'un CV.
   Réponses issues d'une base de connaissances locale (aucun service IA connecté).
   ========================================================================== */
const chatbotPanel = document.getElementById("chatbot-panel");
const chatbotFab = document.getElementById("chatbot-fab");
const chatbotOpenBtn = document.getElementById("chatbot-open-btn");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotText = document.getElementById("chatbot-text");

const KNOWLEDGE_BASE = [
  {
    keywords: ["compte", "inscription", "créer un compte", "enregistrer"],
    answer:
      "Pour créer un compte : cliquez sur le bouton « Créer un compte » dans la barre de navigation ou sur « Créer mon compte » en bas de page. Vous renseignez ensuite vos informations, vous vous authentifiez, et vous accédez à votre espace personnel."
  },
  {
    keywords: ["connexion", "connecter", "authentification", "mot de passe", "session"],
    answer:
      "Cliquez sur « Connexion » dans la barre de navigation pour vous authentifier. Une fois identifié, vous accédez à votre espace personnel où vous pouvez consulter et modifier votre profil à tout moment."
  },
  {
    keywords: ["profil", "informations personnelles", "modifier mon profil", "espace personnel"],
    answer:
      "Dans votre espace personnel (Module 1 — Gestion du profil utilisateur), vous pouvez créer votre compte, renseigner vos informations personnelles et professionnelles nécessaires à la constitution de votre CV, puis les consulter et les modifier quand vous le souhaitez."
  },
  {
    keywords: ["analyse", "analyser", "analyse du cv", "soumettre", "importer", "téléverser", "upload"],
    answer:
      "Module 2 — Analyse intelligente du CV : vous importez ou soumettez votre CV, le système analyse son contenu, identifie les compétences présentes, les points forts, les faiblesses et les informations manquantes, puis génère des recommandations pour l'améliorer. Les résultats sont basés sur le contenu réellement analysé."
  },
  {
    keywords: ["offre", "offre d'emploi", "adapter", "adaptation", "poste", "annonce", "job"],
    answer:
      "Module 3 — Adaptation du CV à une offre d'emploi : vous insérez le contenu de l'offre, le système analyse ses exigences, les compare à vos compétences, identifie les éléments manquants ou non démontrés, puis propose des améliorations et génère une version adaptée de votre CV. Seules vos informations réelles sont reformulées et valorisées : rien n'est inventé."
  },
  {
    keywords: ["modules", "module", "fonctionnalité", "fonctionnalité", "que fait l'application", "application"],
    answer:
      "L'application repose sur trois modules :\n1. Gestion du profil utilisateur (compte, authentification, profil).\n2. Analyse intelligente du CV (compétences, points forts, faiblesses, informations manquantes, recommandations).\n3. Adaptation du CV à une offre d'emploi (comparaison profil ↔ offre, version adaptée du CV).\nSouhaitez-vous des détails sur l'un de ces modules ?"
  },
  {
    keywords: ["chatbot", "assistant", "bot", "ia"],
    answer:
      "Je suis l'assistant de l'application, dédié à deux missions : répondre aux questions sur le fonctionnement de l'application et donner des conseils sur la rédaction, la présentation et l'amélioration d'un CV."
  },
  {
    keywords: ["conseil", "améliorer", "amélioration", "rédiger", "rédaction", "présentation", "reformuler", "structurer"],
    answer:
      "Quelques conseils essentiels pour votre CV :\n• Structure claire : coordonnées, intitulé de poste visé, expériences, formation, compétences.\n• Chiffrez vos résultats quand c'est possible (ex. « augmentation des ventes de 15 % »).\n• Utilisez des verbes d'action et restez concis (idéalement 1 à 2 pages).\n• Adaptez les mots-clés de vos compétences à chaque offre d'emploi.\n• Relisez-vous : orthographe et cohérence visuelle du document."
  },
  {
    keywords: ["compétences", "skill", "technique", "qualité"],
    answer:
      "Pour bien présenter vos compétences : distinguez compétences techniques (logiciels, langages, outils) et compétences transversales (communication, organisation). Ne listez que celles que vous pouvez démontrer par une expérience ou une formation : l'analyse de CV de l'application vérifie précisément qu'elles sont démontrées dans votre document."
  },
  {
    keywords: ["expérience", "travail", "stage", "formation", "diplôme", "études"],
    answer:
      "Pour vos expériences : présentez-les en ordre antichronologique (de la plus récente à la plus ancienne), avec pour chacune le poste, l'entreprise, les dates et deux à trois missions ou résultats concrets. Pour la formation : diplôme obtenu, établissement et année. N'inventez jamais d'expérience ou de diplôme : l'adaptation du CV valorise uniquement vos informations réelles."
  },
  {
    keywords: ["faute", "orthographe", "illustration", "photo", "design", "couleur", "modèle", "template"],
    answer:
      "Pour la présentation de votre CV : privilégiez une mise en page sobre et lisible, une seule famille de polices, des marges équilibrées et des sections bien séparées. Les fiches de lecture humaines et l'analyse automatique valorisent la clarté. Évitez les tableaux complexes et les graphiques décoratifs sans information réelle."
  },
  {
    keywords: ["prix", "gratuit", "payant", "abonnement", "paiement"],
    answer:
      "Je n'ai pas d'information tarifaire à communiquer. L'application est dédiée à la gestion de votre profil, à l'analyse intelligente de votre CV et à son adaptation aux offres d'emploi."
  },
  {
    keywords: ["candidature", "lettre de motivation", "recrutement", "embaucher"],
    answer:
      "L'application n'inclut ni gestion des candidatures, ni génération de lettres de motivation : elle se concentre sur la gestion de votre profil, l'analyse intelligente de votre CV et son adaptation aux offres d'emploi."
  },
  {
    keywords: ["bonjour", "salut", "bonsoir", "hello", "coucou"],
    answer:
      "Bonjour et bienvenue sur SmartCV AI ! Je peux répondre à vos questions sur le fonctionnement de l'application ou vous donner des conseils sur la rédaction et l'amélioration de votre CV. Que souhaitez-vous savoir ?"
  },
  {
    keywords: ["merci", "super", "parfait", "au revoir"],
    answer:
      "Avec plaisir ! N'hésitez pas si vous avez d'autres questions sur l'application ou sur votre CV."
  }
];

const FALLBACK_ANSWER =
  "Je suis un assistant dédié à deux missions : le fonctionnement de l'application SmartCV AI et les conseils pour la rédaction et l'amélioration d'un CV. Pouvez-vous reformuler votre question sur l'un de ces deux sujets ? Par exemple : « Comment analyser mon CV ? » ou « Comment adapter mon CV à une offre ? »";

function findAnswer(userText) {
  const text = userText.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE_BASE) {
    const score = entry.keywords.reduce(
      (acc, keyword) => (text.includes(keyword) ? acc + keyword.length : acc),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best ? best.answer : FALLBACK_ANSWER;
}

function appendMessage(role, text) {
  const message = document.createElement("div");
  message.className = `chat-msg ${role}`;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function openChatbot() {
  chatbotPanel.removeAttribute("hidden");
  chatbotFab.setAttribute("aria-expanded", "true");
  chatbotText.focus();
  if (chatbotMessages.childElementCount === 0) {
    appendMessage(
      "bot",
      "Bonjour et bienvenue sur SmartCV AI ! Je peux répondre à vos questions sur le fonctionnement de l'application et vous donner des conseils sur la rédaction, la présentation et l'amélioration de votre CV."
    );
  }
}

function closeChatbot() {
  chatbotPanel.setAttribute("hidden", "");
  chatbotFab.setAttribute("aria-expanded", "false");
}

chatbotFab.addEventListener("click", () => {
  chatbotPanel.hasAttribute("hidden") ? openChatbot() : closeChatbot();
});
chatbotOpenBtn.addEventListener("click", openChatbot);
chatbotClose.addEventListener("click", closeChatbot);

chatbotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userText = chatbotText.value.trim();
  if (!userText) return;
  appendMessage("user", userText);
  chatbotText.value = "";
  chatbotText.focus();
  window.setTimeout(() => appendMessage("bot", findAnswer(userText)), 350);
});

/* ==========================================================================
   Animations d'apparition discrètes
   ========================================================================== */
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

refreshIcons();
