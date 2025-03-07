"use client";

export function AuthPage({isSignin}: {isSignin: boolean}){
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-slate-500 gap-3 rounded">
                <div className="">
                    <input type="text" className=" outline-none  p-2 border-2 border-slate-900  rounded-md" placeholder="Email"></input>
                </div>
                <div className="">
                    <input type="password" className="p-2 outline-none mt-3 border-2 border-slate-900  rounded-md" placeholder="Password"></input>
                </div>

                <div className=" justify-center items-center flex">
                    <button className="mb-2 p-2 cursor-pointer  mt-3 hover:bg-slate-900 px-10 border-2 border-slate-900   rounded-md"  onClick={() => {}}>{isSignin ? "Sign In" : "Sign Up"}</button>
                </div>
                
        </div>
    </div>
}