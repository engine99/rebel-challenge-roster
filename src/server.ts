import App from '@/app';
import validateEnv from '@utils/validateEnv';


validateEnv();

const app = new App();

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
  })
  
try {
    app.listen();
} catch (e) {
    console.log("error", e)
}