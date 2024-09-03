import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { moveEmailLabel, movePasswordLabel, movePasswordValidationLabel } from '../../components/LabelEventComponent';

const SignUpScreen = () => {

    useEffect(() => {
        moveEmailLabel();
        movePasswordLabel();
        movePasswordValidationLabel();
    }, []); // El array vacío significa que se ejecutará solo una vez al montar


    return (
        <div className="">

            <h1 className="m-auto my-10 mt-20 font-bold text-6xl text-center text-slate-800 ">Sing Up To Nexxus</h1>
            <form className="w-1/3 mx-auto mt-12 p-12 flex flex-col justify-between
             border-2 border-slate-500 rounded-3xl ">

                {/* Label e Input de correo */}
                <label htmlFor="email" id='emailLabel' className='relative top-9 left-2 transition-all font-medium text-slate-500'>Email</label>
                <input type="email" id="email" name="email"
                    className=' h-12 px-2 mb-2 placeholder:relative bg-white border-2 border-slate-400 rounded-lg transition-colors
                focus:outline-none focus:border-slate-950'
                    required />

                {/* Label e Input de contraseña */}
                <label htmlFor="password" id='passwordLabel' className='relative top-9 left-2 transition-all font-medium text-slate-500'>Password</label>
                <input type="password" id="password" name="password"
                    className=' h-12 px-2 mb-5 placeholder:relative bg-white border-2 border-slate-400 rounded-lg transition-colors
                focus:outline-none focus:border-slate-950'
                    required />

                {/* Label e Input de validacion de contraseña */}
                <label htmlFor="passwordValidation" id='passwordValidationLabel' className='relative top-9 left-2 transition-all font-medium text-slate-500'>Repeat your password</label>
                <input type="passwordValidation" id="passwordValidation" name="passwordValidation"
                    className=' h-12 px-2 mb-5 placeholder:relative bg-white border-2 border-slate-400 rounded-lg transition-colors
                focus:outline-none focus:border-slate-950'
                    required />

                
                {/* Boton de "submit" */}
                <button type="submit" className='mt-3 h-12 bg-slate-800 text-white font-bold transition-all transform rounded-lg hover:bg-slate-950 focus:bg-slate-950  focus:outline-none'>SING UP</button>

                {/* Link de inicio de sesión */}
                <p className='mt-3 text-center text-slate-500 '>¿Have an account?
                    <NavLink to='/login' className='ml-1 text-slate-950 hover:text-black
                     hover:underline transition-colors'>Sign in</NavLink>
                </p>

            </form>

        </div>
    );
}

export default SignUpScreen;
