import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        round: 0, //回合制
        turn: 0, //谁的轮次
        wallPos: Array, //墙队列
        rens: [
                    {id:'p0',name:'红方',pos:[8,16],walls:10},
                    {id:'p1',name:'黑方',pos:[8,16],walls:10},
                ], //人坐标
    },
    mutations: {
        switchTurn (state){
            let number = state.rens.length;
            if(state.turn+1 >= number){
                state.turn = 0;
            }else{
                state.turn++;
            }
            state.round++;
            // console.log(state.round+"回合");
            // console.log(state.turn+"的轮次");
        },
        useWall(){
            this.state.rens[this.state.turn].walls = this.state.rens[this.state.turn].walls - 1;
        }
    },
    actions: {
        
    },
});

export default store

