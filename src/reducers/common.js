import { FETCH_CATEGORIES, COMMON_ERRORS, FETCH_CITIES, FETCH_STATES, FETCH_AREAS, 
   FETCH_KEYWORD_SEARCH, FETCH_ALL_BRANDS, CATALOGUES_LIST,CONTACT_US,
  ECOAMBASSADOR, JUNIOR_ECO_AMBASSADOR,HOME_HUB,PETITION, SUBSCRIBE
  
  } from '../actions/types';

const INITIAL_STATE = { petition:[], subscribe:[], categories:[], homehub:[], contactus:[], ecoambassador:[], junierecoambassador:[], catalogues_list: [], error: '', brands:[], states:[], cities:[], areas:[],  isupdated:false, keywordresult:[] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_CATEGORIES: {
      state = { ...state, categories: action.payload.data, isupdated:false };
      break;
      } 
      case PETITION: {
        state = { ...state, petition: action.payload.data, isupdated:false };
        break;
        } 
        case SUBSCRIBE: {
          state = { ...state, subscribe: action.payload.data, isupdated:false };
          break;
          } 
      case HOME_HUB: {
        state = { ...state, homehub: action.payload.data, isupdated:false };
        break;
        }
      case CONTACT_US: {
        state = { ...state, contactus: action.payload.data, isupdated:false };
        break;
        }
    case ECOAMBASSADOR: {
      state = { ...state, ecoambassador: action.payload.data, isupdated:false };
      break;
      }  
      case JUNIOR_ECO_AMBASSADOR: {
        state = { ...state, junierecoambassador: action.payload.data, isupdated:false };
        break;
        }  
      case CATALOGUES_LIST: {
        state = { ...state, catalogues_list: action.payload.data, isupdated:false };
        break;
        }  
      
    
    case COMMON_ERRORS: {  
      state = { ...state, error: action.payload, isupdated:false };     
      break;
    }
    case FETCH_CITIES: {  
      state = { ...state, cities: action.payload.data, isupdated:false };     
      break;
    }
    case FETCH_STATES: {  
      state = { ...state, states: action.payload.data, isupdated:false };     
      break;
    }
    case FETCH_AREAS: {  
      state = { ...state, areas: action.payload.data, isupdated:false };     
      break;
    }
    case FETCH_ALL_BRANDS: {  
      state = { ...state, brands: action.payload.data, isupdated:false };     
      break;
    }
    
    case FETCH_KEYWORD_SEARCH : {
      state = { ...state,  keywordresult: action.payload.data, isupdated:false}
      break;
    }
    default: {
      state = {...state};
      break;
    }
  }
  return state;
}
