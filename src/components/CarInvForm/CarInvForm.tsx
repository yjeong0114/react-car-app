import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseModel, chooseBodytype, chooseInterial, chooseFueltype } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

interface CarInvProps {
    id?:string;
    data?:{}
}

interface CarState {
    model: string;
    bodytype: string;
    interial: string;
    fueltype: string;
}

export const CarInvForm = (props:CarInvProps) => {

  const dispatch = useDispatch(); // This is a Redux-specific hook that updates the store
  const store = useStore();
  const name = useSelector<CarState>(state => state.model);
  const { register, handleSubmit } = useForm({ })

  const onSubmit = (data:any, event:any) => {
      console.log(props.id)
      // The ! is for strictly typed Typescript stuff
      if(props.id!){
          server_calls.update(props.id!, data);
          console.log(`Updated:${data} ${props.id}`);
          console.log(data);
          setTimeout( () => {window.location.reload()}, 1000);
          event.target.reset();
      } else {
          // Dispatch basically updates our state / Redux store
          dispatch(chooseModel(data.model));
          dispatch(chooseBodytype(data.bodytype));
          dispatch(chooseInterial(data.interial));
          dispatch(chooseFueltype(data.fueltype));
          server_calls.create(store.getState());
          setTimeout( () => {window.location.reload()}, 1000)
      }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="model">Model Name</label>
                    <Input {...register('model')} name="model" placeholder='Model'/>
                </div>
                <div>
                    <label htmlFor="bodytype">Bodytype</label>
                    <Input {...register('bodytype')} name="bodytype" placeholder='Bodytype'/>
                </div>
                <div>
                    <label htmlFor="interial">Interial</label>
                    <Input {...register('interial')} name="interial" placeholder='Interial'/>
                </div>
                <div>
                    <label htmlFor="fueltype">Fueltype</label>
                    <Input {...register('fueltype')} name="fueltype" placeholder='Fueltype'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}