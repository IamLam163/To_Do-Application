pipeline {
    agent any

    
    environment {
        BACKEND_IMAGE = "your-dockerhub-username/backend-image"
        FRONTEND_IMAGE = "your-dockerhub-username/frontend-image"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Back-End') {
            steps {
                script {
                    dir('back-end') {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Build Front-End') {
            steps {
                script {
                    dir('front-end') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t $BACKEND_IMAGE ./back-end'
                    sh 'docker build -t $FRONTEND_IMAGE ./front-end'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                        sh 'docker push $BACKEND_IMAGE'
                        sh 'docker push $FRONTEND_IMAGE'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}