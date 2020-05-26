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
  const data = await fetch('http://localhost:5000/insight-weather.json').then(res => res.json());
  console.log('data', data);
  latest(data);
  others(data);
});

function createBox(sol, lastUtc, AT) {
  return `
        <div class="sol">
            <p>
              <span class="label">Sol</span>
              <span class="fat">${sol}</span><br>
              <span class="fat">${locMonth[lastUtc.getMonth()]} ${lastUtc.getDate()}</span>
            </p>
        </div>
        <div class="temperature">
          <div>
            <span class="large">${Math.round(AT['mx'])}°&#8239;C</span>
            <span class="slash">/</span>
            <span class="large">${Math.round(AT['mn'])}°&#8239;C</span>
          </div>
        </div>
      `;
}

function latest(data) {
  const sol = [...(data["sol_keys"])].reverse()[0];
  const AT = data[sol]['AT'];
  const lastUtc = new Date(data[sol]['Last_UTC']);
  console.log(`${locMonth[lastUtc.getMonth()]} ${lastUtc.getDate()}`);
  document.getElementById('latest').innerHTML = createBox(sol, lastUtc, AT)
}

function others(data) {
  const others = [...data["sol_keys"]].reverse().splice(1);
  console.log('others', others);
  const othersElem = document.getElementById('others');
  others.forEach(sol => {
    const div = document.createElement('div');
    div.classList.add('box');
    const AT = data[sol]["AT"];
    const lastUtc = data[sol]["Last_UTC"];
    div.innerHTML = createBox(sol, new Date(lastUtc), AT);
    othersElem.append(div);
  });
}
