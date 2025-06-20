import vue from  'vue';
import Vuex from 'vuex';
import router, {resetRouter}from '../router';
import createPersistedState from 'vuex-persistedstate';




vue.use(Vuex);

function addNewRoute(menuList){
    let routes = router.options.routes;
    console.log(routes)
    routes.forEach(routeItem=>{
        if(routeItem.path =="/PageIndex"){
            menuList.forEach(menu=>{
                let childRoute = {
                    path:'/' + menu.menuclick,
                    name:menu.menuname,
                    meta :{ title: menu.menuname },
                    component:()=> import('../components/' + menu.menucomponent)

                }
                routeItem.children.push(childRoute);
            })
        }
    })
    resetRouter();
    router.addRoutes(routes);
}
export default new Vuex.Store({
    state: {
        menu: []
    },
    mutations: {
        setMenu(state, menuList) {
            state.menu = menuList; // setMenu 只负责设置菜单数据
        },
        setRouter(state, menuList) {
            // 这个 mutation 也可以先简化或移除，因为主要逻辑移到 main.js
            addNewRoute(menuList);
        }
    },
    // actions:{
    //     addNAsync(context) {
    //         setTimeout(() => {
    //             context.commit('add');
    //         }, 1000);
    //     }
    // },
    getters:{
        getMenu(state){
            return state.menu;
        }
    },
    plugins:[createPersistedState()]

})