pipeline {
    agent any

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
                    // Only run test if package.json has a test script
                    def packageJson = readFile('package.json')
                    if (packageJson.contains('"test"')) {
                        bat 'npm test'
                    } else {
                        echo "No test script found. Skipping tests."
                    }
                }
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy Locally') {
            steps {
                echo "Deployment steps here..."
            }
        }
    }
}
