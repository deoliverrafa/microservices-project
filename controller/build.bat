@echo off
echo Gerando JAR do auth-service com Java 17...
set JAVA_HOME=C:/Program Files/Java/zulu17.32.13-ca-jdk17.0.2-win_x64
set PATH=%JAVA_HOME%\bin;%PATH%
mvn clean package -DskipTests
pause
