import Model from './model.js';

export default class Contact extends Model {
    constructor() {
        super();

        this.addField('op', 'string');
        this.addField('x', 'string');
        this.addField('y', 'string');
    }
}