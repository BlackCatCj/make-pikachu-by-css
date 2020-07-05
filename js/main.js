// 在html中写出代码展示
!function () {


    var duration = 30
    var flag = false
    $('.actions').on('click', 'button', function (e) {
        let $button = $(e.currentTarget) // button
        let speed = $button.attr('data-speed') //这样就知道点击的是那个按钮
        $button.addClass('active')
            .siblings('.active').removeClass('active') //如果有active(设置了按钮选中的阴影)样式则删掉样式
        switch (speed) {
            case 'slow':
                duration = 100
                break
            case 'normal':
                duration = 30
                break
            case 'fast':
                duration = 5
                break
            case 'finish':
                flag = true
                break
        }
    })





    //prefix空字符串 code 传入的代码  fn 回调  
    function writeCode(prefix, code, fn) {
        let container = document.querySelector('#code')
        let styleTag = document.querySelector('#styleTag')
        let n = 0
        let id
        // setTimeout比setInterval要好些,因为它是类似与延时递归的调用,还能继续调用外部参数
        // setInterval以运行就不能再读取外部的参数
        id = setTimeout(function run() {
            n += 1
            container.innerHTML = code.substring(0, n)
            // 每次都显示最后一行代码，这样就不会因为代码过长超出限定范围了
            styleTag.innerHTML = code.substring(0, n)
            container.scrollTop = container.scrollHeight
            // 中断操作  直接停止显示代码,直接展示结果
            if (flag === true) {
                styleTag.innerHTML = code
                window.clearsetTimeout()
            }

            // 如果代码没有执行完,则继续再运行run()函数
            if (n < code.length) {
                // 此时就会再读取外部的duration变量的值,然后速度就变了
                id = setTimeout(run, duration)
            } else {
                fn && fn.call()
            }
        }, duration)
    }

    let code = `
    /* 现在开始制作皮卡丘 */
    .preview{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fee433;
    }
    .wrapper{
    width: 100%;
    height: 165px;
    position: relative;
    }
    /* 用于将wrapper这个父元素中的除了最后一个儿子的所有子项都加上z-index: 1 */
    /* 目的是将所有子项都比最后一项（嘴巴）高一级，这样嘴巴才能显示出来，否则会被隐藏 */
    .wrapper > :not(:last-child){
        z-index: 1;
    }
    .nose{
        /* 
    width: 0px;
    height: 0px;
    border: 11px solid;
    border-color: red blue green gray;
    border-radius: 11px;
    这样写，就是一个圆形，分成四个不同颜色的扇形 不能有第五个颜色，否则会全黑
        */
    width: 0px;
    height: 0px;
    border: 11px solid;
    /* transparent  透明的颜色 */
    border-color: black transparent transparent transparent;
    border-radius: 11px;
    /* 绝对定位  父元素上也要写上position */
    position: absolute;  
    top: 28px;
    /* left:50% 并不是正中间，而是左边框在正中间，所以还要向左移动一半的宽度 */
    left: 50%;
    /* 设置象作移动自身的一半像素，手动计算的 */
    margin-left: -11px;
    /* 向左移动自身的50%*/
    /* transform: translateX(-50%); */ 
    }
    .eye{
        width: 49px;
        height: 49px;
        background: #2e2e2e;
        position: absolute;
        border-radius: 50%;
    /* 这里因为有box-sizing: border-box; 所以不会受2px的边框影响位置 */
        border: 2px solid #000000;
    }
    .eye::before{
        content: '';
        display: block;
        width: 24px;
        height: 24px;
        background: white;
        position: absolute;
        border-radius: 50%;
        left: 6px;
        top: -1px;
        border: 1px solid #000000;
    }
    .eye.left{
    right: 50%;
    margin-right: 90px;
    }
    .eye.right{
        left: 50%;
        margin-left: 90px;
    }
    .face{
        width: 68px;
        height: 68px;
        top: 85px;
        background: #fc0d1c;
        border: 2px solid black;
        border-radius: 50%;
        position: absolute;
    }
    .face.left{
        right: 50%;
        margin-right: 116px;
    }
    .face.right{
        left: 50%;
        margin-left: 116px;
    }
    .upperLip{
        width: 80px;
        height: 25px;
        top: 48px;
        border:2px solid black; 
        position: absolute;
        /* 通过背景色覆盖住嘴巴超出的高度 */
        background: #fee433;
    }
    .upperLip.left{
        right: 50%;  
        /* 只给下边和左侧添加弧度 */
        border-bottom-left-radius: 40px 25px;
        /* 去除顶部和右侧的border边框 */
        border-top: none;
        border-right: none;
    /* 旋转弧度 */
        transform: rotate(-20deg);
    }
    .upperLip.right{
        left: 50%;  
        /* 只给下边和右侧添加弧度 */
        border-bottom-right-radius: 40px 25px;
        /* 去除顶部和左侧的border边框 */
        border-top: none;
        border-left: none;
    /* 旋转弧度 */
        transform: rotate(20deg);
    }
    .lowerLip-wrapper{
        height: 136px;
        width: 200px;
        bottom: -30px;
        position: absolute;
        left: 50%;
        margin-left: -100px;
        /* z-index: -1; */
        overflow: hidden;
    }
    .lowerLip{
        width: 200px;
        height: 3500px;
        background: #990513;
        border-radius: 200px/1000px;
        border: 2px solid black;
        position: absolute;
        bottom: 0;
        /* 超出lowerLip这个div的区域全部隐藏 */
        overflow: hidden;
    }
    .lowerLip::after{
        content: '';
        position: absolute;
        bottom:-20px;
        width: 130px;
        height: 130px;
        background: #fa4a62;
        left: 50%;
        margin-left: -65px;
        border-radius: 50%;
    }
    /* 这个皮卡丘就做好了 */
   `
    writeCode('', code)

}.call()