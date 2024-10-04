import { before, after } from "mocha";
import { resolve } from "path";



before(async () =>{
    console.log("initilize test");
    await infra.start();
    await wait (1000);
    console.log("set up done");
})

after(()=>{
    console.log("server shut down");
})

async function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

global.TestCache = {}