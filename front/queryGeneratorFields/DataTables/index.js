import parse from 'html-react-parser';

import { FormatPrice } from '../../ui/utils/currency';
import Badge from './Components/Badge';
import BooleanFormat from './Components/BooleanFormat';
import DateTimeFormat from './Components/DateTimeFromat';
import HeadEstablishment from './Components/HeadEstabishment';
import Link from './Components/Link';
import Status from './Components/Status';
import Unit from './Components/Unit';

const fieldsMapper = {
    id_academie: {
        headerLabel: 'id academie',
        component: (data) => data
    },
    nom: {
        headerLabel: 'nom',
        component: (data) => <span className=" fw-bolder"> {data}</span>
    },
    id_bureau_ca: {
        headerLabel: 'id bureau ca',
        component: (data) => data
    },
    id_unitorg: {
        headerLabel: 'id unitorg',
        component: (data) => data
    },
    college: {
        headerLabel: 'college',
        component: (data) => <span className=" fw-bolder grey-600"> {data}</span>
    },
    id_ca_unetp: {
        headerLabel: 'id ca unetp',
        component: (data) => data
    },
    abbreviation: {
        headerLabel: 'abbreviation',
        component: (data) => data
    },
    genre: {
        headerLabel: 'genre',
        component: (data) => data
    },
    id_civilite: {
        headerLabel: 'id civilite',
        component: (data) => data
    },
    ordre: {
        headerLabel: 'ordre',
        component: (data) => data
    },
    id_college: {
        headerLabel: 'id college',
        component: (data) => data
    },
    libelle: {
        headerLabel: 'libelle',
        component: (data) => <span className=" fw-bolder grey-600"> {data}</span>
    },
    adresse_ligne1: {
        headerLabel: 'adresse ligne1',
        component: (data) => data
    },
    adresse_ligne3: {
        headerLabel: 'adresse ligne3',
        component: (data) => data
    },
    cedex: {
        headerLabel: 'cedex',
        component: (data) => data
    },
    code_postal: {
        headerLabel: 'code postal',
        component: (data) => data
    },
    defaut: {
        headerLabel: 'defaut',
        component: (data) => <BooleanFormat data={data} />
    },
    destinataire: {
        headerLabel: 'destinataire',
        component: (data) => data
    },
    destinataire_complement: {
        headerLabel: 'destinataire complement',
        component: (data) => data
    },
    email: {
        headerLabel: 'email',
        component: (data) => <Link data={data} type={'mail'} />
    },
    fax: {
        headerLabel: 'fax',
        component: (data) => data
    },
    id_coordonnee: {
        headerLabel: 'id coordonnee',
        component: (data) => data
    },
    id_fonction: {
        headerLabel: 'id fonction',
        component: (data) => data
    },
    id_pays: {
        headerLabel: 'id pays',
        component: (data) => data
    },
    id_personne: {
        headerLabel: 'id personne',
        component: (data) => data
    },
    libelle_voie: {
        headerLabel: 'libelle voie',
        component: (data) => data
    },
    mobile: {
        headerLabel: 'mobile',
        component: (data) => <Link data={data} type={'phone'} />
    },
    numero_voie: {
        headerLabel: 'numero voie',
        component: (data) => data
    },
    site_web: {
        headerLabel: 'site web',
        component: (data) => <Link data={data} type={'link'} />
    },
    telephone: {
        headerLabel: 'telephone',
        component: (data) => <Link data={data} type={'phone'} />
    },
    type_adresse_postale: {
        headerLabel: 'type adresse postale',
        component: (data) => data
    },
    ville: {
        headerLabel: 'ville',
        component: (data) => data
    },
    date_last_relance: {
        headerLabel: 'date dernier relance',
        component: (data) => data
    },
    id_cotisation: {
        headerLabel: 'id cotisation',
        component: (data) => data
    },
    id_cotisation_parametre: {
        headerLabel: 'id cotisation parametre',
        component: (data) => data
    },
    id_cotisation_syndicat: {
        headerLabel: 'id cotisation syndicat',
        component: (data) => data
    },
    montant_calcule: {
        headerLabel: 'montant calcule',
        component: (data) => <FormatPrice value={data} />
    },
    montant_part_fixe: {
        headerLabel: 'montant part fixe',
        component: (data) => <FormatPrice value={data} />
    },
    montant_personnalise: {
        headerLabel: 'montant personnalise',
        component: (data) => <FormatPrice value={data} />
    },
    nb_relance: {
        headerLabel: 'nombre relance',
        component: (data) => data
    },
    statut: {
        headerLabel: 'statut',
        component: (data) => <Status data={data} />
    },
    expediteur_appel_cotisation: {
        headerLabel: 'expediteur appel cotisation',
        component: (data) => data
    },
    expediteur_gel_compte: {
        headerLabel: 'expediteur gel compte',
        component: (data) => data
    },
    expediteur_relance: {
        headerLabel: 'expediteur relance',
        component: (data) => data
    },
    frequence_relance: {
        headerLabel: 'frequence relance',
        component: (data) => data
    },
    id_cotisation_courrier: {
        headerLabel: 'id cotisation courrier',
        component: (data) => data
    },
    msg_appel_cotisation: {
        headerLabel: 'msg appel cotisation',
        component: (data) => data
    },
    msg_gel_compte: {
        headerLabel: 'msg gel compte',
        component: (data) => data
    },
    msg_relance: {
        headerLabel: 'msg relance',
        component: (data) => data
    },
    seuil_gel: {
        headerLabel: 'seuil gel',
        component: (data) => data
    },
    sujet_appel_cotisation: {
        headerLabel: 'sujet appel cotisation',
        component: (data) => data
    },
    sujet_gel_compte: {
        headerLabel: 'sujet gel compte',
        component: (data) => data
    },
    sujet_relance: {
        headerLabel: 'sujet relance',
        component: (data) => data
    },
    id_cotisation_etablissement: {
        headerLabel: 'id cotisation etablissement',
        component: (data) => data
    },
    id_cotisation_personne: {
        headerLabel: 'id cotisation personne',
        component: (data) => data
    },
    id_cotisation_paiement: {
        headerLabel: 'id cotisation paiement',
        component: (data) => data
    },
    id_cotisation_ref_paiement: {
        headerLabel: 'id cotisation ref paiement',
        component: (data) => data
    },
    montant: {
        headerLabel: 'montant',
        component: (data) => <FormatPrice value={data} />
    },
    ancien: {
        headerLabel: 'ancien',
        component: (data) => <FormatPrice value={data} />
    },
    annee: {
        headerLabel: 'annee',
        component: (data) => <Badge data={data} />
    },
    autre_dirigeant: {
        headerLabel: 'autre dirigeant',
        component: (data) => <FormatPrice value={data} />
    },
    cfa_ufa: {
        headerLabel: 'cfa ufa',
        component: (data) => <FormatPrice value={data} />
    },
    cfp_cfc: {
        headerLabel: 'cfp cfc',
        component: (data) => <FormatPrice value={data} />
    },
    chef_etablissement: {
        headerLabel: 'chef etablissement',
        component: (data) => <HeadEstablishment data={data} />
    },
    date_appel: {
        headerLabel: 'date appel',
        component: (data) => <DateTimeFormat data={data} />
    },
    fonctionnement_college_employeur: {
        headerLabel: 'fonctionnement college employeur',
        component: (data) => <FormatPrice value={data} />
    },
    hc_autre: {
        headerLabel: 'hc autre',
        component: (data) => <FormatPrice value={data} />
    },
    hc_bts: {
        headerLabel: 'hc bts',
        component: (data) => <FormatPrice value={data} />
    },
    hc_lp: {
        headerLabel: 'hc lp',
        component: (data) => <FormatPrice value={data} />
    },
    hc_lt: {
        headerLabel: 'hc lt',
        component: (data) => <FormatPrice value={data} />
    },
    hc_sup: {
        headerLabel: 'hc sup',
        component: (data) => <FormatPrice value={data} />
    },
    last_date_appel: {
        headerLabel: 'last date appel',
        component: (data) => <DateTimeFormat data={data} />
    },
    last_log_appel: {
        headerLabel: 'last log appel',
        component: (data) => <pre>{data}</pre>
    },
    part_fixe_034: {
        headerLabel: 'part fixe 034',
        component: (data) => <FormatPrice value={data} />
    },
    part_fixe_12: {
        headerLabel: 'part fixe 12',
        component: (data) => <FormatPrice value={data} />
    },
    sc_autre: {
        headerLabel: 'sc autre',
        component: (data) => <FormatPrice value={data} />
    },
    sc_bts: {
        headerLabel: 'sc bts',
        component: (data) => <FormatPrice value={data} />
    },
    sc_college: {
        headerLabel: 'sc college',
        component: (data) => <FormatPrice value={data} />
    },
    sc_lp: {
        headerLabel: 'sc lp',
        component: (data) => <FormatPrice value={data} />
    },
    sc_lt: {
        headerLabel: 'sc lt',
        component: (data) => <FormatPrice value={data} />
    },
    sc_sup: {
        headerLabel: 'sc sup',
        component: (data) => <FormatPrice value={data} />
    },
    banque_logs: {
        headerLabel: 'banque logs',
        component: (data) => <div className="fs-7 text-gray-900">{parse(data || '')} </div>
    },
    banque_reference: {
        headerLabel: 'banque reference',
        component: (data) => data
    },
    banque_statut: {
        headerLabel: 'banque statut',
        component: (data) => data
    },
    date_depot: {
        headerLabel: 'date depot',
        component: (data) => <DateTimeFormat data={data} />
    },
    date_encaissement: {
        headerLabel: 'date encaissement',
        component: (data) => <DateTimeFormat data={data} />
    },
    reference: {
        headerLabel: 'reference',
        component: (data) => <Badge data={data} size="sm" />
    },
    type_paiement: {
        headerLabel: 'type paiement',
        component: (data) => <Badge data={data} />
    },
    description: {
        headerLabel: 'description',
        component: (data) => <pre>{data}</pre>
    },
    id_delegation: {
        headerLabel: 'id delegation',
        component: (data) => data
    },
    action: {
        headerLabel: 'action',
        component: (data) => data
    },
    id_demande: {
        headerLabel: 'id demande',
        component: (data) => data
    },
    id_objet: {
        headerLabel: 'id objet',
        component: (data) => data
    },
    json: {
        headerLabel: 'json',
        component: (data) => data
    },
    nom_objet: {
        headerLabel: 'nom objet',
        component: (data) => data
    },
    user_id: {
        headerLabel: 'user id',
        component: (data) => data
    },
    code_departement: {
        headerLabel: 'code departement',
        component: (data) => <Badge data={data} />
    },
    id_departement: {
        headerLabel: 'id departement',
        component: (data) => data
    },
    id_diplome: {
        headerLabel: 'id diplome',
        component: (data) => data
    },
    id_diplome_domaine: {
        headerLabel: 'id diplome domaine',
        component: (data) => data
    },
    id_diplome_fonction: {
        headerLabel: 'id diplome fonction',
        component: (data) => data
    },
    id_diplome_groupe: {
        headerLabel: 'id diplome groupe',
        component: (data) => data
    },
    id_diplome_niveau: {
        headerLabel: 'id diplome niveau',
        component: (data) => data
    },
    id_diplome_sous_groupe: {
        headerLabel: 'id diplome sous groupe',
        component: (data) => data
    },
    id_diplome_specialite: {
        headerLabel: 'id diplome specialite',
        component: (data) => data
    },
    id_diplome_type: {
        headerLabel: 'id diplome type',
        component: (data) => data
    },
    code: {
        headerLabel: 'code',
        component: (data) => <Badge data={data} />
    },
    cle_etablissement: {
        headerLabel: "Clé d'établissement",
        component: (data) => <Badge data={data} />
    },
    commentaires: {
        headerLabel: 'Commentaires',
        component: (data) => <pre>{data}</pre>
    },
    commentaires_formation: {
        headerLabel: 'Commentaires formation',
        component: (data) => <pre>{data}</pre>
    },
    commentaires_prives: {
        headerLabel: 'Commentaires privés',
        component: (data) => <pre>{data}</pre>
    },
    date_premiere_adhesion: {
        headerLabel: 'Date premiere adhesion',
        component: (data) => <DateTimeFormat data={data} />
    },
    id_delegue: {
        headerLabel: 'Id delegue',
        component: (data) => data
    },
    id_etablissement: {
        headerLabel: 'Id établissement',
        component: (data) => data
    },
    id_etablissement_pere: {
        headerLabel: 'Id établissement père',
        component: (data) => data
    },
    mixite: {
        headerLabel: 'mixite',
        component: (data) => data
    },
    num_acad_cfa: {
        headerLabel: 'N° établissement (UAI/RNE) CFA',
        component: (data) => data
    },
    num_acad_lp: {
        headerLabel: 'N° établissement (UAI/RNE) LP',
        component: (data) => data
    },
    num_acad_lt: {
        headerLabel: 'N° établissement (UAI/RNE) LT',
        component: (data) => data
    },
    num_existence_cfp: {
        headerLabel: 'N° établissement (UAI/RNE) CFC',
        component: (data) => data
    },
    numero_etablissement: {
        headerLabel: "Numéro d'établissement",
        component: (data) => data
    },
    ogec_address: {
        headerLabel: 'Code postale de coordonnées de l’organisme de gestion',
        component: (data) => data
    },
    ogec_name: {
        headerLabel: 'Nom de coordonnées de l’organisme de gestion',
        component: (data) => data
    },
    ogec_phone_number: {
        headerLabel: 'Numéro de téléphone de coordonnées de l’organisme de gestion',
        component: (data) => <Link data={data} type={'phone'} />
    },
    relation_unetp: {
        headerLabel: 'relation unetp',
        component: (data) => data
    },
    complement: {
        headerLabel: 'complement',
        component: (data) => <pre>{data}</pre>
    },
    id_etablissement_has_diplome: {
        headerLabel: 'id etablissement has diplome',
        component: (data) => data
    },
    client_filename: {
        headerLabel: 'client filename',
        component: (data) => data
    },
    content_type: {
        headerLabel: 'content type',
        component: (data) => data
    },
    date_fichier: {
        headerLabel: 'date fichier',
        component: (data) => data
    },
    extension: {
        headerLabel: 'extension',
        component: (data) => data
    },
    filename: {
        headerLabel: 'filename',
        component: (data) => data
    },
    hauteur: {
        headerLabel: 'hauteur',
        component: (data) => data
    },
    id_fichier: {
        headerLabel: 'id fichier',
        component: (data) => data
    },
    id_nl_envoi: {
        headerLabel: 'id nl envoi',
        component: (data) => data
    },
    largeur: {
        headerLabel: 'largeur',
        component: (data) => data
    },
    mode: {
        headerLabel: 'mode',
        component: (data) => data
    },
    poids: {
        headerLabel: 'poids',
        component: (data) => data
    },
    type_usage: {
        headerLabel: 'type usage',
        component: (data) => data
    },
    date_debut: {
        headerLabel: 'date debut',
        component: (data) => <DateTimeFormat data={data} />
    },
    date_fin: {
        headerLabel: 'date fin',
        component: (data) => <DateTimeFormat data={data} />
    },
    commentaire: {
        headerLabel: 'commentaire',
        component: (data) => <pre>{data}</pre>
    },
    date_creation: {
        headerLabel: 'Date creation',
        component: (data) => <DateTimeFormat data={data} />
    },
    createur: {
        headerLabel: 'createur',
        component: (data) => data
    },
    modificateur: {
        headerLabel: 'Modificateur',
        component: (data) => data
    },
    date_modification: {
        headerLabel: 'Date Modification',
        component: (data) => <DateTimeFormat data={data} />
    },
    id_label_fonction: {
        headerLabel: 'id label fonction',
        component: (data) => data
    },
    type: {
        headerLabel: 'type',
        component: (data) => data
    },
    date: {
        headerLabel: 'date',
        component: (data) => <DateTimeFormat data={data} />
    },
    id_historique: {
        headerLabel: 'id historique',
        component: (data) => data
    },
    id_type_historique: {
        headerLabel: 'id type historique',
        component: (data) => data
    },
    id_historique_capacite: {
        headerLabel: 'id historique capacite',
        component: (data) => data
    },

    nb_apprentis: {
        headerLabel: 'nombre apprentis',
        component: (data) => data
    },
    nb_apprentis_cfa_ufa: {
        headerLabel: 'nombre apprentis cfa ufa',
        component: (data) => data
    },
    nb_eleves_college_employeur: {
        headerLabel: 'nombre eleves college employeur',
        component: (data) => data
    },
    nb_eleves_hors_contrat_autre: {
        headerLabel: 'nombre eleves hors contrat autre',
        component: (data) => data
    },
    nb_eleves_hors_contrat_bts: {
        headerLabel: 'nombre eleves hors contrat bts',
        component: (data) => data
    },
    nb_eleves_hors_contrat_lp: {
        headerLabel: 'nombre eleves hors contrat lp',
        component: (data) => data
    },
    nb_eleves_hors_contrat_lt: {
        headerLabel: 'nombre eleves hors contrat lt',
        component: (data) => data
    },
    nb_eleves_hors_contrat_sup: {
        headerLabel: 'nombre eleves hors contrat sup',
        component: (data) => data
    },
    nb_eleves_sous_contrat_autre: {
        headerLabel: 'nombre eleves sous contrat autre',
        component: (data) => data
    },
    nb_eleves_sous_contrat_bts: {
        headerLabel: 'nombre eleves sous contrat bts',
        component: (data) => data
    },
    nb_eleves_sous_contrat_college: {
        headerLabel: 'nombre eleves sous contrat college',
        component: (data) => data
    },
    nb_eleves_sous_contrat_lp: {
        headerLabel: 'nombre eleves sous contrat lp',
        component: (data) => data
    },
    nb_eleves_sous_contrat_lt: {
        headerLabel: 'nombre eleves sous contrat lt',
        component: (data) => data
    },
    nb_eleves_sous_contrat_sup: {
        headerLabel: 'nombre eleves sous contrat sup',
        component: (data) => data
    },
    nb_heures_stagiaire: {
        headerLabel: 'nombre heures stagiaire',
        component: (data) => data
    },
    nb_heures_stagiaire_cfp_cfc: {
        headerLabel: 'nombre heures stagiaire cfp cfc',
        component: (data) => data
    },

    id_interregion: {
        headerLabel: 'id interregion',
        component: (data) => data
    },

    id_label_etablissement: {
        headerLabel: 'id label etablissement',
        component: (data) => data
    },
    annuaire: {
        headerLabel: 'annuaire',
        component: (data) => data
    },
    id_type_unitorg: {
        headerLabel: 'id type unitorg',
        component: (data) => data
    },
    nom_feminin: {
        headerLabel: 'nom feminin',
        component: (data) => data
    },
    nom_masculin: {
        headerLabel: 'nom masculin',
        component: (data) => data
    },
    nom_pluriel_feminin: {
        headerLabel: 'nom pluriel feminin',
        component: (data) => data
    },
    nom_pluriel_masculin: {
        headerLabel: 'nom pluriel masculin',
        component: (data) => data
    },
    valeur: {
        headerLabel: 'valeur',
        component: (data) => data
    },
    classe: {
        headerLabel: 'classe',
        component: (data) => data
    },
    date_envoi: {
        headerLabel: 'date envoi',
        component: (data) => <DateTimeFormat data={data} />
    },
    duree: {
        headerLabel: 'duree',
        component: (data) => <Unit data={data} variant="secondary" unit="sec" />
    },
    email_de: {
        headerLabel: 'email de',
        component: (data) => <Link data={data} type="mail" />
    },
    id_nl_modele: {
        headerLabel: 'id nl modele',
        component: (data) => data
    },
    libelle_de: {
        headerLabel: 'libelle de',
        component: (data) => data
    },
    logs: {
        headerLabel: 'logs',
        component: (data) => data
    },
    nb_destinataires: {
        headerLabel: 'nombre destinataires',
        component: (data) => <Badge data={data} size="sm" variant="secondary" />
    },
    piece_jointe: {
        headerLabel: 'piece jointe',
        component: (data) => data
    },
    requete: {
        headerLabel: 'requete',
        component: (data) => data
    },
    sujet: {
        headerLabel: 'sujet',
        component: (data) => data
    },
    texte: {
        headerLabel: 'texte',
        component: (data) => data
    },
    type_coordonnee: {
        headerLabel: 'type coordonnee',
        component: (data) => data
    },
    date_dernier_envoi: {
        headerLabel: 'date dernier envoi',
        component: (data) => <DateTimeFormat data={data} isDateTime />
    },
    emails_test: {
        headerLabel: 'emails test',
        component: (data) => data
    },
    nb_envois: {
        headerLabel: 'nombre envois',
        component: (data) => <Badge data={data} size="sm" variant="secondary" />
    },
    id_pension: {
        headerLabel: 'id pension',
        component: (data) => data
    },
    ancien_chef_etab: {
        headerLabel: 'ancien chef etab',
        component: (data) => <BooleanFormat data={data} />
    },
    archived: {
        headerLabel: 'archived',
        component: (data) => <BooleanFormat data={data} />
    },
    date_naissance: {
        headerLabel: 'date naissance',
        component: (data) => <DateTimeFormat data={data} />
    },
    deleted: {
        headerLabel: 'deleted',
        component: (data) => <BooleanFormat data={data} />
    },
    file_name_photo: {
        headerLabel: 'file name photo',
        component: (data) => data
    },
    nom_naissance: {
        headerLabel: 'nom naissance',
        component: (data) => data
    },
    num_delegue: {
        headerLabel: 'num delegue',
        component: (data) => data
    },
    particule: {
        headerLabel: 'particule',
        component: (data) => data
    },
    prenom: {
        headerLabel: 'prenom',
        component: (data) => data
    },
    sexe: {
        headerLabel: 'sexe',
        component: (data) => data
    },
    id_ra_champ: {
        headerLabel: 'id ra champ',
        component: (data) => data
    },

    fields: {
        headerLabel: 'fields',
        component: (data) => data
    },
    id_ra_requete: {
        headerLabel: 'id ra requete',
        component: (data) => data
    },
    tree: {
        headerLabel: 'tree',
        component: (data) => data
    },
    date_creation_reseau: {
        headerLabel: 'date creation reseau',
        component: (data) => <DateTimeFormat data={data} />
    },
    id_reseau: {
        headerLabel: 'id reseau',
        component: (data) => data
    },

    name: {
        headerLabel: 'name',
        component: (data) => data
    },

    next_val: {
        headerLabel: 'next val',
        component: (data) => data
    },

    id_tutelle: {
        headerLabel: 'id tutelle',
        component: (data) => data
    },
    id_type_unitorg_fils: {
        headerLabel: 'id type unitorg fils',
        component: (data) => data
    },
    id_type_unitorg_parent: {
        headerLabel: 'id type unitorg parent',
        component: (data) => data
    },
    id_unetp: {
        headerLabel: 'id unetp',
        component: (data) => data
    },
    file_name_logo: {
        headerLabel: 'file name logo',
        component: (data) => data
    },
    id_etablisement_jumelage: {
        headerLabel: 'id etablisement jumelage',
        component: (data) => data
    },
    id_pays_jumelage: {
        headerLabel: 'id pays jumelage',
        component: (data) => data
    },
    id_etablissement_partenaire: {
        headerLabel: 'id etablissement partenaire',
        component: (data) => data
    },
    id_pays_partenaire: {
        headerLabel: 'id pays partenaire',
        component: (data) => data
    },
    id_unitorg_fils: {
        headerLabel: 'id unitorg fils',
        component: (data) => data
    },
    id_unitorg_parent: {
        headerLabel: 'id unitorg parent',
        component: (data) => data
    }
};
export default fieldsMapper;
