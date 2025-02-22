interface PersonalDetailsSectionHeaderProps {
  title: string;
}

const PersonalDetailsSectionHeader: React.FC<
  PersonalDetailsSectionHeaderProps
> = ({ title }) => {
  return (
    <div
      style={{ background: "rgba(234,234,234,1)" }}
      className="px-2 py-1 w-full"
    >
      <span
        //  style={{ color: "#4E31AA" }}
        className="text-lg text-blue-300"
      >
        {title}
      </span>
    </div>
  );
};

export default PersonalDetailsSectionHeader;
