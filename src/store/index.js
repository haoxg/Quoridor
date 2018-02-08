import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        round: 0, //回合制
        turn: 0, //谁的轮次
        wallPos: new Array(), //墙队列
        rens: [
                    {id:'p0',name:'红方',pos:[8,16],walls:10},
                    {id:'p1',name:'黑方',pos:[8,0],walls:10},
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
        },
        useWall(state,pos){
            state.rens[state.turn].walls = state.rens[state.turn].walls - 1;
            state.wallPos.push(pos);
            if(pos[0]%2 == 0){ //横墙
                if(pos[0] < 16){
                    state.wallPos.push([pos[0]+2,pos[1]]);
                }
            }else{
                if(pos[1] < 16){
                    state.wallPos.push([pos[0],pos[1]+2]);
                }
            }
            console.log(state.wallPos);
        },
        changePos(state,pos){
            state.rens[state.turn].pos = pos;
        }
    },
    actions: {
        
    },
});

export default store

