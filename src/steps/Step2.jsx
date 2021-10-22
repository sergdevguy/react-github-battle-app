import Header from '../components/Header';
import Text from '../components/Text';
import ButtonStep from '../components/buttonStep/ButtonStep';
import FormUsers from '../features/formUsers/FormUsers'
import { useSelector } from 'react-redux';

export default function Step2() {
    const users = useSelector((state) => state.users.value);
    // text
    const header = `Добавьте участников`;
    const text = `Добавьте никнеймы участников (из github).`;
    const button = `Далее`;

    return (
        <>
            <Header text={header}></Header>
            <Text text={text}></Text>
            <FormUsers></FormUsers>
            {users.length ?
                <ButtonStep text={button}></ButtonStep> :
                ''
            }
        </>
    )
}