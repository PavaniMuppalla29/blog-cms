pipeline {
    agent any

    environment {
        CI = 'false'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('client') {          // 👈 change 'client' if your folder name is different
                    bat 'npm install'
                }
            }
        }

stage('Run Tests') {
    steps {
        echo "Skipping tests since no test files exist."
    }
}


        stage('Build React App') {
            steps {
                dir('client') {
                    bat 'set CI=false && npm run build'
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                echo "Deployment steps here..."
            }
        }
    }

    post {
        success {
            echo '✅ Build completed successfully (warnings ignored).'
        }
        failure {
            echo '❌ Build failed. Check logs for details.'
        }
    }
}
