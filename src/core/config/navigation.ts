const adminPrefix = '/admin';
const privatePrefix = '/private';

export const navigation = {
  admin: {
    dashboard: `${adminPrefix}/dashboard`,
    statistiche: `${adminPrefix}/statistiche`,
    clienti: `${adminPrefix}/clienti`,
    barche: `${adminPrefix}/barche`,
  },
  private: {
    dashboard: `${privatePrefix}/dashboard`,
    calendario: `${privatePrefix}/calendario`,
    statistiche: `${privatePrefix}/statistiche`,
    skippers: `${privatePrefix}/skippers`,
    documenti: `${privatePrefix}/documenti`,
    gestione: {
      index: `${privatePrefix}/gestione`,
      barche: {
        index: `${privatePrefix}/gestione/barche`,
        inserisci: `${privatePrefix}/gestione/barche/inserisci`,
      },
      personale: {
        index: `${privatePrefix}/gestione/personale`,
        nuovo: `${privatePrefix}/gestione/personale/nuovo`,
      },
    },
  },
  onboard: '/onboard',
  public: {
    feature: '/feature',
    pricing: '/pricing',
    signIn: '/sign-in',
    signOut: '/sign-out',
  },
};
