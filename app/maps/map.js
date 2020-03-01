module.exports = {
    event: 'home',
    children: {
        [locale('queries')]: {
            event: 'queries',
            children: {
                [locale('balance')]: { event: 'queries:balance', },
                [locale('period')]: {
                    event: 'queries:period',
                    children: {
                        '*': { event: 'queries:period:days' },
                    }
                },
                [locale('topup')]: {
                    event: 'queries:topup',
                    children: {
                        [locale('myphone')]: { event: 'queries:topup:myphone' },
                        [locale('anotherphone')]: { event: 'queries:topup:anotherphone' },
                        [locale('back')]: { event: 'location:back' }
                    }
                },
                [locale('atms')]: { event: 'queries:atms' },
                [locale('back')]: { event: 'location:back' }
            }
        },
        [locale('interactive')]: {
            event: 'interactive',
            children: {
                '*': { event: 'interactive:mode', await: true }
            }
        }
    },
}
