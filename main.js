document.getElementById("submit").onclick = function() {myFunction()};
function myFunction() {
    var NUMBER_OF_DISKS=document.getElementById("disks").value;
    document.getElementById("change").innerHTML="WE HAVE 3 RODS AND "+NUMBER_OF_DISKS+" DISKS";
    document.getElementById("change").style.visibility= "visible";
if(NUMBER_OF_DISKS==4)
{
    document.getElementById("disc-5").style.background="#0B0C10";
    document.getElementById("disc-7").style.background="#0B0C10";
    document.getElementById("disc-6").style.background="#0B0C10";
}
if(NUMBER_OF_DISKS==3)
{
    document.getElementById("disc-4").style.background="#0B0C10";
    document.getElementById("disc-5").style.background="#0B0C10";
    document.getElementById("disc-7").style.background="#0B0C10";
    document.getElementById("disc-6").style.background="#0B0C10";
}

if(NUMBER_OF_DISKS==5)
{
    document.getElementById("disc-7").style.background="#0B0C10";
    document.getElementById("disc-6").style.background="#0B0C10";
}

if(NUMBER_OF_DISKS==6)
{
    document.getElementById("disc-7").style.background="#0B0C10";
} 
var towerA = [];
var towerB = [];
var towerC = [];

for(var i = NUMBER_OF_DISKS; i > 0; i -= 1)
{
    towerA.push(i);
}
var updateTowers = function()
{
    for(i = 0; i < towerA.length; i += 1)
    {
        $(".disc-" + towerA[i]).css(
        {
            left: 0,
            transform: "rotate(0deg)"
        });
    }
    for(i = 0; i < towerB.length; i += 1)
    {
        $(".disc-" + towerB[i]).css(
        {
            left: 200,
            transform: "rotate(360deg)"
        });
    }
    for(i = 0; i < towerC.length; i += 1)
    {
        $(".disc-" + towerC[i]).css(
        {
            left: 400,
            transform: "rotate(720deg)"
        });
    }
}

var move = function(n, source, target, auxiliary)
{
    return new Promise(function(resolve, reject)
    {
        if(n > 0)
        {
            move(n - 1, source, auxiliary, target).then(function()
            {
                window.setTimeout(function()
                {
                    target.push(source.pop());
                    updateTowers();
                    
                    move(n - 1, auxiliary, target, source).then(function()
                    {
                        updateTowers();
                        resolve();
                    });
                }, 1000);
            });
        }
        else
        {
            resolve();
        }
    });
}
updateTowers();
move(NUMBER_OF_DISKS, towerA, towerC, towerB);
}