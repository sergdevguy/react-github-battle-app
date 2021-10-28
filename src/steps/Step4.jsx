import Header from '../components/Header';
import Teams from '../features/teams/Teams';

export default function Step4() {
    // text
    const header = `Готовы к бою!`;

    return (
        <>
            <Header text={header}></Header>
            <Teams></Teams>
        </>
    )
}