import { GoSmiley } from "react-icons/go";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Switch,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useState, useEffect } from "react";

// LOCAL
import { AuthContext } from "../context/AuthContext";

function ProfileMenu() {
    let navigate = useNavigate();
    let { setIsAuthenticated, user } = useContext(AuthContext);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        let darkMode = localStorage.getItem("dark");
        console.log(darkMode);
        // && setDark(localStorage.getItem("dark") === "true")
        // : setDark(false);
    }, []);

    useEffect(() => {
        localStorage.setItem("dark", dark);
    }, [dark]);

    return (
        <div className="mx-auto px-2 py-4 w-11/12 flex justify-end sm:w-10/12 md:w-9/12 lg:w-1/2">
            <Menu>
                <MenuButton className="text-4xl">
                    <GoSmiley />
                </MenuButton>
                <MenuList>
                    <p className="px-4 py-2 font-medium">{user.username}</p>
                    <MenuDivider />
                    <MenuGroup>
                        <Link to={"/tasks"}>
                            <MenuItem>Mis tareas</MenuItem>
                        </Link>
                        <Link to={"/new-task"}>
                            <MenuItem>Nueva tarea</MenuItem>
                        </Link>
                    </MenuGroup>
                    <MenuDivider />
                    {/* <MenuGroup>
                        <MenuItem
                            closeOnSelect={false}
                            onClick={() => {
                                setDark(!dark);
                            }}
                            className="flex items-center justify-between"
                        >
                            <span>Cambiar tema</span>
                            <Switch />
                        </MenuItem>
                    </MenuGroup> */}
                    {/* <MenuDivider /> */}

                    <MenuGroup>
                        <MenuItem
                            onClick={() => {
                                Cookies.remove("token");
                                setIsAuthenticated(false);
                                navigate("/");
                            }}
                        >
                            Cerrar sesion
                        </MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </div>
    );
}

export default ProfileMenu;
