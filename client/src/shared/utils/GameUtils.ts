import {IWSEntity} from './EntityUtils';
import {TMap} from './MapUtils';

export interface IWSGameSnapshot {
	players: IWSEntity[];  
	world: TMap;
}
