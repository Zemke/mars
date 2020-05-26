const locMonth = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

window.addEventListener('load', async () => {
  // GET https: //api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
  const data = await fetch('http://localhost:5000/insight-weather.json').then(res => res.json());
  latest(data);
  others(data);
});

function createBox(sol, lastUtc, AT, WD) {
  console.log("WD", WD);
  return `
        <div class="sol">
            <p>
              <span class="label">Sol</span>
              <span class="fat">${sol}</span><br>
              <span class="fat">${locMonth[lastUtc.getMonth()].substring(0, 3)} ${lastUtc.getDate()}</span>
            </p>
        </div>
        <div class="temperature">
          <div>
            <span class="large">${Math.round(AT['mx'])}°&#8239;C</span>
            <span class="slash">/</span>
            <span class="large">${Math.round(AT['mn'])}°&#8239;C</span>
          </div>
        </div>
        <div class="wind">
          <div>
            <div class="compass ${WD["compass_point"]}"></div>
          </div>  
        </div>
      `;
}

function latest(data) {
  const sol = [...(data["sol_keys"])].reverse()[0];
  const AT = data[sol]['AT'];
  const lastUtc = new Date(data[sol]['Last_UTC']);
  document.getElementById('latest').innerHTML =
    createBox(sol, lastUtc, AT, data[sol]["WD"]["most_common"])
}

function others(data) {
  const others = [...data["sol_keys"]].reverse().splice(1);
  const othersElem = document.getElementById('others');
  others.forEach(sol => {
    const div = document.createElement('div');
    div.classList.add('box');
    const AT = data[sol]["AT"];
    const lastUtc = data[sol]["Last_UTC"];
    div.innerHTML = createBox(sol, new Date(lastUtc), AT, data[sol]["WD"]["most_common"]);
    othersElem.append(div);
  });
}
