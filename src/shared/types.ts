export interface TTruck {
  id: string;
  type: string;
  registeredPlate: string;
  VIN: string;
}

export interface TTruckDriver {
  id: string;             
  name: string;           
  surname: string;        
  phoneNumber: string;    
  assignedTruckId: string;
}