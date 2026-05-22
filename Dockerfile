#FROM says what base image we start. Images are layers and we are chosing earlier layers like os
FROM maven:3.9.12-eclipse-temurin-25 AS build
#WORKDIR tells docker where commands are run
WORKDIR /app
#COPY copies files from host (pom.xml) and place at (. here so /app from WORKDIR)
COPY pom.xml .

# This next step is to cache dependencies
# RUN commands to run (in this case maven runs a lifecycle from clean to package skipping tests)
RUN mvn dependency:resolve
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
#ENTRYPOINT Is the first CMD (command) run in the container
ENTRYPOINT ["java", "-jar", "app.jar"]