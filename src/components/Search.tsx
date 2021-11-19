import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface SearchProps {
  visible: boolean;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

export const NASA_FIRST_APOD = "1995-06-16";

const Search: React.FC<SearchProps> = ({visible, onCancel, onConfirm}) => {
  return (
    <DateTimePickerModal
      isVisible={visible}
      mode="date"
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmTextIOS={"OK"}
      textColor="black"
      maximumDate={new Date()}
      minimumDate={new Date(NASA_FIRST_APOD)}
    />
  );
};

export default Search;
