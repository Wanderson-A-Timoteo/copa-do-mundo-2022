import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTemScore: yup.string().required()
})


export const Card = ({ disabled, gameId, homeTeam, awayTem, homeTeamScore, awayTemScore, gameTime }) => {

    const [auth] = useLocalStorage('auth')

    const formik = useFormik({
        onSubmit: (values) => {
            axios({
                method: 'post',
                baseURL: 'http://localhost:3000',
                url: '/hunches',
                headers: {
                    authorization: `Bearer ${auth.accessToken}`
                },
                data: {
                    ...values,
                    gameId
                }
            })
        },
        initialValues: {
            homeTeamScore,
            awayTemScore
        },
        validationSchema
    })

    return(
        <div className="rounded-xl border border-gray-300 p-4 text-center space-y-4">
            <span className="text-sm md:text-base text-gray-700 font-bold "> {gameTime} </span>
            
            <form className="flex space-x-4 justify-center items-center">
                <span className="uppercase">{homeTeam}</span>
                <img src={`/images/flags/${homeTeam}.png`} />
                
                <input 
                    className="pl-2 bg-red-300 w-[55px] h-[55px] text-red-700 text-xl bg-red-300/[0.2]"
                    type="number" 
                    name="homeTeamScore"
                    value={formik.values.homeTeamScore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleSubmit}
                    disabled={disabled}
                />
                <span className="text-red-500 font-bold">x</span>
                <input 
                    className="pl-2 bg-red-300 w-[55px] h-[55px] text-red-700 text-xl bg-red-300/[0.2]"
                    type="number" 
                    name="awayTemScore"
                    value={formik.values.awayTemScore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleSubmit}
                    disabled={disabled}
                />
                
                <img src={`/images/flags/${awayTem}.png`} />
                <span className="uppercase">{awayTem}</span>
            </form>
        </div>
    )
}
