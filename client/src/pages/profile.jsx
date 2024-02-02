import { Container } from "@chakra-ui/react";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("userData"))[0];
    return (
        <div style={{height:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start", padding:"2rem"}}>
            <h2>{user.username}</h2>
        </div>
    );
}

export default Profile;