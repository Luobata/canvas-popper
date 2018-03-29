import typesetting from './canvas';
enum type {
    canvas = 'canvas',
    dom = 'dom',
}

window.onload = () => {
    new typesetting({
        text: '接通率=（未回应+已回应的线索量）÷（未接通+未回应+',
        width: '104px',
        fontSize: '14px',
        lineHeight: '20px',
        color: 'black',
        fontFamily: 'mocrosoft yahei',
        padding: '0px',
        type: type.dom,
    });
};
