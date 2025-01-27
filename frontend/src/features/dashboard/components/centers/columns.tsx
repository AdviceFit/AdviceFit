import { ColumnDef } from "@tanstack/react-table";
import CenterrActionDropdown from "./CenterActionDropdown";

const columns: ColumnDef<CenterParams>[] = [
  {
    accessorKey: "name",
    header: "Center Name",
  },
  {
    accessorKey: "centerCode",
    header: "Center Code",
  },
  {
    accessorKey: "centerEmail",
    header: "Email",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile Number",
  },
  {
    accessorKey: "workPhone",
    header: "Work Phone",
    // cell: ({ getValue }) => <span>{getValue() || "N/A"}</span>,
  },
  {
    accessorKey: "gstNumber",
    header: "GST Number",
    // cell: ({ getValue }) => <span>{getValue() || "N/A"}</span>,
  },
  {
    accessorKey: "agency",
    header: "Agency",
    // cell: ({ getValue }) => <span>{getValue() || "N/A"}</span>,
  },
  {
    accessorKey: "biometricSerialNumber",
    header: "Biometric Serial Number",
    // cell: ({ getValue }) => <span>{getValue() || "N/A"}</span>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ getValue }) => {
      const address = getValue() as CenterParams["address"];
      return (
        <span>
          {address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}, {address.pincode}
        </span>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ getValue }) => {
      const createdBy = getValue() as CenterParams["createdBy"];
      return (
        <span>
          {createdBy.email}, 
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original._id;
      return <CenterrActionDropdown id={id} />;
    },
  },
];

export { columns };
