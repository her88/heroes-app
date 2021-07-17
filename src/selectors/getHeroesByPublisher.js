import { heroes } from '../data/heroes';

export const getHeroesByPublisher = (publisher) => {

    const validPublishers = ['DC Comics', 'Marvel Comics'];

    if (!validPublishers.includes(publisher)) {
        throw new Error(`Publishe "${publisher}" no es correcto - ${validPublishers}`);
    }

    return heroes.filter(hero => hero.publisher === publisher);
}