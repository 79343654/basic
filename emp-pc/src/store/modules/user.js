import Cookies from 'js-cookie';

const user = {
    state: {
        theUrl:'http://120.79.239.247:8080/monitoring'
      // theUrl:'http://192.168.0.106:8080/monitoring'

    },
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            localStorage.clear();
        }
    }
};

export default user;
