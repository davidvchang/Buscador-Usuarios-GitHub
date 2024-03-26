import React, {useState } from 'react'

function Search() {

    const [user, setUser] = useState(null);

    const [search, setSerch] = useState("")

    const [errorMessage, setErrorMessage] = useState(null);

    const handdleEnter = (e) => {
        if(e.key == 'Enter'){
            fetch(`https://api.github.com/users/${search}`)   
        .then((res) => {
            if (!res.ok) {
                throw new Error('El usuario no existe');
            }
            return res.json()
            })

        .then((data) => {
            const userData = {
                name: data.name,
                image: data.avatar_url,
                repositories: data.public_repos,
                followers: data.followers,
                following: data.following,
                bio: data.bio,
            };
            setUser(userData);
            setErrorMessage(null)
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setUser(null);
        });
        }
    };

    

    
  return (
    <>
        <div className='w-2/4 h-20 mt-16 flex flex-col items-center justify-center mb-5'>    
            <input type="search" name="search" id="search" onChange={(e) => setSerch(e.target.value)} onKeyUp={handdleEnter} placeholder='Ingrese el nombre de usuario a buscar' className='p-2.5 w-80 sm:w-96 font-Poppins rounded-md placeholder:font-Poppins shadow-2xl'/>
        </div>

        {user && (
        <div className='flex w-full mb-16 sm:mb-20 p-4 sm:p-4 flex-col items-center justify-center h-auto bg-slate-400 sm:rounded-2xl md:rounded-2xl md:p-10'>
            {/* Contenedor de la foto */}
            <div className='flex lg:mr-5 items-center h-24'>
                <img src={user.image} alt="" className='w-24 h-24 lg:w-28 lg:h-24 rounded-full shadow-lg lg:min-w-28 lg:min-h-24'/>   
            </div>

            {/* Contenedor Informacion */}
            <div className='flex flex-col items-center justify-center w-full h-auto '>
                <h1 className='font-Poppins text-2xl mb-3 md:mb-5'>{user.name}</h1>
                <span className='font-Poppins text-sm font-normal mb-5 md:mb-5 text-center'>{user.bio}</span>

                {/* Contenedor Padre Seguidores, Seguidos, Repositorios */}
                <div className='flex flex-wrap gap-x-5 gap-y-1 lg:gap-10 w-11/12 justify-center'>

                    {/* Contenedor seguidores */}
                    <div className='flex flex-row gap-1'>
                        <span className='font-Poppins text-red-6'>{user.followers}</span>
                        <span className='font-Poppins font-semibold '>Followers</span>
                    </div>

                    {/* Contenedor Seguidos */}
                    <div className='flex flex-row gap-1'>
                        <span className='font-Poppins text-red-6'>{user.following}</span>
                        <span className='font-Poppins font-semibold'>Following</span>
                    </div>

                    {/* Contenedor Repositorios */}
                    <div className='flex flex-row gap-1'>
                        <span className='font-Poppins text-red-6'>{user.repositories}</span>
                        <span className='font-Poppins font-semibold'>Repositories</span>
                    </div>
                </div>
            </div>
        </div>)}

        {errorMessage && <h1 className="text-2xl text-red-500 font-Poppins">{errorMessage}</h1>}
    </>
  )
}

export default Search
