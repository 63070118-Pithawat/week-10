pipeline { 
    agent any

    environment {
        REACT_APP_IMAGE = "pithawatnuckong/react-web"
        PYTHON_APP_IMAGE = "pithawatnuckong/python-server"
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
            }
        }

        stage('Registry') { 
            steps { 
                sh "docker push ${PYTHON_APP_IMAGE}:latest"
                sh "docker push ${REACT_APP_IMAGE}:latest"
            }
        }
    }
}