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
                dir('client') {
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
            echo "Building React app (CI=false, disabling eslint)..."
            bat '''
            set CI=false
            set DISABLE_ESLINT_PLUGIN=true
            call npm run build
            '''
        }
    }
}


        stage('Deploy Locally') {
            steps {
                echo "✅ Build completed successfully. Ready to deploy..."
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
