import { useNavigate, useLocation } from 'react-router-dom';

export const RouterHOC = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const location = useLocation();

        return (
            <Component
                navigate={navigate}
                location={location}
                {...props}
            />
        );
    };

    return Wrapper;
};