interface PersonalDetailsSectionHeaderProps {
  title: string;
}

const PersonalDetailsSectionHeader: React.FC<PersonalDetailsSectionHeaderProps> = ({ title }) => {
  return (
    <div className="bg-gray-400 px-2 py-1 w-full">
      <span className="text-white text-lg">{title}</span>
    </div>
  );
}

export default PersonalDetailsSectionHeader;

