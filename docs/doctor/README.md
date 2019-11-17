# Doctar transaction request API
## General remarks
- The API has one endpoint and allows for an **easy** integration between EMD and Doctar with the purpose of **easy** entry of performances by a general practitioner.
- If you want to support use cases not supported or described below, please contact us.
- The API is a REST API, based on [Open API 3.0](https://swagger.io/specification/).
  - The specification format allows for generation of client-side code in all common languages.
- The specification (QUA environment) can be found [here](https://qua-doctarwebtool.azurewebsites.net/Mederi/Doctar.Api/swagger/index.html?urls.primaryName=Public%2FV1)
- [Demo app](http://launch.smarthealthit.org/ehr.html?app=https%3A%2F%2Ftdm3cvba.github.io%2Fbb-clear-smart-fhir%2Flaunch.html%3Flaunch%3DeyJhIjoiMSIsImYiOiIxIn0%26iss%3Dhttps%253A%252F%252Flaunch.smarthealthit.org%252Fv%252Fr4%252Ffhir&user=)

## Sequence
<mermaid>
sequenceDiagram
    participant ClientApp
    participant Doctar API
    participant User
    participant Doctar Webclient
    ClientApp->>Doctar API:REQUEST: transaction (data)
    Doctar API ->>ClientApp: RESPONSE:201 Created + Links[certificate_webflow,..]
    ClientApp->>User:Forward User to certificate_webflow link
        alt Authentication
        User->>Doctar Webclient: Authentication
    end
        alt Forward user
        User->>Doctar Webclient: complete+confirm transaction
    end
</mermaid>

1. ClientApp sends data to the API endpoint. 
2. Server responds with a 201 Created and a collection of links
3. ClientApp forwards user to the certificate_webflow link (absolute url)
4. (User authenticates on Doctar app)
5. User completes + confirms the transaction form

You can see this flow in the gif below. The user has already authenticated.
![Demo](https://github.com/TDM3cvba/bb-clear-smart-fhir/raw/master/bb-clear-smart-fhir-demo.gif)

The current use case of the Doctar transaction request API assumes no delegated authorization flow between clientapp (server) and the Doctar API. The JWT token is to track, identify and authorize the vendor. The user is authenticated and authorized when he/she gets forwarded to the webclient.
There are other (security) scenarios possible, but this is the easiest and simplest one.


## What do you need to integrate?
- A JWT token for QUA
- A JWT token for PROD
- The endpoint to QUA
- The endpoint to PROD
- Be able to forward the user to a specific url on the user-default webbrowser (Chrome, Firefox, etc)

## How does the API behave?
- The API requires as little data as possible to furfill its purpose
- Certain fields are necassary to facilitate a better user experience. Meaning, if the ClientApp sends a valid and complete request, the user needs to enter less him or herself
- We don't validate the request, except on being technically correct, which is the best kind of correct.
- If you set the x-validate HTTP header on "true", you can trigger an extended validation.
  - This is usefull during development
  - If the vendor wants to develop screens to show validation errors in the EMD app itself, but this requires more integration work
  - This validation will change over time as the Doctar App will require less and less information from the ClientApp for certain types of use cases as more and more mycarenet webservices are supported natively in the Doctar App itself (invoicing to Mutuality vs ...) 
- The clientApp can send performance data, or let the user enter it in the Doctar webclient itself
  - We only require nomenclature codes, all complexity regarding pricing and tarification is handled by the Doctar webclient
  

## Demo App
To demonstrate the API we developed a demo app. This demo app is forked from [stfnh/bb-clear-smart-fhir](https://github.com/stfnh/bb-clear-smart-fhir) repo. Its purpose is to demonstrate the flow described above. The modified source code can be found on [TDM3cvba/bb-clear-smart-fhir](https://github.com/TDM3cvba/bb-clear-smart-fhir)

The app runs using SMART App Launcher

Click [here](http://launch.smarthealthit.org/ehr.html?app=https%3A%2F%2Ftdm3cvba.github.io%2Fbb-clear-smart-fhir%2Flaunch.html%3Flaunch%3DeyJhIjoiMSIsImYiOiIxIn0%26iss%3Dhttps%253A%252F%252Flaunch.smarthealthit.org%252Fv%252Fr4%252Ffhir&user=) for a direct link or follow the steps below

1. Go to [http://launch.smarthealthit.org/](http://launch.smarthealthit.org/)
2. Leave all settings as they are (FHIR Version R4).
3. At the bottom of the page, set the App Launch Url to: `https://tdm3cvba.github.io/bb-clear-smart-fhir/launch.html`
4. Click `Launch App`
5. Login as practitioner
6. Select a patient
7. You will see the SMART on FHIR app populated with data from the Sandbox / Electronic Health Record system!

- The app is built with [Vue.js](https://vuejs.org/) and hosted on GitHub Pages


## Example code
Sample code, which implements the client side code in javascript.

```javascript
var jwtToken = '[JWT TOKEN HERE]';
var endpoint = 'https://[BASE_ENDPOINT]';
const doctarClient = axios.create({
  baseURL:
    endpoint,
  headers: {
    Authorization:
     'Bearer ' + jwtToken
  }
});

[......]

transactionRequest: function(encounter) {
      var mywindow = window.open(); 
      //we open the window on the UI thread, during the user click event, 
      //so the browser doesn't block it as a popup
      //other solution is to make the request fully synchronous     
      var homeAddress = this.patient.address[0];
      var careDate = null;
      var performances = [];
      if (encounter != null && encounter.period != undefined) {
        careDate = encounter.period.start.slice(0, 19); //remove timezone
        performances.push({
          nomenclatureCode : "101076"
        });
        performances.push({
          nomenclatureCode : "101091"
        });
      }
      var inss = this.fakeInss;
      var fakeProvince = "Oost-Vlaanderen";
      var fakeCountry = "BE";
      var fakeNihiiCareProvider = "17385467004";
      var gender = 0;

      switch(this.patient.gender)
      {
          case "male":
            gender = 1;
            break;
          case "female":
            gender = 2;
            break;
      }
      return this.$doctarClient
        .post('/certificates/transaction', {
          careDate: careDate,
          CareReceiver: {
            Inss: inss,
            name: this.patient.name[0].family,
            firstName: this.patient.name[0].given.join(' '),
            birthDate: this.patient.birthDate,
            gender: gender,
            email: this.patient.telecom
              .filter(t => t.system == 'email')
              .map(e => {
                if (e.value && e.value.length > 0) {
                  return e.value;
                }
                return '';
              })
              .join(''),
            InsurabilitySituation: {
              CodeEntitled: {
                ct1: '110',
                ct2: '110'
              },
              mutualityCode: "105"
            },
            address: {
              street: homeAddress.line.join(' '),
              postalCode: homeAddress.postalCode,
              city: homeAddress.city,
              province: fakeProvince,
              country: fakeCountry
            }
          },
          PackageProvider: {
            name: 'demo-fhir-emd'
          },
          CareProvider: {
            Nihii: fakeNihiiCareProvider
          },
          Performances: performances
        })

        .then(response => response.data)
        .then(data => {
          var link = data.links.find(l => l.rel == 'certificate_webflow');
          mywindow.location.href = link.href;
        });
    },
    incompleteTransactionRequest: function(validate) {
      if(validate == false)
      {
          var mywindow = window.open(); 
      }      
      //we open the window on the UI thread, during the user click event, 
      //so the browser doesn't block it as a popup
      //other solution is to make the request fully synchronous     
      var inss = this.fakeInss;
      var config = {};
      if(validate === true)
      {
        config = {
          headers : {
              'x-validate': true
          }          
        }
      };
      var fakeNihiiCareProvider = "17385467004";
      var gender = 0;
      return this.$doctarClient
        .post('/certificates/transaction', {
          CareReceiver: {
            Inss: inss,
          },
          PackageProvider: {
            name: 'demo-fhir-emd'
          },
          CareProvider: {
            Nihii: "invalidriziv"
          }
        }, config)

        
        .then(response => response.data)
        .then(data => {
          var link = data.links.find(l => l.rel == 'certificate_webflow');
          mywindow.location.href = link.href;
        }).catch(errorResponse => {
          
          this.errorResponse = errorResponse.response.data;
          
        });
    },
```

