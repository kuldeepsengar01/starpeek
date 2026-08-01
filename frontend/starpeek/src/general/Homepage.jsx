import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaHeart,
  FaRegHeart,
  FaCommentDots,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaHome,
  FaUser,
} from "react-icons/fa";


const HomePage = () => {

  const navigate = useNavigate();

  const [videos,setVideos] = useState([]);
  const [loading,setLoading] = useState(true);

  const [liked,setLiked] = useState({});
  const [saved,setSaved] = useState({});


  const videoRefs = useRef([]);



  // ============================
  // Fetch Food Videos
  // ============================

  const fetchVideos = async()=>{

    try{

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/food/fooditems`,
        {
          withCredentials:true
        }
      );


      console.log(res.data);


      setVideos(
        res.data.fooditems || []
      );


      // Like state
      const likeObj={};

      res.data.fooditems.forEach(food=>{
        likeObj[food._id]=false;
      });

      setLiked(likeObj);


    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
    }

  }



  useEffect(()=>{
    fetchVideos();
  },[]);



  // ============================
  // Video Auto Play
  // ============================


  useEffect(()=>{


    const observer = new IntersectionObserver(
      entries=>{

        entries.forEach(entry=>{

          const video = entry.target;


          if(entry.isIntersecting){

            video.muted=true;

            video.play()
            .catch(err=>console.log(err));


          }
          else{

            video.pause();

          }


        })


      },
      {
        threshold:0.8
      }

    );



    videoRefs.current.forEach(video=>{

      if(video)
      observer.observe(video);

    });



    return()=>{

      videoRefs.current.forEach(video=>{

        if(video)
        observer.unobserve(video);

      })

    }


  },[videos]);





  // ============================
  // Like Function
  // ============================


  const handleLike = async(foodId)=>{


    try{


      const res = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/food/like`,

        {
          foodId
        },

        {
          withCredentials:true
        }

      );


      console.log(res.data);



      setLiked(prev=>({

        ...prev,

        [foodId]:!prev[foodId]

      }));



      setVideos(prev=>

        prev.map(food=>

          food._id===foodId

          ?

          {

            ...food,

            likecount:

            liked[foodId]

            ?

            food.likecount-1

            :

            food.likecount+1

          }

          :

          food

        )

      )


    }
    catch(err){

      console.log(err);

    }


  }

  // Save Function

  const handleSave = async(foodId)=>{
    try{
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/save`,
        {
          foodId
        },
        {
          withCredentials:true
        }
      );
      setSaved(prev=>({
        ...prev,
        [foodId]:!prev[foodId]
      }));
    }
    catch(err){
    }
  }

  if(loading){
    return(
       <div className=" h-screen bg-black text-white flex justify-center items-center text-2xl">
      Loading...
      </div>
    )
  }

return(
     <div className=" h-screen bg-black overflow-hidden">
{/* Top Navbar */}

<div className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md text-center py-4 ">
<h1 className="text-3xl font-bold text-blue-500">
★ StarPeek
</h1>
</div>

{/* Video Feed */}

<div className="h-screen overflow-y-scroll snap-y snap-mandatory">

{

videos.map((item,index)=>{
const partnerId =
typeof item.FoodPartner==="object"

?
item.FoodPartner?._id
:
item.FoodPartner;
return(


<section key={item._id} className=" h-screen snap-start relative flex justify-center">
<video

ref={(el)=>

videoRefs.current[index]=el

}

src={item.Video}
className="
w-full
max-w-md
h-full
object-cover
"

muted

loop

playsInline
preload="auto"
/>





{/* Gradient */}

<div className="
absolute
inset-0
bg-gradient
from-black/80
via-transparent
to-black/20
">

</div>








{/* Right Side Icons */}


<div className="
absolute
right-5
bottom-40
flex
flex-col
gap-6
text-white
z-30
items-center
">



<button

onClick={()=>handleLike(item._id)}

className="
text-4xl
"

>


{

liked[item._id]

?

<FaHeart className="text-red-500"/>

:

<FaRegHeart/>

}


<p className="text-sm">

{item.likecount || 0}

</p>


</button>







<button

className="
text-3xl
"

>

<FaCommentDots/>

</button>

<button

onClick={()=>handleSave(item._id)}

className="
text-3xl
"

>


{

saved[item._id]

?

<FaBookmark/>

:

<FaRegBookmark/>

}
</button>
<button

className="
text-3xl
"

onClick={()=>navigator.share?.({

title:item.FoodName,

url:window.location.href

})}

>

<FaShare/>

</button>



</div>
{/* Bottom Content */}


<div className="
absolute
bottom-24
left-5
right-20
z-30
text-white
">


<h2 className="
text-2xl
font-bold
">

{item.FoodName}

</h2>



<p className="
mt-2
line-clamp-2
">

{item.Discription}

</p>




<button

onClick={()=>navigate(`/foodpartner/${partnerId}`)}

className="
mt-4
bg-orange-500
px-7
py-3
rounded-full
font-semibold
"
>
Visit Store
</button>
</div>
</section>



)


})


}

</div>

{/* Bottom Navigation */}


<div className="
fixed
bottom-0
left-0
right-0
h-16
bg-black/40
backdrop-blur-md
flex
justify-around
items-center
text-white
z-50
">


<button

onClick={()=>navigate("/")}

className="
text-3xl
"

>

<FaHome/>

</button>




<button

onClick={()=>navigate("/user/profile")}

className="
text-3xl
"

>

<FaUser/>

</button>

</div>

</div>


)

}


export default HomePage;
