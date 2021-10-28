import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from './modeSlice';
import s from './Modes.module.scss';

export default function Modes() {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.mode.value);
    const users = useSelector((state) => state.users.value);

    const handleSetMode = (mode, trueModeNumber ) => {
        if (checkDisabled(trueModeNumber) && mode !== 1) {
            return;
        }
        dispatch(set(mode));
    }

    const setActiveClass = (modeNumber) => {
        if (modeNumber === mode) {
            return s['_active'];
        }
    }

    const checkDisabled = (trueModeNumber) => {
        if (users.length % trueModeNumber !== 0 || users.length === trueModeNumber) {
            return true;
        } else {
            return false;
        }
    }

    const setDisabledClass = (trueModeNumber) => {
        if (checkDisabled(trueModeNumber)) {
            return s['_disabled'];
        }
    }

    const addSpanUsersNumber = (trueModeNumber) => {
        if (checkDisabled(trueModeNumber)) {
            return;
        }
        return (<span className={s['modes__descr']}>({users.length / trueModeNumber})</span>)
    }

    return (
        <div className={s['modes']}>
            <div
                className={s['modes__container'] + ' ' + s['_one'] + ' ' + setActiveClass(1)}
                onClick={() => handleSetMode(1, 0)}
            >
                <div>Каждый сам за себя</div>
            </div>
            <div
                className={s['modes__container'] + ' ' + s['_two'] + ' ' + setActiveClass(2) + ' ' + setDisabledClass(2)}
                onClick={() => handleSetMode(2, 2)}
            >
                <div>Команда 1 {addSpanUsersNumber(2)}</div>
                <div>Команда 2 {addSpanUsersNumber(2)}</div>
            </div>
            <div
                className={s['modes__container'] + ' ' + s['_three'] + ' ' + setActiveClass(3) + ' ' + setDisabledClass(3)}
                onClick={() => handleSetMode(3, 3)}
            >
                <div>Команда 1 {addSpanUsersNumber(3)}</div>
                <div>Команда 2 {addSpanUsersNumber(3)}</div>
                <div>Команда 3 {addSpanUsersNumber(3)}</div>
            </div>
            <div
                className={s['modes__container'] + ' ' + s['_four'] + ' ' + setActiveClass(4) + ' ' + setDisabledClass(4)}
                onClick={() => handleSetMode(4, 4)}
            >
                <div>Команда 1 {addSpanUsersNumber(4)}</div>
                <div>Команда 2 {addSpanUsersNumber(4)}</div>
                <div>Команда 3 {addSpanUsersNumber(4)}</div>
                <div>Команда 4 {addSpanUsersNumber(4)}</div>
            </div>
        </div>
    )
}