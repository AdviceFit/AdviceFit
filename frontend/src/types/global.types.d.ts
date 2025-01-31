type MembersParams = {
  _id: string;
  name: string;
  mobile: numberstring;
  gym_member_code: string;
  joining_date: string;
  email: string;
  center: string;
  gender: "Male" | "Female";
  source: string;
  occupation: string;
  dob: string;
  health_conditions: string;
  marital_status: "Single" | "Married" | "Widowed";
};

type MembersDataParams = {
  members: MembersParams[];
}
type AddressParams = {
  addressLine1: string;
  addressLine2?: string;
  state: string;
  city: string;
  pincode: string;
  _id?: string;
};

type CreatedByParams = {
  _id: string;
  email: string;
};

type CenterParams = {
  _id: string;
  name: string;
  centerCode: string;
  centerEmail: string;
  mobileNo: string;
  workPhone?: string;
  gstNumber?: string;
  agency?: string;
  biometricSerialNumber?: string;
  address: AddressParams;
  aboutUs?: string;
  termsAndConditions?: string;
  createdBy: CreatedByParams;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};


type CentersDataParams = {
  centers: CenterParams[];
}

type AttendanceParams = {
  _id: string;
  member: Member;
  time_in: string;
  time_out: string;
}

type AttendanceDataParams = {
  attendance: AttendanceParams[];
}


type VisitorParams = {
  _id: string;
  name: string;
  mobile: numberstring;
  visiting_date?: string;
  tentative_visiting_date?: Date | string;
  email: string;
  visiting_center: string;
  gender: "Male" | "Female" | "Other";
  source?: string;
  occupation?: string;
  dob?: string;
  health_conditions: string;
  marital_status: "Single" | "Married" | "Divorced" | "Widowed";
  remarks: "High" | "Medium" | "Low";
  enquire_mode: "Talking" | "Walking" | "Any";
  address?: AddressParams;  // Assuming AddressParams is a predefined type for the address schema
  createdBy?: string;
  updatedBy?: string | null;
  isDeleted?: boolean;
};

type VisitorsDataParams = {
  visitors: VisitorParams[];
};


type EmployeeCenter={
  _id: string;
  name: string;
}

type EmployeeParams = {
  _id: string;
  name: string;
  mobile: string; // Changed to string to match validation format
  role: "Center Manager" | "Reception" | "Trainer" | "Accountant" | "Housekeeping";
  center:  EmployeeCenter | string
  joining_date: Date | string;
  dob?: date;
  anniversary_date?: string;
  email: string;
  gender: "Male" | "Female" | "Other";
  description?: string;
  employee_id_proof?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdBy: string;
  updatedBy?: string;
  deletedBy?: string;
  isDeleted?: boolean;
};

type EmployeesDataParams = {
  employees: EmployeeParams[];
};
