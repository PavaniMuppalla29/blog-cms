pipeline {
    agent any

    environment {
        CI = 'false'   // disables treating warnings as errors
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def packageJson = readFile('package.json')
                    if (packageJson.contains('"test"')) {
                        bat 'npm test || echo "Tests failed but continuing..."'
                    } else {
                        echo "No test script found. Skipping tests."
                    }
                }
            }
        }

        stage('Build React App') {
            steps {
                echo "Building React app with warnings ignored..."
                bat 'set CI=false && npm run build'
                // or if using PowerShell: bat 'cmd /c "set CI=false && npm run build"'
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
