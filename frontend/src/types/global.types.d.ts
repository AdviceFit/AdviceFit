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