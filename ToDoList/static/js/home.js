(function(){
    /*
     * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
     */
    var dateObj = (function(){
        var _date = new Date();    // 默认为当前系统时间
        return {
            getDate : function(){
                return _date;
            },
            setDate : function(date) {
                _date = date;
            }
        };
    })();

    // 设置calendar div中的html部分
    renderHtml();
    // 表格中显示日期
    showCalendarData();
    // 绑定事件
    bindEvent();

    /**
     * 渲染html结构
     */
    function renderHtml() {
        var calendar = document.getElementById("calendar");
        var titleBox = document.createElement("div");  // 标题盒子 设置上一月 下一月 标题
        var bodyBox = document.createElement("div");  // 表格区 显示数据

        // 设置标题盒子中的html
        titleBox.className = 'calendar-title-box';
        titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>" +
            "<span class='calendar-title' id='calendarTitle'></span>" +
            "<span id='nextMonth' class='next-month'></span>";
        calendar.appendChild(titleBox);    // 添加到calendar div中

        // 设置表格区的html结构
        bodyBox.className = 'calendar-body-box';
        var _headHtml = "<tr>" +
            "<th>日</th>" +
            "<th>一</th>" +
            "<th>二</th>" +
            "<th>三</th>" +
            "<th>四</th>" +
            "<th>五</th>" +
            "<th>六</th>" +
            "</tr>";
        var _bodyHtml = "";

        // 一个月最多31天，所以一个月最多占6行表格
        for(var i = 0; i < 6; i++) {
            _bodyHtml += "<tr>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "</tr>";
        }
        bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
            _headHtml + _bodyHtml +
            "</table>";
        // 添加到calendar div中
        calendar.appendChild(bodyBox);
    }

    /**
     * 表格中显示数据，并设置类名
     */
    function showCalendarData() {
        var _year = dateObj.getDate().getFullYear();
        var _month = dateObj.getDate().getMonth() + 1;
        var _dateStr = getDateStr(dateObj.getDate());

        // 设置顶部标题栏中的 年、月信息
        var calendarTitle = document.getElementById("calendarTitle");
        var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4,2) + "月";
        calendarTitle.innerText = titleStr;

        // 设置表格中的日期数据
        var _table = document.getElementById("calendarTable");
        var _tds = _table.getElementsByTagName("td");
        var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天
        for(var i = 0; i < _tds.length; i++) {
            var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
            var _thisDayStr = getDateStr(_thisDay);
            _tds[i].innerText = _thisDay.getDate();
            //_tds[i].data = _thisDayStr;
            _tds[i].setAttribute('data', _thisDayStr);
            if(_thisDayStr == getDateStr(new Date())) {    // 当前天
                _tds[i].className = 'currentDay';
            }else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
                _tds[i].className = 'currentMonth';  // 当前月
            }else {    // 其他月
                _tds[i].className = 'otherMonth';
            }
        }
    }

    /**
     * 绑定上个月下个月事件
     */
    function bindEvent() {
        var prevMonth = document.getElementById("prevMonth");
        var nextMonth = document.getElementById("nextMonth");
        addEvent(prevMonth, 'click', toPrevMonth);
        addEvent(nextMonth, 'click', toNextMonth);
    }

    /**
     * 绑定事件
     */
    function addEvent(dom, eType, func) {
        if(dom.addEventListener) {  // DOM 2.0
            dom.addEventListener(eType, function(e){
                func(e);
            });
        } else if(dom.attachEvent){  // IE5+
            dom.attachEvent('on' + eType, function(e){
                func(e);
            });
        } else {  // DOM 0
            dom['on' + eType] = function(e) {
                func(e);
            }
        }
    }

    /**
     * 点击上个月图标触发
     */
    function toPrevMonth() {
        var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        showCalendarData();
    }

    /**
     * 点击下个月图标触发
     */
    function toNextMonth() {
        var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        showCalendarData();
    }

    /**
     * 日期转化为字符串， 4位年+2位月+2位日
     */
    function getDateStr(date) {
        var _year = date.getFullYear();
        var _month = date.getMonth() + 1;    // 月从0开始计数
        var _d = date.getDate();

        _month = (_month > 9) ? ("" + _month) : ("0" + _month);
        _d = (_d > 9) ? ("" + _d) : ("0" + _d);
        return _year + _month + _d;
    }
})();

