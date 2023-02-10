import shuffle_array from "../../functions/array/shuffle";

export default class Rand {

    constructor(array) {
        this.array = array;

        this.last_index = 0;

        this.init();
    }

    init() {
        this.shuffle();
    }

    get() {
        const curr_val = this.array[this.last_index];
        this.last_index++;
        if (this.last_index === this.array.length - 1) {
            this.shuffle();
            this.last_index = 0;
        }
        return curr_val;
    }

    shuffle() {
        this.array = shuffle_array(this.array)
    }

    static create(array) {
        return new Rand(array);
    }
}