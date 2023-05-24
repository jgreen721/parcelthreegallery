var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.height = innerHeight;
canvas.width = innerWidth;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
console.log("hey asshat");
function animation() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "48px Verdana";
    ctx.fillText("Welcome", canvas.width / 2 - 100, canvas.height / 2);
    requestAnimationFrame(animation);
}
animation();
onresize = (e)=>{
    console.log("resizing");
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

//# sourceMappingURL=index.820dcdf3.js.map
