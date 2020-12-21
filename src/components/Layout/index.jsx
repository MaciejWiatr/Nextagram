import Navbar from "../Navbar";

const Layout = (props) => {
    return (
        <>
            <Navbar></Navbar>
            {props.children}
        </>
    );
};

export default Layout;
