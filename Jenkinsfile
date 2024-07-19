pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/SkPratihar1/LeadHawkApiTest'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    def nodeVersion = tool name: 'NodeJS', type: 'NodeJSInstallation'
                    withNodeJS(nodeVersion) {
                        dir('jenkins') { // Change directory to the folder containing the Jenkinsfile
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    def nodeVersion = tool name: 'NodeJS', type: 'NodeJSInstallation'
                    withNodeJS(nodeVersion) {
                        dir('jenkins') { // Change directory to the folder containing the Jenkinsfile
                            sh 'npm run test'
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: '**/coverage/**', allowEmptyArchive: true
            junit '**/jest-test-results.xml'
        }
    }
}
