# Commands used
# Week 1:

## Connect Theia to your github account

git config --global user.email "<yourgithub@email.com>"

git config --global user.name "name"

git add .

git commit -m"Adding temporary changes to Github"

git push

## Clone repository

git clone <https://github.com/LZMallina/ibm-CloudAppDevelopment_Capstone.git>

## Run the Django app on development server

cd ibm-CloudAppDevelopment_Capstone/server

python3 -m pip install -U -r requirements.txt

python3 manage.py makemigrations

python3 manage.py migrate

python3 manage.py runserver

# Week 2: 
## Environment setup

python3 -m pip install -U -r requirements.txt

## Create a supper user for your app
python3 manage.py createsuperuser

username: admin
email: admin@ibm.com'
password: password123!

python3 manage.py runserver

## Add user login/logout and signup menu items

# Week 3: Implement IBM Cloud Function Endpoints
## 1. Load data into the database

* Navigate to the resources page - <https://cloud.ibm.com/resources>.

* Click on the Cloudant service. If you don’t have one already, create one here - <https://cloud.ibm.com/catalog/services/cloudant>.

* To create an API Key, Manage -> Access IAM -> APIKeys -> Create+ -> Copy and Paste the API key somewhere safe.

* To create a database, in Cloudant service -> Create + -> navigation bar -> Resource List -> Databases -> Cloudant->view full detail -> Copy and paste the external endpoint preferred url

npm install -g couchimport

export IAM_API_KEY="I_AM_API_KEY"

export COUCH_URL="EXTERNAL ENDPOINT PREFERRED URL"

cd ibm-CloudAppDevelopment_Capstone/cloudant/data

cat ./dealerships.json | couchimport --type "json" --jsonpath "dealerships.*" --database dealerships

cat ./reviews.json | couchimport --type "json" --jsonpath "reviews.*" --database reviews

## 2. Create the action in IBM Cloud
1. Navigate to the resources page - <https://cloud.ibm.com/resources>.

2. Go to Functions -> Actions

3. Create an Action named get-dealership by choosing language as node.js

4. Select the package as dealership-package

5. Method used will be GET METHOD

6. Parameters for this action will be None since this will retrieve all the dealership details from the DB

* Update the code for the action

* Get the endpoint URL's

* Get specific state Endpoint: /api/dealership?state=""
 In browser, copy and paste getAllDealership url link, ?st=State

 Get all dealership endpoint: <https://us-south.functions.appdomain.cloud/api/v1/web/cebe1001-00af-4035-b9fc-dce1468a7b18/dealership-package/get-State>

 Get specific state dealership endpoint: <https://us-south.functions.appdomain.cloud/api/v1/web/cebe1001-00af-4035-b9fc-dce1468a7b18/dealership-package/get-State?st=CA>

## Build CarModel and CarMake Django Models

* Environment Setup

1. follow week 1 and week 2 instructions

2. update djangoapp/models.py with carMake model and carModel

* run migrations for the models:

python3 manage.py makemigrations

python3 manage.py migrate

## Register CarMake and CarModel models with the admin site

1. Follow week 2 to create superuser.  username: root, email: root@example.com, password: root.  Bypass password: yes

## Customize admin site 

1. In admin.py, create admin classes

2. make migrations with these commands

python3 manage.py makemigrations djangoapp

python3 manage.py migrate --run-syncdb  

python3 manage.py migrate djangoapp

## Create Django Proxy Services of Cloud Functions

# Week 4: Add Dynamic pages

## Environment setup

* git clone and migrate with commands from week 1 and week 3.

## Create a dealership Bootrap table

## Create a dealer details/reviews page

## Create a review submission page

# Week 5: Containerize your application

## Create container

1. makesure you're in the server folder.

2. Run the below commands:

$ kubectl get deployments

* copy your namespace: sn-labs-lzkrishmom namespace

* if dealership deployment already exists, delete with code below:

$ kubectl delete deployment dealership

$ ibmcloud cr images

* if there are dealership images, delete it using command below:

$ ibmcloud cr image-rm us.icr.io/<your sn labs namespace>/dealership:latest && docker rmi us.icr.io/<your sn labs namespace>/dealership:latest

## Add Dockerfile

1) make entrypoint.sh executable

$ chmod +x ./entrypoint.sh

## Push built image to container registry

1) Get your namespace from ibmcloud:

$ MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
echo $MY_NAMESPACE

2) Perform a docker build with the Dockerfile (You don't need to replace $MY_NAMESPACE).  Use the command below as it is.

$ docker build -t us.icr.io/$MY_NAMESPACE/dealership .

3) Push the image into the container registry:

$ docker push us.icr.io/$MY_NAMESPACE/dealership

## Add deployment artifacts

1) create deployment.yaml file in server folder

## Deploy the application

$ kubectl apply -f deployment.yaml

$ kubectl port-forward deployment.apps/dealership 8000:8000


