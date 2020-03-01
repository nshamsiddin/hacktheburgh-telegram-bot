module.exports = {
    event: 'register:home',
    children: {
        [locale('register')]: {
            event: 'register:init',
            children: {
                '*': {
                    event: 'register:firstname',
                    children: {
                        '*': {
                            event: 'register:surname',
                            children: {
                                '*': {
                                    event: 'register:phone',
                                    children: {
                                        '*': {
                                            event: 'register:postcode',
                                            children: {
                                                '*': {
                                                    event: 'home'
                                                },
                                            }
                                        },
                                    }
                                },
                            },
                        },
                    }
                },
            }
        }
    }
}