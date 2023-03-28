pipeline { 
    agent any

    environment {
        REACT_APP_IMAGE = "pithawatnuckong/react-web"
        PYTHON_APP_IMAGE = "pithawatnuckong/python-server"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages { 
        stage('Initialization') { 
            steps {
                echo 'Initial then delete images and containers'
                echo "Path is : ${pwd()}"
                sh 'docker-compose down --rmi all --volumes || true'
                sh 'docker images -q'
            }
        }

        stage('Specification'){
            steps {
                echo 'Wait for implementation.'
            }
        }

        stage('Build') {
            steps { 
                sh 'docker compose build'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Registry') { 
            steps { 
                sh "docker push ${PYTHON_APP_IMAGE}"
                sh "docker push ${REACT_APP_IMAGE}"
            }
        }

        stage('Build-slave') { 
            steps { 
                echo 'Starting build slave ...'
                build job: 'slave', parameters: [string(name: 'REACT_APP_IMAGE', value: ${REACT_APP_IMAGE}), string(name: 'PYTHON_APP_IMAGE', value: ${PYTHON_APP_IMAGE})]
            }
        }
    }
    post {
        always {
            echo 'Checkmate'
        }
  }
}