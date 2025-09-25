pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/PavaniMuppalla29/blog-cms'
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Server') {
            steps {
                dir('server') {
                    bat 'start /B node index.js'
                }
            }
        }
    }
}
