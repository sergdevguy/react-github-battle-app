import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Text from '../components/Text';
import ButtonStep from '../components/buttonStep/ButtonStep';
import Modes from '../features/modes/Modes';

export default function Step3() {
    const users = useSelector((state) => state.users.value);
    const mode = useSelector((state) => state.mode.value);
    // text
    const header = `Выберите режим`;
    const text = `Доступные режимы для ${users.length} игроков:`;
    const button = `Далее`;

    return (
        <>
            <Header text={header}></Header>
            <Text text={text}></Text>
            <Modes></Modes>
            {mode > 0 && <ButtonStep text={button}></ButtonStep>}
        </>
    )
}