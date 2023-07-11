

function calculateTimeDifference(dateTimeString) {
    const givenDateTime = new Date(dateTimeString.replace(' ', 'T'));
    const currentDateTime = new Date();

    const timeDifference = currentDateTime - givenDateTime;

    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    var returnString = ""
    if (daysDifference != 0){
        returnString += daysDifference.toString() + " D "
    }
    if (hoursDifference % 24 != 0){
        returnString += (hoursDifference % 24).toString() + " H "
    }
    if (minutesDifference % 60 != 0){
        returnString += (minutesDifference % 60).toString() + " M "
    }
    returnString += "ago"
    return returnString
  
    // return {
    //   days: daysDifference,
    //   hours: hoursDifference % 24,
    //   minutes: minutesDifference % 60,
    //   seconds: secondsDifference % 60
    // };
  }



async function getData(){
    var url = "https://raw.githubusercontent.com/4rivappa/twitch-streamer-status/streamer-status/mini_data.json"
    await fetch(url).then(data => data.json()).then(data => {
        console.log(data)
        console.log(data.streams)

        var zero = document.getElementById("is-live")
        var child = document.createElement("a")
        if (data.streams.length == 0){
            child.innerHTML = "TimeEnjoyed is not streaming"
        } else {
            child.href = "https://www.twitch.tv/timeenjoyed"
            child.innerHTML = "TimeEnjoyed is streaming"
        }
        child.style.textDecoration = "none"
        zero.appendChild(child)

        var div_list = ["latest", "second-latest", "third-latest"]
        for (var i = 0; i < data.videos.length; i++){
            var div = document.getElementById(div_list[i])

            var textChild = document.createTextNode(calculateTimeDifference(data.videos[i].created_at))
            div.appendChild(textChild)

            div.appendChild(document.createElement("br"))

            var child = document.createElement("a")
            child.href = data.videos[i].url
            child.innerHTML = data.videos[i].title
            child.style.textDecoration = "none"
            div.appendChild(child)
        }
    })
}

getData()