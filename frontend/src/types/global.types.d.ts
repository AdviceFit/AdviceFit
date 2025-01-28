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
  _id: string;
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
  time_in: string; // ISO date string
  time_out: string; // ISO date string
}

type AttendanceDataParams = {
  attendance: AttendanceParams[];
}
