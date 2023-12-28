import { useNavigate, useLocation } from "react-router-dom";

// The code to add the navigate and location function to use it through out the application

export const RouterHOC = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return <Component navigate={navigate} location={location} {...props} />;
  };

  return Wrapper;
};
