/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
/**
 * Get all dealerships
 */

const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

function main(params) {

    const authenticator = new IamAuthenticator({ apikey:"KDDy7JeifWad3-qZ_a44oSCdSQJJjsoV3g6DOqhoVsqu" })
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl("https://c0973199-be03-41ac-936f-8ee189aea9c2-bluemix.cloudantnosqldb.appdomain.cloud");

    let dbListPromise = getDbs(cloudant);
    return dbListPromise;
}

function getDbs(cloudant) {
     return new Promise((resolve, reject) => {
          cloudant.postAllDocs({ db: 'dealerships', includeDocs: true, limit: 50 })
             .then((result)=>{
                // console.log(result.result.rows);
              let code = 200;
              if (result.result.rows.length == 0) {
                  code = 404;
              }
              const dealershipDB = result.result.rows
              const formatResult = dealershipDB.map(row =>{
                  const doc = row.doc
                  return{
                      full_name: doc.full_name,
                      short_name: doc.short_name,
                      id: doc.id,
                      city: doc.city,
                      state: doc.state,
                      st: doc.st,
                      address: doc.address,
                      zip: doc.zip,
                      lat: doc.lat,
                      long: doc.long,
                  }
              })
              resolve({
                  statusCode: code,
                  headers: { 'Content-Type': 'application/json' },
                  body: formatResult
              }); 
             })
             .catch(err => {
                  console.log(err);
                 reject({ err: err });
             });
     });
 }
