import Header from '../components/Header';
import Text from '../components/Text';
import ButtonStep from '../components/buttonStep/ButtonStep';

export default function Step1() {
    // text
    const header = `Team Fights!`;
    const text = `Приложение формирует случайные команды из указанных 
    пользователей github, в доступных режимах (в зависимости от кол-ва участников).`;
    const button = `Начать`;

    return (
        <>
            <Header text={header}></Header>
            <Text text={text}></Text>
            <ButtonStep text={button}></ButtonStep>
        </>
    )
}