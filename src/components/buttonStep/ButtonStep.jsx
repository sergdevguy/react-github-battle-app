import { useDispatch } from 'react-redux';
import { increment } from './buttonStepSlice';
import s from './ButtonStep.module.scss';

export default function ButtonStep({ text="Кнопка" }) {
    const dispatch = useDispatch();

    return (
        <button className={s['button']} onClick={() => dispatch(increment())}>{text}</button>
    )
}