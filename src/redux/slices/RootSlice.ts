import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        model: 'Model',
        bodytype: 'Bodytype',
        interial: 'Interial',
        fueltype: 'Fueltype',
    },
    reducers: {
        chooseModel: (state, action) => { state.model = action.payload},
        chooseBodytype: (state, action) => { state.bodytype = action.payload},
        chooseInterial: (state, action) => { state.interial = action.payload},
        chooseFueltype: (state, action) => { state.fueltype = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseModel, chooseBodytype, chooseInterial, chooseFueltype } = rootSlice.actions;