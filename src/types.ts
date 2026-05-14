export interface Patient {
  id?: string;
  patientId: string; // Patient Number
  opNo: string;
  ipNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  patientType: 'OPD' | 'IPD' | 'ER';
  countyOfBirth: string;
  residence: string;
  bloodGroup: string;
  allergies: string;
  occupation: string;
  
  // Admission specific (if applicable)
  wardNumber?: string;
  bedNumber?: string;
  doctorName?: string;
  admittedBy?: string;
  
  nextOfKin: {
    name: string;
    phone: string;
    relationship: string;
  };
  
  branch: string;
  status: 'Active' | 'Inactive' | 'Discharged';
  createdAt: any;
  updatedAt: any;
}

export interface VitalSigns {
  id?: string;
  patientId: string;
  bp: string;
  hr: string;
  temp: string;
  spO2: string;
  bmi: string;
  recordedAt: any;
  recordedBy: string;
}

export interface ClinicalNote {
  id?: string;
  patientId: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  icdCodes: string[];
  createdAt: any;
  createdBy: string;
}

export interface Invoice {
  id?: string;
  patientId: string;
  items: {
    description: string;
    code: string; // CPT/HCPCS
    amount: number;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Paid' | 'Partially Paid';
  createdAt: any;
}
