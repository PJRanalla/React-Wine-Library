import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: "Name",
        country: "Country",
        region: "Region",
        vintage: "Vintage",
        taste: "Taste",
        nose: "Nose",
        price: "Price",
        img: "Image URL" 
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseCountry: (state, action) => { state.country = action.payload},
        chooseRegion: (state, action) => { state.region = action.payload},
        chooseVintage: (state, action) => { state.vintage = action.payload},
        chooseTaste: (state, action) => { state.taste = action.payload},
        chooseNose: (state, action) => { state.nose = action.payload},
        choosePrice: (state, action) => { state.price = action.payload},
        chooseImg: (state, action) => { state.img = action.payload} // Add image URL action
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseCountry, chooseRegion, chooseVintage, chooseTaste, chooseNose, choosePrice, chooseImg } = rootSlice.actions
