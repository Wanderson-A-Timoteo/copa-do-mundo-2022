export const Card = ({ homeTeam, awayTem, match }) => {
    return(
        <div className="rounded-xl border border-gray-300 p-4 text-center space-y-4">
            <span className="text-sm md:text-base text-gray-700 font-bold "> {match.time} </span>
            
            <div className="flex space-x-4 justify-center items-center">
                <span className="uppercase">{homeTeam.slug}</span>
                <img src={`/images/flags/${homeTeam.slug}.png`} />
                
                <input type="number" className="pl-2 bg-red-300 w-[55px] h-[55px] text-red-700 text-xl bg-red-300/[0.2]"/>
                <span className="text-red-500 font-bold">x</span>
                <input type="number" className="pl-2 bg-red-300 w-[55px] h-[55px] text-red-700 text-xl bg-red-300/[0.2]"/>
                
                <img src={`/images/flags/${awayTem.slug}.png`} />
                <span className="uppercase">{awayTem.slug}</span>
            </div>
        </div>
    )
}
