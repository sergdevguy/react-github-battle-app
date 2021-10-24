import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Text from '../components/Text';
import ButtonStep from '../components/buttonStep/ButtonStep';

export default function Step3() {
    const users = useSelector((state) => state.users.value);
    // text
    const header = `Выберите режим`;
    const text = `Доступные режимы для ${users.length} игроков:`;
    const button = `Далее`;

    return (
        <>
            <Header text={header}></Header>
            <Text text={text}></Text>
            
            <ButtonStep text={button}></ButtonStep>
        </>
    )
}