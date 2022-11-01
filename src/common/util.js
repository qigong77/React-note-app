    //获取创建/更新 时间
    function getTime (){
        let date = new Date();
        let yy = date.getFullYear();
        let mm = date.getMonth()+1;
        let dd =  date.getDate();
        let day = date.getDay();
        let weekday = "日一二三四五六".charAt(day)
        return `${yy}年${mm}月${dd}日 星期${weekday} `;
    }

    //两个数组去重合并
    function concatArray(arr1, arr2, param) {
        let arrs = [...arr1, ...arr2]
        //根据param去重
        let map=new Map();
        for(let item of arrs){
            if(!map.has(item[param])){
                map.set(item[param],item)
            }
        }
        return [...map.values()];
    }
    export {
        getTime,
        concatArray
    }