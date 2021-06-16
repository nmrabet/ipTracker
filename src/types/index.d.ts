export interface Geolocation {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  domains: [string, string, string, string, string];
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
  proxy: {
    proxy: boolean;
    vpn: boolean;
    tor: boolean;
  };
}
