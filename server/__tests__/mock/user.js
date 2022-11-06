const Newuser = {
    body: {
        id: '',
        firstName: 'LuKas',
        lastName: 'ElRancho',
        email: 'elranchao@gmail.com',
        password: '12345',
        adress: 'Rue de la paix',
        city: 'Franconville',
        zipCode: 95,
        profile: 'test.jpg'
    },
    token: "",
    message: "The user has been registered"
};
let changeuser = {
    body: {
        id: '',
        firstName: 'Jean',
        lastName: 'Luc',
        email: 'changeuser@gmail.com',
        password: Newuser.body.password,
        adress: Newuser.body.adress,
        city: Newuser.body.city,
        zipCode: Newuser.body.zipCode,
        profile: Newuser.body.profile
    }
}
module.exports = {Newuser, changeuser};