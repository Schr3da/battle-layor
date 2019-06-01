import { connect } from "react-redux";
import { MiniMap } from "./MiniMap"; 
import { IStore } from '../../stores/Store';

const mapStateToProps = (store: IStore) => ({
	entities: store.entities,
	data: store.map.data,
})

const mapDispatchToProps = (_dispatch) => ({
	
});

export const MiniMapContainer = connect(mapStateToProps, mapDispatchToProps)(MiniMap);
