/**
 * Created by shawnmccarthy on 1/22/17.
 * Updated by brice-allen on 2021/02/24.
 */
'use strict;';
//Include crypto to generate the movie id
var crypto = require('crypto');
module.exports = function () {
    return {
        userList: [],
        /*
         * Save the user inside the "db".
         */
        save(user) {
            user.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.userList.push(user);
            return 1;
        },
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        find(id) {
            return id ? this.userList.find(function (element) {
                return element.id === id;
            }) : this.userList;
        },
        findOne(name) {
            return name ? this.userList.find(function (element) {
                return element.username === name;
            }) : this.userList;
        },
        /*
         * Delete a movie with the given id.
         */
        remove(id) {
            var found = 0;
            this.userList = this.userList.filter(function (element) {
                if (element.id === id) found = 1; else {
                    return element.id !== id;
                }
            });
            return found;
        },
        /*
         * Update a movie with the given id
         */
        update(id, user) {
            var userIndex = this.userList.findIndex(function (element) {
                return element.id === id;
            });
            if (userIndex !== -1) {
                this.userList[userIndex].username = user.username;
                this.userList[userIndex].password = user.password;
                return 1;
            }
            return 0;
        }
    };
};