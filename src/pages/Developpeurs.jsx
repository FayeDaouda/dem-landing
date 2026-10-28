import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Copy, KeyRound, ShieldCheck, Info } from 'lucide-react'
import * as S from './developpeurs/snippets.js'
import { highlight, guessLang, LANG_LABELS } from './developpeurs/highlight.jsx'
import { DevHero, DevStats, DevJourney, DevUseCases, DevSecurity } from './developpeurs/Presentation.jsx'
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'

gsap.registerPlugin(ScrollTrigger)

// Documentation développeurs de l'API DEM — www.dem.sn/developpeurs.
// Source de vérité technique : la spécification OpenAPI servie par l'API
// (api.dem.sn/v1/openapi.yaml, docs/openapi.yaml du serveur). Cette page
// en est la version lisible, avec des exemples prêts à copier.

const SECTIONS = [
  ['introduction', 'Introduction'],
  ['demarrage', 'Démarrage rapide'],
  ['authentification', 'Authentification'],
  ['environnements', 'Test et production'],
  ['devis', 'Devis'],
  ['livraisons', 'Créer une livraison'],
  ['suivi', 'Lire et suivre'],
  ['annulation', 'Annuler'],
  ['statuts', 'Statuts'],
  ['idempotence', 'Idempotence'],
  ['webhooks', 'Webhooks'],
  ['signature', 'Vérifier la signature'],
  ['erreurs', 'Erreurs'],
  ['limites', 'Limites'],
  ['securite', 'Sécurité'],
  ['changelog', 'Versions'],
]

const SECTION_IDS = SECTIONS.map(([id]) => id)

