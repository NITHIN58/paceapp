import React,{useState,useContext} from "react";

import { useForm } from "../../shared/hooks/form-hook";
import {VALIDATOR_EMAIL,VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators"
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./Auth.css"
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () =>{
    const auth= useContext(AuthContext)
    const [isLoginMode,setIsLoginMode] =useState(true)
    const [formState,inputHandler,setFormData] =useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false

        }

    },false
    );

    const authSubmitHandler =event=>{
        event.preventDefault();
        console.log(formState.inputs)
        auth.login()

    }
    const switchModeHandler= () =>{
        if (!isLoginMode){
            setFormData({
                ...formState.inputs,
                name:undefined
            }, formState.inputs.email.isValid &&formState.inputs.password.isValid)
        }else{
            setFormData({
               ...formState.inputs,
               name: '',
               isValid:false

            },false)
        }
        setIsLoginMode(prevMode=>!prevMode)
    }


    return(
        <Card className="authentication">
            <h2>Login Required!!</h2>
            <form onSubmit={authSubmitHandler}>
               {!isLoginMode && <Input
                 element="input"
                 id="name"
                 type="text"
                 label="Your Name"
                 validators={[VALIDATOR_REQUIRE()]}
                 errorText="Please enter a name"
                 onInput={inputHandler}
               />}
                <Input 
                element="input" 
                id="email" 
                type="email"
                label="E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please provide a valid email address."
                onInput={inputHandler}
                />
                <Input 
                element="input" 
                id="password" 
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please provide a valid password, atleast 5 charcters."
                onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' :'SIGNUP'}</Button>

            </form>
            <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' :'LOGIN'}</Button>
        </Card>
    )

};
 
export default Auth;