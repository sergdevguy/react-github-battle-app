import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from './usersSlice';
import s from './FormUsers.module.scss';

export default function FormUsers() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.value);
    const [selectedUsers, setSelectedUsers] = useState('');
    const [errorUsers, setErrorUsers] = useState([]);
    const [resultsUsers, setResultsUsers] = useState([]);
    const [githubStatus, setGithubStatus] = useState({
        limit: null,
        reset: null,
    });
    const url = 'https://api.github.com/users';

    useEffect(() => {
        fetchGithubStatus(url);
    }, [])

    useEffect(() => {
        if (!resultsUsers.length) {
            return;
        }
        const okUsers = [];
        const errorUsers2 = [];
        resultsUsers.map((result) => {
            if (result.value.status) {
                okUsers.push(result);
            } else {
                errorUsers2.push(result.value.login);
            }
        });
        dispatch(add(okUsers));
        setErrorUsers(errorUsers2);
    }, [resultsUsers])

    useEffect(() => {
        fetchGithubStatus(url);
    }, [users, githubStatus])

    function formatValue(value) {
        const valueWithRemovedSpaces = value.replace(/ +/g, ' ');
        return valueWithRemovedSpaces;
    }

    function trimValue(value) {
        const trimmedValue = value.trim();
        return trimmedValue;
    }

    function auotoHeightTextarea(target) {
        if (target.clientHeight < target.scrollHeight) {
            target.style.height = target.scrollHeight +
                parseInt(window.getComputedStyle(target, null).getPropertyValue("padding"), 10) +
                "px";
        }
    }

    function handleChange(e) {
        auotoHeightTextarea(e.target);
        setSelectedUsers(formatValue(e.target.value));
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    const fetchGithubStatus = async (url) => {
        const response = await fetch(`${url}`);
        const remaining = response.headers.get('X-RateLimit-Remaining');
        const reset = new Date(response.headers.get('X-RateLimit-Reset') * 1000)
            .toLocaleString('ru-RU', { hour: 'numeric', minute: 'numeric' });
        setGithubStatus({ ...githubStatus, limit: remaining, reset: reset });
    }

    const fetchUser = async (username) => {
        const response = await fetch(`${url}/${username}`);
        const json = await response.json();
        return { status: response.ok, login: username, avatar: json['avatar_url'] };
    }

    async function fetchAllUsers(users) {
        const promises = users.map(async username => {
            const user = await fetchUser(username);
            return user;
        });
        return Promise.allSettled(promises);
    }

    function handleAddPlayers() {
        if (!selectedUsers) {
            return;
        }
        // форматируем список игроков
        setSelectedUsers(trimValue(selectedUsers));
        // проверяем их фетчим и добавляем в юзеров
        fetchAllUsers(selectedUsers.split(' ')).
            then((results) => {
                setResultsUsers(results);
            });
    }

    function handleSelectText(e) {
        e.target.select();
    }

    return (
        <form onSubmit={handleSubmit} className={s['form']}>
            <div className={s['form__github-status']}>
                <p>Оставшееся количество обращений на&nbsp;github: {githubStatus.limit}</p>
                <p>Лимит обновится в: {githubStatus.reset}</p>
            </div>
            <div className={s['form__github-status']}>
                <p>Пользователи для теста:</p>
                <textarea
                    style={{fontSize: '10px'}}
                    name=""
                    id=""
                    rows="3"
                    value='sergdevguy astrey123 astrey taniarascia crystalbit-us sergdevguy321 Vindida'
                    onChange={() => {return}}
                    onClick={handleSelectText}
                ></textarea>
            </div>
            {users.length > 0 && <div className={s['form__github-status'] + ' ' + s['_ok']}>
                <p>Участники: ({users.length})</p>
                {users.length && users.map((item) => (
                    <p className={s['_ok']} key={item.value.login}>
                        {item.value.login}
                    </p>
                ))}
            </div>}
            {errorUsers.length > 0 && <div className={s['form__github-status'] + ' ' + s['_error']}>
                <p>Не найдены, не будут добавлены в команды: ({errorUsers.length})</p>
                {errorUsers.map((user) => (
                    <p className={s['_error']} key={user}>
                        {user}
                    </p>
                ))}
            </div>}
            <textarea
                name=""
                id=""
                value={selectedUsers}
                onChange={handleChange}
                placeholder="Укажите участников здесь, через пробел"
            ></textarea>
            <button onClick={handleAddPlayers}>Добавить</button>
        </form>
    )
}
