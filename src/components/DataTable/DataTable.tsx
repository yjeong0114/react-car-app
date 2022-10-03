import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';
import { server_calls } from '../../api';
import { Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@material-ui/core';
import { CarInvForm } from '../CarInvForm';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'model', headerName: 'Model Name', flex: 1 },
    { field: 'bodytype', headerName: 'Bodytype', flex: 1 },
    { field: 'interial', headerName: 'Interial', flex: 1 },
    { field: 'fueltype', headerName: 'Fueltype', flex: 2 },
];

interface gridData {
    data: {
        id?:string
    }
}

export const DataTable = () => {

    let { carData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}});
    const [selectionModel, setSelectionModel] = useState<any>([]);
    

    let handleOpen = () => {
        setOpen(true)
    };
    let handleClose = () => {
        setOpen(false)
    };

    let deleteData = () => {
        server_calls.delete(selectionModel);
        // console.log(gridData.data.id);
        getData();
        setTimeout( () => { window.location.reload(); }, 1000)
    }

    // console.log(gridData.data.id!);
    // console.log(`testing for data ${contactData}`)

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>My Cars</h2>

        <DataGrid rows={ carData } columns={ columns } pageSize={ 5 } checkboxSelection={true} 
        onSelectionModelChange={ (item) => {
            setSelectionModel(item)
						// console.log(item)
          }}
        />

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

        {/* Dialog pop-up */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Car {selectionModel}</DialogTitle>
            <DialogContent>
                <DialogContentText>Update Car</DialogContentText>
                    <CarInvForm id={selectionModel!}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color="primary">Done</Button>
            </DialogActions>
        </Dialog>
            
        </div>
    )
}