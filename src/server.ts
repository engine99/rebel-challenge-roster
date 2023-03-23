import App from '@/app';
import validateEnv from '@utils/validateEnv';


validateEnv();

const app = new App();

try {
    app.listen();
} catch (e) {
    console.log("error", e)
}