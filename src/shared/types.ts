export interface TTruck {
  _id: string;
  type: string;
  registeredPlate: string;
  VIN: string;
}

export interface TTruckDriver {
  _id: string;             
  name: string;           
  surname: string;        
  phoneNumber: string;    
  assignedTruckId: string;
}