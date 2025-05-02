import { createSlice } from "@reduxjs/toolkit"

intialSpeciality = [

    { title: "Dermatology", image: derma },
    { title: "Orthopedic", image: Orthopedic },
    { title: "Pediatrician", image: Pediatrician },
    { title: "OB/GYN", image: gynecology},
    { title: "Nutrition", image: nutrition },
    { title: "Vision", image: vision },

  ];

const topSearchedSpeciality = createSlice({
    name: "topSearchedSpeciality",
    intialSpeciality,
    reducers: {  
    }
} 
);

  



