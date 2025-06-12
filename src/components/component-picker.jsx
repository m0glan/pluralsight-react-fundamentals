import navigationValues from "../navigation/navigation-values";
import HouseList from "./house-list";
import House from "./house";

const ComponentPicker = ({ currentNavigationLocation }) => {
  switch (currentNavigationLocation) {
    case navigationValues.home:
      return <HouseList />;
    case navigationValues.house:
      return <House />;
    default:
      return (
        <h3>Unknown component {currentNavigationLocation}.</h3>
      );
  }
}

export default ComponentPicker;