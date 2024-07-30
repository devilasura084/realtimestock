import { SetStateAction, useState } from "react"

interface SearchBarprops{
    setSymbol:React.Dispatch<SetStateAction<string>>
}

const SeachBar = ({setSymbol}:SearchBarprops) => {
    const[search,setSearch]=useState('');//creating a usestate to store search data
    const handleClick=(e:React.MouseEvent<HTMLButtonElement>)=>{//on clicking the search button the symbol changes causing the useeffect to trigger and call the api with a new symbol parameter
        e.preventDefault();
        if(search.length>1)
        {
            setSymbol(search.toUpperCase())
        }
    }
  return (
    
	<div className="container mx-auto bg-indigo-500 rounded-lg p-14">
		<form>
			<h1 className="text-center font-bold text-white text-4xl">Find the stocks you want</h1>
				<p className="ml-auto mr-auto text-center font-normal text-sm my-6 max-w-lg">Enter the name of the stock you want and click on search</p>
				<div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
					<input onChange={(e)=>{setSearch(e.target.value)}} className="text-base text-gray-400 flex-grow outline-none px-2 " name="search" type="text" placeholder="Search your domain name" />
					<div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
						<button onClick={handleClick} className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">Search</button>
					</div>
				</div>
		</form>
	</div>
  )
}

export default SeachBar