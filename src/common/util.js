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
    export {
        getTime
    }