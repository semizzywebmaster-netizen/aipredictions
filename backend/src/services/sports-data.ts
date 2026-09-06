export type ExternalSport={externalId?:string;name:string;slug:string;iconUrl?:string}
export type ExternalLeague={externalId?:string;sportExternalId?:string;name:string;slug:string;country?:string;logoUrl?:string}
export type ExternalTeam={externalId?:string;leagueExternalId?:string;name:string;slug:string;shortName?:string;country?:string;logoUrl?:string}
export interface SportsDataProvider { getSports():Promise<ExternalSport[]>; getLeagues(sportExternalId?:string):Promise<ExternalLeague[]>; getTeams(leagueExternalId?:string):Promise<ExternalTeam[]> }
export class DisabledSportsDataProvider implements SportsDataProvider { async getSports(){return []} async getLeagues(){return []} async getTeams(){return []} }
export function getSportsDataProvider():SportsDataProvider{return new DisabledSportsDataProvider()}
