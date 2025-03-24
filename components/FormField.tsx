// noinspection BadExpressionStatementJS

import React from 'react'
import {FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control, Controller, FieldValues,Path} from "react-hook-form";

interface FormFieldProps<T extends FieldValues>{
    control:Control<T>;
    name:Path<T>;
    label:string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'file';
}

const FormField = ({control, name, label, placeholder , type ="text"}:FormFieldProps<T>) => {

 return  (
     <Controller
               control={control}
               name={name}
               render={({field})=>(
                   <FormItem>
                       <FormLabel className='label'>{label}</FormLabel>
                       <FormControl>
                           <Input
                               className='input'
                               type={type}
                               placeholder={placeholder}
                               {...field}
                           />
                       </FormControl>
                       <FormMessage />
                   </FormItem>
               )}>

    </Controller>
 )

}

export default FormField
