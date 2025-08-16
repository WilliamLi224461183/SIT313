const img = (seed) => `https://picsum.photos/seed/${seed}/600/360`;

export const featuredArticles = [
    { id: 1, title: 'Build Secure Frontends', author: 'Azadeh G.', image: img('art1') },
    { id: 2, title: 'React State Patterns', author: 'Dev@Deakin', image: img('art2') },
    { id: 3, title: 'Auth Basics (JWT/OAuth)', author: 'Teaching Team', image: img('art3') },
];

export const tutorials = [
    { id: 't1', title: 'Intro to JSX', length: '8 min', image: img('tut1') },
    { id: 't2', title: 'Components & Props', length: '10 min', image: img('tut2') },
    { id: 't3', title: 'Mapping Arrays in React', length: '7 min', image: img('tut3') },
    { id: 't4', title: 'Styling with CSS', length: '6 min', image: img('tut4') },
];
