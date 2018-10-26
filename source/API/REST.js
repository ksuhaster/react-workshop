import { Config } from './config';

export default new class Api extends Config {
    getMovies = async (filter = 'upcoming') => {
        const response = await fetch(`${this.BASE_URI}/${filter}`);
        const result = await response.json();

        return result;
    };
}();
