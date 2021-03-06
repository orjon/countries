$(() => {
  console.log('RESTCountries API');

  const $countries = $('.countries');
  const $responseTime = $('.responseTime');
  var countries = [];

  // API response time vars
  let t0 = undefined;
  let t1 = undefined;

  function getSpecificCountries(filter = 'all') {
    console.log('Getting countries...');
    t0 = performance.now();
    $.ajax({
      method: 'GET',
      url: `https://restcountries.eu/rest/v2/${filter}`,
    }).then((response) => {
      t1 = performance.now();
      let responseTime =
        'Response time: ' + ((t1 - t0) / 1000).toFixed(3) + 's';
      $responseTime.html(responseTime);
      countries = response;
      displayCountries();
    });
  }

  function displayCountries() {
    $countries.empty();
    countries.forEach((country) => {
      var languages = [];
      country.languages.forEach((language) => {
        languages.push(' ' + language.name);
      });

      var currencies = [];
      country.currencies.forEach((currency) => {
        if (currency.symbol !== null) {
          currencies.push(' ' + currency.symbol + ' ' + currency.name);
        } else {
          currencies.push(' ' + currency.name);
        }
      });

      var timezones = [];
      country.timezones.forEach((timezone) => {
        timezones.push(' ' + timezone);
      });

      var area = 'unavailable';
      if (country.area !== null) {
        area = country.area;
      }

      let countryNameUrl = country.name.replaceAll(' ', '&nbsp;');
      let countryCapitalUrl = country.capital.replaceAll(' ', '&nbsp;');

      $countries.append(`
        <div class='card country'>
          <div class='details'>
            <h3 class='row countryName'>
              <a href=https://en.wikipedia.org/wiki/Special:Search/${countryNameUrl}>${
        country.name
      }&nbsp</a>(${country.alpha3Code})</h3>
            <h3 class='row countryName'>${country.nativeName}</h3>
            <div class='row'>
              <img class='flag' src=${country.flag} alt='Flag of ${
        country.name
      }' />
            </div>

            <div class='row'>
              <div class='labels'>
                <p>Capital</p>
              </div>
              <div class='data'>
                <a href=https://en.wikipedia.org/wiki/Special:Search/${countryCapitalUrl}>
                  <p>${country.capital}</p>
                </a>
              </div>
            </div>

            <div class='row'>
              <div class='labels'>
                <p>Area</p>
              </div>
              <div class='data'>
                <p>${area
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sq km</sup></p>
              </div>
            </div>


            <div class='row'>
              <div class='labels'>
                <p>Population</p>
              </div>
              <div class='data'>
                <p>${country.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
              </div>
            </div>

            <div class='row'>
              <div class='labels'>
                <p>Languages</p>
              </div>
              <div class='data'>
                <p>[${languages.length}]${languages}</p>
              </div>
            </div>



            <div class='row'>
              <div class='labels'>
                <p>Currencies</p>
              </div>
              <div class='data'>
                <p>[${currencies.length}]${currencies}</p>
              </div>
            </div>

            <div class='row'>
              <div class='labels'>
                <p>Timezones</p>
              </div>
              <div class='data'>
                <p>[${timezones.length}]${timezones}</p>
              </div>
            </div>

            <div class='row'>
              <div class='labels'>
                <p>Domain</p>
              </div>
              <div class='data'>
                <p>${country.topLevelDomain}</p>
              </div>
            </div>

            <div class='row'>
              <div class='labels'>
                <p>Calling Code</p>
              </div>
              <div class='data'>
                <p>+${country.callingCodes}</p>
              </div>
            </div>



          </div>
        </div>
      `);
    });
  }

  getSpecificCountries();

  function findLongest(array) {
    array.forEach((item) => {});
  }
});
