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
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('client') {
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
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                echo "Deployment steps here..."
                // Example:
                // bat '''
                // if exist C:\\inetpub\\wwwroot rmdir /s /q C:\\inetpub\\wwwroot
                // xcopy client\\build C:\\inetpub\\wwwroot /E /I /Y
                // '''
            }
        }
    }
}