export default function Developpeurs() {
  const active = useActiveSection(SECTION_IDS)
  const chips = useRef(null)

  // Sommaire mobile : la pastille de la section en cours reste visible
  useEffect(() => {
    const bar = chips.current
    const chip = bar?.querySelector(`a[href="#${active}"]`)
    if (bar && chip) bar.scrollTo({ left: chip.offsetLeft - (bar.clientWidth - chip.clientWidth) / 2, behavior: 'smooth' })
  }, [active])

  useEffect(() => {
    const prev = document.title
    document.title = 'API DEM — Documentation développeurs'
    // Le site met overflow-x: hidden sur html/body, ce qui empêche le
    // sommaire de rester visible (position: sticky). « clip » coupe pareil le
    // débordement horizontal sans casser sticky — sur cette page seulement.
    const els = [document.documentElement, document.body]
    const before = els.map(el => el.style.overflowX)
    els.forEach(el => { el.style.overflowX = 'clip' })
    return () => {
      document.title = prev
      els.forEach((el, i) => { el.style.overflowX = before[i] })
    }
  }, [])

  // Sections de la référence : apparition douce au défilement
  const refRoot = useRef(null)
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 }),
      })
    }, refRoot)
    return () => ctx.revert()
  }, [])

  return (
    <>
    <DevHero />
    <DevStats />
    <DevJourney />
    <DevUseCases />
    <DevSecurity />

    <div ref={refRoot} className="w-full bg-[#021520] text-white pb-24 font-sans border-t border-white/10" data-header-theme="black">
      {/* ── Titre de la référence ── */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-10 sm:pb-14">
        <MiniTitleWithBar content="Référence de l'API" color="cyan-light" />
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-[760px] mb-4">Tout ce qu'il faut pour intégrer.</h2>
        <p className="text-white/65 max-w-[640px] text-base sm:text-lg font-['Raleway',sans-serif]">
          Exemples prêts à copier en curl, Node.js et PHP. La même description existe au format OpenAPI pour vos outils.
        </p>
      </section>

      {/* ── Sommaire mobile ── */}
      <nav ref={chips} className="lg:hidden sticky top-[76px] z-20 bg-[#021520]/95 backdrop-blur border-y border-white/10 overflow-x-auto" aria-label="Sommaire">
        <div className="flex gap-1 px-6 py-2 w-max">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`px-3 py-1.5 whitespace-nowrap ${active === id ? 'bg-cyan' : ''}`}>
              <span className={`text-xs font-semibold ${active === id ? 'text-[#021520]' : 'text-white/70'}`}>{label}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        {/* ── Sommaire ordinateur ── */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 border-l border-white/10" aria-label="Sommaire">
            {SECTIONS.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={`group block pl-4 py-1.5 -ml-px border-l-2 transition-colors ${active === id ? 'border-cyan' : 'border-transparent'}`}>
                <span className={`text-sm transition-colors ${active === id ? 'text-cyan font-semibold' : 'text-white/60 group-hover:text-white'}`}>{label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 pt-8 lg:pt-0">
          <Section id="introduction" title="Introduction">
            <P>
              L'API DEM est une API REST. Vous envoyez des requêtes HTTPS avec un corps JSON, vous recevez du JSON.
              Elle s'appuie sur exactement les mêmes règles que l'application DEM Pro : même calcul de prix, même
              recherche de coursier, mêmes règles d'annulation. Chaque livraison créée par l'API apparaît aussi dans
              l'application du commerçant.
            </P>
            <Steps items={[
              ['Le commerçant crée une clé', 'Dans l\'app DEM Pro : Compte › API DEM › Créer une clé. Commencez par une clé de Test.'],
              ['Vous branchez son site', 'Devis au moment du panier, livraison à la validation de la commande, webhooks pour la suite.'],
              ['Passage en production', 'Une clé de Production, et chaque commande devient une vraie livraison DEM.'],
            ]} />
            <Callout icon={Info}>
              Toutes les URL de cette page commencent par <Code>https://api.dem.sn/v1</Code>. La version est dans
              l'adresse : une future <Code>/v2</Code> ne cassera jamais une intégration <Code>/v1</Code>.
            </Callout>
          </Section>

          <Section id="demarrage" title="Démarrage rapide">
            <P>Trois appels suffisent pour livrer une première commande, avec une clé de Test (aucune vraie course).</P>
            <H3>1. Vérifier la clé</H3>
            <CodeBlock code={S.meCurl} />
            <CodeBlock title="Réponse" code={S.meResponse} />
            <H3>2. Demander le prix</H3>
            <CodeBlock code={S.quoteCurl} />
            <H3>3. Créer la livraison</H3>
            <CodeBlock code={S.deliveryCurl} />
            <P>
              C'est tout : la livraison est créée, un coursier est recherché (en production), et votre adresse webhook
              sera prévenue à chaque étape.
            </P>
          </Section>

          <Section id="authentification" title="Authentification">
            <P>Chaque requête porte la clé dans l'en-tête <Code>Authorization</Code> :</P>
            <CodeBlock code={'Authorization: Bearer dem_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'} />
            <P>
              La clé est créée par le commerçant dans son application DEM Pro (ou par l'équipe DEM). Elle n'est
              affichée qu'une seule fois. Chaque clé n'a que les droits choisis à sa création :
            </P>
            <Table head={['Droit', 'Permet']} rows={[
              ['quotes:read', 'Demander un devis'],
              ['deliveries:create', 'Créer des livraisons'],
              ['deliveries:read', 'Lire et lister les livraisons'],
              ['tracking:read', 'Suivi : lien web et position du coursier'],
              ['deliveries:cancel', 'Annuler une livraison'],
              ['webhooks:manage', 'Déclarer et gérer les adresses webhook'],
            ]} mono={[0]} />
            <P>
              Une clé peut être désactivée, renouvelée (l'ancienne reste valable 24 h) ou révoquée à tout moment.
              L'API n'est accessible qu'avec l'offre Premium : si l'offre s'arrête, les clés sont refusées
              (<Code>API_ACCESS_DISABLED</Code>) jusqu'à son renouvellement.
            </P>
          </Section>

          <Section id="environnements" title="Test et production">
            <Table head={['', 'Clé de Test', 'Clé de Production']} rows={[
              ['Préfixe', 'dem_test_…', 'dem_live_…'],
              ['Adresse', 'https://api.dem.sn/v1', 'https://api.dem.sn/v1'],
              ['Courses', 'Simulées : aucun coursier sollicité', 'Vraies livraisons'],
              ['Paiement', 'Rien n\'est débité', 'Espèces ou wallet DEM Pro'],
              ['Champ livemode', 'false', 'true'],
            ]} />
            <P>
              Les deux environnements sont strictement séparés : une livraison, un devis ou une adresse webhook créés
              avec une clé de Test sont introuvables avec une clé de Production, et inversement.
            </P>
            <H3>Une livraison de test vit comme une vraie</H3>
            <P>
              Sans rien faire, elle avance seule, avec les mêmes statuts et les mêmes webhooks qu'en production, et un
              coursier fictif (« Coursier Test », numéro <Code>+221000000000</Code>) :
            </P>
            <Table head={['Après', 'Statut', 'Webhook']} rows={[
              ['la création', 'SEARCHING_DRIVER', 'delivery.created'],
              ['20 secondes', 'DRIVER_ASSIGNED', 'delivery.driver_assigned'],
              ['1 minute de plus', 'PICKED_UP', 'delivery.picked_up'],
              ['1 minute de plus', 'DELIVERED', 'delivery.delivered'],
            ]} mono={[1, 2]} />
            <P>Pour tester un cas tout de suite, faites-la avancer vous-même (clés de Test seulement) :</P>
            <Endpoint method="POST" path="/test/deliveries/{id}/advance" scope="deliveries:create" />
            <CodeBlock code={S.advanceCurl} />
            <Table head={['to', 'Effet']} rows={[
              ['DRIVER_ASSIGNED · PICKED_UP · DELIVERED', 'Avance jusqu\'à ce statut ; chaque étape intermédiaire envoie son webhook'],
              ['DRIVER_UNASSIGNED', 'Le coursier se désiste : retour à SEARCHING_DRIVER (delivery.driver_unassigned)'],
              ['NO_DRIVER_FOUND', 'Aucun coursier trouvé : CANCELLED, cancellation.reason = NO_DRIVER_FOUND'],
            ]} mono={[0]} />
            <P>Dès la première avance manuelle, la progression automatique s'arrête pour cette livraison. Avec une clé de Production, cet appel est refusé (<Code>TEST_MODE_ONLY</Code>).</P>
          </Section>

          <Section id="devis" title="Devis">
            <Endpoint method="POST" path="/quotes" scope="quotes:read" />
            <P>
              Le prix est calculé par le moteur DEM, le même que l'application. Il est <strong>garanti
              15 minutes</strong> : la livraison créée avec ce <Code>quote_id</Code> est facturée à ce prix. Sans
              coordonnées GPS, l'adresse est localisée automatiquement ; envoyez latitude et longitude dès que
              vous les avez, c'est plus précis.
            </P>
            <Tabs tabs={[['curl', S.quoteCurl], ['Node.js', S.quoteNode], ['PHP', S.quotePhp]]} />
            <CodeBlock title="Réponse 201" code={S.quoteResponse} />
            <Table head={['Champ', 'Description']} rows={[
              ['pickup, dropoff', 'address (obligatoire), latitude et longitude (ensemble)'],
              ['service', 'standard (par défaut) ou express'],
            ]} mono={[0]} />
            <P>Une adresse hors de la zone desservie renvoie <Code>OUT_OF_SERVICE_AREA</Code>. <Code>GET /quotes/{'{id}'}</Code> relit un devis.</P>
          </Section>

          <Section id="livraisons" title="Créer une livraison">
            <Endpoint method="POST" path="/deliveries" scope="deliveries:create" />
            <P>
              L'en-tête <Code>Idempotency-Key</Code> est obligatoire (voir <a href="#idempotence"><span className="text-cyan underline">Idempotence</span></a>).
              Utilisez votre numéro de commande.
            </P>
            <Tabs tabs={[['curl', S.deliveryCurl], ['Node.js', S.deliveryNode], ['PHP', S.deliveryPhp]]} />
            <Table head={['Champ', 'Obligatoire', 'Description']} rows={[
              ['customer.phone', 'oui', 'Mobile sénégalais du destinataire (70, 71, 75, 76, 77, 78)'],
              ['customer.name', '', 'Nom du destinataire'],
              ['payment.paid_by', 'oui', 'sender (le commerçant paie) ou recipient (le client paie au coursier)'],
              ['payment.method', '', 'CASH (par défaut) ou WALLET : débité du wallet DEM Pro à la création, payé par l\'expéditeur'],
              ['quote_id', '', 'Devis valable : son prix et ses adresses sont repris'],
              ['dropoff', 'sans devis', 'address, latitude, longitude'],
              ['pickup', '', 'store_id (voir GET /stores) ou address + coordonnées ; sinon le point de retrait par défaut du compte. name et phone : contact affiché au coursier'],
              ['service', '', 'standard ou express (sans devis)'],
              ['external_order_id', '', 'Votre numéro de commande (100 caractères max), pour retrouver la livraison'],
              ['package', '', 'description (500 car.), quantity'],
              ['metadata', '', 'Vos références : 20 clés, 2 Ko max, valeurs simples'],
            ]} mono={[0]} />
            <CodeBlock title="Réponse 201" code={S.deliveryResponse} />
            <Callout icon={Info}>
              Gardez l'<Code>id</Code> (<Code>del_…</Code>) avec votre commande, et envoyez <Code>tracking_url</Code> à
              votre client : c'est une page de suivi en direct, sans application à installer.
            </Callout>
            <P><Code>GET /stores</Code> liste les points de retrait enregistrés dans le compte (un par boutique ou entrepôt).</P>
          </Section>

          <Section id="suivi" title="Lire et suivre">
            <Endpoint method="GET" path="/deliveries/{id}" scope="deliveries:read" />
            <Endpoint method="GET" path="/deliveries" scope="deliveries:read" />
            <P>
              La liste renvoie les plus récentes d'abord : <Code>limit</Code> (1 à 100, 20 par défaut),
              <Code>starting_after</Code> (dernier id de la page précédente) et <Code>external_order_id</Code>.
              Réponse : <Code>{'{ "object": "list", "data": [...], "has_more": true }'}</Code>.
            </P>
            <CodeBlock code={S.listCurl} />
            <Endpoint method="GET" path="/deliveries/{id}/tracking" scope="tracking:read" />
            <CodeBlock title="Réponse" code={S.trackingResponse} />
            <P>
              Le coursier (prénom, téléphone, véhicule) et sa position (arrondie à environ 10 m) ne sont fournis que
              pendant la course. Préférez les webhooks à des appels répétés.
            </P>
          </Section>

          <Section id="annulation" title="Annuler">
            <Endpoint method="POST" path="/deliveries/{id}/cancel" scope="deliveries:cancel" />
            <CodeBlock code={S.cancelCurl} />
            <P>
              Mêmes règles que l'application : impossible une fois le colis récupéré, ou quand le coursier est déjà
              au point de retrait (<Code>INVALID_DELIVERY_STATE</Code>). Une livraison payée par wallet est
              remboursée automatiquement. Motifs : <Code>CUSTOMER_CANCELLED</Code> (par défaut), <Code>OUT_OF_STOCK</Code>,
              <Code>ORDER_MISTAKE</Code>, <Code>WRONG_ADDRESS</Code>, <Code>OTHER</Code> (avec <Code>note</Code>)…
            </P>
          </Section>

          <Section id="statuts" title="Statuts">
            <Lifecycle />
            <Table head={['Statut', 'Signification', 'Webhook']} rows={[
              ['SEARCHING_DRIVER', 'Recherche d\'un coursier', 'delivery.created'],
              ['DRIVER_ASSIGNED', 'Un coursier a accepté, il va au point de retrait', 'delivery.driver_assigned'],
              ['SEARCHING_DRIVER', 'Le coursier s\'est désisté, nouvelle recherche', 'delivery.driver_unassigned'],
              ['PICKED_UP', 'Colis récupéré, en route vers le client', 'delivery.picked_up'],
              ['DELIVERED', 'Livrée', 'delivery.delivered'],
              ['CANCELLED', 'Annulée — voir cancellation.reason (NO_DRIVER_FOUND : aucun coursier en 15 min)', 'delivery.cancelled'],
            ]} mono={[0, 2]} />
            <P>
              <Code>SCHEDULED</Code>, <Code>IN_TRANSIT</Code> et <Code>FAILED</Code> sont réservés. Avec une clé de Test,
              les mêmes statuts sont simulés (voir <a href="#environnements"><span className="text-cyan underline">Test et production</span></a>).
            </P>
          </Section>

          <Section id="idempotence" title="Idempotence">
            <P>
              Une coupure réseau ne doit jamais créer deux livraisons. Envoyez un <Code>Idempotency-Key</Code> unique
              par commande ; si vous renvoyez la même requête, DEM renvoie la réponse d'origine (en-tête
              <Code>Idempotent-Replayed: true</Code>) sans rien recréer.
            </P>
            <Table head={['Situation', 'Réponse']} rows={[
              ['Même clé, même corps, déjà traitée', 'La réponse d\'origine, à l\'identique'],
              ['Même clé, corps différent', '422 IDEMPOTENCY_CONFLICT'],
              ['Même clé, première requête encore en cours', '409 IDEMPOTENCY_IN_PROGRESS — réessayez dans 2 s'],
              ['Refus 4xx (champ invalide, devis expiré, solde insuffisant, limite…)', 'Rien n\'a été créé : corrigez et renvoyez avec la même clé'],
              ['Erreur 5xx ou coupure', 'Renvoyez la même requête avec la même clé : la livraison n\'est jamais créée deux fois'],
            ]} />
            <P>Une clé est gardée 24 heures, par compte et par environnement. 255 caractères ASCII maximum, sans espace.</P>
          </Section>

          <Section id="webhooks" title="Webhooks">
            <P>
              Plutôt que d'interroger l'API, déclarez une adresse de votre site : DEM l'appelle à chaque étape
              (droit <Code>webhooks:manage</Code>). Adresse <strong>https</strong> publique, 3 maximum par environnement.
            </P>
            <CodeBlock code={S.webhookCreateCurl} />
            <Table head={['Événement', 'Quand']} rows={[
              ['delivery.created', 'Livraison créée'],
              ['delivery.driver_assigned', 'Un coursier a accepté'],
              ['delivery.driver_unassigned', 'Le coursier s\'est désisté, nouvelle recherche'],
              ['delivery.picked_up', 'Colis récupéré'],
              ['delivery.delivered', 'Livrée'],
              ['delivery.cancelled', 'Annulée (par vous, le support DEM, ou faute de coursier)'],
            ]} mono={[0]} />
            <CodeBlock title="Ce que reçoit votre site" code={S.webhookPayload} />
            <ul className="list-disc pl-5 space-y-2 text-white/80 mb-6">
              <li>Répondez <Code>2xx</Code> en moins de 10 secondes, puis traitez en arrière-plan.</li>
              <li>Sans réponse 2xx, nouveaux essais après 30 s, 2 min, 10 min, 30 min, 2 h et 6 h. Ensuite le message est marqué en échec ; il peut être renvoyé (<Code>POST /webhooks/{'{id}'}/messages/{'{messageId}'}/resend</Code>).</li>
              <li>Un même événement peut arriver deux fois : ignorez un <Code>X-DEM-Event-ID</Code> déjà traité.</li>
              <li>Les événements peuvent arriver dans le désordre : fiez-vous à <Code>data.object.status</Code>.</li>
              <li><Code>POST /webhooks/{'{id}'}/test</Code> envoie un événement <Code>ping</Code> et vous montre la réponse de votre serveur.</li>
            </ul>
          </Section>

          <Section id="signature" title="Vérifier la signature">
            <P>
              Chaque envoi est signé avec le secret <Code>whsec_…</Code> de l'adresse, reçu à sa création. Vérifiez
              toujours la signature avant de faire confiance à un événement :
            </P>
            <ol className="list-decimal pl-5 space-y-2 text-white/80 mb-6">
              <li>Lisez le corps <strong>brut</strong>, tel que reçu (pas un JSON relu puis réécrit).</li>
              <li>Calculez <Code>HMAC-SHA256(secret, X-DEM-Timestamp + "." + corps)</Code> en hexadécimal.</li>
              <li>Comparez <Code>"v1=" + résultat</Code> à <Code>X-DEM-Signature</Code>, en temps constant.</li>
              <li>Refusez un <Code>X-DEM-Timestamp</Code> de plus de 5 minutes (protection contre le rejeu).</li>
            </ol>
            <Tabs tabs={[['Node.js', S.verifyNode], ['PHP', S.verifyPhp]]} />
          </Section>

          <Section id="erreurs" title="Erreurs">
            <P>Toutes les erreurs ont le même format. Le message est en français ; votre code doit s'appuyer sur <Code>code</Code>.</P>
            <CodeBlock code={S.errorExample} />
            <Table head={['HTTP', 'Code', 'Que faire']} rows={[
              ['400', 'INVALID_REQUEST', 'Corriger le champ indiqué dans le message'],
              ['403', 'TEST_MODE_ONLY', 'Appel réservé aux clés de Test'],
              ['400', 'IDEMPOTENCY_KEY_REQUIRED', 'Ajouter l\'en-tête Idempotency-Key'],
              ['401', 'UNAUTHORIZED · API_KEY_REVOKED · API_KEY_DISABLED · API_KEY_EXPIRED', 'Vérifier la clé, en demander une nouvelle au commerçant'],
              ['402', 'INSUFFICIENT_WALLET_BALANCE', 'Recharger le wallet DEM Pro ou payer en espèces'],
              ['403', 'FORBIDDEN', 'La clé n\'a pas le droit nécessaire (details.scope)'],
              ['403', 'API_ACCESS_DISABLED · ACCOUNT_INACTIVE · ORGANIZATION_SUSPENDED', 'Offre Premium arrêtée, compte inactif ou accès suspendu : contacter DEM'],
              ['404', 'DELIVERY_NOT_FOUND · QUOTE_NOT_FOUND · WEBHOOK_NOT_FOUND', 'Mauvais id, ou autre environnement'],
              ['409', 'QUOTE_EXPIRED · QUOTE_ALREADY_USED', 'Demander un nouveau devis'],
              ['409', 'INVALID_DELIVERY_STATE', 'La livraison ne peut plus être annulée'],
              ['409', 'IDEMPOTENCY_IN_PROGRESS', 'Réessayer dans quelques secondes'],
              ['409', 'WEBHOOK_LIMIT', '3 adresses par environnement au maximum'],
              ['422', 'INVALID_ADDRESS · OUT_OF_SERVICE_AREA', 'Envoyer les coordonnées / adresse hors zone DEM'],
              ['422', 'INVALID_STORE · PICKUP_REQUIRED · QUOTE_MISMATCH', 'Vérifier le point de retrait ou le devis'],
              ['422', 'IDEMPOTENCY_CONFLICT', 'Utiliser une nouvelle Idempotency-Key'],
              ['429', 'RATE_LIMIT_EXCEEDED · DELIVERY_QUOTA_EXCEEDED', 'Attendre Retry-After secondes'],
              ['500', 'INTERNAL_ERROR', 'Réessayer ; si ça persiste, donner le request_id au support'],
            ]} mono={[1]} />
          </Section>

          <Section id="limites" title="Limites">
            <Table head={['Limite', 'Offre Premium']} rows={[
              ['Appels par minute (par compte, toutes clés)', '60'],
              ['Livraisons créées par jour', '200'],
              ['Adresses webhook', '3 par environnement'],
              ['Clés actives', '10'],
              ['Taille d\'une requête', '64 Ko (413 PAYLOAD_TOO_LARGE au-delà)'],
            ]} />
            <P>
              Chaque réponse indique <Code>X-RateLimit-Limit</Code> et <Code>X-RateLimit-Remaining</Code>. Au-delà :
              <Code>429</Code> avec <Code>Retry-After</Code>. Besoin de plus ? Contactez DEM : les limites sont
              ajustables par compte.
            </P>
          </Section>

          <Section id="securite" title="Sécurité">
            <ul className="space-y-3 mb-6">
              {[
                ['La clé reste sur votre serveur', 'Jamais dans du JavaScript, une application mobile publiée ou un dépôt de code public. Appelez l\'API depuis votre serveur.'],
                ['Une clé par site', 'En cas de fuite, révoquez seulement celle-là, sans couper les autres.'],
                ['Droits minimaux', 'Ne cochez que ce dont le site a besoin. Une boutique qui ne fait que créer des livraisons n\'a pas besoin d\'annuler.'],
                ['Signature vérifiée', 'N\'acceptez aucun webhook sans signature valide et récente.'],
                ['request_id', 'Gardez-le dans vos journaux : avec lui, le support DEM retrouve la requête exacte.'],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <ShieldCheck size={18} className="text-cyan shrink-0 mt-1" />
                  <span className="text-white/80"><strong className="text-white">{t}.</strong> {d}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="changelog" title="Versions">
            <Table head={['Date', 'Version', 'Changements']} rows={[
              ['Octobre 2026', 'v1', 'Première version : devis, livraisons, suivi, annulation, idempotence, webhooks signés, paiement espèces ou wallet DEM Pro.'],
            ]} />
            <P>Une question sur l'intégration ? Écrivez à <a href="mailto:support@dem.sn"><span className="text-cyan underline">support@dem.sn</span></a> avec le <Code>request_id</Code> concerné.</P>
          </Section>
        </main>
      </div>
    </div>

    <div data-header-theme="black">
      <ContactCTA
        theme="cyan-deep"
        watermark="API"
        subtitle="Passez à l'action"
        title="Prêt à brancher"
        highlight="votre site ?"
        description="L'API DEM est incluse dans l'offre DEM Pro Premium. Créez votre première clé de test dans l'application, ou parlons de votre projet."
        primaryBtnText="Voir l'offre Premium"
        primaryBtnLink="/dem-pro#tarifs"
        primaryBtnIcon="arrow"
        secondaryBtnText="Contacter DEM"
        secondaryBtnLink="/contact?subject=Je%20suis%20DEM%20Pro"
        secondaryBtnIcon="mail"
      />
    </div>
    </>
  )
}

// ── Composants ───────────────────────────────────────────────────────────────

// Section visible : la plus haute dont le titre a passé le haut de l'écran
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 140) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

function Section({ id, title, children }) {
  return (
    <section id={id} data-reveal className="scroll-mt-32 lg:scroll-mt-28 pb-14 mb-14 border-b border-white/10 last:border-0">
      <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6">
        <a href={`#${id}`} className="group"><span className="group-hover:text-cyan transition-colors">{title}</span></a>
      </h2>
      {children}
    </section>
  )
}

const H3 = ({ children }) => <h3 className="text-lg font-bold mt-8 mb-3">{children}</h3>
const P = ({ children }) => <p className="text-white/80 leading-relaxed mb-5">{children}</p>
const Code = ({ children }) => (
  <code className="font-mono text-[0.86em] px-1.5 py-0.5 bg-white/10 text-cyan break-words">{children}</code>
)

function Steps({ items }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      {items.map(([t, d], i) => (
        <li key={t} className="p-5 border border-white/10 bg-white/[0.03]">
          <div className="text-cyan font-black text-2xl mb-2">{i + 1}</div>
          <div className="font-bold mb-1">{t}</div>
          <div className="text-sm text-white/70 leading-relaxed">{d}</div>
        </li>
      ))}
    </ol>
  )
}

function Callout({ icon: Icon = Info, tone = 'info', children }) {
  const warn = tone === 'warn'
  return (
    <div className={`flex gap-3 p-4 mb-6 border ${warn ? 'border-orange-brand/40 bg-orange-brand/10' : 'border-cyan/30 bg-cyan/5'}`}>
      <Icon size={18} className={`shrink-0 mt-0.5 ${warn ? 'text-orange-brand' : 'text-cyan'}`} />
      <div className="text-sm text-white/85 leading-relaxed">{children}</div>
    </div>
  )
}

const METHOD_COLORS = {
  GET:    'bg-[#00E08C]/15 text-[#00E08C] border-[#00E08C]/30',
  POST:   'bg-[#00D2FF]/15 text-[#00D2FF] border-[#00D2FF]/30',
  PATCH:  'bg-[#FF9800]/15 text-[#FF9800] border-[#FF9800]/30',
  DELETE: 'bg-[#FF5C5C]/15 text-[#FF5C5C] border-[#FF5C5C]/30',
}

// Carte d'une route : méthode, chemin, droit nécessaire
function Endpoint({ method, path, scope }) {
  return (
    <div className="group flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 px-4 py-3.5 border border-white/10 bg-gradient-to-r from-white/[0.05] to-transparent hover:border-[#00D2FF]/40 transition-colors">
      <span className={`font-mono text-[11px] font-bold tracking-wider px-2.5 py-1 border ${METHOD_COLORS[method]}`}>{method}</span>
      <span className="font-mono text-[15px] text-white break-all">
        <span className="text-white/40">/v1</span>{path.split(/(\{[^}]+\})/).map((part, i) => (
          part.startsWith('{') ? <span key={i} className="text-[#FFA657]">{part}</span> : part
        ))}
      </span>
      {scope && (
        <span className="sm:ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono text-white/55 px-2 py-1 bg-white/[0.04] border border-white/10">
          <KeyRound size={11} /> {scope}
        </span>
      )}
    </div>
  )
}

// Fenêtre de code façon éditeur : 3 points, langage, coloration, copier.
// `tabs` = [[libellé, code], …] pour plusieurs langages dans la même fenêtre.
function CodeWindow({ tabs, title }) {
  const [i, setI] = useState(0)
  const [copied, setCopied] = useState(false)
  const code = tabs[i][1]
  const lang = guessLang(code)
  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* presse-papiers refusé */ }
  }
  return (
    <div className="mb-6 border border-white/10 bg-[#0A0F1E] shadow-[0_20px_60px_-30px_rgba(0,134,200,0.5)]">
      <div className="flex items-center gap-3 px-4 border-b border-white/10 bg-white/[0.03] min-h-[42px]">
        <span className="hidden sm:flex gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </span>
        {tabs.length > 1 ? (
          <div className="flex self-stretch overflow-x-auto" role="tablist">
            {tabs.map(([label], k) => (
              <button key={label} type="button" role="tab" aria-selected={i === k} onClick={() => setI(k)}
                className={`px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${i === k ? 'border-[#00D2FF] text-white' : 'border-transparent text-white/45 hover:text-white/80'}`}>
                {label}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-[11px] uppercase tracking-widest text-white/45 font-semibold">{title ?? LANG_LABELS[lang]}</span>
        )}
        <button type="button" onClick={copy} className={`ml-auto inline-flex items-center gap-1.5 text-xs px-2 py-1 transition-all ${copied ? 'text-[#00E08C] bg-[#00E08C]/10' : 'text-white/55 hover:text-[#00D2FF]'}`}>
          {copied ? <><Check size={13} /> Copié</> : <><Copy size={13} /> Copier</>}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 sm:p-5 text-[12.5px] sm:text-[13px] leading-[1.7] font-mono text-white/90"><code>{highlight(code, lang)}</code></pre>
    </div>
  )
}

const CodeBlock = ({ code, title }) => <CodeWindow tabs={[[title ?? '', code]]} title={title} />
const Tabs = ({ tabs }) => <CodeWindow tabs={tabs} />

// La vie d'une livraison : étapes cliquables, le point avance tout seul
const LIFE = [
  ['SEARCHING_DRIVER', 'Recherche', 'delivery.created', 'Livraison créée, DEM cherche le coursier le plus proche.'],
  ['DRIVER_ASSIGNED', 'Coursier trouvé', 'delivery.driver_assigned', 'Un coursier a accepté et va au point de retrait. Prénom, téléphone et position disponibles.'],
  ['PICKED_UP', 'Colis récupéré', 'delivery.picked_up', 'Le coursier a le colis et part vers votre client.'],
  ['DELIVERED', 'Livrée', 'delivery.delivered', 'Votre client a reçu sa commande. Passez-la à « livrée ».'],
]

function Lifecycle() {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setStep(n => (n + 1) % LIFE.length), 2400)
    return () => clearInterval(t)
  }, [auto])
  const pick = (k) => { setAuto(false); setStep(k) }
  const [status, , event, desc] = LIFE[step]
  return (
    <div className="mb-8 border border-white/10 bg-[#0A0F1E] p-5 sm:p-7">
      <div className="relative grid grid-cols-4 gap-2">
        <div className="absolute left-[12.5%] right-[12.5%] top-[15px] h-[2px] bg-white/10" aria-hidden="true">
          <div className="h-full bg-[#00D2FF] transition-all duration-700 ease-out" style={{ width: `${(step / (LIFE.length - 1)) * 100}%` }} />
        </div>
        {LIFE.map(([st, label], k) => (
          <button key={st} type="button" onClick={() => pick(k)} className="relative z-10 flex flex-col items-center gap-2.5 group">
            <span className={`w-8 h-8 flex items-center justify-center border-2 font-mono text-xs font-bold transition-all duration-500 ${k <= step ? 'bg-[#00D2FF] border-[#00D2FF] text-[#021520]' : 'bg-[#0A0F1E] border-white/20 text-white/40 group-hover:border-white/50'} ${k === step ? 'shadow-[0_0_0_6px_rgba(0,210,255,0.15)]' : ''}`}>{k + 1}</span>
            <span className={`text-[11px] sm:text-xs font-semibold text-center leading-tight transition-colors ${k === step ? 'text-white' : 'text-white/45'}`}>{label}</span>
          </button>
        ))}
      </div>
      <div key={step} className="mt-6 pt-5 border-t border-white/10 grid sm:grid-cols-[auto_1fr] gap-x-6 gap-y-2 dev-fade">
        <div className="flex flex-col gap-1.5">
          <code className="font-mono text-[13px] text-[#00D2FF]">{status}</code>
          <code className="font-mono text-[11.5px] text-[#00E08C]">→ {event}</code>
        </div>
        <p className="text-sm text-white/75 leading-relaxed">{desc}</p>
      </div>
      <p className="mt-4 text-[11.5px] text-white/40">Cliquez sur une étape. En cas d'annulation (par vous, le support ou faute de coursier) : <span className="font-mono text-white/60">CANCELLED</span> et <span className="font-mono text-white/60">delivery.cancelled</span>.</p>
      <style>{`.dev-fade{animation:devFade .45s ease-out}@keyframes devFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){.dev-fade{animation:none}}`}</style>
    </div>
  )
}

function Table({ head, rows, mono = [] }) {
  return (
    <div className="overflow-x-auto mb-6 border border-white/10">
      <table className="w-full text-sm border-collapse min-w-[520px]">
        <thead>
          <tr className="bg-cyan/10">
            {head.map(h => <th key={h} className="text-left px-4 py-2.5 font-bold text-white whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-t border-white/10 align-top hover:bg-white/[0.03] transition-colors">
              {r.map((c, ci) => (
                <td key={ci} className={`px-4 py-2.5 ${mono.includes(ci) ? 'font-mono text-[12.5px] text-[#00D2FF]' : ci === 0 ? 'text-white' : 'text-white/75'}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

