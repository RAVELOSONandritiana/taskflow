import { theme } from "$lib/store/theme.store";

const saved = localStorage.getItem('theme');

if(saved != null){
    theme.set(saved === 'true')
}

theme.subscribe(value => {
    localStorage.setItem('theme', '' + value)
    document.documentElement.classList.toggle('dark', value);
})