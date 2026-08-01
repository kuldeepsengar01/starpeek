import React, {useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {
 FaUser,
 FaEnvelope,
 FaPhone,
 FaMapMarkerAlt,
 FaCalendar
} from "react-icons/fa";


const UserProfile =()=>{


const navigate = useNavigate();


const [user,setUser]=useState(null);
const [loading,setLoading]=useState(true);



useEffect(()=>{

    fetchProfile();

},[]);



const fetchProfile=async()=>{


try{


const res = await axios.get(
`${import.meta.env.VITE_API_URL}/api/user/profile`,
{
withCredentials:true
}
);


console.log(res.data);


setUser(res.data.user);



}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}


}




if(loading){

return(

<div className="h-screen flex justify-center items-center text-2xl font-bold">

Loading...

</div>

)

}



if(!user){

return(

<div className="h-screen flex flex-col justify-center items-center bg-gray-100">

  <h1 className="
    text-3xl 
    text-red-500 
    font-bold
  ">
    User Not Found
  </h1>


  <button
    onClick={()=>navigate("/user/login")}
    className="
      mt-6
      bg-orange-500
      hover:bg-orange-600
      text-white
      px-8
      py-3
      rounded-xl
      font-bold
      shadow-lg
      transition
    "
  >
    Login
  </button>

</div>

)

}



return(


<div className="min-h-screen bg-gray-100 p-5">


<div className="
max-w-xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-8
mt-10
">


{/* Profile Icon */}


<div className="
flex
justify-center
">


<div className="
w-32
h-32
rounded-full
bg-orange-500
flex
items-center
justify-center
text-white
text-6xl
">


<FaUser/>


</div>


</div>



<h1 className="
text-3xl
font-bold
text-center
mt-5
">


{user.FullName}


</h1>



<p className="
text-center
text-gray-500
mt-2
">

Food Lover

</p>





<div className="
mt-8
space-y-5
">



<div className="
flex
items-center
gap-4
bg-gray-100
p-4
rounded-xl
">


<FaUser className="text-orange-500 text-xl"/>

<div>

<p className="text-gray-500">
Name
</p>

<h3 className="font-bold">
{user.FullName}
</h3>

</div>


</div>





<div className="
flex
items-center
gap-4
bg-gray-100
p-4
rounded-xl
">


<FaEnvelope className="text-orange-500 text-xl"/>

<div>

<p className="text-gray-500">
Email
</p>

<h3 className="font-bold">
{user.Email}
</h3>

</div>


</div>





<div className="
flex
items-center
gap-4
bg-gray-100
p-4
rounded-xl
">


<FaPhone className="text-orange-500 text-xl"/>

<div>

<p className="text-gray-500">
Contact
</p>

<h3 className="font-bold">
{user.Contact}
</h3>

</div>


</div>






<div className="
flex
items-center
gap-4
bg-gray-100
p-4
rounded-xl
">


<FaMapMarkerAlt className="text-orange-500 text-xl"/>

<div>

<p className="text-gray-500">
Address
</p>

<h3 className="font-bold">
{user.Address}
</h3>

</div>


</div>





<div className="
flex
items-center
gap-4
bg-gray-100
p-4
rounded-xl
">


<FaCalendar className="text-orange-500 text-xl"/>

<div>

<p className="text-gray-500">
Joined
</p>


<h3 className="font-bold">

{
new Date(user.createdAt)
.toDateString()

}

</h3>


</div>


</div>




</div>


<button
onClick={()=>navigate("/foodpartner/ragister")}
className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
py-4
rounded-xl
font-bold
"
>
🍴 Register as Food Partner
</button>

<div className="mt-6 px-4">

<button
onClick={()=>navigate("/foodpartner/login")}
className="
w-full
bg-green-600
text-white
py-4
rounded-2xl
font-bold
flex
items-center
justify-center
gap-3
"
>
🔐 Food Partner Login
</button>

</div>

<button

onClick={()=>navigate("/")}

className="
w-full
mt-8
bg-orange-500
hover:bg-orange-600
text-white
py-3
rounded-xl
font-bold
"


>

Back Home

</button>




</div>


</div>


)

}


export default UserProfile;
