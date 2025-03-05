type MembersParams = {
  _id: string;
  name: string;
  mobile: numberstring;
  gym_member_code: string;
  joining_date: string;
  email: string;
  center: EmployeeCenter | string;
  gender: "Male" | "Female";
  source: string;
  occupation: string;
  dob: string;
  health_conditions: string;
  marital_status: "Single" | "Married" | "Widowed";
  subscriptionDetails: SubscriptionsParams;
};

type MembersDataParams = {
  members: MembersParams[];
};
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
};

type AttendanceParams = {
  _id: string;
  member: Member;
  time_in: Date;
  time_out: Date;
};

type AttendanceDataParams = {
  attendance: AttendanceParams[];
};

type EmployeeCenter = {
  _id: string;
  name: string;
};

type VisitorParams = {
  _id: string;
  name: string;
  mobile: numberstring;
  visiting_date?: string;
  tentative_visiting_date?: Date | string;
  email: string;
  visiting_center: EmployeeCenter | string;
  gender: "Male" | "Female" | "Other";
  source?: string;
  occupation?: string;
  dob?: string;
  health_conditions: string;
  marital_status: "Single" | "Married" | "Divorced" | "Widowed";
  remarks: "High" | "Medium" | "Low";
  enquire_mode: "Talking" | "Walking" | "Any";
  address?: AddressParams; // Assuming AddressParams is a predefined type for the address schema
  createdBy?: string;
  updatedBy?: string | null;
  isDeleted?: boolean;
};

type VisitorsDataParams = {
  visitors: VisitorParams[];
};

type SubscriptionsParams = {
  _id: string;
  package: string;
  promoCoupon: string;
  offerAmount: number;
  paymentDate: string;
  startDate: string;
  paidAmount: number;
  paymentMode: string;
  paymentDueDate: string;
  comments: string;
};

// type SubscriptionsDataParams = {
//   subscriptions: SubscriptMemionsParams[];
// };

type EmployeeParams = {
  _id: string;
  name: string;
  mobile: string; // Changed to string to match validation format
  role:
    | "Center Manager"
    | "Reception"
    | "Trainer"
    | "Accountant"
    | "Housekeeping";
  center: EmployeeCenter | string;
  joining_date: string | Date;
  dob?: date;
  anniversary_date?: string | Date;
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
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  isDeleted?: boolean;
};

type EmployeesDataParams = {
  employees: EmployeeParams[];
};

type PackageParams = {
  _id: string;
  packageName: string;
  price: number;
  center: Center;
  productType: string;
  noOfDays: number;
  packageTiming: string;
  trainingType: string;
  packageType: string;
  freezeSubscription: {
    enabled: boolean;
    maxFreezeDuration?: number;
  };
  showAtAdviceFit: boolean;
};

type PackageDataParams = {
  package: PackageParams[];
};

type SessionParams = {
  _id?: string;
  title: string;
  center: {
    _id: string;
    name: string;
    centerCode: string;
  };
  session_date: string | Date;
  start_time: string;
  end_time: string;
  member_capacity: number;
};

type SessionDataParams = {
  session: SessionParams[];
};

type ExpenseParams = {
  _id?: string;
  expense_title: string;
  amount: number;
  type_of_expense:
    | "Electric Bill"
    | "Water Bill"
    | "Internet Bill"
    | "Medical Kit"
    | "Cleaning Kit"
    | "AC Service"
    | "Rent"
    | "Employee Salary"
    | "Other";
  center: {
    _id: string;
    name: string;
    centerCode: string;
  };
  expense_date: string | Date;
  payment_mode: "Cash" | "Cheque" | "Paytm" | "Bank Transfer" | "UPI" | "Card";
  comment?: string;
};

type ExpenseDataParams = {
  expense: ExpenseParams[];
};


type TemplateDataParams = {
    _id : string;
    title: string;
    variables: string[];
    description: string;
    type: "Transactional" | "Promotional";
    services: ("SMS" | "Whatsapp")[];
    isDeleted?: boolean;
    createdAt?: Date;    
    updatedAt?: Date;      
}