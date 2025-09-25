pipeline {
    agent any

    tools {
        nodejs "NodeJS"   // Define NodeJS installation in Jenkins Global Tools (or skip if Node is already in PATH)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-mern-repo.git'
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Start Server') {
            steps {
                dir('server') {
                    sh 'npm start &'
                }
            }
        }
    }
}
