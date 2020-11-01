import Dexie from 'dexie' ;
import 'dexie-observable' ;
import store from '@/store/index.js' ;

const historyStorage = new Dexie ('history') ;

historyStorage.version(1).stores({
  history: 'id, name, shape, data',
  dummy:'id'
}) ;

historyStorage.dummy.put({id:1, v:null}) ;

historyStorage.on('changes', function(changes){
  const History = {insert:[], update:[], delete:[]}

  changes.forEach(function(change){
    switch(change.type)
      {
      // created
      case 1:
        if(change.table == 'history')
          {
          History.insert.push(change.obj) ;
          }
        break ;
      case 2: // update
        if(change.table == 'history')
          {
          History.update.push(change.obj) ;
          }
        break ;
      case 3: // delete
        if(change.table == 'history')
          {
          console.log(change);
          History.delete.push(change.oldObj.id) ;
          }
        break ;
      }
    })

  if(History.insert.length)
    {
    store.commit('setHistory', History.insert) ;
    }

  if(History.update.length)
    {
    store.commit('setHistory', History.update) ;
    }

  if(History.delete.length)
    {
    console.log('history .delete', History.delete)
    store.commit('removeHistory', History.delete) ;
    }
}) ;

export default historyStorage ;
