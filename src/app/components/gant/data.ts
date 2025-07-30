import { DateHelper } from '@bryntum/gantt';

const initialData = {


  tasks: [
  {
    id: 1,
    name: 'GAS Interventions Project',
    expanded: true
  },
  {
    id: 100,
    name: 'Counters',
    expanded: true,
    parentId: 1
  },
  { id: 101, name: 'Maintenance - Counter 1', duration: 2, percentDone: 30, parentId: 100 },
  { id: 102, name: 'Coupure de gaz - Counter 2', duration: 1, percentDone: 50, parentId: 100 },
  { id: 103, name: 'Maintenance - Counter 3', duration: 3, percentDone: 70, parentId: 100 },
  { id: 104, name: 'Coupure de gaz - Counter 4', duration: 2, percentDone: 20, parentId: 100 },
  { id: 105, name: 'Maintenance - Counter 5', duration: 2, percentDone: 60, parentId: 100 },
  { id: 106, name: 'Coupure de gaz - Counter 6', duration: 1, percentDone: 10, parentId: 100 },
  { id: 107, name: 'Maintenance - Counter 7', duration: 2, percentDone: 80, parentId: 100 },
  { id: 108, name: 'Coupure de gaz - Counter 8', duration: 2, percentDone: 30, parentId: 100 },
  { id: 109, name: 'Maintenance - Counter 9', duration: 1, percentDone: 50, parentId: 100 },
  { id: 110, name: 'Coupure de gaz - Counter 10', duration: 3, percentDone: 90, parentId: 100 },

  {
    id: 200,
    name: 'Pipelines',
    expanded: true,
    parentId: 1
  },
  { id: 201, name: 'Maintenance - Pipeline A', duration: 4, percentDone: 40, parentId: 200 },
  { id: 202, name: 'Coupure de gaz - Pipeline B', duration: 2, percentDone: 60, parentId: 200 },
  { id: 203, name: 'Maintenance - Pipeline C', duration: 3, percentDone: 25, parentId: 200 },
  { id: 204, name: 'Coupure de gaz - Pipeline D', duration: 2, percentDone: 45, parentId: 200 },
  { id: 205, name: 'Maintenance - Pipeline E', duration: 2, percentDone: 75, parentId: 200 },
  { id: 206, name: 'Coupure de gaz - Pipeline F', duration: 1, percentDone: 20, parentId: 200 },
  { id: 207, name: 'Maintenance - Pipeline G', duration: 3, percentDone: 50, parentId: 200 },
  { id: 208, name: 'Coupure de gaz - Pipeline H', duration: 1, percentDone: 10, parentId: 200 },
  { id: 209, name: 'Maintenance - Pipeline I', duration: 2, percentDone: 90, parentId: 200 },
  { id: 210, name: 'Coupure de gaz - Pipeline J', duration: 2, percentDone: 35, parentId: 200 }
]
,
dependencies : [
               { id: 1, from: 101, to: 102 },
  { id: 2, from: 103, to: 104 },
  { id: 3, from: 201, to: 202 },
  { id: 4, from: 203, to: 204 },
  { id: 5, from: 205, to: 206 }
            ],  
    resources :[
   { id: 1, name: 'Technician A', initials: 'TA' },
  { id: 2, name: 'Technician B', initials: 'TB' },
  { id: 3, name: 'Technician C', initials: 'TC' },
  { id: 4, name: 'Supervisor D', initials: 'SD' }
],
assignments:[
   { id: 1, event: 101, resource: 1 },
  { id: 2, event: 102, resource: 2 },
  { id: 3, event: 103, resource: 1 },
  { id: 4, event: 104, resource: 2 },
  { id: 5, event: 105, resource: 3 },
  { id: 6, event: 106, resource: 4 },
  { id: 7, event: 107, resource: 3 },
  { id: 8, event: 108, resource: 1 },
  { id: 9, event: 109, resource: 2 },
  { id: 10, event: 110, resource: 4 },

  { id: 11, event: 201, resource: 1 },
  { id: 12, event: 202, resource: 2 },
  { id: 13, event: 203, resource: 3 },
  { id: 14, event: 204, resource: 1 },
  { id: 15, event: 205, resource: 2 },
  { id: 16, event: 206, resource: 3 },
  { id: 17, event: 207, resource: 4 },
  { id: 18, event: 208, resource: 1 },
  { id: 19, event: 209, resource: 2 },
  { id: 20, event: 210, resource: 4 }
]           
}
export { initialData}