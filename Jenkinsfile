pipeline {
    agent any

    environment {
        IMAGE_NAME = "ohadd306/nodejs-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

//        stage('Checkout') {
  //          steps {
    //            git branch: 'main',
      //              url: 'https://github.com/ohadd83/nodejs-app.git'
        //    }
      //  }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
                sh 'docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
                        docker push $IMAGE_NAME:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop nodejs-app || true
                    docker rm nodejs-app || true

                    docker run -d \
                      --name nodejs-app \
                      -p 3001:3000 \
                      $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }

//    post {
//        always {
//            cleanWs()
  //      }

    //    success {
      //      echo 'Pipeline completed successfully!'
       // }

      //  failure {
        //    echo 'Pipeline failed.'
      //  }
    //}
}
