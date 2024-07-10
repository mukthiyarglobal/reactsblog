pipeline {
    agent any

    	tools {
                nodejs 'Reactjs'
			} 

    stages {
        stage('SCM Checkout') {
            steps {
                // Get the latest code from your SCM
                git branch: 'main', credentialsId: 'github_login', url: 'https://github.com/mukthiyarglobal/reactsblog.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Use the NodeJS plugin to setup the environment
                nodejs(nodeJSInstallationName: 'Reactjs') {
                    // Install dependencies
                    sh 'npm install'
                }
            }
        }
         stage('Code Analysis Sonarqube') {
             environment {
             scannerHome = tool 'SonarQubeScanner-6.1.0'
                     }
         steps {
         withSonarQubeEnv('sonarqube-10.6') {
             sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=demo-reactapp -Dsonar.projectName=demo-reactapp  -Dsonar.sources=."
                 } 
             }
                 }


        stage('Production Build') {
            steps {
                // Build the Next.js application
                sh 'npm run build'
            }
        }
       
        stage('Install Vercel CLI') {
            steps {
                // Install Vercel CLI
                sh 'npm install -g vercel'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                withCredentials([string(credentialsId: 'VERCEL-ACCESS-TOKEN', variable: 'VERCEL_TOKEN')]) {
                         sh 'vercel deploy --token $VERCEL_TOKEN --prod --yes --name reactsblog'
    
                }
            }
        }
    }
}
