//Views
import EstablishmentYearlySubscriptions from '../views/EstablishmentYearlySubscriptions';
import Academy from './Academy';
import Access from './Access';
import AdvancedSearchRequest from './AdvancedSearchRequest';
import CapacityHistory from './CapacityHistory';
import Civility from './Civility';
import College from './College';
import Coordinate from './Coordinate';
import cotisation_courrier from './cotisation_courrier';
import Country from './Country';
import Delegation from './Delegation';
import Department from './Department';
import Diploma from './Diploma';
import DiplomaDomain from './DiplomaDomain';
import DiplomaFunction from './DiplomaFunction';
import DiplomaGrade from './DiplomaGrade';
import DiplomaGroup from './DiplomaGroup';
import DiplomaSpecialty from './DiplomaSpecialty';
import DiplomaSubGroup from './DiplomaSubGroup';
import DiplomaType from './DiplomaType';
import Establishment from './Establishment';
import EstablishmentHasDiploma from './EstablishmentHasDiploma';
import EstablishmentLabel from './EstablishmentLabel';
import File from './File';
import Function from './Function';
import FunctionLabel from './FunctionLabel';
import Guardianship from './Guardianship';
import History from './History';
import HistoryType from './HistoryType';
import InterRegion from './InterRegion';
import IOHistory from './IOHistory';
import Meta from './Meta';
import Network from './Network';
import NetworkHasOrganization from './NetworkHasOrganization';
import OfficeCA from './OfficeCA';
import Organization from './Organization';
import OrganizationHasCountryPairing from './OrganizationHasCountryPairing';
import OrganizationHasCountryPartner from './OrganizationHasCountryPartner';
import OrganizationHasEstablishmentLabel from './OrganizationHasEstablishmentLabel';
import OrganizationHasGuardianship from './OrganizationHasGuardianship';
import OrganizationHasOrganization from './OrganizationHasOrganization';
import OrganizationHasPensions from './OrganizationHasPensions';
import OrganizationType from './OrganizationType';
import Pension from './Pension';
import ra_champ from './ra_champ';
import RelaunchHistory from './RelaunchHistory';
import Request from './Request';
import Sequence from './Sequence';
import SubscriptionFee from './SubscriptionFee';
import SubscriptionFeePaymentRef from './SubscriptionFeePaymentRef';
import SubscriptionHasSubscription from './SubscriptionHasSubscription';
import SubscriptionParams from './SubscriptionParams';
import SubscriptionPayment from './SubscriptionPayment';
import TypeOrganizationHasTypeOrganization from './TypeOrganizationHasTypeOrganization';
import Unetp from './Unetp';
import UnetpCA from './UnetpCA';
import UnionSubscriptionFees from './UnionSubscriptionFees';
import User from './User';

