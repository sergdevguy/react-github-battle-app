import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from './usersSlice';
import s from './FormUsers.module.scss';

export default function FormUsers() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.value);
    const [selectedUsers, setSelectedUsers] = useState('');
    const [githubStatus, setGithubStatus] = useState({
        limit: null,
        reset: null,
    });
    const [readyUsers, setReadyUsers] = useState([]);
    const url = 'https://api.github.com/users';
    // const users = [
    //     'ArfatSalman',
    //     'octocat',
    //     'norvig'
    // ];

    useEffect(() => {
        fetchGithubStatus(url);
    }, [])

    useEffect(() => {
        if (!users.length) {
            return;
        }
        fetchAllCounts(users);
        fetchGithubStatus(url);
    }, [users])

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
        console.log('Фетчим лимит')
        const response = await fetch(`${url}`);
        const remaining = response.headers.get('X-RateLimit-Remaining');
        const reset = new Date(response.headers.get('X-RateLimit-Reset') * 1000)
            .toLocaleString('ru-RU', { hour: 'numeric', minute: 'numeric' });
        setGithubStatus({ ...githubStatus, limit: remaining, reset: reset });
    }

    const fetchPublicReposCount = async (username) => {
        const response = await fetch(`${url}/${username}`);
        console.log(response);
        const json = await response.json();
        return json['public_repos'];
    }

    async function fetchAllCounts(users) {
        const promises = users.map(async username => {
            const count = await fetchPublicReposCount(username);
            return count;
        });
        return Promise.allSettled(promises);
    }

    function handleAddPlayers() {
        setSelectedUsers(trimValue(selectedUsers));
        dispatch(add(selectedUsers.split(' ')));
        // проверяем есть ли такие профили на гитхабе
    }

    return (
        <form onSubmit={handleSubmit} className={s['form']}>
            <div className={s['form__github-status']}>
                <p>Оставшееся количество обращений на&nbsp;github: {githubStatus.limit}</p>
                <p>Лимит обновится в: {githubStatus.reset}</p>
            </div>
            <div className={s['form__github-status']}>
                <p>Участники:</p>
                {users.map((i) => (
                    <p key={i}>{i}</p>
                ))}
            </div>
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
