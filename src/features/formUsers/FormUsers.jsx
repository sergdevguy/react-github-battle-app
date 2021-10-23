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
        resultsUsers.map((result) => {
            if (result.value.status) {
                okUsers.push(result);
            } else {
                setErrorUsers([...errorUsers, result.value.login]);
            }
        });
        dispatch(add(okUsers));
        fetchGithubStatus(url);
    }, [resultsUsers])

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

    return (
        <form onSubmit={handleSubmit} className={s['form']}>
            <div className={s['form__github-status']}>
                <p>Оставшееся количество обращений на&nbsp;github: {githubStatus.limit}</p>
                <p>Лимит обновится в: {githubStatus.reset}</p>
            </div>
            {users.length > 0 && <div className={s['form__github-status']}>
                <p>Участники:</p>
                {users.length && users.map((item) => (
                    <p key={item.value.login}>
                        {item.value.login}   
                    </p>
                ))}
            </div>}
            {errorUsers.length > 0 && <div className={s['form__github-status']}>
                <p>Не найдены, не будут добавлены в команды:</p>
                {errorUsers.map((user) => (
                    <p key={user}>
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
