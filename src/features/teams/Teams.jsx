import { useSelector } from 'react-redux';
import s from './Teams.module.scss';

export default function Teams() {
    const users = useSelector((state) => state.users.value);
    const mode = useSelector((state) => state.mode.value);
    const teams = Array(mode).fill().map(() => []);

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const createUsersArray = (arr) => {
        const result = [];
        for (let i = 0; i < arr; i++) {
            result.push(i);
        }
        return result;
    }

    const setTeams = () => {
        const arr = createUsersArray(users.length);
        const teamLength = users.length / mode;

        for (let i = 0; i < mode; i++) {
            for (let j = 0; j < teamLength; j++) {
                const randomNumber = getRandomInt(arr.length);
                teams[i].push(arr[randomNumber]);
                arr.splice(randomNumber, 1);
            }
        }
    }

    setTeams();

    return (
        <div>
            {teams.map((team, index) => (
                <div key={index} className={s['teams__container']}>
                    <p className={s['teams__team-number']}>
                        {teams.length === 1 ?
                        `Каждый сам за себя` :
                        `Команда ${index + 1}`}
                    </p>
                    <div className={s['teams__item']}>
                        {team.map((i, index) => (
                            <div key={index}>
                                <img src={users[i].value.avatar} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}