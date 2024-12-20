//router
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";
//#region LayoutWithRequireLogin
import { useState, useEffect } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import { allowedRoles, path } from "./utils/constants";
import { Login, Error, NoAuth } from "./pages";
import { PrivateRoutes } from "./utils/routes/privateRoutes";
import { getSessionVar } from "./utils/common/hashData";
import { sessionVar } from "./utils/constants";
//#endregion

//css
import "./css/resonsive.css";
import "./css/animation.css";
import "./css/main.css";

const ProtectedRoute = ({ isAllowed, children, redirectPath }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAllowed) {
      return navigate(redirectPath ? redirectPath : `${path.common.Login}`);
    }
  }, []);

  return <>{isAllowed ? children ? children : <Outlet /> : <></>}</>;
};

function App() {
  //#region LayoutWithRequireLogin
  const navigate = useNavigate();
  const [user, setUser] = useState(getSessionVar(sessionVar.user));
  const handeSetUser = (userJson) => {
    setUser(userJson);
  };

  const showPrivateMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute
                isAllowed={
                  user
                    ? route.role
                      ? route.role.includes(user.role)
                      : false
                    : false
                }
                redirectPath={`../${path.common.NoAuth}`}
              >
                {route.main()}
              </ProtectedRoute>
            }
            exact={route.exact}
          ></Route>
        );
      });
    }
    return result;
  };

  useEffect(() => {
    if (!user) {
      navigate(path.common.Login);
    }
  }, []);
  //#endregion

  return (
    //LayoutWithRequireLogin
    <Routes>
      <Route
        path={path.common.Login}
        element={<Login onSetUser={handeSetUser} />}
        exact={true}
      />
      <Route
        element={
          <ProtectedRoute
            isAllowed={user ? allowedRoles.includes(user.role) : false}
          >
            <DefaultLayout />
          </ProtectedRoute>
        }
      >
        <Route path={`${path.common.NoAuth}`} element={<NoAuth />} />
        {showPrivateMenu(PrivateRoutes)}
      </Route>
      <Route path={path.common.Error} element={<Error />} />
    </Routes>
  );
}

export default App;
