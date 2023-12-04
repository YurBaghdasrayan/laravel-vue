export default {
    methods: {
        validation(rules, form) {
            const errors = {};
            Object.keys(rules).forEach(rule => {
                if (rules[rule].required && !form[rule]) {
                    errors[rule] = rule + ' is required'
                }
            })
            return errors
        },
        CommentValidation(rules, form) {
            const errors = {};
            Object.keys(rules).forEach(rule => {
                if (rules[rule].required && !form[rule]) {
                    errors[rule] = rule + ' is required'
                }
            })
            return errors
        },
    }
}