//
doing_list_class_tag=document.getElementsByClassName("doing_list");
done_list_class_tag=document.getElementsByClassName("done_list");
//
doing_num_tag=document.getElementsByClassName("doing_num");
done_num_tag=document.getElementsByClassName("done_num");
// input绑定函数，提示输入ToDo
input_tag=document.getElementById('i1');
input_tag.onfocus=function (){
    if(input_tag.value.trim()==="添加ToDo"){
        input_tag.value="";
    }
};
input_tag.onblur=function (){
    if(input_tag.value.trim().length===0){
        input_tag.value="  添加ToDo"
    }
};
// add按钮绑定函数,添加待办ToDo
button_add_tag=document.getElementById('b1');
function add_todo() {
        if (input_tag.value.trim().length !== 0 && input_tag.value.trim() !== "添加ToDo") {
            value_todo = input_tag.value;
            doing_tag = document.getElementsByClassName('doing_list')[0];
            var obj = '<li class="todo"><input class="thing_check" type="checkbox" onclick="check(event);">' +
                '<span></span><i class="iconfont icon-10" onclick="del_tag(event)"></i></li>';
            doing_tag.insertAdjacentHTML('beforeend', obj);
            current_li_tag = doing_tag.lastElementChild;
            current_li_span_tag = current_li_tag.children[1];
            current_li_span_tag.innerText = value_todo;
            doing_num_tag[0].innerText = parseInt(doing_num_tag[0].innerText) + 1;
            input_tag.value = ""
        } else {
            alert('请输入要添加的ToDo');
        }
}
button_add_tag.onclick = function () {
    add_todo()
};
// 添加todo绑定键盘enter
input_tag.onkeypress=function (){
    if(event.keyCode===13 || window.event === 13){
        add_todo()
    }
};
// 单选框单击，完成事件
function append(tag,obj) {
    tag[0].appendChild(obj);
    return true
}
function check() {
    var obj = event.srcElement;
    var obj_parent_tag = obj.parentElement;
    if (obj.checked === true) {
        append(done_list_class_tag, obj_parent_tag);
        done_num_tag[0].innerText = parseInt(done_num_tag[0].innerText)+1;
        doing_num_tag[0].innerText = parseInt(doing_num_tag[0].innerText)-1;
    } else if (obj.checked === false) {
        append(doing_list_class_tag, obj_parent_tag);
        done_num_tag[0].innerText = parseInt(done_num_tag[0].innerText)-1;
        doing_num_tag[0].innerText = parseInt(doing_num_tag[0].innerText)+ 1;
    }
}


function del_tag() {
    var obj_parent_tag=event.srcElement.parentElement;
    var obj_parent_div_tag=event.srcElement.parentElement.parentElement;
    if(obj_parent_div_tag.className==="doing_list"){
        doing_num_tag[0].innerText = parseInt(doing_num_tag[0].innerText)-1;
    }else if(obj_parent_div_tag.className==="done_list"){
        done_num_tag[0].innerText = parseInt(done_num_tag[0].innerText)-1;
    }
    obj_parent_div_tag.removeChild(obj_parent_tag);
}
button_clear_tag=document.getElementById("b2");
button_clear_tag.onclick=function (){
    // 所有复选框列表
    var todo_check_tags=document.getElementsByClassName("todo");
    for(var i=0;todo_check_tags.length;i++){
        todo_check_tags[0].parentElement.removeChild(todo_check_tags[0]);
    }
    doing_num_tag[0].innerText="0";
    done_num_tag[0].innerText="0";
};
//广告栏轮动
pow=document.getElementsByClassName("pow")[0];
pow_ul=pow.children[0];
time=null;
count=0;

time=setInterval(autoplay,40);
function autoplay(){
    count--;
    count<=-312 ? count=0:count;
    pow_ul.style.top=count+"px"
}
pow.onmouseover=function () {
    clearInterval(time)
};
pow.onmouseout=function () {
    time=setInterval(autoplay,40);
};