const initModels = () => {
    EstablishmentYearlySubscriptions.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    SubscriptionFee.belongsToMany(SubscriptionFee, {
        as: 'userSubscriptionFees',
        through: SubscriptionHasSubscription,
        foreignKey: 'id_cotisation_etablissement',
        otherKey: 'id_cotisation_personne'
    });
    SubscriptionFee.belongsToMany(SubscriptionFee, {
        as: 'establishmentSubscriptionFees',
        through: SubscriptionHasSubscription,
        foreignKey: 'id_cotisation_personne',
        otherKey: 'id_cotisation_etablissement'
    });

    Request.belongsTo(User, { foreignKey: 'user_id' });

    EstablishmentLabel.belongsToMany(Organization, {
        as: 'id_unitorg_unitorgs',
        through: OrganizationHasEstablishmentLabel,
        foreignKey: 'id_label_etablissement',
        otherKey: 'id_unitorg'
    });
    Country.belongsToMany(Organization, {
        through: OrganizationHasCountryPairing,
        foreignKey: 'id_pays_jumelage',
        otherKey: 'id_etablisement_jumelage'
    });
    Country.belongsToMany(Organization, {
        through: OrganizationHasCountryPartner,
        foreignKey: 'id_pays_partenaire',
        otherKey: 'id_etablissement_partenaire'
    });
    Pension.belongsToMany(Organization, {
        through: OrganizationHasPensions,
        foreignKey: 'id_pension',
        otherKey: 'id_etablissement'
    });
    Network.belongsToMany(Organization, {
        through: NetworkHasOrganization,
        foreignKey: 'id_reseau',
        otherKey: 'id_etablissement'
    });
    Guardianship.belongsToMany(Organization, {
        through: OrganizationHasGuardianship,
        foreignKey: 'id_tutelle',
        otherKey: 'id_etablissement'
    });
    OrganizationType.belongsToMany(OrganizationType, {
        as: 'id_type_unitorg_fils_type_unitorgs',
        through: TypeOrganizationHasTypeOrganization,
        foreignKey: 'id_type_unitorg_parent',
        otherKey: 'id_type_unitorg_fils'
    });
    OrganizationType.belongsToMany(OrganizationType, {
        as: 'id_type_unitorg_parent_type_unitorgs',
        through: TypeOrganizationHasTypeOrganization,
        foreignKey: 'id_type_unitorg_fils',
        otherKey: 'id_type_unitorg_parent'
    });
    Organization.belongsToMany(EstablishmentLabel, {
        through: OrganizationHasEstablishmentLabel,
        foreignKey: 'id_unitorg',
        otherKey: 'id_label_etablissement'
    });
    Organization.belongsToMany(Country, {
        through: OrganizationHasCountryPairing,
        foreignKey: 'id_etablisement_jumelage',
        otherKey: 'id_pays_jumelage'
    });
    Organization.belongsToMany(Country, {
        through: OrganizationHasCountryPartner,
        foreignKey: 'id_etablissement_partenaire',
        otherKey: 'id_pays_partenaire'
    });
    Organization.belongsToMany(Pension, {
        through: OrganizationHasPensions,
        foreignKey: 'id_etablissement',
        otherKey: 'id_pension'
    });
    Organization.belongsToMany(Network, {
        as: 'id_reseau_reseaus',
        through: NetworkHasOrganization,
        foreignKey: 'id_etablissement',
        otherKey: 'id_reseau'
    });
    Organization.belongsToMany(Guardianship, {
        through: OrganizationHasGuardianship,
        foreignKey: 'id_etablissement',
        otherKey: 'id_tutelle'
    });
    Organization.belongsToMany(Organization, {
        as: 'childrenOrganizations',
        through: OrganizationHasOrganization,
        foreignKey: 'id_unitorg_parent',
        otherKey: 'id_unitorg_fils'
    });
    Organization.belongsToMany(Organization, {
        as: 'parentOrganizations',
        through: OrganizationHasOrganization,
        foreignKey: 'id_unitorg_fils',
        otherKey: 'id_unitorg_parent'
    });
    Establishment.belongsTo(Academy, { foreignKey: 'id_academie' });
    Establishment.hasMany(IOHistory, { foreignKey: 'id_etablissement' });
    Academy.hasMany(Establishment, { foreignKey: 'id_academie' });
    User.belongsTo(Access, { foreignKey: 'id_acces' });
    Access.hasOne(User, { foreignKey: 'id_acces' });
    User.belongsTo(Civility, { foreignKey: 'id_civilite' });
    Civility.hasMany(User, { foreignKey: 'id_civilite' });
    User.belongsTo(College, { foreignKey: 'id_college' });
    College.hasMany(User, { as: 'personnes', foreignKey: 'id_college' });
    SubscriptionHasSubscription.belongsTo(SubscriptionFee, {
        as: 'id_cotisation_etablissement_cotisation',
        foreignKey: 'id_cotisation_etablissement'
    });
    SubscriptionFee.hasMany(SubscriptionHasSubscription, {
        as: 'cotisation_has_cotisations',
        foreignKey: 'id_cotisation_etablissement'
    });
    SubscriptionHasSubscription.belongsTo(SubscriptionFee, {
        as: 'id_cotisation_personne_cotisation',
        foreignKey: 'id_cotisation_personne'
    });
    SubscriptionFee.hasMany(SubscriptionHasSubscription, {
        as: 'subscriptionFees',
        foreignKey: 'id_cotisation_personne'
    });
    SubscriptionPayment.belongsTo(SubscriptionFee, {
        foreignKey: 'id_cotisation'
    });
    SubscriptionFee.hasMany(SubscriptionPayment, {
        foreignKey: 'id_cotisation'
    });
    SubscriptionFee.belongsTo(SubscriptionParams, {
        foreignKey: 'id_cotisation_parametre'
    });
    SubscriptionParams.hasMany(SubscriptionFee, {
        foreignKey: 'id_cotisation_parametre'
    });
    SubscriptionPayment.belongsTo(SubscriptionFeePaymentRef, {
        foreignKey: 'id_cotisation_ref_paiement'
    });
    SubscriptionFeePaymentRef.hasMany(SubscriptionPayment, {
        foreignKey: 'id_cotisation_ref_paiement'
    });
    SubscriptionFee.belongsTo(UnionSubscriptionFees, {
        foreignKey: 'id_cotisation_syndicat'
    });
    UnionSubscriptionFees.hasMany(SubscriptionFee, {
        as: 'cotisations',
        foreignKey: 'id_cotisation_syndicat'
    });
    Establishment.belongsTo(Department, {
        foreignKey: 'id_departement'
    });
    // Establishment.hasMany(IOHistory, { foreignKey: 'id_etablissement' });
    // IOHistory.hasOne(Establishment, { foreignKey: 'id_etablissement' });
    Department.hasMany(Establishment, { foreignKey: 'id_departement' });
    EstablishmentHasDiploma.belongsTo(Diploma, {
        foreignKey: 'id_diplome'
    });

    Diploma.hasMany(EstablishmentHasDiploma, {
        foreignKey: 'id_diplome'
    });
    Diploma.belongsTo(DiplomaDomain, {
        foreignKey: 'id_diplome_domaine'
    });
    DiplomaDomain.hasMany(Diploma, { foreignKey: 'id_diplome_domaine' });
    Diploma.belongsTo(DiplomaFunction, {
        foreignKey: 'id_diplome_fonction'
    });
    DiplomaFunction.hasMany(Diploma, { foreignKey: 'id_diplome_fonction' });
    Diploma.belongsTo(DiplomaGroup, {
        foreignKey: 'id_diplome_groupe'
    });
    DiplomaGroup.hasMany(Diploma, { foreignKey: 'id_diplome_groupe' });
    Diploma.belongsTo(DiplomaGrade, {
        foreignKey: 'id_diplome_niveau'
    });
    DiplomaGrade.hasMany(Diploma, { foreignKey: 'id_diplome_niveau' });
    Diploma.belongsTo(DiplomaSubGroup, {
        foreignKey: 'id_diplome_sous_groupe'
    });
    DiplomaSubGroup.hasMany(Diploma, { foreignKey: 'id_diplome_sous_groupe' });
    Diploma.belongsTo(DiplomaSpecialty, {
        foreignKey: 'id_diplome_specialite'
    });
    DiplomaSpecialty.hasMany(Diploma, { foreignKey: 'id_diplome_specialite' });
    Diploma.belongsTo(DiplomaType, {
        foreignKey: 'id_diplome_type'
    });
    DiplomaType.hasMany(Diploma, { foreignKey: 'id_diplome_type' });
    Coordinate.belongsTo(Function, { foreignKey: 'id_fonction' });
    Function.hasMany(Coordinate, { foreignKey: 'id_fonction' });
    User.belongsTo(InterRegion, {
        foreignKey: 'id_interregion'
    });
    InterRegion.hasMany(User, { foreignKey: 'id_interregion' });
    OrganizationHasEstablishmentLabel.belongsTo(EstablishmentLabel, {
        foreignKey: 'id_label_etablissement'
    });
    EstablishmentLabel.hasMany(OrganizationHasEstablishmentLabel, {
        foreignKey: 'id_label_etablissement'
    });
    Function.belongsTo(FunctionLabel, {
        foreignKey: 'id_label_fonction'
    });
    FunctionLabel.hasMany(Function, { foreignKey: 'id_label_fonction' });
    Coordinate.belongsTo(Country, { foreignKey: 'id_pays' });
    Country.hasMany(Coordinate, { foreignKey: 'id_pays' });
    OrganizationHasCountryPairing.belongsTo(Country, {
        foreignKey: 'id_pays_jumelage'
    });
    Country.hasMany(OrganizationHasCountryPairing, {
        foreignKey: 'id_pays_jumelage'
    });
    OrganizationHasCountryPartner.belongsTo(Country, {
        foreignKey: 'id_pays_partenaire'
    });
    Country.hasMany(OrganizationHasCountryPartner, {
        foreignKey: 'id_pays_partenaire'
    });
    OrganizationHasPensions.belongsTo(Pension, {
        foreignKey: 'id_pension'
    });
    Pension.hasMany(OrganizationHasPensions, { foreignKey: 'id_pension' });
    Coordinate.belongsTo(User, { foreignKey: 'id_personne' });
    User.hasMany(Coordinate, { foreignKey: 'id_personne' }, { onDelete: 'cascade' });
    SubscriptionFee.belongsTo(User, { foreignKey: 'id_personne' });
    User.hasMany(SubscriptionFee, { foreignKey: 'id_personne' }, { onDelete: 'cascade' });
    Establishment.belongsTo(User, { foreignKey: 'id_delegue' });
    User.hasMany(Establishment, { foreignKey: 'id_delegue' }, { onDelete: 'cascade' });
    Function.belongsTo(User, { foreignKey: 'id_personne' });
    User.hasMany(Function, { foreignKey: 'id_personne' }, { onDelete: 'cascade' });
    History.belongsTo(User, { foreignKey: 'id_personne' });
    User.hasMany(History, { foreignKey: 'id_personne' }, { onDelete: 'cascade' });
    NetworkHasOrganization.belongsTo(Network, { foreignKey: 'id_reseau' });
    Network.hasMany(NetworkHasOrganization, { foreignKey: 'id_reseau' });
    OrganizationHasGuardianship.belongsTo(Guardianship, { foreignKey: 'id_tutelle' });
    Guardianship.hasMany(OrganizationHasGuardianship, { foreignKey: 'id_tutelle' });
    History.belongsTo(HistoryType, {
        foreignKey: 'id_type_historique'
    });
    HistoryType.hasMany(History, { foreignKey: 'id_type_historique' });
    FunctionLabel.belongsTo(OrganizationType, {
        foreignKey: 'id_type_unitorg'
    });
    OrganizationType.hasMany(FunctionLabel, {
        foreignKey: 'id_type_unitorg'
    });
    TypeOrganizationHasTypeOrganization.belongsTo(OrganizationType, {
        as: 'id_type_unitorg_parent_type_unitorg',
        foreignKey: 'id_type_unitorg_parent'
    });
    OrganizationType.hasMany(TypeOrganizationHasTypeOrganization, {
        as: 'type_unitorg_has_type_unitorgs',
        foreignKey: 'id_type_unitorg_parent'
    });
    TypeOrganizationHasTypeOrganization.belongsTo(OrganizationType, {
        as: 'id_type_unitorg_fils_type_unitorg',
        foreignKey: 'id_type_unitorg_fils'
    });
    OrganizationType.hasMany(TypeOrganizationHasTypeOrganization, {
        as: 'id_type_unitorg_fils_type_unitorg_has_type_unitorgs',
        foreignKey: 'id_type_unitorg_fils'
    });
    Organization.belongsTo(OrganizationType, {
        foreignKey: 'id_type_unitorg'
    });
    OrganizationType.hasMany(Organization, { foreignKey: 'id_type_unitorg' });
    OfficeCA.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasMany(OfficeCA, { foreignKey: 'id_unitorg' });
    UnetpCA.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasMany(UnetpCA, { as: 'ca_unetps', foreignKey: 'id_unitorg' });
    Coordinate.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasMany(Coordinate, { foreignKey: 'id_unitorg' });
    SubscriptionFee.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasMany(SubscriptionFee, { foreignKey: 'id_unitorg' });
    Delegation.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasOne(Delegation, { foreignKey: 'id_unitorg' });
    Establishment.belongsTo(Organization, { as: 'organization', foreignKey: 'id_unitorg' });
    Organization.hasOne(Establishment, { as: 'establishment', foreignKey: 'id_unitorg' });
    Establishment.belongsTo(Organization, {
        as: 'delegation',
        foreignKey: 'id_delegation'
    });
    Organization.hasMany(Establishment, {
        as: 'id_delegation_etablissements',
        foreignKey: 'id_delegation'
    });
    Establishment.belongsTo(Organization, {
        as: 'id_etablissement_pere_unitorg',
        foreignKey: 'id_etablissement_pere'
    });
    RelaunchHistory.belongsTo(Establishment, { foreignKey: 'id_etablissement' });
    Establishment.hasMany(RelaunchHistory, { foreignKey: 'id_etablissement' });
    Organization.hasMany(Establishment, {
        as: 'id_etablissement_pere_etablissements',

        foreignKey: 'id_etablissement_pere'
    });
    EstablishmentHasDiploma.belongsTo(Organization, {
        foreignKey: 'id_etablissement'
    });
    Organization.hasMany(EstablishmentHasDiploma, {
        foreignKey: 'id_etablissement'
    });
    Function.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasMany(Function, { foreignKey: 'id_unitorg' });
    History.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasMany(History, { foreignKey: 'id_unitorg' });
    CapacityHistory.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasMany(CapacityHistory, { foreignKey: 'id_unitorg' });
    Network.belongsTo(Organization, { foreignKey: 'id_unitorg', as: 'organization' });
    Organization.hasOne(Network, { foreignKey: 'id_unitorg' });
    NetworkHasOrganization.belongsTo(Organization, {
        foreignKey: 'id_etablissement'
    });
    Organization.hasMany(NetworkHasOrganization, {
        foreignKey: 'id_etablissement'
    });
    Unetp.belongsTo(Organization, { foreignKey: 'id_unitorg' });
    Organization.hasMany(Unetp, { foreignKey: 'id_unitorg' });
    OrganizationHasEstablishmentLabel.belongsTo(Organization, {
        foreignKey: 'id_unitorg'
    });
    Organization.hasMany(OrganizationHasEstablishmentLabel, {
        foreignKey: 'id_unitorg'
    });
    OrganizationHasCountryPairing.belongsTo(Organization, {
        foreignKey: 'id_etablisement_jumelage'
    });
    Organization.hasMany(OrganizationHasCountryPairing, {
        foreignKey: 'id_etablisement_jumelage'
    });
    OrganizationHasCountryPartner.belongsTo(Organization, {
        foreignKey: 'id_etablissement_partenaire'
    });
    Organization.hasMany(OrganizationHasCountryPartner, {
        foreignKey: 'id_etablissement_partenaire'
    });
    OrganizationHasPensions.belongsTo(Organization, {
        foreignKey: 'id_etablissement'
    });
    Organization.hasMany(OrganizationHasPensions, {
        foreignKey: 'id_etablissement'
    });
    OrganizationHasGuardianship.belongsTo(Organization, {
        as: 'id_etablissement_unitorg',
        foreignKey: 'id_etablissement'
    });
    Organization.hasMany(OrganizationHasGuardianship, {
        as: 'unitorg_has_tutelles',
        foreignKey: 'id_etablissement'
    });
    OrganizationHasOrganization.belongsTo(Organization, {
        as: 'id_unitorg_parent_unitorg',
        foreignKey: 'id_unitorg_parent'
    });
    Organization.hasMany(OrganizationHasOrganization, {
        as: 'unitorg_has_unitorgs',
        foreignKey: 'id_unitorg_parent'
    });
    OrganizationHasOrganization.belongsTo(Organization, {
        as: 'id_unitorg_fils_unitorg',
        foreignKey: 'id_unitorg_fils'
    });
    Organization.hasMany(OrganizationHasOrganization, {
        as: 'id_unitorg_fils_unitorg_has_unitorgs',
        foreignKey: 'id_unitorg_fils'
    });

    return {
        Academy,
        Access,
        OfficeCA,
        UnetpCA,
        Civility,
        College,
        Coordinate,
        SubscriptionFee,
        cotisation_courrier,
        SubscriptionHasSubscription,
        SubscriptionPayment,
        SubscriptionParams,
        SubscriptionFeePaymentRef,
        UnionSubscriptionFees,
        Delegation,
        Request,
        Department,
        Diploma,
        DiplomaDomain,
        DiplomaFunction,
        DiplomaGroup,
        DiplomaGrade,
        DiplomaSubGroup,
        DiplomaSpecialty,
        DiplomaType,
        Establishment,
        EstablishmentHasDiploma,
        File,
        Function,
        History,
        CapacityHistory,
        InterRegion,
        EstablishmentLabel,
        FunctionLabel,
        Meta,
        Country,
        Pension,
        User,
        ra_champ,
        RelaunchHistory,
        AdvancedSearchRequest,
        Network,
        NetworkHasOrganization,
        Sequence,
        Guardianship,
        HistoryType,
        OrganizationType,
        TypeOrganizationHasTypeOrganization,
        Unetp,
        Organization,
        OrganizationHasEstablishmentLabel,
        OrganizationHasCountryPairing,
        OrganizationHasCountryPartner,
        OrganizationHasPensions,
        OrganizationHasGuardianship,
        OrganizationHasOrganization
    };
};
const models = initModels();
export default models;
